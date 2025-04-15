package com.levon.toolhub.framework.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 缓存配置
 */
@Configuration
@EnableCaching
public class CacheConfig {

    /**
     * 缓存管理器
     * 使用内存缓存，在生产环境可替换为Redis等分布式缓存
     */
    @Bean
    public CacheManager cacheManager() {
        ConcurrentMapCacheManager cacheManager = new ConcurrentMapCacheManager();
        // 配置缓存名称
        cacheManager.setCacheNames(java.util.Arrays.asList(
                "categoryCache",   // 分类缓存
                "subcategoryCache", // 子分类缓存
                "toolCache",       // 工具缓存
                "countCache"       // 统计数据缓存
        ));
        return cacheManager;
    }
} 