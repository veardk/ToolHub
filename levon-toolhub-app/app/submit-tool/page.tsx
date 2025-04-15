"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Info, 
  Save, 
  Send, 
  ChevronLeft,
  Wrench,
  Code,
  Lightbulb,
  Star,
  Palette,
  ChevronRight,
  FileText,
  ListChecks
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { toast } from "sonner"

// Sample data for categories and subcategories
const categories = [
  {
    id: "ai-tools",
    name: "AI工具",
    subcategories: [
      { id: "image-generation", name: "图像生成" },
      { id: "writing-content", name: "写作与内容" },
      { id: "audio-voice", name: "音频与语音" },
      { id: "video-generation", name: "视频生成" },
      { id: "chatbots", name: "聊天机器人与助手" },
      { id: "data-analysis", name: "数据分析" },
      { id: "code-generation", name: "代码生成" },
      { id: "research", name: "研究与学习" },
    ],
  },
  {
    id: "web-tools",
    name: "网页工具",
    subcategories: [
      { id: "productivity", name: "生产力" },
      { id: "design", name: "设计与创意" },
      { id: "communication", name: "通信" },
      { id: "file-management", name: "文件管理" },
      { id: "browser-extensions", name: "浏览器扩展" },
      { id: "seo", name: "SEO与分析" },
    ],
  },
  {
    id: "app-tools",
    name: "应用工具",
    subcategories: [
      { id: "productivity", name: "生产力" },
      { id: "communication", name: "通信" },
      { id: "photo-video", name: "照片与视频" },
      { id: "health-fitness", name: "健康与健身" },
      { id: "finance", name: "金融" },
      { id: "education", name: "教育" },
    ],
  },
  {
    id: "developer-tools",
    name: "开发者工具",
    subcategories: [
      { id: "code-editors", name: "代码编辑器" },
      { id: "frameworks", name: "框架" },
      { id: "version-control", name: "版本控制" },
      { id: "testing", name: "测试" },
      { id: "deployment", name: "部署" },
      { id: "databases", name: "数据库" },
      { id: "apis", name: "API接口" },
      { id: "devops", name: "DevOps" },
    ],
  },
]

// Sample data for tags
const availableTags = [
  "免费",
  "付费",
  "部分免费",
  "开源",
  "生产力",
  "设计",
  "开发",
  "营销",
  "分析",
  "通信",
  "协作",
  "AI",
  "机器学习",
  "自动化",
  "移动",
  "桌面",
  "网页",
  "跨平台",
  "API",
  "插件",
  "扩展",
]

// 定义表单数据接口
interface ToolFormData {
  name: string;
  website: string;
  category: string;
  subcategory: string;
  priceType: string;
  shortDescription: string;
}

