package com.levon.toolhub.module.tool.dto.response.client;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * 工具详情响应DTO
 */
public class ToolDetailResponse {

    /**
     * 基本信息
     */
    private BasicInfo basicInfo;

    /**
     * 核心特点
     */
    private List<CoreFeature> coreFeatures;

    /**
     * 应用场景
     */
    private List<UseCase> useCases;

    /**
     * 技术规格
     */
    private List<TechSpec> techSpecs;

    /**
     * 价格计划
     */
    private List<PricePlan> pricePlans;

    /**
     * 计划对比
     */
    private List<PlanComparison> planComparison;

    /**
     * 购买建议
     */
    private List<PurchaseSuggestion> purchaseSuggestions;

    /**
     * 无参构造函数
     */
    public ToolDetailResponse() {
    }

    public BasicInfo getBasicInfo() {
        return basicInfo;
    }

    public void setBasicInfo(BasicInfo basicInfo) {
        this.basicInfo = basicInfo;
    }

    public List<CoreFeature> getCoreFeatures() {
        return coreFeatures;
    }

    public void setCoreFeatures(List<CoreFeature> coreFeatures) {
        this.coreFeatures = coreFeatures;
    }

    public List<UseCase> getUseCases() {
        return useCases;
    }

    public void setUseCases(List<UseCase> useCases) {
        this.useCases = useCases;
    }

    public List<TechSpec> getTechSpecs() {
        return techSpecs;
    }

    public void setTechSpecs(List<TechSpec> techSpecs) {
        this.techSpecs = techSpecs;
    }

    public List<PricePlan> getPricePlans() {
        return pricePlans;
    }

    public void setPricePlans(List<PricePlan> pricePlans) {
        this.pricePlans = pricePlans;
    }

    public List<PlanComparison> getPlanComparison() {
        return planComparison;
    }

    public void setPlanComparison(List<PlanComparison> planComparison) {
        this.planComparison = planComparison;
    }

    public List<PurchaseSuggestion> getPurchaseSuggestions() {
        return purchaseSuggestions;
    }

    public void setPurchaseSuggestions(List<PurchaseSuggestion> purchaseSuggestions) {
        this.purchaseSuggestions = purchaseSuggestions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ToolDetailResponse that = (ToolDetailResponse) o;
        return Objects.equals(basicInfo, that.basicInfo) &&
                Objects.equals(coreFeatures, that.coreFeatures) &&
                Objects.equals(useCases, that.useCases) &&
                Objects.equals(techSpecs, that.techSpecs) &&
                Objects.equals(pricePlans, that.pricePlans) &&
                Objects.equals(planComparison, that.planComparison) &&
                Objects.equals(purchaseSuggestions, that.purchaseSuggestions);
    }

    @Override
    public int hashCode() {
        return Objects.hash(basicInfo, coreFeatures, useCases, techSpecs, pricePlans, planComparison, purchaseSuggestions);
    }

    @Override
    public String toString() {
        return "ToolDetailResponse{" +
                "basicInfo=" + basicInfo +
                ", coreFeatures=" + coreFeatures +
                ", useCases=" + useCases +
                ", techSpecs=" + techSpecs +
                ", pricePlans=" + pricePlans +
                ", planComparison=" + planComparison +
                ", purchaseSuggestions=" + purchaseSuggestions +
                '}';
    }

    /**
     * 基本信息DTO
     */
    public static class BasicInfo {
        /**
         * 工具ID
         */
        private Long id;

        /**
         * 工具名称
         */
        private String name;

        /**
         * 主分类ID
         */
        private Integer categoryId;

        /**
         * 主分类名称
         */
        private String categoryName;

        /**
         * 子分类ID
         */
        private Long subcategoryId;

        /**
         * 子分类名称
         */
        private String subcategoryName;

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
         * 热度描述
         */
        private String heatDesc;

        /**
         * 热度等级
         */
        private Integer heatLevel;

        /**
         * 更新时间
         */
        private String updateTime;

        /**
         * 支持的平台列表
         */
        private List<Integer> platforms;

        /**
         * 无参构造函数
         */
        public BasicInfo() {
        }

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

        public Integer getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(Integer categoryId) {
            this.categoryId = categoryId;
        }

        public String getCategoryName() {
            return categoryName;
        }

