"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  PlusCircle, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Menu,
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
  Settings,
  ArrowUpDown,
  DollarSign,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Subcategory, getCategorySubcategories } from "@/lib/api"

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

interface CategorySidebarProps {
  category: string | number; // 可以是分类ID(number)或code(string)
  onSubcategoryChange?: (subcategoryId: string | null) => void;
  onPriceFilterChange?: (priceType: number | null) => void;
  onSortChange?: (sortOption: number) => void; // 添加排序回调
  sortOption?: number; // 添加外部传入的排序选项
}

export function CategorySidebar({ 
  category, 
  onSubcategoryChange, 
  onPriceFilterChange,
  onSortChange,
  sortOption: externalSortOption = 1
}: CategorySidebarProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [priceFilter, setPriceFilter] = useState<string | null>(null)
  const [sortOption, setSortOption] = useState<string>("newest") // 默认"最新"
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])
  const [loading, setLoading] = useState(true)
  
  // 监听外部排序选项变化
  useEffect(() => {
    const newSortOption = externalSortOption === 1 ? "newest" : "popular";
    if (sortOption !== newSortOption) {
      setSortOption(newSortOption);
    }
  }, [externalSortOption]);
  
  // 获取当前分类的子分类数据
  useEffect(() => {
    const fetchSubcategories = async () => {
      setLoading(true)
      try {
        // 如果category是字符串且非数字，则进行映射（兼容旧代码）
        let categoryId: number;
        if (typeof category === 'number') {
          categoryId = category;
        } else {
          // 尝试转换为数字
          const numId = parseInt(category);
          if (!isNaN(numId)) {
            categoryId = numId;
          } else {
            // 根据code查找id
            switch (category) {
              case 'ai-tools': categoryId = 1; break;
              case 'web-tools': categoryId = 2; break;
              case 'app-tools': categoryId = 3; break;
              case 'developer-tools': categoryId = 4; break;
              default: categoryId = 1;
            }
          }
        }
        
        const result = await getCategorySubcategories(categoryId);
        setSubcategories(result.subCategories);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubcategories();
  }, [category]);
  
  const toggleSubcategory = (code: string) => {
    const newValue = selectedSubcategory === code ? null : code
    setSelectedSubcategory(newValue)
    if (onSubcategoryChange) {
      onSubcategoryChange(newValue)
    }
  }
  
  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev)
  }
  
  // 处理价格筛选变化
  const handlePriceFilterChange = (value: string | null) => {
    setPriceFilter(value);
    
    // 转换为数字类型传递给父组件
    if (onPriceFilterChange) {
      const numValue = value ? parseInt(value) : null;
      onPriceFilterChange(numValue);
    }
  };
  
  // 处理排序方式变化
  const handleSortChange = (value: string) => {
    setSortOption(value);
    
    // 转换为数字类型传递给父组件
    if (onSortChange) {
      const numValue = value === "newest" ? 1 : 2; // newest=1, popular=2
      onSortChange(numValue);
    }
  };
  
  // 侧边栏内容
  const SidebarContent = () => (
    <Card className="border shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-5 space-y-6">
        <div className="flex items-center mb-4">
          <Menu className="h-5 w-5 mr-2 text-primary" />
          <h2 className="text-lg font-bold">分类</h2>
        </div>

        <div>
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
              ))}
            </div>
          ) : subcategories.length > 0 ? (
            <div className="space-y-1.5">
              {subcategories.map((subcat) => {
                const IconComponent = iconMap[subcat.code] || Zap;
                return (
                  <Button
                    key={subcat.code}
                    variant={selectedSubcategory === subcat.code ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start rounded-md"
                    onClick={() => toggleSubcategory(subcat.code)}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    <span className="truncate">{subcat.name}</span>
                  </Button>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No subcategories found</p>
          )}
        </div>
        
        <div className="pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
          <h3 className="font-medium mb-3 flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-primary" />
            价格筛选
          </h3>
          <RadioGroup
            value={priceFilter || ""}
            onValueChange={handlePriceFilterChange}
            className="space-y-1.5 ml-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="" id="price-all" />
              <Label htmlFor="price-all">全部</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="price-free" />
              <Label htmlFor="price-free">免费</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="price-paid" />
              <Label htmlFor="price-paid">付费</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="price-partially-free" />
              <Label htmlFor="price-partially-free">部分免费</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
          <h3 className="font-medium mb-3 flex items-center">
            <ArrowUpDown className="h-4 w-4 mr-2 text-primary" />
            排序方式
          </h3>
          <RadioGroup
            value={sortOption}
            onValueChange={handleSortChange}
            className="space-y-1.5 ml-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="newest" id={`sort-newest-${category}`} checked={sortOption === "newest"} />
              <Label htmlFor={`sort-newest-${category}`}>最新</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="popular" id={`sort-popular-${category}`} checked={sortOption === "popular"} />
              <Label htmlFor={`sort-popular-${category}`}>最热</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="pt-5 mt-4">
          <Button
            className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
            asChild
          >
            <Link href="/submit-tool">
              <PlusCircle className="h-4 w-4 mr-2" />
              提交工具
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
  
  // 移动端侧边栏
  const MobileSidebar = () => (
    <div className="block md:hidden mb-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="w-full flex items-center justify-between">
            <span>筛选 & 分类</span>
            <Filter className="h-4 w-4 ml-2" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="overflow-auto">
          <div className="py-4">
            {SidebarContent()}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
  
  // 桌面侧边栏（带折叠功能）
  return (
    <>
      {/* 移动端侧边栏 */}
      <MobileSidebar />
      
      {/* 桌面侧边栏 */}
      <div className="hidden md:block relative">
        <div className={`sticky top-20 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-12' : 'w-56'}`}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute -right-3 top-0 h-6 w-6 bg-background border rounded-full shadow-sm z-10"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </Button>
          
          {isCollapsed ? (
            <div className="space-y-2 py-3 bg-white dark:bg-gray-950 border rounded-lg shadow-md px-1">
              {!loading && subcategories.map((subcat) => {
                const IconComponent = iconMap[subcat.code] || Zap;
                return (
                  <motion.div 
                    key={subcat.code}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="cursor-pointer"
                  >
                    <Button
                      variant={selectedSubcategory === subcat.code ? "default" : "ghost"}
                      size="icon"
                      className="w-10 h-10"
                      onClick={() => toggleSubcategory(subcat.code)}
                      title={subcat.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </Button>
                  </motion.div>
                );
              })}
              
              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10"
                  title="提交工具"
                  asChild
                >
                  <Link href="/submit-tool">
                    <PlusCircle className="h-5 w-5 text-primary" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-1"
            >
              {SidebarContent()}
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

