"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight } from "lucide-react"
import { getSubcategories } from "@/lib/api"
import type { Subcategory } from "@/lib/api"
import { useTranslation } from "@/lib/translations"

// Sample data for tools in subcategories
const subcategoryTools: Record<string, { id: number; name: string; icon: string }[]> = {
  "image-generation": [
    { id: 1, name: "Midjourney", icon: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "DALL-E", icon: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Stable Diffusion", icon: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Canva AI Image", icon: "/placeholder.svg?height=40&width=40" },
    { id: 5, name: "Craiyon", icon: "/placeholder.svg?height=40&width=40" },
    { id: 6, name: "Leonardo.AI", icon: "/placeholder.svg?height=40&width=40" },
  ],
  "writing-content": [
    { id: 7, name: "ChatGPT", icon: "/placeholder.svg?height=40&width=40" },
    { id: 8, name: "Jasper", icon: "/placeholder.svg?height=40&width=40" },
    { id: 21, name: "Claude", icon: "/placeholder.svg?height=40&width=40" },
    { id: 22, name: "Notion AI", icon: "/placeholder.svg?height=40&width=40" },
    { id: 9, name: "Copy.ai", icon: "/placeholder.svg?height=40&width=40" },
    { id: 10, name: "Grammarly", icon: "/placeholder.svg?height=40&width=40" },
    { id: 11, name: "Writesonic", icon: "/placeholder.svg?height=40&width=40" },
    { id: 12, name: "Rytr", icon: "/placeholder.svg?height=40&width=40" },
  ],
  "audio-voice": [
    { id: 13, name: "ElevenLabs", icon: "/placeholder.svg?height=40&width=40" },
    { id: 14, name: "Descript", icon: "/placeholder.svg?height=40&width=40" },
    { id: 15, name: "Murf AI", icon: "/placeholder.svg?height=40&width=40" },
    { id: 16, name: "Play.ht", icon: "/placeholder.svg?height=40&width=40" },
    { id: 17, name: "Resemble AI", icon: "/placeholder.svg?height=40&width=40" },
    { id: 18, name: "Speechify", icon: "/placeholder.svg?height=40&width=40" },
  ],
}

export function SubcategoriesPreview() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState("ai-tools")
  const [subcategories, setSubcategories] = useState<Record<string, Subcategory[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSubcategories() {
      try {
        setLoading(true)
        const data = await getSubcategories(activeCategory)
        setSubcategories((prev) => ({ ...prev, [activeCategory]: data }))
      } catch (err) {
        setError("Failed to load subcategories")
      } finally {
        setLoading(false)
      }
    }

    if (!subcategories[activeCategory]) {
      fetchSubcategories()
    }
  }, [activeCategory, subcategories])

  if (loading && !subcategories[activeCategory]) {
    return (
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          {t("home.exploreSubcategories")}
        </h2>
        <div className="flex justify-center mb-8">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </section>
    )
  }

  if (error && !subcategories[activeCategory]) {
    return (
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          {t("home.exploreSubcategories")}
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400">{error}</div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        {t("home.exploreSubcategories")}
      </h2>

      <Tabs defaultValue="ai-tools" onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="ai-tools">{t("home.aiTools.title")}</TabsTrigger>
          <TabsTrigger value="web-tools">{t("home.webTools.title")}</TabsTrigger>
          <TabsTrigger value="app-tools">{t("home.appTools.title")}</TabsTrigger>
          <TabsTrigger value="developer-tools">{t("home.developerTools.title")}</TabsTrigger>
        </TabsList>

        {Object.keys(subcategories).map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {subcategories[category]?.slice(0, 3).map((subcat, index) => (
                <Card key={subcat.id || `${category}-subcat-${index}`} className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{subcat.name}</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {subcategoryTools[subcat.id]?.slice(0, 6).map((tool, toolIndex) => (
                        <Link
                          key={tool.id || `${subcat.id}-tool-${toolIndex}`}
                          href={`/tools/${tool.id}`}
                          className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <img src={tool.icon || "/placeholder.svg"} alt={tool.name} className="h-8 w-8 mr-2" />
                          <span className="text-sm truncate">{tool.name}</span>
                        </Link>
                      ))}
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full mt-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      <Link href={`/${category}/${subcat.id}`} className="flex items-center justify-center">
                        {t("common.viewAll")} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