        public void setCategoryName(String categoryName) {
            this.categoryName = categoryName;
        }

        public Long getSubcategoryId() {
            return subcategoryId;
        }

        public void setSubcategoryId(Long subcategoryId) {
            this.subcategoryId = subcategoryId;
        }

        public String getSubcategoryName() {
            return subcategoryName;
        }

        public void setSubcategoryName(String subcategoryName) {
            this.subcategoryName = subcategoryName;
        }

        public String getLogo() {
            return logo;
        }

        public void setLogo(String logo) {
            this.logo = logo;
        }

        public String getWebsiteUrl() {
            return websiteUrl;
        }

        public void setWebsiteUrl(String websiteUrl) {
            this.websiteUrl = websiteUrl;
        }

        public String getShortDescription() {
            return shortDescription;
        }

        public void setShortDescription(String shortDescription) {
            this.shortDescription = shortDescription;
        }

        public String getFullDescription() {
            return fullDescription;
        }

        public void setFullDescription(String fullDescription) {
            this.fullDescription = fullDescription;
        }

        public Integer getPriceType() {
            return priceType;
        }

        public void setPriceType(Integer priceType) {
            this.priceType = priceType;
        }

        public Integer getIsNew() {
            return isNew;
        }

        public void setIsNew(Integer isNew) {
            this.isNew = isNew;
        }

        public String getDeveloper() {
            return developer;
        }

        public void setDeveloper(String developer) {
            this.developer = developer;
        }

        public String getDeveloperInfo() {
            return developerInfo;
        }

        public void setDeveloperInfo(String developerInfo) {
            this.developerInfo = developerInfo;
        }

        public String getDeveloperUrl() {
            return developerUrl;
        }

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

        public void setViewCount(Long viewCount) {
            this.viewCount = viewCount;
        }

        public Long getFavoriteCount() {
            return favoriteCount;
        }

        public void setFavoriteCount(Long favoriteCount) {
            this.favoriteCount = favoriteCount;
        }

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

        public String getUpdateTime() {
            return updateTime;
        }

        public void setUpdateTime(String updateTime) {
            this.updateTime = updateTime;
        }

        public List<Integer> getPlatforms() {
            return platforms;
        }

        public void setPlatforms(List<Integer> platforms) {
            this.platforms = platforms;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            BasicInfo basicInfo = (BasicInfo) o;
            return Objects.equals(id, basicInfo.id) &&
                    Objects.equals(name, basicInfo.name) &&
                    Objects.equals(categoryId, basicInfo.categoryId) &&
                    Objects.equals(categoryName, basicInfo.categoryName) &&
                    Objects.equals(subcategoryId, basicInfo.subcategoryId) &&
                    Objects.equals(subcategoryName, basicInfo.subcategoryName) &&
                    Objects.equals(logo, basicInfo.logo) &&
                    Objects.equals(websiteUrl, basicInfo.websiteUrl) &&
                    Objects.equals(shortDescription, basicInfo.shortDescription) &&
                    Objects.equals(fullDescription, basicInfo.fullDescription) &&
                    Objects.equals(priceType, basicInfo.priceType) &&
                    Objects.equals(isNew, basicInfo.isNew) &&
                    Objects.equals(developer, basicInfo.developer) &&
                    Objects.equals(developerInfo, basicInfo.developerInfo) &&
                    Objects.equals(developerUrl, basicInfo.developerUrl) &&
                    Objects.equals(developerLogo, basicInfo.developerLogo) &&
                    Objects.equals(viewCount, basicInfo.viewCount) &&
                    Objects.equals(favoriteCount, basicInfo.favoriteCount) &&
                    Objects.equals(heat, basicInfo.heat) &&
                    Objects.equals(heatDesc, basicInfo.heatDesc) &&
                    Objects.equals(heatLevel, basicInfo.heatLevel) &&
                    Objects.equals(updateTime, basicInfo.updateTime) &&
                    Objects.equals(platforms, basicInfo.platforms);
        }

        @Override
        public int hashCode() {
            return Objects.hash(id, name, categoryId, categoryName, subcategoryId, subcategoryName, logo, websiteUrl,
                    shortDescription, fullDescription, priceType, isNew, developer, developerInfo, developerUrl,
                    developerLogo, viewCount, favoriteCount, heat, heatDesc, heatLevel, updateTime, platforms);
        }

