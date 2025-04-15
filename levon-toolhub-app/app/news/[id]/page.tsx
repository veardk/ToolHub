"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  MessageSquare,
  ThumbsUp, 
  Eye, 
  ChevronUp,
  AlertCircle,
  ExternalLink
} from "lucide-react"

// 示例详细新闻数据
const newsData = {
  "1": {
    id: "1",
    title: "人工智能在2023年的最新发展趋势",
    subtitle: "从生成式AI到多模态模型，AI领域正经历前所未有的变革",
    excerpt: "探索人工智能领域的最新突破，包括生成式AI、多模态模型以及AI在各行业的应用案例。",
    coverImage: "/placeholder.svg",
    date: "2023-11-15",
    readTime: "8分钟",
    tags: ["AI", "技术趋势", "创新"],
    views: 1250,
    likes: 328,
    author: {
      name: "张明",
      title: "人工智能研究员",
      avatar: "/placeholder.svg",
      initials: "张",
      bio: "张明是一位专注于人工智能和机器学习的技术研究员，拥有10年行业经验，曾参与多个大型AI项目的开发。"
    },
    content: [
      {
        type: "paragraph",
        content: "2023年，人工智能技术以前所未有的速度发展，从大型语言模型到多模态系统，AI正重新定义各行各业的运作方式。本文将深入探讨今年AI领域最重要的发展趋势，以及这些技术如何影响我们的日常生活和工作方式。"
      },
      {
        type: "heading",
        content: "生成式AI的爆发性增长"
      },
      {
        type: "paragraph",
        content: "生成式AI在2023年迎来了质的飞跃。GPT-4、Claude、Bard等大型语言模型的能力显著提升，它们不仅能够生成流畅、连贯的文本，还能理解复杂的指令和上下文。这些模型现在能够撰写各种类型的内容，从技术文档到创意故事，质量已经接近甚至超过了人类水平。"
      },
      {
        type: "paragraph",
        content: "除了文本生成，图像生成技术也取得了令人瞩目的进展。Midjourney、DALL-E 3和Stable Diffusion等工具能够根据文本提示创建高质量的图像，这使得设计师、艺术家和内容创作者的工作流程发生了根本性的变化。"
      },
      {
        type: "image",
        url: "/placeholder.svg",
        caption: "由AI生成的艺术作品展示了生成式技术的创新潜力"
      },
      {
        type: "heading",
        content: "多模态AI模型的崛起"
      },
      {
        type: "paragraph",
        content: "2023年的另一个重要趋势是多模态AI系统的发展。这些系统能够同时处理文本、图像、音频和视频等多种形式的数据，创造出更全面、更强大的AI体验。"
      },
      {
        type: "paragraph",
        content: "GPT-4V（Vision）的发布标志着这一领域的重大突破，它能够分析图像并提供相关描述和洞察。这种能力为无障碍技术、内容分析和视觉搜索等应用打开了新的可能性。"
      },
      {
        type: "quote",
        content: "多模态AI代表了人工智能的未来。通过整合不同类型的数据，这些系统能够提供更接近人类理解世界方式的体验。",
        author: "李飞，人工智能专家"
      },
      {
        type: "heading",
        content: "AI在企业中的实际应用"
      },
      {
        type: "paragraph",
        content: "随着AI技术的成熟，越来越多的企业开始将这些技术整合到其业务流程中。从客户服务到产品开发，AI正在各个领域发挥作用："
      },
      {
        type: "list",
        items: [
          "智能客服机器人：提供24/7全天候的客户支持，减少等待时间并提高满意度",
          "预测分析：利用历史数据预测市场趋势和消费者行为",
          "内容创作与优化：自动生成营销文案、产品描述和社交媒体内容",
          "流程自动化：简化重复性任务，释放员工进行更具创造性的工作"
        ]
      },
      {
        type: "paragraph",
        content: "金融、医疗、零售和制造业等领域已经开始看到AI实施带来的显著回报，包括成本降低、效率提升和创新增强。"
      },
      {
        type: "heading",
        content: "AI伦理与监管的发展"
      },
      {
        type: "paragraph",
        content: "随着AI技术的快速发展，伦理和监管问题变得越来越重要。2023年见证了全球范围内对AI伦理框架和监管措施的积极讨论。"
      },
      {
        type: "paragraph",
        content: "欧盟的《人工智能法案》（AI Act）提出了基于风险的方法来监管AI系统，为全球其他地区提供了参考。同时，主要的AI开发公司也开始建立自己的伦理准则和安全措施，以确保技术的负责任发展。"
      },
      {
        type: "paragraph",
        content: "透明度、公平性、隐私保护和问责制成为AI治理中的核心原则，这些原则将继续指导未来AI技术的发展方向。"
      },
      {
        type: "heading",
        content: "展望未来"
      },
      {
        type: "paragraph",
        content: "展望2024年及以后，我们可以预期AI技术将继续以惊人的速度发展。几个值得关注的趋势包括："
      },
      {
        type: "list",
        items: [
          "更高效的AI模型：在保持或提高性能的同时减少计算资源需求",
          "个性化AI助手：能够根据个人习惯和偏好提供定制化服务",
          "AI与物联网的深度融合：创造更智能的家庭、城市和工业环境",
          "低代码/无代码AI开发平台：使更多人能够参与AI创新"
        ]
      },
      {
        type: "paragraph",
        content: "虽然面临技术、伦理和社会挑战，人工智能无疑将继续重塑我们的世界。对于企业和个人来说，了解并适应这些变化至关重要，以便在这个AI驱动的未来中保持竞争力。"
      }
    ],
    relatedNews: ["2", "6", "10"],
    recommendedTools: [
      {
        id: "chatgpt",
        name: "ChatGPT",
        description: "由OpenAI开发的对话式AI助手，基于GPT模型提供强大的自然语言处理能力",
        icon: "/placeholder.svg"
      },
      {
        id: "midjourney",
        name: "Midjourney",
        description: "AI图像生成工具，可根据文本描述创建高质量艺术作品和视觉内容",
        icon: "/placeholder.svg"
      },
      {
        id: "huggingface",
        name: "Hugging Face",
        description: "AI社区和平台，提供各类开源模型和工具，用于构建AI应用",
        icon: "/placeholder.svg"
      }
    ],
    comments: [
      {
        id: "c1",
        user: {
          name: "王建国",
          avatar: "/placeholder.svg",
          initials: "王"
        },
        content: "文章写得非常全面！生成式AI确实是今年最大的技术突破，改变了我们许多工作流程。",
        date: "2023-11-16",
        likes: 15,
        isOfficial: false
      },
      {
        id: "c2",
        user: {
          name: "李媛",
          avatar: "/placeholder.svg",
          initials: "李"
        },
        content: "关于AI伦理的部分讨论得很到位。技术发展这么快，确实需要有相应的监管和伦理准则跟上。",
        date: "2023-11-16",
        likes: 8,
        isOfficial: false
      },
      {
        id: "c3",
        user: {
          name: "张明",
          avatar: "/placeholder.svg",
          initials: "张"
        },
        content: "感谢大家的评论！人工智能确实正在以前所未有的速度发展，我们将继续关注并分享最新的AI趋势和应用。",
        date: "2023-11-17",
        likes: 21,
        isOfficial: true
      }
    ]
  }
};

