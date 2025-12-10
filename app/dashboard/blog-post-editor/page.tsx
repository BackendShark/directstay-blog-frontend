"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ImageIcon,
  Grid3x3,
  DonutIcon as DocumentIcon,
  Link2,
  Settings,
  Bell,
  User,
  ChevronRight,
  Mic,
  Send,
  PenTool,
  ChevronDown,
  Save,
  Clock,
  Undo2,
  Redo2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UploadImageModal } from "@/components/blog-editor/upload-image-modal"
import { BlogCanvas, type ContentBlock } from "@/components/blog-editor/blog-canvas"
import { useToast } from "@/hooks/use-toast"

export default function BlogPostEditorPage() {
  const [showEditor, setShowEditor] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [currentBlockId, setCurrentBlockId] = useState<string | null>(null)
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const { toast } = useToast()
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [history, setHistory] = useState<ContentBlock[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const addBlock = (type: ContentBlock["type"], options?: Partial<ContentBlock>) => {
    const newBlock: ContentBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: "",
      gridColumns: type === "image-grid" ? 2 : undefined, // Default to 2 columns for grid
      ...options,
    }
    setBlocks([...blocks, newBlock])
    setShowEditor(true)
    saveToHistory()
  }

  const updateBlock = (id: string, content: string) => {
    console.log("[v0] Updating block:", id, "Content:", content.substring(0, 50))
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, content } : block)))
  }

  const deleteBlock = (id: string) => {
    console.log("[v0] Deleting block:", id)
    setBlocks(blocks.filter((block) => block.id !== id))
    toast({ description: "Block deleted" })
    saveToHistory()
  }

  const duplicateBlock = (id: string) => {
    console.log("[v0] Duplicating block:", id)
    const blockToDuplicate = blocks.find((b) => b.id === id)
    if (!blockToDuplicate) {
      console.log("[v0] Block not found for duplication")
      return
    }

    const newBlock: ContentBlock = {
      ...blockToDuplicate,
      id: Math.random().toString(36).substr(2, 9),
    }
    const blockIndex = blocks.findIndex((b) => b.id === id)
    const newBlocks = [...blocks]
    newBlocks.splice(blockIndex + 1, 0, newBlock)
    console.log("[v0] Block duplicated successfully")
    setBlocks(newBlocks)
    toast({ description: "Block duplicated" })
    saveToHistory()
  }

  const moveBlock = (id: string, direction: "up" | "down") => {
    const blockIndex = blocks.findIndex((b) => b.id === id)
    if (blockIndex === -1) return
    if (direction === "up" && blockIndex === 0) return
    if (direction === "down" && blockIndex === blocks.length - 1) return

    const newBlocks = [...blocks]
    const targetIndex = direction === "up" ? blockIndex - 1 : blockIndex + 1
    ;[newBlocks[blockIndex], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[blockIndex]]

    setBlocks(newBlocks)
    toast({ description: `Block moved ${direction}` })
    saveToHistory()
  }

  const reorderBlocks = (newBlocks: ContentBlock[]) => {
    setBlocks(newBlocks)
    toast({ description: "Blocks reordered" })
    saveToHistory()
  }

  const updateBlockStyle = (id: string, style: Partial<Pick<ContentBlock, "fontSize" | "fontFamily">>) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, ...style } : block)))
  }

  const openImageUpload = (blockId: string) => {
    setCurrentBlockId(blockId)
    setUploadModalOpen(true)
  }

  const handleImagesSelected = (images: string[]) => {
    if (!currentBlockId) return

    setBlocks(
      blocks.map((block) => {
        if (block.id === currentBlockId) {
          if (block.type === "image-single") {
            return { ...block, imageUrl: images[0] }
          } else if (block.type === "image-grid") {
            const maxImages = block.gridColumns || 2
            return { ...block, gridImages: images.slice(0, maxImages) }
          }
        }
        return block
      }),
    )
    setCurrentBlockId(null)
    saveToHistory()
  }

  const handleGridColumnsChange = (blockId: string, columns: number) => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === blockId) {
          return { ...block, gridColumns: columns }
        }
        return block
      }),
    )
    saveToHistory()
  }

  // Auto-save every 30 seconds
  useEffect(() => {
    if (blocks.length === 0) return

    const autoSave = async () => {
      setIsSaving(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setLastSaved(new Date())
      setIsSaving(false)
    }

    const timer = setTimeout(autoSave, 30000)
    return () => clearTimeout(timer)
  }, [blocks])

  const saveToHistory = useCallback(() => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...blocks])
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [blocks, history, historyIndex])

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setBlocks(history[historyIndex - 1])
      toast({ description: "Undone" })
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setBlocks(history[historyIndex + 1])
      toast({ description: "Redone" })
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault()
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault()
        handleSaveToDraft()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [historyIndex, history])

  const handleSaveToDraft = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setLastSaved(new Date())
    setIsSaving(false)
    toast({
      description: "Draft saved successfully",
    })
  }

  const handlePreview = () => {
    console.log("[v0] Opening preview with", blocks.length, "blocks")

    if (blocks.length === 0) {
      toast({
        title: "No content to preview",
        description: "Add some content blocks first",
        variant: "destructive",
      })
      return
    }

    toast({ description: "Opening preview..." })
    // Store blocks in localStorage for preview page
    localStorage.setItem("blog-preview", JSON.stringify(blocks))
    // Open in new tab
    window.open("/dashboard/blog-post-editor/preview", "_blank")
  }

  if (!showEditor) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Write a Blog Post</h2>
              <p className="text-gray-600 mb-8 max-w-md">
                Blog posts are a great way to build a community around your products and your brand
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowEditor(true)}
                  className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Write Yourself
                </button>
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <span>⚡</span>
                  Start with AI
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Middle Panel - Element Options */}
      <div className="w-80 border-r border-gray-200 flex flex-col overflow-hidden">
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Host Blog Post Editor</h1>
            <p className="text-sm text-gray-500">Create and manage your blogs</p>
          </div>
        </div>

        <div className="px-6 py-2 border-b bg-gray-50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {isSaving ? (
              <>
                <Save className="w-3 h-3 animate-pulse text-blue-600" />
                <span className="text-gray-600">Saving...</span>
              </>
            ) : lastSaved ? (
              <>
                <Clock className="w-3 h-3 text-green-600" />
                <span className="text-gray-600">Saved {lastSaved.toLocaleTimeString()}</span>
              </>
            ) : (
              <span className="text-gray-400">Not saved</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={undo}
              disabled={historyIndex <= 0}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Blog Type Selector */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Write a Blog Post</h2>
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Personal Blog</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <span>⚡</span>
              <span>Start with AI</span>
            </button>
          </div>

          {/* Add Element */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Add Element</h3>
            <div className="grid grid-cols-2 gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                    <div className="text-3xl font-bold text-gray-400 group-hover:text-blue-600 mb-1">H</div>
                    <span className="text-xs text-gray-600 group-hover:text-blue-600 flex items-center gap-1">
                      Header <ChevronDown className="w-3 h-3" />
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => addBlock("h1")}>Heading 1 (H1)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("h2")}>Heading 2 (H2)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("h3")}>Heading 3 (H3)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("h4")}>Heading 4 (H4)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("h5")}>Heading 5 (H5)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("h6")}>Heading 6 (H6)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                    <div className="text-2xl font-normal text-gray-400 group-hover:text-blue-600 mb-1">h</div>
                    <span className="text-xs text-gray-600 group-hover:text-blue-600 flex items-center gap-1">
                      Body Text <ChevronDown className="w-3 h-3" />
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => addBlock("body", { textType: "body1" })}>Body 1</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("body", { textType: "body2" })}>Body 2</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                    <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mb-1" />
                    <span className="text-xs text-gray-600 group-hover:text-blue-600 flex items-center gap-1">
                      Single Image <ChevronDown className="w-3 h-3" />
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => addBlock("image-single", { imageSize: "large" })}>
                    Large
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("image-single", { imageSize: "medium" })}>
                    Medium
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => addBlock("image-single", { imageSize: "small" })}>
                    Small
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                onClick={() => addBlock("image-grid")}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
              >
                <Grid3x3 className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mb-1" />
                <span className="text-xs text-gray-600 group-hover:text-blue-600">Grid Image</span>
              </button>

              <button
                onClick={() => addBlock("cta")}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
              >
                <div className="text-2xl font-bold text-gray-400 group-hover:text-blue-600 mb-1">CTA</div>
                <span className="text-xs text-gray-600 group-hover:text-blue-600">Call to Action</span>
              </button>
            </div>
          </div>

          {/* Add Attachments */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Add Attachments</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <DocumentIcon className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mb-1" />
                <span className="text-xs text-gray-600 group-hover:text-blue-600">Document</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <Link2 className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mb-1" />
                <span className="text-xs text-gray-600 group-hover:text-blue-600">Links</span>
              </button>
            </div>
          </div>

          {/* Add Custom Settings */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Add Custom Settings</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <Settings className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mb-1" />
                <span className="text-xs text-gray-600 group-hover:text-blue-600">Content Settings</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <Bell className="w-6 h-6 text-gray-400 group-hover:text-blue-600 mb-1" />
                <span className="text-xs text-gray-600 group-hover:text-blue-600">Publish Settings</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              variant="outline"
              className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
              onClick={handlePreview}
            >
              Preview Blog
            </Button>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Publish</Button>
            <Button
              variant="outline"
              className="w-full border-2 border-gray-300 hover:bg-gray-50 bg-transparent"
              onClick={handleSaveToDraft}
            >
              Save to Draft
            </Button>
            <Button variant="ghost" className="w-full text-gray-600 hover:bg-gray-50">
              Schedule
            </Button>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {blocks.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-lg px-4">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PenTool className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Start Creating Your Blog</h2>
                <div className="relative max-w-xl mx-auto">
                  <Input
                    placeholder="What do you want to explore today?"
                    className="pl-4 pr-24 py-6 text-base border-gray-300 rounded-full"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Mic className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                      <Send className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <BlogCanvas
              blocks={blocks}
              onBlockUpdate={updateBlock}
              onBlockDelete={deleteBlock}
              onImageUpload={openImageUpload}
              onBlockDuplicate={duplicateBlock}
              onBlockMove={moveBlock}
              onBlocksReorder={reorderBlocks}
              onBlockStyleUpdate={updateBlockStyle}
              onGridColumnsChange={handleGridColumnsChange}
            />
          )}
        </div>
      </div>

      <UploadImageModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        onImagesSelected={handleImagesSelected}
      />
    </div>
  )
}
