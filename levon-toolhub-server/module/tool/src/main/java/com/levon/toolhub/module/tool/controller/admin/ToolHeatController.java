package com.levon.toolhub.module.tool.controller.admin;

import com.levon.toolhub.common.enums.ApiCode;
import com.levon.toolhub.common.model.ApiResponse;
import com.levon.toolhub.framework.annotation.OperationLog;
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
 * 提供API接口，用于手动触发工具热度更新
 */
@RestController
@RequestMapping("/admin/tool/heat")
public class ToolHeatController {

    private static final Logger log = LoggerFactory.getLogger(ToolHeatController.class);
    private static final DateTimeFormatter ISO_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    @Autowired
    private ToolHeatService toolHeatService;

    /**
     * 触发全部工具热度更新
     *
     * @return 更新结果
     */
    @PostMapping("/update")
    @OperationLog("触发全部工具热度更新")
    public ApiResponse<Integer> triggerHeatUpdate() {
        log.info("收到触发全部工具热度更新请求");
        try {
            // 调用服务层方法执行全量更新
            int updatedCount = toolHeatService.updateAllToolsHeat();
            return ApiResponse.success(String.format("成功更新%d个工具的热度", updatedCount), updatedCount);
        } catch (Exception e) {
            log.error("工具热度更新失败", e);
            return ApiResponse.error(ApiCode.ERROR.getCode(), "工具热度更新失败: " + e.getMessage());
        }
    }

    /**
     * 根据时间范围更新工具热度
     *
     * @param request 包含开始时间和结束时间的请求
     * @return 更新结果
     */
    @PostMapping("/update-by-time-range")
    @OperationLog("根据时间范围更新工具热度")
    public ApiResponse<Integer> updateHeatByTimeRange(@RequestBody ManualHeatUpdateRequest request) {
        log.info("收到根据时间范围更新工具热度请求: {}", request);

        try {
            // 参数验证
            String startTimeStr = request.getStartTime();
            String endTimeStr = request.getEndTime();
            
            if (startTimeStr == null || endTimeStr == null) {
                return ApiResponse.error(ApiCode.BAD_REQUEST.getCode(), "开始时间和结束时间不能为空");
            }
            
            // 将ISO格式时间(yyyy-MM-ddTHH:mm:ss)转换为时间对象
            LocalDateTime startTime = LocalDateTime.parse(startTimeStr, ISO_FORMATTER);
            LocalDateTime endTime = LocalDateTime.parse(endTimeStr, ISO_FORMATTER);
            
            if (startTime.isAfter(endTime)) {
                return ApiResponse.error(ApiCode.BAD_REQUEST.getCode(), "开始时间不能晚于结束时间");
            }
            
            log.info("执行时间范围工具热度更新，时间范围: {} 至 {}", 
                    startTime.format(ISO_FORMATTER), 
                    endTime.format(ISO_FORMATTER));
            
            // 调用服务层方法执行时间范围更新
            int updatedCount = toolHeatService.updateToolsHeatByTimeRange(startTime, endTime);
            
            if (updatedCount == 0) {
                return ApiResponse.success("时间范围内没有需要更新的工具", 0);
            }
            
            return ApiResponse.success(String.format("成功更新%d个工具的热度", updatedCount), updatedCount);
        } catch (DateTimeParseException e) {
            log.error("时间格式解析错误", e);
            return ApiResponse.error(ApiCode.BAD_REQUEST.getCode(), "时间格式错误，请使用ISO格式 (yyyy-MM-ddTHH:mm:ss)");
        } catch (Exception e) {
            log.error("更新热度失败", e);
            return ApiResponse.error(ApiCode.ERROR.getCode(), "更新热度失败: " + e.getMessage());
        }
    }
}