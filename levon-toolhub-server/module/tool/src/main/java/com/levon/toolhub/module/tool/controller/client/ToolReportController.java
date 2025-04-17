package com.levon.toolhub.module.tool.controller.client;

import com.levon.toolhub.common.enums.ApiCode;
import com.levon.toolhub.common.exception.BizException;
import com.levon.toolhub.common.model.ApiResponse;
import com.levon.toolhub.module.tool.dto.request.client.ToolReportRequest;
import com.levon.toolhub.module.tool.service.ToolReportService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 工具问题报告Controller
 */
@RestController
@RequestMapping("/tool")
@Validated
public class ToolReportController {

    private static final Logger log = LoggerFactory.getLogger(ToolReportController.class);

    @Autowired
    private ToolReportService toolReportService;

    /**
     * 提交工具问题报告
     *
     * @param toolId  工具ID
     * @param request 报告请求DTO
     * @return API响应
     */
    @PostMapping("/{toolId}/report")
    public ApiResponse<Object> submitReport(
            @PathVariable("toolId") Long toolId,
            @RequestBody @Valid ToolReportRequest request) {
        log.info("收到提交工具问题报告请求, toolId: {}, category: {}", toolId, request.getCategory());

        // 验证工具ID
        if (toolId == null || toolId <= 0) {
            log.error("无效的工具ID: {}", toolId);
            return ApiResponse.error("无效的工具ID");
        }

        // 默认为匿名提交
        Long userId = null;

        // TODO 如果当前用户是登陆状态（实际项目中应从会话或token中获取userId）

        // 提交报告
        toolReportService.submitReport(toolId, request, userId);
        return ApiResponse.success();
    }
} 