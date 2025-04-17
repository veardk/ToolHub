package com.levon.toolhub.module.tool.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.levon.toolhub.common.enums.ApiCode;
import com.levon.toolhub.common.exception.BizException;
import com.levon.toolhub.module.tool.converter.ToolReportConverter;
import com.levon.toolhub.module.tool.dto.request.client.ToolReportRequest;
import com.levon.toolhub.module.tool.entity.ToolReport;
import com.levon.toolhub.module.tool.mapper.ToolReportMapper;
import com.levon.toolhub.module.tool.service.ToolReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * 工具问题报告Service实现类
 */
@Service
public class ToolReportServiceImpl extends ServiceImpl<ToolReportMapper, ToolReport> implements ToolReportService {

    private static final Logger log = LoggerFactory.getLogger(ToolReportServiceImpl.class);

    @Autowired
    private ToolReportMapper toolReportMapper;

    @Autowired
    private ToolReportConverter toolReportConverter;

    /**
     * 提交工具问题报告
     *
     * @param toolId  工具ID
     * @param request 报告请求DTO
     * @param userId  用户ID，匿名提交时可为null
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void submitReport(Long toolId, ToolReportRequest request, Long userId) {
        log.info("开始提交工具问题报告, toolId: {}, category: {}, userId: {}", toolId, request.getCategory(), userId);

        // 1. 验证工具是否存在
        if (!validateToolExists(toolId)) {
            log.error("工具不存在, toolId: {}", toolId);
            throw new BizException(ApiCode.DATA_NOT_EXISTS.getCode(), "工具不存在");
        }

        long systemUserId = 1L;
        Long createId = userId != null ? userId : systemUserId;

        // 2.转换实体
        ToolReport toolReport = toolReportConverter.toEntity(request, toolId, userId, createId);

        // 3. 保存报告
        boolean success = save(toolReport);
        if (!success) {
            log.error("保存工具问题报告失败");
            throw new BizException(ApiCode.OPERATION_FAILED.getCode(), "提交报告失败");
        }

        log.info("工具问题报告提交成功, reportId: {}", toolReport.getId());
        
    }

    /**
     * 验证工具是否存在
     *
     * @param toolId 工具ID
     * @return 是否存在
     */
    @Override
    public boolean validateToolExists(Long toolId) {
        return toolReportMapper.checkToolExists(toolId) > 0;
    }
}




