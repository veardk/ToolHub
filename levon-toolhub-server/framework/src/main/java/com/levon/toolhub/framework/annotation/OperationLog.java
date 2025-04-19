package com.levon.toolhub.framework.annotation;

import com.levon.toolhub.framework.constants.LogConstants;

import java.lang.annotation.*;

/**
 * 操作日志注解
 * 支持简化方式：@OperationLog("描述信息")
 */
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface OperationLog {
    
    /**
     * 描述信息
     */
    String value() default "";
    
    /**
     * 模块
     */
    String module() default LogConstants.Module.DEFAULT;
    
    /**
     * 操作类型
     */
    String type() default LogConstants.OperationType.OTHER;
    
    /**
     * 详细描述
     */
    String description() default "";
} 