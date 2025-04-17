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

// 工具详情接口响应类型
export type ToolDetailResponse = {
  basicInfo: {
    id: number
    name: string
    categoryId: number
    categoryName: string
    subcategoryId: number
    subcategoryName: string
    logo: string
    websiteUrl: string
    shortDescription: string
    fullDescription: string
    priceType: number // 1.免费 2.付费 3.部分免费
    priceTypeText: string
    isNew: number // 0.否 1.是
    developer: string
    developerInfo: string
    developerUrl: string
    developerLogo: string // 开发者官网logo URL
    viewCount: number
    favoriteCount: number
    heat: number
    heatDesc: string
    heatLevel: number
    updateTime: string
    platforms: number[] // 平台编码数组 [1,3,4,5]：1=Web,2=Desktop,3=iOS,4=Android,5=Linux,6=Mac,7=Windows
  }
  coreFeatures: Array<{
    title: string
    featureGroup: number // 特点分组(1=左列显示，2=右列显示)
    sortOrder: number
  }>
  useCases: Array<{
    title: string
    sortOrder: number
  }>
  techSpecs: Array<{
    specName: string
    specValue: string
    sortOrder: number
  }>
  pricePlans: Array<{
    id: number
    planName: string
    planCode: string
    price: number | null
    pricePeriod: number | null // 1.一次性 2.月付 3.年付 4.自定义
    customPeriod: string | null
    description: string
    features: Array<{
      featureTitle: string
      featureDescription: string
      isIncluded: number
      sortOrder: number
    }>
    sortOrder: number
  }>
  planComparison: Array<{
    comparisonItem: string
    freeValue: string
    paidValue: string
    enterpriseValue: string
    sortOrder: number
  }>
  purchaseSuggestions: Array<{
    userType: string
    suggestionPoints: string[]
    sortOrder: number
  }>
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

// 保留文章相关的mock数据直到实现对应API
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

// 保留评论相关的mock数据直到实现对应API
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

// 添加API基础URL常量
const API_BASE_URL = 'http://127.0.0.1:8022';

// API函数 - 使用真实API数据

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tool/categories`);
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('获取分类列表失败:', error);
    return [];
  }
}

export async function getSubcategories(categoryId: string | number): Promise<Subcategory[]> {
  try {
    const numCategoryId = typeof categoryId === 'string' ? parseInt(categoryId) : categoryId;
    const result = await getCategorySubcategories(numCategoryId);
    return result.subCategories || [];
  } catch (error) {
    console.error('获取子分类列表失败:', error);
    return [];
  }
}

export async function getArticles(): Promise<Article[]> {
  // 使用mock数据直到后端实现
  return articles;
}

export async function getReviews(): Promise<Review[]> {
  // 使用mock数据直到后端实现
  return reviews;
}

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
    console.error('获取分类详情失败:', error);
    return null;
  }
}

export async function getCategorySubcategories(categoryId: number): Promise<{categoryInfo: Category, subCategories: Subcategory[]}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tool/category/${categoryId}/subcategory`);
    
    const result = await response.json();
    return result.data || { 
      categoryInfo: {
        id: 0,
        name: '',
        code: '',
        description: '',
        iconKey: '',
        bgColorStart: '',
        bgColorEnd: '',
        background: null,
        sortOrder: 0,
        toolCount: 0,
        subcategoryCount: 0,
        newToolsThisMonth: 0
      }, 
      subCategories: [] 
    };
  } catch (error) {
    console.error('获取分类及子分类失败:', error);
    return { 
      categoryInfo: {
        id: 0,
        name: '',
        code: '',
        description: '',
        iconKey: '',
        bgColorStart: '',
        bgColorEnd: '',
        background: null,
        sortOrder: 0,
        toolCount: 0,
        subcategoryCount: 0,
        newToolsThisMonth: 0
      }, 
      subCategories: [] 
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
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('获取分类工具列表失败:', error);
    // 返回空结果
    return {
      list: [],
      hasMore: false,
      nextCursor: null,
      total: 0
    };
  }
}

