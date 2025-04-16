"use client"

import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getCategoryById, Category } from "@/lib/api"

// 动态导入组件
const CategoryHeader = dynamic(() => import('@/components/category/category-header').then(mod => ({ default: mod.CategoryHeader })), {
  loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded-xl"></div>
})

const CategorySidebar = dynamic(() => import('@/components/category/category-sidebar').then(mod => ({ default: mod.CategorySidebar })), {
  loading: () => <div className="w-64 h-screen bg-gray-100 animate-pulse rounded-xl"></div>
})

const ToolGrid = dynamic(() => import('@/components/category/tool-grid').then(mod => ({ default: mod.ToolGrid })), {
  loading: () => (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-72 bg-gray-200 animate-pulse rounded-xl"></div>
      ))}
    </div>
  )
})

export default function AIToolsPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [toolsPerPage] = useState(25)
  const [totalTools, setTotalTools] = useState(0)
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [priceFilter, setPriceFilter] = useState<number | null>(null)
  const [sortOption, setSortOption] = useState<number>(1) // 默认为1（最新）
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        // 使用api.ts中的getCategoryById函数替代自定义fetch请求
        const categoryData = await getCategoryById(1); // 1 是AI工具的分类ID
        setCategory(categoryData);
        setTotalTools(categoryData?.toolCount || 0);
      } catch (error) {
        console.error('获取分类数据失败:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCategoryData()
  }, [])
  
  // 从ToolGrid获取工具总数的回调函数
  const handleToolsCountUpdate = (count: number) => {
    setTotalTools(count)
  }
  
  // 处理价格筛选变化
  const handlePriceFilterChange = (value: number | null) => {
    console.log(`AITools页面接收到价格筛选变化: ${value}`);
    setPriceFilter(value);
  }

  // 处理排序方式变化
  const handleSortChange = (value: number) => {
    console.log(`AITools页面接收到排序方式变化: ${value}`);
    setSortOption(value);
  }

  // 格式化渐变色
  const formatGradient = () => {
    if (!category) return "from-purple-500 to-indigo-500" // 默认渐变
    
    // 这里假设API返回的是颜色名称，如"purple-500"，需要添加"from-"和"to-"前缀
    const fromColor = category.bgColorStart.includes("from-") 
      ? category.bgColorStart 
      : `from-${category.bgColorStart}`
      
    const toColor = category.bgColorEnd.includes("to-")
      ? category.bgColorEnd
      : `to-${category.bgColorEnd}`
      
    return `${fromColor} ${toColor}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-8 w-full max-w-6xl">
          <div className="h-64 bg-gray-200 animate-pulse rounded-xl"></div>
          <div className="flex gap-8">
            <div className="w-64 h-screen bg-gray-100 animate-pulse rounded-xl"></div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-72 bg-gray-200 animate-pulse rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<div className="h-64 bg-gray-200 animate-pulse rounded-xl"></div>}>
        {category && (
          <CategoryHeader
            title={category.name}
            description={category.description}
            totalTools={category.toolCount}
            newTools={category.newToolsThisMonth}
            backgroundImage={category.background || "/placeholder.svg?height=300&width=1200"}
            gradientClass={formatGradient()}
          />
        )}
      </Suspense>
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <Suspense fallback={<div className="w-64 bg-gray-100 animate-pulse rounded-xl"></div>}>
            <CategorySidebar 
              category={1} 
              onSubcategoryChange={setSelectedSubcategory}
              onPriceFilterChange={handlePriceFilterChange}
              onSortChange={handleSortChange}
              sortOption={sortOption}
            />
          </Suspense>
          
          <Suspense fallback={
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-72 bg-gray-200 animate-pulse rounded-xl"></div>
              ))}
            </div>
          }>
            <ToolGrid 
              category="ai-tools" 
              subcategory={selectedSubcategory}
              page={1}
              itemsPerPage={toolsPerPage}
              onCountUpdate={handleToolsCountUpdate}
              priceFilter={priceFilter}
              sortOption={sortOption}
            />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
