"use client";

import { useState } from "react";
import { Mic, Send } from "lucide-react";
import { useBlogEditor } from "./blog-editor-context";

export function BlogAIPrompt() {
  const { selectedMerchant, blogType, addBlock } = useBlogEditor();
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async (prompt: string) => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation with merchant context
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate content based on merchant context
    let generatedContent = prompt;
    if (selectedMerchant && blogType === "sponsored") {
      generatedContent = `${prompt} featuring ${selectedMerchant.name}. ${selectedMerchant.description}`;
    }

    // Add the generated content as a body block
    addBlock("body", generatedContent);
    setAiPrompt("");
    setIsGenerating(false);
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-8">
        <div className="w-24 h-24 bg-[#5B6FFF]/10 rounded-full flex items-center justify-center mb-8 opacity-50">
          <div className="w-12 h-12 bg-[#5B6FFF]/20 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-[#5B6FFF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-muted-foreground mb-12">
          Start Creating Your Blog
        </h2>
        <div className="w-16 h-16 bg-[#5B6FFF] rounded-full flex items-center justify-center animate-pulse">
          <div className="flex gap-1">
            <div
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 px-8">
      <div className="w-24 h-24 bg-[#5B6FFF]/10 rounded-full flex items-center justify-center mb-8">
        <div className="w-12 h-12 bg-[#5B6FFF]/20 rounded-full flex items-center justify-center">
          <svg
            className="w-6 h-6 text-[#5B6FFF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-12">
        Start Creating Your Blog
      </h2>
      <div className="w-full max-w-2xl space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder={
              selectedMerchant && blogType === "sponsored"
                ? `Write a blog using the offer of the ${selectedMerchant.name}`
                : "What do you want to explore today?"
            }
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="w-full px-6 py-4 pr-24 text-base border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-[#5B6FFF]/20 focus:border-[#5B6FFF] transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter" && aiPrompt.trim()) {
                handleAIGenerate(aiPrompt);
              }
            }}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              className="p-2 hover:bg-accent rounded-full transition-colors"
              title="Voice input"
              onClick={() => {
                alert("Voice input feature coming soon!");
              }}
            >
              <Mic className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              className="p-2 bg-[#5B6FFF] hover:bg-[#5B6FFF]/90 rounded-full transition-colors"
              title="Send"
              onClick={() => {
                if (aiPrompt.trim()) {
                  handleAIGenerate(aiPrompt);
                }
              }}
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Show selected merchant tag */}
        {selectedMerchant && blogType === "sponsored" && (
          <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full w-fit">
            <img
              src={selectedMerchant.avatar || "/placeholder.svg"}
              alt={selectedMerchant.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{selectedMerchant.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}