"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, 
  Clock, 
  ThumbsUp, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Tag, 
  Filter, 
  Wrench,
  AlertCircle
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

// Sample data for articles
const articles = [
  {
    id: 1,
    title: "10 AI Tools That Will Transform Your Workflow in 2023",
    excerpt: "Discover the most powerful AI tools that can help you automate tasks and boost productivity.",
    coverImage: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
    date: "May 15, 2023",
    readTime: "8 min read",
    likes: 245,
    views: 5432,
    category: "AI Tools",
    tags: ["Productivity", "AI", "Automation"],
    relatedTools: ["Midjourney", "ChatGPT"],
    url: "/articles/ai-tools-workflow",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Web Development Tools",
    excerpt: "A comprehensive overview of essential tools every web developer should have in their toolkit.",
    coverImage: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SC",
    },
    date: "April 28, 2023",
    readTime: "12 min read",
    likes: 189,
    views: 3247,
    category: "Developer Tools",
    tags: ["Web Development", "Coding", "Frontend"],
    relatedTools: ["VSCode", "GitHub"],
    url: "/articles/web-development-tools-guide",
  },
  {
    id: 3,
    title: "How to Choose the Right Productivity Tools for Your Team",
    excerpt: "Learn how to evaluate and select the best productivity tools that match your team's specific needs.",
    coverImage: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Michael Torres",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MT",
    },
    date: "May 3, 2023",
    readTime: "10 min read",
    likes: 156,
    views: 2876,
    category: "Web Tools",
    tags: ["Productivity", "Team Collaboration", "Project Management"],
    relatedTools: ["Notion", "Todoist"],
    url: "/articles/productivity-tools-team",
  },
  {
    id: 4,
    title: "The Rise of AI Design Tools: A Deep Dive",
    excerpt: "Exploring how AI is revolutionizing design workflows and what it means for designers.",
    coverImage: "/placeholder.svg?height=200&width=400",
    author: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DK",
    },
    date: "May 12, 2023",
    readTime: "7 min read",
    likes: 203,
    views: 4187,
    category: "AI Tools",
    tags: ["Design", "AI", "Creative"],
    relatedTools: ["DALL-E", "Stable Diffusion"],
    url: "/articles/ai-design-tools",
  },
  {
    id: 5,
    title: "Top Mobile App Development Tools in 2023",
    excerpt: "A curated list of the best tools for building mobile applications for iOS and Android.",
    coverImage: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EW",
    },
    date: "April 20, 2023",
    readTime: "9 min read",
    likes: 178,
    views: 3654,
    category: "App Tools",
    tags: ["Mobile Development", "iOS", "Android"],
    relatedTools: ["Flutter", "React Native"],
    url: "/articles/mobile-app-development-tools",
  },
  {
    id: 6,
    title: "Open Source Tools Every Developer Should Know",
    excerpt: "Discover powerful open-source tools that can enhance your development workflow and productivity.",
    coverImage: "/placeholder.svg?height=200&width=400",
    author: {
      name: "James Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JR",
    },
    date: "May 8, 2023",
    readTime: "11 min read",
    likes: 221,
    views: 4521,
    category: "Developer Tools",
    tags: ["Open Source", "Development", "Free Tools"],
    relatedTools: ["Git", "Postman"],
    url: "/articles/open-source-developer-tools",
  },
  {
    id: 7,
    title: "Best AI Writing Assistants for Content Creators",
    excerpt: "Find out which AI writing tools can help you create better content more efficiently.",
    coverImage: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Lisa Wong",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LW",
    },
    date: "May 18, 2023",
    readTime: "8 min read",
    likes: 165,
    views: 3219,
    category: "AI Tools",
    tags: ["Writing", "Content Creation", "AI"],
    relatedTools: ["Copy.ai", "Jasper"],
    url: "/articles/ai-writing-assistants",
  },
  {
    id: 8,
    title: "Streamlining Your Design Workflow with Web Tools",
    excerpt: "How to use the latest web-based design tools to improve your design process and collaboration.",
    coverImage: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Ryan Park",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RP",
    },
    date: "May 5, 2023",
    readTime: "9 min read",
    likes: 142,
    views: 2943,
    category: "Web Tools",
    tags: ["Design", "Workflow", "Collaboration"],
    relatedTools: ["Figma", "Canva"],
    url: "/articles/design-workflow-web-tools",
  },
  {
    id: 9,
    title: "The Future of App Development Tools",
    excerpt: "Trends and predictions for the tools that will shape mobile and web app development in the coming years.",
    coverImage: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Nina Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "NG",
    },
    date: "May 14, 2023",
    readTime: "10 min read",
    likes: 137,
    views: 2567,
    category: "App Tools",
    tags: ["App Development", "Future Tech", "Trends"],
    relatedTools: ["Flutter", "Swift UI"],
    url: "/articles/future-app-development-tools",
  },
]

