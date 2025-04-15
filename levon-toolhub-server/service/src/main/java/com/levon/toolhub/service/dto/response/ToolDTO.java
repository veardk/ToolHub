package com.levon.toolhub.service.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 工具DTO
 */
@Data
public class ToolDTO {

    /**
     * 工具ID
     */
    private Long id;

    /**
     * 工具名称
     */
    private String name;

    /**
     * 工具Logo URL
     */
    private String logo;

    /**
     * 工具描述
     */
    private String description;

    /**
     * 工具网站URL
     */
    private String websiteUrl;

    /**
     * 价格类型：FREE-免费, FREEMIUM-部分免费, PAID-付费
     */
    private String priceType;

    /**
     * 工具评分（1-5分）
     */
    private Double rating;

    /**
     * 是否新工具（30天内添加）
     */
    private Boolean isNew;

    /**
     * 所属子分类ID
     */
    private Long subcategoryId;

    /**
     * 所属子分类名称
     */
    private String subcategoryName;

    /**
     * 所属主分类ID
     */
    private Long categoryId;

    /**
     * 所属主分类名称
     */
    private String categoryName;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 标签列表
     */
    private List<TagDTO> tags;

    /**
     * 工具特性列表
     */
    private List<String> features;
    
    /**
     * 浏览量
     */
    private Long viewCount;
    
    /**
     * 收藏量
     */
    private Long favoriteCount;
} 