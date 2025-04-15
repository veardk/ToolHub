"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Calendar, Clock, Eye, ThumbsUp, Search } from "lucide-react"

// 示例数据 - 实际项目中应从API获取
const featuredNews = [
  {
    id: "1",
    title: "人工智能在2023年的最新发展趋势",
    excerpt: "探索人工智能领域的最新突破，包括生成式AI、多模态模型以及AI在各行业的应用案例。",
    coverImage: "/placeholder.svg",
    date: "2023-11-15",
    readTime: "8分钟",
    tags: ["AI", "技术趋势", "创新"],
    views: 1250,
    likes: 328,
    author: {
      name: "张明",
      avatar: "/placeholder.svg",
      initials: "张"
    }
  },
  {
    id: "2",
    title: "Web3.0技术如何改变互联网未来",
    excerpt: "深入分析Web3.0技术的核心原理，以及它如何通过去中心化、区块链和数字身份重塑互联网的未来。",
    coverImage: "/placeholder.svg",
    date: "2023-11-10",
    readTime: "10分钟",
    tags: ["Web3", "区块链", "去中心化"],
    views: 980,
    likes: 215,
    author: {
      name: "李华",
      avatar: "/placeholder.svg",
      initials: "李"
    }
  },
  {
    id: "3",
    title: "5G技术加速数字化转型的关键因素",
    excerpt: "5G技术如何推动各行业数字化转型，从智慧城市到智能制造，解析高速连接带来的革命性变化。",
    coverImage: "/placeholder.svg",
    date: "2023-11-05",
    readTime: "7分钟",
    tags: ["5G", "数字化转型", "智能制造"],
    views: 856,
    likes: 190,
    author: {
      name: "王芳",
      avatar: "/placeholder.svg",
      initials: "王"
    }
  },
  {
    id: "4",
    title: "可持续科技：绿色创新如何应对气候变化",
    excerpt: "探讨最新的可持续科技创新，如何通过清洁能源、碳捕获和循环经济技术缓解全球气候危机。",
    coverImage: "/placeholder.svg",
    date: "2023-10-28",
    readTime: "9分钟",
    tags: ["可持续发展", "清洁能源", "气候技术"],
    views: 720,
    likes: 168,
    author: {
      name: "陈静",
      avatar: "/placeholder.svg",
      initials: "陈"
    }
  },
  {
    id: "5",
    title: "元宇宙：虚拟与现实的融合前景",
    excerpt: "解析元宇宙的技术基础、商业模式和社会影响，探索这一虚拟与现实融合空间的未来发展方向。",
    coverImage: "/placeholder.svg",
    date: "2023-10-20",
    readTime: "11分钟",
    tags: ["元宇宙", "VR/AR", "数字经济"],
    views: 1100,
    likes: 265,
    author: {
      name: "刘伟",
      avatar: "/placeholder.svg",
      initials: "刘"
    }
  }
];

// 更多新闻数据
const allNews = [
  ...featuredNews,
  {
    id: "6",
    title: "量子计算：下一代计算革命的前沿",
    excerpt: "深入探讨量子计算的最新进展，主要玩家，以及它如何解决传统计算无法攻克的复杂问题。",
    coverImage: "/placeholder.svg",
    date: "2023-10-15",
    readTime: "12分钟",
    tags: ["量子计算", "前沿科技", "计算机科学"],
    views: 650,
    likes: 142,
    author: {
      name: "赵海",
      avatar: "/placeholder.svg",
      initials: "赵"
    }
  },
  {
    id: "7",
    title: "企业数字化转型必备工具与策略",
    excerpt: "为企业数字化转型提供实用指南，包括必备工具、实施策略和成功案例分析。",
    coverImage: "/placeholder.svg",
    date: "2023-10-08",
    readTime: "9分钟",
    tags: ["数字化转型", "企业科技", "管理创新"],
    views: 820,
    likes: 176,
    author: {
      name: "孙明",
      avatar: "/placeholder.svg",
      initials: "孙"
    }
  },
  {
    id: "8",
    title: "大数据分析如何驱动智能决策",
    excerpt: "探索大数据分析技术如何帮助企业获取洞察，优化运营并做出更明智的战略决策。",
    coverImage: "/placeholder.svg",
    date: "2023-10-01",
    readTime: "8分钟",
    tags: ["大数据", "数据分析", "商业智能"],
    views: 760,
    likes: 185,
    author: {
      name: "林小华",
      avatar: "/placeholder.svg",
      initials: "林"
    }
  },
  {
    id: "9",
    title: "网络安全新挑战与应对策略",
    excerpt: "分析当前网络安全面临的新型威胁，以及组织如何通过先进技术和最佳实践加强防御。",
    coverImage: "/placeholder.svg",
    date: "2023-09-25",
    readTime: "10分钟",
    tags: ["网络安全", "数据保护", "网络威胁"],
    views: 890,
    likes: 210,
    author: {
      name: "周安",
      avatar: "/placeholder.svg",
      initials: "周"
    }
  },
  {
    id: "10",
    title: "机器学习在医疗健康领域的革命性应用",
    excerpt: "探讨机器学习如何变革医疗健康行业，从疾病诊断到个性化治疗方案的创新应用。",
    coverImage: "/placeholder.svg",
    date: "2023-09-18",
    readTime: "11分钟",
    tags: ["医疗科技", "机器学习", "健康创新"],
    views: 925,
    likes: 238,
    author: {
      name: "郑医",
      avatar: "/placeholder.svg",
      initials: "郑"
    }
  }
];

