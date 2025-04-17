package com.levon.toolhub.module.tool.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.baomidou.mybatisplus.annotation.TableName;
import com.levon.toolhub.common.model.BaseEntity;

import java.time.LocalDateTime;

/**
 * 工具问题报告实体类
 */
@TableName("levon_toolhub_tool_report")
public class ToolReport extends BaseEntity {

    /**
     * 报告ID，主键
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 工具ID
     */
    private Long toolId;

    /**
     * 问题类别，0:信息错误, 1:链接失效, 2:内容过时, 3:其他问题
     */
    private Integer category;

    /**
     * 问题描述
     */
    private String description;

    /**
     * 用户ID，允许NULL表示匿名提交
     */
    private Long userId;

    /**
     * 报告状态，0:待处理, 1:已解决, 2:已关闭
     */
    private Integer status;

    // 构造函数
    public ToolReport() {
    }

    // Getter和Setter方法
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getToolId() {
        return toolId;
    }

    public void setToolId(Long toolId) {
        this.toolId = toolId;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "ToolReport{" +
                "id=" + id +
                ", toolId=" + toolId +
                ", category=" + category +
                ", description='" + description + '\'' +
                ", userId=" + userId +
                ", status=" + status +
                ", " + super.toString() +
                '}';
    }
}