package com.levon.toolhub.framework.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.function.Supplier;

/**
 * 缓存工具类
 * 提供便捷的缓存操作方法，简化在非Spring管理Bean中使用缓存
 */
@Component
public class CacheUtils {

    private static final Logger log = LoggerFactory.getLogger(CacheUtils.class);

    private final CacheManager cacheManager;

    @Autowired
    public CacheUtils(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    /**
     * 获取所有可用的缓存名称
     * 
     * @return 缓存名称集合
     */
    public Collection<String> getCacheNames() {
        return cacheManager.getCacheNames();
    }

    /**
     * 获取缓存值，如果不存在则返回null
     * 
     * @param cacheName 缓存名称
     * @param key 缓存键
     * @param <T> 返回值类型
     * @return 缓存值或null
     */
    @SuppressWarnings("unchecked")
    public <T> T get(String cacheName, Object key) {
        Cache cache = cacheManager.getCache(cacheName);
        if (cache == null) {
            log.warn("缓存[{}]不存在", cacheName);
            return null;
        }

        Cache.ValueWrapper valueWrapper = cache.get(key);
        if (valueWrapper == null) {
            return null;
        }
        
        return (T) valueWrapper.get();
    }

    /**
     * 获取缓存值，如果不存在则从supplier获取并存入缓存
     * 
     * @param cacheName 缓存名称
     * @param key 缓存键
     * @param supplier 数据提供者
     * @param <T> 返回值类型
     * @return 缓存值或supplier提供的值
     */
    @SuppressWarnings("unchecked")
    public <T> T getOrCompute(String cacheName, Object key, Supplier<T> supplier) {
        T value = get(cacheName, key);
        if (value != null) {
            log.debug("缓存命中 [{}:{}]", cacheName, key);
            return value;
        }

        // 缓存未命中，从supplier获取数据
        log.debug("缓存未命中 [{}:{}]，从数据源获取", cacheName, key);
        value = supplier.get();
        if (value != null) {
            put(cacheName, key, value);
        }
        return value;
    }

    /**
     * 将数据放入缓存
     * 
     * @param cacheName 缓存名称
     * @param key 缓存键
     * @param value 缓存值
     */
    public void put(String cacheName, Object key, Object value) {
        Cache cache = cacheManager.getCache(cacheName);
        if (cache == null) {
            log.warn("缓存[{}]不存在，无法存入数据", cacheName);
            return;
        }
        cache.put(key, value);
        log.debug("数据已存入缓存 [{}:{}]", cacheName, key);
    }

    /**
     * 从缓存中移除数据
     * 
     * @param cacheName 缓存名称
     * @param key 缓存键
     */
    public void evict(String cacheName, Object key) {
        Cache cache = cacheManager.getCache(cacheName);
        if (cache == null) {
            log.warn("缓存[{}]不存在，无法删除数据", cacheName);
            return;
        }
        cache.evict(key);
        log.debug("数据已从缓存删除 [{}:{}]", cacheName, key);
    }

    /**
     * 清空指定名称的缓存
     * 
     * @param cacheName 缓存名称
     */
    public void clear(String cacheName) {
        Cache cache = cacheManager.getCache(cacheName);
        if (cache == null) {
            log.warn("缓存[{}]不存在，无法清空", cacheName);
            return;
        }
        cache.clear();
        log.info("缓存[{}]已清空", cacheName);
    }

    /**
     * 清空所有缓存
     */
    public void clearAll() {
        cacheManager.getCacheNames().forEach(this::clear);
        log.info("所有缓存已清空");
    }
} 