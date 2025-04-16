"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Bot,
  Globe,
  AppWindow,
  Code,
} from "lucide-react"
import { useTranslation } from "@/lib/translations"
import { motion } from "framer-motion"

// 图标映射到四大主要分类
const iconMap: Record<string, React.ElementType> = {
  "ai-tools": Bot,
  "web-tools": Globe,
  "app-tools": AppWindow,
  "developer-tools": Code,
}

// 颜色背景映射
const colorBgMap: Record<string, string> = {
  "ai-tools": "bg-blue-100 dark:bg-blue-900/20",
  "web-tools": "bg-green-100 dark:bg-green-900/20",
  "app-tools": "bg-purple-100 dark:bg-purple-900/20",
  "developer-tools": "bg-orange-100 dark:bg-orange-900/20",
}

// 四大主要分类数据
const mainCategories = [
  {
    id: "ai-tools",
    name: "AI 工具",
    icon: "ai-tools",
    description: "发现最新的人工智能工具",
    count: 124,
  },
  {
    id: "web-tools",
    name: "网页工具",
    icon: "web-tools",
    description: "日常网络活动的必备工具",
    count: 98,
  },
  {
    id: "app-tools",
    name: "应用工具",
    icon: "app-tools",
    description: "提高生产力的移动和桌面应用程序",
    count: 86,
  },
  {
    id: "developer-tools",
    name: "开发者工具",
    icon: "developer-tools",
    description: "帮助开发者更高效编码的工具",
    count: 112,
  }
]

export function ToolCategories() {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        // 使用主要分类数据
        setCategories(mainCategories)
        setLoading(false)
      } catch (err) {
        setError("Failed to load categories")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <section className="py-12" id="explore-categories">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          {t("home.exploreCategories")}
        </h2>
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"></div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12" id="explore-categories">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          {t("home.exploreCategories")}
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400">{error}</div>
      </section>
    )
  }

  return (
    <section className="py-16" id="explore-categories">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">
          {t("home.exploreCategories")}
        </h2>

        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Bot
            const bgColor = colorBgMap[category.icon] || "bg-gray-100"

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <Link href={`/${category.id}`} className="block p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className={`${bgColor} p-4 rounded-full mb-4`}>
                      <Icon className="h-10 w-10 text-gray-800 dark:text-gray-200" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{category.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium">
                      {category.count} 个工具
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
