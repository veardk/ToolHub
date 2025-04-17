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
import { fetchToolDetail, submitToolReport, ToolDetailResponse } from "@/lib/api"
import ToolReportModal from "@/components/ToolReportModal"

// 自定义苹果图标组件
const AppleLogo = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    width="16"
    height="16"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

// 自定义安卓图标组件
const AndroidLogo = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M7.2,16.8a.8.8,0,0,0,.8.8h.8v2.8a1.2,1.2,0,0,0,2.4,0V17.6h1.6v2.8a1.2,1.2,0,0,0,2.4,0V17.6H16a.8.8,0,0,0,.8-.8V8H7.2Zm-2-8.8A1.2,1.2,0,0,0,4,9.2v5.6a1.2,1.2,0,0,0,2.4,0V9.2A1.2,1.2,0,0,0,5.2,8ZM18.8,8a1.2,1.2,0,0,0-1.2,1.2v5.6a1.2,1.2,0,0,0,2.4,0V9.2A1.2,1.2,0,0,0,18.8,8ZM15.46,2.08l1.17-1.17a.4.4,0,0,0,0-.57.4.4,0,0,0-.57,0L14.71,1.7A6.11,6.11,0,0,0,12,1,6.11,6.11,0,0,0,9.29,1.7L7.94.34a.4.4,0,0,0-.57,0,.4.4,0,0,0,0,.57L8.54,2.08A5.85,5.85,0,0,0,6.4,5.6H17.6A5.85,5.85,0,0,0,15.46,2.08ZM10,4.4A.8.8,0,1,1,10.8,3.6.8.8,0,0,1,10,4.4Zm4,0a.8.8,0,1,1,.8-.8A.8.8,0,0,1,14,4.4Z" />
  </svg>
);

// 自定义Linux企鹅图标组件
const LinuxLogo = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width="16"
    height="16"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6.2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5.1-1.3.6-3.4 1.5-3.2 2.9.1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7.1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9.6 7.9 1.2 11.8 1.2 8.1 2.5 15.7.8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1.6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3.4-8.2-4.4-17.3-15.5-29.7zM223.7 87.3c9.8-22.2 34.2-21.8 44-.4 6.5 14.2 3.6 30.9-4.3 40.4-1.6-.8-5.9-2.6-12.6-4.9 1.1-1.2 3.1-2.7 3.9-4.6 4.8-11.8-.2-27-9.1-27.3-7.3-.5-13.9 10.8-11.8 23-4.1-2-9.4-3.5-13-4.4-1-6.9-.3-14.6 2.9-21.8zM183 75.8c10.1 0 20.8 14.2 19.1 33.5-3.5 1-7.1 2.5-10.2 4.6 1.2-8.9-3.3-20.1-9.6-19.6-8.4.7-9.8 21.2-1.8 28.1 1 .8 1.9-.2-5.9 5.5-15.6-14.6-10.5-52.1 8.4-52.1zm-13.6 60.7c6.2-4.6 13.6-10 14.1-10.5 4.7-4.4 13.5-14.2 27.9-14.2 7.1 0 15.6 2.3 25.9 8.9 6.3 4.1 11.3 4.4 22.6 9.3 8.4 3.5 13.7 9.7 10.5 18.2-2.6 7.1-11 14.4-22.7 18.1-11.1 3.6-19.8 16-38.2 14.9-3.9-.2-7-1-9.6-2.1-8-3.5-12.2-10.4-20-15-8.6-4.8-13.2-10.4-14.7-15.3-1.4-4.9 0-9 4.2-12.3zm3.3 334c-2.7 35.1-43.9 34.4-75.3 18-29.9-15.8-68.6-6.5-76.5-21.9-2.4-4.7-2.4-12.7 2.6-26.4v-.2c2.4-7.6.6-16-.6-23.9-1.2-7.8-1.8-15 .9-20 3.5-6.7 8.5-9.1 14.8-11.3 10.3-3.7 11.8-3.4 19.6-9.9 5.5-5.7 9.5-12.9 14.3-18 5.1-5.5 10-8.1 17.7-6.9 8.1 1.2 15.1 6.8 21.9 16l19.6 35.6c9.5 19.9 43.1 48.4 41 68.9zm-1.4-25.9c-4.1-6.6-9.6-13.6-14.4-19.6 7.1 0 14.2-2.2 16.7-8.9 2.3-6.2 0-14.9-7.4-24.9-13.5-18.2-38.3-32.5-38.3-32.5-13.5-8.4-21.1-18.7-24.6-29.9s-3-23.3-.3-35.2c5.2-22.9 18.6-45.2 27.2-59.2 2.3-1.7.8 3.2-8.7 20.8-8.5 16.1-24.4 53.3-2.6 82.4.6-20.7 5.5-41.8 13.8-61.5 12-27.4 37.3-74.9 39.3-112.7 1.1.8 4.6 3.2 6.2 4.1 4.6 2.7 8.1 6.7 12.6 10.3 12.4 10 28.5 9.2 42.4 1.2 6.2-3.5 11.2-7.5 15.9-9 9.9-3.1 17.8-8.6 22.3-15 7.7 30.4 25.7 74.3 37.2 95.7 6.1 11.4 18.3 35.5 23.6 64.6 3.3-.1 7 .4 10.9 1.4 13.8-35.7-11.7-74.2-23.3-84.9-4.7-4.6-4.9-6.6-2.6-6.5 12.6 11.2 29.2 33.7 35.2 59 2.8 11.6 3.3 23.7.4 35.7 16.4 6.8 35.9 17.9 30.7 34.8-2.2-.1-3.2 0-4.2 0 3.2-10.1-3.9-17.6-22.8-26.1-19.6-8.6-36-8.6-38.3 12.5-12.1 4.2-18.3 14.7-21.4 27.3-2.8 11.2-3.6 24.7-4.4 39.9-.5 7.7-3.6 18-6.8 29-32.1 22.9-76.7 32.9-114.3 7.2zm257.4-11.5c-.9 16.8-41.2 19.9-63.2 46.5-13.2 15.7-29.4 24.4-43.6 25.5s-26.5-4.8-33.7-19.3c-4.7-11.1-2.4-23.1 1.1-36.3 3.7-14.2 9.2-28.8 9.9-40.6.8-15.2 1.7-28.5 4.2-38.7 2.6-10.3 6.6-17.2 13.7-21.1.3-.2.7-.3 1-.5.8 13.2 7.3 26.6 18.8 29.5 12.6 3.3 30.7-7.5 38.4-16.3 9-.3 15.7-.9 22.6 5.1 9.9 8.5 7.1 30.3 17.1 41.6 10.6 11.6 14 19.5 13.7 24.6zM173.3 148.7c2 1.9 4.7 4.5 8 7.1 6.6 5.2 15.8 10.6 27.3 10.6 11.6 0 22.5-5.9 31.8-10.8 4.9-2.6 10.9-7 14.8-10.4s5.9-6.3 3.1-6.6-2.6 2.6-6 5.1c-4.4 3.2-9.7 7.4-13.9 9.8-7.4 4.2-19.5 10.2-29.9 10.2s-18.7-4.8-24.9-9.7c-3.1-2.5-5.7-5-7.7-6.9-1.5-1.4-1.9-4.6-4.3-4.9-1.4-.1-1.8 3.7 1.7 6.5z"/>
  </svg>
);

