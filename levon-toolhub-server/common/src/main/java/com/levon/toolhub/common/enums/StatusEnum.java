package com.levon.toolhub.common.enums;

/**
 * 通用状态枚举
 */
public enum StatusEnum {
    /**
     * 启用
     */
    ENABLED(1, "启用"),
    
    /**
     * 禁用
     */
    DISABLED(0, "禁用"),
    
    /**
     * 待审核
     */
    PENDING(2, "待审核"),
    
    /**
     * 已删除
     */
    DELETED(-1, "已删除");
    
    private final Integer code;
    private final String desc;
    
    StatusEnum(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }
    
    /**
     * 根据code获取枚举
     *
     * @param code 编码
     * @return 状态枚举
     */
    public static StatusEnum getByCode(Integer code) {
        if (code == null) {
            return null;
        }
        for (StatusEnum status : values()) {
            if (status.getCode().equals(code)) {
                return status;
            }
        }
        return null;
    }
    
    /**
     * 获取编码
     *
     * @return 编码
     */
    public Integer getCode() {
        return code;
    }
    
    /**
     * 获取描述
     *
     * @return 描述
     */
    public String getDesc() {
        return desc;
    }
} 