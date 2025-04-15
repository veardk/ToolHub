package com.levon.toolhub.service.dto.response;

import lombok.Data;

import java.util.List;

/**
 * 工具分页查询响应
 */
@Data
public class ToolPageResponse {

    /**
     * 总记录数
     */
    private Long total;

    /**
     * 总页数
     */
    private Integer pages;

    /**
     * 当前页码
     */
    private Integer page;

    /**
     * 每页记录数
     */
    private Integer size;

    /**
     * 工具列表
     */
    private List<ToolDTO> records;

    /**
     * 是否有下一页
     */
    private Boolean hasNext;

    /**
     * 构建分页响应
     */
    public static ToolPageResponse build(List<ToolDTO> records, Long total, Integer page, Integer size) {
        ToolPageResponse response = new ToolPageResponse();
        response.setRecords(records);
        response.setTotal(total);
        response.setPage(page);
        response.setSize(size);
        
        // 计算总页数
        int pages = (int) Math.ceil((double) total / size);
        response.setPages(pages);
        
        // 判断是否有下一页
        response.setHasNext(page < pages);
        
        return response;
    }
} 