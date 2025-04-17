package com.levon.toolhub.module.tool.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.levon.toolhub.module.tool.entity.ToolReport;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * 工具问题报告Mapper接口
 */
@Mapper
public interface ToolReportMapper extends BaseMapper<ToolReport> {

    /**
     * 检查工具是否存在
     *
     * @param toolId 工具ID
     * @return 是否存在
     */
    @Select("SELECT COUNT(*) FROM levon_toolhub_tool WHERE id = #{toolId} AND is_delete = 0")
    int checkToolExists(@Param("toolId") Long toolId);
}




