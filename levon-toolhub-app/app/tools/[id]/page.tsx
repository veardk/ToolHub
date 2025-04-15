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
  ThumbsUp
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

// 模拟工具数据
const toolData = {
  id: "chatgpt",
  name: "ChatGPT",
  description: "OpenAI开发的强大AI对话模型，能够理解和生成类人文本，支持各种复杂任务。",
  longDescription: "ChatGPT是由OpenAI开发的一款先进的语言模型，能够进行自然、流畅的对话交流。它基于GPT架构，通过大规模文本数据训练而成，能够理解上下文、回答问题、撰写内容、解释概念、提供建议等。作为一款通用AI助手，ChatGPT在教育、工作、创意写作等多个领域都有广泛应用。",
  icon: "/placeholder.svg?height=200&width=200",
  category: "ai-tools",
  subcategory: "ai-chat",
  company: "OpenAI",
  companyLogo: "/placeholder.svg?height=40&width=40",
  companyUrl: "https://openai.com",
  websiteUrl: "https://chat.openai.com",
  platforms: ["Web", "iOS", "Android"],
  lastUpdated: "2023-11-15",
  rating: 4.8,
  tags: ["AI", "对话助手", "自然语言处理", "文本生成"],
  isFree: true,
  isPremium: true,
  isNew: false,
  features: [
    "自然语言对话",
    "多种语言支持",
    "上下文理解",
    "代码编写与调试",
    "内容创作与编辑",
    "信息提取与总结",
    "定制化回答",
    "多回合对话"
  ],
  highlights: [
    {
      title: "自然对话体验",
      description: "ChatGPT提供流畅、自然的对话体验，能够理解上下文并给予恰当回应。",
      image: "/placeholder.svg?height=300&width=500"
    },
    {
      title: "多功能AI助手",
      description: "从回答问题到创意写作，从代码辅助到知识解析，ChatGPT能胜任各种任务。",
      image: "/placeholder.svg?height=300&width=500"
    },
    {
      title: "持续学习与更新",
      description: "OpenAI定期更新模型，提升能力并修复问题，确保用户获得最佳体验。",
      image: "/placeholder.svg?height=300&width=500"
    }
  ],
  useCases: [
    "学习辅助与解答",
    "内容创作与编辑",
    "编程与技术支持",
    "语言翻译与学习",
    "创意头脑风暴",
    "日常生活助手"
  ],
  specs: {
    apiAccess: "可通过OpenAI API接入",
    modelVersion: "GPT-4 / GPT-3.5",
    contextLength: "最多支持8K-32K tokens",
    supportedLanguages: "100+种语言"
  },
  requirements: {
    web: "现代浏览器（Chrome, Firefox, Safari, Edge等）",
    mobile: "iOS 14.0+或Android 8.0+",
    internet: "稳定的网络连接"
  },
  limitations: [
    "知识更新截止到训练数据时间点",
    "可能产生幻觉（生成不准确信息）",
    "无法访问互联网或实时数据",
    "对于高度专业化的领域知识有限",
    "可能存在潜在偏见"
  ],
  pricingPlans: [
    {
      name: "免费版",
      price: "¥0",
      billingCycle: "",
      features: [
        "基本对话功能",
        "访问GPT-3.5模型",
        "标准响应速度",
        "使用量限制"
      ]
    },
    {
      name: "Plus版",
      price: "¥20",
      billingCycle: "每月",
      features: [
        "优先访问新功能",
        "更快的响应速度",
        "使用高级GPT-4模型",
        "使用量上限更高",
        "高峰期优先使用权"
      ],
      isFeatured: true
    },
    {
      name: "企业版",
      price: "定制",
      billingCycle: "",
      features: [
        "专属部署选项",
        "增强的数据隐私",
        "专属客户支持",
        "API访问扩展",
        "自定义功能开发"
      ]
    }
  ],
  relatedTools: [
    { id: "claude", name: "Claude", icon: "/placeholder.svg?height=40&width=40" },
    { id: "bard", name: "Bard", icon: "/placeholder.svg?height=40&width=40" },
    { id: "bing-chat", name: "Bing Chat", icon: "/placeholder.svg?height=40&width=40" },
    { id: "perplexity", name: "Perplexity AI", icon: "/placeholder.svg?height=40&width=40" }
  ],
  relatedArticles: [
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
};

// 模拟评论数据
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
  {
    id: 2,
    user: {
      name: "李四",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "软件开发者"
    },
    rating: 4,
    date: "2023-11-05",
    content: "ChatGPT在编程辅助方面表现出色，能够快速解决我遇到的大多数问题，提供代码示例和调试建议。然而，对于最新的技术栈和库，它的知识可能不够全面。总体来说是一个很好的开发伙伴。",
    likes: 18,
    replies: 2
  },
  {
    id: 3,
    user: {
      name: "王五",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "内容创作者"
    },
    rating: 5,
    date: "2023-10-28",
    content: "我用ChatGPT来头脑风暴创意和编辑文章，效果非常好。它能够提供多种角度的想法，并且帮助我完善文案。Plus版本的响应速度明显更快，值得投资。",
    likes: 32,
    replies: 5
  },
  {
    id: 4,
    user: {
      name: "赵六",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "学生"
    },
    rating: 4,
    date: "2023-10-20",
    content: "作为学生，ChatGPT帮助我解决了很多学习上的疑惑，尤其是在准备论文和研究项目时。不过有时需要仔细验证它提供的事实和数据。总体来说是学习的好帮手。",
    likes: 15,
    replies: 1
  }
];

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
          <Link href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out ${toolName}!`)}`} target="_blank">
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
  
  // 模拟获取工具数据
  useEffect(() => {
    // 实际项目中，这里会根据params.id从API获取数据
    console.log(`Loading tool with ID: ${params.id}`);
    // 模拟设置收藏状态
    setIsSaved(localStorage.getItem(`saved_${params.id}`) === 'true');
  }, [params.id]);

  // 切换收藏状态
  const toggleSave = () => {
    const newState = !isSaved;
    setIsSaved(newState);
    localStorage.setItem(`saved_${params.id}`, newState.toString());
  };

  // 返回上一页
  const goBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 头部信息区 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-3" 
              onClick={goBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <Link href={`/${toolData.category}`} className="hover:underline">{toolData.category === 'ai-tools' ? 'AI工具' : toolData.category === 'web-tools' ? '网页工具' : '应用工具'}</Link>
              <span className="mx-2">/</span>
              <span>{toolData.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-start">
                <div className="relative h-24 w-24 mr-6 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={toolData.icon}
                    alt={toolData.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                    {toolData.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {toolData.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {toolData.isFree && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                        免费
                      </Badge>
                    )}
                    {toolData.isPremium && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800">
                        付费
                      </Badge>
                    )}
                    {toolData.isNew && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                        新上线
                      </Badge>
                    )}
                    {toolData.platforms.map((platform) => (
                      <Badge key={platform} variant="outline">
                        {platform === 'Web' ? <Monitor className="h-3 w-3 mr-1" /> :
                         platform === 'iOS' ? <Smartphone className="h-3 w-3 mr-1" /> :
                         platform === 'Android' ? <Smartphone className="h-3 w-3 mr-1" /> :
                         <Laptop className="h-3 w-3 mr-1" />}
                        {platform}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>更新时间: {toolData.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 justify-center md:justify-end">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white py-2 h-12 w-full">
                <Link href={toolData.websiteUrl} target="_blank" rel="noopener noreferrer">
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
                
                <ShareButtons toolName={toolData.name} />
                
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">概述</TabsTrigger>
                <TabsTrigger value="pricing">价格</TabsTrigger>
                <TabsTrigger value="reviews">评论</TabsTrigger>
              </TabsList>
              
              {/* 概述标签内容 */}
              <TabsContent value="overview" className="mt-6">
                <div className="space-y-8">
                  {/* 简介和主要特点 */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">简介</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {toolData.longDescription}
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3">主要特点</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {toolData.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="mt-1 mr-3 flex-shrink-0 rounded-full bg-green-100 p-1">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 应用场景 */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">应用场景</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {toolData.useCases.map((useCase, index) => (
                        <div 
                          key={index}
                          className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="font-medium">{useCase}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 技术规格 */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">技术规格</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                      <div className="p-6">
                        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                          {Object.entries(toolData.specs).map(([key, value]) => (
                            <div key={key} className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {key === 'apiAccess' ? 'API访问' : 
                                 key === 'modelVersion' ? '模型版本' : 
                                 key === 'contextLength' ? '上下文长度' : 
                                 key === 'supportedLanguages' ? '支持语言' : key}
                              </dt>
                              <dd className="text-sm text-gray-900 dark:text-gray-100 sm:col-span-2">
                                {value as string}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 价格标签内容 */}
              <TabsContent value="pricing" className="mt-6">
                <div className="space-y-8">
                  {/* 价格方案对比表格 */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">价格方案</h2>
                    <div className="overflow-x-auto">
                      <div className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow">
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
                          {toolData.pricingPlans.map((plan) => (
                            <div 
                              key={plan.name}
                              className={`p-6 flex flex-col h-full ${plan.isFeatured ? 'bg-blue-50 dark:bg-blue-900/20 relative' : ''}`}
                            >
                              {plan.isFeatured && (
                                <div className="absolute top-0 inset-x-0 transform -translate-y-1/2 flex justify-center">
                                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">推荐</span>
                                </div>
                              )}
                              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                              <div className="mb-4">
                                <span className="text-3xl font-bold">{plan.price}</span>
                                {plan.billingCycle && (
                                  <span className="text-gray-500 dark:text-gray-400 ml-1">{plan.billingCycle}</span>
                                )}
                              </div>
                              <ul className="space-y-3 mb-6 flex-grow">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-start">
                                    <div className="mt-1 mr-3 flex-shrink-0 rounded-full bg-green-100 p-1">
                                      <Check className="h-3 w-3 text-green-600" />
                                    </div>
                                    <span className="text-sm">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              <Button 
                                className={`mt-auto ${plan.isFeatured ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                                variant={plan.isFeatured ? 'default' : 'outline'}
                                asChild
                              >
                                <Link href={toolData.websiteUrl} target="_blank" rel="noopener noreferrer">
                                  {plan.name === '免费版' ? '开始使用' : '查看详情'}
                                </Link>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 免费版vs付费版功能对比 - 仅当既有免费版又有付费版时显示 */}
                  {toolData.isFree && toolData.isPremium && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">免费版 vs 付费版</h2>
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                功能
                              </th>
                              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                免费版
                              </th>
                              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                付费版
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                模型访问
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                仅GPT-3.5
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                GPT-3.5和GPT-4
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                响应速度
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                标准
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                更快（优先处理）
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                使用量限制
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                有严格限制
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                更高限制
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                高峰期使用
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                可能受限
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                优先访问
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                新功能体验
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                延迟访问
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                优先体验
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  
                  {/* 购买建议 */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4">购买建议</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">适合免费版的用户：</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                            <li>偶尔使用，不需要高级功能</li>
                            <li>主要用于简单问答和基础任务</li>
                            <li>对响应速度没有特别要求</li>
                            <li>想先体验基本功能</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">适合Plus版的用户：</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                            <li>频繁使用，需要更强大的模型</li>
                            <li>对响应速度有较高要求</li>
                            <li>需要在高峰期稳定使用</li>
                            <li>希望优先体验新功能</li>
                            <li>处理复杂任务和长对话</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">适合企业版的用户：</h3>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                            <li>需要团队协作功能</li>
                            <li>要求更高的数据安全性</li>
                            <li>需要定制化功能和支持</li>
                            <li>大规模商业应用</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
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
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src={review.user.avatar} alt={review.user.name} />
                            <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <h4 className="font-semibold">{review.user.name}</h4>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {review.user.role}
                                </div>
                              </div>
                              <div className="flex mt-2 sm:mt-0">
                                <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                              </div>
                            </div>
                            <p className="mt-3 text-gray-700 dark:text-gray-300">
                              {review.content}
                            </p>
                            <div className="flex items-center mt-4">
                              <Button variant="ghost" size="sm" className="flex items-center text-gray-500 dark:text-gray-400">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                <span>有用 ({review.likes})</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="flex items-center text-gray-500 dark:text-gray-400 ml-4">
                                <MessageSquare className="h-4 w-4 mr-1" />
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
                  <h3 className="text-lg font-semibold mb-4">开发者信息</h3>
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={toolData.companyLogo} alt={toolData.company} />
                      <AvatarFallback>{toolData.company.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{toolData.company}</h4>
                      <div className="text-sm text-gray-500 dark:text-gray-400">AI & 机器学习</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {toolData.company}是一家领先的人工智能研究实验室，专注于开发安全、通用的人工智能系统，致力于确保AI技术惠及全人类。
                  </p>
                  <Button asChild variant="outline" className="w-full" size="sm">
                    <Link href={toolData.companyUrl} target="_blank" rel="noopener noreferrer">
                      访问开发者网站
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* 相关文章链接 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">相关文章</h3>
                  <div className="space-y-4">
                    {toolData.relatedArticles.map((article) => (
                      <div key={article.id} className="flex">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="font-medium text-sm hover:text-blue-600 transition-colors line-clamp-2">
                            <Link href={`/articles/${article.id}`}>
                              {article.title}
                            </Link>
                          </h4>
                          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{article.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="ghost" size="sm" className="w-full mt-4">
                    <Link href="/articles">
                      查看更多文章
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* 相关工具推荐列表 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">相关工具</h3>
                  <div className="space-y-3">
                    {toolData.relatedTools.map((tool) => (
                      <Link key={tool.id} href={`/tools/${tool.id}`}>
                        <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <div className="relative h-10 w-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                            <Image
                              src={tool.icon}
                              alt={tool.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="font-medium block">{tool.name}</span>
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