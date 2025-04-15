"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, ArrowUpDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

interface CategoryHeaderProps {
  title: string
  description: string
  totalTools: number
  newTools: number
  backgroundImage: string
  gradientClass?: string // 可选的自定义渐变类
}

export function CategoryHeader({ 
  title, 
  description, 
  totalTools, 
  newTools, 
  backgroundImage,
  gradientClass = "from-blue-600/80 to-purple-600/80" // 默认渐变
}: CategoryHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="relative">
      {/* 背景图片与渐变叠加 - 使用Next.js Image组件 */}
      <div className={`absolute inset-0 z-0 bg-gradient-to-r ${gradientClass}`}>
        <div className="absolute inset-0 mix-blend-overlay opacity-40">
          {/* 降低背景图片的优先级，使页面内容可以更快地显示 */}
          <Image 
            src={backgroundImage} 
            alt="" 
            fill 
            priority={false}
            quality={60}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>

      {/* 内容 */}
      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-xl text-white/90 mb-6">{description}</p>
          <div className="flex flex-wrap items-center justify-center text-white/80 space-x-6 mb-8">
            <div>
              <span className="font-bold text-white">{totalTools}</span> tools available
            </div>
            <div>
              <span className="font-bold text-white">{newTools}</span> new this month
            </div>
          </div>

          {/* 只保留搜索框，移除筛选和排序按钮 */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder={`Search ${title.toLowerCase()}...`}
                className="pl-10 h-12 bg-white/95 dark:bg-gray-800/95 text-gray-900 dark:text-gray-100 rounded-full shadow-lg w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
