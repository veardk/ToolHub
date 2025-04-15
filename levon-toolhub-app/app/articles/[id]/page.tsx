"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Bookmark,
  Calendar,
  ChevronLeft,
  Clock,
  Eye,
  Flag,
  Share2,
  ThumbsUp,
  MessageSquare,
  ChevronUp,
  Copy,
  Check,
  Mail,
  Twitter,
  Linkedin,
  Facebook,
  Tag,
  Heart,
  Wrench
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

// 模拟文章数据
const articleData = {
  id: 1,
  title: "10 AI 工具让你的工作效率提升 10 倍",
  slug: "10-ai-tools-boost-productivity",
  coverImage: "/placeholder.svg?height=600&width=1200",
  excerpt: "探索最新的 AI 工具如何帮助你自动化日常任务，提高工作效率，并解放创意思维。",
  content: `
<h2>引言</h2>
<p>随着人工智能技术的迅速发展，各种 AI 工具正在彻底改变我们的工作方式。从内容创作到数据分析，从代码编写到设计工作，AI 工具正在各个领域展现出巨大的潜力。本文将介绍 10 个能显著提升工作效率的 AI 工具。</p>

<h2>1. ChatGPT - 内容创作与头脑风暴</h2>
<p>由 OpenAI 开发的 ChatGPT 是一款强大的语言模型，可以:</p>
<ul>
  <li>生成各类文本内容，包括文章、电子邮件和社交媒体帖子</li>
  <li>回答问题，提供信息</li>
  <li>帮助进行创意头脑风暴</li>
  <li>总结长篇文档</li>
</ul>

<p>使用 ChatGPT 可以节省大量撰写初稿的时间，让你专注于润色和改进内容。</p>

<figure>
  <img src="/placeholder.svg?height=400&width=800" alt="ChatGPT 界面示例" />
  <figcaption>ChatGPT 界面示例 - 生成内容草稿</figcaption>
</figure>

<h2>2. Midjourney - AI 图像生成</h2>
<p>Midjourney 是目前最受欢迎的 AI 图像生成工具之一，可以通过文本描述创建高质量的图像：</p>

<pre><code class="language-bash">
/imagine prompt: A futuristic office workspace with holographic displays, minimalist design, morning light, photorealistic
</code></pre>

<p>这个工具对于：</p>
<ul>
  <li>设计师寻找灵感</li>
  <li>营销人员快速创建社交媒体图像</li>
  <li>内容创作者为文章生成插图</li>
</ul>

<figure>
  <img src="/placeholder.svg?height=400&width=800" alt="Midjourney 生成的未来办公空间图像" />
  <figcaption>使用 Midjourney 生成的未来办公空间概念图</figcaption>
</figure>

<h2>3. GitHub Copilot - 编程助手</h2>
<p>GitHub Copilot 是面向开发者的 AI 工具，它能：</p>
<ul>
  <li>根据注释自动生成代码</li>
  <li>提供整个函数或代码块的建议</li>
  <li>帮助理解复杂代码</li>
</ul>

<pre><code class="language-javascript">
// 一个简单的函数，计算斐波那契数列中的第n个数
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 使用动态规划优化斐波那契数列计算
function efficientFibonacci(n) {
  let dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}
</code></pre>

<p>Copilot 可以显著减少重复性编码工作，让程序员专注于更高层次的问题解决。</p>

<h2>4. Notion AI - 智能文档与知识管理</h2>
<p>Notion AI 为流行的笔记和知识管理工具 Notion 增加了 AI 功能，包括：</p>
<ul>
  <li>自动总结长文档</li>
  <li>改进写作风格和语法</li>
  <li>根据简短描述生成内容</li>
  <li>翻译文本到不同语言</li>
</ul>
  `,
  author: {
    id: 101,
    name: "张明",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "ZM",
    bio: "人工智能和生产力工具爱好者，专注于探索提升工作效率的新方法。",
    social: {
      twitter: "@zhangming",
      linkedin: "zhangming"
    }
  },
  date: "2023-05-15",
  lastUpdated: "2023-05-20",
  readTime: "12",
  stats: {
    views: 8429,
    likes: 342,
    comments: 57,
    shares: 128
  },
  category: "AI 工具",
  tags: ["人工智能", "生产力", "工作效率", "自动化"],
  relatedTools: ["ChatGPT", "Midjourney", "GitHub Copilot", "Notion AI"],
  toc: [
    { id: "intro", title: "引言", level: 1 },
    { id: "chatgpt", title: "1. ChatGPT - 内容创作与头脑风暴", level: 2 },
    { id: "midjourney", title: "2. Midjourney - AI 图像生成", level: 2 },
    { id: "github-copilot", title: "3. GitHub Copilot - 编程助手", level: 2 },
    { id: "notion-ai", title: "4. Notion AI - 智能文档与知识管理", level: 2 },
  ],
  comments: [
    {
      id: 1,
      user: {
        name: "李华",
        avatar: "/placeholder.svg?height=50&width=50",
        initials: "LH",
      },
      date: "2023-05-16",
      content: "感谢分享这些工具！我已经开始使用 ChatGPT 和 Notion AI，确实帮我节省了很多时间。想问问作者对于这些 AI 工具的隐私问题有什么看法？",
      likes: 24,
      isAuthorReply: false,
      replies: [
        {
          id: 2,
          user: {
            name: "张明",
            avatar: "/placeholder.svg?height=50&width=50",
            initials: "ZM",
          },
          date: "2023-05-16",
          content: "很高兴你喜欢这篇文章！关于隐私问题，这确实是一个重要考虑因素。我建议在使用这些工具时：1) 仔细阅读隐私政策；2) 避免上传敏感信息；3) 考虑使用有本地部署选项的替代方案。后续我会专门写一篇关于 AI 工具隐私和安全性的文章。",
          likes: 18,
          isAuthorReply: true,
        }
      ]
    },
    {
      id: 3,
      user: {
        name: "王小明",
        avatar: "/placeholder.svg?height=50&width=50",
        initials: "WXM",
      },
      date: "2023-05-17",
      content: "GitHub Copilot 确实是开发者的神器，但订阅费用有点高。有没有一些更经济实惠的替代品推荐？",
      likes: 15,
      isAuthorReply: false,
      replies: []
    }
  ]
};

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");
  const [commentSortOption, setCommentSortOption] = useState("newest");
  const [commentText, setCommentText] = useState("");
  // 假设我们使用ID从参数中获取文章，在实际应用中，这会从API获取
  const article = articleData;

  // 滚动进度处理
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;
      const totalDocScrollLength = docHeight - winHeight;
      const scrollPosition = Math.floor(
        (scrollTop / totalDocScrollLength) * 100
      );
      setScrollProgress(scrollPosition);
      
      // 更新当前活动标题
      const headings = document.querySelectorAll('h2, h3');
      if (headings.length > 0) {
        let currentHeadingId = '';
        for (let i = 0; i < headings.length; i++) {
          const heading = headings[i];
          const rect = heading.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 200) {
            currentHeadingId = heading.id;
            break;
          } else if (rect.top < 0) {
            currentHeadingId = heading.id;
          }
        }
        setActiveHeading(currentHeadingId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 复制链接处理
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // 处理点赞
  const handleLike = () => {
    setLiked(!liked);
  };

  // 处理收藏
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  // 处理评论提交
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里处理评论提交逻辑
    setCommentText("");
    alert("评论已提交（演示）");
  };

  // 处理评论排序
  const handleCommentSortChange = (value: string) => {
    setCommentSortOption(value);
  };

  // 回到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 滚动到指定标题
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 渲染文章内容
  const renderArticleContent = () => {
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none" 
           dangerouslySetInnerHTML={{ __html: article.content }}
      />
    );
  };

  // 根据排序选项排序评论
  const sortedComments = [...article.comments].sort((a, b) => {
    if (commentSortOption === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (commentSortOption === "popular") {
      return b.likes - a.likes;
    }
    return 0;
  });

  return (
    <div className="min-h-screen">
      {/* 阅读进度指示器 */}
      <Progress 
        value={scrollProgress} 
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent" 
      />
      
      {/* 文章头部 */}
      <div className="relative">
        {/* 返回按钮 */}
        <div className="absolute top-4 left-4 z-10">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.back()} 
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            返回
          </Button>
        </div>

        {/* 分享按钮 */}
        <div className="absolute top-4 right-4 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleCopyLink}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 mr-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? "已复制链接" : "复制链接"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Twitter className="h-4 w-4 mr-2" />
                分享到 Twitter
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Facebook className="h-4 w-4 mr-2" />
                分享到 Facebook
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Linkedin className="h-4 w-4 mr-2" />
                分享到 LinkedIn
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Mail className="h-4 w-4 mr-2" />
                通过邮件分享
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 封面图 */}
        <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent z-10" />
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 内容主区域 */}
          <div className="lg:w-2/3">
            {/* 文章信息 */}
            <div className="mb-8">
              {/* 分类与标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge 
                  variant="outline" 
                  className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                >
                  {article.category}
                </Badge>
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{article.excerpt}</p>
              
              {/* 作者信息 */}
              <div className="flex items-center mb-6">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={article.author.avatar} alt={article.author.name} />
                  <AvatarFallback>{article.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-lg">{article.author.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {article.author.bio}
                  </div>
                </div>
              </div>
              
              {/* 文章元信息 */}
              <div className="flex flex-wrap gap-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <div className="flex items-center mr-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  发布于: {article.date}
                </div>
                <div className="flex items-center mr-6">
                  <Clock className="h-4 w-4 mr-2" />
                  阅读时间: {article.readTime} 分钟
                </div>
                <div className="flex items-center mr-6">
                  <Eye className="h-4 w-4 mr-2" />
                  {article.stats.views} 浏览
                </div>
                <div className="flex items-center mr-6">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {article.stats.likes} 点赞
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {article.stats.comments} 评论
                </div>
              </div>

              {/* 相关工具 */}
              {article.relatedTools && article.relatedTools.length > 0 && (
                <div className="mb-6">
                  <div className="text-sm font-semibold mb-2">相关工具:</div>
                  <div className="flex flex-wrap gap-2">
                    {article.relatedTools.map(tool => (
                      <Badge key={tool} variant="outline" className="flex items-center">
                        <Wrench className="h-3 w-3 mr-1" />
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <Separator className="mb-8" />
            </div>

            {/* 文章正文 */}
            <div className="relative">
              {renderArticleContent()}
            </div>

            {/* 作者信息卡片 */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 my-8">
              <div className="flex items-start">
                <Avatar className="h-16 w-16 mr-6">
                  <AvatarImage src={article.author.avatar} alt={article.author.name} />
                  <AvatarFallback>{article.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold mb-2">关于作者</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{article.author.bio}</p>
                  <div className="flex space-x-2">
                    {article.author.social?.twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://twitter.com/${article.author.social.twitter}`} target="_blank" rel="noreferrer">
                          <Twitter className="h-4 w-4 mr-2" />
                          Twitter
                        </a>
                      </Button>
                    )}
                    {article.author.social?.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`https://linkedin.com/in/${article.author.social.linkedin}`} target="_blank" rel="noreferrer">
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 评论区 */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">评论 ({article.stats.comments})</h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">排序方式:</span>
                  <Tabs value={commentSortOption} onValueChange={handleCommentSortChange} className="w-auto">
                    <TabsList className="h-8">
                      <TabsTrigger value="newest" className="text-xs h-8 px-3">最新</TabsTrigger>
                      <TabsTrigger value="popular" className="text-xs h-8 px-3">最热</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {/* 评论撰写框 */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <form onSubmit={handleCommentSubmit}>
                    <div className="mb-4">
                      <Textarea
                        placeholder="写下你的评论..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="resize-y min-h-[120px]"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" disabled={!commentText.trim()}>
                        发表评论
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* 评论列表 */}
              <div className="space-y-6">
                {sortedComments.map((comment) => (
                  <div key={comment.id} className={`p-6 rounded-lg ${comment.isAuthorReply ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
                    <div className="flex items-start">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                        <AvatarFallback>{comment.user.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-semibold mr-2">{comment.user.name}</span>
                          {comment.isAuthorReply && (
                            <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                              作者
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          {comment.date}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{comment.content}</p>
                        <div className="flex items-center">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{comment.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            回复
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* 回复列表 */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 pl-14 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className={`p-4 rounded-lg ${reply.isAuthorReply ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50' : 'bg-gray-50 dark:bg-gray-800/70'}`}>
                            <div className="flex items-start">
                              <Avatar className="h-8 w-8 mr-3">
                                <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                                <AvatarFallback>{reply.user.initials}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center mb-1">
                                  <span className="font-semibold mr-2">{reply.user.name}</span>
                                  {reply.isAuthorReply && (
                                    <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                                      作者
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                  {reply.date}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">{reply.content}</p>
                                <div className="flex items-center">
                                  <Button variant="ghost" size="sm" className="h-6 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    <span>{reply.likes}</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 加载更多评论按钮 */}
              <div className="flex justify-center mt-8">
                <Button variant="outline">加载更多评论</Button>
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="lg:w-1/3 space-y-6">
            {/* 目录导航 - 固定位置 */}
            <div className="sticky top-24">
              {/* 目录导航 */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-4">目录</h3>
                  <div className="space-y-2">
                    {article.toc.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToHeading(item.id)}
                        className={`text-left block w-full px-2 py-1 rounded-md text-sm transition-colors ${
                          activeHeading === item.id
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        } ${item.level === 1 ? "" : "ml-3"}`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 互动悬浮卡片 */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex justify-around">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleLike}
                            className={liked ? "text-red-500" : ""}
                          >
                            <Heart className={`h-6 w-6 ${liked ? "fill-current" : ""}`} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{liked ? "取消点赞" : "点赞文章"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleBookmark}
                            className={bookmarked ? "text-blue-500" : ""}
                          >
                            <Bookmark className={`h-6 w-6 ${bookmarked ? "fill-current" : ""}`} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{bookmarked ? "取消收藏" : "收藏文章"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Share2 className="h-6 w-6" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center">
                              <DropdownMenuItem className="cursor-pointer">
                                <Copy className="h-4 w-4 mr-2" />
                                复制链接
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Twitter className="h-4 w-4 mr-2" />
                                Twitter
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Facebook className="h-4 w-4 mr-2" />
                                Facebook
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>分享文章</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Flag className="h-6 w-6" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="cursor-pointer">
                                内容有误
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                含有不当内容
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                版权问题
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                其他问题
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>举报文章</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* 固定交互按钮 */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={scrollToTop}
          className="bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
} 