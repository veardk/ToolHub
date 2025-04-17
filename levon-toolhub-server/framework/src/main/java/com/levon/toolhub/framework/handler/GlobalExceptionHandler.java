package com.levon.toolhub.framework.handler;

import cn.dev33.satoken.exception.NotLoginException;
import cn.dev33.satoken.exception.NotPermissionException;
import cn.dev33.satoken.exception.NotRoleException;
import cn.dev33.satoken.exception.SaTokenException;
import com.levon.toolhub.common.enums.ApiCode;
import com.levon.toolhub.common.exception.BizException;
import com.levon.toolhub.common.model.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.HashMap;
import java.util.Map;

/**
 * 全局异常处理器
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);


    /**
     * 其他未知异常处理
     */
    @ExceptionHandler(Exception.class)
    public ApiResponse<Void> handleException(Exception e) {
        log.error("系统异常: ", e);
        return ApiResponse.error(500, "系统错误");
    }


    /**
     * 自定义业务异常处理
     */
    @ExceptionHandler(BizException.class)
    public ApiResponse<Void> handleBizException(BizException e) {
        log.error("业务异常: {}", e.getMessage());
        return ApiResponse.error(e.getCode(), e.getMessage());
    }

    /**
     * 处理参数验证异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResponse<Map<String, String>> handleValidationException(MethodArgumentNotValidException e) {
        log.error("参数验证失败：{}", e.getMessage());
        return handleBindingResult(e.getBindingResult());
    }

    /**
     * 处理参数绑定异常
     */
    @ExceptionHandler(BindException.class)
    public ApiResponse<Map<String, String>> handleBindException(BindException e) {
        log.error("参数绑定失败：{}", e.getMessage());
        return handleBindingResult(e.getBindingResult());
    }

    /**
     * 处理参数缺失异常
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ApiResponse<Void> handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        log.error("缺少请求参数：{}", e.getMessage());
        return ApiResponse.error(ApiCode.BAD_REQUEST.getCode(), "缺少请求参数：" + e.getParameterName());
    }

    /**
     * 处理参数类型不匹配异常
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ApiResponse<Void> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        log.error("参数类型不匹配：{}", e.getMessage());
        return ApiResponse.error(ApiCode.BAD_REQUEST.getCode(), "参数类型不匹配：" + e.getName());
    }

    /**
     * 处理请求体解析异常
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ApiResponse<Void> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        log.error("请求体解析失败：{}", e.getMessage());
        return ApiResponse.error(ApiCode.BAD_REQUEST.getCode(), "请求体格式不正确");
    }

    /**
     * 处理请求方法不支持异常
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ApiResponse<Void> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        log.error("不支持的请求方法：{}", e.getMessage());
        return ApiResponse.error(ApiCode.METHOD_NOT_ALLOWED);
    }

    /**
     * 处理资源未找到异常
     */
    @ExceptionHandler(NoHandlerFoundException.class)
    public ApiResponse<Void> handleNoHandlerFoundException(NoHandlerFoundException e) {
        log.error("请求路径不存在：{}", e.getMessage());
        return ApiResponse.error(ApiCode.NOT_FOUND);
    }

    /**
     * 处理绑定结果中的错误信息
     */
    private ApiResponse<Map<String, String>> handleBindingResult(BindingResult bindingResult) {
        Map<String, String> fieldErrors = new HashMap<>();
        
        for (FieldError error : bindingResult.getFieldErrors()) {
            fieldErrors.put(error.getField(), error.getDefaultMessage());
        }
        
        return ApiResponse.error(ApiCode.VALIDATE_FAILED.getCode(),bindingResult.getFieldError().getDefaultMessage());
    }

    /**
     * 未登录异常处理
     */
    @ExceptionHandler(NotLoginException.class)
    public ApiResponse<Void> handleNotLoginException(NotLoginException e) {
        log.error("未登录异常: {}", e.getMessage());
        return ApiResponse.error(401, "请先登录");
    }
    
    /**
     * 无角色异常处理
     */
    @ExceptionHandler(NotRoleException.class)
    public ApiResponse<Void> handleNotRoleException(NotRoleException e) {
        log.error("无角色异常: {}", e.getMessage());
        return ApiResponse.error(403, "无访问权限");
    }
    
    /**
     * 无权限异常处理
     */
    @ExceptionHandler(NotPermissionException.class)
    public ApiResponse<Void> handleNotPermissionException(NotPermissionException e) {
        log.error("无权限异常: {}", e.getMessage());
        return ApiResponse.error(403, "无操作权限");
    }
    
    /**
     * Sa-Token其他异常处理
     */
    @ExceptionHandler(SaTokenException.class)
    public ApiResponse<Void> handleSaTokenException(SaTokenException e) {
        log.error("权限认证异常: {}", e.getMessage());
        return ApiResponse.error(403, e.getMessage());
    }

} 