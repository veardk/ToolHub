package com.levon.toolhub.framework.utils;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Component;

import jakarta.annotation.Resource;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * Redis工具类
 */
@Component
public class RedisUtils {
    
    @Resource
    private RedisTemplate<String, Object> redisTemplate;
    
    // ========== 通用操作 ==========
    
    /**
     * 指定缓存失效时间
     *
     * @param key     键
     * @param timeout 时间(秒)
     * @return 是否成功
     */
    public boolean expire(String key, long timeout) {
        return expire(key, timeout, TimeUnit.SECONDS);
    }
    
    /**
     * 指定缓存失效时间
     *
     * @param key     键
     * @param timeout 时间
     * @param unit    时间单位
     * @return 是否成功
     */
    public boolean expire(String key, long timeout, TimeUnit unit) {
        if (timeout > 0) {
            return Boolean.TRUE.equals(redisTemplate.expire(key, timeout, unit));
        }
        return false;
    }
    
    /**
     * 获取键过期时间
     *
     * @param key 键
     * @return 时间(秒) 返回0代表永久有效
     */
    public long getExpire(String key) {
        return getExpire(key, TimeUnit.SECONDS);
    }
    
    /**
     * 获取键过期时间
     *
     * @param key  键
     * @param unit 时间单位
     * @return 过期时间
     */
    public long getExpire(String key, TimeUnit unit) {
        Long expire = redisTemplate.getExpire(key, unit);
        return expire != null ? expire : 0;
    }
    
    /**
     * 判断key是否存在
     *
     * @param key 键
     * @return true 存在 false不存在
     */
    public boolean hasKey(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }
    
    /**
     * 删除缓存
     *
     * @param key 可以传一个或多个值
     */
    public void delete(String... key) {
        if (key != null && key.length > 0) {
            if (key.length == 1) {
                redisTemplate.delete(key[0]);
            } else {
                redisTemplate.delete(List.of(key));
            }
        }
    }
    
    /**
     * 删除缓存
     *
     * @param keys 键集合
     */
    public void delete(Collection<String> keys) {
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }
    
    // ========== String类型 ==========
    
    /**
     * 获取缓存
     *
     * @param key 键
     * @return 值
     */
    public Object get(String key) {
        return key == null ? null : redisTemplate.opsForValue().get(key);
    }
    
