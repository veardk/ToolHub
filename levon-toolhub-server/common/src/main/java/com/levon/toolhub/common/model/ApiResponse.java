package com.levon.toolhub.common.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.levon.toolhub.common.enums.ApiCode;

import java.io.Serializable;
import java.util.Date;

/**
 * 统一API响应结果封装
 * @param <T> 返回数据类型
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 状态码
     */
    private Integer code;

    /**
     * 返回消息
     */
    private String message;

    /**
     * 返回数据
     */
    private T data;

    /**
     * 响应时间戳
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date timestamp;

    /**
     * 默认私有构造器
     */
    private ApiResponse() {
        this.timestamp = new Date();
    }

    /**
     * 全参构造器
     */
    private ApiResponse(Integer code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
        this.timestamp = new Date();
    }

    /**
     * 返回成功结果
     */
    public static <T> ApiResponse<T> success() {
        return new ApiResponse<>(ApiCode.SUCCESS.getCode(), ApiCode.SUCCESS.getMessage(), null);
    }

    /**
     * 返回成功结果
     * @param data 成功数据
     */
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(ApiCode.SUCCESS.getCode(), ApiCode.SUCCESS.getMessage(), data);
    }

    /**
     * 返回成功结果
     * @param message 成功消息
     * @param data 成功数据
     */
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(ApiCode.SUCCESS.getCode(), message, data);
    }

    /**
     * 返回失败结果
     */
    public static <T> ApiResponse<T> error() {
        return new ApiResponse<>(ApiCode.ERROR.getCode(), ApiCode.ERROR.getMessage(), null);
    }

    /**
     * 返回失败结果
     * @param message 失败消息
     */
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(ApiCode.ERROR.getCode(), message, null);
    }

    /**
     * 返回失败结果
     * @param code 状态码
     * @param message 失败消息
     */
    public static <T> ApiResponse<T> error(Integer code, String message) {
        return new ApiResponse<>(code, message, null);
    }

    /**
     * 返回失败结果
     * @param apiCode 状态码枚举
     */
    public static <T> ApiResponse<T> error(ApiCode apiCode) {
        return new ApiResponse<>(apiCode.getCode(), apiCode.getMessage(), null);
    }

    /**
     * 返回失败结果
     * @param apiCode 状态码枚举
     * @param data 失败数据
     */
    public static <T> ApiResponse<T> error(ApiCode apiCode, T data) {
        return new ApiResponse<>(apiCode.getCode(), apiCode.getMessage(), data);
    }

    /**
     * 返回自定义结果
     * @param code 状态码
     * @param message 消息
     * @param data 数据
     */
    public static <T> ApiResponse<T> build(Integer code, String message, T data) {
        return new ApiResponse<>(code, message, data);
    }

    /**
     * 判断是否成功
     */
    public boolean isSuccess() {
        return ApiCode.SUCCESS.getCode().equals(this.code);
    }

    // Getter and Setter methods
    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "ApiResponse{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", data=" + data +
                ", timestamp=" + timestamp +
                '}';
    }
} 