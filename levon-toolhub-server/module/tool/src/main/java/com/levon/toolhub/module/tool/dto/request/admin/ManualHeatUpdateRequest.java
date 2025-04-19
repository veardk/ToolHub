package com.levon.toolhub.module.tool.dto.request.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * 手动热度更新请求DTO
 * 用于根据时间范围更新工具热度
 */
public class ManualHeatUpdateRequest {
    
    /**
     * 开始时间 (ISO格式：yyyy-MM-ddTHH:mm:ss)
     */
    @NotBlank(message = "开始时间不能为空")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}", message = "开始时间格式不正确，应为：yyyy-MM-ddTHH:mm:ss")
    private String startTime;
    
    /**
     * 结束时间 (ISO格式：yyyy-MM-ddTHH:mm:ss)
     */
    @NotBlank(message = "结束时间不能为空")
    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}", message = "结束时间格式不正确，应为：yyyy-MM-ddTHH:mm:ss")
    private String endTime;

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public ManualHeatUpdateRequest(String startTime, String endTime) {
        this.startTime = startTime;
        this.endTime = endTime;
    }

    @Override
    public String toString() {
        return "ManualHeatUpdateRequest{" +
                "startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                '}';
    }
}