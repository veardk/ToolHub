package com.levon.toolhub.module.tool.mapper;

import com.levon.toolhub.module.tool.dto.response.client.ToolBriefResponse;
import com.levon.toolhub.module.tool.entity.Tool;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import java.time.LocalDateTime;
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

    /**
     * 增加工具查看次数
     * 
     * @param id 工具ID
     * @return 影响行数
     */
    @Update("UPDATE levon_toolhub_tool SET view_count = view_count + 1, heat = heat + 1 WHERE id = #{id}")
    int incrementViewCount(@Param("id") Long id);

    /**
     * 查询所有需要更新热度的工具（全量更新，考虑热度衰减）
     * 
     * @return 所有未删除的工具列表
     */
    List<Tool> findAllToolsForHeatUpdate();

    /**
     * 查询需要更新热度的工具列表
     * 
     * 包含以下情况的工具：
     * 1. 在指定时间范围内新创建的工具
     * 2. 在指定时间范围内基本信息被更新的工具
     *
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 需要更新热度的工具列表
     */
    List<Tool> findToolsNeedUpdateHeat(@Param("startTime") LocalDateTime startTime, @Param("endTime") LocalDateTime endTime);

}




