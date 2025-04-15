import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, Users, Database, Clock } from "lucide-react"

// Sample data for community section
const userReviews = [
  {
    id: 1,
    user: {
      name: "Jessica Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JL",
    },
    tool: "Figma",
    rating: 5,
    comment:
      "Figma has completely transformed how our design team collaborates. The real-time editing features are game-changing!",
    date: "3 days ago",
  },
  {
    id: 2,
    user: {
      name: "Robert Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RC",
    },
    tool: "VS Code",
    rating: 5,
    comment: "The best code editor I've ever used. The extension ecosystem is incredible and keeps getting better.",
    date: "1 week ago",
  },
  {
    id: 3,
    user: {
      name: "Aisha Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
    tool: "Notion",
    rating: 4,
    comment: "Notion has become my second brain. I use it for everything from project management to personal notes.",
    date: "2 weeks ago",
  },
]

const recentlyAddedTools = [
  {
    id: 1,
    name: "Raycast",
    description: "Productivity tool that lets you control your tools with a few keystrokes",
    icon: "/placeholder.svg?height=40&width=40",
    category: "Productivity",
    submittedBy: "Marcus Wong",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Framer",
    description: "Web design tool that helps you create responsive and interactive websites without code",
    icon: "/placeholder.svg?height=40&width=40",
    category: "Design",
    submittedBy: "Sophia Garcia",
    date: "4 days ago",
  },
  {
    id: 3,
    name: "Cron",
    description: "Next-generation calendar for professionals and teams",
    icon: "/placeholder.svg?height=40&width=40",
    category: "Productivity",
    submittedBy: "Daniel Kim",
    date: "1 week ago",
  },
]

const communityStats = [
  { label: "Total Tools", value: "1,248", icon: Database },
  { label: "Active Users", value: "45.7K", icon: Users },
  { label: "Reviews", value: "32.9K", icon: MessageSquare },
  { label: "New This Month", value: "124", icon: Clock },
]

export function CommunityInteraction() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Community Highlights</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Reviews */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Latest User Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userReviews.map((review) => (
                  <div
                    key={review.id}
                    className="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={review.user.avatar} alt={review.user.name} />
                          <AvatarFallback>{review.user.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            on{" "}
                            <Link
                              href={`/tools/${review.tool.toLowerCase()}`}
                              className="text-blue-600 hover:underline"
                            >
                              {review.tool}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{review.comment}</p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{review.date}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/reviews"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View all reviews
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recently Added Tools */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Recently Added
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentlyAddedTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="flex items-start p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <img src={tool.icon || "/placeholder.svg"} alt={tool.name} className="h-10 w-10 rounded mr-3" />
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{tool.name}</h4>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {tool.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-1">{tool.description}</p>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        Added by {tool.submittedBy} • {tool.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/recent"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View all recent additions
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
