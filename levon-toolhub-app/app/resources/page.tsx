"use client"

import { useState } from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function EducationalResources() {
  const [progress, setProgress] = useState(0)
  const [completedResources, setCompletedResources] = useState<number[]>([])

  // Placeholder data for educational resources
  const resources = [
    { id: 1, title: 'Introduction to Mental Models', type: 'Video', duration: '15 min' },
    { id: 2, title: 'Decision Making Techniques', type: 'Article', duration: '10 min read' },
    { id: 3, title: 'Advanced Problem Solving', type: 'Interactive Tutorial', duration: '30 min' },
  ]

  const startResource = (resourceId: number) => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setCompletedResources(prev => [...prev, resourceId])
          return 100
        }
        return prev + 10
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Educational Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(resource => (
            <Card key={resource.id}>
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.type} - {resource.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                {completedResources.includes(resource.id) ? (
                  <Button disabled>Completed</Button>
                ) : (
                  <Button onClick={() => startResource(resource.id)}>Start Learning</Button>
                )}
                {progress > 0 && resource.id === resources[completedResources.length]?.id && (
                  <Progress value={progress} className="mt-4" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
