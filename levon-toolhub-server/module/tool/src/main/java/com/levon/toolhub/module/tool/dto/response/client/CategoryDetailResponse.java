package com.levon.toolhub.module.tool.dto.response.client;

import java.io.Serializable;

/**
 * 主分类详情DTO
 */
public class CategoryDetailResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 分类ID
     */
    private Long id;

    /**
     * 分类名称
     */
    private String name;

    /**
     * 分类代码，用于URL和前端引用
     */
    private String code;

    /**
     * 分类描述
     */
    private String description;

    /**
     * 图标键名，对应前端图标库
     */
    private String iconKey;

    /**
     * 背景渐变起始颜色(hex)
     */
    private String bgColorStart;

    /**
     * 背景渐变结束颜色(hex)
     */
    private String bgColorEnd;

    /**
     * 背景图片URL，可为null
     */
    private String background;

    /**
     * 排序顺序
     */
    private Integer sortOrder;

    /**
     * 该分类下的工具总数
     */
    private Integer toolCount;

    /**
     * 该分类下的子分类总数
     */
    private Integer subcategoryCount;

    /**
     * 本月新增工具数
     */
    private Integer newToolsThisMonth;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getBgColorStart() {
        return bgColorStart;
    }

    public void setBgColorStart(String bgColorStart) {
        this.bgColorStart = bgColorStart;
    }

    public String getBgColorEnd() {
        return bgColorEnd;
    }

    public void setBgColorEnd(String bgColorEnd) {
        this.bgColorEnd = bgColorEnd;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
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

    public Integer getSubcategoryCount() {
        return subcategoryCount;
    }

    public void setSubcategoryCount(Integer subcategoryCount) {
        this.subcategoryCount = subcategoryCount;
    }

    public Integer getNewToolsThisMonth() {
        return newToolsThisMonth;
    }

    public void setNewToolsThisMonth(Integer newToolsThisMonth) {
        this.newToolsThisMonth = newToolsThisMonth;
    }
} 