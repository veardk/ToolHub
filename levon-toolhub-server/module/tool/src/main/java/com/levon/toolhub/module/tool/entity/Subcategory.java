package com.levon.toolhub.module.tool.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.levon.toolhub.common.model.BaseEntity;

import java.io.Serializable;
import java.util.Date;

/**
 * 工具子分类表
 * @TableName levon_toolhub_tool_subcategory
 */
@TableName(value ="levon_toolhub_tool_subcategory")
public class Subcategory extends BaseEntity implements Serializable {
    /**
     * 子分类ID
     */
    @TableId(type = IdType.AUTO)
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
     * 子分类编码
     */
    private String code;

    /**
     * 子分类描述
     */
    private String description;

    /**
     * 组件库图标映射键名，如"image-generation"、"writing-content"等
     */
    private String iconKey;

    /**
     * 排序序号
     */
    private Integer sortOrder;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    /**
     * 子分类ID
     */
    public Long getId() {
        return id;
    }

    /**
     * 子分类ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 主分类ID
     */
    public Long getCategoryId() {
        return categoryId;
    }

    /**
     * 主分类ID
     */
    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    /**
     * 子分类名称
     */
    public String getName() {
        return name;
    }

    /**
     * 子分类名称
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 子分类编码
     */
    public String getCode() {
        return code;
    }

    /**
     * 子分类编码
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * 子分类描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 子分类描述
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * 组件库图标映射键名，如"image-generation"、"writing-content"等
     */
    public String getIconKey() {
        return iconKey;
    }

    /**
     * 组件库图标映射键名，如"image-generation"、"writing-content"等
     */
    public void setIconKey(String iconKey) {
        this.iconKey = iconKey;
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

    @Override
    public String toString() {
        return "Subcategory{" +
                "id=" + id +
                ", categoryId=" + categoryId +
                ", name='" + name + '\'' +
                ", code='" + code + '\'' +
                ", description='" + description + '\'' +
                ", iconKey='" + iconKey + '\'' +
                ", sortOrder=" + sortOrder +
                '}';
    }
}