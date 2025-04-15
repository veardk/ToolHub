// ToolPageRequest.java
package com.levon.toolhub.module.tool.dto.request.client;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public class ToolPageRequest {
    /**
     * 分页游标
     */
    private String cursor;


    /**
     * 每页显示记录数
     */
    @Min(value = 1, message = "每页显示记录数不能小于1")
    @Max(value = 100, message = "每页显示记录数不能大于100")
    private Integer size = 16;

    /**
     * 排序方式：1=最新，2=最热
     */
    @Min(value = 1, message = "排序方式不正确")
    @Max(value = 2, message = "排序方式不正确")
    private Integer sort = 1;

    /**
     * 价格类型：1=免费，2=付费，3=部分免费
     */
    @Min(value = 1, message = "价格类型不正确")
    @Max(value = 3, message = "价格类型不正确")
    private Integer priceType;

    /**
     * 子分类ID
     */
    private Long subCategoryId;

    public String getCursor() {
        return cursor;
    }

    public void setCursor(String cursor) {
        this.cursor = cursor;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Integer getPriceType() {
        return priceType;
    }

    public void setPriceType(Integer priceType) {
        this.priceType = priceType;
    }

    public Long getSubCategoryId() {
        return subCategoryId;
    }

    public void setSubCategoryId(Long subCategoryId) {
        this.subCategoryId = subCategoryId;
    }


    @Override
    public String toString() {
        return "ToolPageRequest{" +
                "cursor='" + cursor + '\'' +
                ", size=" + size +
                ", sort=" + sort +
                ", priceType=" + priceType +
                ", subCategoryId=" + subCategoryId +
                '}';
    }
}