        @Override
        public String toString() {
            return "BasicInfo{" +
                    "id=" + id +
                    ", name='" + name + '\'' +
                    ", categoryId=" + categoryId +
                    ", categoryName='" + categoryName + '\'' +
                    ", subcategoryId=" + subcategoryId +
                    ", subcategoryName='" + subcategoryName + '\'' +
                    ", logo='" + logo + '\'' +
                    ", websiteUrl='" + websiteUrl + '\'' +
                    ", shortDescription='" + shortDescription + '\'' +
                    ", fullDescription='" + fullDescription + '\'' +
                    ", priceType=" + priceType +
                    ", isNew=" + isNew +
                    ", developer='" + developer + '\'' +
                    ", developerInfo='" + developerInfo + '\'' +
                    ", developerUrl='" + developerUrl + '\'' +
                    ", developerLogo='" + developerLogo + '\'' +
                    ", viewCount=" + viewCount +
                    ", favoriteCount=" + favoriteCount +
                    ", heat=" + heat +
                    ", heatDesc='" + heatDesc + '\'' +
                    ", heatLevel=" + heatLevel +
                    ", updateTime='" + updateTime + '\'' +
                    ", platforms=" + platforms +
                    '}';
        }
    }

    /**
     * 核心特点DTO
     */
    public static class CoreFeature {
        /**
         * 特点标题
         */
        private String title;

        /**
         * 特点分组
         */
        private Integer featureGroup;

        /**
         * 排序序号
         */
        private Integer sortOrder;

        /**
         * 无参构造函数
         */
        public CoreFeature() {
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public Integer getFeatureGroup() {
            return featureGroup;
        }

        public void setFeatureGroup(Integer featureGroup) {
            this.featureGroup = featureGroup;
        }

        public Integer getSortOrder() {
            return sortOrder;
        }

        public void setSortOrder(Integer sortOrder) {
            this.sortOrder = sortOrder;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            CoreFeature that = (CoreFeature) o;
            return Objects.equals(title, that.title) &&
                    Objects.equals(featureGroup, that.featureGroup) &&
                    Objects.equals(sortOrder, that.sortOrder);
        }

        @Override
        public int hashCode() {
            return Objects.hash(title, featureGroup, sortOrder);
        }

        @Override
        public String toString() {
            return "CoreFeature{" +
                    "title='" + title + '\'' +
                    ", featureGroup=" + featureGroup +
                    ", sortOrder=" + sortOrder +
                    '}';
        }
    }

    /**
     * 应用场景DTO
     */
    public static class UseCase {
        /**
         * 场景标题
         */
        private String title;

        /**
         * 排序序号
         */
        private Integer sortOrder;

        /**
         * 无参构造函数
         */
        public UseCase() {
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public Integer getSortOrder() {
            return sortOrder;
        }

        public void setSortOrder(Integer sortOrder) {
            this.sortOrder = sortOrder;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            UseCase useCase = (UseCase) o;
            return Objects.equals(title, useCase.title) &&
                    Objects.equals(sortOrder, useCase.sortOrder);
        }

        @Override
        public int hashCode() {
            return Objects.hash(title, sortOrder);
        }

        @Override
        public String toString() {
            return "UseCase{" +
                    "title='" + title + '\'' +
                    ", sortOrder=" + sortOrder +
                    '}';
        }
    }

    /**
     * 技术规格DTO
     */
    public static class TechSpec {
        /**
         * 规格名称
         */
        private String specName;

        /**
         * 规格值
         */
        private String specValue;

        /**
         * 排序序号
         */
        private Integer sortOrder;

        /**
         * 无参构造函数
         */
        public TechSpec() {
        }

        public String getSpecName() {
            return specName;
        }

        public void setSpecName(String specName) {
            this.specName = specName;
        }

        public String getSpecValue() {
            return specValue;
        }

        public void setSpecValue(String specValue) {
            this.specValue = specValue;
        }

        public Integer getSortOrder() {
            return sortOrder;
        }

        public void setSortOrder(Integer sortOrder) {
            this.sortOrder = sortOrder;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            TechSpec techSpec = (TechSpec) o;
            return Objects.equals(specName, techSpec.specName) &&
                    Objects.equals(specValue, techSpec.specValue) &&
                    Objects.equals(sortOrder, techSpec.sortOrder);
        }

