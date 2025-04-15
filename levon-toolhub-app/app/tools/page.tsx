"use client"

import { useState } from "react"
import { ToolGrid } from "@/components/category/tool-grid"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ToolsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [toolsPerPage] = useState(12)
  const [totalTools, setTotalTools] = useState(0)
  
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">所有工具</h1>
        <ToolGrid 
          category="ai-tools" 
          subcategory={null} 
          page={currentPage}
          itemsPerPage={toolsPerPage}
          onCountUpdate={handleToolsCountUpdate}
        />
        {renderPagination()}
      </main>
    </div>
  )
} 