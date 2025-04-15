package com.levon.toolhub.common.model;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableLogic;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * 实体基类
 * 包含通用字段，并使用MyBatis-Plus的自动填充功能
 * 字段名与数据库表设计保持一致
 */
public class BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    
    /**
     * 创建人ID
     */
    @TableField(fill = FieldFill.INSERT, value = "create_id")
    private Long createId;
    
    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @TableField(fill = FieldFill.INSERT, value = "create_date")
    private LocalDateTime createDate;
    
    /**
     * 更新人ID
     */
    @TableField(fill = FieldFill.INSERT_UPDATE, value = "update_id")
    private Long updateId;
    
    /**
     * 更新时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @TableField(fill = FieldFill.INSERT_UPDATE, value = "update_date")
    private LocalDateTime updateDate;
    
    /**
     * 删除标记（0-正常，1-删除）
     */
    @TableLogic
    @TableField(value = "is_delete")
    private Integer isDelete;
    
    /**
     * 获取创建人ID
     *
     * @return 创建人ID
     */
    public Long getCreateId() {
        return createId;
    }
    
    /**
     * 设置创建人ID
     *
     * @param createId 创建人ID
     */
    public void setCreateId(Long createId) {
        this.createId = createId;
    }
    

    /**
     * 获取更新人ID
     *
     * @return 更新人ID
     */
    public Long getUpdateId() {
        return updateId;
    }
    
    /**
     * 设置更新人ID
     *
     * @param updateId 更新人ID
     */
    public void setUpdateId(Long updateId) {
        this.updateId = updateId;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public LocalDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }

    /**
     * 获取删除标记
     *
     * @return 删除标记
     */
    public Integer getIsDelete() {
        return isDelete;
    }
    
    /**
     * 设置删除标记
     *
     * @param isDelete 删除标记
     */
    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }
    
    @Override
    public String toString() {
        return "BaseEntity{" +
                "createId=" + createId +
                ", createDate=" + createDate +
                ", updateId=" + updateId +
                ", updateDate=" + updateDate +
                ", isDelete=" + isDelete +
                '}';
    }
} 