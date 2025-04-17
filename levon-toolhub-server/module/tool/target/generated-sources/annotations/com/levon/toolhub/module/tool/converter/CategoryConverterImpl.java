package com.levon.toolhub.module.tool.converter;

import com.levon.toolhub.module.tool.dto.response.client.CategoryDetailResponse;
import com.levon.toolhub.module.tool.entity.Category;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-17T02:39:15+0800",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class CategoryConverterImpl implements CategoryConverter {

    @Override
    public CategoryDetailResponse toDetailDTO(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryDetailResponse categoryDetailResponse = new CategoryDetailResponse();

        categoryDetailResponse.setId( category.getId() );
        categoryDetailResponse.setName( category.getName() );
        categoryDetailResponse.setCode( category.getCode() );
        categoryDetailResponse.setDescription( category.getDescription() );
        categoryDetailResponse.setIconKey( category.getIconKey() );
        categoryDetailResponse.setBgColorStart( category.getBgColorStart() );
        categoryDetailResponse.setBgColorEnd( category.getBgColorEnd() );
        categoryDetailResponse.setBackground( category.getBackground() );
        categoryDetailResponse.setSortOrder( category.getSortOrder() );

        return categoryDetailResponse;
    }
}
