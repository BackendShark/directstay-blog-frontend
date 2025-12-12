"use client";

import { useState, useRef } from "react";
import { Upload, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentBlock } from "@/app/dashboard/blog-editor/page";
import { useBlogEditor } from "../blog-editor-context";
import { ImageUploadModal } from "../image-upload-modal";

interface ImageGridBlockProps {
  block: ContentBlock;
}

export function ImageGridBlock({ block }: ImageGridBlockProps) {
  const { updateBlock } = useBlogEditor();
  const [showImageModal, setShowImageModal] = useState<{ index?: number } | null>(null);
  const [resizingBlock, setResizingBlock] = useState<string | null>(null);
  const resizeRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  const addImageToGrid = () => {
    const currentContent = block.content as string[];
    if (currentContent.length >= 3) return;

    const newContent = [...currentContent, ""];
    updateBlock(block.id, { content: newContent });
  };

  const removeImageFromGrid = (index: number) => {
    const currentContent = block.content as string[];
    if (currentContent.length <= 2) return;

    const newContent = currentContent.filter((_, idx) => idx !== index);
    updateBlock(block.id, { content: newContent });
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setResizingBlock(block.id);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: block.size?.width || 100,
      startHeight: block.size?.height || 400,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizeRef.current) return;

      const deltaY = moveEvent.clientY - resizeRef.current.startY;
      const newHeight = Math.max(100, resizeRef.current.startHeight + deltaY);

      updateBlock(block.id, {
        size: { width: block.size?.width || 100, height: newHeight },
      });
    };

    const handleMouseUp = () => {
      setResizingBlock(null);
      resizeRef.current = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleImageSelect = (imageUrl: string) => {
    if (showImageModal?.index !== undefined) {
      const newContent = [...(block.content as string[])];
      newContent[showImageModal.index] = imageUrl;
      updateBlock(block.id, { content: newContent });
    }
    setShowImageModal(null);
  };

  return (
    <>
      <div className="relative group/grid">
        <div
          className={cn(
            "grid gap-4",
            (block.content as string[]).length === 2 && "grid-cols-2",
            (block.content as string[]).length === 3 && "grid-cols-3",
            (block.content as string[]).length > 3 && "grid-cols-2 md:grid-cols-3"
          )}
        >
          {(block.content as string[]).map((img, idx) => (
            <div key={idx} className="relative group/grid-item">
              {img ? (
                <>
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Grid image ${idx + 1}`}
                    className="w-full rounded-lg object-cover"
                    style={{
                      height: block.size?.height || 400,
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowImageModal({ index: idx });
                    }}
                    className="absolute top-2 right-2 p-2 bg-background/90 border border-border rounded opacity-0 group-hover/grid-item:opacity-100 transition-opacity"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                  {(block.content as string[]).length > 2 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImageFromGrid(idx);
                      }}
                      className="absolute top-2 left-2 p-2 bg-destructive/90 text-destructive-foreground border border-border rounded opacity-0 group-hover/grid-item:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => setShowImageModal({ index: idx })}
                  className="w-full h-[400px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
                >
                  <Upload className="w-6 h-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Upload Image</span>
                </button>
              )}
            </div>
          ))}
        </div>
        {(block.content as string[]).length < 3 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addImageToGrid();
            }}
            className="mt-4 w-full py-3 border-2 border-dashed border-border rounded-lg flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Add Image to Grid</span>
          </button>
        )}
        <div
          className="absolute bottom-0 left-0 right-0 h-2 bg-[#5B6FFF] opacity-0 group-hover/grid:opacity-50 cursor-ns-resize rounded-b-lg"
          onMouseDown={handleResizeStart}
        />
      </div>

      {showImageModal && (
        <ImageUploadModal
          onClose={() => setShowImageModal(null)}
          onImageSelect={handleImageSelect}
        />
      )}
    </>
  );
}