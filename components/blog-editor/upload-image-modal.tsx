"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, X } from "lucide-react"
import { ImageGrid } from "./image-grid"

interface UploadImageModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImagesSelected: (images: string[]) => void
}

export function UploadImageModal({ open, onOpenChange, onImagesSelected }: UploadImageModalProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"computer" | "toolkit">("computer")

  // Mock images from media toolkit
  const mediaToolkitImages = Array(9).fill("/placeholder.svg?height=300&width=400")

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    // Handle file drop logic here
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file selection logic here
  }

  const handleAddMedia = () => {
    onImagesSelected(selectedImages)
    onOpenChange(false)
    setSelectedImages([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[80vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DialogTitle>Upload Image</DialogTitle>
              {activeTab === "computer" && <span className="text-sm text-gray-500">› Upload from Computer</span>}
              {activeTab === "toolkit" && <span className="text-sm text-gray-500">› Media Tool Kit</span>}
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1">
          <div className="px-6">
            <TabsList className="hidden">
              <TabsTrigger value="computer">Computer</TabsTrigger>
              <TabsTrigger value="toolkit">Media Toolkit</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="computer" className="p-6 m-0">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-1">Drop your files here or browse</p>
              <p className="text-sm text-gray-500 mb-6">max file up to 1 GB</p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" className="relative bg-transparent">
                  Upload from Computer
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileSelect}
                  />
                </Button>
                <Button onClick={() => setActiveTab("toolkit")}>Browse Medial Toolkit</Button>
              </div>
            </div>

            {selectedImages.length > 0 && (
              <ImageGrid
                images={selectedImages}
                selectedImages={selectedImages}
                onSelectionChange={setSelectedImages}
              />
            )}
          </TabsContent>

          <TabsContent value="toolkit" className="p-6 m-0 overflow-y-auto max-h-[calc(80vh-200px)]">
            <ImageGrid
              images={mediaToolkitImages}
              selectedImages={selectedImages}
              onSelectionChange={setSelectedImages}
              showContextMenu
            />
          </TabsContent>
        </Tabs>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddMedia} disabled={selectedImages.length === 0}>
            Add Media
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
