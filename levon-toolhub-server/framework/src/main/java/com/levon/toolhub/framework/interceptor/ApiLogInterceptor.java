package com.levon.toolhub.framework.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * API访问日志拦截器
 */
@Component
public class ApiLogInterceptor implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(ApiLogInterceptor.class);
    private static final String START_TIME = "requestStartTime";

    /**
     * 在请求处理之前进行调用
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // 记录请求开始时间
        request.setAttribute(START_TIME, System.currentTimeMillis());
        
        // 获取请求参数
        Map<String, String> paramMap = getParamMap(request);
        
        // 记录请求日志
        logger.info("API请求 - 路径: {}, 方法: {}, 参数: {}, IP: {}, User-Agent: {}",
                request.getRequestURI(),
                request.getMethod(),
                paramMap,
                getClientIp(request),
                request.getHeader("User-Agent"));
        
        return true;
    }

    /**
     * 在请求完成后，视图渲染之前执行
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
        // 不做任何处理
    }

    /**
     * 在整个请求结束后执行
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        // 计算请求耗时
        long startTime = (Long) request.getAttribute(START_TIME);
        long endTime = System.currentTimeMillis();
        long executionTime = endTime - startTime;
        
        // 记录响应日志
        logger.info("API响应 - 路径: {}, 状态码: {}, 耗时: {}ms",
                request.getRequestURI(),
                response.getStatus(),
                executionTime);
        
        if (ex != null) {
            logger.error("API异常 - 路径: {}, 异常: {}", request.getRequestURI(), ex.getMessage(), ex);
        }
    }

    /**
     * 获取请求参数
     */
    private Map<String, String> getParamMap(HttpServletRequest request) {
        Map<String, String> paramMap = new HashMap<>();
        Enumeration<String> paramNames = request.getParameterNames();
        while (paramNames.hasMoreElements()) {
            String paramName = paramNames.nextElement();
            String paramValue = request.getParameter(paramName);
            paramMap.put(paramName, paramValue);
        }
        return paramMap;
    }

    /**
     * 获取客户端真实IP
     */
    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        // 多个代理的情况，第一个IP为客户端真实IP
        if (ip != null && ip.indexOf(",") > 0) {
            ip = ip.substring(0, ip.indexOf(","));
        }
        return ip;
    }
} 