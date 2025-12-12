"use client"

import type React from "react"

import { useState } from "react"
import { Mic, Send, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AIPromptStateProps {
  onBack: () => void
  onStartEditor: () => void
}

export function AIPromptState({ onBack, onStartEditor }: AIPromptStateProps) {
  const [prompt, setPrompt] = useState("")

  const handleSubmit = () => {
    if (prompt.trim()) {
      console.log("[v0] AI Prompt submitted:", prompt)
      onStartEditor()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <button onClick={onBack} className="text-foreground hover:text-muted-foreground transition-colors">
            Write a Blog Post
          </button>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-[#5B6FFF] font-medium">Start with AI</span>
        </div>
        <Button variant="outline" size="sm">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          Preview
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl w-full">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#5B6FFF]/10 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-[#5B6FFF]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-8">Start Creating Your Blog</h2>

          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What do you want to explore today?"
              className="w-full px-6 py-4 pr-24 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#5B6FFF]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button className="p-2 hover:bg-muted rounded-full transition-colors">
                <Mic className="w-5 h-5 text-muted-foreground" />
              </button>
              <button onClick={handleSubmit} className="p-2 bg-muted hover:bg-muted/80 rounded-full transition-colors">
                <Send className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
