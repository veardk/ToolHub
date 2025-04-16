"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  ArrowLeft, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  AlertCircle,
  Check,
  X,
  Star,
  Info,
  Clock,
  Calendar,
  Monitor,
  Smartphone,
  Laptop,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageSquare,
  ThumbsUp,
  Computer,
  Apple,
  Globe,
  Server,
  Loader2,
  User,
  Heart,
  ArrowRight,
  MonitorSmartphone,
  File,
  TextCursor,
  ChevronRight,
  Flame,
  Tag,
  DollarSign,
  Sparkles,
  Layers,
  Eye,
  TrendingUp,
  Hash
} from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { fetchToolDetail, ToolDetailResponse } from "@/lib/api"

// 自定义苹果图标组件
const AppleLogo = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

// 平台映射表
const PLATFORM_MAP = {
  "1": { name: "网页端", icon: Globe },
  "2": { name: "iOS", icon: Smartphone },
  "3": { name: "安卓", icon: Smartphone },
  "4": { name: "Mac", icon: AppleLogo },
  "5": { name: "Linux", icon: Server },
  "6": { name: "Windows", icon: Monitor },
  "7": { name: "桌面端", icon: Monitor },
};

// 价格类型映射
const PRICE_TYPE_MAP: Record<number, string> = {
  1: "免费",
  2: "付费",
  3: "部分免费"
}

// 模拟相关工具数据（暂时保留）
const relatedTools = [
  { id: "claude", name: "Claude", icon: "/placeholder.svg?height=40&width=40" },
  { id: "bard", name: "Bard", icon: "/placeholder.svg?height=40&width=40" },
  { id: "bing-chat", name: "Bing Chat", icon: "/placeholder.svg?height=40&width=40" },
  { id: "perplexity", name: "Perplexity AI", icon: "/placeholder.svg?height=40&width=40" }
]

// 模拟相关文章数据（暂时保留）
const relatedArticles = [
  { 
    id: "chatgpt-guide", 
    title: "ChatGPT完全指南：从入门到精通", 
    excerpt: "全面介绍ChatGPT的使用技巧、提示工程和最佳实践...", 
    date: "2023-10-25",
    image: "/placeholder.svg?height=150&width=250"
  },
  { 
    id: "ai-comparison", 
    title: "2023年AI聊天助手对比：ChatGPT、Claude与Bard", 
    excerpt: "详细对比当前主流AI助手的优缺点和适用场景...", 
    date: "2023-11-01",
    image: "/placeholder.svg?height=150&width=250"
  }
]

// 模拟评论数据（暂时保留）
const reviewsData = [
  {
    id: 1,
    user: {
      name: "张三",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "教育工作者"
    },
    rating: 5,
    date: "2023-11-10",
    content: "作为一名教师，ChatGPT极大地帮助我准备教学材料和回答学生的问题。特别是在解释复杂概念时，它能提供清晰易懂的解释。唯一的缺点是偶尔会提供过时的信息。",
    likes: 24,
    replies: 3
  },
  // ... 其他评论数据保持不变
]

// 分类ID到代码的映射
const CATEGORY_CODE_MAP: Record<number, string> = {
  1: "ai-tools",
  2: "web-tools",
  3: "app-tools",
  4: "developer-tools"
};

// 获取分类代码
function getCategoryCode(categoryId: number): string {
  return `/${CATEGORY_CODE_MAP[categoryId] || `category/${categoryId}`}`;
}

