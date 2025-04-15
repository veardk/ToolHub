package com.levon.toolhub.common.constant;

/**
 * 分页查询常量
 */
public final class PageConstants {

    private PageConstants() {
        // 私有构造函数，防止实例化
    }

    /**
     * 默认页码
     */
    public static final int DEFAULT_PAGE_NUMBER = 1;

    /**
     * 默认每页记录数
     */
    public static final int DEFAULT_PAGE_SIZE = 10;

    /**
     * 最大每页记录数
     */
    public static final int MAX_PAGE_SIZE = 100;

    /**
     * 默认排序字段
     */
    public static final String DEFAULT_SORT_FIELD = "createTime";

    /**
     * 默认排序方向（降序）
     */
    public static final String DEFAULT_SORT_DIRECTION = "desc";
} 