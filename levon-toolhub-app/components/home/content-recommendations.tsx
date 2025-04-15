"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, BookOpen } from "lucide-react"
import { getArticles } from "@/lib/api"
import type { Article } from "@/lib/api"
import { useTranslation } from "@/lib/translations"
import { Button } from "@/components/ui/button"

export function ContentRecommendations() {
  const { t } = useTranslation()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getArticles()
        setArticles(data)
      } catch (err) {
        setError("Failed to load articles")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <section className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("home.featuredArticles")}</h2>
            </div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("home.latestFromNews")}</h2>
            </div>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400">{error}</div>
      </section>
    )
  }

  // Split articles into featured and latest
  const featuredArticles = articles.slice(0, 3)
  const latestNewsPosts = articles.slice(0, 3)

  return (
    <section className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Articles */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("home.featuredArticles")}</h2>
            <Link
              href="/articles"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t("common.viewAll")}
            </Link>
          </div>
          <div className="space-y-6">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img
                      src={article.coverImage || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <Link href={article.url}>
                      <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={article.author.avatar} alt={article.author.name} />
                          <AvatarFallback>{article.author.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{article.author.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                        <span className="flex items-center mr-3">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Latest News Posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("home.latestFromNews")}</h2>
            <Button asChild variant="ghost" size="sm">
            <Link
                href="/news"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
            >
                {t("home.seeAll")} →
            </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNewsPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <div className="w-1/3">
                      <img
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-20 object-cover rounded-md"
                      />
                    </div>
                    <div className="w-2/3">
                      <Link href={post.url}>
                        <h3 className="text-base font-semibold mb-1 line-clamp-2 hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                        <BookOpen className="h-3 w-3 mr-1" />
                        <span>{post.readTime}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
