package com.levon.toolhub.module.tool.controller;

import com.levon.toolhub.common.model.ApiResponse;
import com.levon.toolhub.common.model.CursorPageResult;
import com.levon.toolhub.module.tool.dto.request.client.ToolPageRequest;
import com.levon.toolhub.module.tool.dto.response.client.CategoryDetailResponse;
import com.levon.toolhub.module.tool.dto.response.client.CategorySubcategoriesResponse;
import com.levon.toolhub.module.tool.dto.response.client.ToolBriefResponse;
import com.levon.toolhub.module.tool.service.CategoryService;
import com.levon.toolhub.module.tool.service.ToolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 分类相关接口控制器
 */
@RestController
@RequestMapping("/tool/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ToolService toolService;

    /**
     * 获取主分类详情
     *
     * @param categoryId 主分类ID
     * @return 主分类详情
     */
    @GetMapping("/{categoryId}")
    public ApiResponse<CategoryDetailResponse> getCategoryDetail(@PathVariable Long categoryId) {
        CategoryDetailResponse detail = categoryService.getCategoryDetail(categoryId);
        return ApiResponse.success(detail);
    }

    /**
     * 获取主分类下的子分类列表
     *
     * @param categoryId 主分类ID
     * @return 主分类及其子分类列表
     */
    @GetMapping("/{categoryId}/subcategory")
    public ApiResponse<CategorySubcategoriesResponse> getCategorySubcategories(@PathVariable Long categoryId) {
        CategorySubcategoriesResponse result = categoryService.getCategorySubcategories(categoryId);
        return ApiResponse.success(result);
    }

    /**
     * 获取主分类下的工具列表
     *
     * @param categoryId 主分类ID
     * @param request 分页和筛选请求
     * @return 主分类及其工具列表
     */
    @GetMapping("/{categoryId}/tools")
    public ApiResponse<CursorPageResult<ToolBriefResponse>> getCategoryTools(
            @PathVariable Long categoryId,
            @Validated ToolPageRequest request) {
        CursorPageResult<ToolBriefResponse> result = toolService.getCategoryTools(categoryId, request);
        return ApiResponse.success(result);
    }
} 