// 自定义Windows图标组件
const WindowsLogo = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
  </svg>
);

// 自定义Mac命令键图标组件
const MacCommandIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    {...props}
  >
    <path d="M16 5h-2c-.55 0-1 .45-1 1v2h-2V6c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1v2H5c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2v2H5c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2h2v2c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2h2c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1h-2v-2h2c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1zm-4 6h-2v-2h2v2z" />
  </svg>
);

// 自定义Macbook图标组件
const MacbookIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M21 14.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9.5M3 18h18a1 1 0 0 0 1-1v-2.5H2V17a1 1 0 0 0 1 1Z" />
  </svg>
);

// 自定义Mac访达(Finder)图标组件
const MacFinderIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    {...props}
  >
    {/* 外框 */}
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1" />
    
    {/* 左脸填充-深色 */}
    <path d="M2 7v10c0 2.76 2.24 5 5 5h5.5V2H7C4.24 2 2 4.24 2 7z" fill="currentColor" fillOpacity="0.25" />
    
    {/* 右脸填充-浅色 */}
    <path d="M12.5 2H17c2.76 0 5 2.24 5 5v10c0 2.76-2.24 5-5 5h-4.5V2z" fill="currentColor" fillOpacity="0.08" />
    
    {/* 左眼 */}
    <rect x="7" y="7" width="1.5" height="4" rx="0.75" fill="currentColor" />
    
    {/* 右眼 */}
    <rect x="15.5" y="7" width="1.5" height="4" rx="0.75" fill="currentColor" />
    
    {/* 微笑线 */}
    <path d="M6 15.5c0 2.5 3 4.5 6 4.5s6-2 6-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* 分割线 */}
    <path d="M12.5 2v10c0 0.28 0.22 0.5 0.5 0.5h4.5v9.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

