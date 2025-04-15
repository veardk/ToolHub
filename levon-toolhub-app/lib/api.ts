// Types
export type Tool = {
  id: number
  name: string
  description: string
  icon: string
  rating: number
  users: number
  tags: string[]
  url: string
  isNew: boolean
  isFree: boolean
  category: string
  subcategory: string
  createdAt: string
  updatedAt: string
}

export type ToolBrief = {
  id: number
  name: string
  logo: string
  shortDescription: string
  websiteUrl: string
  categoryId: number
  subCategoryId: number | null
  subCategoryName: string | null
  priceType: number // 1=免费，2=付费，3=部分免费
  isNew: number // 0=否，1=是
}

export type Category = {
  id: number
  name: string
  code: string
  description: string
  iconKey: string
  bgColorStart: string
  bgColorEnd: string
  background: string | null
  sortOrder: number
  toolCount: number
  subcategoryCount: number
  newToolsThisMonth: number
}

// API返回的子分类类型
export type Subcategory = {
  id: number
  categoryId: number
  name: string
  code: string
  description: string
  iconKey: string
  sortOrder: number
  toolCount: number
}

// 本地mock数据使用的子分类类型
export type SubcategoryMock = {
  id: string
  name: string
  count: number
  categoryId: string
  icon?: string
}

export type Article = {
  id: number
  title: string
  excerpt: string
  coverImage: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  date: string
  readTime: string
  likes: number
  category: string
  tags: string[]
  url: string
}

export type Review = {
  id: number
  user: {
    name: string
    avatar: string
    initials: string
  }
  tool: string
  rating: number
  comment: string
  date: string
  likes: number
  dislikes: number
}

export type CursorPageResult<T> = {
  list: T[]
  hasMore: boolean
  nextCursor: string | null
  total: number
}

// Mock data
const popularTools: Tool[] = [
  {
    id: 1,
    name: "Midjourney",
    description: "AI image generation with stunning quality and creative control",
    icon: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    users: 125000,
    tags: ["AI", "Image Generation", "Creative"],
    url: "/tools/midjourney",
    isNew: false,
    isFree: false,
    category: "AI Tools",
    subcategory: "Image Generation",
    createdAt: "2023-01-15",
    updatedAt: "2023-05-10",
  },
  {
    id: 2,
    name: "Notion",
    description: "All-in-one workspace for notes, tasks, wikis, and databases",
    icon: "/placeholder.svg?height=60&width=60",
    rating: 4.7,
    users: 230000,
    tags: ["Productivity", "Notes", "Collaboration"],
    url: "/tools/notion",
    isNew: false,
    isFree: true,
    category: "Web Tools",
    subcategory: "Productivity",
    createdAt: "2022-11-20",
    updatedAt: "2023-04-28",
  },
  {
    id: 3,
    name: "ChatGPT",
    description: "Conversational AI assistant for text generation and problem solving",
    icon: "/placeholder.svg?height=60&width=60",
    rating: 4.9,
    users: 500000,
    tags: ["AI", "Text Generation", "Assistant"],
    url: "/tools/chatgpt",
    isNew: false,
    isFree: true,
    category: "AI Tools",
    subcategory: "Chatbots",
    createdAt: "2022-12-01",
    updatedAt: "2023-05-15",
  },
  {
    id: 4,
    name: "Figma",
    description: "Collaborative interface design tool for teams",
    icon: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    users: 180000,
    tags: ["Design", "Collaboration", "UI/UX"],
    url: "/tools/figma",
    isNew: false,
    isFree: true,
    category: "Web Tools",
    subcategory: "Design",
    createdAt: "2022-10-15",
    updatedAt: "2023-04-10",
  },
  {
    id: 5,
    name: "VS Code",
    description: "Powerful code editor with extensive plugin ecosystem",
    icon: "/placeholder.svg?height=60&width=60",
    rating: 4.9,
    users: 350000,
    tags: ["Development", "Code Editor", "Open Source"],
    url: "/tools/vscode",
    isNew: false,
    isFree: true,
    category: "Developer Tools",
    subcategory: "Code Editors",
    createdAt: "2022-09-05",
    updatedAt: "2023-05-01",
  },
  {
    id: 6,
    name: "Canva",
    description: "Easy-to-use graphic design platform with templates",
    icon: "/placeholder.svg?height=60&width=60",
    rating: 4.7,
    users: 280000,
    tags: ["Design", "Graphics", "Templates"],
    url: "/tools/canva",
    isNew: false,
    isFree: true,
    category: "Web Tools",
    subcategory: "Design",
    createdAt: "2022-08-20",
    updatedAt: "2023-04-15",
  },
  {
    id: 7,
    name: "Stable Diffusion",
    description: "Open source AI image generation model",
    icon: "/placeholder.svg?height=60&width=60",
    rating: 4.6,
    users: 95000,
    tags: ["AI", "Image Generation", "Open Source"],
    url: "/tools/stable-diffusion",
    isNew: true,
    isFree: true,
    category: "AI Tools",
    subcategory: "Image Generation",
    createdAt: "2023-04-01",
    updatedAt: "2023-05-12",
  },
  {
    id: 8,
    name: "Obsidian",
    description: "Knowledge base that works on local Markdown files",
    icon: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    users: 120000,
    tags: ["Notes", "Knowledge Management", "Markdown"],
    url: "/tools/obsidian",
    isNew: false,
    isFree: true,
    category: "App Tools",
    subcategory: "Productivity",
    createdAt: "2022-11-10",
    updatedAt: "2023-04-20",
  },
]

