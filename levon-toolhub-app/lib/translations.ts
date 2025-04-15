"use client"

import { useLanguage } from "@/contexts/language-context"

// 加载翻译文件
const translations: Record<string, any> = {
  en: require("@/messages/en.json"),
  "zh-CN": require("@/messages/zh-CN.json"),
  "zh-TW": require("@/messages/zh-CN.json"), // 暂时使用简体中文
  ja: require("@/messages/ja.json"),
  ko: require("@/messages/en.json"), // 暂时使用英文
  es: require("@/messages/en.json"), // 暂时使用英文
  fr: require("@/messages/en.json"), // 暂时使用英文
  de: require("@/messages/en.json"), // 暂时使用英文
}

// 获取嵌套对象的值
function getNestedValue(obj: any, path: string) {
  return path.split(".").reduce((prev, curr) => {
    return prev && prev[curr] !== undefined ? prev[curr] : undefined
  }, obj)
}

// 翻译函数
export function useTranslation() {
  const { locale } = useLanguage()

  const t = (key: string, params?: Record<string, string>) => {
    // 获取当前语言的翻译
    const translation = translations[locale] || translations["en"]

    // 获取翻译值
    let value = getNestedValue(translation, key)

    // 如果没有找到翻译，使用英文
    if (value === undefined && locale !== "en") {
      value = getNestedValue(translations["en"], key)
    }

    // 如果仍然没有找到翻译，返回键名
    if (value === undefined) {
      return key
    }

    // 替换参数
    if (params) {
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return acc.replace(new RegExp(`{{${paramKey}}}`, "g"), paramValue)
      }, value)
    }

    return value
  }

  return { t }
}
