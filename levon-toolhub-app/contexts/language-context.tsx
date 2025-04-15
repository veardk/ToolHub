"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { i18n } from "@/i18n.config"

type LanguageContextType = {
  locale: string
  setLocale: (locale: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState(i18n.defaultLocale)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 从 localStorage 获取保存的语言设置
    const savedLocale = localStorage.getItem("locale")
    if (savedLocale && i18n.locales.includes(savedLocale)) {
      setLocale(savedLocale)
    } else {
      // 如果没有保存的语言设置，尝试使用浏览器语言
      const browserLocale = navigator.language
      const matchedLocale = i18n.locales.find(
        (locale) => browserLocale === locale || browserLocale.startsWith(locale + "-"),
      )
      if (matchedLocale) {
        setLocale(matchedLocale)
        localStorage.setItem("locale", matchedLocale)
      }
    }
  }, [])

  const handleSetLocale = (newLocale: string) => {
    if (i18n.locales.includes(newLocale)) {
      setLocale(newLocale)
      localStorage.setItem("locale", newLocale)

      // 在实际项目中，这里可能需要重定向到带有语言前缀的路径
      // 例如：/en/home, /zh-CN/home 等
      // router.push(`/${newLocale}${pathname}`)
    }
  }

  return <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
