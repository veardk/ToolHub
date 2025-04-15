package com.levon.toolhub.common.constant;

/**
 * 认证相关常量
 */
public class AuthConstants {
    
    /**
     * 超级管理员角色
     */
    public static final int ROLE_SUPER_ADMIN = 0;
    
    /**
     * 普通用户角色
     */
    public static final int ROLE_USER = 1;
    
    /**
     * 管理员角色
     */
    public static final int ROLE_ADMIN = 2;
    
    /**
     * 客户端设备标识
     */
    public static final String DEVICE_CLIENT = "client";
    
    /**
     * 管理端设备标识
     */
    public static final String DEVICE_ADMIN = "admin";
    
    /**
     * Redis中验证码key前缀
     */
    public static final String CAPTCHA_PREFIX = "auth:captcha:";
    
    /**
     * 认证请求头
     */
    public static final String TOKEN_HEADER = "Authorization";
    
    /**
     * Token前缀
     */
    public static final String TOKEN_PREFIX = "Bearer ";
} 