// 添加导出标记确保函数被正确导出
export async function fetchCategoryTools(categoryId: number, params: URLSearchParams): Promise<any> {
  try {
    const apiUrl = `${API_BASE_URL}/api/tool/category/${categoryId}/tools?${params.toString()}`;
    
    const response = await fetch(apiUrl);
    
    const result = await response.json();
    return result; // 返回完整的响应对象，包含code, message, data等
  } catch (error) {
    console.error('获取分类工具列表失败:', error);
    // 返回错误信息
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

/**
 * 获取工具详情
 * @param id 工具ID
 * @returns 工具详情响应
 */
export async function fetchToolDetail(id: number): Promise<{ 
  code: number, 
  msg: string, 
  data: ToolDetailResponse | null,
  success: boolean,
  timestamp: number
}> {
  try {
    const apiUrl = `${API_BASE_URL}/api/tool/detail/${id}`;
    
    const response = await fetch(apiUrl);
    
    const result = await response.json();
    return result; // 返回完整的响应对象
  } catch (error) {
    console.error('获取工具详情失败:', error);
    return {
      code: 500,
      msg: "请求失败",
      data: null,
      success: false,
      timestamp: Date.now()
    };
  }
}

/**
 * 获取热门工具列表
 * @returns 热门工具数组
 */
export async function getPopularTools(): Promise<Tool[]> {
  try {
    // 这里可以添加真实的API调用，目前提供假数据
    return [
      {
        id: 1,
        name: "ChatGPT",
        description: "OpenAI开发的人工智能对话系统，能理解和生成类人文本",
        icon: "/images/tools/chatgpt.png",
        rating: 4.8,
        users: 1200000,
        tags: ["AI", "对话", "写作"],
        url: "https://chat.openai.com",
        isNew: false,
        isFree: false,
        category: "AI Tools",
        subcategory: "Chatbots",
        createdAt: "2022-11-30",
        updatedAt: "2023-10-15"
      },
      {
        id: 2,
        name: "Midjourney",
        description: "AI图像生成工具，通过文字描述创建高质量艺术作品",
        icon: "/images/tools/midjourney.png",
        rating: 4.7,
        users: 950000,
        tags: ["AI", "图像生成", "设计"],
        url: "https://midjourney.com",
        isNew: false,
        isFree: false,
        category: "AI Tools",
        subcategory: "Image Generation",
        createdAt: "2022-02-15",
        updatedAt: "2023-09-28"
      },
      {
        id: 3,
        name: "Notion AI",
        description: "集成AI功能的知识管理与协作平台，提升工作效率",
        icon: "/images/tools/notion.png",
        rating: 4.6,
        users: 800000,
        tags: ["生产力", "笔记", "协作"],
        url: "https://notion.so",
        isNew: false,
        isFree: true,
        category: "Web Tools",
        subcategory: "Productivity",
        createdAt: "2023-01-20",
        updatedAt: "2023-10-05"
      },
      {
        id: 4,
        name: "Stable Diffusion",
        description: "开源AI图像生成模型，可在本地运行创建高质量图像",
        icon: "/images/tools/stable-diffusion.png",
        rating: 4.5,
        users: 650000,
        tags: ["AI", "图像生成", "开源"],
        url: "https://stability.ai",
        isNew: false,
        isFree: true,
        category: "AI Tools",
        subcategory: "Image Generation",
        createdAt: "2022-08-22",
        updatedAt: "2023-08-18"
      },
      {
        id: 5,
        name: "Claude",
        description: "Anthropic开发的AI助手，专注于有用、诚实和无害的回应",
        icon: "/images/tools/claude.png",
        rating: 4.7,
        users: 580000,
        tags: ["AI", "对话", "安全"],
        url: "https://anthropic.com/claude",
        isNew: true,
        isFree: false,
        category: "AI Tools",
        subcategory: "Chatbots",
        createdAt: "2023-03-15",
        updatedAt: "2023-10-12"
      },
      {
        id: 6,
        name: "Figma",
        description: "流行的协作界面设计工具，支持实时协作",
        icon: "/images/tools/figma.png",
        rating: 4.9,
        users: 1500000,
        tags: ["设计", "协作", "原型"],
        url: "https://figma.com",
        isNew: false,
        isFree: true,
        category: "Web Tools",
        subcategory: "Design",
        createdAt: "2016-09-27",
        updatedAt: "2023-09-30"
      },
      {
        id: 7,
        name: "GitHub Copilot",
        description: "AI代码辅助工具，通过自然语言描述生成代码建议",
        icon: "/images/tools/github-copilot.png",
        rating: 4.6,
        users: 720000,
        tags: ["AI", "编程", "生产力"],
        url: "https://github.com/features/copilot",
        isNew: false,
        isFree: false,
        category: "Developer Tools",
        subcategory: "Code Generation",
        createdAt: "2021-06-29",
        updatedAt: "2023-08-25"
      },
      {
        id: 8,
        name: "Cursor",
        description: "基于AI的代码编辑器，帮助开发者更快地编写和理解代码",
        icon: "/images/tools/cursor.png",
        rating: 4.5,
        users: 350000,
        tags: ["AI", "编程", "编辑器"],
        url: "https://cursor.so",
        isNew: true,
        isFree: true,
        category: "Developer Tools",
        subcategory: "Code Editors",
        createdAt: "2023-02-10",
        updatedAt: "2023-10-20"
      }
    ];
  } catch (error) {
    console.error('获取热门工具失败:', error);
    return [];
  }
}

/**
 * 提交工具问题报告
 * @param toolId 工具ID
 * @param data 报告数据
 * @returns 提交结果
 */
export async function submitToolReport(
  toolId: number | string,
  data: {
    category: number;
    description: string;
  }
): Promise<{
  code: number;
  message: string;
  data: any;
  success: boolean;
  timestamp: string;
}> {
  try {
    const response = await fetch(`/api/tool/${toolId}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error('提交工具问题报告失败:', error);
    return {
      code: 500,
      message: '网络错误，请稍后重试',
      data: null,
      success: false,
      timestamp: new Date().toISOString(),
    };
  }
}