// 社交分享组件
function ShareButtons({ toolName }: { toolName: string }) {
  const [shareUrl, setShareUrl] = useState('');
  
  useEffect(() => {
    // 在客户端渲染时设置URL
    setShareUrl(window.location.href);
  }, []);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-12 flex-1">
          <Share2 className="h-5 w-5 mr-2" />
          分享
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl);
          }
        }}>
          <Copy className="h-4 w-4 mr-2" />
          复制链接
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank">
            <Facebook className="h-4 w-4 mr-2" />
            分享到Facebook
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`分享工具: ${toolName}`)}`} target="_blank">
            <Twitter className="h-4 w-4 mr-2" />
            分享到Twitter
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`} target="_blank">
            <Linkedin className="h-4 w-4 mr-2" />
            分享到LinkedIn
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`mailto:?subject=${encodeURIComponent(`分享工具：${toolName}`)}&body=${encodeURIComponent(`我发现了一个很棒的工具: ${shareUrl}`)}`}>
            <Mail className="h-4 w-4 mr-2" />
            通过邮件分享
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function ToolDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toolDetail, setToolDetail] = useState<ToolDetailResponse | null>(null);
  
  // 获取工具详情数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!params.id) {
          throw new Error("工具ID未提供");
        }
        
        const toolId = Number(params.id);
        if (isNaN(toolId)) {
          throw new Error("无效的工具ID");
        }
        
        const response = await fetchToolDetail(toolId);
        
        if (!response.success || !response.data) {
          throw new Error(response.msg || "获取工具详情失败");
        }
        
        setToolDetail(response.data);
        
        // 检查本地存储中是否已收藏
        setIsSaved(localStorage.getItem(`saved_${toolId}`) === 'true');
      } catch (err: any) {
        setError(err.message || "获取工具详情时出错");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [params.id]);

  // 切换收藏状态
  const toggleSave = () => {
    if (!toolDetail) return;
    
    const toolId = toolDetail.basicInfo.id;
    const newState = !isSaved;
    setIsSaved(newState);
    localStorage.setItem(`saved_${toolId}`, newState.toString());
  };

  // 返回上一页
  const goBack = () => {
    router.back();
  };

  // 工具基本信息
  const basicInfo = toolDetail?.basicInfo;
  
  // 显示加载中状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-300">加载工具详情...</p>
        </div>
      </div>
    );
  }

  // 显示错误状态
  if (error || !toolDetail || !basicInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">获取工具详情失败</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error || "无法加载工具详情数据"}</p>
          <Button onClick={goBack}>返回上一页</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 头部信息区 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          {/* 导航面包屑 - 简约风格 */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-3" 
                onClick={goBack}
                aria-label="返回上一页"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="text-sm flex items-center font-medium">
                <Link 
                  href={getCategoryCode(basicInfo.categoryId)}
                  className="text-blue-600 dark:text-blue-400"
                >
                  {basicInfo.categoryName}
                </Link>
                <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
                <span className="text-gray-800 dark:text-gray-300">
                  {basicInfo.name}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2">
              <div className="flex items-start space-x-6 md:space-x-8">
                {/* 工具图标 - 移除背景和阴影 */}
                <div className="relative h-28 w-28 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={basicInfo.logo || "/placeholder.svg?height=80&width=80"}
                    alt={basicInfo.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* 工具信息 */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {basicInfo.name}
                    </h1>
                    
                    {/* 热度标签 */}
                    {basicInfo.heatLevel > 3 && (
                      <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center">
                        <Flame className="h-3 w-3 mr-1" />
                        热门
                      </div>
                    )}
                  </div>
                  
                  {/* 子分类标签 */}
                  {basicInfo.subcategoryName && (
                    <div className="mb-3">
                      <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400 px-3 py-1">
                        <Tag className="h-3 w-3 mr-1.5" />
                        {basicInfo.subcategoryName}
                      </Badge>
                    </div>
                  )}
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                    {basicInfo.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-5">
                    {/* 价格类型标签 */}
                    {basicInfo.priceType !== 1 && (
                      <Badge variant="outline" className={`
                        px-3.5 py-2 text-sm font-medium flex items-center text-gray-700 dark:text-gray-300
                        ${basicInfo.priceType === 2 ? 'bg-gray-50 dark:bg-gray-800/70' :
                          'bg-gray-50 dark:bg-gray-800/70'}
                      `}>
                        <DollarSign className="h-3.5 w-3.5 mr-1.5 text-gray-500 dark:text-gray-400" />
                        {basicInfo.priceTypeText || PRICE_TYPE_MAP[basicInfo.priceType] || "未知"}
                      </Badge>
                    )}
                    
                    {/* 新上线标签 */}
                    {basicInfo.isNew === 1 && (
                      <Badge variant="outline" className="px-3.5 py-2 text-sm font-medium flex items-center bg-gray-50 text-gray-700 dark:bg-gray-800/70 dark:text-gray-300">
                        <Sparkles className="h-3.5 w-3.5 mr-1.5 text-gray-500 dark:text-gray-400" />
                        新上线
                      </Badge>
                    )}
                  </div>
                  
                  {/* 平台支持 */}
                  {basicInfo.platforms && basicInfo.platforms.length > 0 && (
                    <div className="mb-5">
                      <h3 className="text-sm font-medium mb-3 flex items-center text-gray-600 dark:text-gray-400">
                        <Layers className="h-4 w-4 mr-1.5" />
                        支持平台
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {basicInfo.platforms.map((platformId) => {
                          const platformKey = String(platformId);
                          const defaultPlatform = { name: `平台${platformKey}`, icon: Globe };
                          const platform = PLATFORM_MAP[platformKey as keyof typeof PLATFORM_MAP] || defaultPlatform;
                          const PlatformIcon = platform.icon;
                          
                          return (
                            <div key={platformId} className="flex items-center bg-gray-50 dark:bg-gray-800/70 px-3 py-1.5 rounded-full text-gray-700 dark:text-gray-300">
                              <PlatformIcon className="h-4 w-4 mr-1.5 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm">{platform.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* 更新时间和热度 */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      <span>更新时间: {basicInfo.updateTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1.5" />
                      <span>浏览量: {basicInfo.viewCount || 0}</span>
                    </div>
                    {basicInfo.heatDesc && (
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1.5" />
                        <span>{basicInfo.heatDesc}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 justify-center md:justify-end">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white py-2 h-12 w-full">
                <Link href={basicInfo.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  访问官网
                </Link>
              </Button>
              
              <div className="flex gap-3 w-full">
                <Button 
                  variant="outline" 
                  className="h-12 flex-1" 
                  onClick={toggleSave}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="h-5 w-5 mr-2 text-blue-600" />
                      已收藏
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-5 w-5 mr-2" />
                      收藏
                    </>
                  )}
                </Button>
                
                <ShareButtons toolName={basicInfo.name} />
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="h-12 w-12">
                      <AlertCircle className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>报告问题</DialogTitle>
                      <DialogDescription>
                        如果您发现该工具信息有误或链接失效，请告知我们。
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="issue" className="text-right">
                          问题类型
                        </label>
                        <select id="issue" className="col-span-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-md p-2">
                          <option>信息错误</option>
                          <option>链接失效</option>
                          <option>内容过时</option>
                          <option>其他问题</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="description" className="text-right">
                          详细描述
                        </label>
                        <textarea 
                          id="description" 
                          className="col-span-3 bg-transparent border border-gray-300 dark:border-gray-700 rounded-md p-2"
                          rows={5}
                          placeholder="请详细描述您发现的问题..."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">提交报告</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主体内容区 */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 主要内容区 */}
          <div className="lg:col-span-8">
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <TabsList className={`grid w-full ${basicInfo.priceType === 1 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                <TabsTrigger value="overview">概述</TabsTrigger>
                {basicInfo.priceType !== 1 && (
                  <TabsTrigger value="pricing">价格</TabsTrigger>
                )}
                <TabsTrigger value="reviews">评论</TabsTrigger>
              </TabsList>
              
              {/* 概述标签内容 */}
              <TabsContent value="overview" className="mt-6">
                <div className="space-y-8">
                  {/* 简介和主要特点 */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">简介</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {basicInfo.fullDescription}
                    </p>
                    
                    <h2 className="text-2xl font-bold mb-4">主要特点</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 左列特点列表 */}
                        <div className="space-y-4">
                          {toolDetail.coreFeatures
                            .filter(feature => feature.featureGroup === 1)
                            .sort((a, b) => a.sortOrder - b.sortOrder)
                            .map((feature, idx) => (
                              <div key={idx} className="flex items-center">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-gray-800 dark:text-gray-200">{feature.title}</span>
                              </div>
                            ))}
                        </div>
                        
                        {/* 右列特点列表 */}
                        <div className="space-y-4">
                          {toolDetail.coreFeatures
                            .filter(feature => feature.featureGroup === 2)
                            .sort((a, b) => a.sortOrder - b.sortOrder)
                            .map((feature, idx) => (
                              <div key={idx} className="flex items-center">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-gray-800 dark:text-gray-200">{feature.title}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 应用场景 */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">应用场景</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {toolDetail.useCases
                          .sort((a, b) => a.sortOrder - b.sortOrder)
                          .map((useCase, idx) => (
                            <div key={idx} className="flex items-start">
                              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5 mr-3">
                                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <span className="text-gray-800 dark:text-gray-200">{useCase.title}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* 技术规格 */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">技术规格</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <tbody>
                          {toolDetail.techSpecs
                            .sort((a, b) => a.sortOrder - b.sortOrder)
                            .map((spec, idx) => (
                              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/20' : 'bg-white dark:bg-gray-800'}>
                                <td className="px-6 py-4 w-1/4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                  <div className="flex items-center">
                                    {spec.specName === '模型版本' && <Laptop className="h-4 w-4 mr-2 text-blue-500" />}
                                    {spec.specName === 'API访问' && <Globe className="h-4 w-4 mr-2 text-blue-500" />}
                                    {spec.specName === '知识库截止' && <Calendar className="h-4 w-4 mr-2 text-blue-500" />}
                                    {spec.specName === '支持格式' && <File className="h-4 w-4 mr-2 text-blue-500" />}
                                    {spec.specName === '最大输入长度' && <TextCursor className="h-4 w-4 mr-2 text-blue-500" />}
                                    {!['模型版本', 'API访问', '知识库截止', '支持格式', '最大输入长度'].includes(spec.specName) && 
                                      <Info className="h-4 w-4 mr-2 text-blue-500" />
                                    }
                                    {spec.specName}
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                                  {spec.specValue}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 价格标签内容 */}
              <TabsContent value="pricing" className="mt-6">
                <div className="space-y-8">
                  {/* 价格方案 */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">价格方案</h2>
                    
                    {/* 免费工具使用绿色卡片 */}
                    {basicInfo.priceType === 1 ? (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800">
                        <div className="flex items-start">
                          <div className="mr-4 bg-green-100 dark:bg-green-800/30 p-3 rounded-full">
                            <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">完全免费工具</h3>
                            <p className="text-green-700 dark:text-green-400">该工具无需付费即可使用所有功能，不提供付费升级选项。享受免费且完整的功能体验！</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {toolDetail.pricePlans
                          .sort((a, b) => a.sortOrder - b.sortOrder)
                          .map((plan) => (
                            <div 
                              key={plan.id}
                              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 ${
                                plan.planCode === 'plus' ? 'border-blue-500 dark:border-blue-400' : 'border-transparent'
                              }`}
                            >
                              {plan.planCode === 'plus' && (
                                <div className="bg-blue-500 text-white text-center text-sm py-1">
                                  推荐方案
                                </div>
                              )}
                              <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{plan.planName}</h3>
                                <div className="flex items-baseline mb-4">
                                  <span className="text-3xl font-bold">
                                    {plan.price !== null ? `¥${plan.price}` : '定制'}
                                  </span>
                                  {plan.customPeriod && (
                                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                                      {plan.customPeriod}
                                    </span>
                                  )}
                                </div>
                                {plan.description && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    {plan.description}
                                  </p>
                                )}
                                <div className="space-y-3">
                                  {plan.features
                                    .sort((a, b) => a.sortOrder - b.sortOrder)
                                    .map((feature, idx) => (
                                      <div key={idx} className="flex items-start">
                                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5 mr-2">
                                          <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                          <span className="text-gray-800 dark:text-gray-200 block">{feature.featureTitle}</span>
                                          {feature.featureDescription && (
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{feature.featureDescription}</span>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  
                  {/* 价格计划对比表 - 仅当不是免费工具才显示 */}
                  {basicInfo.priceType !== 1 && toolDetail.planComparison && toolDetail.planComparison.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">价格计划对比</h2>
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  功能
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  免费版
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                  付费版
                                </th>
                                {/* 如果有企业版对比列显示企业版列 */}
                                {toolDetail.planComparison.some(item => item.enterpriseValue) && (
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    企业版
                                  </th>
                                )}
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                              {toolDetail.planComparison
                                .sort((a, b) => a.sortOrder - b.sortOrder)
                                .map((comparison, idx) => (
                                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/20' : ''}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                      {comparison.comparisonItem}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                      {comparison.freeValue}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                      {comparison.paidValue}
                                    </td>
                                    {toolDetail.planComparison.some(item => item.enterpriseValue) && (
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        {comparison.enterpriseValue}
                                      </td>
                                    )}
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* 购买建议 - 仅当不是免费工具才显示 */}
                  {basicInfo.priceType !== 1 && (
                    <div>
                      <h2 className="text-2xl font-bold mb-6">购买建议</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {toolDetail.purchaseSuggestions
                          .sort((a, b) => a.sortOrder - b.sortOrder)
                          .map((suggestion, idx) => (
                            <div 
                              key={idx}
                              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                            >
                              <div className="p-6">
                                <h3 className="text-xl font-bold mb-4">{suggestion.userType}</h3>
                                <div className="space-y-3">
                                  {suggestion.suggestionPoints.map((point, pidx) => (
                                    <div key={pidx} className="flex items-start">
                                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5 mr-2">
                                        <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                      </div>
                                      <span className="text-gray-800 dark:text-gray-200">{point}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* 评论标签内容 */}
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-8">
                  {/* 评论统计和过滤 */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">用户评价</h2>
                      <div className="flex items-center">
                        <span className="text-xl font-semibold">{reviewsData.length} 条评论</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent">
                        <option>最新优先</option>
                        <option>最旧优先</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* 评论列表 */}
                  <div className="space-y-6">
                    {reviewsData.map((review) => (
                      <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                        <div className="flex items-start">
                          <Avatar className="h-12 w-12 mr-5 rounded-full overflow-hidden flex-shrink-0">
                            <AvatarImage src={review.user.avatar} alt={review.user.name} />
                            <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold text-lg">{review.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h4 className="font-semibold text-base">{review.user.name}</h4>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {review.user.role}
                                </div>
                              </div>
                              <div className="flex mt-2 sm:mt-0">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                              </div>
                            </div>
                            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                              {review.content}
                            </p>
                            <div className="flex items-center mt-5">
                              <Button variant="ghost" size="sm" className="flex items-center text-gray-500 dark:text-gray-400">
                                <ThumbsUp className="h-4 w-4 mr-1.5" />
                                <span>有用 ({review.likes})</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="flex items-center text-gray-500 dark:text-gray-400 ml-5">
                                <MessageSquare className="h-4 w-4 mr-1.5" />
                                <span>回复 ({review.replies})</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* 写评论区域 */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                    <h3 className="text-xl font-bold mb-4">分享您的使用体验</h3>
                    <div className="mb-4">
                      <label htmlFor="review" className="text-sm font-medium mb-2 block">
                        评论内容
                      </label>
                      <textarea
                        id="review"
                        rows={5}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent"
                        placeholder="分享您的使用体验和建议..."
                      />
                    </div>
                    <Button>提交评论</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* 侧边栏 */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {/* 开发者/公司信息卡片 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-5">开发者信息</h3>
                  <div className="flex items-center mb-5">
                    <div className="relative h-16 w-16 mr-5 flex-shrink-0">
                      {basicInfo.developerLogo ? (
                        <Image 
                          src={basicInfo.developerLogo} 
                          alt={basicInfo.developer}
                          fill
                          className="object-contain rounded-md"
                        />
                      ) : (
                        <Avatar className="h-16 w-16 rounded-md">
                          <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-lg">{basicInfo.developer?.charAt(0) || "D"}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-base">{basicInfo.developer}</h4>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">开发商</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                    {basicInfo.developerInfo || "暂无开发者信息"}
                  </p>
                  {basicInfo.developerUrl && (
                    <Button asChild variant="outline" className="w-full" size="sm">
                      <Link href={basicInfo.developerUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        访问开发者网站
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
              
              {/* 相关文章链接（使用mock数据） */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-5">相关文章</h3>
                  <div className="space-y-5">
                    {relatedArticles.map((article) => (
                      <div key={article.id} className="flex">
                        <div className="relative h-18 w-18 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-5 flex-1">
                          <h4 className="font-medium text-sm hover:text-blue-600 transition-colors line-clamp-2">
                            <Link href={`/articles/${article.id}`}>
                              {article.title}
                            </Link>
                          </h4>
                          <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{article.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="ghost" size="sm" className="w-full mt-5">
                    <Link href="/articles">
                      查看更多文章
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* 相关工具推荐列表（使用mock数据） */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-5">相关工具</h3>
                  <div className="space-y-4">
                    {relatedTools.map((tool) => (
                      <Link key={tool.id} href={`/tools/${tool.id}`}>
                        <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={tool.icon}
                              alt={tool.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <span className="font-medium block mb-1">{tool.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {tool.id === 'claude' ? 'Anthropic的AI助手，擅长复杂对话' : 
                               tool.id === 'bard' ? 'Google推出的AI对话模型' : 
                               tool.id === 'bing-chat' ? '微软推出的搜索增强型AI助手' : 
                               tool.id === 'perplexity' ? '基于网络实时信息的AI引擎' : 
                               '智能AI对话助手'}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 用户提交工具跳转 */}
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">您有更好的工具推荐？</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  是否有您正在使用的强大工具未被收录？欢迎提交给我们，与更多用户分享。
                </p>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/submit-tool">
                    提交新工具
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 固定在页面右下角的快速操作浮动按钮 */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col gap-3">
          <Button 
            variant="default" 
            size="icon" 
            className="h-12 w-12 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowLeft className="h-5 w-5 rotate-90" />
          </Button>
        </div>
      </div>
    </div>
  )
} 