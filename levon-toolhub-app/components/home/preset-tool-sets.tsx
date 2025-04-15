"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, BookmarkCheck, Pencil } from "lucide-react"

// Sample data for preset tool sets
const toolSets = {
  designers: {
    title: "Designer Toolkit",
    description: "Essential tools for UI/UX and graphic designers",
    tools: [
      { id: 1, name: "Figma", icon: "/placeholder.svg?height=40&width=40", category: "Design" },
      { id: 2, name: "Adobe XD", icon: "/placeholder.svg?height=40&width=40", category: "Design" },
      { id: 3, name: "Sketch", icon: "/placeholder.svg?height=40&width=40", category: "Design" },
      { id: 4, name: "Canva", icon: "/placeholder.svg?height=40&width=40", category: "Graphics" },
      { id: 5, name: "Coolors", icon: "/placeholder.svg?height=40&width=40", category: "Color" },
      { id: 6, name: "Unsplash", icon: "/placeholder.svg?height=40&width=40", category: "Images" },
      { id: 7, name: "Dribbble", icon: "/placeholder.svg?height=40&width=40", category: "Inspiration" },
      { id: 8, name: "Fontbase", icon: "/placeholder.svg?height=40&width=40", category: "Typography" },
    ],
  },
  developers: {
    title: "Developer Essentials",
    description: "Must-have tools for web and software developers",
    tools: [
      { id: 9, name: "VS Code", icon: "/placeholder.svg?height=40&width=40", category: "Editor" },
      { id: 10, name: "GitHub", icon: "/placeholder.svg?height=40&width=40", category: "Version Control" },
      { id: 11, name: "Postman", icon: "/placeholder.svg?height=40&width=40", category: "API" },
      { id: 12, name: "Stack Overflow", icon: "/placeholder.svg?height=40&width=40", category: "Community" },
      { id: 13, name: "CodePen", icon: "/placeholder.svg?height=40&width=40", category: "Frontend" },
      { id: 14, name: "Vercel", icon: "/placeholder.svg?height=40&width=40", category: "Deployment" },
      { id: 15, name: "Chrome DevTools", icon: "/placeholder.svg?height=40&width=40", category: "Debugging" },
      { id: 16, name: "npm", icon: "/placeholder.svg?height=40&width=40", category: "Package Manager" },
    ],
  },
  "content-creators": {
    title: "Content Creator Suite",
    description: "Top tools for content creators, vloggers, and social media creators",
    tools: [
      { id: 17, name: "Notion", icon: "/placeholder.svg?height=40&width=40", category: "Organization" },
      { id: 18, name: "Grammarly", icon: "/placeholder.svg?height=40&width=40", category: "Writing" },
      { id: 19, name: "Canva", icon: "/placeholder.svg?height=40&width=40", category: "Graphics" },
      { id: 20, name: "DaVinci Resolve", icon: "/placeholder.svg?height=40&width=40", category: "Video Editing" },
      { id: 21, name: "Audacity", icon: "/placeholder.svg?height=40&width=40", category: "Audio" },
      { id: 22, name: "Buffer", icon: "/placeholder.svg?height=40&width=40", category: "Social Media" },
      { id: 23, name: "Unsplash", icon: "/placeholder.svg?height=40&width=40", category: "Images" },
      { id: 24, name: "Epidemic Sound", icon: "/placeholder.svg?height=40&width=40", category: "Music" },
    ],
  },
  "content-creation": {
    id: "content-creation",
    title: "Content Creation",
    icon: <Pencil className="h-5 w-5" />,
    description: "Top tools for content creators, vloggers, and social media creators",
    tools: ["canva", "notion", "grammarly", "buffer", "unsplash", "pixlr"]
  },
}

export function PresetToolSets() {
  const [savedSets, setSavedSets] = useState<string[]>([])

  const toggleSaveSet = (setId: string) => {
    if (savedSets.includes(setId)) {
      setSavedSets(savedSets.filter((id) => id !== setId))
    } else {
      setSavedSets([...savedSets, setId])
    }
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Curated Tool Collections</h2>

      <Tabs defaultValue="designers" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="designers">For Designers</TabsTrigger>
          <TabsTrigger value="developers">For Developers</TabsTrigger>
          <TabsTrigger value="content-creators">For Content Creators</TabsTrigger>
        </TabsList>

        {Object.entries(toolSets).map(([id, set]) => (
          <TabsContent key={id} value={id} className="mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{set.title}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{set.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleSaveSet(id)}
                  className={`rounded-full ${
                    savedSets.includes(id)
                      ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                      : ""
                  }`}
                >
                  {savedSets.includes(id) ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {set.tools.map((tool) => {
                    if (typeof tool === 'string') {
                      return (
                        <Link
                          key={tool}
                          href={`/tools/${tool}`}
                          className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center"
                        >
                          <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                            <img src="/placeholder.svg" alt={tool} className="h-8 w-8" />
                          </div>
                          <span className="font-medium text-sm mb-1">{tool}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">工具</span>
                        </Link>
                      );
                    }
                    
                    return (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.id}`}
                        className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center"
                      >
                        <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                          <img src={tool.icon || "/placeholder.svg"} alt={tool.name} className="h-8 w-8" />
                        </div>
                        <span className="font-medium text-sm mb-1">{tool.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{tool.category}</span>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-center">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={`/tools?category=${id}`}>View Complete Collection</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
