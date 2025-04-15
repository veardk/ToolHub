"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, Facebook, Instagram, Linkedin, Github, Mail } from "lucide-react"
import { useTranslation } from "@/lib/translations"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {t("common.appName")}
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t("common.footer.description")}</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="sr-only">GitHub</span>
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {t("common.footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              {["Home", "About Us", "News", "Contact", "Submit Tool"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {t("common.footer.categories")}
            </h3>
            <ul className="space-y-2">
              {["AI Tools", "Web Tools", "App Tools", "Developer Tools", "All Categories"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t("common.newsletter")}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t("common.newsletterDesc")}</p>
            <div className="flex">
              <Input type="email" placeholder={t("common.yourEmail")} className="rounded-r-none" />
              <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                <Mail className="h-4 w-4 mr-2" />
                {t("common.subscribe")}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} {t("common.appName")}. {t("common.footer.allRightsReserved")}
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy-policy"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              {t("common.footer.privacyPolicy")}
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              {t("common.footer.termsOfService")}
            </Link>
            <Link
              href="/cookie-policy"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              {t("common.footer.cookiePolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
