package com.levon.toolhub.framework.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web MVC 全局配置类
 * 负责处理全局跨域配置等通用Web配置
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    /**
     * 全局跨域配置
     * 允许所有来源的跨域请求，适用于所有模块
     */
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // 允许携带认证信息（cookie）
        config.setAllowCredentials(true);
        
        // 允许所有来源（生产环境中应该限制来源）
        config.addAllowedOriginPattern("*");
        
        // 允许所有请求头
        config.addAllowedHeader("*");
        
        // 允许所有HTTP方法
        config.addAllowedMethod("*");
        
        // 暴露必要的响应头，例如认证token
        config.addExposedHeader("Authorization");
        
        // 预检请求有效期（单位：秒）
        config.setMaxAge(3600L);
        
        // 对所有路径应用跨域配置
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
} 