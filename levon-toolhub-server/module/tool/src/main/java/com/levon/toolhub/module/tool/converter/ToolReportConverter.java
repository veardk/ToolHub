package com.levon.toolhub.module.tool.converter;

import com.levon.toolhub.module.tool.dto.request.client.ToolReportRequest;
import com.levon.toolhub.module.tool.entity.ToolReport;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * 工具问题报告转换器
 */
@Mapper(componentModel = "spring")
public interface ToolReportConverter {

    ToolReportConverter INSTANCE = Mappers.getMapper(ToolReportConverter.class);

    /**
     * 将ToolReportRequest转换为ToolReport实体
     *
     * @param request 工具问题报告请求DTO
     * @param toolId 工具ID
     * @param userId 用户ID
     * @param createId 创建人ID
     * @return 工具问题报告实体
     */
    @Mapping(source = "toolId", target = "toolId")
    @Mapping(source = "userId", target = "userId")
    @Mapping(source = "createId", target = "createId")
    @Mapping(target = "status", constant = "0") // 默认待处理
    @Mapping(target = "isDelete", constant = "0") // 默认未删除
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "updateId", ignore = true)
    @Mapping(target = "createDate", ignore = true)
    @Mapping(target = "updateDate", ignore = true)
    ToolReport toEntity(ToolReportRequest request, Long toolId, Long userId, Long createId);
} 