export default function NewsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sortOption, setSortOption] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const sliderRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 滑块导航功能
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredNews.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredNews.length - 1 ? 0 : prev + 1));
  };

  // 根据排序选项排序新闻
  const sortedNews = [...allNews].sort((a, b) => {
    if (sortOption === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.views - a.views;
    }
  });

  // 根据搜索查询过滤新闻
  const filteredNews = searchQuery
    ? sortedNews.filter(
        (news) =>
          news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : sortedNews;

  return (
    <>
      {/* 头部区域 */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">最新资讯与深度分析</h1>
            <p className="text-xl opacity-90">
              获取前沿科技动态、行业趋势分析和专业洞察，助力您把握创新脉搏
            </p>
          </div>

          {/* 精选内容滑块 */}
          <div className="relative max-w-5xl mx-auto mt-12 px-4">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handlePrevSlide}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>

            <div className="overflow-hidden" ref={sliderRef}>
              <div 
                className="flex transition-transform duration-300 ease-in-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredNews.map((news) => (
                  <div 
                    key={news.id} 
                    className="min-w-full px-2"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row">
                      <div className="md:w-2/5 h-60 md:h-auto relative">
                        <img 
                          src={news.coverImage} 
                          alt={news.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-3/5 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {news.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-white/20 border-none">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h2 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2">{news.title}</h2>
                          <p className="text-white/80 mb-4 line-clamp-3">{news.excerpt}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{news.date}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4" />
                            <span>{news.readTime}</span>
                          </div>
                          <Button 
                            variant="secondary" 
                            className="bg-white text-blue-600 hover:bg-white/90 font-medium"
                            onClick={() => router.push(`/news/${news.id}`)}
                          >
                            阅读全文
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleNextSlide}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* 滑块指示器 */}
            <div className="flex justify-center space-x-2 mt-6">
              {featuredNews.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 主体内容区 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">全部资讯</h2>
            
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  placeholder="搜索资讯..."
                  className="pl-9 w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* 新闻列表 */}
          <div className="space-y-8">
            {filteredNews.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img
                        src={news.coverImage}
                        alt={news.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6 flex flex-col">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {news.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs px-2 py-0 bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Link href={`/news/${news.id}`}>
                        <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                          {news.title}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{news.date}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{news.readTime}</span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {news.excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={news.author.avatar} alt={news.author.name} />
                            <AvatarFallback>{news.author.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{news.author.name}</span>
                        </div>
                        <div className="flex space-x-4">
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{news.views}</span>
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{news.likes}</span>
                          </div>
                          <Button asChild variant="outline" className="ml-4">
                            <Link href={`/news/${news.id}`}>阅读</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                  没有找到相关资讯，请尝试其他搜索词。
                </p>
                <Button onClick={() => setSearchQuery("")}>查看全部资讯</Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 订阅区 */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">订阅最新资讯</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              获取最新的科技动态、产品资讯和行业分析，我们每周发送精选内容到您的邮箱
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="输入您的邮箱地址"
                className="flex-grow"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                订阅
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              我们尊重您的隐私，您随时可以取消订阅
            </p>
          </div>
        </div>
      </section>
    </>
  );
} 