package com.levon.toolhub.module.tool.dto.request.client;


import jakarta.validation.constraints.*;

/**
 * 工具问题报告请求DTO
 */
public class ToolReportRequest {

    /**
     * 问题类别，0:信息错误, 1:链接失效, 2:内容过时, 3:其他问题
     */
    @NotNull(message = "问题类别不能为空")
    @Min(value = 0, message = "问题类别不合法")
    @Max(value = 3, message = "问题类别不合法")
    private Integer category;

    /**
     * 问题描述
     */
    @NotBlank(message = "问题描述不能为空")
    @Size(min = 10, max = 500, message = "问题描述长度应在10-500个字符之间")
    private String description;

    /**
     * 无参构造函数
     */
    public ToolReportRequest() {
    }

    /**
     * 带参构造函数
     */
    public ToolReportRequest(Integer category, String description) {
        this.category = category;
        this.description = description;
    }

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "ToolReportRequest{" +
                "category=" + category +
                ", description='" + description + '\'' +
                '}';
    }
} 