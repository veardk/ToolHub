package com.levon.toolhub.module.tool.converter;

import com.levon.toolhub.module.tool.dto.response.client.SubcategoryResponse;
import com.levon.toolhub.module.tool.entity.Subcategory;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * 子分类对象映射接口
 * 使用MapStruct自动生成实现类
 */
@Mapper(componentModel = "spring")
public interface SubcategoryConverter {

    /**
     * 将Subcategory对象转换为SubcategoryResponse对象
     *
     * @param subcategory 子分类对象
     * @return 子分类响应对象
     */
    SubcategoryResponse toDTO(Subcategory subcategory);
    List<SubcategoryResponse> toDTOList(List<Subcategory> subcategories);
}