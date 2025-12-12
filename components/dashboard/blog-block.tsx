"use client";

import { useState, useRef } from "react";
import { GripVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContentBlock } from "@/app/dashboard/blog-editor/page";
import { useBlogEditor } from "./blog-editor-context";
import { HeaderBlock } from "./blocks/header-block";
import { BodyBlock } from "./blocks/body-block";
import { SingleImageBlock } from "./blocks/single-image-block";
import { ImageGridBlock } from "./blocks/image-grid-block";

interface BlogBlockProps {
  block: ContentBlock;
}

export function BlogBlock({ block }: BlogBlockProps) {
  const { selectedBlockId, setSelectedBlockId, deleteBlock, updateBlock } = useBlogEditor();
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    setDraggedBlock(blockId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    // Handle drop logic would be implemented here
    setDraggedBlock(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
    setDragOverIndex(null);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, block.id)}
      onDragEnd={handleDragEnd}
      className={cn(
        "editor-block relative group",
        selectedBlockId === block.id && "ring-2 ring-[#5B6FFF] rounded-lg",
        draggedBlock === block.id && "opacity-50"
      )}
      onClick={() => setSelectedBlockId(block.id)}
    >
      {/* Drag Handle */}
      <div className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* Block Controls */}
      <div className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteBlock(block.id);
          }}
          className="p-1 bg-background border border-border rounded hover:bg-destructive hover:text-destructive-foreground transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Block Content */}
      {block.type === "header" && <HeaderBlock block={block} />}
      {block.type === "body" && <BodyBlock block={block} />}
      {block.type === "single-image" && <SingleImageBlock block={block} />}
      {block.type === "image-grid" && <ImageGridBlock block={block} />}
    </div>
  );
}