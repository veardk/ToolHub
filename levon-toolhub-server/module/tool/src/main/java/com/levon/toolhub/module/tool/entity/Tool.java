package com.levon.toolhub.module.tool.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.levon.toolhub.common.model.BaseEntity;

import java.io.Serializable;

/**
 * 工具表
 * @TableName levon_toolhub_tool
 */
@TableName(value ="levon_toolhub_tool")
public class Tool extends BaseEntity implements Serializable {
    /**
     * 工具ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 工具名称
     */
    private String name;

    /**
     * 主分类id
     */
    private Integer categoryId;

    /**
     * 子分类ID
     */
    private Long subcategoryId;

    /**
     * 工具图标URL
     */
    private String logo;

    /**
     * 官网URL
     */
    private String websiteUrl;

    /**
     * 简短描述
     */
    private String shortDescription;

    /**
     * 完整描述
     */
    private String fullDescription;

    /**
     * 价格类型: 1.免费 2.付费 3.部分免费
     */
    private Integer priceType;

    /**
     * 是否新上线: 0.否 1.是
     */
    private Integer isNew;

    /**
     *  平台编码JSON数组[1,3,4,5] ，1=Web,2=iOS,3=Android,4=Mac,5=Linux,6=Windows
     */
    private String platforms;

    /**
     * 开发者/公司名称
     */
    private String developer;

    /**
     * 开发者/公司信息
     */
    private String developerInfo;

    /**
     * 开发者/公司官网URL
     */
    private String developerUrl;

    /**
     * 开发者/公司官网logo URL
     */
    private String developerLogo;

    /**
     * 查看次数
     */
    private Long viewCount;

    /**
     * 收藏次数
     */
    private Long favoriteCount;

    /**
     * 热度值
     */
    private Integer heat;

    /**
     * 热度描述，用于前端展示，如"25.6k热度"、"火热"、"热门"、"一般"
     */
    private String heatDesc;

    /**
     * 热度等级
     * 1: 一般  (heat < 1000)
     * 2: 热门  (heat >= 1000)
     * 3: 火热  (heat >= 10000)
     * 4: 爆火  (heat >= 100000)
     */
    private Integer heatLevel;

    /**
     * 状态: 0.下架 1.上架
     */
    private Integer status;

    /**
     * 核心特点JSON字符串，格式: [{"title":"自然语言对话","feature_group":1,"sort_order":1}]
     */
    private String coreFeatures;

    /**
     * 应用场景JSON字符串，格式: [{"title":"学习辅助与解答","sort_order":1}]
     */
    private String useCases;

    /**
     * 技术规格JSON字符串，格式: [{"spec_name":"API访问","spec_value":"可通过OpenAI API接入","sort_order":1}]
     */
    private String techSpecs;

    /**
     * 购买建议JSON字符串，格式: [{"user_type":"适用免费版用户","suggestion_points":["不需要高级功能","主要用于简单问答"],"sort_order":1}]
     */
    private String purchaseSuggestions;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    public Integer getHeat() {
        return heat;
    }

    public void setHeat(Integer heat) {
        this.heat = heat;
    }

    public String getHeatDesc() {
        return heatDesc;
    }

    public void setHeatDesc(String heatDesc) {
        this.heatDesc = heatDesc;
    }

    public Integer getHeatLevel() {
        return heatLevel;
    }

    public void setHeatLevel(Integer heatLevel) {
        this.heatLevel = heatLevel;
    }

    /**
     * 工具ID
     */
    public Long getId() {
        return id;
    }

    /**
     * 工具ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 工具名称
     */
    public String getName() {
        return name;
    }

    /**
     * 工具名称
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 主分类id
     */
    public Integer getCategoryId() {
        return categoryId;
    }

    /**
     * 主分类id
     */
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    /**
     * 子分类ID
     */
    public Long getSubcategoryId() {
        return subcategoryId;
    }

    /**
     * 子分类ID
     */
    public void setSubcategoryId(Long subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    /**
     * 工具图标URL
     */
    public String getLogo() {
        return logo;
    }

    /**
     * 工具图标URL
     */
    public void setLogo(String logo) {
        this.logo = logo;
    }

    /**
     * 官网URL
     */
    public String getWebsiteUrl() {
        return websiteUrl;
    }

    /**
     * 官网URL
     */
    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    /**
     * 简短描述
     */
    public String getShortDescription() {
        return shortDescription;
    }

    /**
     * 简短描述
     */
    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    /**
     * 完整描述
     */
    public String getFullDescription() {
        return fullDescription;
    }

    /**
     * 完整描述
     */
    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }

