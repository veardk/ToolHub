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
  const [currentPage, setCurrentPage] = useState(1)
  const [toolsPerPage] = useState(12)
  const [totalTools, setTotalTools] = useState(0)
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true)
      try {
        const categoryData = await getCategoryById(1) // AI Tools的ID是1
        if (categoryData) {
          setCategory(categoryData)
          setTotalTools(categoryData.toolCount)
        }
      } catch (error) {
        console.error("Error fetching category data:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategoryData()
  }, [])
  
  // 计算总页数
  const totalPages = Math.ceil(totalTools / toolsPerPage)
  
  // 处理页面切换
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  // 从ToolGrid获取工具总数的回调函数
  const handleToolsCountUpdate = (count: number) => {
    setTotalTools(count)
  }
  
  // 渲染分页控件
  const renderPagination = () => {
    if (totalPages <= 1) return null
    
    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <Button 
          variant="outline" 
          size="icon"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          // 如果页数超过5页，显示当前页附近的页码
          let pageToShow = i + 1;
          if (totalPages > 5 && currentPage > 3) {
            pageToShow = Math.min(currentPage - 2 + i, totalPages);
          }
          return (
            <Button
              key={pageToShow}
              variant={currentPage === pageToShow ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(pageToShow)}
            >
              {pageToShow}
            </Button>
          );
        })}
        
        <Button 
          variant="outline" 
          size="icon"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
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
            backgroundImage="/placeholder.svg?height=300&width=1200"
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
              page={currentPage}
              itemsPerPage={toolsPerPage}
              onCountUpdate={handleToolsCountUpdate}
            />
          </Suspense>
        </div>
        {renderPagination()}
      </main>
    </div>
  )
}
