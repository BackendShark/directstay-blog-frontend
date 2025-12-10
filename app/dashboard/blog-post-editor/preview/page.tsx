"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X } from "lucide-react"
import type { ContentBlock } from "@/components/blog-editor/blog-canvas"
import type { JSX } from "react" // Import JSX to declare the variable

export default function BlogPreviewPage() {
  const router = useRouter()
  const [blocks, setBlocks] = useState<ContentBlock[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("blog-preview")
    if (stored) {
      setBlocks(JSON.parse(stored))
    }
  }, [])

  const getHeaderTag = (type: string) => {
    if (type.startsWith("h")) return type
    return "h2"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={() => window.close()} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Editor
          </Button>
          <h1 className="text-lg font-semibold">Blog Preview</h1>
          <Button variant="ghost" size="icon" onClick={() => window.close()}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          {blocks.map((block) => {
            const HeaderTag = getHeaderTag(block.type) as keyof JSX.IntrinsicElements

            return (
              <div key={block.id}>
                {block.type.startsWith("h") && (
                  <HeaderTag
                    className="font-bold"
                    style={{
                      fontSize: block.fontSize,
                      fontFamily: block.fontFamily,
                    }}
                  >
                    {block.content}
                  </HeaderTag>
                )}

                {block.type === "body" && (
                  <div
                    className="prose prose-sm max-w-none"
                    style={{
                      fontSize: block.fontSize,
                      fontFamily: block.fontFamily,
                    }}
                    dangerouslySetInnerHTML={{ __html: block.content || "" }}
                  />
                )}

                {block.type === "cta" && (
                  <div className="border-2 border-blue-300 bg-blue-50 rounded-lg p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">{block.content}</h3>
                    <a
                      href={block.ctaLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg transition-colors"
                    >
                      {block.ctaText || "Get Started"}
                    </a>
                  </div>
                )}

                {block.type === "image-single" && block.imageUrl && (
                  <div className="rounded-lg overflow-hidden">
                    <img src={block.imageUrl || "/placeholder.svg"} alt="Blog image" className="w-full" />
                  </div>
                )}

                {block.type === "image-grid" && block.gridImages && (
                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns: `repeat(${block.gridColumns || 2}, 1fr)`,
                    }}
                  >
                    {block.gridImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={img || "/placeholder.svg"}
                        alt={`Grid image ${idx + 1}`}
                        className="w-full rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </article>
      </div>
    </div>
  )
}
