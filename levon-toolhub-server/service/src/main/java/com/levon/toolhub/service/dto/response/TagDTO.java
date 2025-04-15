package com.levon.toolhub.service.dto.response;

import lombok.Data;

/**
 * 标签DTO
 */
@Data
public class TagDTO {

    /**
     * 标签ID
     */
    private Long id;

    /**
     * 标签名称
     */
    private String name;

    /**
     * 标签颜色代码
     */
    private String color;
} 