const categories: Category[] = [
  {
    id: 1,
    name: "AI Tools",
    code: "ai-tools",
    description: "Discover the latest in artificial intelligence tools",
    iconKey: "Cpu",
    bgColorStart: "from-purple-500",
    bgColorEnd: "to-indigo-500",
    background: null,
    sortOrder: 1,
    toolCount: 248,
    subcategoryCount: 8,
    newToolsThisMonth: 0,
  },
  {
    id: 2,
    name: "Web Tools",
    code: "web-tools",
    description: "Essential tools for your daily web activities",
    iconKey: "Globe",
    bgColorStart: "from-blue-500",
    bgColorEnd: "to-cyan-500",
    background: null,
    sortOrder: 2,
    toolCount: 312,
    subcategoryCount: 6,
    newToolsThisMonth: 0,
  },
  {
    id: 3,
    name: "App Tools",
    code: "app-tools",
    description: "Mobile and desktop applications for productivity",
    iconKey: "Smartphone",
    bgColorStart: "from-green-500",
    bgColorEnd: "to-teal-500",
    background: null,
    sortOrder: 3,
    toolCount: 186,
    subcategoryCount: 6,
    newToolsThisMonth: 0,
  },
  {
    id: 4,
    name: "Developer Tools",
    code: "developer-tools",
    description: "Tools for developers to code more efficiently",
    iconKey: "Code",
    bgColorStart: "from-orange-500",
    bgColorEnd: "to-red-500",
    background: null,
    sortOrder: 4,
    toolCount: 275,
    subcategoryCount: 8,
    newToolsThisMonth: 0,
  },
]

