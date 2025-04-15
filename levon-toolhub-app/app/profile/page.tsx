"use client"

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { StickyNavbar } from '@/components/navigation/sticky-navbar'
import { Footer } from '@/components/navigation/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { User, Settings, Bookmark, MessageSquare, Heart, Award, Edit, Upload, Search, Grid, List, Filter } from 'lucide-react'
import Link from 'next/link'

// Sample data for saved tools
const savedTools = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI image generation with stunning quality and creative control',
    icon: '/placeholder.svg?height=60&width=60',
    rating: 4.8,
    category: 'AI Tools',
    tags: ['Image Generation', 'Creative', 'Art'],
    isFree: false,
    isNew: false
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'All-in-one workspace for notes, tasks, wikis, and databases',
    icon: '/placeholder.svg?height=60&width=60',
    rating: 4.7,
    category: 'Web Tools',
    tags: ['Productivity', 'Notes', 'Collaboration'],
    isFree: true,
    isNew: false
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Collaborative interface design tool for teams',
    icon: '/placeholder.svg?height=60&width=60',
    rating: 4.8,
    category: 'Web Tools',
    tags: ['Design', 'Collaboration', 'UI/UX'],
    isFree: true,
    isNew: false
  },
  {
    id: 'vs-code',
    name: 'VS Code',
    description: 'Powerful code editor with extensive plugin ecosystem',
    icon: '/placeholder.svg?height=60&width=60',
    rating: 4.9,
    category: 'Developer Tools',
    tags: ['Development', 'Code Editor', 'Open Source'],
    isFree: true,
    isNew: false
  }
]

// Sample data for user content
const userContent = [
  {
    id: 1,
    type: 'article',
    title: 'My Experience with AI Design Tools',
    excerpt: 'A personal review of the top AI design tools I\'ve used in my workflow.',
    date: 'May 10, 2023',
    status: 'published',
    views: 342,
    likes: 28,
    comments: 7
  },
  {
    id: 2,
    type: 'review',
    title: 'Review: Midjourney',
    excerpt: 'My detailed review of Midjourney after using it for 3 months.',
    date: 'April 25, 2023',
    status: 'published',
    views: 215,
    likes: 19,
    comments: 5
  },
  {
    id: 3,
    type: 'article',
    title: 'Comparing Top Productivity Tools',
    excerpt: 'A comparison of the most popular productivity tools in 2023.',
    date: 'May 15, 2023',
    status: 'draft',
    views: 0,
    likes: 0,
    comments: 0
  }
]

// Sample data for user interactions
const userInteractions = [
  {
    id: 1,
    type: 'comment',
    content: 'Great article! I\'ve been using this tool for months and it\'s been a game-changer.',
    date: 'May 12, 2023',
    article: 'Top AI Tools for Content Creation',
    articleUrl: '/articles/ai-content-tools'
  },
  {
    id: 2,
    type: 'like',
    date: 'May 11, 2023',
    article: 'The Ultimate Guide to Web Development Tools',
    articleUrl: '/articles/web-development-tools-guide'
  },
  {
    id: 3,
    type: 'comment',
    content: 'Have you tried the new version? They\'ve added some amazing features!',
    date: 'May 8, 2023',
    article: 'Review: VS Code Extensions for Productivity',
    articleUrl: '/articles/vscode-productivity-extensions'
  }
]

// Sample data for user contributions
const userContributions = [
  {
    id: 1,
    type: 'tool',
    name: 'Raycast',
    description: 'Productivity tool that lets you control your tools with a few keystrokes',
    date: 'May 5, 2023',
    status: 'approved',
    views: 187
  },
  {
    id: 2,
    type: 'tool',
    name: 'Cron',
    description: 'Next-generation calendar for professionals and teams',
    date: 'May 15, 2023',
    status: 'pending',
    views: 0
  }
]

// Sample data for achievements
const userAchievements = [
  {
    id: 1,
    name: 'Tool Explorer',
    description: 'Saved 10+ tools to your collection',
    icon: '/placeholder.svg?height=40&width=40',
    date: 'April 20, 2023'
  },
  {
    id: 2,
    name: 'Contributor',
    description: 'Submitted your first tool to the directory',
    icon: '/placeholder.svg?height=40&width=40',
    date: 'May 5, 2023'
  },
  {
    id: 3,
    name: 'Engaged Reader',
    description: 'Left 5+ comments on articles',
    icon: '/placeholder.svg?height=40&width=40',
    date: 'May 12, 2023'
  }
]

