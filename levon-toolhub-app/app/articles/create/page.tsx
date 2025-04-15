"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  Crop, 
  Clock, 
  Eye, 
  MessageSquare,
  Maximize2,
  Bold,
  Italic,
  Underline,
  Code,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image,
  Table,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Quote
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

// 分类选项
const categories = [
  { 
    id: "ai-tools", 
    name: "AI 工具",
    subcategories: [
      { id: "ai-chat", name: "AI 聊天" },
      { id: "ai-image", name: "AI 图像生成" },
      { id: "ai-video", name: "AI 视频生成" },
      { id: "ai-audio", name: "AI 音频生成" },
      { id: "ai-writing", name: "AI 写作" },
      { id: "ai-coding", name: "AI 编程" },
      { id: "ai-other", name: "其他 AI 工具" }
    ] 
  },
  { 
    id: "web-tools", 
    name: "Web 工具",
    subcategories: [
      { id: "web-design", name: "Web 设计" },
      { id: "web-productivity", name: "生产力工具" },
      { id: "web-marketing", name: "营销工具" },
      { id: "web-analytics", name: "分析工具" },
      { id: "web-seo", name: "SEO 工具" },
      { id: "web-cms", name: "内容管理系统" },
      { id: "web-other", name: "其他 Web 工具" }
    ] 
  },
  { 
    id: "app-tools", 
    name: "App 工具",
    subcategories: [
      { id: "app-design", name: "App 设计" },
      { id: "app-productivity", name: "移动生产力" },
      { id: "app-communication", name: "通讯工具" },
      { id: "app-education", name: "教育应用" },
      { id: "app-finance", name: "金融工具" },
      { id: "app-lifestyle", name: "生活方式" },
      { id: "app-other", name: "其他 App 工具" }
    ] 
  },
  { 
    id: "developer-tools", 
    name: "开发者工具",
    subcategories: [
      { id: "dev-ide", name: "IDE 编辑器" },
      { id: "dev-framework", name: "开发框架" },
      { id: "dev-database", name: "数据库工具" },
      { id: "dev-testing", name: "测试工具" },
      { id: "dev-devops", name: "DevOps 工具" },
      { id: "dev-api", name: "API 工具" },
      { id: "dev-other", name: "其他开发工具" }
    ] 
  },
]

