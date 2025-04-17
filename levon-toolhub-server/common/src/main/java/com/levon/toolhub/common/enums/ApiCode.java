package com.levon.toolhub.common.enums;

/**
 * API响应状态码枚举
 */
public enum ApiCode {
    /**
     * 成功
     */
    SUCCESS(200, "操作成功"),
    
    /**
     * 客户端错误
     */
    BAD_REQUEST(400, "请求参数错误"),
    UNAUTHORIZED(401, "未登录或登录已过期"),
    FORBIDDEN(403, "权限不足"),
    NOT_FOUND(404, "请求的资源不存在"),
    METHOD_NOT_ALLOWED(405, "请求方法不允许"),
    
    /**
     * 服务端错误
     */
    ERROR(500, "系统内部错误"),
    SERVICE_UNAVAILABLE(503, "服务暂时不可用"),


    /**
     * 业务错误
     */
    VALIDATE_FAILED(1001, "参数验证失败"),
    USER_NOT_EXIST(1002, "用户不存在"),
    USER_ALREADY_EXISTS(1003, "用户已存在"),
    INCORRECT_CREDENTIALS(1004, "用户名或密码错误"),
    OPERATION_FAILED(1005, "操作失败"),
    DATA_ALREADY_EXISTS(1006, "数据已存在"),
    DATA_NOT_EXISTS(1007, "数据不存在"),
    
    /**
     * 文件操作相关错误
     */
    FILE_UPLOAD_FAILED(2001, "文件上传失败"),
    FILE_DOWNLOAD_FAILED(2002, "文件下载失败"),
    FILE_FORMAT_ERROR(2003, "文件格式错误"),
    FILE_SIZE_EXCEEDED(2004, "文件大小超限"),
    
    /**
     * 第三方服务相关错误
     */
    THIRD_PARTY_SERVICE_ERROR(3001, "第三方服务调用失败"),
    
    /**
     * 限流、熔断相关错误
     */
    TOO_MANY_REQUESTS(4001, "请求频率超限");

    private final Integer code;
    private final String message;

    ApiCode(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
} 