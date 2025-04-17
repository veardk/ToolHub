package com.levon.toolhub.module.tool.converter;

import com.levon.toolhub.module.tool.dto.response.client.SubcategoryResponse;
import com.levon.toolhub.module.tool.entity.Subcategory;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-17T02:39:15+0800",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class SubcategoryConverterImpl implements SubcategoryConverter {

    @Override
    public SubcategoryResponse toDTO(Subcategory subcategory) {
        if ( subcategory == null ) {
            return null;
        }

        SubcategoryResponse subcategoryResponse = new SubcategoryResponse();

        subcategoryResponse.setId( subcategory.getId() );
        subcategoryResponse.setCategoryId( subcategory.getCategoryId() );
        subcategoryResponse.setName( subcategory.getName() );
        subcategoryResponse.setCode( subcategory.getCode() );
        subcategoryResponse.setDescription( subcategory.getDescription() );
        subcategoryResponse.setIconKey( subcategory.getIconKey() );
        subcategoryResponse.setSortOrder( subcategory.getSortOrder() );

        return subcategoryResponse;
    }

    @Override
    public List<SubcategoryResponse> toDTOList(List<Subcategory> subcategories) {
        if ( subcategories == null ) {
            return null;
        }

        List<SubcategoryResponse> list = new ArrayList<SubcategoryResponse>( subcategories.size() );
        for ( Subcategory subcategory : subcategories ) {
            list.add( toDTO( subcategory ) );
        }

        return list;
    }
}
