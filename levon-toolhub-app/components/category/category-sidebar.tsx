"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  PlusCircle, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  DollarSign,
  // 导入常用图标以替代动态导入
  ImageIcon,
  PenLine,
  Mic,
  Video,
  Bot,
  BarChart,
  Code,
  Search,
  Zap,
  Palette,
  MessageSquare,
  FolderIcon,
  Globe,
  TrendingUp,
  Camera,
  Heart,
  Wallet,
  BookOpen,
  ServerIcon,
  GitMerge,
  FlaskConical,
  Rocket,
  Database,
  Cable,
  Settings
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Subcategory } from "@/lib/api"

// 定义子分类数据项类型
interface SubcategoryItem {
  id: string;
  name: string;
  count: number;
  icon: string;
}

// 图标映射
const iconMap: Record<string, React.ComponentType<any>> = {
  // AI工具子分类图标
  "image-generation": ImageIcon,
  "writing-content": PenLine,
  "audio-voice": Mic,
  "video-generation": Video,
  "chatbots": Bot,
  "data-analysis": BarChart,
  "code-generation": Code,
  "research": Search,
  "productivity": Zap,
  
  // 网页工具子分类图标
  "design": Palette,
  "communication": MessageSquare,
  "file-management": FolderIcon,
  "browser-extensions": Globe,
  "seo": TrendingUp,
  
  // 应用工具子分类图标
  "photo-video": Camera,
  "health-fitness": Heart,
  "finance": Wallet,
  "education": BookOpen,
  
  // 开发者工具子分类图标
  "code-editors": Code,
  "frameworks": ServerIcon,
  "version-control": GitMerge,
  "testing": FlaskConical,
  "deployment": Rocket,
  "databases": Database,
  "apis": Cable,
  "devops": Settings,
}

// 样本数据，实际应用中应该从API获取
const subcategories: Record<string, SubcategoryItem[]> = {
  "ai-tools": [
    { id: "image-generation", name: "图像生成", count: 42, icon: "image-generation" },
    { id: "writing-content", name: "写作和内容", count: 38, icon: "writing-content" },
    { id: "audio-voice", name: "音频和语音", count: 27, icon: "audio-voice" },
    { id: "video-generation", name: "视频生成", count: 19, icon: "video-generation" },
    { id: "chatbots", name: "聊天机器人和助手", count: 35, icon: "chatbots" },
    { id: "data-analysis", name: "数据分析", count: 23, icon: "data-analysis" },
    { id: "code-generation", name: "代码生成", count: 18, icon: "code-generation" },
    { id: "research", name: "研究和学习", count: 21, icon: "research" },
    { id: "productivity", name: "生产力", count: 25, icon: "productivity" },
  ],
  "web-tools": [
    { id: "productivity", name: "生产力", count: 47, icon: "productivity" },
    { id: "design", name: "设计和创意", count: 38, icon: "design" },
    { id: "communication", name: "通信", count: 29, icon: "communication" },
    { id: "file-management", name: "文件管理", count: 22, icon: "file-management" },
    { id: "browser-extensions", name: "浏览器扩展", count: 34, icon: "browser-extensions" },
    { id: "seo", name: "SEO和分析", count: 26, icon: "seo" },
  ],
  "app-tools": [
    { id: "productivity", name: "生产力", count: 39, icon: "productivity" },
    { id: "communication", name: "通信", count: 32, icon: "communication" },
    { id: "photo-video", name: "照片和视频", count: 28, icon: "photo-video" },
    { id: "health-fitness", name: "健康和健身", count: 24, icon: "health-fitness" },
    { id: "finance", name: "金融", count: 21, icon: "finance" },
    { id: "education", name: "教育", count: 23, icon: "education" },
  ],
  "developer-tools": [
    { id: "code-editors", name: "代码编辑器", count: 18, icon: "code-editors" },
    { id: "frameworks", name: "框架", count: 32, icon: "frameworks" },
    { id: "version-control", name: "版本控制", count: 12, icon: "version-control" },
    { id: "testing", name: "测试", count: 24, icon: "testing" },
    { id: "deployment", name: "部署", count: 19, icon: "deployment" },
    { id: "databases", name: "数据库", count: 22, icon: "databases" },
    { id: "apis", name: "API", count: 28, icon: "apis" },
    { id: "devops", name: "DevOps", count: 26, icon: "devops" },
  ],
  "1": [
    { id: "image-generation", name: "图像生成", count: 42, icon: "image-generation" },
    { id: "writing-content", name: "写作和内容", count: 38, icon: "writing-content" },
    { id: "audio-voice", name: "音频和语音", count: 27, icon: "audio-voice" },
    { id: "video-generation", name: "视频生成", count: 19, icon: "video-generation" },
    { id: "chatbots", name: "聊天机器人和助手", count: 35, icon: "chatbots" },
    { id: "data-analysis", name: "数据分析", count: 23, icon: "data-analysis" },
    { id: "code-generation", name: "代码生成", count: 18, icon: "code-generation" },
    { id: "research", name: "研究和学习", count: 21, icon: "research" },
    { id: "productivity", name: "生产力", count: 25, icon: "productivity" },
  ],
  "2": [
    { id: "productivity", name: "生产力", count: 47, icon: "productivity" },
    { id: "design", name: "设计和创意", count: 38, icon: "design" },
    { id: "communication", name: "通信", count: 29, icon: "communication" },
    { id: "file-management", name: "文件管理", count: 22, icon: "file-management" },
    { id: "browser-extensions", name: "浏览器扩展", count: 34, icon: "browser-extensions" },
    { id: "seo", name: "SEO和分析", count: 26, icon: "seo" },
  ],
  "3": [
    { id: "productivity", name: "生产力", count: 39, icon: "productivity" },
    { id: "communication", name: "通信", count: 32, icon: "communication" },
    { id: "photo-video", name: "照片和视频", count: 28, icon: "photo-video" },
    { id: "health-fitness", name: "健康和健身", count: 24, icon: "health-fitness" },
    { id: "finance", name: "金融", count: 21, icon: "finance" },
    { id: "education", name: "教育", count: 23, icon: "education" },
  ],
  "4": [
    { id: "code-editors", name: "代码编辑器", count: 18, icon: "code-editors" },
    { id: "frameworks", name: "框架", count: 32, icon: "frameworks" },
    { id: "version-control", name: "版本控制", count: 12, icon: "version-control" },
    { id: "testing", name: "测试", count: 24, icon: "testing" },
    { id: "deployment", name: "部署", count: 19, icon: "deployment" },
    { id: "databases", name: "数据库", count: 22, icon: "databases" },
    { id: "apis", name: "API", count: 28, icon: "apis" },
    { id: "devops", name: "DevOps", count: 26, icon: "devops" },
  ],
}

