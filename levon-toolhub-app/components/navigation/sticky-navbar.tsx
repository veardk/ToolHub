"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Menu, Moon, Sun, User, LogOut, Settings, Bookmark } from "lucide-react"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LanguageSelector } from "@/components/language-selector"
import { useTranslation } from "@/lib/translations"

export function StickyNavbar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      // 检查是否滚动超过视口高度（即hero区域）
      const scrolledPastHero = window.scrollY > window.innerHeight - 100
      setIsScrolled(window.scrollY > 100)
      setIsHeroVisible(!scrolledPastHero)
    }

    window.addEventListener("scroll", handleScroll)
    // 初始化状态
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const isActive = (path: string) => pathname === path

  const navItems = [
    { name: t("common.nav.home"), path: "/" },
    { name: t("common.nav.aiTools"), path: "/ai-tools" },
    { name: t("common.nav.webTools"), path: "/web-tools" },
    { name: t("common.nav.appTools"), path: "/app-tools" },
    { name: t("common.nav.developerTools"), path: "/developer-tools" },
    { name: t("common.nav.articles"), path: "/articles" },
    { name: t("common.nav.news"), path: "/news" },
    { name: t("common.nav.about"), path: "/about" },
  ]

  const NavItems = () => (
    <>
      {navItems.map((item) => (
        <li key={item.path}>
          <Link
            href={item.path}
            className={`hover:text-blue-600 transition-colors ${
              isActive(item.path) ? "font-bold text-blue-600" : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </>
  )

  const ThemeToggle = () => (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )

  const UserMenu = () => {
    if (!user) {
      return (
        <div className="flex items-center space-x-2">
          <Link href="/login">
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
              {t("common.login")}
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">{t("common.register")}</Button>
          </Link>
        </div>
      )
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer flex w-full items-center">
              <User className="mr-2 h-4 w-4" />
              <span>{t("common.profile")}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile/collections" className="cursor-pointer flex w-full items-center">
              <Bookmark className="mr-2 h-4 w-4" />
              <span>{t("common.myCollections")}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile/settings" className="cursor-pointer flex w-full items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>{t("common.settings")}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer flex items-center text-red-500 focus:text-red-500"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("common.logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // 如果在首页且hero区域可见，则不显示导航栏
  if (pathname === "/" && isHeroVisible) {
    return null
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || pathname !== "/" ? "bg-white dark:bg-gray-900 shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {t("common.appName")}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-8 items-center">
              <NavItems />
            </ul>
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <ThemeToggle />
            <UserMenu />

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden rounded-full">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
