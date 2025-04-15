"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion"

interface EnhancedScrollSectionProps {
  children: ReactNode
  index: number
  effect?: "fade" | "zoom" | "slide" | "rotate" | "parallax"
  delay?: number
  threshold?: number
}

export function EnhancedScrollSection({
  children,
  index,
  effect = "fade",
  delay = 0,
  threshold = 0.1,
}: EnhancedScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  // 创建一个基于滚动位置的动画值
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // 使用弹簧效果使动画更加平滑
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // 根据不同效果创建不同的动画值
  const getAnimationValues = (progress: MotionValue<number>) => {
    let scale, x, rotate, y, opacity

    switch (effect) {
      case "zoom":
        scale = useTransform(progress, [0, 0.5], [0.8, 1])
        opacity = useTransform(progress, [0, 0.5], [0, 1])
        return { scale, opacity }
      case "slide":
        x = useTransform(progress, [0, 0.5], [index % 2 === 0 ? -100 : 100, 0])
        opacity = useTransform(progress, [0, 0.5], [0, 1])
        return { x, opacity }
      case "rotate":
        rotate = useTransform(progress, [0, 0.5], [index % 2 === 0 ? -10 : 10, 0])
        opacity = useTransform(progress, [0, 0.5], [0, 1])
        return { rotate, opacity }
      case "parallax":
        y = useTransform(progress, [0, 1], [100, -100])
        opacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        return { y, opacity }
      case "fade":
      default:
        opacity = useTransform(progress, [0, 0.5], [0, 1])
        y = useTransform(progress, [0, 0.5], [50, 0])
        return { opacity, y }
    }
  }

  const animationValues = getAnimationValues(smoothProgress)

  // 使用 IntersectionObserver 检测元素是否在视口中
  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold },
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{
          duration: 0.8,
          delay: delay * 0.1,
          ease: [0.22, 1, 0.36, 1], // 使用自定义缓动函数使动画更加夸张
        }}
        style={animationValues}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
