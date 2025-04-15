package com.levon.toolhub.framework.cache;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

/**
 * Caffeine缓存服务
 * 提供手动创建和操作Caffeine缓存的能力，适用于需要灵活控制缓存的场景
 */
@Component
public class CaffeineCache {
    private static final Logger log = LoggerFactory.getLogger(CaffeineCache.class);

    // 缓存实例容器
    private final Map<String, Cache<Object, Object>> cacheMap = new ConcurrentHashMap<>();
    private final Map<String, LoadingCache<Object, Object>> loadingCacheMap = new ConcurrentHashMap<>();

    /**
     * 创建一个普通的Caffeine缓存
     *
     * @param cacheName     缓存名称
     * @param maximumSize   最大容量
     * @param expireMinutes 过期时间（分钟）
     * @return 创建的缓存实例
     */
    public Cache<Object, Object> createCache(String cacheName, int maximumSize, int expireMinutes) {
        Cache<Object, Object> cache = Caffeine.newBuilder()
                .maximumSize(maximumSize)
                .expireAfterWrite(expireMinutes, TimeUnit.MINUTES)
                .recordStats() // 开启统计
                .build();
        cacheMap.put(cacheName, cache);
        log.info("创建Caffeine缓存: {}, 最大容量: {}, 过期时间: {}分钟", cacheName, maximumSize, expireMinutes);
        return cache;
    }

    /**
     * 创建一个自动加载的Caffeine缓存
     *
     * @param cacheName     缓存名称
     * @param maximumSize   最大容量
     * @param expireMinutes 过期时间（分钟）
     * @param loader        数据加载函数
     * @return 创建的LoadingCache实例
     */
    public <K, V> LoadingCache<K, V> createLoadingCache(String cacheName, int maximumSize, int expireMinutes,
                                                      Function<K, V> loader) {
        LoadingCache<K, V> cache = Caffeine.newBuilder()
                .maximumSize(maximumSize)
                .expireAfterWrite(expireMinutes, TimeUnit.MINUTES)
                .recordStats() // 开启统计
                .build(key -> loader.apply(key));
        loadingCacheMap.put(cacheName, (LoadingCache<Object, Object>) cache);
        log.info("创建自动加载Caffeine缓存: {}, 最大容量: {}, 过期时间: {}分钟", cacheName, maximumSize, expireMinutes);
        return cache;
    }

    /**
     * 获取指定名称的缓存实例
     *
     * @param cacheName 缓存名称
     * @return 缓存实例或null
     */
    public Cache<Object, Object> getCache(String cacheName) {
        return cacheMap.get(cacheName);
    }

    /**
     * 获取指定名称的自动加载缓存实例
     *
     * @param cacheName 缓存名称
     * @return LoadingCache实例或null
     */
    public LoadingCache<Object, Object> getLoadingCache(String cacheName) {
        return loadingCacheMap.get(cacheName);
    }

    /**
     * 从缓存中获取值，如果不存在则通过callable获取并放入缓存
     *
     * @param cacheName 缓存名称
     * @param key       缓存键
     * @param callable  数据获取回调
     * @return 缓存值
     */
    public <T> T get(String cacheName, Object key, Callable<T> callable) {
        Cache<Object, Object> cache = cacheMap.get(cacheName);
        if (cache == null) {
            log.warn("缓存[{}]不存在", cacheName);
            try {
                return callable.call();
            } catch (Exception e) {
                log.error("执行回调获取数据失败", e);
                return null;
            }
        }

        try {
            @SuppressWarnings("unchecked")
            T value = (T) cache.get(key, k -> {
                try {
                    return callable.call();
                } catch (Exception e) {
                    log.error("加载缓存数据失败", e);
                    throw new RuntimeException(e);
                }
            });
            return value;
        } catch (Exception e) {
            log.error("从缓存[{}]获取值失败: {}", cacheName, e.getMessage());
            return null;
        }
    }

    /**
     * 存入缓存
     *
     * @param cacheName 缓存名称
     * @param key       缓存键
     * @param value     缓存值
     */
    public void put(String cacheName, Object key, Object value) {
        Cache<Object, Object> cache = cacheMap.get(cacheName);
        if (cache == null) {
            log.warn("缓存[{}]不存在", cacheName);
            return;
        }
        cache.put(key, value);
        log.debug("数据已存入缓存 [{}:{}]", cacheName, key);
    }

    /**
     * 从缓存中移除数据
     *
     * @param cacheName 缓存名称
     * @param key       缓存键
     */
    public void invalidate(String cacheName, Object key) {
        Cache<Object, Object> cache = cacheMap.get(cacheName);
        if (cache == null) {
            log.warn("缓存[{}]不存在", cacheName);
            return;
        }
        cache.invalidate(key);
        log.debug("数据已从缓存删除 [{}:{}]", cacheName, key);
    }

    /**
     * 清空指定名称的缓存
     *
     * @param cacheName 缓存名称
     */
    public void invalidateAll(String cacheName) {
        Cache<Object, Object> cache = cacheMap.get(cacheName);
        if (cache == null) {
            log.warn("缓存[{}]不存在", cacheName);
            return;
        }
        cache.invalidateAll();
        log.info("缓存[{}]已清空", cacheName);
    }

    /**
     * 获取缓存统计信息
     *
     * @param cacheName 缓存名称
     * @return 统计信息文本
     */
    public String getCacheStats(String cacheName) {
        Cache<Object, Object> cache = cacheMap.get(cacheName);
        if (cache == null) {
            log.warn("缓存[{}]不存在", cacheName);
            return null;
        }
        return cache.stats().toString();
    }
} 