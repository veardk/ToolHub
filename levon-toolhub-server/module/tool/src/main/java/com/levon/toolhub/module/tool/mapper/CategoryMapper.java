package com.levon.toolhub.module.tool.mapper;

import com.levon.toolhub.module.tool.entity.Category;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
* @author leivik
* @description 针对表【levon_toolhub_tool_category(工具主分类表)】的数据库操作Mapper
* @createDate 2025-04-14 14:22:44
* @Entity com.levon.toolhub.module.tool.entity.Category
*/
@Mapper
public interface CategoryMapper extends BaseMapper<Category> {

}




