"use client"

import { useState, useRef, useEffect } from "react"
import { Bold, Italic, Underline, List, ListOrdered, Link2, Code, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  fontSize?: string
  fontFamily?: string
  onStyleChange?: (style: { fontSize?: string; fontFamily?: string }) => void
}

export function RichTextEditor({
  content,
  onChange,
  placeholder,
  fontSize = "1rem",
  fontFamily = "inherit",
  onStyleChange,
}: RichTextEditorProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const editorRef = useRef<HTMLDivElement>(null)
  const [localContent, setLocalContent] = useState(content)
  const [isEmpty, setIsEmpty] = useState(!content || content.trim() === "")

  useEffect(() => {
    if (!isFocused && editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content
    }
  }, [content, isFocused])

  const formatText = (command: string, value?: string) => {
    console.log("[v0] Formatting text:", command, value)
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const insertLink = () => {
    if (linkUrl) {
      formatText("createLink", linkUrl)
      setLinkUrl("")
      setShowLinkDialog(false)
    }
  }

  const adjustFontSize = (increase: boolean) => {
    const currentSize = Number.parseFloat(fontSize)
    const newSize = increase ? currentSize + 0.125 : currentSize - 0.125
    const clampedSize = Math.max(0.75, Math.min(2, newSize))
    onStyleChange?.({ fontSize: `${clampedSize}rem` })
  }

  const handleInput = () => {
    if (!editorRef.current) return
    const newContent = editorRef.current.innerHTML
    const textContent = editorRef.current.innerText || ""
    setIsEmpty(textContent.trim() === "")
    onChange(newContent)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "b":
            e.preventDefault()
            formatText("bold")
            break
          case "i":
            e.preventDefault()
            formatText("italic")
            break
          case "u":
            e.preventDefault()
            formatText("underline")
            break
          case "k":
            e.preventDefault()
            setShowLinkDialog(true)
            break
        }
      }
    }

    if (isFocused) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFocused])

  return (
    <div className="border-2 border-gray-200 hover:border-gray-300 focus-within:border-blue-400 rounded-lg bg-white transition-colors">
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[150px] max-h-[400px] overflow-y-auto p-4 outline-none text-gray-700 prose prose-sm max-w-none"
          onFocus={() => {
            console.log("[v0] Editor focused")
            setIsFocused(true)
          }}
          onBlur={() => {
            console.log("[v0] Editor blurred")
            setTimeout(() => setIsFocused(false), 200)
          }}
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: localContent }}
          suppressContentEditableWarning
          data-placeholder={placeholder}
          style={{
            fontSize,
            fontFamily,
          }}
        />
        {isEmpty && !isFocused && (
          <div className="absolute top-4 left-4 text-gray-400 pointer-events-none" style={{ fontSize, fontFamily }}>
            {placeholder || "Start writing..."}
          </div>
        )}
      </div>

      {isFocused && (
        <div className="flex items-center gap-1 p-2 border-t bg-gray-50 flex-wrap">
          <div className="flex items-center gap-0.5 pr-2 border-r">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-gray-200"
              onClick={() => formatText("bold")}
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-gray-200"
              onClick={() => formatText("italic")}
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-gray-200"
              onClick={() => formatText("underline")}
              title="Underline (Ctrl+U)"
            >
              <Underline className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-0.5 px-2 border-r">
            <select
              className="h-8 px-2 text-sm border border-gray-200 rounded hover:border-gray-300 focus:outline-none focus:border-blue-400"
              onChange={(e) => formatText("formatBlock", e.target.value)}
              defaultValue="p"
            >
              <option value="p">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
            </select>
          </div>

          {onStyleChange && (
            <>
              <div className="flex items-center gap-0.5 px-2 border-r">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-gray-200"
                  onClick={() => adjustFontSize(false)}
                  title="Decrease Font Size"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xs px-1 min-w-[3rem] text-center">{Number.parseInt(fontSize) * 16}px</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-gray-200"
                  onClick={() => adjustFontSize(true)}
                  title="Increase Font Size"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-0.5 px-2 border-r">
                <select
                  className="h-8 px-2 text-sm border border-gray-200 rounded hover:border-gray-300 focus:outline-none focus:border-blue-400"
                  value={fontFamily}
                  onChange={(e) => onStyleChange({ fontFamily: e.target.value })}
                >
                  <option value="inherit">Default</option>
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Playfair Display', serif">Playfair Display</option>
                  <option value="'Roboto', sans-serif">Roboto</option>
                  <option value="'Merriweather', serif">Merriweather</option>
                  <option value="'Montserrat', sans-serif">Montserrat</option>
                  <option value="'Open Sans', sans-serif">Open Sans</option>
                </select>
              </div>
            </>
          )}

          <div className="flex items-center gap-0.5 px-2 border-r">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-gray-200"
              onClick={() => formatText("insertUnorderedList")}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-gray-200"
              onClick={() => formatText("insertOrderedList")}
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-0.5 px-2">
            <Popover open={showLinkDialog} onOpenChange={setShowLinkDialog}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-200" title="Insert Link (Ctrl+K)">
                  <Link2 className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Insert Link</h4>
                  <Input
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        insertLink()
                      }
                    }}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowLinkDialog(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={insertLink}>
                      Insert
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-gray-200"
              onClick={() => formatText("formatBlock", "pre")}
              title="Code Block"
            >
              <Code className="w-4 h-4" />
            </Button>
          </div>

          <div className="ml-auto text-xs text-gray-500 px-2">
            {editorRef.current?.innerText.length || 0} characters
          </div>
        </div>
      )}
    </div>
  )
}