const subcategories: Record<string, SubcategoryMock[]> = {
  "1": [ // AI Tools (id: 1)
    { id: "image-generation", name: "Image Generation", count: 42, categoryId: "1" },
    { id: "writing-content", name: "Writing & Content", count: 38, categoryId: "1" },
    { id: "audio-voice", name: "Audio & Voice", count: 27, categoryId: "1" },
    { id: "video-generation", name: "Video Generation", count: 19, categoryId: "1" },
    { id: "chatbots", name: "Chatbots & Assistants", count: 35, categoryId: "1" },
    { id: "data-analysis", name: "Data Analysis", count: 23, categoryId: "1" },
    { id: "code-generation", name: "Code Generation", count: 18, categoryId: "1" },
    { id: "research", name: "Research & Learning", count: 21, categoryId: "1" },
  ],
  "2": [ // Web Tools (id: 2)
    { id: "productivity", name: "Productivity", count: 47, categoryId: "2" },
    { id: "design", name: "Design & Creative", count: 38, categoryId: "2" },
    { id: "communication", name: "Communication", count: 29, categoryId: "2" },
    { id: "file-management", name: "File Management", count: 22, categoryId: "2" },
    { id: "browser-extensions", name: "Browser Extensions", count: 34, categoryId: "2" },
    { id: "seo", name: "SEO & Analytics", count: 26, categoryId: "2" },
  ],
  "3": [ // App Tools (id: 3)
    { id: "productivity", name: "Productivity", count: 39, categoryId: "3" },
    { id: "communication", name: "Communication", count: 32, categoryId: "3" },
    { id: "photo-video", name: "Photo & Video", count: 28, categoryId: "3" },
    { id: "health-fitness", name: "Health & Fitness", count: 24, categoryId: "3" },
    { id: "finance", name: "Finance", count: 21, categoryId: "3" },
    { id: "education", name: "Education", count: 23, categoryId: "3" },
  ],
  "4": [ // Developer Tools (id: 4)
    { id: "code-editors", name: "Code Editors", count: 18, categoryId: "4" },
    { id: "frameworks", name: "Frameworks", count: 32, categoryId: "4" },
    { id: "version-control", name: "Version Control", count: 12, categoryId: "4" },
    { id: "testing", name: "Testing", count: 24, categoryId: "4" },
    { id: "deployment", name: "Deployment", count: 19, categoryId: "4" },
    { id: "databases", name: "Databases", count: 22, categoryId: "4" },
    { id: "apis", name: "APIs", count: 28, categoryId: "4" },
    { id: "devops", name: "DevOps", count: 26, categoryId: "4" },
  ],
  // 为了向后兼容，保留原来的键
  "ai-tools": [ 
    { id: "image-generation", name: "Image Generation", count: 42, categoryId: "1" },
    { id: "writing-content", name: "Writing & Content", count: 38, categoryId: "1" },
    { id: "audio-voice", name: "Audio & Voice", count: 27, categoryId: "1" },
    { id: "video-generation", name: "Video Generation", count: 19, categoryId: "1" },
    { id: "chatbots", name: "Chatbots & Assistants", count: 35, categoryId: "1" },
    { id: "data-analysis", name: "Data Analysis", count: 23, categoryId: "1" },
    { id: "code-generation", name: "Code Generation", count: 18, categoryId: "1" },
    { id: "research", name: "Research & Learning", count: 21, categoryId: "1" },
  ],
  "web-tools": [
    { id: "productivity", name: "Productivity", count: 47, categoryId: "2" },
    { id: "design", name: "Design & Creative", count: 38, categoryId: "2" },
    { id: "communication", name: "Communication", count: 29, categoryId: "2" },
    { id: "file-management", name: "File Management", count: 22, categoryId: "2" },
    { id: "browser-extensions", name: "Browser Extensions", count: 34, categoryId: "2" },
    { id: "seo", name: "SEO & Analytics", count: 26, categoryId: "2" },
  ],
  "app-tools": [
    { id: "productivity", name: "Productivity", count: 39, categoryId: "3" },
    { id: "communication", name: "Communication", count: 32, categoryId: "3" },
    { id: "photo-video", name: "Photo & Video", count: 28, categoryId: "3" },
    { id: "health-fitness", name: "Health & Fitness", count: 24, categoryId: "3" },
    { id: "finance", name: "Finance", count: 21, categoryId: "3" },
    { id: "education", name: "Education", count: 23, categoryId: "3" },
  ],
  "developer-tools": [
    { id: "code-editors", name: "Code Editors", count: 18, categoryId: "4" },
    { id: "frameworks", name: "Frameworks", count: 32, categoryId: "4" },
    { id: "version-control", name: "Version Control", count: 12, categoryId: "4" },
    { id: "testing", name: "Testing", count: 24, categoryId: "4" },
    { id: "deployment", name: "Deployment", count: 19, categoryId: "4" },
    { id: "databases", name: "Databases", count: 22, categoryId: "4" },
    { id: "apis", name: "APIs", count: 28, categoryId: "4" },
    { id: "devops", name: "DevOps", count: 26, categoryId: "4" },
  ],
}

const articles: Article[] = [
  {
    id: 1,
    title: "10 AI Tools That Will Transform Your Workflow in 2023",
    excerpt: "Discover the most powerful AI tools that can help you automate tasks and boost productivity.",
    coverImage: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
    date: "May 15, 2023",
    readTime: "8 min read",
    likes: 245,
    category: "AI Tools",
    tags: ["Productivity", "AI", "Automation"],
    url: "/articles/ai-tools-workflow",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Web Development Tools",
    excerpt: "A comprehensive overview of essential tools every web developer should have in their toolkit.",
    coverImage: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SC",
    },
    date: "April 28, 2023",
    readTime: "12 min read",
    likes: 189,
    category: "Developer Tools",
    tags: ["Web Development", "Coding", "Frontend"],
    url: "/articles/web-development-tools-guide",
  },
  {
    id: 3,
    title: "How to Choose the Right Productivity Tools for Your Team",
    excerpt: "Learn how to evaluate and select the best productivity tools that match your team's specific needs.",
    coverImage: "/placeholder.svg?height=200&width=400",
    author: {
      name: "Michael Torres",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MT",
    },
    date: "May 3, 2023",
    readTime: "10 min read",
    likes: 156,
    category: "Web Tools",
    tags: ["Productivity", "Team Collaboration", "Project Management"],
    url: "/articles/productivity-tools-team",
  },
]

