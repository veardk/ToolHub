package com.levon.toolhub.framework.config.mybatis;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * MyBatis配置类
 */
@Configuration
public class MyBatisConfig {
    
    /**
     * 自定义 ddlApplicationRunner，解决启动问题
     */
    @Bean
    @Primary
    public ApplicationRunner ddlApplicationRunner() {
        return new ApplicationRunner() {
            @Override
            public void run(ApplicationArguments args) {
                // 空实现，不执行任何操作
                System.out.println("自定义 DDL ApplicationRunner 被调用");
            }
        };
    }
} 