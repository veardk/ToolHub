package com.levon.toolhub.module.tool.dto.response.client;

/**
 * 工具问题类别响应DTO
 */
public class ToolReportCategoryResponse {

    /**
     * 类别值
     */
    private Integer value;

    /**
     * 类别标签
     */
    private String label;

    /**
     * 无参构造函数
     */
    public ToolReportCategoryResponse() {
    }

    /**
     * 带参构造函数
     */
    public ToolReportCategoryResponse(Integer value, String label) {
        this.value = value;
        this.label = label;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    @Override
    public String toString() {
        return "ToolReportCategoryResponse{" +
                "value=" + value +
                ", label='" + label + '\'' +
                '}';
    }
} 