package com.levon.toolhub.module.tool.service;

import com.levon.toolhub.common.model.CursorPageResult;
import com.levon.toolhub.module.tool.dto.request.client.ToolPageRequest;
import com.levon.toolhub.module.tool.dto.response.client.CategoryDetailResponse;
import com.levon.toolhub.module.tool.dto.response.client.CategorySubcategoriesResponse;
import com.levon.toolhub.module.tool.dto.response.client.ToolBriefResponse;
import com.levon.toolhub.module.tool.entity.Category;
import com.baomidou.mybatisplus.extension.service.IService;

/**
* @author leivik
* @description 针对表【levon_toolhub_tool_category(工具主分类表)】的数据库操作Service
* @createDate 2025-04-14 14:22:44
*/
public interface CategoryService extends IService<Category> {

    /**
     * 获取主分类详情
     *
     * @param categoryId 主分类ID
     * @return 主分类详情DTO
     */
    CategoryDetailResponse getCategoryDetail(Long categoryId);

    /**
     * 获取主分类及其子分类列表
     *
     * @param categoryId 主分类ID
     * @return 主分类及其子分类列表DTO
     */
    CategorySubcategoriesResponse getCategorySubcategories(Long categoryId);

}
