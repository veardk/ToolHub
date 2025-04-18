package com.levon.toolhub.module.tool.controller.admin;

import com.levon.toolhub.common.model.ApiResponse;
import com.levon.toolhub.module.tool.dto.request.admin.ManualHeatUpdateRequest;
import com.levon.toolhub.module.tool.service.ToolHeatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

/**
 * 工具热度管理控制器
 */
@RestController
@RequestMapping("/admin/tool/heat")
public class ToolHeatController {

    private static final Logger log = LoggerFactory.getLogger(ToolHeatController.class);

    @Autowired
    private ToolHeatService toolHeatService;

    /**
     * 触发工具热度更新
     * 支持通过API手动触发，在XXL-Job管理平台也可以触发
     *
     * @return 更新结果
     */
    @PostMapping("/update")
    public ApiResponse<Integer> triggerHeatUpdate() {
        log.info("收到手动触发工具热度更新请求");
        try {
            // 此方法已经被改为XxlJob处理器，可以直接调用
            Integer updateTotal = toolHeatService.updateToolsHeat();
            return ApiResponse.success(String.format("成功更新 %d 个工具的热度", updateTotal), updateTotal);
        } catch (Exception e) {
            log.error("热度更新任务执行失败", e);
            return ApiResponse.error(500, "热度更新任务执行失败: " + e.getMessage());
        }
    }

    /**
     * 根据时间范围手动更新工具热度
     * 支持通过API手动触发，在XXL-Job管理平台也可以通过参数触发
     *
     * @param request 包含开始时间和结束时间的请求
     * @return 更新结果
     */
    @PostMapping("/update-by-time-range")
    public ApiResponse<Integer> updateHeatByTimeRange(@RequestBody ManualHeatUpdateRequest request) {
        log.info("收到根据时间范围手动更新工具热度请求: {}", request);

        try {
            // 解析时间
            LocalDateTime startTime = LocalDateTime.parse(request.getStartTime(),
                    DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            LocalDateTime endTime = LocalDateTime.parse(request.getEndTime(),
                    DateTimeFormatter.ISO_LOCAL_DATE_TIME);

            // 执行更新
            int updatedCount = toolHeatService.manualUpdateHeatByTimeRange(startTime, endTime);

            return ApiResponse.success(String.format("成功更新%d个工具的热度", updatedCount), updatedCount);
        } catch (DateTimeParseException e) {
            log.error("时间格式解析错误", e);
            return ApiResponse.error(400, "时间格式错误，请使用ISO格式 (yyyy-MM-ddTHH:mm:ss)");
        } catch (IllegalArgumentException e) {
            log.error("参数错误", e);
            return ApiResponse.error(400, e.getMessage());
        } catch (Exception e) {
            log.error("更新热度失败", e);
            return ApiResponse.error(500, "更新热度失败: " + e.getMessage());
        }
    }

}