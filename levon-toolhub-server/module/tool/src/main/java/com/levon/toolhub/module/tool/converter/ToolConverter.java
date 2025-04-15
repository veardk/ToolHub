package com.levon.toolhub.module.tool.converter;


import com.levon.toolhub.module.tool.dto.response.client.ToolBriefResponse;
import com.levon.toolhub.module.tool.entity.Tool;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * 工具对象映射接口
 * 使用MapStruct自动生成实现类
 */
@Mapper(componentModel = "spring")
public interface ToolConverter {

    /**
     * 将Tool对象转换为ToolBriefResponse对象
     *
     * @param tool 工具对象
     * @return 工具简要信息响应对象
     */
    ToolBriefResponse toToolBriefResponse(Tool tool);

    /**
     * 将List<Tool>对象转换为List<ToolBriefResponse>对象
     * 
     * @param tools 工具列表
     * @return 工具简要信息响应列表
     */
    List<ToolBriefResponse> toToolBriefResponseList(List<Tool> tools);
} 