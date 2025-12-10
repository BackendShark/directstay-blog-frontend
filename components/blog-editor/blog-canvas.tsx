"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ImageIcon, GripVertical, X, Copy, MoveUp, MoveDown, Settings2, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RichTextEditor } from "./rich-text-editor"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { JSX } from "react/jsx-runtime" // Added import for JSX

export type ContentBlock = {
  id: string
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "image-single" | "image-grid" | "cta"
  content?: string
  imageUrl?: string
  imageSize?: "large" | "medium" | "small"
  textType?: "body1" | "body2"
  gridImages?: string[]
  gridColumns?: number // Added for dynamic grid columns
  fontSize?: string
  fontFamily?: string
  ctaText?: string // Added for CTA button text
  ctaLink?: string // Added for CTA button link
}

interface BlogCanvasProps {
  blocks: ContentBlock[]
  onBlockUpdate: (id: string, content: string) => void
  onBlockDelete: (id: string) => void
  onImageUpload: (blockId: string) => void
  onBlockDuplicate?: (id: string) => void
  onBlockMove?: (id: string, direction: "up" | "down") => void
  onBlocksReorder?: (blocks: ContentBlock[]) => void
  onBlockStyleUpdate?: (id: string, style: Partial<ContentBlock>) => void
  onGridColumnsChange?: (blockId: string, columns: number) => void
}

