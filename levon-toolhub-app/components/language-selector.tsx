"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Check, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const languages = [
  { code: "zh-CN", name: "简体中文" },
  { code: "zh-TW", name: "繁體中文" },
  { code: "en", name: "English" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
]

export function LanguageSelector() {
  const { locale, setLocale } = useLanguage()

  const handleLanguageChange = (langCode: string) => {
    setLocale(langCode)
  }

  const getCurrentLanguageName = () => {
    return languages.find((lang) => lang.code === locale)?.name || "English"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-1 px-3">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">{getCurrentLanguageName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className="cursor-pointer flex items-center justify-between"
            onClick={() => handleLanguageChange(language.code)}
          >
            <span>{language.name}</span>
            {locale === language.code && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
