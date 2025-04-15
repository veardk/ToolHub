package com.levon.toolhub.module.tool.dto.response.client;

import java.io.Serializable;
import java.util.List;

/**
 * 主分类及其下子分类列表DTO
 */
public class CategorySubcategoriesResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主分类信息
     */
    private CategoryDetailResponse categoryInfo;

    /**
     * 子分类列表
     */
    private List<SubcategoryResponse> subCategories;

    public CategoryDetailResponse getCategoryInfo() {
        return categoryInfo;
    }

    public void setCategoryInfo(CategoryDetailResponse categoryInfo) {
        this.categoryInfo = categoryInfo;
    }

    public List<SubcategoryResponse> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<SubcategoryResponse> subCategories) {
        this.subCategories = subCategories;
    }
} 