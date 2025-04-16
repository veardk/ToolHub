package com.levon.toolhub.module.tool.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 工具价格计划表
 * @TableName levon_toolhub_tool_price_plan
 */
@TableName(value ="levon_toolhub_tool_price_plan")
public class ToolPricePlan implements Serializable {
    /**
     * 计划ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 工具ID
     */
    private Long toolId;

    /**
     * 计划名称（如免费版、Plus版）
     */
    private String planName;

    /**
     * 计划代码：free/plus/enterprise
     */
    private String planCode;

    /**
     * 价格金额
     */
    private BigDecimal price;

    /**
     * 价格周期: 1.一次性 2.月付 3.年付 4.自定义
     */
    private Integer pricePeriod;

    /**
     * 自定义周期描述
     */
    private String customPeriod;

    /**
     * 版本描述
     */
    private String description;

    /**
     * 功能特性JSON字符串，格式: [{"feature_title":"基本对话功能","feature_description":"支持常规文本对话","is_included":1,"sort_order":1},{"feature_title":"高峰期优先使用权","feature_description":"高峰期无需排队","is_included":1,"sort_order":2}]
     */
    private String features;

    /**
     * 排序序号
     */
    private Integer sortOrder;

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
     * 计划ID
     */
    public Long getId() {
        return id;
    }

    /**
     * 计划ID
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
     * 计划名称（如免费版、Plus版）
     */
    public String getPlanName() {
        return planName;
    }

    /**
     * 计划名称（如免费版、Plus版）
     */
    public void setPlanName(String planName) {
        this.planName = planName;
    }

    /**
     * 计划代码：free/plus/enterprise
     */
    public String getPlanCode() {
        return planCode;
    }

    /**
     * 计划代码：free/plus/enterprise
     */
    public void setPlanCode(String planCode) {
        this.planCode = planCode;
    }

    /**
     * 价格金额
     */
    public BigDecimal getPrice() {
        return price;
    }

    /**
     * 价格金额
     */
    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    /**
     * 价格周期: 1.一次性 2.月付 3.年付 4.自定义
     */
    public Integer getPricePeriod() {
        return pricePeriod;
    }

    /**
     * 价格周期: 1.一次性 2.月付 3.年付 4.自定义
     */
    public void setPricePeriod(Integer pricePeriod) {
        this.pricePeriod = pricePeriod;
    }

    /**
     * 自定义周期描述
     */
    public String getCustomPeriod() {
        return customPeriod;
    }

    /**
     * 自定义周期描述
     */
    public void setCustomPeriod(String customPeriod) {
        this.customPeriod = customPeriod;
    }

    /**
     * 版本描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 版本描述
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * 功能特性JSON字符串，格式: [{"feature_title":"基本对话功能","feature_description":"支持常规文本对话","is_included":1,"sort_order":1},{"feature_title":"高峰期优先使用权","feature_description":"高峰期无需排队","is_included":1,"sort_order":2}]
     */
    public String getFeatures() {
        return features;
    }

    /**
     * 功能特性JSON字符串，格式: [{"feature_title":"基本对话功能","feature_description":"支持常规文本对话","is_included":1,"sort_order":1},{"feature_title":"高峰期优先使用权","feature_description":"高峰期无需排队","is_included":1,"sort_order":2}]
     */
    public void setFeatures(String features) {
        this.features = features;
    }

    /**
     * 排序序号
     */
    public Integer getSortOrder() {
        return sortOrder;
    }

    /**
     * 排序序号
     */
    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
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