        @Override
        public int hashCode() {
            return Objects.hash(specName, specValue, sortOrder);
        }

        @Override
        public String toString() {
            return "TechSpec{" +
                    "specName='" + specName + '\'' +
                    ", specValue='" + specValue + '\'' +
                    ", sortOrder=" + sortOrder +
                    '}';
        }
    }

    /**
     * 价格计划DTO
     */
    public static class PricePlan {
        /**
         * 计划ID
         */
        private Long id;

        /**
         * 计划名称
         */
        private String planName;

        /**
         * 计划代码
         */
        private String planCode;

        /**
         * 价格金额
         */
        private Double price;

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
         * 功能特性列表
         */
        private List<PlanFeature> features;

        /**
         * 排序序号
         */
        private Integer sortOrder;

        /**
         * 无参构造函数
         */
        public PricePlan() {
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getPlanName() {
            return planName;
        }

        public void setPlanName(String planName) {
            this.planName = planName;
        }

        public String getPlanCode() {
            return planCode;
        }

        public void setPlanCode(String planCode) {
            this.planCode = planCode;
        }

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }

        public Integer getPricePeriod() {
            return pricePeriod;
        }

        public void setPricePeriod(Integer pricePeriod) {
            this.pricePeriod = pricePeriod;
        }

        public String getCustomPeriod() {
            return customPeriod;
        }

        public void setCustomPeriod(String customPeriod) {
            this.customPeriod = customPeriod;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public List<PlanFeature> getFeatures() {
            return features;
        }

        public void setFeatures(List<PlanFeature> features) {
            this.features = features;
        }

        public Integer getSortOrder() {
            return sortOrder;
        }

        public void setSortOrder(Integer sortOrder) {
            this.sortOrder = sortOrder;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PricePlan pricePlan = (PricePlan) o;
            return Objects.equals(id, pricePlan.id) &&
                    Objects.equals(planName, pricePlan.planName) &&
                    Objects.equals(planCode, pricePlan.planCode) &&
                    Objects.equals(price, pricePlan.price) &&
                    Objects.equals(pricePeriod, pricePlan.pricePeriod) &&
                    Objects.equals(customPeriod, pricePlan.customPeriod) &&
                    Objects.equals(description, pricePlan.description) &&
                    Objects.equals(features, pricePlan.features) &&
                    Objects.equals(sortOrder, pricePlan.sortOrder);
        }

        @Override
        public int hashCode() {
            return Objects.hash(id, planName, planCode, price, pricePeriod, customPeriod, description, features, sortOrder);
        }

        @Override
        public String toString() {
            return "PricePlan{" +
                    "id=" + id +
                    ", planName='" + planName + '\'' +
                    ", planCode='" + planCode + '\'' +
                    ", price=" + price +
                    ", pricePeriod=" + pricePeriod +
                    ", customPeriod='" + customPeriod + '\'' +
                    ", description='" + description + '\'' +
                    ", features=" + features +
                    ", sortOrder=" + sortOrder +
                    '}';
        }
    }

    /**
     * 计划功能特性DTO
     */
    public static class PlanFeature {
        /**
         * 功能标题
         */
        private String featureTitle;

        /**
         * 功能描述
         */
        private String featureDescription;

        /**
         * 是否包含该功能
         */
        private Integer isIncluded;

        /**
         * 排序序号
         */
        private Integer sortOrder;

        /**
         * 无参构造函数
         */
        public PlanFeature() {
        }

        public String getFeatureTitle() {
            return featureTitle;
        }

        public void setFeatureTitle(String featureTitle) {
            this.featureTitle = featureTitle;
        }

        public String getFeatureDescription() {
            return featureDescription;
        }

        public void setFeatureDescription(String featureDescription) {
            this.featureDescription = featureDescription;
        }

        public Integer getIsIncluded() {
            return isIncluded;
        }

        public void setIsIncluded(Integer isIncluded) {
            this.isIncluded = isIncluded;
        }

        public Integer getSortOrder() {
            return sortOrder;
        }

        public void setSortOrder(Integer sortOrder) {
            this.sortOrder = sortOrder;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PlanFeature that = (PlanFeature) o;
            return Objects.equals(featureTitle, that.featureTitle) &&
                    Objects.equals(featureDescription, that.featureDescription) &&
                    Objects.equals(isIncluded, that.isIncluded) &&
                    Objects.equals(sortOrder, that.sortOrder);
        }

