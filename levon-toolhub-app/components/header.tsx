"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-full bg-toggle-bg border-2 border-toggle-border transition-colors duration-200"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export function Header() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const isActive = (path: string) => pathname === path

  const NavItems = () => (
    <>
      <li>
        <Link href="/models" className={`hover:text-blue-700 ${isActive('/models') ? 'font-bold text-blue-700' : 'text-gray-700'}`}>
          Models
        </Link>
      </li>
      <li>
        <Link href="/tools" className={`hover:text-blue-700 ${isActive('/tools') ? 'font-bold text-blue-700' : 'text-gray-700'}`}>
          Tools
        </Link>
      </li>
      <li>
        <Link href="/resources" className={`hover:text-blue-700 ${isActive('/resources') ? 'font-bold text-blue-700' : 'text-gray-700'}`}>
          Resources
        </Link>
      </li>
    </>
  )

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <Link href="/" className="text-2xl font-bold gradient-text">
          MindToolKit
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-4 items-center">
            <NavItems />
            {user ? (
              <li>
                <Button variant="outline" onClick={logout} className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">Logout</Button>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/login">
                    <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">Login</Button>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">Register</Button>
                  </Link>
                </li>
              </>
            )}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4 mt-8">
              <NavItems />
              {user ? (
                <Button variant="outline" onClick={logout} className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white w-full">Logout</Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white w-full">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white w-full">Register</Button>
                  </Link>
                </>
              )}
              <ThemeToggle />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
