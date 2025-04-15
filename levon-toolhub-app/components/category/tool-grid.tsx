"use client"

import { useState, useEffect, useMemo } from "react"
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
  PlusCircle
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
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

// 样本数据，实际应用中应该从API获取
const toolsData = {
  "ai-tools": [
    {
      id: "midjourney",
      name: "Midjourney",
      description: "AI image generation with stunning quality and creative control",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      users: 125000,
      tags: ["Image Generation", "Creative", "Art"],
      isFree: false,
      isNew: false,
      isPremium: true,
    },
    {
      id: "chatgpt",
      name: "ChatGPT",
      description: "Conversational AI assistant for text generation and problem solving",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      users: 500000,
      tags: ["Text Generation", "Assistant", "Writing"],
      isFree: true,
      isNew: false,
      isPremium: false,
    },
    {
      id: "stable-diffusion",
      name: "Stable Diffusion",
      description: "Open source AI image generation model",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.6,
      users: 95000,
      tags: ["Image Generation", "Open Source", "Art"],
      isFree: true,
      isNew: false,
      isPremium: false,
    },
    {
      id: "dall-e",
      name: "DALL-E",
      description: "Create realistic images and art from a description in natural language",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      users: 180000,
      tags: ["Image Generation", "Creative", "OpenAI"],
      isFree: false,
      isNew: false,
      isPremium: true,
    },
    {
      id: "jasper",
      name: "Jasper",
      description: "AI content platform that helps teams create original content",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.5,
      users: 85000,
      tags: ["Writing", "Marketing", "Content"],
      isFree: false,
      isNew: false,
      isPremium: true,
    },
    {
      id: "copy-ai",
      name: "Copy.ai",
      description: "AI-powered copywriter that generates high-quality copy for businesses",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.4,
      users: 70000,
      tags: ["Writing", "Marketing", "Copywriting"],
      isFree: true,
      isNew: false,
      isPremium: false,
    },
    {
      id: "elevenlabs",
      name: "ElevenLabs",
      description: "AI voice generator with the most realistic voices",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      users: 65000,
      tags: ["Voice", "Audio", "Text-to-Speech"],
      isFree: true,
      isNew: true,
      isPremium: false,
    },
    {
      id: "murf-ai",
      name: "Murf AI",
      description: "AI voice generator that creates studio-quality voiceovers",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.6,
      users: 55000,
      tags: ["Voice", "Audio", "Text-to-Speech"],
      isFree: true,
      isNew: false,
      isPremium: false,
    },
    {
      id: "descript",
      name: "Descript",
      description: "All-in-one audio & video editing, as easy as a doc",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      users: 75000,
      tags: ["Audio", "Video", "Editing"],
      isFree: true,
      isNew: false,
      isPremium: false,
    },
    {
      id: "synthesia",
      name: "Synthesia",
      description: "Create AI videos by simply typing in text",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.5,
      users: 60000,
      tags: ["Video", "Avatar", "Marketing"],
      isFree: false,
      isNew: false,
      isPremium: true,
    },
    {
      id: "runway",
      name: "Runway",
      description: "AI magic tools for creators, including text-to-video generation",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      users: 50000,
      tags: ["Video", "Creative", "Editing"],
      isFree: true,
      isNew: true,
      isPremium: false,
    },
    {
      id: "github-copilot",
      name: "GitHub Copilot",
      description: "AI pair programmer that helps you write better code",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      users: 120000,
      tags: ["Code", "Development", "Programming"],
      isFree: false,
      isNew: false,
      isPremium: true,
    },
    {
      id: "perplexity-ai",
      name: "Perplexity AI",
      description: "AI-powered search engine that provides accurate answers with sources",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.6,
      users: 45000,
      tags: ["Search", "Research", "Information"],
      isFree: true,
      isNew: true,
      isPremium: false,
    },
    {
      id: "notion-ai",
      name: "Notion AI",
      description: "AI writing assistant integrated into Notion",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      users: 90000,
      tags: ["Writing", "Productivity", "Notes"],
      isFree: false,
      isNew: false,
      isPremium: true,
    },
    {
      id: "claude",
      name: "Claude",
      description: "AI assistant by Anthropic designed to be helpful, harmless, and honest",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      users: 70000,
      tags: ["Assistant", "Text Generation", "Research"],
      isFree: true,
      isNew: true,
      isPremium: false,
    },
  ],
  "web-tools": [
    // 这里添加网页工具数据
    {
      id: "notion",
      name: "Notion",
      description: "All-in-one workspace for notes, tasks, wikis, and databases",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      users: 230000,
      tags: ["Productivity", "Notes", "Collaboration"],
      isFree: true,
      isNew: false,
      isPremium: true,
    },
    {
      id: "figma",
      name: "Figma",
      description: "Collaborative interface design tool for teams",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      users: 180000,
      tags: ["Design", "Collaboration", "UI/UX"],
      isFree: true,
      isNew: false,
      isPremium: true,
    },
    {
      id: "canva",
      name: "Canva",
      description: "Easy-to-use graphic design platform with templates",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      users: 280000,
      tags: ["Design", "Graphics", "Templates"],
      isFree: true,
      isNew: false,
      isPremium: true,
    },
    // 添加更多网页工具...
  ],
  "app-tools": [
    // 这里添加应用工具数据
    {
      id: "obsidian",
      name: "Obsidian",
      description: "Knowledge base that works on local Markdown files",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      users: 120000,
      tags: ["Notes", "Knowledge Management", "Markdown"],
      isFree: true,
      isNew: false,
      isPremium: true,
    },
    {
      id: "todoist",
      name: "Todoist",
      description: "Task manager and to-do list app",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      users: 150000,
      tags: ["Productivity", "Task Management", "Organization"],
      isFree: true,
      isNew: false,
      isPremium: true,
    },
    {
      id: "evernote",
      name: "Evernote",
      description: "Note-taking app for organizing, task management and archiving",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.5,
      users: 200000,
      tags: ["Notes", "Productivity", "Organization"],
      isFree: true,
      isNew: false,
      isPremium: true,
    },
    // 添加更多应用工具...
  ],
  "developer-tools": [
    // 这里添加开发者工具数据
    {
      id: "vscode",
      name: "Visual Studio Code",
      description: "Powerful code editor with extensive plugin ecosystem",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.9,
      users: 350000,
      tags: ["Development", "Code Editor", "Open Source"],
      isFree: true,
      isNew: false,
      isPremium: false,
    },
    {
      id: "github",
      name: "GitHub",
      description: "Web-based platform for version control and collaboration",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.8,
      users: 400000,
      tags: ["Version Control", "Collaboration", "Code Hosting"],
      isFree: true,
      isNew: false,
      isPremium: true,
    },
    {
      id: "postman",
      name: "Postman",
      description: "API platform for building and using APIs",
      icon: "/placeholder.svg?height=60&width=60",
      rating: 4.7,
      users: 180000,
      tags: ["API", "Testing", "Development"],
      isFree: true,
      isNew: false,
      isPremium: true,
    },
    // 添加更多开发者工具...
  ],
}