        @Override
        public int hashCode() {
            return Objects.hash(featureTitle, featureDescription, isIncluded, sortOrder);
        }

        @Override
        public String toString() {
            return "PlanFeature{" +
                    "featureTitle='" + featureTitle + '\'' +
                    ", featureDescription='" + featureDescription + '\'' +
                    ", isIncluded=" + isIncluded +
                    ", sortOrder=" + sortOrder +
                    '}';
        }
    }

    /**
     * 计划对比DTO
     */
    public static class PlanComparison {
        /**
         * 对比项目名称
         */
        private String comparisonItem;

        /**
         * 免费版值
         */
        private String freeValue;

        /**
         * 付费版值
         */
        private String paidValue;

        /**
         * 企业版值
         */
        private String enterpriseValue;

        /**
         * 排序序号
         */
        private Integer sortOrder;

        /**
         * 无参构造函数
         */
        public PlanComparison() {
        }

        public String getComparisonItem() {
            return comparisonItem;
        }

        public void setComparisonItem(String comparisonItem) {
            this.comparisonItem = comparisonItem;
        }

        public String getFreeValue() {
            return freeValue;
        }

        public void setFreeValue(String freeValue) {
            this.freeValue = freeValue;
        }

        public String getPaidValue() {
            return paidValue;
        }

        public void setPaidValue(String paidValue) {
            this.paidValue = paidValue;
        }

        public String getEnterpriseValue() {
            return enterpriseValue;
        }

        public void setEnterpriseValue(String enterpriseValue) {
            this.enterpriseValue = enterpriseValue;
        }

        public Integer getSortOrder() {
            return sortOrder;
        }

        public void setSortOrder(Integer sortOrder) {
            this.sortOrder = sortOrder;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PlanComparison that = (PlanComparison) o;
            return Objects.equals(comparisonItem, that.comparisonItem) &&
                    Objects.equals(freeValue, that.freeValue) &&
                    Objects.equals(paidValue, that.paidValue) &&
                    Objects.equals(enterpriseValue, that.enterpriseValue) &&
                    Objects.equals(sortOrder, that.sortOrder);
        }

        @Override
        public int hashCode() {
            return Objects.hash(comparisonItem, freeValue, paidValue, enterpriseValue, sortOrder);
        }

        @Override
        public String toString() {
            return "PlanComparison{" +
                    "comparisonItem='" + comparisonItem + '\'' +
                    ", freeValue='" + freeValue + '\'' +
                    ", paidValue='" + paidValue + '\'' +
                    ", enterpriseValue='" + enterpriseValue + '\'' +
                    ", sortOrder=" + sortOrder +
                    '}';
        }
    }

    /**
     * 购买建议DTO
     */
    public static class PurchaseSuggestion {
        /**
         * 用户类型描述
         */
        private String userType;

        /**
         * 建议要点列表
         */
        private List<String> suggestionPoints;

        /**
         * 排序序号
         */
        private Integer sortOrder;

        /**
         * 无参构造函数
         */
        public PurchaseSuggestion() {
        }

        public String getUserType() {
            return userType;
        }

        public void setUserType(String userType) {
            this.userType = userType;
        }

        public List<String> getSuggestionPoints() {
            return suggestionPoints;
        }

        public void setSuggestionPoints(List<String> suggestionPoints) {
            this.suggestionPoints = suggestionPoints;
        }

        public Integer getSortOrder() {
            return sortOrder;
        }

        public void setSortOrder(Integer sortOrder) {
            this.sortOrder = sortOrder;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            PurchaseSuggestion that = (PurchaseSuggestion) o;
            return Objects.equals(userType, that.userType) &&
                    Objects.equals(suggestionPoints, that.suggestionPoints) &&
                    Objects.equals(sortOrder, that.sortOrder);
        }

        @Override
        public int hashCode() {
            return Objects.hash(userType, suggestionPoints, sortOrder);
        }

        @Override
        public String toString() {
            return "PurchaseSuggestion{" +
                    "userType='" + userType + '\'' +
                    ", suggestionPoints=" + suggestionPoints +
                    ", sortOrder=" + sortOrder +
                    '}';
        }
    }
} 