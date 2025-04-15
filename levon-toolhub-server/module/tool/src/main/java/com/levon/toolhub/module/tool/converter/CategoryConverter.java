package com.levon.toolhub.module.tool.converter;

import com.levon.toolhub.module.tool.dto.response.client.CategoryDetailResponse;
import com.levon.toolhub.module.tool.entity.Category;
import org.mapstruct.Mapper;

/**
 * 分类对象映射接口
 * 使用MapStruct自动生成实现类
 */
@Mapper(componentModel = "spring")
public interface CategoryConverter {

    /**
     * 实体转详情DTO
     */
    CategoryDetailResponse toDetailDTO(Category category);
} 