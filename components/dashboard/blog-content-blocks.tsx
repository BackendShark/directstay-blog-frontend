"use client";

import { useState } from "react";
import { Plus, Type, ImageIcon, Grid3x3 } from "lucide-react";
import { useBlogEditor } from "./blog-editor-context";
import { BlogBlock } from "./blog-block";

export function BlogContentBlocks() {
  const { blogContent, insertBlockAt } = useBlogEditor();
  const [showInsertAt, setShowInsertAt] = useState<number | null>(null);

  return (
    <div>
      {/* Initial insert zone */}
      <div
        className="relative h-8 group"
        onMouseEnter={() => setShowInsertAt(0)}
        onMouseLeave={() => setShowInsertAt(null)}
      >
        {showInsertAt === 0 && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-2 bg-background border border-border rounded-lg shadow-lg p-2 z-10">
            <button
              onClick={() => insertBlockAt("header", 0)}
              className="p-2 hover:bg-muted rounded"
              title="Add Header"
            >
              <Type className="w-4 h-4" strokeWidth={3} />
            </button>
            <button
              onClick={() => insertBlockAt("body", 0)}
              className="p-2 hover:bg-muted rounded"
              title="Add Body Text"
            >
              <Type className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              onClick={() => insertBlockAt("single-image", 0)}
              className="p-2 hover:bg-muted rounded"
              title="Add Image"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertBlockAt("image-grid", 0)}
              className="p-2 hover:bg-muted rounded"
              title="Add Grid"
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-border opacity-0 group-hover:opacity-100 transition-opacity" />
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#5B6FFF] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Render blocks */}
      {blogContent.blocks.map((block, index) => (
        <div key={block.id}>
          <div
            className="relative"
            style={{
              marginBottom:
                index < blogContent.blocks.length - 1 ||
                blogContent.propertyListings.length > 0
                  ? `${blogContent.contentSettings?.sectionSpacing || 48}px`
                  : "0",
            }}
          >
            <BlogBlock block={block} />
          </div>

          {/* Insert Zone after each block */}
          <div
            className="relative h-8 group"
            onMouseEnter={() => setShowInsertAt(index + 1)}
            onMouseLeave={() => setShowInsertAt(null)}
          >
            {showInsertAt === index + 1 && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-2 bg-background border border-border rounded-lg shadow-lg p-2 z-10">
                <button
                  onClick={() => insertBlockAt("header", index + 1)}
                  className="p-2 hover:bg-muted rounded"
                  title="Add Header"
                >
                  <Type className="w-4 h-4" strokeWidth={3} />
                </button>
                <button
                  onClick={() => insertBlockAt("body", index + 1)}
                  className="p-2 hover:bg-muted rounded"
                  title="Add Body Text"
                >
                  <Type className="w-4 h-4" strokeWidth={2} />
                </button>
                <button
                  onClick={() => insertBlockAt("single-image", index + 1)}
                  className="p-2 hover:bg-muted rounded"
                  title="Add Image"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => insertBlockAt("image-grid", index + 1)}
                  className="p-2 hover:bg-muted rounded"
                  title="Add Grid"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border opacity-0 group-hover:opacity-100 transition-opacity" />
            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#5B6FFF] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}