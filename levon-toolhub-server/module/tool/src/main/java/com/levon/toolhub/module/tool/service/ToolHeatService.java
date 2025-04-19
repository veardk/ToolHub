// ToolHeatService.java
package com.levon.toolhub.module.tool.service;

import com.levon.toolhub.module.tool.entity.Tool;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 工具热度服务接口
 */
public interface ToolHeatService {
    
    /**
     * 批量更新工具热度
     *
     * @param tools 工具列表
     */
    void batchUpdateToolHeat(List<Tool> tools);
    
    /**
     * 全量更新所有工具的热度
     * 
     * @return 更新的工具数量
     */
    int updateAllToolsHeat();
    
    /**
     * 更新指定时间范围内的工具热度
     * 包括在该时间范围内创建、更新或有数据变动的工具
     * 
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 更新的工具数量
     */
    int updateToolsHeatByTimeRange(LocalDateTime startTime, LocalDateTime endTime);
}