interface ToolGridProps {
  category: "ai-tools" | "web-tools" | "app-tools" | "developer-tools";
  subcategory?: string | null;
  page?: number;
  itemsPerPage?: number;
  onCountUpdate?: (count: number) => void;
}

export function ToolGrid({ 
  category, 
  subcategory,
  page = 1,
  itemsPerPage = 12,
  onCountUpdate
}: ToolGridProps) {
  const [visibleTools, setVisibleTools] = useState<typeof toolsData[keyof typeof toolsData]>([])
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [savedTools, setSavedTools] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [compareTools, setCompareTools] = useState<string[]>([])
  const [compareMode, setCompareMode] = useState(false)
  const [showCompareDialog, setShowCompareDialog] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentToolPage, setCurrentToolPage] = useState(1)

  // 加载并筛选工具
  useEffect(() => {
    if (toolsData[category]) {
      let filteredTools = toolsData[category];
      
      // 如果有选中的子分类，进行筛选
      if (subcategory) {
        // 这里假设工具数据中有一个tags数组包含子分类信息
        // 实际应用中可能需要根据实际数据结构调整筛选逻辑
        filteredTools = toolsData[category].filter(tool => 
          tool.tags.some(tag => tag.toLowerCase().includes(subcategory))
        );
      }
      
      // 如果提供了分页参数，则按页显示工具
      if (page && itemsPerPage) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setVisibleTools(filteredTools.slice(startIndex, endIndex));
        setHasMore(false); // 使用分页时，禁用"加载更多"功能
      } else {
        setVisibleTools(filteredTools);
        setHasMore(false);
      }
      
      // 更新工具总数
      if (onCountUpdate) {
        onCountUpdate(filteredTools.length);
      }
      
      setCurrentToolPage(1);
    }
  }, [category, subcategory, page, itemsPerPage, onCountUpdate]);

  // 加载更多
  const loadMore = () => {
    setIsLoading(true)
    
    // 模拟异步加载
    setTimeout(() => {
      const nextPage = currentToolPage + 1
      const startIndex = currentToolPage * 12
      const endIndex = nextPage * 12
      
      if (toolsData[category] && startIndex < toolsData[category].length) {
        const newTools = toolsData[category].slice(startIndex, endIndex)
        setVisibleTools(prev => [...prev, ...newTools])
        setCurrentToolPage(nextPage)
        setHasMore(endIndex < toolsData[category].length)
      } else {
        setHasMore(false)
      }
      
      setIsLoading(false)
    }, 800)
  }

  // 切换收藏
  const toggleSave = (id: string) => {
    setSavedTools(prev => 
      prev.includes(id) ? prev.filter(toolId => toolId !== id) : [...prev, id]
    )
  }

  // 切换对比
  const toggleCompare = (id: string) => {
    if (compareTools.includes(id)) {
      setCompareTools(prev => prev.filter(toolId => toolId !== id))
    } else {
      if (compareTools.length < 4) {
        setCompareTools(prev => [...prev, id])
      }
    }
  }

  // 清除所有对比
  const clearCompare = () => {
    setCompareTools([])
    setCompareMode(false)
  }

  // 启动对比模式
  const startCompareMode = () => {
    setCompareMode(true)
  }

  // 结束对比模式
  const endCompareMode = () => {
    setCompareMode(false)
  }

  // 打开对比面板
  const openCompareDialog = () => {
    if (compareTools.length >= 2) {
      setShowCompareDialog(true)
    }
  }

  // 关闭对比并恢复原状
  const closeCompareAndReset = () => {
    setShowCompareDialog(false)
    setCompareMode(false)
    setCompareTools([])
  }

  // 获取要对比的工具
  const toolsToCompare = useMemo(() => {
    const allTools = toolsData[category] || []
    return allTools.filter(tool => compareTools.includes(tool.id))
  }, [category, compareTools])

  // 渲染工具卡片 - 重写这个函数
  const renderToolCard = (tool: typeof toolsData[keyof typeof toolsData][0]) => {
    const isSelected = compareTools.includes(tool.id);
    const isSaved = savedTools.includes(tool.id);

    return (
      <motion.div
        key={tool.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card 
          className={`h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-card rounded-xl relative ${
            isSelected ? "ring-2 ring-primary ring-opacity-70 bg-primary/5" : ""
          } ${compareMode ? "cursor-pointer" : ""}`}
                    onClick={(e) => {
            if (compareMode) {
              e.preventDefault();
              toggleCompare(tool.id);
            }
          }}
        >
          {/* 收藏按钮 - 右上角 */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 rounded-full text-muted-foreground hover:text-primary z-10"
            onClick={(e) => {
              e.stopPropagation();
              toggleSave(tool.id);
            }}
                  >
                    {isSaved ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
          
          <div className="relative p-5 flex flex-col items-center text-center h-full">
            {/* 工具图标 */}
            <div className="h-24 w-24 mx-auto mb-5 flex items-center justify-center">
              <div className="relative h-20 w-20">
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
            
            {/* 工具名称 */}
            <h3 className="font-semibold text-lg min-h-[3.5rem] flex items-center justify-center">
              {tool.name}
            </h3>
            
            {/* 简短描述 */}
            <p className="text-sm text-muted-foreground min-h-[3rem] line-clamp-2 my-3 flex items-center justify-center">
                {tool.description}
              </p>
              
            {/* 标签区域 */}
            <div className="flex flex-wrap justify-center gap-2 min-h-[2rem] mb-4">
                {tool.isFree && (
                <Badge variant="secondary" className="text-xs">
                  免费
                  </Badge>
                )}
                {tool.isPremium && (
                <Badge variant="secondary" className="text-xs">
                  付费
                  </Badge>
                )}
                {tool.isNew && (
                <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-xs">
                  新上线
                </Badge>
              )}
            </div>
            
            {/* 详情和跳转按钮 */}
            <div className="flex gap-3 mt-auto w-full">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 h-10"
                asChild
              >
                <Link href={`/tools/${tool.id}`}>
                  查看详情
                </Link>
              </Button>
              <Button 
                variant="default" 
                size="sm"
                className="flex-1 h-10"
                onClick={(e) => e.stopPropagation()}
                asChild
              >
                <Link href={`/redirect/${tool.id}`} target="_blank" rel="noopener noreferrer">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  跳转
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  // 修改工具列表项中的收藏按钮位置也需要调整
  const renderToolList = (tool: typeof toolsData[keyof typeof toolsData][0]) => {
    const isSaved = savedTools.includes(tool.id)
    const isSelected = compareTools.includes(tool.id)

    return (
      <motion.div
        key={tool.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col"
      >
        <div 
          className={`p-5 border rounded-lg flex flex-col md:flex-row gap-4 ${
            isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
          } transition-colors relative ${compareMode ? "cursor-pointer" : ""}`}
          onClick={(e) => {
            if (compareMode) {
              e.preventDefault();
              toggleCompare(tool.id);
            }
          }}
        >
          {/* 图标 */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 relative">
            <Image
              src={tool.icon}
              alt={tool.name}
                fill
                className="rounded-lg object-cover"
            />
            </div>
          </div>
          
          {/* 内容 */}
          <div className="flex-grow flex flex-col">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">{tool.name}</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
              {tool.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-2">
              {tool.isFree && (
                <Badge variant="secondary" className="text-xs">
                  免费
                </Badge>
              )}
              
              {tool.isPremium && (
                <Badge variant="secondary" className="text-xs">
                  付费
                </Badge>
              )}
              
              {tool.isNew && (
                <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-xs">
                  新上线
                </Badge>
              )}
            </div>
          </div>
          
          {/* 收藏按钮和操作按钮平铺排列 */}
          <div className="flex md:flex-row flex-wrap items-center justify-end gap-2 mt-3 md:mt-0 md:ml-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                toggleSave(tool.id);
              }}
            >
              {isSaved ? (
                <BookmarkCheck className="h-5 w-5 text-primary" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-grow-0"
              asChild
            >
              <Link href={`/tools/${tool.id}`}>
                查看详情
              </Link>
            </Button>
            
            <Button 
              variant="default" 
              size="sm"
              className="flex-grow-0"
              asChild
            >
              <Link href={`/redirect/${tool.id}`} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                跳转
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  // 渲染无结果状态
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-4">
      <div className="bg-muted rounded-full p-4">
        <BarChart className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold">未找到工具</h3>
      <p className="text-muted-foreground max-w-md">
        没有找到符合当前筛选条件的工具。尝试调整筛选选项，或者提交一个新工具到平台。
      </p>
      <Button className="mt-4">
        <PlusCircle className="mr-2 h-4 w-4" />
        提交工具
      </Button>
    </div>
  )

  return (
    <div className="flex-1 space-y-6">
      {/* 顶部操作栏 */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold flex items-center">
          {compareMode ? (
            <>
              <span className="text-primary mr-2">选择工具进行对比</span>
              <Badge variant="outline" className="ml-2">
                已选 {compareTools.length}/4
              </Badge>
            </>
          ) : (
            `${visibleTools.length} 个${viewType === "grid" ? "工具" : "结果"}`
          )}
        </h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">最新</SelectItem>
              <SelectItem value="popular">最热门</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md overflow-hidden">
          <Button
              variant={viewType === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewType("grid")}
              className="rounded-none border-0"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
              variant={viewType === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewType("list")}
              className="rounded-none border-0"
          >
            <List className="h-4 w-4" />
          </Button>
          </div>
        </div>
      </div>

      {visibleTools.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          {/* 工具网格 */}
          {viewType === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleTools.map(renderToolCard)}
          </div>
        ) : (
            <div className="divide-y">
              {visibleTools.map(renderToolList)}
      </div>
          )}

      {/* 加载更多 */}
      {hasMore && (
            <div className="flex justify-center py-6">
          <Button 
            variant="outline" 
            onClick={loadMore} 
            disabled={isLoading}
          >
                {isLoading ? "加载中..." : "加载更多"}
          </Button>
        </div>
      )}

          {/* 对比按钮 - 当没有选择工具时显示 */}
          {compareTools.length === 0 && !compareMode && (
            <div className="fixed bottom-6 right-6 z-50">
              <Button 
                variant="default"
                className="h-12 flex items-center justify-center gap-2 rounded-full shadow-xl border-none transition-all duration-300 px-6 bg-primary hover:bg-primary/90 hover:scale-105"
                onClick={startCompareMode}
              >
                <BarChart className="h-5 w-5" />
                <span className="font-medium">对比工具</span>
              </Button>
              </div>
          )}

          {/* 工具对比面板 - 进入对比模式后始终显示，即使工具数量为0 */}
          {compareMode && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-card border border-border shadow-xl rounded-lg p-4 z-50 w-[90%] max-w-4xl animate-fadeIn">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">对比 {compareTools.length} 个工具</h3>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs border-muted hover:bg-muted/30"
                    onClick={clearCompare}
                  >
                    取消
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="text-xs"
                    onClick={openCompareDialog}
                    disabled={compareTools.length < 2}
                  >
                    对比
              </Button>
                </div>
            </div>
            
              {compareTools.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
                  {compareTools.map(id => {
                    const tool = toolsData[category].find(t => t.id === id)
                    return tool ? (
                      <div key={id} className="flex items-center gap-2 bg-muted/30 border border-border p-2 rounded-md min-w-[160px] hover:bg-muted/50 transition-colors">
                        <div className="w-8 h-8 relative">
                    <Image
                      src={tool.icon}
                      alt={tool.name}
                            fill
                            className="rounded-md object-cover"
                    />
                  </div>
                        <span className="text-sm font-medium truncate">{tool.name}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="ml-auto h-6 w-6 hover:bg-background/60 rounded-full" 
                          onClick={() => toggleCompare(id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                    </div>
                    ) : null
                  })}
                    </div>
              )}
                    </div>
          )}

          {/* 对比按钮 - 当有选择工具且非对比模式时显示 */}
          {(compareTools.length > 0 && !compareMode && !showCompareDialog) && (
            <div className="fixed bottom-6 right-6 z-50">
              <Button 
                variant={compareTools.length >= 2 ? "default" : "default"}
                className={`h-12 flex items-center justify-center gap-2 rounded-full shadow-xl transition-all duration-300 px-6 ${
                  compareTools.length >= 2 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 scale-110" 
                    : "bg-primary/80 text-primary-foreground hover:bg-primary"
                }`}
                onClick={compareTools.length >= 2 ? openCompareDialog : undefined}
                disabled={compareTools.length < 2}
              >
                <BarChart className="h-5 w-5" />
                <span className="font-medium">
                  {`对比 (${compareTools.length})`}
                </span>
              </Button>
                </div>
              )}

          {/* 对比弹窗 */}
          <Dialog open={showCompareDialog} onOpenChange={(open) => {
            if (!open) {
              // 关闭对话框时完全重置状态
              closeCompareAndReset();
            } else {
              setShowCompareDialog(true);
            }
          }}>
            <DialogContent className="max-w-5xl w-[90vw] max-h-[80vh] overflow-y-auto">
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">关闭</span>
              </DialogClose>
                  <DialogHeader>
                    <DialogTitle>工具对比</DialogTitle>
                  </DialogHeader>
              <ScrollArea className="max-h-[60vh]">
                <div className="grid grid-cols-[auto,1fr,repeat(4,1fr)] gap-4 mt-4">
                  {/* 表头 */}
                  <div className="font-semibold"></div>
                  <div className="font-semibold">特性</div>
                  {compareTools.map(id => {
                    const tool = toolsData[category].find(t => t.id === id)
                    return tool ? (
                      <div key={id} className="font-semibold text-center">{tool.name}</div>
                    ) : null
                  })}
                  
                  {/* 对比行 - 价格 */}
                  <div className="font-medium">💰</div>
                  <div>价格</div>
                  {compareTools.map(id => {
                    const tool = toolsData[category].find(t => t.id === id)
                    return tool ? (
                      <div key={id} className="text-center">
                        {tool.isFree ? "免费" : tool.isPremium ? "付费" : "混合模式"}
                                </div>
                    ) : null
                  })}
                  
                  {/* 对比行 - 评分 */}
                  <div className="font-medium">⭐</div>
                  <div>评分</div>
                  {compareTools.map(id => {
                    const tool = toolsData[category].find(t => t.id === id)
                    return tool ? (
                      <div key={id} className="text-center flex justify-center">
                        <span className="flex items-center">
                          {tool.rating}
                          <Star className="h-4 w-4 text-yellow-500 ml-1" />
                        </span>
                              </div>
                    ) : null
                  })}
                  
                  {/* 对比行 - 用户数 */}
                  <div className="font-medium">👥</div>
                  <div>用户数</div>
                  {compareTools.map(id => {
                    const tool = toolsData[category].find(t => t.id === id)
                    return tool ? (
                      <div key={id} className="text-center">
                        {tool.users.toLocaleString()}
                            </div>
                    ) : null
                  })}
                  
                  {/* 对比行 - 标签 */}
                  <div className="font-medium">🏷️</div>
                  <div>标签</div>
                  {compareTools.map(id => {
                    const tool = toolsData[category].find(t => t.id === id)
                    return tool ? (
                      <div key={id} className="text-center flex flex-wrap justify-center gap-1">
                        {tool.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                          ))}
                        </div>
                    ) : null
                  })}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
        </>
      )}
    </div>
  )
}
