"use client";

import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { ContentBlock } from "@/app/dashboard/blog-editor/page";
import { useBlogEditor } from "../blog-editor-context";
import { ImageUploadModal } from "../image-upload-modal";

interface SingleImageBlockProps {
  block: ContentBlock;
}

export function SingleImageBlock({ block }: SingleImageBlockProps) {
  const { updateBlock } = useBlogEditor();
  const [showImageModal, setShowImageModal] = useState(false);
  const [resizingBlock, setResizingBlock] = useState<string | null>(null);
  const resizeRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setResizingBlock(block.id);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: block.size?.width || 100,
      startHeight: block.size?.height || 500,
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
    updateBlock(block.id, { content: imageUrl });
    setShowImageModal(false);
  };

  return (
    <>
      <div className="relative group/image">
        {block.content ? (
          <div className="relative">
            <img
              src={(block.content as string) || "/placeholder.svg"}
              alt="Blog content"
              className="w-full rounded-lg object-cover"
              style={{
                height: block.size?.height || 500,
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowImageModal(true);
              }}
              className="absolute top-2 right-2 p-2 bg-background/90 border border-border rounded opacity-0 group-hover/image:opacity-100 transition-opacity"
            >
              <Upload className="w-4 h-4" />
            </button>
            <div
              className="absolute bottom-0 left-0 right-0 h-2 bg-[#5B6FFF] opacity-0 group-hover:opacity-50 cursor-ns-resize rounded-b-lg"
              onMouseDown={handleResizeStart}
            />
          </div>
        ) : (
          <button
            onClick={() => setShowImageModal(true)}
            className="w-full h-[500px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3 hover:bg-muted/50 transition-colors"
          >
            <Upload className="w-8 h-8 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Upload Banner Image
              </p>
              <p className="text-xs text-muted-foreground">
                Full width by default
              </p>
            </div>
          </button>
        )}
      </div>

      {showImageModal && (
        <ImageUploadModal
          onClose={() => setShowImageModal(false)}
          onImageSelect={handleImageSelect}
        />
      )}
    </>
  );
}