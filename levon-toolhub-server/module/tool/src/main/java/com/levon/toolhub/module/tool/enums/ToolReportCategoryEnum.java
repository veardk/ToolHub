package com.levon.toolhub.module.tool.enums;

/**
 * 工具问题类别枚举
 */
public enum ToolReportCategoryEnum {

    /**
     * 信息错误
     */
    INFO_ERROR(0, "信息错误"),

    /**
     * 链接失效
     */
    LINK_INVALID(1, "链接失效"),

    /**
     * 内容过时
     */
    CONTENT_OUTDATED(2, "内容过时"),

    /**
     * 其他问题
     */
    OTHER_ISSUE(3, "其他问题");

    /**
     * 类别值
     */
    private final Integer value;

    /**
     * 类别标签
     */
    private final String label;

    /**
     * 构造方法
     *
     * @param value 类别值
     * @param label 类别标签
     */
    ToolReportCategoryEnum(Integer value, String label) {
        this.value = value;
        this.label = label;
    }

    /**
     * 获取类别值
     *
     * @return 类别值
     */
    public Integer getValue() {
        return value;
    }

    /**
     * 获取类别标签
     *
     * @return 类别标签
     */
    public String getLabel() {
        return label;
    }

    /**
     * 根据类别值获取枚举
     *
     * @param value 类别值
     * @return 枚举实例，如果不存在则返回null
     */
    public static ToolReportCategoryEnum getByValue(Integer value) {
        if (value == null) {
            return null;
        }
        for (ToolReportCategoryEnum category : values()) {
            if (category.getValue().equals(value)) {
                return category;
            }
        }
        return null;
    }

    /**
     * 验证类别值是否有效
     *
     * @param value 类别值
     * @return 是否有效
     */
    public static boolean isValidValue(Integer value) {
        return getByValue(value) != null;
    }
} 