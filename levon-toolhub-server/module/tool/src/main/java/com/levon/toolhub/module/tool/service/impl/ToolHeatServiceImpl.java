package com.levon.toolhub.module.tool.service.impl;

import com.levon.toolhub.common.utils.HeatCalculator;
import com.levon.toolhub.module.tool.entity.Tool;
import com.levon.toolhub.module.tool.mapper.ToolMapper;
import com.levon.toolhub.module.tool.service.ToolHeatService;
import com.levon.toolhub.module.tool.service.ToolService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * 工具热度服务实现类
 */
@Service
public class ToolHeatServiceImpl implements ToolHeatService {

    private static final Logger log = LoggerFactory.getLogger(ToolHeatServiceImpl.class);
    private static final int DEFAULT_BATCH_SIZE = 200; // 批量更新大小
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private ToolMapper toolMapper;

    @Autowired
    private ToolService toolService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void batchUpdateToolHeat(List<Tool> tools) {
        if (tools == null || tools.isEmpty()) {
            log.warn("工具列表为空，跳过批量热度更新");
            return;
        }
        
        try {
            int totalSize = tools.size();
            log.info("开始批量更新工具热度，总数量: {}", totalSize);
            long startTime = System.currentTimeMillis();
            
            // 1. 准备批量更新数据，只包含需要更新的字段
            List<Tool> updateTools = new ArrayList<>(totalSize);
            
            for (Tool tool : tools) {
                // 计算热度值
                int heat = HeatCalculator.calculateHeat(
                    tool.getViewCount(),
                    tool.getFavoriteCount(),
                    tool.getCreateDate()
                );
                
                // 创建只包含需要更新字段的工具对象
                Tool updateTool = new Tool();
                updateTool.setId(tool.getId());
                updateTool.setHeat(heat);
                updateTool.setHeatDesc(HeatCalculator.getHeatDesc(heat));
                updateTool.setHeatLevel(HeatCalculator.getHeatLevel(heat));
                
                updateTools.add(updateTool);
            }
            
            // 2. 按照指定批次大小批量更新数据库
            if (totalSize <= DEFAULT_BATCH_SIZE) {
                // 如果数据量较小，直接一次性批量更新
                boolean success = toolService.updateBatchById(updateTools);
                if (!success) {
                    log.warn("批量更新工具热度可能存在问题，请检查");
                }
            } else {
                // 数据量较大时，分多次批量更新
                int batchCount = (int) Math.ceil((double) totalSize / DEFAULT_BATCH_SIZE);
                log.info("数据量较大，分{}批次更新，每批次{}条", batchCount, DEFAULT_BATCH_SIZE);
                
                for (int i = 0; i < batchCount; i++) {
                    int start = i * DEFAULT_BATCH_SIZE;
                    int end = Math.min(start + DEFAULT_BATCH_SIZE, totalSize);
                    
                    List<Tool> batchTools = updateTools.subList(start, end);
                    boolean success = toolService.updateBatchById(batchTools);
                    if (!success) {
                        log.warn("第{}/{}批次更新可能存在问题，请检查", i+1, batchCount);
                    }
                    
                    log.info("完成第{}/{}批次更新，数量: {}", i+1, batchCount, batchTools.size());
                }
            }

            long costTime = System.currentTimeMillis() - startTime;
            log.info("批量更新{}个工具的热度完成，耗时: {}ms", totalSize, costTime);
        } catch (Exception e) {
            log.error("批量更新工具热度失败", e);
            throw e;
        }
    }
    
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int updateAllToolsHeat() {
        log.info("开始全量更新所有工具热度");
        
        try {
            // 查询所有需要更新热度的工具（包括热度衰减）
            List<Tool> toolsToUpdate = toolMapper.findAllToolsForHeatUpdate();
            
            int totalSize = toolsToUpdate.size();
            log.info("找到{}个需要更新热度的工具", totalSize);
            
            if (totalSize == 0) {
                log.info("没有需要更新的工具");
                return 0;
            }
            
            // 分批处理
            int batchSize = DEFAULT_BATCH_SIZE;
            int batchCount = (int) Math.ceil((double) totalSize / batchSize);
            
            log.info("共需要处理{}批，每批最多{}个工具", batchCount, batchSize);
            
            for (int i = 0; i < batchCount; i++) {
                int start = i * batchSize;
                int end = Math.min(start + batchSize, totalSize);
                
                log.info("正在处理第{}批工具，范围[{}-{}]", i+1, start, end-1);
                
                List<Tool> batchTools = toolsToUpdate.subList(start, end);
                batchUpdateToolHeat(batchTools);
                
                log.info("完成第{}批工具热度更新", i+1);
            }
            
            log.info("全量更新完成，共更新{}个工具", totalSize);
            return totalSize;
        } catch (Exception e) {
            log.error("全量更新工具热度失败", e);
            throw e;
        }
    }
    
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int updateToolsHeatByTimeRange(LocalDateTime startTime, LocalDateTime endTime) {
        if (startTime == null || endTime == null) {
            throw new IllegalArgumentException("开始时间和结束时间不能为空");
        }
        
        if (startTime.isAfter(endTime)) {
            throw new IllegalArgumentException("开始时间不能晚于结束时间");
        }
        
        log.info("开始更新时间范围内的工具热度，时间范围：{} 至 {}", 
                startTime.format(TIME_FORMATTER), 
                endTime.format(TIME_FORMATTER));
        
        try {
            // 使用ToolMapper查询指定时间范围内需要更新热度的工具
            List<Tool> toolsToUpdate = toolMapper.findToolsNeedUpdateHeat(startTime, endTime);
            
            int totalSize = toolsToUpdate.size();
            log.info("找到{}个需要更新热度的工具", totalSize);
            
            if (totalSize == 0) {
                log.info("指定时间范围内没有需要更新的工具");
                return 0;
            }
            
            // 分批处理
            int batchSize = DEFAULT_BATCH_SIZE;
            int batchCount = (int) Math.ceil((double) totalSize / batchSize);
            
            log.info("共需要处理{}批，每批最多{}个工具", batchCount, batchSize);
            
            for (int i = 0; i < batchCount; i++) {
                int start = i * batchSize;
                int end = Math.min(start + batchSize, totalSize);
                
                log.info("正在处理第{}批工具，范围[{}-{}]", i+1, start, end-1);
                
                List<Tool> batchTools = toolsToUpdate.subList(start, end);
                batchUpdateToolHeat(batchTools);
                
                log.info("完成第{}批工具热度更新", i+1);
            }
            
            log.info("时间范围内所有工具热度更新完成，共更新{}个工具", totalSize);
            return totalSize;
        } catch (Exception e) {
            log.error("时间范围内工具热度更新失败", e);
            throw e;
        }
    }
}