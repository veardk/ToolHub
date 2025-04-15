package com.levon.toolhub.framework.security.config;

import cn.dev33.satoken.exception.NotPermissionException;
import cn.dev33.satoken.interceptor.SaInterceptor;
import cn.dev33.satoken.router.SaRouter;
import cn.dev33.satoken.stp.StpUtil;
import com.levon.toolhub.common.constant.AuthConstants;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

/**
 * Sa-Token配置类
 */
@Configuration
public class SaTokenConfig implements WebMvcConfigurer {

//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        // 注册Sa-Token拦截器
//        registry.addInterceptor(new SaInterceptor(handle -> {
//            // 登录校验 - 所有接口都需要登录认证
//            SaRouter.match("/**")
//                // 排除登录接口
//                .notMatch("/api/user/login", "/api/admin/login")
//                // 排除验证码接口
//                .notMatch("/api/admin/captcha")
//                // 排除静态资源
//                .notMatch("/static/**", "/favicon.ico")
//                // 排除Swagger相关
//                .notMatch("/doc.html", "/webjars/**", "/swagger-resources/**", "/v3/api-docs/**")
//                // 登录校验
//                .check(r -> StpUtil.checkLogin());
//
//            // 管理员接口权限校验
//            SaRouter.match("/api/admin/**")
//                .notMatch("/api/admin/login", "/api/admin/captcha") // 排除登录相关
//                .check(r -> {
//                    // 获取当前用户角色类型
//                    List<Integer> roleTypes = (List<Integer>) StpUtil.getExtra("roleTypes");
//                    // 判断是否为管理员或超级管理员
//                    if (roleTypes == null || roleTypes.isEmpty() ||
//                        (!roleTypes.contains(AuthConstants.ROLE_ADMIN) &&
//                        !roleTypes.contains(AuthConstants.ROLE_SUPER_ADMIN))) {
//                        // 0-超管，2-管理员
//                        StpUtil.kickout("无管理员权限");
//                    }
//
//                    // 验证登录设备是否为管理端
//                    if (!AuthConstants.DEVICE_ADMIN.equals(StpUtil.getLoginDevice())) {
//                        throw new NotPermissionException("无管理员权限");
//                    }
//                });
//
//            // 前台接口登录设备校验 - 客户端登录
//            SaRouter.match("/api/user/**")
//                .notMatch("/api/user/login")
//                .check(r -> {
//                    // 验证登录设备是否为客户端
//                    if (!AuthConstants.DEVICE_CLIENT.equals(StpUtil.getLoginDevice())) {
//                        throw new NotPermissionException("无管理员权限");
//                    }
//                });
//
//        })).addPathPatterns("/**");
//    }
} 