    /**
     * 价格类型: 1.免费 2.付费 3.部分免费
     */
    public Integer getPriceType() {
        return priceType;
    }

    /**
     * 价格类型: 1.免费 2.付费 3.部分免费
     */
    public void setPriceType(Integer priceType) {
        this.priceType = priceType;
    }

    /**
     * 是否新上线: 0.否 1.是
     */
    public Integer getIsNew() {
        return isNew;
    }

    /**
     * 是否新上线: 0.否 1.是
     */
    public void setIsNew(Integer isNew) {
        this.isNew = isNew;
    }

    /**
     * 平台编码JSON数组[1,3,4,5] ，1=Web,2=iOS,3=Android,4=Mac,5=Linux,6=Windows
     */
    public String getPlatforms() {
        return platforms;
    }

    /**
     * 平台编码JSON数组[1,3,4,5] ，1=Web,2=iOS,3=Android,4=Mac,5=Linux,6=Windows
     */
    public void setPlatforms(String platforms) {
        this.platforms = platforms;
    }

    /**
     * 开发者/公司名称
     */
    public String getDeveloper() {
        return developer;
    }

    /**
     * 开发者/公司名称
     */
    public void setDeveloper(String developer) {
        this.developer = developer;
    }

    /**
     * 开发者/公司信息
     */
    public String getDeveloperInfo() {
        return developerInfo;
    }

    /**
     * 开发者/公司信息
     */
    public void setDeveloperInfo(String developerInfo) {
        this.developerInfo = developerInfo;
    }

    /**
     * 开发者/公司官网URL
     */
    public String getDeveloperUrl() {
        return developerUrl;
    }

    /**
     * 开发者/公司官网URL
     */
    public void setDeveloperUrl(String developerUrl) {
        this.developerUrl = developerUrl;
    }

    /**
     * 开发者/公司官网logo URL
     */
    public String getDeveloperLogo() {
        return developerLogo;
    }

    /**
     * 开发者/公司官网logo URL
     */
    public void setDeveloperLogo(String developerLogo) {
        this.developerLogo = developerLogo;
    }

    /**
     * 查看次数
     */
    public Long getViewCount() {
        return viewCount;
    }

    /**
     * 查看次数
     */
    public void setViewCount(Long viewCount) {
        this.viewCount = viewCount;
    }

    /**
     * 收藏次数
     */
    public Long getFavoriteCount() {
        return favoriteCount;
    }

    /**
     * 收藏次数
     */
    public void setFavoriteCount(Long favoriteCount) {
        this.favoriteCount = favoriteCount;
    }

    /**
     * 状态: 0.下架 1.上架
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * 状态: 0.下架 1.上架
     */
    public void setStatus(Integer status) {
        this.status = status;
    }

    /**
     * 核心特点JSON字符串，格式: [{"title":"自然语言对话","feature_group":1,"sort_order":1}]
     */
    public String getCoreFeatures() {
        return coreFeatures;
    }

    /**
     * 核心特点JSON字符串，格式: [{"title":"自然语言对话","feature_group":1,"sort_order":1}]
     */
    public void setCoreFeatures(String coreFeatures) {
        this.coreFeatures = coreFeatures;
    }

    /**
     * 应用场景JSON字符串，格式: [{"title":"学习辅助与解答","sort_order":1}]
     */
    public String getUseCases() {
        return useCases;
    }

    /**
     * 应用场景JSON字符串，格式: [{"title":"学习辅助与解答","sort_order":1}]
     */
    public void setUseCases(String useCases) {
        this.useCases = useCases;
    }

    /**
     * 技术规格JSON字符串，格式: [{"spec_name":"API访问","spec_value":"可通过OpenAI API接入","sort_order":1}]
     */
    public String getTechSpecs() {
        return techSpecs;
    }

    /**
     * 技术规格JSON字符串，格式: [{"spec_name":"API访问","spec_value":"可通过OpenAI API接入","sort_order":1}]
     */
    public void setTechSpecs(String techSpecs) {
        this.techSpecs = techSpecs;
    }

    /**
     * 购买建议JSON字符串，格式: [{"user_type":"适用免费版用户","suggestion_points":["不需要高级功能","主要用于简单问答"],"sort_order":1}]
     */
    public String getPurchaseSuggestions() {
        return purchaseSuggestions;
    }

    /**
     * 购买建议JSON字符串，格式: [{"user_type":"适用免费版用户","suggestion_points":["不需要高级功能","主要用于简单问答"],"sort_order":1}]
     */
    public void setPurchaseSuggestions(String purchaseSuggestions) {
        this.purchaseSuggestions = purchaseSuggestions;
    }

}