package com.levon.toolhub.module.tool.dto.request.admin;

/**
 * 手动热度更新请求
 */
public class ManualHeatUpdateRequest {
    
    /**
     * 开始时间，格式: yyyy-MM-ddTHH:mm:ss
     */
    private String startTime;
    
    /**
     * 结束时间，格式: yyyy-MM-ddTHH:mm:ss
     */
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

    @Override
    public String toString() {
        return "ManualHeatUpdateRequest{" +
                "startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                '}';
    }
} 