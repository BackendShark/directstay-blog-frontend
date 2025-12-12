"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InitialStateProps {
  onWriteYourself: () => void
  onStartWithAI: () => void
}

export function InitialState({ onWriteYourself, onStartWithAI }: InitialStateProps) {
  return (
    <div className="h-full flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Write a Blog Post</h1>
        <p className="text-muted-foreground text-lg mb-8 text-balance">
          Blog posts are a great way to build a community around your products and your brand
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" size="lg" onClick={onWriteYourself} className="px-8 bg-transparent">
            Write Yourself
          </Button>
          <Button size="lg" onClick={onStartWithAI} className="px-8 bg-[#5B6FFF] hover:bg-[#4A5EE8]">
            <Sparkles className="w-4 h-4 mr-2" />
            Start with AI
          </Button>
        </div>
      </div>
    </div>
  )
}
