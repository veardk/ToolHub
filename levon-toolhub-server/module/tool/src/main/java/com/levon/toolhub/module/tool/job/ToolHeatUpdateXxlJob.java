package com.levon.toolhub.module.tool.job;

import com.levon.toolhub.module.tool.service.ToolHeatService;
import com.xxl.job.core.context.XxlJobHelper;
import com.xxl.job.core.handler.annotation.XxlJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

/**
 * 工具热度更新定时任务执行器
 * 集成XXL-Job执行器框架，负责调度工具热度更新任务
 * 
 * 主要功能：
 * 1. 每日凌晨1点执行全部工具热度更新
 * 2. 支持手动触发指定时间范围的热度更新
 */
@Component
public class ToolHeatUpdateXxlJob {
    private static final Logger log = LoggerFactory.getLogger(ToolHeatUpdateXxlJob.class);
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    @Autowired
    private ToolHeatService toolHeatService;
    
    /**
     * 每日自动执行的工具热度全量更新任务
     * 每天凌晨1点自动执行，对所有工具热度进行更新
     * 
     * 推荐配置:
     * - Cron表达式: 0 0 1 * * ? (每天凌晨1点执行)
     * - 调度状态: 运行
     * - 阻塞处理策略: 单机串行
     * - 路由策略: 第一个
     */
    @XxlJob("dailyToolHeatUpdateHandler")
    public void dailyUpdateToolsHeat() {
        log.info("【每日工具热度更新任务】开始执行");
        XxlJobHelper.log("每日工具热度更新任务开始执行");
        
        try {
            // 执行全量更新
            int updatedCount = toolHeatService.updateAllToolsHeat();
            
            // 任务执行成功
            log.info("【每日工具热度更新任务】执行完成，共更新{}个工具", updatedCount);
            XxlJobHelper.log("执行完成，共更新%d个工具", updatedCount);
            XxlJobHelper.handleSuccess(String.format("更新成功: %d个工具", updatedCount));
        } catch (Exception e) {
            log.error("【每日工具热度更新任务】执行异常", e);
            XxlJobHelper.log("执行异常: " + e.getMessage());
            XxlJobHelper.handleFail("更新失败: " + e.getMessage());
        }
    }
    
    /**
     * 指定时间范围的工具热度更新任务
     * 仅更新指定时间范围内需要更新热度的工具
     * 
     * 参数格式: startTime=2024-04-01 00:00:00,endTime=2024-04-17 23:59:59
     */
    @XxlJob("toolHeatTimeRangeUpdateHandler")
    public void updateToolsHeatByTimeRange() {
        log.info("【工具热度时间范围更新任务】开始执行");
        XxlJobHelper.log("工具热度时间范围更新任务开始执行");
        
        try {
            // 获取任务参数，解析时间范围
            String jobParam = XxlJobHelper.getJobParam();
            log.info("【工具热度时间范围更新任务】任务参数: {}", jobParam);
            
            // 如果有时间范围参数，则按时间范围更新
            if (jobParam != null && !jobParam.trim().isEmpty()) {
                String[] params = jobParam.split(",");
                if (params.length == 2) {
                    try {
                        // 提取并解析开始时间和结束时间
                        String startTimeStr = params[0].trim();
                        String endTimeStr = params[1].trim();
                        
                        LocalDateTime startTime = null;
                        LocalDateTime endTime = null;
                        
                        // 解析开始时间
                        if (startTimeStr.contains("=")) {
                            startTimeStr = startTimeStr.substring(startTimeStr.indexOf("=") + 1).trim();
                        }
                        startTime = LocalDateTime.parse(startTimeStr, DATE_TIME_FORMATTER);
                        
                        // 解析结束时间
                        if (endTimeStr.contains("=")) {
                            endTimeStr = endTimeStr.substring(endTimeStr.indexOf("=") + 1).trim();
                        }
                        endTime = LocalDateTime.parse(endTimeStr, DATE_TIME_FORMATTER);
                        
                        // 调用服务层执行时间范围更新
                        log.info("【工具热度时间范围更新任务】执行时间范围更新，范围: {} 至 {}", 
                                startTimeStr, endTimeStr);
                        XxlJobHelper.log("执行时间范围更新，范围: %s 至 %s", 
                                startTimeStr, endTimeStr);
                        
                        int updatedCount = toolHeatService.updateToolsHeatByTimeRange(startTime, endTime);
                        
                        // 任务执行成功
                        log.info("【工具热度时间范围更新任务】执行完成，共更新{}个工具", updatedCount);
                        XxlJobHelper.log("执行完成，共更新%d个工具", updatedCount);
                        XxlJobHelper.handleSuccess(String.format("更新成功: %d个工具", updatedCount));
                    } catch (DateTimeParseException e) {
                        log.error("【工具热度时间范围更新任务】解析时间范围参数失败", e);
                        XxlJobHelper.log("解析时间范围参数失败: " + e.getMessage());
                        XxlJobHelper.handleFail("时间格式错误，正确格式为: yyyy-MM-dd HH:mm:ss");
                    } catch (Exception e) {
                        log.error("【工具热度时间范围更新任务】执行时间范围更新异常", e);
                        XxlJobHelper.log("执行时间范围更新异常: " + e.getMessage());
                        XxlJobHelper.handleFail("执行时间范围更新失败: " + e.getMessage());
                    }
                } else {
                    log.error("【工具热度时间范围更新任务】时间范围参数格式错误，应为'startTime=时间,endTime=时间'");
                    XxlJobHelper.log("时间范围参数格式错误，应为'startTime=时间,endTime=时间'");
                    XxlJobHelper.handleFail("参数格式错误，应为'startTime=时间,endTime=时间'");
                }
            } else {
                log.error("【工具热度时间范围更新任务】缺少必要的时间范围参数");
                XxlJobHelper.log("缺少必要的时间范围参数");
                XxlJobHelper.handleFail("缺少必要的时间范围参数");
            }
        } catch (Exception e) {
            log.error("【工具热度时间范围更新任务】执行异常", e);
            XxlJobHelper.log("执行异常: " + e.getMessage());
            XxlJobHelper.handleFail("更新失败: " + e.getMessage());
        }
    }
} 