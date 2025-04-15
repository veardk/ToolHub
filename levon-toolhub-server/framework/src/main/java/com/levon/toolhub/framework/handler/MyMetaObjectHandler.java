package com.levon.toolhub.framework.handler;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * MyBatis-Plus自动填充处理器
 * 与BaseEntity中的字段名保持一致
 */
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    /**
     * 插入操作自动填充
     */
    @Override
    public void insertFill(MetaObject metaObject) {
        // 获取当前登录用户ID，如果无法获取则使用默认值
        Long userId = getCurrentUserId();
        
        // 创建时间
        this.strictInsertFill(metaObject, "createDate", Date.class, new Date());
        // 更新时间
        this.strictInsertFill(metaObject, "updateDate", Date.class, new Date());
        // 创建人
        this.strictInsertFill(metaObject, "createId", Long.class, userId);
        // 更新人
        this.strictInsertFill(metaObject, "updateId", Long.class, userId);
        // 删除标记（默认0-未删除）
        this.strictInsertFill(metaObject, "isDelete", Integer.class, 0);
    }

    /**
     * 更新操作自动填充
     */
    @Override
    public void updateFill(MetaObject metaObject) {
        // 获取当前登录用户ID
        Long userId = getCurrentUserId();
        
        // 更新时间
        this.strictUpdateFill(metaObject, "updateDate", Date.class, new Date());
        // 更新人
        this.strictUpdateFill(metaObject, "updateId", Long.class, userId);
    }
    
    /**
     * 获取当前登录用户ID
     * 实际项目中，应该从安全上下文中获取
     *
     * @return 当前用户ID
     */
    private Long getCurrentUserId() {
        // TODO: 从Spring Security上下文或者其他方式获取当前登录用户
        // 这里仅作为示例，使用系统管理员ID
        return 1L;
    }
} 