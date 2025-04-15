package com.levon.toolhub.module.tool.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.levon.toolhub.common.exception.BizException;
import com.levon.toolhub.module.tool.converter.CategoryConverter;
import com.levon.toolhub.module.tool.converter.SubcategoryConverter;
import com.levon.toolhub.module.tool.converter.ToolConverter;

import com.levon.toolhub.module.tool.dto.request.client.ToolPageRequest;
import com.levon.toolhub.module.tool.dto.response.client.*;
import com.levon.toolhub.module.tool.entity.Category;
import com.levon.toolhub.module.tool.entity.Subcategory;
import com.levon.toolhub.module.tool.entity.Tool;
import com.levon.toolhub.module.tool.mapper.CategoryMapper;
import com.levon.toolhub.module.tool.mapper.SubcategoryMapper;
import com.levon.toolhub.module.tool.mapper.ToolMapper;
import com.levon.toolhub.module.tool.service.CategoryService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
* @author leivik
* @description 针对表【levon_toolhub_tool_category(工具主分类表)】的数据库操作Service实现
* @createDate 2025-04-14 14:22:44
*/
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category>
    implements CategoryService{

    private static final Logger log = LoggerFactory.getLogger(CategoryServiceImpl.class);

    @Autowired
    private CategoryMapper categoryMapper;
    
    @Autowired
    private SubcategoryMapper subcategoryMapper;
    
    @Autowired
    private ToolMapper toolMapper;
    
    @Autowired
    private CategoryConverter categoryConverter;
    
    @Autowired
    private SubcategoryConverter subcategoryConverter;

    /**
     * 获取分类详情
     * @param categoryId 分类id
     * @return 分类详情DTO
     */
    @Override
    @Cacheable(value = "categoryCache", key = "'detail_' + #categoryId")
    public CategoryDetailResponse getCategoryDetail(Long categoryId) {
        log.debug("开始查询分类详情, categoryId: {}", categoryId);
        
        // 查询分类
        Category category = getById(categoryId);
        if (category == null || category.getIsDelete() == 1) {
            log.error("分类不存在, categoryId: {}", categoryId);
            throw new BizException("分类不存在");
        }
        
        // 转换为DTO
        CategoryDetailResponse detailDTO = categoryConverter.toDetailDTO(category);
        
        // 查询统计数据
        Long toolCount = toolMapper.selectCount(new LambdaQueryWrapper<Tool>().eq(Tool::getCategoryId, categoryId));

        // 如果工具数量为0，则不查询子分类和本月新增工具数量
        if (toolCount == 0) {
            log.debug("分类下无工具，跳过子分类和本月新增工具查询, categoryId: {}", categoryId);
            detailDTO.setToolCount(0);
            detailDTO.setSubcategoryCount(0);
            detailDTO.setNewToolsThisMonth(0);
            log.info("分类详情查询完成, categoryId: {}, 工具数: {}, 子分类数: {}, 本月新增: {}", 
                categoryId, toolCount, 0, 0);
            return detailDTO;
        }
        log.debug("分类工具数量: {}, categoryId: {}", toolCount, categoryId);
        
        // 查询子分类数量
        Long subcategoryCount = subcategoryMapper.selectCount(new LambdaQueryWrapper<Subcategory>().eq(Subcategory::getCategoryId, categoryId));
        if (subcategoryCount == 0) {
            log.debug("分类下无子分类，跳过本月新增工具查询, categoryId: {}", categoryId);
            detailDTO.setToolCount(toolCount.intValue());
            detailDTO.setSubcategoryCount(0);
            detailDTO.setNewToolsThisMonth(0);
            log.info("分类详情查询完成, categoryId: {}, 工具数: {}, 子分类数: {}, 本月新增: {}", 
                categoryId, toolCount, subcategoryCount, 0);
            return detailDTO;
        }
        log.debug("分类子分类数量: {}, categoryId: {}", subcategoryCount, categoryId);
        
        // 查询本月新增工具数量
        Long newToolsThisMonth = toolMapper.selectCount(new LambdaQueryWrapper<Tool>().eq(Tool::getCategoryId, categoryId).between(Tool::getCreateDate, LocalDateTime.now().withDayOfMonth(1), LocalDateTime.now()));
        if (newToolsThisMonth == 0) {
            log.debug("分类下无本月新增工具，跳过统计数据查询, categoryId: {}", categoryId);
            detailDTO.setToolCount(toolCount.intValue());
            detailDTO.setSubcategoryCount(subcategoryCount.intValue());
            detailDTO.setNewToolsThisMonth(0);
            return detailDTO;
        }
        log.debug("分类本月新增工具数量: {}, categoryId: {}", newToolsThisMonth, categoryId);
        
        // 设置统计数据
        detailDTO.setToolCount(toolCount.intValue());
        detailDTO.setSubcategoryCount(subcategoryCount.intValue());
        detailDTO.setNewToolsThisMonth(newToolsThisMonth.intValue());
        
        log.info("分类详情查询完成, categoryId: {}, 工具数: {}, 子分类数: {}, 本月新增: {}", 
                categoryId, toolCount, subcategoryCount, newToolsThisMonth);
        return detailDTO;
    }

    /**
     * 获取分类信息和子分类列表
     * @param categoryId 分类id
     * @return 分类信息和子分类列表Response
     */
    @Override
    @Cacheable(value = "categoryCache", key = "'subcategories_' + #categoryId")
    public CategorySubcategoriesResponse getCategorySubcategories(Long categoryId) {
        log.debug("开始查询分类子分类列表, categoryId: {}", categoryId);
        
        // 查询分类
        Category category = getById(categoryId);
        if (category == null || category.getIsDelete() == 1) {
            log.error("分类不存在, categoryId: {}", categoryId);
            throw new BizException("分类不存在");
        }
        
        // 创建返回Response
        CategorySubcategoriesResponse result = new CategorySubcategoriesResponse();
        
        // 设置分类信息
        CategoryDetailResponse categoryInfo = categoryConverter.toDetailDTO(category);
        result.setCategoryInfo(categoryInfo);
        
        // 查询子分类列表
        List<Subcategory> subcategories = subcategoryMapper.findByCategoryIdOrderBySortOrder(categoryId);
        if (subcategories.isEmpty()) {
            log.info("分类下无子分类, categoryId: {}", categoryId);
            result.setSubCategories(new ArrayList<>());
            return result;
        }
        
        // 转换为Response并设置工具数量
        List<SubcategoryResponse> subcategoryResponses = subcategoryConverter.toDTOList(subcategories);
        for (SubcategoryResponse response : subcategoryResponses) {
            Integer toolCount = subcategoryMapper.countToolsBySubcategoryId(response.getId());
            response.setToolCount(toolCount);
            log.debug("子分类工具数量: {}, subcategoryId: {}", toolCount, response.getId());
        }
        
        result.setSubCategories(subcategoryResponses);
        log.info("分类子分类列表查询完成, categoryId: {}, 子分类数量: {}", categoryId, subcategoryResponses.size());
        return result;
    }


}