const reviews: Review[] = [
  {
    id: 1,
    user: {
      name: "Jessica Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JL",
    },
    tool: "Figma",
    rating: 5,
    comment:
      "Figma has completely transformed how our design team collaborates. The real-time editing features are game-changing!",
    date: "3 days ago",
    likes: 24,
    dislikes: 2,
  },
  {
    id: 2,
    user: {
      name: "Robert Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RC",
    },
    tool: "VS Code",
    rating: 5,
    comment: "The best code editor I've ever used. The extension ecosystem is incredible and keeps getting better.",
    date: "1 week ago",
    likes: 18,
    dislikes: 3,
  },
  {
    id: 3,
    user: {
      name: "Aisha Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
    tool: "Notion",
    rating: 4,
    comment: "Notion has become my second brain. I use it for everything from project management to personal notes.",
    date: "2 weeks ago",
    likes: 32,
    dislikes: 1,
  },
]

// API functions
export async function getPopularTools(): Promise<Tool[]> {
  // In a real app, this would be a fetch call to the backend
  // return fetch('/api/tools/popular').then(res => res.json())

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return popularTools
}

export async function getToolById(id: string): Promise<Tool | null> {
  // In a real app, this would be a fetch call to the backend
  // return fetch(`/api/tools/${id}`).then(res => res.json())

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const tool = popularTools.find((tool) => tool.id.toString() === id)
  return tool || null
}

export async function getCategories(): Promise<Category[]> {
  // In a real app, this would be a fetch call to the backend
  // return fetch('/api/categories').then(res => res.json())

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return categories
}

/**
 * 将本地mock子分类数据转换为API格式
 */
function convertMockSubcategories(mockSubcategories: SubcategoryMock[]): Subcategory[] {
  return mockSubcategories.map((item, index) => ({
    id: parseInt(item.id.split('-').pop() || (index + 1).toString()),
    categoryId: parseInt(item.categoryId),
    name: item.name,
    code: item.id,
    description: `${item.name}相关工具`,
    iconKey: item.icon || item.id,
    sortOrder: index + 1,
    toolCount: item.count
  }));
}

export async function getSubcategories(categoryId: string | number): Promise<Subcategory[]> {
  // 将categoryId转为字符串以确保兼容性
  const categoryIdStr = typeof categoryId === 'number' ? categoryId.toString() : categoryId;
  
  // 首先尝试使用数字ID，如果没有找到，则尝试使用code作为键
  let mockSubcategories = subcategories[categoryIdStr];
  
  // 如果没有直接找到，可能传入的是旧的分类code，尝试兼容处理
  if (!mockSubcategories) {
    // 这里可以添加API调用逻辑，当实现后端接口时
    // 例如: return fetch(`/api/category/${categoryId}/subcategories`).then(res => res.json());
    
    // 目前仍使用本地模拟数据
    console.warn(`No subcategories found directly for ID ${categoryIdStr}, trying legacy keys`);
  }
  
  // 将mock数据转换为API格式并返回
  return convertMockSubcategories(mockSubcategories || []);
}

export async function getToolsByCategory(categoryId: string): Promise<Tool[]> {
  // 移除不必要的延迟
  return popularTools.filter((tool) => tool.category.toLowerCase().replace(/\s+/g, "-") === categoryId)
}

export async function getToolsBySubcategory(categoryId: string, subcategoryId: string): Promise<Tool[]> {
  // 移除不必要的延迟
  return popularTools.filter(
    (tool) =>
      tool.category.toLowerCase().replace(/\s+/g, "-") === categoryId &&
      tool.subcategory.toLowerCase().replace(/\s+/g, "-") === subcategoryId,
  )
}

export async function getArticles(): Promise<Article[]> {
  // 移除不必要的延迟
  return articles
}

export async function getReviews(): Promise<Review[]> {
  // 移除不必要的延迟
  return reviews
}

export async function searchTools(query: string): Promise<Tool[]> {
  // 移除不必要的延迟
  if (!query) return []

  const lowerQuery = query.toLowerCase()
  return popularTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  )
}

// 添加API基础URL常量
const API_BASE_URL = 'http://127.0.0.1:8022';

