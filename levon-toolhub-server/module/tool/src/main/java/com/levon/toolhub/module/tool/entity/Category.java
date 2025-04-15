package com.levon.toolhub.module.tool.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.levon.toolhub.common.model.BaseEntity;

import java.io.Serializable;
import java.util.Date;

/**
 * 工具主分类表
 * @TableName levon_toolhub_tool_category
 */
@TableName(value ="levon_toolhub_tool_category")
public class Category extends BaseEntity implements Serializable {
    /**
     * 主分类ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 分类名称
     */
    private String name;

    /**
     * 分类编码
     */
    private String code;

    /**
     * 分类描述
     */
    private String description;

    /**
     * 组件库图标映射键名
     */
    private String iconKey;

    /**
     * 背景渐变起始色
     */
    private String bgColorStart;

    /**
     * 背景渐变结束色
     */
    private String bgColorEnd;

    /**
     * 背景样式
     */
    private String background;

    /**
     * 排序序号
     */
    private Integer sortOrder;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    /**
     * 主分类ID
     */
    public Long getId() {
        return id;
    }

    /**
     * 主分类ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 分类名称
     */
    public String getName() {
        return name;
    }

    /**
     * 分类名称
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 分类编码
     */
    public String getCode() {
        return code;
    }

    /**
     * 分类编码
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * 分类描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 分类描述
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * 组件库图标映射键名
     */
    public String getIconKey() {
        return iconKey;
    }

    /**
     * 组件库图标映射键名
     */
    public void setIconKey(String iconKey) {
        this.iconKey = iconKey;
    }

    /**
     * 背景渐变起始色
     */
    public String getBgColorStart() {
        return bgColorStart;
    }

    /**
     * 背景渐变起始色
     */
    public void setBgColorStart(String bgColorStart) {
        this.bgColorStart = bgColorStart;
    }

    /**
     * 背景渐变结束色
     */
    public String getBgColorEnd() {
        return bgColorEnd;
    }

    /**
     * 背景渐变结束色
     */
    public void setBgColorEnd(String bgColorEnd) {
        this.bgColorEnd = bgColorEnd;
    }

    /**
     * 背景样式
     */
    public String getBackground() {
        return background;
    }

    /**
     * 背景样式
     */
    public void setBackground(String background) {
        this.background = background;
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

}