// 平台映射表
const PLATFORM_MAP = {
  "1": { name: "网页端", icon: Globe },
  "2": { name: "iOS", icon: AppleLogo },
  "3": { name: "Android", icon: AndroidLogo },
  "4": { name: "Mac", icon: MacFinderIcon },
  "5": { name: "Linux", icon: LinuxLogo },
  "6": { name: "Windows", icon: WindowsLogo },
  "7": { name: "移动端", icon: Smartphone },
  "8": { name: "桌面端", icon: Monitor },
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
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  
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
  
  // 处理"报告问题"按钮点击
  const handleReportClick = () => {
    setIsReportModalOpen(true)
  }
  
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

          {/* 重新设计的工具详情头部 */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 mb-6">
            {/* 左侧：图标和基本信息 */}
            <div className="flex flex-col items-center lg:items-start lg:flex-row gap-6 flex-1">
              {/* 工具图标 - 大尺寸无背景版本 */}
              <div className="relative h-36 w-36 flex-shrink-0 flex items-center justify-center">
                  <Image
                  src={basicInfo.logo || "/placeholder.svg?height=120&width=120"}
                    alt={basicInfo.name}
                  width={140}
                  height={140}
                  className="object-contain max-h-full max-w-full"
                  priority
                  />
                </div>
                
              {/* 工具信息容器 */}
              <div className="flex-1 text-center lg:text-left">
                {/* 标题区域和标签 */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {basicInfo.name}
                    </h1>
                    
                  {/* 热度标签 - 更现代的渐变设计 */}
                    {basicInfo.heatLevel > 3 && (
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center shadow-sm">
                        <Flame className="h-3 w-3 mr-1" />
                        热门
                      </div>
                    )}
                  </div>
                  
                {/* 分类标签 - 更柔和的背景和边框 */}
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                  {/* 1. 子分类标签 */}
                  <Badge 
                    variant="secondary" 
                    className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-3 py-1 border border-indigo-100 dark:border-indigo-800/30"
                  >
                        <Tag className="h-3 w-3 mr-1.5" />
                    {basicInfo.subcategoryName || basicInfo.categoryName}
                      </Badge>

                  {/* 2. 新上线标签 - 现代风格 */}
                  {basicInfo.isNew === 1 && (
                    <Badge 
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 border border-blue-100 dark:border-blue-800/30"
                    >
                      <Sparkles className="h-3 w-3 mr-1.5" />
                      新上线
                    </Badge>
                  )}

                  {/* 3. 价格类型标签 - 现代风格 */}
                  {basicInfo.priceType === 1 ? (
                    <Badge 
                      variant="secondary"
                      className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 border border-green-100 dark:border-green-800/30"
                    >
                      <DollarSign className="h-3 w-3 mr-1.5" />
                      免费
                    </Badge>
                  ) : basicInfo.priceType !== 1 && (
                    <Badge 
                      variant="secondary"
                      className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1 border border-amber-100 dark:border-amber-800/30"
                    >
                      <DollarSign className="h-3 w-3 mr-1.5" />
                      {basicInfo.priceTypeText || PRICE_TYPE_MAP[basicInfo.priceType] || "未知"}
                    </Badge>
                  )}
                </div>
                
                {/* 描述文本 - 改善行高和字体权重 */}
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed max-w-2xl">
                  {basicInfo.shortDescription}
                </p>
                
                {/* 元数据行 - 采用现代清爽风格的图标和文本 */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                    <span>更新: {basicInfo.updateTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1.5 text-gray-400" />
                    <span>{basicInfo.viewCount || 0} 次浏览</span>
                  </div>
                  {basicInfo.heatDesc && (
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1.5 text-gray-400" />
                      <span>{basicInfo.heatDesc}</span>
                    </div>
                    )}
                  </div>
                  
                {/* 平台支持图标 - 移至最下方 */}
                  {basicInfo.platforms && basicInfo.platforms.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-2">
                        {basicInfo.platforms.map((platformId) => {
                          const platformKey = String(platformId);
                          const defaultPlatform = { name: `平台${platformKey}`, icon: Globe };
                          const platform = PLATFORM_MAP[platformKey as keyof typeof PLATFORM_MAP] || defaultPlatform;
                          const PlatformIcon = platform.icon;
                          
                          return (
                        <div 
                          key={platformId}
                          className="flex items-center px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          <PlatformIcon className={`${platformKey === "4" ? "h-5 w-5" : "h-4 w-4"} text-gray-700 dark:text-gray-300 mr-1.5`} />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{platform.name}</span>
                            </div>
                          );
                        })}
                    </div>
                  )}
              </div>
            </div>
            
            {/* 右侧：操作按钮区域 */}
            <div className="flex flex-col gap-3 w-full lg:w-auto lg:min-w-[220px]">
              <Button 
                asChild 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 h-12 w-full shadow-md hover:shadow-lg transition-colors border-2 border-blue-600 hover:border-blue-700"
              >
                <Link href={basicInfo.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  访问官网
                </Link>
              </Button>
              
              <div className="flex gap-3 w-full">
                <Button 
                  variant="outline"
                  className={`h-12 flex-1 border-2 transition-colors ${
                    isSaved 
                      ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 hover:text-white' 
                      : 'bg-white text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-600 hover:border-blue-600 hover:text-white'
                  }`}
                  onClick={toggleSave}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="h-5 w-5 mr-2" />
                      收藏
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-5 w-5 mr-2" />
                      收藏
                    </>
                  )}
                </Button>
                
                <ShareButtons toolName={basicInfo.name} />
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12 border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  onClick={handleReportClick}
                  aria-label="报告问题"
                  title="报告问题"
                >
                  <AlertCircle className="h-5 w-5" />
                </Button>
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

      {/* 工具问题报告模态框 */}
      <ToolReportModal
        toolId={params?.id || ""}
        isOpen={isReportModalOpen}
        onOpenChange={setIsReportModalOpen}
      />
    </div>
  )
} 