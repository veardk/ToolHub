package com.levon.toolhub.framework.actuator;

import java.util.Properties;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

/**
 * Redis连接健康检查器
 */
@Component
public class RedisHealthIndicator implements HealthIndicator {

    private final RedisTemplate<String, Object> redisTemplate;

    public RedisHealthIndicator(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public Health health() {
        try {
            RedisConnection connection = redisTemplate.getConnectionFactory().getConnection();
            Properties info = connection.info();
            String version = info.getProperty("redis_version");
            connection.close();
            
            return Health.up()
                    .withDetail("status", "Redis连接正常")
                    .withDetail("version", version)
                    .withDetail("clientName", connection.getClientName())
                    .build();
        } catch (Exception e) {
            return Health.down()
                    .withDetail("status", "Redis连接异常")
                    .withDetail("error", e.getMessage())
                    .build();
        }
    }
} 