export function BlogCanvas({
  blocks,
  onBlockUpdate,
  onBlockDelete,
  onImageUpload,
  onBlockDuplicate,
  onBlockMove,
  onBlocksReorder,
  onBlockStyleUpdate,
  onGridColumnsChange,
}: BlogCanvasProps) {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null)
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null)
  const [editingBlock, setEditingBlock] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedBlock) return

      console.log("[v0] Key pressed:", e.key, "Selected block:", selectedBlock)

      const target = e.target as HTMLElement

      // Check if user is actively typing
      const isEditing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable ||
        target.getAttribute("contenteditable") === "true" ||
        editingBlock === selectedBlock

      if (e.key === "Delete" || e.key === "Backspace") {
        if (isEditing) {
          console.log("[v0] User is typing, not deleting block")
          return
        }
        e.preventDefault()
        console.log("[v0] Deleting block:", selectedBlock)
        onBlockDelete(selectedBlock)
        setSelectedBlock(null)
        return
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "d" && !isEditing) {
        e.preventDefault()
        console.log("[v0] Duplicating block:", selectedBlock)
        onBlockDuplicate?.(selectedBlock)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [selectedBlock, editingBlock, onBlockDelete, onBlockDuplicate])

  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    setDraggedBlock(blockId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetBlockId: string) => {
    e.preventDefault()
    if (!draggedBlock || draggedBlock === targetBlockId) return

    const draggedIndex = blocks.findIndex((b) => b.id === draggedBlock)
    const targetIndex = blocks.findIndex((b) => b.id === targetBlockId)

    const newBlocks = [...blocks]
    const [removed] = newBlocks.splice(draggedIndex, 1)
    newBlocks.splice(targetIndex, 0, removed)

    onBlocksReorder?.(newBlocks)
    setDraggedBlock(null)
  }

  const getHeaderTag = (type: string) => {
    if (type.startsWith("h")) return type
    return "h2"
  }

  const getHeaderFontSize = (type: string) => {
    const sizes: Record<string, string> = {
      h1: "3rem",
      h2: "2.25rem",
      h3: "1.875rem",
      h4: "1.5rem",
      h5: "1.25rem",
      h6: "1rem",
    }
    return sizes[type] || "2.25rem"
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-4">
      {blocks.map((block, index) => {
        const isHovered = hoveredBlock === block.id
        const isSelected = selectedBlock === block.id
        const HeaderTag = getHeaderTag(block.type) as keyof JSX.IntrinsicElements

        return (
          <div
            key={block.id}
            className="group relative"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, block.id)}
          >
            <div
              className="flex gap-3"
              onMouseEnter={() => setHoveredBlock(block.id)}
              onMouseLeave={() => setHoveredBlock(null)}
              onClick={() => setSelectedBlock(block.id)}
            >
              <div className="flex-shrink-0 w-10">
                {isHovered && (
                  <div className="flex flex-col gap-1 sticky top-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 cursor-move hover:bg-gray-200 bg-white border border-gray-200 shadow-sm"
                      draggable
                      onDragStart={(e) => handleDragStart(e, block.id)}
                    >
                      <GripVertical className="w-4 h-4 text-gray-600" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-gray-200 bg-white border border-gray-200 shadow-sm"
                        >
                          <Settings2 className="w-4 h-4 text-gray-600" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem className="gap-2" onClick={() => onBlockDuplicate?.(block.id)}>
                          <Copy className="w-4 h-4" />
                          Duplicate (Ctrl+D)
                        </DropdownMenuItem>
                        {index > 0 && (
                          <DropdownMenuItem className="gap-2" onClick={() => onBlockMove?.(block.id, "up")}>
                            <MoveUp className="w-4 h-4" />
                            Move Up
                          </DropdownMenuItem>
                        )}
                        {index < blocks.length - 1 && (
                          <DropdownMenuItem className="gap-2" onClick={() => onBlockMove?.(block.id, "down")}>
                            <MoveDown className="w-4 h-4" />
                            Move Down
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-red-600" onClick={() => onBlockDelete(block.id)}>
                          <X className="w-4 h-4" />
                          Delete (Del)
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>

              <div
                className={`flex-1 transition-all ${
                  isSelected
                    ? "ring-2 ring-blue-500 rounded-lg shadow-md"
                    : isHovered
                      ? "ring-2 ring-blue-300 rounded-lg"
                      : draggedBlock === block.id
                        ? "opacity-50"
                        : ""
                }`}
              >
                {block.type.startsWith("h") && (
                  <div className="space-y-2">
                    <HeaderTag
                      contentEditable
                      suppressContentEditableWarning
                      onFocus={(e) => {
                        setEditingBlock(block.id)
                        // Remove placeholder text on first focus
                        if (
                          e.currentTarget.textContent?.includes("Enter") &&
                          e.currentTarget.textContent?.includes("heading")
                        ) {
                          e.currentTarget.textContent = ""
                        }
                      }}
                      onBlur={() => {
                        setEditingBlock(null)
                      }}
                      onInput={(e) => {
                        const newContent = e.currentTarget.textContent || ""
                        console.log("[v0] Header content changed:", newContent)
                        onBlockUpdate(block.id, newContent)
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      className="w-full font-bold outline-none border-2 border-transparent hover:border-gray-200 focus:border-blue-400 rounded-lg p-4 transition-colors empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
                      data-placeholder={`Enter ${block.type.toUpperCase()} heading...`}
                      style={{
                        fontSize: block.fontSize || getHeaderFontSize(block.type),
                        fontFamily: block.fontFamily || "inherit",
                      }}
                    >
                      {block.content}
                    </HeaderTag>

                    {isHovered && (
                      <div className="flex gap-2 px-4 pb-2">
                        <select
                          className="text-xs px-2 py-1 border border-gray-200 rounded hover:border-gray-300 focus:outline-none focus:border-blue-400"
                          value={block.fontSize || getHeaderFontSize(block.type)}
                          onChange={(e) => onBlockStyleUpdate?.(block.id, { fontSize: e.target.value })}
                        >
                          <option value="1rem">16px</option>
                          <option value="1.25rem">20px</option>
                          <option value="1.5rem">24px</option>
                          <option value="1.875rem">30px</option>
                          <option value="2.25rem">36px</option>
                          <option value="3rem">48px</option>
                          <option value="3.75rem">60px</option>
                        </select>
                        <select
                          className="text-xs px-2 py-1 border border-gray-200 rounded hover:border-gray-300 focus:outline-none focus:border-blue-400"
                          value={block.fontFamily || "inherit"}
                          onChange={(e) => onBlockStyleUpdate?.(block.id, { fontFamily: e.target.value })}
                        >
                          <option value="inherit">Default</option>
                          <option value="'Inter', sans-serif">Inter</option>
                          <option value="'Playfair Display', serif">Playfair Display</option>
                          <option value="'Roboto', sans-serif">Roboto</option>
                          <option value="'Merriweather', serif">Merriweather</option>
                          <option value="'Montserrat', sans-serif">Montserrat</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {block.type === "body" && (
                  <div onFocus={() => setEditingBlock(block.id)} onBlur={() => setEditingBlock(null)}>
                    <RichTextEditor
                      content={block.content || ""}
                      onChange={(content) => onBlockUpdate(block.id, content)}
                      placeholder="Start writing your content..."
                      fontSize={block.fontSize}
                      fontFamily={block.fontFamily}
                      onStyleChange={(style) => onBlockStyleUpdate?.(block.id, style)}
                    />
                  </div>
                )}

                {block.type === "cta" && (
                  <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg p-8 text-center">
                    <input
                      type="text"
                      value={block.content || ""}
                      onChange={(e) => onBlockUpdate(block.id, e.target.value)}
                      placeholder="Enter CTA headline..."
                      className="w-full text-2xl font-bold text-center outline-none bg-transparent mb-4 border-b-2 border-transparent hover:border-blue-400 focus:border-blue-500 pb-2"
                    />
                    <div className="flex gap-2 items-center justify-center">
                      <input
                        type="text"
                        value={block.ctaText || "Get Started"}
                        onChange={(e) => onBlockStyleUpdate?.(block.id, { ctaText: e.target.value })}
                        placeholder="Button text"
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                      />
                      <input
                        type="url"
                        value={block.ctaLink || ""}
                        onChange={(e) => onBlockStyleUpdate?.(block.id, { ctaLink: e.target.value })}
                        placeholder="Button link URL"
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-500 flex-1"
                      />
                    </div>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                      {block.ctaText || "Get Started"}
                    </Button>
                  </div>
                )}

                {block.type === "image-single" && (
                  <div
                    className={`border-2 rounded-lg overflow-hidden transition-colors ${
                      isHovered ? "border-blue-400" : "border-gray-200"
                    }`}
                  >
                    {block.imageUrl ? (
                      <div className="relative group/image">
                        <img src={block.imageUrl || "/placeholder.svg"} alt="Blog image" className="w-full" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onImageUpload(block.id)}
                            className="bg-white text-gray-900 hover:bg-gray-100"
                          >
                            Replace Image
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => onImageUpload(block.id)}
                        className="w-full aspect-[16/9] flex flex-col items-center justify-center hover:bg-gray-50 transition-colors bg-gray-100"
                      >
                        <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                        <span className="text-base text-gray-700 font-medium">Click to upload image</span>
                        <span className="text-sm text-gray-500 mt-2">
                          Recommended:{" "}
                          {block.imageSize === "large"
                            ? "1200 x 800px"
                            : block.imageSize === "medium"
                              ? "800 x 600px"
                              : "600 x 400px"}
                        </span>
                      </button>
                    )}
                  </div>
                )}

                {block.type === "image-grid" && (
                  <div>
                    <div
                      className="grid gap-4"
                      style={{
                        gridTemplateColumns: `repeat(${block.gridColumns || 2}, 1fr)`,
                      }}
                    >
                      {Array.from({ length: block.gridColumns || 2 }).map((_, index) => (
                        <div
                          key={index}
                          className={`border-2 rounded-lg overflow-hidden transition-colors relative group/griditem ${
                            isHovered ? "border-blue-400" : "border-gray-200"
                          }`}
                        >
                          {block.gridImages?.[index] ? (
                            <div className="relative">
                              <img
                                src={block.gridImages[index] || "/placeholder.svg"}
                                alt={`Grid image ${index + 1}`}
                                className="w-full aspect-square object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/griditem:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => onImageUpload(block.id)}
                                  className="bg-white text-gray-900 hover:bg-gray-100"
                                >
                                  Replace
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => onImageUpload(block.id)}
                              className="w-full aspect-square flex flex-col items-center justify-center hover:bg-gray-50 transition-colors bg-gray-100"
                            >
                              <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-600 font-medium">Upload Image</span>
                              <span className="text-xs text-gray-500 mt-1">600 x 600px</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {isHovered && (
                      <div className="flex items-center gap-2 mt-3 justify-center">
                        <span className="text-xs text-gray-600">Grid Columns:</span>
                        <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            disabled={(block.gridColumns || 2) <= 2}
                            onClick={() => onGridColumnsChange?.(block.id, (block.gridColumns || 2) - 1)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                          <span className="text-sm font-medium px-2">{block.gridColumns || 2}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            disabled={(block.gridColumns || 2) >= 4}
                            onClick={() => onGridColumnsChange?.(block.id, (block.gridColumns || 2) + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="text-xs text-gray-500">(min: 2, max: 4)</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
