package com.levon.toolhub.module.tool.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.levon.toolhub.module.tool.dto.response.client.ToolDetailResponse;
import com.levon.toolhub.module.tool.entity.Tool;
import com.levon.toolhub.module.tool.entity.ToolPricePlan;
import com.levon.toolhub.module.tool.entity.ToolPricePlanComparison;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Arrays;
import java.util.stream.Collectors;

/**
 * 工具详情DTO转换器
 */
@Mapper(componentModel = "spring")
public interface ToolDetailConverter {
    ObjectMapper objectMapper = new ObjectMapper();
    
    Logger log = LoggerFactory.getLogger(ToolDetailConverter.class);
    
    /**
     * 日期格式化器
     */
    DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    /**
     * 转换Tool实体到基本信息DTO
     *
     * @param tool 工具实体
     * @param categoryName 分类名称
     * @param subcategoryName 子分类名称
     * @return 基本信息DTO
     */
    @Mapping(target = "updateTime", source = "tool.updateDate", qualifiedByName = "formatDate")
    @Mapping(target = "platforms", source = "tool.platforms", qualifiedByName = "parsePlatforms")
    @Mapping(target = "developerLogo", source = "tool.developerLogo")
    ToolDetailResponse.BasicInfo toBasicInfo(Tool tool, String categoryName, String subcategoryName);