// 工具选项（示例数据）
const tools = [
  { id: "chatgpt", name: "ChatGPT", category: "ai-tools", subcategory: "ai-chat" },
  { id: "claude", name: "Claude", category: "ai-tools", subcategory: "ai-chat" },
  { id: "midjourney", name: "Midjourney", category: "ai-tools", subcategory: "ai-image" },
  { id: "dall-e", name: "DALL-E", category: "ai-tools", subcategory: "ai-image" },
  { id: "stable-diffusion", name: "Stable Diffusion", category: "ai-tools", subcategory: "ai-image" },
  { id: "runway", name: "Runway", category: "ai-tools", subcategory: "ai-video" },
  { id: "synthesia", name: "Synthesia", category: "ai-tools", subcategory: "ai-video" },
  { id: "eleven-labs", name: "Eleven Labs", category: "ai-tools", subcategory: "ai-audio" },
  { id: "play-ht", name: "Play.ht", category: "ai-tools", subcategory: "ai-audio" },
  { id: "jasper", name: "Jasper", category: "ai-tools", subcategory: "ai-writing" },
  { id: "copy-ai", name: "Copy.ai", category: "ai-tools", subcategory: "ai-writing" },
  { id: "github-copilot", name: "GitHub Copilot", category: "ai-tools", subcategory: "ai-coding" },
  { id: "codeium", name: "Codeium", category: "ai-tools", subcategory: "ai-coding" },
  
  { id: "figma", name: "Figma", category: "web-tools", subcategory: "web-design" },
  { id: "webflow", name: "Webflow", category: "web-tools", subcategory: "web-design" },
  { id: "canva", name: "Canva", category: "web-tools", subcategory: "web-design" },
  { id: "notion", name: "Notion", category: "web-tools", subcategory: "web-productivity" },
  { id: "airtable", name: "Airtable", category: "web-tools", subcategory: "web-productivity" },
  { id: "hubspot", name: "HubSpot", category: "web-tools", subcategory: "web-marketing" },
  { id: "mailchimp", name: "Mailchimp", category: "web-tools", subcategory: "web-marketing" },
  { id: "google-analytics", name: "Google Analytics", category: "web-tools", subcategory: "web-analytics" },
  { id: "hotjar", name: "Hotjar", category: "web-tools", subcategory: "web-analytics" },
  { id: "semrush", name: "SEMrush", category: "web-tools", subcategory: "web-seo" },
  { id: "ahrefs", name: "Ahrefs", category: "web-tools", subcategory: "web-seo" },
  { id: "wordpress", name: "WordPress", category: "web-tools", subcategory: "web-cms" },
  { id: "shopify", name: "Shopify", category: "web-tools", subcategory: "web-cms" },
  
  { id: "sketch", name: "Sketch", category: "app-tools", subcategory: "app-design" },
  { id: "adobe-xd", name: "Adobe XD", category: "app-tools", subcategory: "app-design" },
  { id: "proto-io", name: "Proto.io", category: "app-tools", subcategory: "app-design" },
  { id: "evernote", name: "Evernote", category: "app-tools", subcategory: "app-productivity" },
  { id: "todoist", name: "Todoist", category: "app-tools", subcategory: "app-productivity" },
  { id: "slack", name: "Slack", category: "app-tools", subcategory: "app-communication" },
  { id: "zoom", name: "Zoom", category: "app-tools", subcategory: "app-communication" },
  { id: "discord", name: "Discord", category: "app-tools", subcategory: "app-communication" },
  { id: "duolingo", name: "Duolingo", category: "app-tools", subcategory: "app-education" },
  { id: "coursera", name: "Coursera", category: "app-tools", subcategory: "app-education" },
  { id: "mint", name: "Mint", category: "app-tools", subcategory: "app-finance" },
  { id: "robinhood", name: "Robinhood", category: "app-tools", subcategory: "app-finance" },
  
  { id: "vscode", name: "VS Code", category: "developer-tools", subcategory: "dev-ide" },
  { id: "intellij", name: "IntelliJ IDEA", category: "developer-tools", subcategory: "dev-ide" },
  { id: "sublime-text", name: "Sublime Text", category: "developer-tools", subcategory: "dev-ide" },
  { id: "react", name: "React", category: "developer-tools", subcategory: "dev-framework" },
  { id: "vue", name: "Vue.js", category: "developer-tools", subcategory: "dev-framework" },
  { id: "angular", name: "Angular", category: "developer-tools", subcategory: "dev-framework" },
  { id: "mongodb", name: "MongoDB", category: "developer-tools", subcategory: "dev-database" },
  { id: "postgresql", name: "PostgreSQL", category: "developer-tools", subcategory: "dev-database" },
  { id: "jest", name: "Jest", category: "developer-tools", subcategory: "dev-testing" },
  { id: "cypress", name: "Cypress", category: "developer-tools", subcategory: "dev-testing" },
  { id: "docker", name: "Docker", category: "developer-tools", subcategory: "dev-devops" },
  { id: "kubernetes", name: "Kubernetes", category: "developer-tools", subcategory: "dev-devops" },
  { id: "github", name: "GitHub", category: "developer-tools", subcategory: "dev-devops" },
  { id: "postman", name: "Postman", category: "developer-tools", subcategory: "dev-api" },
  { id: "swagger", name: "Swagger", category: "developer-tools", subcategory: "dev-api" },
]

// 热门标签（示例数据）
const hotTags = [
  { id: "ai-tools", name: "AI Tools", count: 24 },
  { id: "productivity", name: "Productivity", count: 18 },
  { id: "design", name: "Design", count: 15 },
  { id: "development", name: "Development", count: 22 },
  { id: "marketing", name: "Marketing", count: 12 },
  { id: "automation", name: "Automation", count: 9 },
  { id: "no-code", name: "No-Code", count: 7 },
  { id: "open-source", name: "Open Source", count: 11 },
]

