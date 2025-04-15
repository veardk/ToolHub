// ToolHeatServiceImpl.java
package com.levon.toolhub.module.tool.service.impl;

import com.levon.toolhub.common.utils.HeatCalculator;
import com.levon.toolhub.module.tool.entity.Tool;
import com.levon.toolhub.module.tool.mapper.ToolMapper;
import com.levon.toolhub.module.tool.service.ToolHeatService;
import com.levon.toolhub.module.tool.service.ToolService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 工具热度服务实现类
 */
@Service
public class ToolHeatServiceImpl implements ToolHeatService {

    private static final Logger log = LoggerFactory.getLogger(ToolHeatServiceImpl.class);

    @Autowired
    private ToolMapper toolMapper;

    @Autowired
    private ToolService toolService;

    @Override
    @Scheduled(cron = "0 0 * * * *") // 每小时执行一次
    @Transactional(rollbackFor = Exception.class)
    public void updateToolsHeat() {
        log.info("开始更新工具热度");
        try {
            // 1. 获取所有工具
            List<Tool> tools = toolService.list();
            log.debug("待更新工具数量: {}", tools.size());
            
            // 2. 批量更新热度
            // TODO 实现分批次更新，避免一次读写操作太多次
            batchUpdateToolHeat(tools);
            
            log.info("工具热度更新完成，更新数量: {}", tools.size());
        } catch (Exception e) {
            log.error("更新工具热度失败", e);
            throw e;
        }
    }
    
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateToolHeat(Tool tool) {
        if (tool == null) {
            log.warn("工具对象为空，跳过热度更新");
            return;
        }
        
        try {
            // 1. 计算新的热度值
            int heat = HeatCalculator.calculateHeat(
                tool.getViewCount(),
                tool.getFavoriteCount(),
                tool.getCreateDate()
            );
            
            // 2. 更新热度相关字段
            tool.setHeat(heat);
            tool.setHeatDesc(HeatCalculator.getHeatDesc(heat));
            tool.setHeatLevel(HeatCalculator.getHeatLevel(heat));
            
            // 3. 更新数据库
            toolMapper.updateById(tool);
            
            log.debug("工具[{}]热度更新为: {}", tool.getName(), heat);
        } catch (Exception e) {
            log.error("更新工具[{}]热度失败", tool.getName(), e);
            throw e;
        }
    }
    
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void batchUpdateToolHeat(List<Tool> tools) {
        if (tools == null || tools.isEmpty()) {
            log.warn("工具列表为空，跳过批量热度更新");
            return;
        }
        
        try {
            // 1. 更新每个工具的热度
            for (Tool tool : tools) {
                int heat = HeatCalculator.calculateHeat(
                    tool.getViewCount(),
                    tool.getFavoriteCount(),
                    tool.getCreateDate()
                );
                
                tool.setHeat(heat);
                tool.setHeatDesc(HeatCalculator.getHeatDesc(heat));
                tool.setHeatLevel(HeatCalculator.getHeatLevel(heat));
            }
            
            // 2. 批量更新数据库
            toolService.saveOrUpdateBatch(tools);

            log.debug("批量更新{}个工具的热度完成", tools.size());
        } catch (Exception e) {
            log.error("批量更新工具热度失败", e);
            throw e;
        }
    }
}