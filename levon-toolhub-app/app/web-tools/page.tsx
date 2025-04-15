"use client"

import { useState, useEffect } from "react"
import { CategoryHeader } from "@/components/category/category-header"
import { CategorySidebar } from "@/components/category/category-sidebar"
import { ToolGrid } from "@/components/category/tool-grid"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getCategoryById, getCategorySubcategories, Category } from "@/lib/api"

export default function WebToolsPage() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [toolsPerPage] = useState(25)
  const [totalTools, setTotalTools] = useState(0)
  const [priceFilter, setPriceFilter] = useState<number | null>(null)
  const [sortOption, setSortOption] = useState<number>(1) // 默认为1（最新）
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  
  // 获取分类数据
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true)
      try {
        // Web工具的ID是2
        const result = await getCategorySubcategories(2)
        if (result && result.categoryInfo) {
          setCategory(result.categoryInfo)
          setTotalTools(result.categoryInfo.toolCount)
        }
      } catch (error) {
        console.error("Error fetching category data:", error)
      } finally {
        setLoading(false)
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
    console.log(`WebTools页面接收到价格筛选变化: ${value}`);
    setPriceFilter(value);
  }

  // 处理排序方式变化
  const handleSortChange = (value: number) => {
    console.log(`WebTools页面接收到排序方式变化: ${value}`);
    setSortOption(value);
  }

  // 格式化渐变色
  const formatGradient = () => {
    if (!category) return "from-blue-500 to-cyan-500" // 默认渐变
    
    // 添加前缀
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
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <CategorySidebar 
            category={2} 
            onSubcategoryChange={setSelectedSubcategory}
            onPriceFilterChange={handlePriceFilterChange}
            onSortChange={handleSortChange}
            sortOption={sortOption}
          />
          <ToolGrid 
            category="web-tools" 
            subcategory={selectedSubcategory} 
            page={1}
            itemsPerPage={toolsPerPage}
            onCountUpdate={handleToolsCountUpdate}
            priceFilter={priceFilter}
            sortOption={sortOption}
          />
        </div>
      </main>
    </div>
  )
}
