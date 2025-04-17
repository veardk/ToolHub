package com.levon.toolhub.module.tool.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.levon.toolhub.module.tool.dto.request.client.ToolReportRequest;
import com.levon.toolhub.module.tool.entity.ToolReport;

/**
 * 工具问题报告Service接口
 */
public interface ToolReportService extends IService<ToolReport> {

    /**
     * 提交工具问题报告
     *
     * @param toolId  工具ID
     * @param request 报告请求DTO
     * @param userId  用户ID，匿名提交时可为null
     */
    void submitReport(Long toolId, ToolReportRequest request, Long userId);
    
    /**
     * 验证工具是否存在
     *
     * @param toolId 工具ID
     * @return 是否存在
     */
    boolean validateToolExists(Long toolId);
}
