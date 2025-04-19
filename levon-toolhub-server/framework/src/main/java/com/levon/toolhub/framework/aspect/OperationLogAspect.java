package com.levon.toolhub.framework.aspect;

import com.levon.toolhub.framework.annotation.OperationLog;
import com.levon.toolhub.framework.constants.LogConstants;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.lang.reflect.Method;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.UUID;

/**
 * 操作日志切面
 */
@Aspect
@Component
public class OperationLogAspect {

    private static final Logger log = LoggerFactory.getLogger(OperationLogAspect.class);
    private static final String LOG_PATTERN = "[{}] | {} | {} | {} | {} | {} | {} ms | {}";
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

    @Pointcut("@annotation(com.levon.toolhub.framework.annotation.OperationLog)")
    public void operationLogPointcut() {
    }

    @Around("operationLogPointcut()")
    public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        String traceId = UUID.randomUUID().toString().replace("-", "").substring(0, 8);
        
        // 获取请求信息
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes != null ? attributes.getRequest() : null;
        String requestURI = request != null ? request.getRequestURI() : "Unknown URI";
        String requestMethod = request != null ? request.getMethod() : "Unknown Method";
        String ipAddress = getIpAddress(request);
        
        // 获取注解信息
        OperationLog operationLog = getOperationLog(joinPoint);
        String module = operationLog.module();
        String type = operationLog.type();
        String description = getDescription(operationLog);
        
        // 执行目标方法
        Object result;
        try {
            result = joinPoint.proceed();
            // 记录成功日志
            long executionTime = System.currentTimeMillis() - startTime;
            log.info(LOG_PATTERN, 
                    traceId, 
                    LocalDateTime.now().format(FORMATTER),
                    module, 
                    type, 
                    requestMethod + " " + requestURI, 
                    ipAddress,
                    executionTime, 
                    description);
            
            return result;
        } catch (Throwable e) {
            // 记录异常日志
            long executionTime = System.currentTimeMillis() - startTime;
            log.error(LOG_PATTERN + " | 异常: {}", 
                    traceId, 
                    LocalDateTime.now().format(FORMATTER),
                    module, 
                    type, 
                    requestMethod + " " + requestURI, 
                    ipAddress,
                    executionTime, 
                    description,
                    e.getMessage());
            throw e;
        }
    }

    /**
     * 获取客户端IP地址
     */
    private String getIpAddress(HttpServletRequest request) {
        if (request == null) {
            return "Unknown IP";
        }
        
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        
        // 对于通过多个代理的情况，第一个IP为客户端真实IP，多个IP以','分割
        if (ip != null && ip.contains(",")) {
            ip = ip.substring(0, ip.indexOf(",")).trim();
        }
        
        return ip;
    }

    /**
     * 获取操作日志注解
     */
    private OperationLog getOperationLog(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        return method.getAnnotation(OperationLog.class);
    }

    /**
     * 获取描述信息，优先使用value，其次使用description
     */
    private String getDescription(OperationLog operationLog) {
        if (StringUtils.hasText(operationLog.value())) {
            return operationLog.value();
        }
        if (StringUtils.hasText(operationLog.description())) {
            return operationLog.description();
        }
        return "未提供描述";
    }
} 