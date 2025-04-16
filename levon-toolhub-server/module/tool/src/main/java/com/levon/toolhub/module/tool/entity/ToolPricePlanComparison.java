package com.levon.toolhub.module.tool.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;

/**
 * 工具价格计划对比表
 * @TableName levon_toolhub_tool_price_plan_comparison
 */
@TableName(value ="levon_toolhub_tool_price_plan_comparison")
public class ToolPricePlanComparison implements Serializable {
    /**
     * 对比ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 工具ID
     */
    private Long toolId;

    /**
     * 价格计划对比JSON字符串，格式: [{"comparison_item":"模型访问","free_value":"仅GPT-3.5","paid_value":"GPT-3.5和GPT-4","enterprise_value":"自定义模型","sort_order":1},{"comparison_item":"响应速度","free_value":"标准","paid_value":"更快（优先处理）","enterprise_value":"最高优先级","sort_order":2}]
     */
    private String comparisons;

    /**
     * 创建人id
     */
    private Long createId;

    /**
     * 更新人id
     */
    private Long updateId;

    /**
     * 创建时间
     */
    private Date createDate;

    /**
     * 更新时间
     */
    private Date updateDate;

    /**
     * 是否删除, 0.否 1.是
     */
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    /**
     * 对比ID
     */
    public Long getId() {
        return id;
    }

    /**
     * 对比ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 工具ID
     */
    public Long getToolId() {
        return toolId;
    }

    /**
     * 工具ID
     */
    public void setToolId(Long toolId) {
        this.toolId = toolId;
    }

    /**
     * 价格计划对比JSON字符串，格式: [{"comparison_item":"模型访问","free_value":"仅GPT-3.5","paid_value":"GPT-3.5和GPT-4","enterprise_value":"自定义模型","sort_order":1},{"comparison_item":"响应速度","free_value":"标准","paid_value":"更快（优先处理）","enterprise_value":"最高优先级","sort_order":2}]
     */
    public String getComparisons() {
        return comparisons;
    }

    /**
     * 价格计划对比JSON字符串，格式: [{"comparison_item":"模型访问","free_value":"仅GPT-3.5","paid_value":"GPT-3.5和GPT-4","enterprise_value":"自定义模型","sort_order":1},{"comparison_item":"响应速度","free_value":"标准","paid_value":"更快（优先处理）","enterprise_value":"最高优先级","sort_order":2}]
     */
    public void setComparisons(String comparisons) {
        this.comparisons = comparisons;
    }

    /**
     * 创建人id
     */
    public Long getCreateId() {
        return createId;
    }

    /**
     * 创建人id
     */
    public void setCreateId(Long createId) {
        this.createId = createId;
    }

    /**
     * 更新人id
     */
    public Long getUpdateId() {
        return updateId;
    }

    /**
     * 更新人id
     */
    public void setUpdateId(Long updateId) {
        this.updateId = updateId;
    }

    /**
     * 创建时间
     */
    public Date getCreateDate() {
        return createDate;
    }

    /**
     * 创建时间
     */
    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    /**
     * 更新时间
     */
    public Date getUpdateDate() {
        return updateDate;
    }

    /**
     * 更新时间
     */
    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    /**
     * 是否删除, 0.否 1.是
     */
    public Integer getIsDelete() {
        return isDelete;
    }

    /**
     * 是否删除, 0.否 1.是
     */
    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }
}