    /**
     * 解析核心特点JSON字符串
     *
     * @param coreFeatures 核心特点JSON字符串
     * @return 核心特点DTO列表
     */
    @Named("parseCoreFeatures")
    default List<ToolDetailResponse.CoreFeature> parseCoreFeatures(String coreFeatures) {
        if (!StringUtils.hasText(coreFeatures)) {
            return Collections.emptyList();
        }
        try {
            log.debug("解析核心特点JSON: {}", coreFeatures);
            List<Map<String, Object>> rawData = objectMapper.readValue(coreFeatures, 
                    new TypeReference<List<Map<String, Object>>>() {});
            
            return rawData.stream().map(item -> {
                ToolDetailResponse.CoreFeature feature = new ToolDetailResponse.CoreFeature();
                feature.setTitle((String) item.get("title"));
                feature.setFeatureGroup((Integer) item.get("feature_group"));
                feature.setSortOrder((Integer) item.get("sort_order"));
                return feature;
            }).collect(Collectors.toList());
        } catch (JsonProcessingException e) {
            log.error("解析核心特点JSON失败: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    /**
     * 解析应用场景JSON字符串
     *
     * @param useCases 应用场景JSON字符串
     * @return 应用场景DTO列表
     */
    @Named("parseUseCases")
    default List<ToolDetailResponse.UseCase> parseUseCases(String useCases) {
        if (!StringUtils.hasText(useCases)) {
            return Collections.emptyList();
        }
        try {
            log.debug("解析应用场景JSON: {}", useCases);
            List<Map<String, Object>> rawData = objectMapper.readValue(useCases, 
                    new TypeReference<List<Map<String, Object>>>() {});
            
            return rawData.stream().map(item -> {
                ToolDetailResponse.UseCase useCase = new ToolDetailResponse.UseCase();
                useCase.setTitle((String) item.get("title"));
                useCase.setSortOrder((Integer) item.get("sort_order"));
                return useCase;
            }).collect(Collectors.toList());
        } catch (JsonProcessingException e) {
            log.error("解析应用场景JSON失败: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    /**
     * 解析技术规格JSON字符串
     *
     * @param techSpecs 技术规格JSON字符串
     * @return 技术规格DTO列表
     */
    @Named("parseTechSpecs")
    default List<ToolDetailResponse.TechSpec> parseTechSpecs(String techSpecs) {
        if (!StringUtils.hasText(techSpecs)) {
            return Collections.emptyList();
        }
        try {
            log.debug("解析技术规格JSON: {}", techSpecs);
            List<Map<String, Object>> rawData = objectMapper.readValue(techSpecs, 
                    new TypeReference<List<Map<String, Object>>>() {});
            
            return rawData.stream().map(item -> {
                ToolDetailResponse.TechSpec spec = new ToolDetailResponse.TechSpec();
                spec.setSpecName((String) item.get("spec_name"));
                spec.setSpecValue((String) item.get("spec_value"));
                spec.setSortOrder((Integer) item.get("sort_order"));
                return spec;
            }).collect(Collectors.toList());
        } catch (JsonProcessingException e) {
            log.error("解析技术规格JSON失败: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    /**
     * 解析购买建议JSON字符串
     *
     * @param purchaseSuggestions 购买建议JSON字符串
     * @return 购买建议DTO列表
     */
    @Named("parsePurchaseSuggestions")
    default List<ToolDetailResponse.PurchaseSuggestion> parsePurchaseSuggestions(String purchaseSuggestions) {
        if (!StringUtils.hasText(purchaseSuggestions)) {
            return Collections.emptyList();
        }
        try {
            log.debug("解析购买建议JSON: {}", purchaseSuggestions);
            List<Map<String, Object>> rawData = objectMapper.readValue(purchaseSuggestions, 
                    new TypeReference<List<Map<String, Object>>>() {});
            
            return rawData.stream().map(item -> {
                ToolDetailResponse.PurchaseSuggestion suggestion = new ToolDetailResponse.PurchaseSuggestion();
                suggestion.setUserType((String) item.get("user_type"));
                
                @SuppressWarnings("unchecked")
                List<String> points = (List<String>) item.get("suggestion_points");
                suggestion.setSuggestionPoints(points);
                
                suggestion.setSortOrder((Integer) item.get("sort_order"));
                return suggestion;
            }).collect(Collectors.toList());
        } catch (JsonProcessingException e) {
            log.error("解析购买建议JSON失败: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    /**
     * 转换价格计划列表
     *
     * @param pricePlans 价格计划实体列表
     * @return 价格计划DTO列表
     */
    List<ToolDetailResponse.PricePlan> toPricePlans(List<ToolPricePlan> pricePlans);

    /**
     * 转换价格计划实体到DTO
     *
     * @param pricePlan 价格计划实体
     * @return 价格计划DTO
     */
    @Mapping(target = "features", source = "features", qualifiedByName = "parsePlanFeatures")
    ToolDetailResponse.PricePlan toPricePlan(ToolPricePlan pricePlan);

    /**
     * 解析计划功能特性JSON字符串
     *
     * @param features 功能特性JSON字符串
     * @return 功能特性DTO列表
     */
    @Named("parsePlanFeatures")
    default List<ToolDetailResponse.PlanFeature> parsePlanFeatures(String features) {
        if (!StringUtils.hasText(features)) {
            return Collections.emptyList();
        }
        try {
            log.debug("解析计划功能特性JSON: {}", features);
            List<Map<String, Object>> rawData = objectMapper.readValue(features, 
                    new TypeReference<List<Map<String, Object>>>() {});
            
            return rawData.stream().map(item -> {
                ToolDetailResponse.PlanFeature feature = new ToolDetailResponse.PlanFeature();
                feature.setFeatureTitle((String) item.get("feature_title"));
                feature.setFeatureDescription((String) item.get("feature_description"));
                feature.setIsIncluded((Integer) item.get("is_included"));
                feature.setSortOrder((Integer) item.get("sort_order"));
                return feature;
            }).collect(Collectors.toList());
        } catch (JsonProcessingException e) {
            log.error("解析计划功能特性JSON失败: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    /**
     * 解析计划对比JSON字符串
     *
     * @param comparisons 计划对比JSON字符串
     * @return 计划对比DTO列表
     */
    @Named("parsePlanComparisons")
    default List<ToolDetailResponse.PlanComparison> parsePlanComparisons(String comparisons) {
        if (!StringUtils.hasText(comparisons)) {
            return Collections.emptyList();
        }
        try {
            log.debug("解析计划对比JSON: {}", comparisons);
            List<Map<String, Object>> rawData = objectMapper.readValue(comparisons, 
                    new TypeReference<List<Map<String, Object>>>() {});
            
            return rawData.stream().map(item -> {
                ToolDetailResponse.PlanComparison comparison = new ToolDetailResponse.PlanComparison();
                comparison.setComparisonItem((String) item.get("comparison_item"));
                comparison.setFreeValue((String) item.get("free_value"));
                comparison.setPaidValue((String) item.get("paid_value"));
                comparison.setEnterpriseValue((String) item.get("enterprise_value"));
                comparison.setSortOrder((Integer) item.get("sort_order"));
                return comparison;
            }).collect(Collectors.toList());
        } catch (JsonProcessingException e) {
            log.error("解析计划对比JSON失败: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    /**
     * 转换价格计划对比实体到DTO列表
     *
     * @param comparison 价格计划对比实体
     * @return 价格计划对比DTO列表
     */
    @Named("toPlanComparisons")
    default List<ToolDetailResponse.PlanComparison> toPlanComparisons(ToolPricePlanComparison comparison) {
        if (comparison == null || !StringUtils.hasText(comparison.getComparisons())) {
            return Collections.emptyList();
        }
        return parsePlanComparisons(comparison.getComparisons());
    }

    /**
     * 格式化日期
     *
     * @param updateDate 更新日期
     * @return 格式化后的日期字符串
     */
    @Named("formatDate")
    default String formatDate(java.time.LocalDateTime updateDate) {
        return updateDate != null ? updateDate.format(DATE_TIME_FORMATTER) : null;
    }

    /**
     * 解析平台编码数组，保持原始的整数数组格式
     *
     * @param platforms 平台编码JSON数组字符串
     * @return 平台编码列表
     */
    @Named("parsePlatforms")
    default List<Integer> parsePlatforms(String platforms) {
        if (!StringUtils.hasText(platforms)) {
            return Collections.emptyList();
        }
        try {
            log.debug("解析平台编码JSON: {}", platforms);
            return objectMapper.readValue(platforms, new TypeReference<List<Integer>>() {});
        } catch (JsonProcessingException e) {
            log.error("解析平台编码JSON失败: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    /**
     * 构建工具详情响应DTO
     *
     * @param tool 工具实体
     * @param categoryName 分类名称
     * @param subcategoryName 子分类名称
     * @param pricePlans 价格计划列表
     * @param planComparison 价格计划对比
     * @return 工具详情响应DTO
     */
    default ToolDetailResponse buildToolDetailResponse(
            Tool tool, 
            String categoryName, 
            String subcategoryName, 
            List<ToolPricePlan> pricePlans, 
            ToolPricePlanComparison planComparison) {
        
        ToolDetailResponse response = new ToolDetailResponse();
        
        // 设置基本信息
        response.setBasicInfo(toBasicInfo(tool, categoryName, subcategoryName));
        
        // 设置核心特点
        response.setCoreFeatures(parseCoreFeatures(tool.getCoreFeatures()));
        log.debug("核心特点数量: {}", response.getCoreFeatures().size());
        
        // 设置应用场景
        response.setUseCases(parseUseCases(tool.getUseCases()));
        log.debug("应用场景数量: {}", response.getUseCases().size());
        
        // 设置技术规格
        response.setTechSpecs(parseTechSpecs(tool.getTechSpecs()));
        log.debug("技术规格数量: {}", response.getTechSpecs().size());
        
        // 判断是否为免费工具
        if (tool.getPriceType() != null && tool.getPriceType() == 1) {
            // 免费工具设置空集合
            response.setPricePlans(Collections.emptyList());
            response.setPlanComparison(Collections.emptyList());
            response.setPurchaseSuggestions(Collections.emptyList());
            log.debug("免费工具不返回价格相关信息");
        } else {
            // 设置价格计划
            response.setPricePlans(pricePlans != null ? toPricePlans(pricePlans) : Collections.emptyList());
            log.debug("价格计划数量: {}", response.getPricePlans().size());
            
            // 设置计划对比
            response.setPlanComparison(planComparison != null ? toPlanComparisons(planComparison) : Collections.emptyList());
            log.debug("计划对比数量: {}", response.getPlanComparison().size());
            
            // 设置购买建议
            response.setPurchaseSuggestions(parsePurchaseSuggestions(tool.getPurchaseSuggestions()));
            log.debug("购买建议数量: {}", response.getPurchaseSuggestions().size());
        }
        
        return response;
    }
} 