// 封面模板选项
const coverTemplates = [
  { id: 1, name: "简约蓝", thumbnail: "/placeholder.svg?height=100&width=200", color: "bg-blue-600" },
  { id: 2, name: "渐变紫", thumbnail: "/placeholder.svg?height=100&width=200", color: "bg-gradient-to-r from-purple-600 to-blue-500" },
  { id: 3, name: "极简黑", thumbnail: "/placeholder.svg?height=100&width=200", color: "bg-gray-900" },
  { id: 4, name: "活力橙", thumbnail: "/placeholder.svg?height=100&width=200", color: "bg-orange-500" },
]

// Markdown编辑器工具栏项目
const editorTools = [
  { icon: <Bold size={16} />, name: "粗体", shortcut: "Ctrl+B" },
  { icon: <Italic size={16} />, name: "斜体", shortcut: "Ctrl+I" },
  { icon: <Type size={16} />, name: "标题", shortcut: "Ctrl+H" },
  { icon: <Quote size={16} />, name: "引用", shortcut: "Ctrl+Q" },
  { icon: <Code size={16} />, name: "代码", shortcut: "Ctrl+K" },
  { icon: <List size={16} />, name: "无序列表", shortcut: "Ctrl+U" },
  { icon: <ListOrdered size={16} />, name: "有序列表", shortcut: "Ctrl+O" },
  { icon: <LinkIcon size={16} />, name: "链接", shortcut: "Ctrl+L" },
  { icon: <Image size={16} />, name: "图片", shortcut: "Ctrl+P" },
  { icon: <Table size={16} />, name: "表格", shortcut: "" },
]

