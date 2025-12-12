"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBlogEditor } from "./blog-editor-context";

interface BlogEditorHeaderProps {
  onBack: () => void;
}

export function BlogEditorHeader({ onBack }: BlogEditorHeaderProps) {
  const { isPreview, setIsPreview } = useBlogEditor();

  return (
    <div className="border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={onBack}
          className="text-foreground hover:text-muted-foreground transition-colors"
        >
          Write a Blog Post
        </button>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <span className="text-[#5B6FFF] font-medium">Start with AI</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsPreview(!isPreview)}
      >
        <svg
          className="w-4 h-4 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        {isPreview ? "Edit" : "Preview"}
      </Button>
    </div>
  );
}