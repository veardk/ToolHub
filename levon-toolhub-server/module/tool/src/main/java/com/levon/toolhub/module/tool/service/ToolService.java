package com.levon.toolhub.module.tool.service;

import com.levon.toolhub.common.model.CursorPageResult;
import com.levon.toolhub.module.tool.dto.request.client.ToolPageRequest;
import com.levon.toolhub.module.tool.dto.response.client.ToolBriefResponse;
import com.levon.toolhub.module.tool.dto.response.client.ToolDetailResponse;
import com.levon.toolhub.module.tool.entity.Tool;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author leivik
* @description 针对表【levon_toolhub_tool(工具表)】的数据库操作Service
* @createDate 2025-04-14 14:27:12
*/
public interface ToolService extends IService<Tool> {

    /**
     * 获取主分类下的工具列表
     *
     * @param categoryId 主分类ID
     * @param request 分页和筛选请求
     * @return 主分类及其工具列表DTO
     */
    CursorPageResult<ToolBriefResponse> getCategoryTools(Long categoryId, ToolPageRequest request);
    
    /**
     * 获取工具详情
     *
     * @param id 工具ID
     * @return 工具详情响应DTO
     */
    ToolDetailResponse getToolDetail(Long id);
    
    /**
     * 刷新工具缓存
     * 手动触发缓存刷新，清除所有工具相关缓存
     */
    void refreshToolCache();
}
