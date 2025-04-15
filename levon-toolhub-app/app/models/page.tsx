"use client"

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/navigation/footer'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const mentalModels = [
  {
    id: 1,
    name: 'Occam\'s Razor',
    description: 'The simplest explanation is usually the correct one.',
    category: 'Problem Solving',
  },
  {
    id: 2,
    name: 'Confirmation Bias',
    description: 'The tendency to search for, interpret, favor, and recall information in a way that confirms one\'s preexisting beliefs or hypotheses.',
    category: 'Cognitive Bias',
  },
  {
    id: 3,
    name: 'Pareto Principle',
    description: 'For many events, roughly 80% of the effects come from 20% of the causes.',
    category: 'Productivity',
  },
  {
    id: 4,
    name: 'First Principles Thinking',
    description: 'Breaking down complex problems into their most basic, foundational elements.',
    category: 'Problem Solving',
  },
  {
    id: 5,
    name: 'Availability Heuristic',
    description: 'The tendency to overestimate the likelihood of events with greater "availability" in memory.',
    category: 'Cognitive Bias',
  },
  {
    id: 6,
    name: 'Circle of Competence',
    description: 'Identifying and operating within one\'s area of expertise.',
    category: 'Decision Making',
  },
  {
    id: 7,
    name: 'Inversion',
    description: 'Approaching a problem backwards by focusing on avoiding what you don\'t want.',
    category: 'Problem Solving',
  },
  {
    id: 8,
    name: 'Second-Order Thinking',
    description: 'Considering the long-term consequences of decisions beyond immediate outcomes.',
    category: 'Decision Making',
  },
  {
    id: 9,
    name: 'Hanlon\'s Razor',
    description: 'Never attribute to malice that which is adequately explained by stupidity.',
    category: 'Human Behavior',
  },
  {
    id: 10,
    name: 'Opportunity Cost',
    description: 'The loss of potential gain from other alternatives when one alternative is chosen.',
    category: 'Economics',
  },
  {
    id: 11,
    name: 'Anchoring',
    description: 'The tendency to rely too heavily on the first piece of information offered when making decisions.',
    category: 'Cognitive Bias',
  },
  {
    id: 12,
    name: 'Sunk Cost Fallacy',
    description: 'The tendency to continue investing in something because of past investments, despite new evidence suggesting it\'s no longer the best course of action.',
    category: 'Decision Making',
  },
  {
    id: 13,
    name: 'Feedback Loops',
    description: 'A system where the output affects the input, creating a cycle of cause and effect.',
    category: 'Systems Thinking',
  },
  {
    id: 14,
    name: 'Margin of Safety',
    description: 'The practice of building in a safety factor to account for uncertainty and risk.',
    category: 'Risk Management',
  },
  {
    id: 15,
    name: 'Compound Interest',
    description: 'The addition of interest to the principal sum of a loan or deposit, resulting in interest on interest.',
    category: 'Finance',
  },
  {
    id: 16,
    name: 'Survivorship Bias',
    description: 'The logical error of concentrating on people or things that "survived" a process and inadvertently overlooking those that did not.',
    category: 'Cognitive Bias',
  },
  {
    id: 17,
    name: 'Entropy',
    description: 'The tendency of systems to move from order to disorder over time without the input of energy.',
    category: 'Physics',
  },
  {
    id: 18,
    name: 'Game Theory',
    description: 'The study of strategic decision-making in competitive situations.',
    category: 'Strategy',
  },
  {
    id: 19,
    name: 'Antifragility',
    description: 'The property of systems that benefit from shock, volatility, and disorder.',
    category: 'Systems Thinking',
  },
  {
    id: 20,
    name: 'Regression to the Mean',
    description: 'The phenomenon that extreme events are likely to be followed by more moderate ones.',
    category: 'Statistics',
  },
  {
    id: 21,
    name: 'Dunning-Kruger Effect',
    description: 'A cognitive bias in which people with limited knowledge or competence in a given intellectual or social domain greatly overestimate their own knowledge or competence in that domain.',
    category: 'Cognitive Bias',
  },
  {
    id: 22,
    name: 'Black Swan Theory',
    description: 'The theory that rare and unpredictable events beyond the realm of normal expectations have severe consequences.',
    category: 'Risk Management',
  },
  {
    id: 23,
    name: 'Leverage',
    description: 'The use of borrowed capital to increase the potential return of an investment.',
    category: 'Finance',
  },
  {
    id: 24,
    name: 'Network Effects',
    description: 'The phenomenon where the value of a product or service increases as more people use it.',
    category: 'Economics',
  },
  {
    id: 25,
    name: 'Falsifiability',
    description: 'The capacity for a claim, hypothesis, or theory to be proven false.',
    category: 'Scientific Method',
  },
]

export default function MentalModelLibrary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedModel, setSelectedModel] = useState<typeof mentalModels[0] | null>(null)

  const handleModelClick = (model: typeof mentalModels[0]) => {
    setSelectedModel(model)
  }

  const filteredModels = mentalModels.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 gradient-text">Mental Model Library</h1>
        <Input
          type="text"
          placeholder="Search mental models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map(model => (
            <Card 
              key={model.id} 
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              onClick={() => handleModelClick(model)}
            >
              <CardHeader className="p-4 space-y-1">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">{model.name}</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">{model.category}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{model.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Dialog open={!!selectedModel} onOpenChange={() => setSelectedModel(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">{selectedModel?.name}</DialogTitle>
              <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">{selectedModel?.category}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">{selectedModel?.description}</p>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  )
}
