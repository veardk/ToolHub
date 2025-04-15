package com.levon.toolhub.module.tool.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.levon.toolhub.common.exception.BizException;
import com.levon.toolhub.common.model.CursorPageResult;
import com.levon.toolhub.framework.cache.CacheUtils;
import com.levon.toolhub.framework.cache.CaffeineCache;
import com.levon.toolhub.module.tool.converter.ToolConverter;
import com.levon.toolhub.module.tool.dto.request.client.ToolPageRequest;
import com.levon.toolhub.module.tool.dto.response.client.ToolBriefResponse;
import com.levon.toolhub.module.tool.entity.Category;
import com.levon.toolhub.module.tool.entity.Tool;
import com.levon.toolhub.module.tool.service.CategoryService;
import com.levon.toolhub.module.tool.service.ToolService;
import com.levon.toolhub.module.tool.mapper.ToolMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author leivik
 * @description 针对表【levon_toolhub_tool(工具表)】的数据库操作Service实现
 * @createDate 2025-04-14 14:27:12
 */
@Service
public class ToolServiceImpl extends ServiceImpl<ToolMapper, Tool>
        implements ToolService {

    private static final Logger log = LoggerFactory.getLogger(ToolServiceImpl.class);

    @Autowired
    private ToolMapper toolMapper;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ToolConverter toolConverter;
    
    @Autowired
    private CacheUtils cacheUtils;
    
    @Autowired
    private CaffeineCache caffeineCache;

    /**
     * 获取主分类下的工具列表
     *
     * @param categoryId 主分类ID
     * @param request    分页和筛选请求
     * @return 工具列表响应
     */
    @Override
    @Cacheable(
            value = "toolCache",
            keyGenerator = "customKeyGenerator",
            unless = "#result == null || #result.total == 0"
    )
    public CursorPageResult<ToolBriefResponse> getCategoryTools(Long categoryId, ToolPageRequest request) {
        log.debug("开始查询分类工具列表, categoryId: {}, request: {}", categoryId, request);
        // 1. 验证分类是否存在
        if (!categoryService.exists(new LambdaQueryWrapper<Category>().eq(Category::getId, categoryId))) {
            log.error("分类不存在, categoryId: {}", categoryId);
            throw new BizException(404, "分类不存在");
        }

        // 2. 解析游标
        int offset = 0;
        if (request.getCursor() != null) {
            try {
                offset = Integer.parseInt(request.getCursor());
                log.debug("解析游标成功, cursor: {}, offset: {}", request.getCursor(), offset);
            } catch (NumberFormatException e) {
                log.error("游标格式错误, cursor: {}", request.getCursor(), e);
                throw new BizException(400, "游标格式错误");
            }
        }

        // 3. 查询数据
        List<ToolBriefResponse> toolResponses = toolMapper.findByCategoryId(
                categoryId,
                request.getSubCategoryId(),
                request.getPriceType(),
                offset,
                request.getSize() + 1,  // 多查一条用于判断是否还有更多
                request.getSort()
        );
        log.debug("查询到工具数量: {}", toolResponses.size());

        // 4. 判断是否还有更多数据
        boolean hasMore = toolResponses.size() > request.getSize();
        if (hasMore) {
            toolResponses = toolResponses.subList(0, request.getSize());
            log.debug("截取一页数据, size: {}", request.getSize());
        }

        // 5. 计算下一页游标
        String nextCursor = hasMore ? String.valueOf(offset + request.getSize()) : null;
        log.debug("计算下一页游标: {}, hasMore: {}", nextCursor, hasMore);

        // 6. 查询总数
        Long total = toolMapper.countByCategoryId(
                categoryId,
                request.getSubCategoryId(),
                request.getPriceType()
        );
        log.debug("查询到总数: {}", total);

        log.info("分类工具列表查询完成, categoryId: {}, 当前页数量: {}, 总数: {}, 是否有下一页: {}",
                categoryId, toolResponses.size(), total, hasMore);

        // 8. 返回结果
        return CursorPageResult.of(toolResponses, hasMore, nextCursor, total);
    }
    
    /**
     * 刷新工具缓存
     * 手动触发清除所有工具相关缓存
     */
    @Override
    @CacheEvict(value = "toolCache", allEntries = true)
    public void refreshToolCache() {
        log.info("手动触发刷新工具缓存");
        // 使用Spring Cache注解自动清除缓存
        
        // 也可以使用CaffeineCache手动清除
        caffeineCache.invalidateAll("toolCache");
        // 或者使用CacheUtils工具类清除
        cacheUtils.clear("toolCache");
        
        log.info("工具缓存刷新完成");
    }
    
    /**
     * 定时刷新缓存任务
     * 每天凌晨3点执行
     */
    @Scheduled(cron = "0 0 3 * * ?")
    public void scheduledCacheRefresh() {
        log.info("开始执行定时刷新工具缓存任务");
        refreshToolCache();
        log.info("定时刷新工具缓存任务完成");
    }

    // TODO 工具浏览次数、工具收藏次数
}




