package com.levon.toolhub.module.tool.mapper;

import com.levon.toolhub.module.tool.dto.response.client.ToolBriefResponse;
import com.levon.toolhub.module.tool.entity.Tool;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
* @author leivik
* @description 针对表【levon_toolhub_tool(工具表)】的数据库操作Mapper
* @createDate 2025-04-14 14:27:12
* @Entity com.levon.toolhub.module.tool.entity.Tool
*/

@Mapper
public interface ToolMapper extends BaseMapper<Tool> {

    /**
     * 根据分类ID查询工具列表
     *
     * @param categoryId 分类ID
     * @param subCategoryId 子分类ID
     * @param priceType 价格类型
     * @param offset 偏移量
     * @param size 每页大小
     * @param sort 排序方式
     * @return 工具列表
     */
    List<ToolBriefResponse> findByCategoryId(
        @Param("categoryId") Long categoryId,
        @Param("subCategoryId") Long subCategoryId,
        @Param("priceType") Integer priceType,
        @Param("offset") Integer offset,
        @Param("size") Integer size,
        @Param("sort") Integer sort
    );

    /**
     * 根据分类ID查询工具列表总数
     *
     * @param categoryId 分类ID
     * @param subCategoryId 子分类ID
     * @param priceType 价格类型
     * @return 工具列表总数
     */ 
    Long countByCategoryId(
        @Param("categoryId") Long categoryId,
        @Param("subCategoryId") Long subCategoryId,
        @Param("priceType") Integer priceType
    );

}