export default function ProfilePage() {
  const { user } = useAuth()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <StickyNavbar />
        <div className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need to be logged in to view your profile.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/login">
                Log In
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <StickyNavbar />
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt={user.name} />
                <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full bg-white dark:bg-gray-800 h-8 w-8"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-center md:text-left text-white">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-white/80 mb-4">
                Tool enthusiast and productivity expert
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="bg-white/20 rounded-full px-4 py-1 text-sm">
                  <span className="font-bold mr-1">4</span> Saved Tools
                </div>
                <div className="bg-white/20 rounded-full px-4 py-1 text-sm">
                  <span className="font-bold mr-1">3</span> Articles
                </div>
                <div className="bg-white/20 rounded-full px-4 py-1 text-sm">
                  <span className="font-bold mr-1">2</span> Contributions
                </div>
              </div>
              <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="my-tools" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="my-tools" className="flex items-center">
              <Bookmark className="h-4 w-4 mr-2" />
              My Tools
            </TabsTrigger>
            <TabsTrigger value="my-content" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              My Content
            </TabsTrigger>
            <TabsTrigger value="interactions" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Interactions
            </TabsTrigger>
            <TabsTrigger value="contributions" className="flex items-center">
              <Award className="h-4 w-4 mr-2" />
              Contributions
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          {/* My Tools Tab */}
          <TabsContent value="my-tools" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Input 
                  placeholder="Search saved tools..." 
                  className="w-64 mr-2"
                  prefix={<Search className="h-4 w-4 text-gray-400" />}
                />
                <Button variant="outline" size="icon" className="mr-2">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'outline'} 
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-l-md rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'outline'} 
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none rounded-r-md"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedTools.map((tool) => (
                  <Card key={tool.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <img 
                            src={tool.icon || "/placeholder.svg"} 
                            alt={tool.name} 
                            className="h-12 w-12 object-contain"
                          />
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                          {tool.category}
                        </Badge>
                      </div>
                      <Link href={`/tools/${tool.id}`}>
                        <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 transition-colors">
                          {tool.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {tool.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {tool.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/tools/${tool.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                          <Bookmark className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Add new collection card */}
                <Card className="overflow-hidden border-dashed border-2 hover:border-blue-500 transition-colors">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                    <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                      <Plus className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Create Collection</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Organize your saved tools into custom collections
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      New Collection
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-4">
                {savedTools.map((tool) => (
                  <div 
                    key={tool.id} 
                    className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
                  >
                    <div className="flex items-center md:w-16">
                      <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <img 
                          src={tool.icon || "/placeholder.svg"} 
                          alt={tool.name} 
                          className="h-12 w-12 object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <Link href={`/tools/${tool.id}`}>
                              <h3 className="text-lg font-semibold hover:text-blue-600 transition-colors">
                                {tool.name}
                              </h3>
                            </Link>
                            <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                              {tool.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {tool.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {tool.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                          <Bookmark className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Recently Viewed</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {savedTools.slice(0, 4).map((tool) => (
                  <Link 
                    key={tool.id} 
                    href={`/tools/${tool.id}`}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                      <img 
                        src={tool.icon || "/placeholder.svg"} 
                        alt={tool.name} 
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Viewed 2 days ago
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* My Content Tab */}
          <TabsContent value="my-content" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Content</h2>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Create New Content
              </Button>
            </div>
            
            <Tabs defaultValue="published">
              <TabsList>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="published" className="mt-4">
                <div className="space-y-4">
                  {userContent.filter(content => content.status === 'published').map((content) => (
                    <Card key={content.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge className="mb-2">
                              {content.type === 'article' ? 'Article' : 'Review'}
                            </Badge>
                            <h3 className="text-xl font-bold mb-2">{content.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              {content.excerpt}
                            </p>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <span className="mr-4">Published: {content.date}</span>
                              <span className="flex items-center mr-4">
                                <Eye className="h-4 w-4 mr-1" />
                                {content.views} views
                              </span>
                              <span className="flex items-center mr-4">
                                <Heart className="h-4 w-4 mr-1" />
                                {content.likes} likes
                              </span>
                              <s