    /**
     * 放入缓存
     *
     * @param key   键
     * @param value 值
     */
    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }
    
    /**
     * 放入缓存并设置时间
     *
     * @param key     键
     * @param value   值
     * @param timeout 时间(秒)
     */
    public void set(String key, Object value, long timeout) {
        set(key, value, timeout, TimeUnit.SECONDS);
    }
    
    /**
     * 放入缓存并设置时间
     *
     * @param key     键
     * @param value   值
     * @param timeout 时间
     * @param unit    时间单位
     */
    public void set(String key, Object value, long timeout, TimeUnit unit) {
        if (timeout > 0) {
            redisTemplate.opsForValue().set(key, value, timeout, unit);
        } else {
            set(key, value);
        }
    }
    
    /**
     * 递增
     *
     * @param key   键
     * @param delta 增加的值(大于0)
     * @return 递增后的值
     */
    public long incr(String key, long delta) {
        if (delta < 0) {
            throw new IllegalArgumentException("递增因子必须大于0");
        }
        Long increment = redisTemplate.opsForValue().increment(key, delta);
        return increment != null ? increment : 0;
    }
    
    /**
     * 递减
     *
     * @param key   键
     * @param delta 减少的值(大于0)
     * @return 递减后的值
     */
    public long decr(String key, long delta) {
        if (delta < 0) {
            throw new IllegalArgumentException("递减因子必须大于0");
        }
        Long increment = redisTemplate.opsForValue().decrement(key, delta);
        return increment != null ? increment : 0;
    }
    
    // ========== Hash类型 ==========
    
    /**
     * 获取Hash中的某个值
     *
     * @param key   键
     * @param field 项
     * @return 值
     */
    public Object hGet(String key, String field) {
        return redisTemplate.opsForHash().get(key, field);
    }
    
    /**
     * 获取Hash所有值
     *
     * @param key 键
     * @return Hash表内容
     */
    public Map<Object, Object> hGetAll(String key) {
        return redisTemplate.opsForHash().entries(key);
    }
    
    /**
     * 设置Hash值
     *
     * @param key     键
     * @param hashMap Hash表
     */
    public void hSet(String key, Map<String, ?> hashMap) {
        redisTemplate.opsForHash().putAll(key, hashMap);
    }
    
    /**
     * 设置Hash值并设置过期时间
     *
     * @param key     键
     * @param hashMap Hash表
     * @param timeout 时间(秒)
     */
    public void hSet(String key, Map<String, ?> hashMap, long timeout) {
        hSet(key, hashMap, timeout, TimeUnit.SECONDS);
    }
    
    /**
     * 设置Hash值并设置过期时间
     *
     * @param key     键
     * @param hashMap Hash表
     * @param timeout 时间
     * @param unit    时间单位
     */
    public void hSet(String key, Map<String, ?> hashMap, long timeout, TimeUnit unit) {
        redisTemplate.opsForHash().putAll(key, hashMap);
        if (timeout > 0) {
            expire(key, timeout, unit);
        }
    }
    
    /**
     * 设置Hash中的值
     *
     * @param key   键
     * @param field 项
     * @param value 值
     */
    public void hSet(String key, String field, Object value) {
        redisTemplate.opsForHash().put(key, field, value);
    }
    
    /**
     * 删除Hash中的值
     *
     * @param key    键
     * @param fields Hash表中的项
     */
    public void hDelete(String key, Object... fields) {
        redisTemplate.opsForHash().delete(key, fields);
    }
    
    /**
     * 判断Hash中是否有某项
     *
     * @param key   键
     * @param field 项
     * @return 是否存在
     */
    public boolean hHasKey(String key, String field) {
        return redisTemplate.opsForHash().hasKey(key, field);
    }
    
    /**
     * Hash中的递增
     *
     * @param key   键
     * @param field 项
     * @param delta 增加值
     * @return 递增后的值
     */
    public double hIncr(String key, String field, double delta) {
        return redisTemplate.opsForHash().increment(key, field, delta);
    }
    
    // ========== List类型 ==========
    
    /**
     * 获取List
     *
     * @param key   键
     * @param start 开始索引
     * @param end   结束索引
     * @return 列表
     */
    public List<Object> lRange(String key, long start, long end) {
        return redisTemplate.opsForList().range(key, start, end);
    }
    
    /**
     * 获取List长度
     *
     * @param key 键
     * @return 长度
     */
    public long lSize(String key) {
        Long size = redisTemplate.opsForList().size(key);
        return size != null ? size : 0;
    }
    
    /**
     * 通过索引获取List值
     *
     * @param key   键
     * @param index 索引
     * @return 值
     */
    public Object lIndex(String key, long index) {
        return redisTemplate.opsForList().index(key, index);
    }
    
    /**
     * 从List右侧放入
     *
     * @param key   键
     * @param value 值
     */
    public void rPush(String key, Object value) {
        redisTemplate.opsForList().rightPush(key, value);
    }
    
    /**
     * 从List右侧放入多个值
     *
     * @param key    键
     * @param values 值集合
     */
    public void rPushAll(String key, Collection<Object> values) {
        redisTemplate.opsForList().rightPushAll(key, values);
    }
    
    /**
     * 从List左侧放入
     *
     * @param key   键
     * @param value 值
     */
    public void lPush(String key, Object value) {
        redisTemplate.opsForList().leftPush(key, value);
    }
    
    /**
     * 从List左侧放入多个值
     *
     * @param key    键
     * @param values 值集合
     */
    public void lPushAll(String key, Collection<Object> values) {
        redisTemplate.opsForList().leftPushAll(key, values);
    }
    
    // ========== Set类型 ==========
    
    /**
     * 获取Set所有值
     *
     * @param key 键
     * @return Set集合
     */
    public Set<Object> sMembers(String key) {
        return redisTemplate.opsForSet().members(key);
    }
    
    /**
     * 检查Set是否存在值
     *
     * @param key   键
     * @param value 值
     * @return 是否存在
     */
    public boolean sIsMember(String key, Object value) {
        return Boolean.TRUE.equals(redisTemplate.opsForSet().isMember(key, value));
    }
    
    /**
     * 新增Set值
     *
     * @param key    键
     * @param values 值
     * @return 新增的个数
     */
    public long sAdd(String key, Object... values) {
        Long count = redisTemplate.opsForSet().add(key, values);
        return count != null ? count : 0;
    }
    
    /**
     * 获取Set大小
     *
     * @param key 键
     * @return Set大小
     */
    public long sSize(String key) {
        Long size = redisTemplate.opsForSet().size(key);
        return size != null ? size : 0;
    }
    
    /**
     * 移除Set值
     *
     * @param key    键
     * @param values 值
     * @return 移除的个数
     */
    public long sRemove(String key, Object... values) {
        Long count = redisTemplate.opsForSet().remove(key, values);
        return count != null ? count : 0;
    }
    
    // ========== ZSet类型 ==========
    
    /**
     * 添加ZSet元素
     *
     * @param key   键
     * @param value 值
     * @param score 分数
     */
    public void zAdd(String key, Object value, double score) {
        redisTemplate.opsForZSet().add(key, value, score);
    }
    
    /**
     * 移除ZSet元素
     *
     * @param key    键
     * @param values 值
     * @return 移除个数
     */
    public long zRemove(String key, Object... values) {
        Long count = redisTemplate.opsForZSet().remove(key, values);
        return count != null ? count : 0;
    }
    
    /**
     * 获取ZSet元素分数
     *
     * @param key   键
     * @param value 值
     * @return 分数
     */
    public double zScore(String key, Object value) {
        Double score = redisTemplate.opsForZSet().score(key, value);
        return score != null ? score : 0;
    }
    
    /**
     * 获取ZSet指定范围内的元素
     *
     * @param key   键
     * @param start 开始排名（包含）
     * @param end   结束排名（包含）
     * @return 元素集合
     */
    public Set<Object> zRange(String key, long start, long end) {
        return redisTemplate.opsForZSet().range(key, start, end);
    }
    
    /**
     * 获取ZSet指定分数范围内的元素
     *
     * @param key 键
     * @param min 最小分数（包含）
     * @param max 最大分数（包含）
     * @return 元素集合
     */
    public Set<Object> zRangeByScore(String key, double min, double max) {
        return redisTemplate.opsForZSet().rangeByScore(key, min, max);
    }
    
    /**
     * 获取ZSet所有元素和分数
     *
     * @param key 键
     * @return 元素与分数集合
     */
    public Set<ZSetOperations.TypedTuple<Object>> zRangeWithScores(String key) {
        return redisTemplate.opsForZSet().rangeWithScores(key, 0, -1);
    }
    
    /**
     * 获取ZSet大小
     *
     * @param key 键
     * @return ZSet大小
     */
    public long zSize(String key) {
        Long size = redisTemplate.opsForZSet().size(key);
        return size != null ? size : 0;
    }
    
    /**
     * ZSet自增分数
     *
     * @param key   键
     * @param value 值
     * @param delta 增加的分数
     * @return 新的分数
     */
    public double zIncrementScore(String key, Object value, double delta) {
        Double score = redisTemplate.opsForZSet().incrementScore(key, value, delta);
        return score != null ? score : 0;
    }
} 