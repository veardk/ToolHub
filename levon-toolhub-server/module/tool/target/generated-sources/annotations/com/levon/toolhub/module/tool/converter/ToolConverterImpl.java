package com.levon.toolhub.module.tool.converter;

import com.levon.toolhub.module.tool.dto.response.client.ToolBriefResponse;
import com.levon.toolhub.module.tool.entity.Tool;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-15T00:58:56+0800",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)"
)
@Component
public class ToolConverterImpl implements ToolConverter {

    @Override
    public ToolBriefResponse toToolBriefResponse(Tool tool) {
        if ( tool == null ) {
            return null;
        }

        ToolBriefResponse toolBriefResponse = new ToolBriefResponse();

        toolBriefResponse.setId( tool.getId() );
        toolBriefResponse.setName( tool.getName() );
        toolBriefResponse.setLogo( tool.getLogo() );
        toolBriefResponse.setShortDescription( tool.getShortDescription() );
        toolBriefResponse.setWebsiteUrl( tool.getWebsiteUrl() );
        if ( tool.getCategoryId() != null ) {
            toolBriefResponse.setCategoryId( tool.getCategoryId().longValue() );
        }
        toolBriefResponse.setPriceType( tool.getPriceType() );
        toolBriefResponse.setIsNew( tool.getIsNew() );

        return toolBriefResponse;
    }

    @Override
    public List<ToolBriefResponse> toToolBriefResponseList(List<Tool> tools) {
        if ( tools == null ) {
            return null;
        }

        List<ToolBriefResponse> list = new ArrayList<ToolBriefResponse>( tools.size() );
        for ( Tool tool : tools ) {
            list.add( toToolBriefResponse( tool ) );
        }

        return list;
    }
}