export async function getCategoryById(categoryId: number): Promise<Category | null> {
  try {
    // 直接调用子分类接口，该接口已包含分类信息
    const result = await getCategorySubcategories(categoryId);
    
    // 返回分类信息部分
    if (result && result.categoryInfo) {
      return result.categoryInfo;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function getCategorySubcategories(categoryId: number): Promise<{categoryInfo: Category, subCategories: Subcategory[]}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tool/category/${categoryId}/subcategory`);
    
    if (!response.ok) {
      // 开发环境下使用mock数据
      console.warn(`API call failed with status ${response.status}, using mock data`);
      
      // 返回mock数据并转换格式
      const mockSubcategories = subcategories[categoryId.toString()] || [];
      return {
        categoryInfo: categories.find(c => c.id === categoryId) || categories[0],
        subCategories: convertMockSubcategories(mockSubcategories)
      };
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching category subcategories:", error);
    // 出错时返回mock数据
    const mockSubcategories = subcategories[categoryId.toString()] || [];
    return {
      categoryInfo: categories.find(c => c.id === categoryId) || categories[0],
      subCategories: convertMockSubcategories(mockSubcategories)
    };
  }
}

export async function getCategoryTools(
  categoryId: number, 
  options: {
    cursor?: string; 
    size?: number; 
    sort?: number; // 1=最新，2=最热
    priceType?: number; // 1=免费，2=付费，3=部分免费
    subCategoryId?: number;
  } = {}
): Promise<CursorPageResult<ToolBrief>> {
  try {
    // 构建查询参数
    const params = new URLSearchParams();
    if (options.cursor) params.append('cursor', options.cursor);
    if (options.size) params.append('size', options.size.toString());
    if (options.sort) params.append('sort', options.sort.toString());
    if (options.priceType) params.append('priceType', options.priceType.toString());
    if (options.subCategoryId) params.append('subCategoryId', options.subCategoryId.toString());
    
    const url = `${API_BASE_URL}/api/tool/category/${categoryId}/tools${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`API call failed with status ${response.status}, using mock data`);
      
      // 返回mock数据
      const mockTools = popularTools
        .filter(tool => tool.category.toLowerCase().replace(/\s+/g, "-") === "ai-tools")
        .map(tool => ({
          id: tool.id,
          name: tool.name,
          logo: tool.icon,
          shortDescription: tool.description,
          websiteUrl: tool.url,
          categoryId: 1,
          subCategoryId: null,
          subCategoryName: null,
          priceType: tool.isFree ? 1 : 2,
          isNew: tool.isNew ? 1 : 0
        }));
      
      return {
        list: mockTools,
        hasMore: false,
        nextCursor: null,
        total: mockTools.length
      };
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching category tools:", error);
    
    // 出错时返回mock数据
    const mockTools = popularTools
      .filter(tool => tool.category.toLowerCase().replace(/\s+/g, "-") === "ai-tools")
      .map(tool => ({
        id: tool.id,
        name: tool.name,
        logo: tool.icon,
        shortDescription: tool.description,
        websiteUrl: tool.url,
        categoryId: 1,
        subCategoryId: null,
        subCategoryName: null,
        priceType: tool.isFree ? 1 : 2,
        isNew: tool.isNew ? 1 : 0
      }));
    
    return {
      list: mockTools,
      hasMore: false,
      nextCursor: null,
      total: mockTools.length
    };
  }
}

// 添加导出标记确保函数被正确导出
export async function fetchCategoryTools(categoryId: number, params: URLSearchParams): Promise<any> {
  try {
    // 检查并打印价格筛选参数
    const priceType = params.get('priceType');
    const subCategoryId = params.get('subCategoryId');
    console.log(`API请求参数 - 分类ID: ${categoryId}, 价格类型: ${priceType}, 子分类ID: ${subCategoryId}`);
    
    const apiUrl = `http://127.0.0.1:8022/api/tool/category/${categoryId}/tools?${params.toString()}`;
    console.log("请求API:", apiUrl);
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(`API响应 - 状态码: ${result.code}, 工具数量: ${result.data?.list?.length || 0}`);
    return result; // 返回完整的响应对象，包含code, message, data等
  } catch (error) {
    console.error("获取工具列表失败:", error);
    
    // 简单返回错误信息，不再回退到mock数据
    return {
      code: 500,
      message: "请求失败",
      data: {
        list: [],
        hasMore: false,
        nextCursor: null,
        total: 0
      },
      success: false,
      timestamp: new Date().toISOString()
    };
  }
}
