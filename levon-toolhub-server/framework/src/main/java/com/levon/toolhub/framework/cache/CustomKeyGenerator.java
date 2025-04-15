package com.levon.toolhub.framework.cache;

import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.lang.reflect.Method;
import java.util.Arrays;

/**
 * 自定义缓存键生成器
 * 用于生成更可读和更可控的缓存键
 */
@Component
public class CustomKeyGenerator implements KeyGenerator {

    /**
     * 生成缓存键
     * 格式：方法名_参数值1_参数值2...
     * 如果参数是复杂对象，会使用其toString()或hashCode()
     *
     * @param target 目标对象
     * @param method 方法
     * @param params 参数数组
     * @return 生成的缓存键
     */
    @Override
    public Object generate(Object target, Method method, Object... params) {
        StringBuilder key = new StringBuilder();
        // 添加类名和方法名
        key.append(target.getClass().getSimpleName())
           .append("_")
           .append(method.getName());
        
        // 添加参数值
        if (params != null && params.length > 0) {
            key.append("_");
            for (Object param : params) {
                if (param == null) {
                    key.append("NULL");
                } else if (param instanceof String && StringUtils.hasText((String) param)) {
                    // 字符串参数直接添加
                    key.append(param);
                } else if (param.getClass().isArray()) {
                    // 处理数组参数
                    key.append(Arrays.deepToString((Object[]) param));
                } else {
                    // 其他参数使用toString()或hashCode()
                    String paramStr = param.toString();
                    if (paramStr.length() > 100) {
                        // 如果参数字符串太长，使用hashCode
                        key.append(param.hashCode());
                    } else {
                        key.append(paramStr);
                    }
                }
                key.append("_");
            }
            // 删除最后一个下划线
            key.deleteCharAt(key.length() - 1);
        }
        
        return key.toString();
    }
} 