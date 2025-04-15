// 从api.ts中导出的子分类映射数据
export type SubcategoryMock = {
  id: string
  name: string
  count: number
  categoryId: string
  icon?: string
}

// 子分类code到ID的映射表
export const subcategoryIdMap: Record<string, number> = {
  // AI Tools (分类ID=1)
  "image-generation": 1,
  "writing-content": 2,
  "audio-voice": 3,
  "video-generation": 4,
  "chatbots": 5,
  "data-analysis": 6,
  "code-generation": 7,
  "research": 8,
  
  // Web Tools (分类ID=2)
  "productivity": 9,
  "design": 10,
  "communication": 11,
  "file-management": 12,
  "browser-extensions": 13,
  "seo": 14,
  
  // App Tools (分类ID=3)
  // 注意：有些名称重复，所以要确保每个都有唯一ID
  "photo-video": 15,
  "health-fitness": 16,
  "finance": 17,
  "education": 18,
  
  // Developer Tools (分类ID=4)
  "code-editors": 19,
  "frameworks": 20,
  "version-control": 21,
  "testing": 22,
  "deployment": 23,
  "databases": 24,
  "apis": 25,
  "devops": 26
};

export const subcategories: Record<string, SubcategoryMock[]> = {
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
}; 