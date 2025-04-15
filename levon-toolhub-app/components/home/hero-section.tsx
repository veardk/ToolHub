"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"

// 工具logo数据
const toolLogos = [
  { id: 1, name: "ChatGPT", src: "/placeholder.svg?height=60&width=60", x: 15, y: 20 },
  { id: 2, name: "Midjourney", src: "/placeholder.svg?height=60&width=60", x: -25, y: -15 },
  { id: 3, name: "DALL-E", src: "/placeholder.svg?height=60&width=60", x: 30, y: -25 },
  { id: 4, name: "Stable Diffusion", src: "/placeholder.svg?height=60&width=60", x: -20, y: 30 },
  { id: 5, name: "Notion", src: "/placeholder.svg?height=60&width=60", x: 40, y: 10 },
  { id: 6, name: "Figma", src: "/placeholder.svg?height=60&width=60", x: -35, y: -5 },
  { id: 7, name: "VS Code", src: "/placeholder.svg?height=60&width=60", x: 5, y: -35 },
  { id: 8, name: "GitHub", src: "/placeholder.svg?height=60&width=60", x: -10, y: 25 },
  { id: 9, name: "Canva", src: "/placeholder.svg?height=60&width=60", x: 25, y: -10 },
  { id: 10, name: "Jasper", src: "/placeholder.svg?height=60&width=60", x: -30, y: -30 },
  { id: 11, name: "Runway", src: "/placeholder.svg?height=60&width=60", x: 35, y: 30 },
  { id: 12, name: "ElevenLabs", src: "/placeholder.svg?height=60&width=60", x: -15, y: 15 },
]

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  const { scrollY: framerScrollY } = useScroll()

  // 创建更加夸张的滚动效果
  const opacity = useTransform(framerScrollY, [0, 300], [1, 0])
  const scale = useTransform(framerScrollY, [0, 300], [1, 0.8])
  const y = useTransform(framerScrollY, [0, 300], [0, -100])
  const blur = useTransform(framerScrollY, [0, 300], [0, 10])
  const rotate = useTransform(framerScrollY, [0, 300], [0, -5])

  // 背景视差效果
  const backgroundY = useTransform(framerScrollY, [0, 300], [0, 150])

  // 监听滚动事件，用于logo散开动画
  useEffect(() => {
    setIsMounted(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 生成随机气泡作为背景
  const bubbles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 300 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 20 + Math.random() * 10,
  }))

  // 处理滚动到分类部分
  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const categoriesSection = document.getElementById("explore-categories")
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // 如果未挂载，返回静态内容以防止水合错误
  if (!isMounted) {
    return (
      <div 
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 to-purple-200 dark:from-blue-900 dark:to-purple-900"
      >
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-4">
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 relative">
              ToolHub
            </h1>
            <div className="absolute -inset-10 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
          </div>
          <p className="text-xl md:text-2xl mb-10 text-center text-gray-700 dark:text-gray-300">
            Discover, compare, and use the best tools
          </p>
          <div className="flex gap-4">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full"
              onClick={handleExploreClick}
            >
              Explore Tools
            </Button>
            <Button asChild variant="outline" className="px-8 py-6 text-lg rounded-full">
              <a href="/submit-tool">Submit Tool</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={heroRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 to-purple-200 dark:from-blue-900 dark:to-purple-900"
    >
      {/* 动态背景元素，带有浮动动画和滚动视差效果 */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: backgroundY }}>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-white dark:bg-gray-800 opacity-10"
            style={{
              width: bubble.size,
              height: bubble.size,
              top: `${bubble.y}%`,
              left: `${bubble.x}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* 工具logo散开动画 */}
      <div className="absolute inset-0 pointer-events-none">
        {toolLogos.map((logo) => {
          // 计算散开动画的位置
          const scatterX = scrollY * (logo.x / 10)
          const scatterY = scrollY * (logo.y / 10)
          const scatterOpacity = Math.max(0, 1 - scrollY / 500)
          const scatterScale = Math.max(0.5, 1 - scrollY / 1000)

          return (
            <motion.div
              key={logo.id}
              className="absolute"
              style={{
                left: `calc(50% + ${logo.x}vw)`,
                top: `calc(50% + ${logo.y}vh)`,
                transform: `translate(-50%, -50%) translate(${scatterX}px, ${scatterY}px) scale(${scatterScale})`,
                opacity: scatterOpacity,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1, delay: logo.id * 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                <img
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.name}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* 内容容器，带有基于滚动的动画 */}
      <motion.div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-4"
        style={{
          opacity,
          scale,
          y,
          filter: `blur(${blur}px)`,
          rotateX: rotate,
        }}
      >
        {/* Logo 带有发光效果 */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 relative">
            ToolHub
          </h1>
          <div className="absolute -inset-10 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
        </motion.div>

        {/* 标语带有打字效果 */}
        <motion.p
          className="text-xl md:text-2xl mb-10 text-center text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Discover, compare, and use the best tools
        </motion.p>

        {/* 按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-4"
        >
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full"
            onClick={handleExploreClick}
          >
            Explore Tools
          </Button>
          <Button asChild variant="outline" className="px-8 py-6 text-lg rounded-full">
            <a href="/submit-tool">Submit Tool</a>
          </Button>
        </motion.div>
      </motion.div>

      {/* 滚动指示器带有脉冲动画 */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
        style={{ opacity }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center">
          <motion.div
            className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  )
}