// 模拟更多资讯数据，用于相关推荐
const moreNews = [
  {
    id: "2",
    title: "Web3.0技术如何改变互联网未来",
    excerpt: "深入分析Web3.0技术的核心原理，以及它如何通过去中心化、区块链和数字身份重塑互联网的未来。",
    coverImage: "/placeholder.svg",
    date: "2023-11-10",
    readTime: "10分钟",
    tags: ["Web3", "区块链", "去中心化"]
  },
  {
    id: "6",
    title: "量子计算：下一代计算革命的前沿",
    excerpt: "深入探讨量子计算的最新进展，主要玩家，以及它如何解决传统计算无法攻克的复杂问题。",
    coverImage: "/placeholder.svg",
    date: "2023-10-15",
    readTime: "12分钟",
    tags: ["量子计算", "前沿科技", "计算机科学"]
  },
  {
    id: "10",
    title: "机器学习在医疗健康领域的革命性应用",
    excerpt: "探讨机器学习如何变革医疗健康行业，从疾病诊断到个性化治疗方案的创新应用。",
    coverImage: "/placeholder.svg",
    date: "2023-09-18",
    readTime: "11分钟",
    tags: ["医疗科技", "机器学习", "健康创新"]
  }
];

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params.id as string;
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentNews, setCurrentNews] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // 在实际应用中，这里会从API获取数据
  useEffect(() => {
    // 模拟API请求
    const loadNewsData = () => {
      // 检查newsId是否存在于newsData中
      if (newsData[newsId as keyof typeof newsData]) {
        setCurrentNews(newsData[newsId as keyof typeof newsData]);
        
        // 设置相关文章
        const related = newsData[newsId as keyof typeof newsData].relatedNews.map(
          (id) => moreNews.find((news) => news.id === id)
        ).filter(Boolean);
        setRelatedArticles(related as any[]);
      } else {
        // 如果newsId不存在，可以重定向到404页面或资讯主页
        router.push("/news");
      }
    };

    loadNewsData();
  }, [newsId, router]);

  // 监听滚动事件，显示/隐藏返回顶部按钮
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // 在实际应用中，这里会调用API更新点赞状态
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // 在实际应用中，这里会调用API更新收藏状态
  };

  const handleShare = () => {
    // 在实际应用中，这里会实现分享功能
    if (navigator.share) {
      navigator.share({
        title: currentNews?.title,
        text: currentNews?.excerpt,
        url: window.location.href,
      }).catch((err) => console.error("分享失败:", err));
    } else {
      // 复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href);
      alert("链接已复制到剪贴板");
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      // 在实际应用中，这里会调用API提交评论
      alert("评论提交成功！");
      setCommentText("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 生成目录
  const generateTableOfContents = () => {
    if (!currentNews) return [];
    
    return currentNews.content
      .filter((item: any) => item.type === "heading")
      .map((heading: {type: string; content: string}, index: number) => ({
        id: `heading-${index}`,
        title: heading.content,
      }));
  };

  // 渲染内容
  const renderContent = () => {
    if (!currentNews) return null;

    return currentNews.content.map((item: any, index: number) => {
      switch (item.type) {
        case "paragraph":
          return (
            <p key={index} className="my-4 text-gray-800 dark:text-gray-200 leading-relaxed">
              {item.content}
            </p>
          );
        case "heading":
          return (
            <h2 
              id={`heading-${index}`} 
              key={index} 
              className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100"
            >
              {item.content}
            </h2>
          );
        case "image":
          return (
            <figure key={index} className="my-6">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={item.url} 
                  alt={item.caption} 
                  className="w-full h-auto object-cover"
                />
              </div>
              {item.caption && (
                <figcaption className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          );
        case "quote":
          return (
            <blockquote 
              key={index} 
              className="border-l-4 border-blue-500 pl-4 py-2 my-6 text-gray-700 dark:text-gray-300 italic"
            >
              <p>{item.content}</p>
              {item.author && (
                <footer className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  — {item.author}
                </footer>
              )}
            </blockquote>
          );
        case "list":
          return (
            <ul key={index} className="list-disc pl-6 my-4 space-y-2 text-gray-800 dark:text-gray-200">
              {item.items.map((listItem: string, listIndex: number) => (
                <li key={listIndex}>{listItem}</li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });
  };

  if (!currentNews) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 mb-4">正在加载资讯内容...</p>
      </div>
    );
  }

  return (
    <>
      {/* 头部设计 */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10" />
        <img 
          src={currentNews.coverImage} 
          alt={currentNews.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
          <div className="container mx-auto">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white mb-4"
              onClick={() => router.push('/news')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回资讯列表
            </Button>
            <div className="flex flex-wrap gap-2 mb-3">
              {currentNews.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 border-none">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
              {currentNews.title}
            </h1>
            <p className="text-xl text-white/90 mb-4">
              {currentNews.subtitle}
            </p>
            <div className="flex items-center text-white space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{currentNews.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{currentNews.readTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{currentNews.views} 阅读</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 正文与侧边栏区域 */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 主要内容区 */}
          <div className="lg:w-2/3">
            {/* 作者信息 */}
            <div className="flex items-center mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={currentNews.author.avatar} alt={currentNews.author.name} />
                <AvatarFallback>{currentNews.author.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentNews.author.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{currentNews.author.title}</p>
              </div>
            </div>

            {/* 文章行动按钮 */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button 
                variant="outline" 
                className={`${isLiked ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800" : ""}`}
                onClick={handleLike}
              >
                <ThumbsUp className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "已点赞" : "点赞"}
              </Button>
              <Button 
                variant="outline" 
                className={`${isSaved ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800" : ""}`}
                onClick={handleSave}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 mr-2 fill-current" />
                    已收藏
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4 mr-2" />
                    收藏
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                分享
              </Button>
            </div>

            {/* 文章正文区 */}
            <div className="prose prose-lg dark:prose-invert max-w-none" ref={contentRef}>
              {/* 引言/摘要 */}
              <p className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {currentNews.excerpt}
              </p>
              
              {/* 正文内容 */}
              {renderContent()}
            </div>

            {/* 标签 */}
            <div className="mt-12 flex flex-wrap gap-2">
              {currentNews.tags.map((tag: string) => (
                <Link 
                  key={tag} 
                  href={`/news?tag=${tag}`}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* 评论区 */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6">评论 ({currentNews.comments.length})</h3>

              {/* 评论表单 */}
              <div className="mb-8">
                <Textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="分享你的想法..."
                  className="mb-4 resize-none"
                  rows={4}
                />
                <div className="flex justify-end">
                  <Button onClick={handleCommentSubmit} disabled={!commentText.trim()}>
                    发表评论
                  </Button>
                </div>
              </div>

              {/* 评论列表 */}
              <div className="space-y-6">
                {currentNews.comments.map((comment: any) => (
                  <div 
                    key={comment.id} 
                    className={`p-4 rounded-lg ${
                      comment.isOfficial ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800" : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">{comment.user.name}</span>
                            {comment.isOfficial && (
                              <Badge className="ml-2 bg-blue-600">官方</Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {comment.date}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="ml-1">{comment.likes}</span>
                      </Button>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 ml-11">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="lg:w-1/3 space-y-8">
            {/* 作者简介 */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">关于作者</h3>
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={currentNews.author.avatar} alt={currentNews.author.name} />
                    <AvatarFallback>{currentNews.author.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{currentNews.author.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{currentNews.author.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {currentNews.author.bio}
                </p>
                <Button variant="outline" className="w-full">
                  查看作者全部文章
                </Button>
              </CardContent>
            </Card>

            {/* 目录 */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">目录</h3>
                <ul className="space-y-2">
                  {generateTableOfContents().map((heading: {id: string; title: string}) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 相关文章 */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">延伸阅读</h3>
                <div className="space-y-4">
                  {relatedArticles.map((article) => (
                    <div key={article.id} className="flex items-start">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="h-16 w-16 object-cover rounded mr-3 flex-shrink-0"
                      />
                      <div>
                        <Link 
                          href={`/news/${article.id}`}
                          className="font-medium line-clamp-2 hover:text-blue-600 transition-colors"
                        >
                          {article.title}
                        </Link>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{article.date}</span>
                          <span className="mx-1">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 推荐工具 */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">推荐工具</h3>
                <div className="space-y-4">
                  {currentNews.recommendedTools.map((tool: any) => (
                    <div key={tool.id} className="group">
                      <Link 
                        href={`/tools/${tool.id}`}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                          <img src={tool.icon} alt={tool.name} className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h4 className="font-medium group-hover:text-blue-600 transition-colors">{tool.name}</h4>
                            <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {tool.description}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 返回顶部按钮 */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors z-50"
          aria-label="返回顶部"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
} 