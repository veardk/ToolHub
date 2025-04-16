"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { getPopularTools } from "@/lib/api"
import type { Tool } from "@/lib/api"
import { useTranslation } from "@/lib/translations"

export function PopularTools() {
  const { t } = useTranslation()
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const scrollSpeedRef = useRef<number>(0.15) // 大幅降低滚动速度，使其更加平缓

  useEffect(() => {
    async function fetchTools() {
      try {
        const data = await getPopularTools()
        // 复制工具数组以创建无缝循环效果
        setTools([...data, ...data])
      } catch (err) {
        setError("Failed to load popular tools")
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [])

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current
      const scrollAmount = clientWidth * 0.8
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScrollButtons, 400)
    }
  }

  // 自动滚动动画
  const animateScroll = (timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp
    const deltaTime = timestamp - lastTimeRef.current
    lastTimeRef.current = timestamp

    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current

      // 如果滚动到中间（原始工具集），无动画地重置到开始位置
      if (scrollLeft >= scrollWidth / 2) {
        scrollContainerRef.current.scrollLeft = 0
      } else {
        // 否则，继续平滑滚动
        scrollContainerRef.current.scrollLeft += scrollSpeedRef.current * deltaTime
      }
    }

    animationRef.current = requestAnimationFrame(animateScroll)
  }

  // 根据悬停状态开始或停止动画
  useEffect(() => {
    if (!loading && !error) {
      if (!isHovering) {
        lastTimeRef.current = 0
        animationRef.current = requestAnimationFrame(animateScroll)
      } else if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isHovering, loading, error])

  useEffect(() => {
    checkScrollButtons()
    window.addEventListener("resize", checkScrollButtons)
    return () => window.removeEventListener("resize", checkScrollButtons)
  }, [tools])

  if (loading) {
    return (
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t("common.popularTools")}</h2>
          <Link
            href="/popular"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("common.viewAll")}
          </Link>
        </div>
        <div className="flex space-x-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="min-w-[300px] h-[350px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t("common.popularTools")}</h2>
          <Link
            href="/popular"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("common.viewAll")}
          </Link>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-600 dark:text-red-400">{error}</div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t("common.popularTools")}</h2>
        <Link href="/popular" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          {t("common.viewAll")}
        </Link>
      </div>

      <div className="relative">
        {/* 滚动按钮 */}
        <Button
          variant="outline"
          size="icon"
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white dark:bg-gray-800 shadow-md ${
            !canScrollLeft ? "opacity-0 cursor-default" : "opacity-100"
          }`}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white dark:bg-gray-800 shadow-md ${
            !canScrollRight ? "opacity-0 cursor-default" : "opacity-100"
          }`}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* 可滚动容器 */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide py-4 px-2 -mx-2 snap-none"
          onScroll={checkScrollButtons}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {tools.map((tool, index) => (
            <div key={`${tool.id}-${index}`} className="min-w-[320px] max-w-[320px] px-2 flex-shrink-0">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-700 floating-card">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-24 w-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      <img src={tool.icon || "/placeholder.svg"} alt={tool.name} className="h-20 w-20 object-contain" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 min-h-[3.5rem] flex items-center justify-center">{tool.name}</h3>
                    <div className="flex space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(tool.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : i < tool.rating
                                ? "text-yellow-400 fill-yellow-400 opacity-50"
                                : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[3rem] flex items-center justify-center">{tool.description}</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-4 min-h-[2rem]">
                      {tool.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 w-full text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {tool.isNew && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                          >
                            {t("common.new")}
                          </Badge>
                        )}
                        {tool.isFree && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                          >
                            {t("common.free")}
                          </Badge>
                        )}
                      <span>
                        {tool.users.toLocaleString()} {t("common.users")}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex gap-3">
                  <Button asChild variant="outline" className="flex-1 h-10">
                    <Link href={`/tools/${tool.id}`}>
                      {t("common.viewDetails")}
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 h-10">
                    <Link href={tool.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      {t("common.visit")}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        .floating-card {
          animation: float 4s ease-in-out infinite;
        }
        
        .floating-card:nth-child(odd) {
          animation-delay: 2s;
        }
        
        .floating-card:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
