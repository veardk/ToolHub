package com.levon.toolhub.app;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ComponentScan("com.levon.toolhub")
@EntityScan("com.levon.toolhub")
@MapperScan("com.levon.toolhub.**.mapper")
public class ToolhubApplication {
    public static void main(String[] args) {
        SpringApplication.run(ToolhubApplication.class, args);
    }
} 