export default function SubmitToolPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ToolFormData>({
    name: "",
    website: "",
    category: "",
    subcategory: "",
    priceType: "free",
    shortDescription: ""
  })
  const [subcategories, setSubcategories] = useState<{ id: string; name: string }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCategoryChange = (value: string) => {
    const category = categories.find((c) => c.id === value)
    setFormData({ ...formData, category: value, subcategory: "" })
    setSubcategories(category?.subcategories || [])
  }

  const handleSaveDraft = () => {
    localStorage.setItem("toolSubmissionDraft", JSON.stringify(formData))
    toast.success("草稿已保存")
  }

  const loadDraft = () => {
    const savedDraft = localStorage.getItem("toolSubmissionDraft")
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft) as ToolFormData
        setFormData(parsedDraft)
        
        if (parsedDraft.category) {
          const category = categories.find((c) => c.id === parsedDraft.category)
          setSubcategories(category?.subcategories || [])
        }
      } catch (error) {
        console.error("加载草稿失败:", error)
      }
    }
  }

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.website.trim() !== "" &&
      formData.category.trim() !== "" &&
      formData.subcategory.trim() !== "" &&
      formData.shortDescription.trim() !== ""
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid()) {
      toast.error("请填写所有必填字段")
      return
    }
    
    setIsSubmitting(true)
    
      try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
        localStorage.removeItem("toolSubmissionDraft")
        
      router.push("/submit-tool/success")
      } catch (error) {
      console.error("提交失败:", error)
      toast.error("提交失败，请稍后重试")
    } finally {
        setIsSubmitting(false)
      }
  }

  useEffect(() => {
    loadDraft()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] dark:bg-[#121212] bg-[url('/patterns/dot-pattern.png')] bg-repeat">
      {/* 左上角返回按钮 */}
      <div className="absolute top-4 left-4 z-30">
        <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10" asChild>
          <Link href="/tools">
            <ChevronLeft className="mr-1 h-4 w-4" />
            返回工具库
          </Link>
        </Button>
      </div>

      {/* 页面标题区 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/circuit-board.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="mb-6 flex justify-center">
              <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center">
                <FileText className="h-14 w-14 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">提交工具</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              分享您发现的优质工具，帮助更多人提高效率
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f8f9fa] dark:from-[#121212] to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-8 relative z-20">
        <Card className="bg-white dark:bg-gray-800 border-none shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-8 max-w-3xl mx-auto">
                {/* 审核流程区域 */}
                <div className="mb-8">
                  <div className="flex items-center justify-center">
                    <div className="text-blue-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
            </div>
                  </div>
                  <h2 className="text-xl font-bold text-center mb-2">审核流程</h2>
                  <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
                    我们会认真审核每一个提交的工具，确保其质量和可用性
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-5">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 12H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                  </div>
                      <h3 className="font-semibold text-lg text-center mb-2">初步审核</h3>
                      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        我们将在1-2个工作日内对您提交的工具信息进行初步审核，确认信息是否完整。
                      </p>
            </div>

                    <div className="bg-purple-50/50 dark:bg-purple-900/10 rounded-xl p-5">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-800/30 rounded-full flex items-center justify-center">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                            <path d="M13.1094 6C13.5 4.4 14.9941 3 17 3C19.2091 3 21 4.79086 21 7C21 9.20914 19.2091 11 17 11C15.9224 11 14.9393 10.5725 14.2441 9.875M13.1094 6H6M13.1094 6C13.0367 6.32545 13 6.65952 13 7C13 7.34048 13.0367 7.67455 13.1094 8M14.2441 9.875C14.0799 10.0541 13.9292 10.2439 13.7949 10.4444M14.2441 9.875L19.5 15.5M13.7949 10.4444C13.3152 11.1783 13 12.0541 13 13C13 15.7614 15.2386 18 18 18C19.0284 18 19.9739 17.639 20.7246 17.0201L13.7949 10.4444ZM6 18C3.79086 18 2 16.2091 2 14C2 11.7909 3.79086 10 6 10C8.20914 10 10 11.7909 10 14C10 16.2091 8.20914 18 6 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg text-center mb-2">功能验证</h3>
                      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        我们将访问并测试工具功能，确保其正常运行并符合描述，验证其价值和可用性。
                      </p>
                    </div>
                    
                    <div className="bg-green-50/50 dark:bg-green-900/10 rounded-xl p-5">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                            <path d="M21 11.7678C21 16.1827 17.4183 19.7645 13.0035 19.7645C11.0915 19.7645 9.33286 19.0666 8 17.9102L3 19.7645L4.85396 14.7778C3.70727 13.4513 3.00702 11.7038 3.00702 9.80184C3.00702 5.387 6.58871 1.80518 10.9935 1.80518C15.4089 1.80518 19 5.40127 19 9.81611" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13 19.7645H18.5H19C20.1046 19.7645 21 20.6599 21 21.7645C21 22.869 20.1046 23.7645 19 23.7645H13C11.8954 23.7645 11 22.869 11 21.7645C11 20.6599 11.8954 19.7645 13 19.7645Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M15.5 16.7645L15.5 21.7645" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 16.7645L19 21.7645" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg text-center mb-2">发布上线</h3>
                      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        通过审核的工具将在平台上线，并通过邮件通知您。您的贡献将帮助更多用户发现优质工具。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="tool-name" className="text-base font-medium">
                          工具名称 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="tool-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="输入工具名称"
                        required
                          className="mt-1.5 h-11"
                      />
                    </div>
                    </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      <Code className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="tool-website" className="text-base font-medium">
                          官方网站URL <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="tool-website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://example.com"
                        required
                          className="mt-1.5 h-11"
                      />
                    </div>
                    </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="tool-category" className="text-base font-medium">
                            工具类别 <span className="text-red-500">*</span>
                      </Label>
                          <Select 
                            value={formData.category || undefined} 
                            onValueChange={handleCategoryChange}
                            defaultValue={undefined}
                          >
                            <SelectTrigger id="tool-category" className="mt-1.5 h-11">
                              <SelectValue placeholder="选择工具类别" />
                        </SelectTrigger>
                            <SelectContent position="popper">
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="other">其他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Star className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="tool-subcategory" className="text-base font-medium">
                            工具分类 <span className="text-red-500">*</span>
                      </Label>
                      <Select
                            value={formData.subcategory || undefined}
                            onValueChange={(value) => {
                              setFormData({ ...formData, subcategory: value })
                            }}
                        disabled={!formData.category}
                            defaultValue={undefined}
                      >
                            <SelectTrigger id="tool-subcategory" className="mt-1.5 h-11">
                          <SelectValue
                                placeholder={formData.category ? "选择工具分类" : "请先选择工具类别"}
                          />
                        </SelectTrigger>
                            <SelectContent position="popper">
                          {subcategories.map((subcategory) => (
                            <SelectItem key={subcategory.id} value={subcategory.id}>
                              {subcategory.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="other">其他</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                        </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                      <Palette className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                        <Label className="text-base font-medium mb-2 inline-block">
                          价格类型 <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup
                        value={formData.priceType}
                          onValueChange={(value) => {
                            setFormData({ ...formData, priceType: value })
                          }}
                        className="flex space-x-4 mt-1.5"
                          defaultValue="free"
                        >
                          <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/30 transition-colors">
                          <RadioGroupItem value="free" id="price-free" />
                          <Label htmlFor="price-free" className="cursor-pointer">免费</Label>
                        </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/30 transition-colors">
                          <RadioGroupItem value="paid" id="price-paid" />
                          <Label htmlFor="price-paid" className="cursor-pointer">付费</Label>
                        </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/30 transition-colors">
                          <RadioGroupItem value="freemium" id="price-freemium" />
                          <Label htmlFor="price-freemium" className="cursor-pointer">部分免费</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Info className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="tool-description" className="text-base font-medium">
                          简短描述 <span className="text-red-500">*</span>
                          <span className="text-sm font-normal text-muted-foreground ml-2">
                          (30字以内)
                        </span>
                      </Label>
                        <Input
                        id="tool-description"
                        value={formData.shortDescription}
                        onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                          placeholder="简短描述工具的主要功能"
                          maxLength={30}
                        required
                          className="mt-1.5 h-11"
                        />
                        <div className="text-right text-sm text-muted-foreground mt-1">
                          {formData.shortDescription.length}/30
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 mt-6">
                  <Button type="button" variant="outline" onClick={handleSaveDraft} className="h-11">
                    <Save className="mr-2 h-4 w-4" />
                    保存草稿
                  </Button>
                  
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90 h-11" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                        提交中...
                      </>
                    ) : (
                      <>
                    <Send className="mr-2 h-4 w-4" />
                        提交工具
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