// 样本数据，实际应用中应该从API获取
const popularTags = [
  { id: "free", name: "免费", count: 156 },
  { id: "productivity", name: "生产力", count: 124 },
  { id: "design", name: "设计", count: 98 },
  { id: "automation", name: "自动化", count: 87 },
  { id: "collaboration", name: "协作", count: 76 },
  { id: "open-source", name: "开源", count: 65 },
  { id: "api", name: "API", count: 58 },
  { id: "mobile", name: "移动端", count: 52 },
]

interface CategorySidebarProps {
  category: string | number; // 可以是分类ID(number)或code(string)
  onSubcategoryChange?: (subcategoryId: string | null) => void;
}

export function CategorySidebar({ category, onSubcategoryChange }: CategorySidebarProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priceFilter, setPriceFilter] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState<string>("newest")
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  // 确保categoryId是字符串
  const categoryKey = typeof category === 'number' ? category.toString() : category;
  
  // 获取当前分类的子分类数据，如果没有则使用空数组
  const currentSubcategories = subcategories[categoryKey] || [];

  const toggleSubcategory = (id: string) => {
    const newValue = selectedSubcategory === id ? null : id;
    setSelectedSubcategory(newValue);
    // 触发父组件的回调，传递子分类ID
    if (onSubcategoryChange) {
      onSubcategoryChange(newValue);
    }
  }

  const toggleTag = (id: string) => {
    setSelectedTags((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  // 手机端筛选抽屉
  const MobileSidebar = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex md:hidden items-center mb-4">
          <Filter className="mr-2 h-4 w-4" />
          筛选
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px] overflow-y-auto">
        <div className="py-4">
          <SidebarContent />
        </div>
      </SheetContent>
    </Sheet>
  )

  // 侧边栏内容
  const SidebarContent = () => (
    <div className="space-y-8">
      {/* 子分类 */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Menu className="h-5 w-5 mr-2" />
          <span>分类</span>
        </h3>
        <ul className="grid grid-cols-1 gap-3">
          {currentSubcategories.map((subcat) => {
            const IconComponent = iconMap[subcat.icon] || ImageIcon;
            return (
              <li
                key={subcat.id}
                className={`flex items-center rounded-lg h-11 cursor-pointer transition-colors ${
                  selectedSubcategory === subcat.id 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => toggleSubcategory(subcat.id)}
              >
                <div className="flex items-center justify-center w-12 h-full">
                  {<IconComponent className="h-5 w-5" />}
                </div>
                <span className="pr-4">{subcat.name}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 价格筛选 */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <DollarSign className="h-5 w-5 mr-2" />
          价格
        </h3>
        <RadioGroup value={priceFilter || ""} onValueChange={setPriceFilter} className="space-y-2">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12">
              <RadioGroupItem value="free" id="price-free" />
            </div>
            <Label htmlFor="price-free">免费</Label>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12">
              <RadioGroupItem value="paid" id="price-paid" />
            </div>
            <Label htmlFor="price-paid">付费</Label>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12">
              <RadioGroupItem value="freemium" id="price-freemium" />
            </div>
            <Label htmlFor="price-freemium">混合模式</Label>
          </div>
        </RadioGroup>
      </div>

      {/* 提交新工具按钮 */}
      <div className="pt-4 mt-8">
        <Button 
          className="w-full mt-4"
          asChild
        >
          <Link href="/submit-tool">
            <PlusCircle className="mr-2 h-4 w-4" />
            提交工具
          </Link>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <MobileSidebar />
      
      {/* 可折叠侧边栏 - 桌面端 */}
      <div 
        className={`relative hidden md:block transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* 折叠/展开按钮 */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-3 z-10 h-8 w-8 rounded-full border shadow-md bg-background"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
        
        <div className="bg-white rounded-xl shadow-md border p-4 sticky top-20">
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-3 py-2">
              {/* 收缩时显示所有子分类图标 */}
              {currentSubcategories.map(subcat => {
                const IconComponent = iconMap[subcat.icon] || ImageIcon;
                return (
                  <div 
                    key={subcat.id}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                      selectedSubcategory === subcat.id 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleSubcategory(subcat.id)}
                    title={subcat.name}
                    style={{ cursor: 'pointer' }}
                  >
                    {<IconComponent className="h-5 w-5" />}
                  </div>
                );
              })}
              <div className="mt-4">
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-md cursor-pointer text-primary hover:text-primary/80"
                  title="提交新工具"
                >
                  <PlusCircle className="h-6 w-6" />
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-[200px]">
              <SidebarContent />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
