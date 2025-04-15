package com.levon.toolhub.module.tool.mapper;

import com.levon.toolhub.module.tool.entity.Subcategory;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
* @author leivik
* @description 针对表【levon_toolhub_tool_subcategory(工具子分类表)】的数据库操作Mapper
* @createDate 2025-04-14 14:23:30
* @Entity com.levon.toolhub.module.tool.entity.Subcategory
*/

@Mapper
public interface SubcategoryMapper extends BaseMapper<Subcategory> {

    /**
     * 统计某个子分类下的工具总数
     *
     * @param subcategoryId 子分类ID
     * @return 工具总数
     */
    @Select("SELECT COUNT(*) FROM levon_toolhub_tool " +
            "WHERE subcategory_id = #{subcategoryId} AND is_delete = 0")
    Integer countToolsBySubcategoryId(@Param("subcategoryId") Long subcategoryId);

    /**
     * 根据主分类ID查询所有子分类列表，按排序顺序排序
     *
     * @param categoryId 主分类ID
     * @return 子分类列表
     */
    @Select("SELECT * FROM levon_toolhub_tool_subcategory " +
            "WHERE category_id = #{categoryId} AND is_delete = 0 " +
            "ORDER BY sort_order ASC")
    List<Subcategory> findByCategoryIdOrderBySortOrder(@Param("categoryId") Long categoryId);
}




