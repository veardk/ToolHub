package com.levon.toolhub.service.dto.response;

import lombok.Data;

/**
 * 工具特性DTO
 */
@Data
public class FeatureDTO {

    /**
     * 特性ID
     */
    private Long id;

    /**
     * 特性名称
     */
    private String name;

    /**
     * 特性描述
     */
    private String description;
} 