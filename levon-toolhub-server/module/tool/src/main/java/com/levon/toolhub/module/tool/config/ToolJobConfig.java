package com.levon.toolhub.module.tool.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

/**
 * 工具模块的Job配置类
 * 主要用于配置XXL-Job相关的任务
 */
@Configuration
public class ToolJobConfig {

    private static final Logger log = LoggerFactory.getLogger(ToolJobConfig.class);
    
    public ToolJobConfig() {
        log.info("工具模块XXL-Job配置初始化完成");
        // 由于使用了@XxlJob注解，无需手动注册处理器
    }
} 