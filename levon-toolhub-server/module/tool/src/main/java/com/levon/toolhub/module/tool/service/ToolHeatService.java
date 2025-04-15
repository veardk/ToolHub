// ToolHeatService.java
package com.levon.toolhub.module.tool.service;

import com.levon.toolhub.module.tool.entity.Tool;

import java.util.List;

/**
 * 工具热度服务接口
 */
public interface ToolHeatService {
    
    /**
     * 定时更新所有工具的热度
     */
    void updateToolsHeat();
    
    /**
     * 更新单个工具的热度
     *
     * @param tool 工具实体
     */
    void updateToolHeat(Tool tool);
    
    /**
     * 批量更新工具热度
     *
     * @param tools 工具列表
     */
    void batchUpdateToolHeat(List<Tool> tools);
}