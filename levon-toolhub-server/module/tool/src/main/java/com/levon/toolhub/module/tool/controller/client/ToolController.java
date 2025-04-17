package com.levon.toolhub.module.tool.controller.client;

import com.levon.toolhub.common.model.ApiResponse;
import com.levon.toolhub.module.tool.dto.response.client.ToolDetailResponse;
import com.levon.toolhub.module.tool.service.ToolService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 工具相关接口控制器
 */
@RestController
@RequestMapping("/tool")
public class ToolController {

    private static final Logger log = LoggerFactory.getLogger(ToolController.class);

    @Autowired
    private ToolService toolService;

    /**
     * 获取工具详情
     *
     * @param id 工具ID
     * @return 工具详情
     */
    @GetMapping("/detail/{id}")
    public ApiResponse<ToolDetailResponse> getToolDetail(@PathVariable Long id) {
        log.info("获取工具详情, id: {}", id);
        ToolDetailResponse result = toolService.getToolDetail(id);
        return ApiResponse.success(result);
    }
} 