// Sample data for popular topics
const popularTopics = [
  { name: "AI Tools", count: 24 },
  { name: "Productivity", count: 18 },
  { name: "Design", count: 15 },
  { name: "Development", count: 22 },
  { name: "Marketing", count: 12 },
  { name: "Automation", count: 9 },
  { name: "No-Code", count: 7 },
  { name: "Open Source", count: 11 },
]

// 热门工具数据
const popularTools = [
  { 
    id: "chatgpt", 
    name: "ChatGPT", 
    category: "AI Tools",
    icon: "/placeholder.svg?height=30&width=30"
  },
  { 
    id: "figma", 
    name: "Figma", 
    category: "Web Tools",
    icon: "/placeholder.svg?height=30&width=30"
  },
  { 
    id: "notion", 
    name: "Notion", 
    category: "Productivity",
    icon: "/placeholder.svg?height=30&width=30"
  },
  { 
    id: "midjourney", 
    name: "Midjourney", 
    category: "AI Tools",
    icon: "/placeholder.svg?height=30&width=30"
  },
  { 
    id: "vscode", 
    name: "VS Code", 
    category: "Developer Tools",
    icon: "/placeholder.svg?height=30&width=30"
  },
]

// Sample data for popular authors
const popularAuthors = [
  {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
    articles: 15,
  },
  {
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SC",
    articles: 12,
  },
  {
    name: "Michael Torres",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MT",
    articles: 9,
  },
  {
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EW",
    articles: 8,
  },
  {
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DK",
    articles: 7,
  },
]

