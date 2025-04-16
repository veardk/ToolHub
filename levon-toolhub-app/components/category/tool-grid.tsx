"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Star, 
  Grid, 
  List, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  BarChart, 
  X,
  ArrowUpRight,
  PlusCircle,
  Check,
  MoreHorizontal,
  PackageOpen,
  Eye,
  Heart,
  ChevronDown,
  Filter,
  GitBranch,
  Plus
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { ToolBrief, getCategoryTools, fetchCategoryTools } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// 导入子分类映射
import { subcategories, subcategoryIdMap } from "@/lib/mock-data"
// 从mock-data导入SubcategoryMock类型
import type { SubcategoryMock } from "@/lib/mock-data"

// 接口定义
interface ToolGridProps {
  category: string;
  subcategory?: string | null;
  page?: number;
  itemsPerPage?: number;
  onCountUpdate?: (count: number) => void;
  priceFilter?: number | null;
  sortOption?: number; // 添加排序参数
}

export function ToolGrid({ 
  category, 
  subcategory,
  page = 1,
  itemsPerPage = 30,  // 默认每页显示30个工具
  onCountUpdate,
  priceFilter: externalPriceFilter,
  sortOption: externalSortOption = 1 // 默认最新
}: ToolGridProps) {
  // 添加toast的hook
  const { toast } = useToast()
  
  // 状态管理
  const [tools, setTools] = useState<ToolBrief[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [savedTools, setSavedTools] = useState<number[]>([])
  const [compareList, setCompareList] = useState<number[]>([])
  const [compareMode, setCompareMode] = useState(false)
  const [compareDialogOpen, setCompareDialogOpen] = useState(false)
  const [sortOption, setSortOption] = useState<number>(externalSortOption) // 使用外部传入的排序选项
  const [priceFilter, setPriceFilter] = useState<number | null>(externalPriceFilter || null) // 1=免费，2=付费，3=部分免费
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [totalTools, setTotalTools] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false) // 新增状态，用于跟踪是否正在加载更多
  const [scrollLoadingEnabled, setScrollLoadingEnabled] = useState(false) // 新增状态，控制是否启用滚动加载
  const [previousTools, setPreviousTools] = useState<ToolBrief[]>([]) // 存储之前的工具列表，用于平滑过渡
  const [isFiltering, setIsFiltering] = useState(false) // 标记是否正在进行筛选操作
  const [viewTransitioning, setViewTransitioning] = useState(false) // 添加视图过渡状态

  // 引用最后一个元素，用于检测滚动
  const observerTarget = useRef(null);

  // 监听外部价格筛选变化
  useEffect(() => {
    if (externalPriceFilter !== undefined) {
      // 如果外部价格筛选与当前不同，则更新状态并重置分页
      if (priceFilter !== externalPriceFilter) {
        setPriceFilter(externalPriceFilter);
        setCursor(null); // 重置分页
      }
    }
  }, [externalPriceFilter, category]);

  // 监听外部排序选项变化
  useEffect(() => {
    if (externalSortOption !== undefined) {
      // 如果外部排序选项与当前不同，则更新状态并重置分页
      if (sortOption !== externalSortOption) {
        setSortOption(externalSortOption);
        setCursor(null); // 重置分页
      }
    }
  }, [externalSortOption, category]);

  // 获取工具数据
  useEffect(() => {
    const fetchTools = async () => {
      // 如果是加载更多，不要设置loading为true，否则会闪烁
      if (!loadingMore) {
        setLoading(true)
        setIsFiltering(true) // 标记开始筛选
        // 保存当前的工具列表，用于过渡动画
        if (tools.length > 0) {
          setPreviousTools(tools)
        }
      }
      setError(null)
      
      try {
        // 获取分类ID
        let categoryId: number;
        if (typeof category === 'number') {
          categoryId = category;
        } else {
          // 根据code查找id
          switch (category) {
            case 'ai-tools': categoryId = 1; break;
            case 'web-tools': categoryId = 2; break;
            case 'app-tools': categoryId = 3; break;
            case 'developer-tools': categoryId = 4; break;
            default: 
              try {
                categoryId = parseInt(category);
                if (isNaN(categoryId)) categoryId = 1;
              } catch {
                categoryId = 1;
              }
          }
        }

        // 构建API请求URL和参数
        const params = new URLSearchParams();
        
        // 设置分页大小
        params.append('size', '30');
        
        // 设置排序方式
        params.append('sort', sortOption.toString());
        
        // 添加分页游标，如果非第一页且有游标
        if (cursor) {
          params.append('cursor', cursor);
        }
        
        // 添加价格筛选条件
        if (priceFilter !== null) {
          params.append('priceType', priceFilter.toString());
        }
        
        // 如果选择了子分类，添加到请求参数
      if (subcategory) {
          // 首先尝试直接转换为数字（子分类ID）
          if (/^\d+$/.test(subcategory)) {
            // 如果是纯数字，直接作为ID处理
            params.append('subCategoryId', subcategory);
          } else {
            // 如果是code，尝试从映射表查找真实ID
            if (subcategoryIdMap[subcategory]) {
              // 映射表中找到了对应的ID
              const realSubCategoryId = subcategoryIdMap[subcategory];
              params.append('subCategoryId', realSubCategoryId.toString());
            } else {
              // 映射表中未找到，尝试在subcategories中查找
              const categoryKey = categoryId.toString();
              if (subcategories[categoryKey]) {
                const subCat = subcategories[categoryKey].find((sc: SubcategoryMock) => sc.id === subcategory);
                if (subCat) {
                  // 尝试从ID中提取数字
                  // 注意：如果没有映射表项，这是后备方案
                  const backupId = subcategory.replace(/[^0-9]/g, '') || '1';
                  params.append('subCategoryId', backupId);
                } else {
                }
              }
            }
          }
        }
        
        // 调用实际API
        const result = await fetchCategoryTools(categoryId, params);
        
        // 处理返回结果
        if (result && result.code === 200 && result.data) {
          const toolsList = result.data.list || [];
          
          if (page === 1 || !cursor) {
            // 第一页，替换所有工具
            setTools(toolsList);
      } else {
            // 后续页面，追加工具
            setTools(prev => [...prev, ...toolsList]);
          }
          
          // 更新状态
          setHasMore(result.data.hasMore || false);
          setCursor(result.data.nextCursor || null);
          setTotalTools(result.data.total || 0);
          
          // 通知父组件更新总数
      if (onCountUpdate) {
            onCountUpdate(result.data.total || 0);
          }
        } else {
          // 如果数据结构不正确或请求成功但返回错误码，显示错误提示
          
          // 显示错误提示框
          toast.error({
            title: "数据加载失败",
            description: result?.msg || "无法获取工具列表，请稍后再试"
          });
          
          setTools([]);
          setHasMore(false);
          setCursor(null);
          setTotalTools(0);
          
          if (onCountUpdate) {
            onCountUpdate(0);
          }
        }
      } catch (err) {
        
        // 显示错误提示框
        toast.error({
          title: "请求失败",
          description: "网络连接错误，请检查您的网络并重试"
        });
        
        setError('获取工具列表失败，请稍后再试');
        // 确保错误情况下也设置数据为空
        setTools([]);
        setHasMore(false);
        setCursor(null);
        setTotalTools(0);
        
        if (onCountUpdate) {
          onCountUpdate(0);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false); // 重置加载更多状态
        // 延迟重置筛选状态，让动画有时间完成
    setTimeout(() => {
          setIsFiltering(false)
          setPreviousTools([])
        }, 300)
      }
    };
    
    fetchTools();
  }, [category, subcategory, page, itemsPerPage, sortOption, priceFilter, onCountUpdate, toast]);
  
  // 加载更多工具 - 定义在useEffect之前
  const loadMore = useCallback(() => {
    if (hasMore && cursor && !loadingMore && !loading) {
      setLoadingMore(true);
      
      // 获取分类ID
      let categoryId: number;
      if (typeof category === 'number') {
        categoryId = category;
      } else {
        // 根据code查找id
        switch (category) {
          case 'ai-tools': categoryId = 1; break;
          case 'web-tools': categoryId = 2; break;
          case 'app-tools': categoryId = 3; break;
          case 'developer-tools': categoryId = 4; break;
          default: 
            try {
              categoryId = parseInt(category);
              if (isNaN(categoryId)) categoryId = 1;
            } catch {
              categoryId = 1;
            }
        }
      }

      // 构建API请求URL和参数
      const params = new URLSearchParams();
      
      // 设置分页大小
      params.append('size', '30');
      
      // 设置排序方式
      params.append('sort', sortOption.toString());
      
      // 添加分页游标
      params.append('cursor', cursor);
      
      // 添加价格筛选条件
      if (priceFilter !== null) {
        params.append('priceType', priceFilter.toString());
      }
      
      // 如果选择了子分类，添加到请求参数
      if (subcategory) {
        // 首先尝试直接转换为数字（子分类ID）
        if (/^\d+$/.test(subcategory)) {
          // 如果是纯数字，直接作为ID处理
          params.append('subCategoryId', subcategory);
        } else {
          // 如果是code，尝试从映射表查找真实ID
          if (subcategoryIdMap[subcategory]) {
            // 映射表中找到了对应的ID
            const realSubCategoryId = subcategoryIdMap[subcategory];
            params.append('subCategoryId', realSubCategoryId.toString());
          }
        }
      }
      
      // 调用实际API
      fetchCategoryTools(categoryId, params)
        .then(result => {
          if (result && result.code === 200 && result.data) {
            const toolsList = result.data.list || [];
            
            // 追加工具
            setTools(prev => [...prev, ...toolsList]);
            
            // 更新状态
            setHasMore(result.data.hasMore || false);
            setCursor(result.data.nextCursor || null);
    } else {
            // 如果数据结构不正确或请求成功但返回错误码
            
            // 显示错误提示框
            toast({
              title: "加载更多失败",
              description: result?.msg || "无法获取更多工具，请稍后再试"
            });
          }
        })
        .catch(err => {
          
          // 显示错误提示框
          toast({
            title: "请求失败",
            description: "网络连接错误，请检查您的网络并重试"
          });
        })
        .finally(() => {
          setLoadingMore(false);
        });
    }
  }, [hasMore, cursor, loadingMore, loading, category, itemsPerPage, sortOption, priceFilter, subcategory, toast]);

  // 监听滚动加载更多 - 移到loadMore函数之后
  useEffect(() => {
    // 如果没有更多数据或正在加载中，或滚动加载未启用，不设置观察者
    if (!hasMore || loadingMore || loading || !scrollLoadingEnabled) return;
    
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    
    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, loading, loadMore, scrollLoadingEnabled]);

  // 启用滚动加载
  const enableScrollLoading = () => {
    setScrollLoadingEnabled(true);
    loadMore(); // 立即加载更多
  };

  // 切换工具收藏状态
  const toggleSave = (id: number) => {
    setSavedTools(prev => 
      prev.includes(id) ? prev.filter(toolId => toolId !== id) : [...prev, id]
    );
  };

  // 切换对比列表
  const toggleCompare = (id: number) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(toolId => toolId !== id);
    } else {
        // 限制最多对比3个工具
        if (prev.length >= 3) {
          return prev;
      }
        return [...prev, id];
    }
    });
  };

  // 清空对比列表
  const clearCompare = () => {
    setCompareList([]);
  };

  // 开始对比模式
  const startCompareMode = () => {
    setCompareMode(true);
  };

  // 结束对比模式
  const endCompareMode = () => {
    setCompareMode(false);
  };

  // 打开对比对话框
  const openCompareDialog = () => {
    if (compareList.length > 0) {
      setCompareDialogOpen(true);
    }
  };

  // 关闭对话框并重置
  const closeCompareAndReset = () => {
    setCompareDialogOpen(false);
    setCompareMode(false);
    // 可选：清空对比列表
    // clearCompare();
  };

  // 渲染工具卡片（网格视图）
  const renderToolCard = (tool: ToolBrief, index: number) => {
    const isSaved = savedTools.includes(tool.id);
    const isComparing = compareList.includes(tool.id);

    return (
      <motion.div
        key={`tool-card-${tool.id}-${index}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.15 } }}
        transition={{ duration: 0.3, delay: index * 0.03 }}
        className="group"
      >
        <div className="relative h-full">
          {/* 左上角收藏按钮 */}
          <div className="absolute top-1.5 left-1.5 z-10">
            {compareMode ? (
              <button
                onClick={(e) => toggleCompare(tool.id)}
                className={`flex items-center justify-center rounded-md h-7 w-7 transition-colors ${
                  isComparing ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {isComparing ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span className="text-xs font-medium">+</span>
                )}
              </button>
            ) : (
              <button
                onClick={(e) => toggleSave(tool.id)}
                className="flex items-center justify-center h-7 w-7 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    {isSaved ? (
                  <BookmarkCheck className="h-4 w-4 fill-primary text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
          
          {/* 右上角跳转图标 */}
          <div className="absolute top-1.5 right-1.5 z-10">
            <button 
              onClick={() => window.open(tool.websiteUrl, '_blank', 'noopener,noreferrer')}
              className="text-gray-400 hover:text-primary transition-colors bg-gray-50 dark:bg-gray-800 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* 卡片主体 - 点击跳转到详情 */}
          <Link href={`/tools/${tool.id}`} className="block h-full">
            <Card className="h-full overflow-hidden border hover:border-primary/50 hover:shadow-md transition-all flex flex-col relative cursor-pointer">
              <CardContent className="p-0 flex-grow flex flex-col justify-center pt-4">
                {/* 工具图标居中显示 */}
                <div className="relative flex items-center justify-center p-4 flex-grow">
                <Image
                    src={tool.logo || "/placeholder.svg?height=64&width=64"}
                  alt={tool.name}
                    width={72}
                    height={72}
                    priority
                    className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
            </div>
            
                {/* 工具名称和描述 */}
                <div className="px-3 pb-4 space-y-2 text-center flex-grow flex flex-col items-center justify-center">
                  <h3 className="font-medium text-base truncate">{tool.name}</h3>
                  
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 cursor-default h-[40px] leading-5 overflow-hidden mt-2">
                          {tool.shortDescription}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs p-3 text-sm bg-white dark:bg-gray-800 shadow-lg border rounded-lg">
                        <p>{tool.shortDescription}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  {/* 标签展示 - 使用圆角按钮样式，固定位置 */}
                  <div className="flex justify-center flex-wrap gap-1.5 h-[32px]">
                    {tool.priceType === 1 && (
                      <div className="text-xs py-1 px-2.5 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 flex items-center">
                        <span className="font-semibold">免费</span>
                      </div>
                    )}
                    {tool.priceType === 2 && (
                      <div className="text-xs py-1 px-2.5 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 flex items-center">
                        <span className="font-semibold">付费</span>
                      </div>
                    )}
                    {tool.priceType === 3 && (
                      <div className="text-xs py-1 px-2.5 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 flex items-center">
                        <span className="font-semibold">部分免费</span>
                      </div>
                    )}
                    {tool.isNew === 1 && (
                      <div className="text-xs py-1 px-2.5 bg-green-500 rounded-full text-white flex items-center">
                        <span className="font-semibold">New</span>
            </div>
                    )}
            </div>
          </div>
              </CardContent>
        </Card>
          </Link>
        </div>
      </motion.div>
    );
  };

  // 渲染工具列表项（列表视图）
  const renderToolList = (tool: ToolBrief, index: number) => {
    const isSaved = savedTools.includes(tool.id);
    const isComparing = compareList.includes(tool.id);

    return (
      <motion.div
        key={`tool-list-${tool.id}-${index}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.15 } }}
        transition={{ duration: 0.3, delay: index * 0.02 }}
      >
        <div className="flex items-center border rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all mb-3 group">
          {/* 工具图标 */}
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md mr-4">
            <Image
              src={tool.logo || "/placeholder.svg?height=56&width=56"}
              alt={tool.name}
                fill
              className="object-contain"
            />
          </div>
          
          {/* 工具信息区域 */}
          <div className="flex-1 min-w-0 flex flex-col justify-center mr-4">
            <div className="flex items-center flex-wrap gap-2">
              <h3 className="font-medium text-base">{tool.name}</h3>
              
              {/* 标签直接跟在名称后面 */}
              <div className="flex flex-wrap gap-1.5">
                {tool.priceType === 1 && (
                  <div className="text-xs py-1 px-2.5 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 flex items-center">
                    <span className="font-semibold">免费</span>
                  </div>
                )}
                {tool.priceType === 2 && (
                  <div className="text-xs py-1 px-2.5 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 flex items-center">
                    <span className="font-semibold">付费</span>
                  </div>
                )}
                {tool.priceType === 3 && (
                  <div className="text-xs py-1 px-2.5 border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 flex items-center">
                    <span className="font-semibold">部分免费</span>
                  </div>
                )}
                {tool.isNew === 1 && (
                  <div className="text-xs py-1 px-2.5 bg-green-500 rounded-full text-white flex items-center">
                    <span className="font-semibold">New</span>
                  </div>
                )}
            </div>
          </div>
          
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
              {tool.shortDescription}
            </p>
          </div>
          
          {/* 右侧操作区：收藏按钮和操作按钮水平排列 */}
          <div className="flex-shrink-0 flex items-center gap-2">
            {/* 收藏按钮 */}
            {compareMode ? (
              <button
                onClick={() => toggleCompare(tool.id)}
                className={`flex items-center justify-center rounded-md h-9 w-9 transition-colors ${
                  isComparing ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {isComparing ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-xs font-medium">+</span>
                )}
              </button>
            ) : (
              <button
                onClick={() => toggleSave(tool.id)}
                className="text-gray-400 hover:text-primary transition-colors flex items-center justify-center h-9 w-9"
            >
              {isSaved ? (
                  <BookmarkCheck className="h-6 w-6 fill-primary text-primary" />
              ) : (
                  <Bookmark className="h-6 w-6" />
              )}
              </button>
            )}
            
            {/* 操作按钮 */}
            <div className="flex items-center">
            <Button 
                variant="default" 
                size="default"
                className="h-9 rounded-r-none"
              asChild
            >
              <Link href={`/tools/${tool.id}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  详情
              </Link>
            </Button>
            <Button 
                variant="outline" 
                size="default"
                className="h-9 rounded-l-none px-4"
                onClick={() => window.open(tool.websiteUrl, '_blank', 'noopener,noreferrer')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                访问官网
            </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // 渲染空状态
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="h-20 w-20 mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <BarChart className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">没有找到相关工具</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        {error || "尝试调整筛选条件或搜索其他关键词"}
      </p>
    </div>
  );

  // 加载状态
  if (loading && tools.length === 0 && previousTools.length === 0) {
  return (
      <div className="w-full flex-1">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"></div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"></div>
          </div>
        </div>
        
        <div className={`grid ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'} gap-4`}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i}
              className={`${view === 'grid' ? 'h-44' : 'h-24'} bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg`}
            >
              <div className="h-full w-full flex flex-col">
                <div className="flex justify-center items-center py-4">
                  <div className="h-12 w-12 rounded-md bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                </div>
                <div className="px-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4 mx-auto mb-2 animate-pulse"></div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-md w-5/6 mx-auto mb-1 animate-pulse"></div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-md w-4/6 mx-auto animate-pulse"></div>
                  </div>
                  <div className="mt-2 flex justify-center gap-1">
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full w-12 animate-pulse"></div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full w-12 animate-pulse"></div>
                  </div>
                </div>
                <div className="p-2 mt-auto">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-md w-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 relative">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
        <div className="flex items-center">
          {compareMode ? (
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
              <span className="text-sm font-medium">已选: {compareList.length}/3</span>
              <Button 
                size="sm" 
                variant="ghost"
                className="h-7 px-2"
                onClick={endCompareMode}
              >
                <X className="h-4 w-4 mr-1" />
                取消
              </Button>
              <Button 
                size="sm"
                className="h-7 px-3"
                disabled={compareList.length < 2}
                onClick={openCompareDialog}
              >
                对比
              </Button>
            </div>
          ) : (
            <div className="flex items-center">
              <h2 className="text-xl font-semibold mr-2">{totalTools} 个工具</h2>
              {isFiltering && <div className="ml-2 animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></div>}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* 排序选项 */}
          <Select 
            key={`sort-select-${externalSortOption || 1}`}
            defaultValue={sortOption.toString()}
            onValueChange={value => {
              const numValue = parseInt(value);
              setSortOption(numValue);
              // 重置分页
              setCursor(null);
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">最新发布</SelectItem>
              <SelectItem value="2">最热门</SelectItem>
            </SelectContent>
          </Select>
          
          {/* 视图切换 */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-md p-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
          <Button
                    variant={view === 'grid' ? "default" : "ghost"} 
            size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      if (viewTransitioning || view === 'grid') return;
                      setViewTransitioning(true);
                      // 设置短暂的延迟，确保动画完成
                      setTimeout(() => {
                        setView('grid');
                        setViewTransitioning(false);
                      }, 300);
                    }}
          >
            <Grid className="h-4 w-4" />
          </Button>
                </TooltipTrigger>
                <TooltipContent>网格视图</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
          <Button
                    variant={view === 'list' ? "default" : "ghost"} 
            size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      if (viewTransitioning || view === 'list') return;
                      setViewTransitioning(true);
                      // 设置短暂的延迟，确保动画完成
                      setTimeout(() => {
                        setView('list');
                        setViewTransitioning(false);
                      }, 300);
                    }}
          >
            <List className="h-4 w-4" />
          </Button>
                </TooltipTrigger>
                <TooltipContent>列表视图</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {loading && tools.length === 0 && previousTools.length > 0 ? (
        <div className="w-full flex-1">
          <div className={view === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3' 
            : 'space-y-3'}
          >
            <AnimatePresence>
              {view === 'grid' 
                ? previousTools.map((tool, index) => (
                    <motion.div
                      key={`prev-tool-card-${tool.id}-${index}`}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0.5 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 z-10 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                      </div>
                      {renderToolCard(tool, index)}
                    </motion.div>
                  ))
                : previousTools.map((tool, index) => (
                    <motion.div
                      key={`prev-tool-list-${tool.id}-${index}`}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0.5 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 z-10 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                      </div>
                      {renderToolList(tool, index)}
                    </motion.div>
                  ))
              }
            </AnimatePresence>
          </div>
        </div>
      ) : tools && tools.length > 0 ? (
        <>
          <AnimatePresence mode="wait">
            <motion.div 
              key={`view-container-${view}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {view === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {tools.map((tool, index) => renderToolCard(tool, index))}
          </div>
        ) : (
                <div className="space-y-3 w-full">
                  {tools.map((tool, index) => renderToolList(tool, index))}
      </div>
          )}
            </motion.div>
          </AnimatePresence>
          
          {/* 加载更多按钮或无限滚动观察元素 */}
          {hasMore ? (
            scrollLoadingEnabled ? (
              <div 
                ref={observerTarget} 
                className="w-full h-20 flex items-center justify-center mt-8"
              >
                {loadingMore && (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
                    <span className="text-sm text-gray-500">加载更多...</span>
        </div>
      )}
              </div>
            ) : (
              <div className="w-full flex justify-center mt-8">
                  <Button 
                    variant="outline" 
                  className="flex items-center gap-2"
                  onClick={enableScrollLoading}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></div>
                      <span>加载中...</span>
                    </>
                  ) : (
                    <>
                      <MoreHorizontal className="h-4 w-4" />
                      <span>加载更多</span>
                    </>
                  )}
              </Button>
                </div>
            )
          ) : (
            <div className="w-full flex flex-col items-center justify-center mt-8 py-4 text-center text-gray-500">
              <PackageOpen className="h-8 w-8 mb-2 text-gray-400" />
              <p>已经到底啦，没有更多工具了~</p>
                    </div>
              )}
        </>
      ) : (
        renderEmptyState()
      )}
      
      {/* 对比对话框 */}
      <Dialog open={compareDialogOpen} onOpenChange={setCompareDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>工具对比</DialogTitle>
                  </DialogHeader>
          <ScrollArea className="max-h-[calc(80vh-80px)]">
            <div className="p-2">
              {/* 对比内容 */}
              <div className="grid grid-cols-[150px_repeat(auto-fill,minmax(200px,1fr))] gap-4">
                  {/* 表头 */}
                <div className="border-b pb-2">
                  <span className="font-medium">特性</span>
            </div>
            
                {compareList.map((id, index) => {
                  const tool = tools.find(t => t.id === id);
                    return tool ? (
                    <div key={`compare-header-${id}-${index}`} className="border-b pb-2 text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-md mr-2">
                    <Image
                            src={tool.logo || "/placeholder.svg?height=32&width=32"}
                      alt={tool.name}
                            fill
                            className="object-cover"
                    />
                                </div>
                        <span className="font-medium">{tool.name}</span>
                    </div>
                    </div>
                  ) : null;
                })}
                
                {/* 价格类型 */}
                <div className="border-b py-2 font-medium">价格</div>
                {compareList.map((id, index) => {
                  const tool = tools.find(t => t.id === id);
                    return tool ? (
                    <div key={`compare-price-${id}-${index}`} className="border-b py-2 text-center">
                      {tool.priceType === 1 ? '免费' : 
                       tool.priceType === 2 ? '付费' : '部分免费'}
                              </div>
                  ) : null;
                })}
                
                {/* 描述 */}
                <div className="border-b py-2 font-medium">描述</div>
                {compareList.map((id, index) => {
                  const tool = tools.find(t => t.id === id);
                    return tool ? (
                    <div key={`compare-desc-${id}-${index}`} className="border-b py-2 text-sm">
                      {tool.shortDescription}
                            </div>
                  ) : null;
                })}
                
                {/* 官网链接 */}
                <div className="border-b py-2 font-medium">官网</div>
                {compareList.map((id, index) => {
                  const tool = tools.find(t => t.id === id);
                    return tool ? (
                    <div key={`compare-url-${id}-${index}`} className="border-b py-2 text-center">
                      <a 
                        href={tool.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center"
                      >
                        访问
                        <ArrowUpRight className="h-3 w-3 ml-1" />
                      </a>
                        </div>
                  ) : null;
                  })}
                        </div>
                    </div>
                  </ScrollArea>
          <div className="flex justify-between pt-2 border-t">
            <Button 
              variant="outline" 
              size="sm"
              onClick={closeCompareAndReset}
            >
              关闭
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearCompare}
            >
              <X className="h-4 w-4 mr-1" />
              清空列表
            </Button>
          </div>
                </DialogContent>
              </Dialog>

      {/* 添加固定在右下角的对比工具按钮 */}
      {!compareMode && tools.length > 1 && (
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            variant="default"
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-[#111827] hover:bg-[#1f2937]"
            onClick={startCompareMode}
          >
            <BarChart className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
}
