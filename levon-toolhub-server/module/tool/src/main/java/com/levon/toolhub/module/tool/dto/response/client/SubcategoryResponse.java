package com.levon.toolhub.module.tool.dto.response.client;

import java.io.Serializable;

/**
 * 子分类DTO
 */
public class SubcategoryResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 子分类ID
     */
    private Long id;

    /**
     * 主分类ID
     */
    private Long categoryId;

    /**
     * 子分类名称
     */
    private String name;

    /**
     * 子分类代码
     */
    private String code;

    /**
     * 子分类描述
     */
    private String description;

    /**
     * 图标键名，对应前端图标组件
     */
    private String iconKey;

    /**
     * 排序顺序
     */
    private Integer sortOrder;

    /**
     * 该子分类下的工具数量
     */
    private Integer toolCount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIconKey() {
        return iconKey;
    }

    public void setIconKey(String iconKey) {
        this.iconKey = iconKey;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public Integer getToolCount() {
        return toolCount;
    }

    public void setToolCount(Integer toolCount) {
        this.toolCount = toolCount;
    }
} 