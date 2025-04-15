package com.levon.toolhub.service.dto.request;

import com.levon.toolhub.common.constant.PageConstants;
import lombok.Data;

/**
 * 工具分页查询请求参数
 */
@Data
public class ToolPageRequest {

    /**
     * 当前页码
     */
    private Integer page = PageConstants.DEFAULT_PAGE_NUMBER;

    /**
     * 每页记录数
     */
    private Integer size = PageConstants.DEFAULT_PAGE_SIZE;

    /**
     * 排序字段
     */
    private String sortField = PageConstants.DEFAULT_SORT_FIELD;

    /**
     * 排序方向
     */
    private String sortDirection = PageConstants.DEFAULT_SORT_DIRECTION;
    
    /**
     * 是否免费工具
     */
    private Boolean isFree;
    
    /**
     * 是否新工具
     */
    private Boolean isNew;
    
    /**
     * 最小评分
     */
    private Double minRating;
    
    /**
     * 最大评分
     */
    private Double maxRating;
    
    /**
     * 标签ID
     */
    private Long tagId;
    
    /**
     * 搜索关键词
     */
    private String keyword;
    
    /**
     * 获取开始记录索引
     */
    public int getOffset() {
        return (page - 1) * size;
    }
    
    /**
     * 校验并修正分页参数
     */
    public void validateAndFix() {
        if (page == null || page < 1) {
            page = PageConstants.DEFAULT_PAGE_NUMBER;
        }
        
        if (size == null || size < 1) {
            size = PageConstants.DEFAULT_PAGE_SIZE;
        } else if (size > PageConstants.MAX_PAGE_SIZE) {
            size = PageConstants.MAX_PAGE_SIZE;
        }
        
        if (sortField == null || sortField.trim().isEmpty()) {
            sortField = PageConstants.DEFAULT_SORT_FIELD;
        }
        
        if (sortDirection == null || sortDirection.trim().isEmpty() || 
            (!sortDirection.equalsIgnoreCase("asc") && !sortDirection.equalsIgnoreCase("desc"))) {
            sortDirection = PageConstants.DEFAULT_SORT_DIRECTION;
        }
    }
} 