// 精选文章数据
const featuredArticles = [
  {
    id: 10,
    title: "2023年必备工具合集：提升工作效率的关键",
    excerpt: "本文汇总了2023年最受欢迎的AI、Web和开发工具，帮助您在各个领域提高工作效率。",
    coverImage: "/placeholder.svg?height=400&width=800",
    author: {
      name: "技术编辑部",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ED",
    },
    category: "精选",
    url: "/articles/essential-tools-2023",
  },
  {
    id: 11,
    title: "人工智能工具的伦理与未来发展",
    excerpt: "深入探讨AI工具在提高效率的同时，我们需要关注的伦理问题和未来可能的发展方向。",
    coverImage: "/placeholder.svg?height=400&width=800",
    author: {
      name: "AI研究团队",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AI",
    },
    category: "前沿",
    url: "/articles/ai-ethics-future",
  },
]

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortOption, setSortOption] = useState("latest")
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6
  
  // 根据当前分类筛选文章
  const filteredArticles = activeCategory === "all" 
    ? articles 
    : articles.filter(article => 
        article.category.toLowerCase().includes(activeCategory.replace("-", " "))
      )
  
  // 根据排序选项排序文章
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortOption === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortOption === "popular") {
      return b.views - a.views
    } else if (sortOption === "top-rated") {
      return b.likes - a.likes
    }
    return 0
  })
  
  // 分页逻辑
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage)
  const currentArticles = sortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}
        
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
  
  // 渲染空状态
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-muted rounded-full p-6 mb-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">没有找到相关文章</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        当前分类下暂无文章，请尝试其他分类或调整筛选条件。
      </p>
      <Button onClick={() => {
        setActiveCategory("all")
        setSortOption("latest")
      }}>
        查看所有文章
      </Button>
    </div>
  )

  // 渲染文章卡片
  const renderArticleCard = (article: typeof articles[0]) => (
    <Card
      key={article.id}
      className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
    >
      <Link href={article.url} className="block overflow-hidden h-48 relative">
        <img
          src={article.coverImage || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <CardContent className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            {article.date}
          </div>
          
          {/* 移动阅读时间到右侧 */}
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {article.readTime}
          </div>
        </div>
        
        {/* 标签移到标题上方，更加醒目 */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {article.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs px-2 py-0 bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <Link href={article.url}>
          <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
        
        <div className="mt-auto">
          {/* 相关工具标签 */}
          {article.relatedTools && article.relatedTools.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1 pb-3 border-b border-gray-100 dark:border-gray-800">
              {article.relatedTools.map(tool => (
                <Badge key={tool} variant="secondary" className="text-xs flex items-center">
                  <Wrench className="h-3 w-3 mr-1" />
                  {tool}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>{article.author.initials}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{article.author.name}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-xs">
              <div className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {article.views}
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-3 w-3 mr-1" />
                {article.likes}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen flex flex-col">
      {/* 精选文章横幅 */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 py-8">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-white mb-2">文章精选</h1>
            <p className="text-white/90">
              发现最新工具和使用技巧，提升您的工作效率
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {featuredArticles.map(article => (
              <div key={article.id} className="relative rounded-lg overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                <img 
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <Badge variant="outline" className="bg-white/20 text-white border-white/20 mb-2">
                    {article.category}
                  </Badge>
                  <h2 className="text-xl text-white font-bold mb-2">{article.title}</h2>
                  <p className="text-white/80 text-sm line-clamp-2 mb-2">{article.excerpt}</p>
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={article.author.avatar} />
                      <AvatarFallback>{article.author.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-white/90 text-sm">{article.author.name}</span>
                  </div>
                </div>
                <Link href={article.url} className="absolute inset-0 z-30" aria-label={article.title} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 主内容区 */}
          <div className="lg:w-3/4">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <TabsList>
                  <TabsTrigger value="all">所有文章</TabsTrigger>
                  <TabsTrigger value="ai-tools">AI工具</TabsTrigger>
                  <TabsTrigger value="web-tools">Web工具</TabsTrigger>
                  <TabsTrigger value="app-tools">App工具</TabsTrigger>
                  <TabsTrigger value="developer-tools">开发工具</TabsTrigger>
                </TabsList>
                
                {/* 添加搜索框和排序在同一行 */}
                <div className="flex items-center space-x-3 self-end">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      type="text"
                      placeholder="搜索文章..."
                      className="pl-9 h-10 w-[180px] md:w-[220px]"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">排序：</span>
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="排序方式" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="latest">最新</SelectItem>
                        <SelectItem value="popular">最热门</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <TabsContent value={activeCategory} className="mt-0">
                {currentArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentArticles.map(renderArticleCard)}
                  </div>
                ) : (
                  renderEmptyState()
                )}
                
                {renderPagination()}
              </TabsContent>
            </Tabs>
          </div>

          {/* 侧边栏 */}
          <div className="lg:w-1/4 space-y-6">
            {/* 发布文章按钮 */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow p-5 text-white">
              <h3 className="text-lg font-bold mb-2">分享您的经验</h3>
              <p className="text-white/90 mb-4 text-sm">
                写一篇文章，分享您对工具的使用心得和技巧。
              </p>
              <Button asChild className="w-full bg-white text-blue-600 hover:bg-white/90">
                <Link href="/articles/create">发布新文章</Link>
              </Button>
            </div>
            
            {/* 热门标签 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                热门标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map((topic) => (
                  <Badge
                    key={topic.name}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {topic.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 热门工具 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Wrench className="h-5 w-5 mr-2" />
                热门工具
              </h3>
              <div className="space-y-3">
                {popularTools.map((tool) => (
                  <div key={tool.id} className="flex items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center mr-3 overflow-hidden">
                      <img src={tool.icon} alt={tool.name} className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{tool.category}</div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2 text-sm">查看所有工具</Button>
              </div>
            </div>

            {/* 订阅更新 */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-5">
              <h3 className="text-lg font-bold mb-2">订阅更新</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                订阅我们的通讯，获取最新文章和工具推荐。
              </p>
              <Input
                type="email"
                placeholder="您的邮箱地址"
                className="mb-2"
              />
              <Button className="w-full">订阅</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

