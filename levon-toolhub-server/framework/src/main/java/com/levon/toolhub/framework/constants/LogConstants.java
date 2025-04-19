package com.levon.toolhub.framework.constants;

/**
 * 日志相关常量
 */
public interface LogConstants {
    
    /**
     * 模块常量
     */
    interface Module {
        String DEFAULT = "系统"; 
        String TOOL = "工具";
        String CATEGORY = "分类";
        String USER = "用户";
        String ADMIN = "管理";
        String HEAT = "热度";
    }
    
    /**
     * 操作类型常量
     */
    interface OperationType {
        String OTHER = "其他";
        String QUERY = "查询";
        String CREATE = "创建";
        String UPDATE = "更新";
        String DELETE = "删除";
        String SUBMIT = "提交";
        String IMPORT = "导入";
        String EXPORT = "导出";
        String LOGIN = "登录";
        String LOGOUT = "登出";
    }
} 