package com.levon.toolhub.common.exception;

/**
 * 业务异常类
 */
public class BizException extends RuntimeException {
    
    private static final long serialVersionUID = 1L;
    
    private Integer code;
    
    /**
     * 构造函数
     * @param message 错误信息
     */
    public BizException(String message) {
        super(message);
        this.code = 500;
    }
    
    /**
     * 构造函数
     * @param code 错误码
     * @param message 错误信息
     */
    public BizException(Integer code, String message) {
        super(message);
        this.code = code;
    }
    
    /**
     * 构造函数
     * @param message 错误信息
     * @param cause 异常
     */
    public BizException(String message, Throwable cause) {
        super(message, cause);
        this.code = 500;
    }
    
    /**
     * 构造函数
     * @param code 错误码
     * @param message 错误信息
     * @param cause 异常
     */
    public BizException(Integer code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }
    
    /**
     * 获取错误码
     * @return 错误码
     */
    public Integer getCode() {
        return code;
    }
} 