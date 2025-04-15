package com.levon.toolhub.common.model;

import java.util.List;

/**
 * 基于游标的分页返回结果
 * @param <T> 数据项类型
 */
public class CursorPageResult<T> {
    
    /**
     * 数据列表
     */
    private List<T> list;
    
    /**
     * 是否还有更多数据
     */
    private boolean hasMore;
    
    /**
     * 下一页的游标，如果没有更多数据则为null
     */
    private String nextCursor;
    
    /**
     * 总记录数（可选，某些场景可能需要）
     */
    private Long total;

    /**
     * 默认构造函数
     */
    public CursorPageResult() {
    }

    /**
     * 全参数构造函数
     */
    public CursorPageResult(List<T> list, boolean hasMore, String nextCursor, Long total) {
        this.list = list;
        this.hasMore = hasMore;
        this.nextCursor = nextCursor;
        this.total = total;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public boolean isHasMore() {
        return hasMore;
    }

    public void setHasMore(boolean hasMore) {
        this.hasMore = hasMore;
    }

    public String getNextCursor() {
        return nextCursor;
    }

    public void setNextCursor(String nextCursor) {
        this.nextCursor = nextCursor;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    /**
     * 构建分页结果（不需要总数的场景）
     *
     * @param list 数据列表
     * @param hasMore 是否还有更多
     * @param nextCursor 下一页游标
     * @return 分页结果
     */
    public static <T> CursorPageResult<T> of(List<T> list, boolean hasMore, String nextCursor) {
        return new CursorPageResult<>(list, hasMore, nextCursor, null);
    }
    
    /**
     * 构建分页结果（需要总数的场景）
     *
     * @param list 数据列表
     * @param hasMore 是否还有更多
     * @param nextCursor 下一页游标
     * @param total 总记录数
     * @return 分页结果
     */
    public static <T> CursorPageResult<T> of(List<T> list, boolean hasMore, String nextCursor, Long total) {
        return new CursorPageResult<>(list, hasMore, nextCursor, total);
    }
    
    /**
     * 构建空结果
     *
     * @return 空的分页结果
     */
    public static <T> CursorPageResult<T> empty() {
        return new CursorPageResult<>(List.of(), false, null, 0L);
    }

    @Override
    public String toString() {
        return "CursorPageResult{" +
                "list=" + list +
                ", hasMore=" + hasMore +
                ", nextCursor='" + nextCursor + '\'' +
                ", total=" + total +
                '}';
    }
}