export default function CreateArticlePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [toolSearchQuery, setToolSearchQuery] = useState("")
  const [activeToolCategory, setActiveToolCategory] = useState("")
  const [activeToolSubcategory, setActiveToolSubcategory] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [content, setContent] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [readTime, setReadTime] = useState(0)
  const [uploadedCover, setUploadedCover] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [isAIGenerating, setIsAIGenerating] = useState(false)
  const [publishSetting, setPublishSetting] = useState({
    visibility: "public",
    enableComments: true,
    scheduleTime: null,
  })
  const [isDraft, setIsDraft] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [activeEditorTab, setActiveEditorTab] = useState("write")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)
  const [toolPopoverOpen, setToolPopoverOpen] = useState(false)
  const [tagPopoverOpen, setTagPopoverOpen] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<HTMLTextAreaElement>(null)
  
  // 获取当前工具选择器中的子分类
  const currentToolSubcategories = categories.find(cat => cat.id === activeToolCategory)?.subcategories || []
  
  // 根据工具选择器中的分类和子分类筛选工具
  const filteredTools = useMemo(() => {
    if (!activeToolSubcategory) return [];
    
    let filtered = tools.filter(tool => 
      tool.category === activeToolCategory && tool.subcategory === activeToolSubcategory
    );
    
    // 如果有搜索查询，进一步筛选
    if (toolSearchQuery) {
      const query = toolSearchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [activeToolCategory, activeToolSubcategory, toolSearchQuery]);
  
  // 计算字数和阅读时间
  useEffect(() => {
    const words = content.trim().split(/\s+/).length
    setWordCount(words)
    
    // 假设平均阅读速度为每分钟200字
    const time = Math.ceil(words / 200)
    setReadTime(time || 1) // 至少1分钟
  }, [content])
  
  // 自动保存功能
  useEffect(() => {
    const interval = setInterval(() => {
      if (title || content) {
        // 这里应该实现实际的保存逻辑
        console.log("自动保存内容...", { title, content })
        setLastSaved(new Date())
      }
    }, 30000) // 每30秒保存一次
    
    return () => clearInterval(interval)
  }, [title, content])
  
  // 处理文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedCover(e.target?.result as string)
        setSelectedTemplate(null) // 清除已选模板
      }
      reader.readAsDataURL(file)
    }
  }
  
  // 触发文件选择
  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }
  
  // 选择模板
  const selectTemplate = (templateId: number) => {
    setSelectedTemplate(templateId)
    setUploadedCover(null) // 清除已上传图片
  }
  
  // 使用AI生成封面
  const generateAICover = () => {
    if (!title) {
      alert("请先输入文章标题，以便AI生成相关封面")
      return
    }
    
    setIsAIGenerating(true)
    
    // 模拟AI生成过程
    setTimeout(() => {
      setUploadedCover("/placeholder.svg?height=500&width=1200&text=AI生成的封面")
      setSelectedTemplate(null)
      setIsAIGenerating(false)
    }, 2000)
  }
  
  // 添加选中的工具
  const addTool = (toolId: string) => {
    if (!selectedTools.includes(toolId)) {
      setSelectedTools([...selectedTools, toolId])
    }
    // 添加工具后立即关闭选择框
    setToolPopoverOpen(false)
  }
  
  // 移除选中的工具
  const removeTool = (toolId: string) => {
    // 删除限制，允许移除所有工具
    setSelectedTools(selectedTools.filter(id => id !== toolId));
  }
  
  // 添加选中的标签
  const addTag = (tagId: string) => {
    if (!selectedTags.includes(tagId)) {
      setSelectedTags([...selectedTags, tagId])
    }
    // 添加标签后立即关闭选择框
    setTagPopoverOpen(false)
  }
  
  // 移除选中的标签
  const removeTag = (tagId: string) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId))
  }
  
  // 保存为草稿
  const saveDraft = () => {
    setIsDraft(true)
    // 这里应该实现实际的保存逻辑
    console.log("保存为草稿", { title, content, selectedTools, selectedTags })
    setLastSaved(new Date())
    alert("草稿已保存")
  }
  
  // 发布文章
  const publishArticle = () => {
    if (!title) {
      alert("请输入文章标题")
      return
    }
    
    // 移除对工具选择的验证
    // if (selectedTools.length === 0) {
    //   alert("请至少选择一个关联工具")
    //   return
    // }
    
    if (!content || content.length < 50) {
      alert("文章内容太短，请至少输入50个字符")
      return
    }
    
    // 这里应该实现实际的发布逻辑
    console.log("发布文章", { 
      title, 
      content, 
      selectedTools,
      selectedTags,
      coverImage: uploadedCover || selectedTemplate,
      publishSetting
    })
    
    setSuccessDialogOpen(true)
  }
  
  // 切换全屏模式
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }
  
  // 插入Markdown格式文本
  const insertMarkdownFormat = (format: string) => {
    if (!editorRef.current) return
    
    const textarea = editorRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    
    let newText = content
    switch(format) {
      case 'bold':
        newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end)
        break
      case 'italic':
        newText = content.substring(0, start) + `*${selectedText}*` + content.substring(end)
        break
      case 'heading':
        newText = content.substring(0, start) + `## ${selectedText}` + content.substring(end)
        break
      case 'quote':
        newText = content.substring(0, start) + `> ${selectedText}` + content.substring(end)
        break
      case 'code':
        newText = content.substring(0, start) + "```\n" + selectedText + "\n```" + content.substring(end)
        break
      case 'unordered-list':
        newText = content.substring(0, start) + `- ${selectedText}` + content.substring(end)
        break
      case 'ordered-list':
        newText = content.substring(0, start) + `1. ${selectedText}` + content.substring(end)
        break
      case 'link':
        newText = content.substring(0, start) + `[${selectedText || '链接文本'}](https://example.com)` + content.substring(end)
        break
      case 'image':
        newText = content.substring(0, start) + `![${selectedText || '图片描述'}](https://example.com/image.jpg)` + content.substring(end)
        break
      case 'table':
        newText = content.substring(0, start) + 
          "| 标题1 | 标题2 | 标题3 |\n| --- | --- | --- |\n| 内容1 | 内容2 | 内容3 |" + 
          content.substring(end)
        break
    }
    
    setContent(newText)
    
    // 设置光标位置
    setTimeout(() => {
      textarea.focus()
      if (selectedText) {
        const newPosition = start + newText.length - content.length
        textarea.setSelectionRange(newPosition, newPosition)
      } else {
        // 如果没有选中文本，把光标放在添加内容的中间位置
        let cursorPosition
        switch(format) {
          case 'bold':
            cursorPosition = start + 2
            break
          case 'italic':
            cursorPosition = start + 1
            break
          case 'heading':
            cursorPosition = start + 3
            break
          case 'link':
            cursorPosition = start + 1
            break
          case 'image':
            cursorPosition = start + 2
            break
          default:
            cursorPosition = start
        }
        textarea.setSelectionRange(cursorPosition, cursorPosition)
      }
    }, 0)
  }
  
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isFullScreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-950' : ''}`}>
      {/* 顶部导航 */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => router.back()}
              className="mr-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-semibold">创建文章</h1>
            
            {lastSaved && (
              <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                上次保存: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={saveDraft}
              className="flex items-center"
            >
              <Save size={16} className="mr-2" />
              保存草稿
            </Button>
            
            <Button 
              size="sm" 
              onClick={publishArticle}
              className="flex items-center bg-blue-600 hover:bg-blue-700"
            >
              <Send size={16} className="mr-2" />
              发布文章
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* 文章基础信息区 */}
        <div className="mb-10 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <Input 
            type="text"
            placeholder="输入文章标题..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto py-2 placeholder:text-gray-400 dark:placeholder:text-gray-600 mb-8"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Label htmlFor="tools" className="block mb-2 text-base">
                关联工具 <span className="text-red-500">*</span>
              </Label>
              <Popover open={toolPopoverOpen} onOpenChange={setToolPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-11"
                  >
                    {selectedTools.length ? (
                      `已选择 ${selectedTools.length} 个工具`
                    ) : (
                      "选择关联工具"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[350px]">
                  <div className="space-y-4">
                    <div className="font-medium">选择关联工具</div>
                    
                    {/* 分类选择器 */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="tool-category" className="text-xs mb-1 block">
                          选择分类
                        </Label>
                        <Select 
                          value={activeToolCategory} 
                          onValueChange={(value) => {
                            setActiveToolCategory(value);
                            setActiveToolSubcategory("");
                          }}
                        >
                          <SelectTrigger id="tool-category" className="h-9 text-sm">
                            <SelectValue placeholder="选择分类" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="tool-subcategory" className="text-xs mb-1 block">
                          选择子分类
                        </Label>
                        <Select 
                          value={activeToolSubcategory} 
                          onValueChange={setActiveToolSubcategory}
                          disabled={!activeToolCategory}
                        >
                          <SelectTrigger id="tool-subcategory" className="h-9 text-sm">
                            <SelectValue placeholder="选择子分类" />
                          </SelectTrigger>
                          <SelectContent>
                            {currentToolSubcategories.map((subcat) => (
                              <SelectItem key={subcat.id} value={subcat.id}>
                                {subcat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <Input 
                      type="search" 
                      placeholder="搜索工具..." 
                      className="mb-2"
                      value={toolSearchQuery}
                      onChange={(e) => setToolSearchQuery(e.target.value)}
                    />
                    
                    {activeToolSubcategory ? (
                      filteredTools.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                          {filteredTools.map((tool) => (
                            <div 
                              key={tool.id} 
                              className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                            >
                              <span>{tool.name}</span>
                              {selectedTools.includes(tool.id) ? (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => removeTool(tool.id)}
                                  className="h-7 px-2"
                                >
                                  移除
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => addTool(tool.id)}
                                  className="h-7 px-2"
                                >
                                  添加
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-4 text-center text-gray-500">
                          {toolSearchQuery ? "未找到匹配的工具" : "该分类下暂无工具"}
                        </div>
                      )
                    ) : (
                      <div className="py-4 text-center text-gray-500">
                        请选择分类和子分类以查看工具
                      </div>
                    )}
                    
                    {/* 已选工具摘要 */}
                    {selectedTools.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <Label className="text-xs mb-2 block">已选择的工具:</Label>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedTools.map((toolId) => {
                              const tool = tools.find(t => t.id === toolId);
                              return (
                                <Badge key={toolId} variant="secondary" className="text-xs py-0.5">
                                  {tool?.name}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              
              {/* 已选择的工具 */}
              {selectedTools.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedTools.map((toolId) => {
                    const tool = tools.find(t => t.id === toolId)
                    return (
                      <Badge 
                        key={toolId}
                        variant="secondary"
                        className="flex items-center gap-1.5 py-1.5"
                      >
                        {tool?.name}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeTool(toolId)} 
                          className="h-4 w-4 p-0 hover:bg-transparent"
                        >
                          ✕
                        </Button>
                      </Badge>
                    )
                  })}
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="tags" className="block mb-2 text-base">
                添加标签
              </Label>
              <Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-11"
                  >
                    {selectedTags.length 
                      ? `已选择 ${selectedTags.length} 个标签` 
                      : "从热门标签中选择"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div className="font-medium">热门标签</div>
                    <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                      {hotTags.map((tag) => (
                        <div 
                          key={tag.id} 
                          className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <span>{tag.name}</span>
                            <span className="text-xs text-gray-500">({tag.count})</span>
                          </div>
                          {selectedTags.includes(tag.id) ? (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => removeTag(tag.id)}
                              className="h-7 px-2"
                            >
                              移除
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => addTag(tag.id)}
                              className="h-7 px-2"
                            >
                              添加
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              {/* 已选择的标签 */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedTags.map((tagId) => {
                    const tag = hotTags.find(t => t.id === tagId)
                    return (
                      <Badge 
                        key={tagId}
                        variant="secondary"
                        className="flex items-center gap-1.5 py-1.5"
                      >
                        {tag?.name}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeTag(tagId)} 
                          className="h-4 w-4 p-0 hover:bg-transparent"
                        >
                          ✕
                        </Button>
                      </Badge>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 封面图设置区 */}
        <div className="mb-10 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">文章封面</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div 
                className={`
                  relative w-full h-64 md:h-80 border-2 border-dashed rounded-lg 
                  flex items-center justify-center overflow-hidden
                  ${!uploadedCover && !selectedTemplate ? 'border-gray-300 dark:border-gray-700' : 'border-transparent'}
                  transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700
                `}
                onClick={triggerFileUpload}
              >
                {uploadedCover ? (
                  <img 
                    src={uploadedCover} 
                    alt="Cover preview" 
                    className="w-full h-full object-cover"
                  />
                ) : selectedTemplate ? (
                  <div 
                    className={`w-full h-full flex items-center justify-center ${coverTemplates.find(t => t.id === selectedTemplate)?.color}`}
                  >
                    <h3 className="text-2xl text-white font-bold px-6 text-center">{title || "文章标题预览"}</h3>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <ImageIcon size={56} className="mx-auto mb-6 text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400 mb-3 font-medium">
                      点击或拖拽图片至此处上传
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      推荐尺寸: 1200 x 600 像素
                    </p>
                  </div>
                )}
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload} 
              />
            </div>
            
            <div className="lg:col-span-2 space-y-5">
              <h3 className="font-medium text-lg mb-2">封面选项</h3>
              
              <div>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-11" 
                  onClick={triggerFileUpload}
                >
                  <Upload size={18} className="mr-2" />
                  上传图片
                </Button>
              </div>
              
              <div>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-11" 
                  onClick={generateAICover}
                  disabled={isAIGenerating}
                >
                  {isAIGenerating ? (
                    <>
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} className="mr-2" />
                      AI生成封面
                    </>
                  )}
                </Button>
              </div>
              
              <Separator className="my-5" />
              
              <h3 className="font-medium text-lg mb-2">封面模板</h3>
              <div className="grid grid-cols-2 gap-3">
                {coverTemplates.map((template) => (
                  <button
                    key={template.id}
                    className={`
                      relative h-16 rounded-md overflow-hidden transition-all
                      ${selectedTemplate === template.id ? 'ring-2 ring-blue-500 transform scale-105' : 'hover:transform hover:scale-105'}
                    `}
                    onClick={() => selectTemplate(template.id)}
                  >
                    <div className={`w-full h-full ${template.color}`}></div>
                    <span className="absolute bottom-1 right-1 text-xs text-white bg-black/50 rounded px-1">
                      {template.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Markdown编辑器 */}
        <div className={`mb-10 ${isFullScreen ? 'pt-16' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">文章内容</h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="mr-4">{wordCount} 字</span>
                <span>阅读时间 ~{readTime} 分钟</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleFullScreen}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Maximize2 size={18} />
              </Button>
            </div>
          </div>
          
          <div className="border rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
            {/* 编辑器工具栏 */}
            <div className="border-b flex items-center px-3 py-2 overflow-x-auto bg-gray-50 dark:bg-gray-900">
              {editorTools.map((tool, idx) => (
                <TooltipProvider key={idx}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 rounded-md mx-0.5"
                        onClick={() => {
                          switch(idx) {
                            case 0: insertMarkdownFormat('bold'); break;
                            case 1: insertMarkdownFormat('italic'); break;
                            case 2: insertMarkdownFormat('heading'); break;
                            case 3: insertMarkdownFormat('quote'); break;
                            case 4: insertMarkdownFormat('code'); break;
                            case 5: insertMarkdownFormat('unordered-list'); break;
                            case 6: insertMarkdownFormat('ordered-list'); break;
                            case 7: insertMarkdownFormat('link'); break;
                            case 8: insertMarkdownFormat('image'); break;
                            case 9: insertMarkdownFormat('table'); break;
                          }
                        }}
                      >
                        {tool.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-xs">
                        <p>{tool.name}</p>
                        {tool.shortcut && (
                          <p className="text-gray-500">{tool.shortcut}</p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            
            {/* 编辑器内容区 */}
            <Tabs value={activeEditorTab} onValueChange={setActiveEditorTab}>
              <TabsList className="px-4 pt-3 bg-transparent">
                <TabsTrigger value="write" className="px-6">编辑</TabsTrigger>
                <TabsTrigger value="preview" className="px-6">预览</TabsTrigger>
              </TabsList>
              
              <TabsContent value="write" className="p-0 m-0">
                <Textarea 
                  ref={editorRef}
                  placeholder="开始撰写你的文章内容..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[450px] rounded-none border-0 resize-none focus-visible:ring-0 font-mono p-4"
                />
              </TabsContent>
              
              <TabsContent value="preview" className="p-6 m-0 min-h-[450px]">
                {content ? (
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {/* 这里应该渲染Markdown内容，为简单起见，我们只显示原始内容 */}
                    <div className="whitespace-pre-wrap">{content}</div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                    <p>暂无内容可预览</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* 发布设置区 */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">发布设置</h2>
          
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-medium mb-3 flex items-center text-base">
                    <Clock size={18} className="mr-2" />
                    发布时间
                  </h3>
                  <Select 
                    defaultValue="now"
                    onValueChange={(value) => {
                      if (value === "scheduled") {
                        // 打开时间选择器（实际实现可能不同）
                        alert("此功能尚未实现：选择定时发布时间")
                      }
                    }}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="选择发布时间" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">立即发布</SelectItem>
                      <SelectItem value="scheduled">定时发布</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 flex items-center text-base">
                    <Eye size={18} className="mr-2" />
                    可见性
                  </h3>
                  <Select 
                    defaultValue="public"
                    onValueChange={(value) => {
                      setPublishSetting({...publishSetting, visibility: value})
                    }}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="选择可见性" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">公开</SelectItem>
                      <SelectItem value="private">仅自己可见</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3 flex items-center text-base">
                    <MessageSquare size={18} className="mr-2" />
                    评论
                  </h3>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 p-3 rounded-md h-11">
                    <span className="text-sm font-medium">允许评论</span>
                    <Switch 
                      checked={publishSetting.enableComments}
                      onCheckedChange={(checked) => {
                        setPublishSetting({...publishSetting, enableComments: checked})
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* 发布成功对话框 */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>文章发布成功！</DialogTitle>
            <DialogDescription>
              你的文章已成功发布，现在可以在文章列表页看到它。
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </motion.div>
          </div>
          <DialogFooter className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => router.back()} className="flex-1">
              返回文章列表
            </Button>
            <Button onClick={() => router.push(`/articles/1`)} className="flex-1 bg-blue-600 hover:bg-blue-700">
              查看文章
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 