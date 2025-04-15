package com.levon.toolhub.framework.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import com.levon.toolhub.framework.cache.CustomKeyGenerator;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.cache.interceptor.KeyGenerator;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

/**
 * 缓存配置
 */
@Configuration
@EnableCaching
public class CacheConfig {

    /**
     * 缓存管理器
     * 使用Caffeine缓存，支持过期时间设置和缓存容量控制
     */
    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        
        // 注册所有缓存名称
        cacheManager.setCacheNames(Arrays.asList(
            "categoryCache",
            "subcategoryCache",
            "toolCache",
            "countCache"
        ));
        
        // 设置缓存默认配置
        cacheManager.setCaffeine(Caffeine.newBuilder()
            // 设置最后一次写入或访问后经过固定时间过期
            .expireAfterAccess(60, TimeUnit.MINUTES)
            // 初始的缓存空间大小
            .initialCapacity(100)
            // 缓存的最大条数
            .maximumSize(1000));
        
        // 也可以为每个缓存设置不同的配置
        // 这里使用统一配置，实际使用中可以根据需求自定义
        
        return cacheManager;
    }
    
    /**
     * 自定义缓存键生成器
     * 在@Cacheable注解中可以通过keyGenerator="customKeyGenerator"使用
     */
    @Bean
    public KeyGenerator customKeyGenerator() {
        return new CustomKeyGenerator();
    }
} 