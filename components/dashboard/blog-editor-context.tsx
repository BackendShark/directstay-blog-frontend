"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { BlogContent, ContentBlock, Merchant, PropertyListing } from "@/app/dashboard/blog-editor/page";

interface BlogEditorContextType {
  blogContent: BlogContent;
  setBlogContent: (content: BlogContent) => void;
  blogType: "personal" | "sponsored";
  setBlogType: (type: "personal" | "sponsored") => void;
  selectedMerchant: Merchant | null;
  setSelectedMerchant: (merchant: Merchant | null) => void;
  isPreview: boolean;
  setIsPreview: (preview: boolean) => void;
  selectedBlockId: string | null;
  setSelectedBlockId: (id: string | null) => void;
  updateBlock: (id: string, updates: Partial<ContentBlock>) => void;
  deleteBlock: (id: string) => void;
  addBlock: (type: ContentBlock["type"], content?: string) => void;
  insertBlockAt: (type: ContentBlock["type"], index: number, content?: string) => void;
}

const BlogEditorContext = createContext<BlogEditorContextType | undefined>(undefined);

export function BlogEditorProvider({ children, initialContent, onContentChange }: {
  children: ReactNode;
  initialContent: BlogContent;
  onContentChange: (content: BlogContent) => void;
}) {
  const [blogContent, setBlogContentState] = useState<BlogContent>(initialContent);
  const [blogType, setBlogType] = useState<"personal" | "sponsored">(initialContent.blogType || "personal");
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(initialContent.selectedMerchant || null);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const setBlogContent = (content: BlogContent) => {
    setBlogContentState(content);
    onContentChange(content);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    const updatedContent = {
      ...blogContent,
      blocks: blogContent.blocks.map((block) =>
        block.id === id ? { ...block, ...updates } : block
      ),
    };
    setBlogContent(updatedContent);
  };

  const deleteBlock = (id: string) => {
    const updatedContent = {
      ...blogContent,
      blocks: blogContent.blocks.filter((block) => block.id !== id),
    };
    setBlogContent(updatedContent);
  };

  const addBlock = (type: ContentBlock["type"], content = "") => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: type === "image-grid" ? ["", ""] : content,
      size: type === "single-image" ? { width: 100, height: 500 } : type === "image-grid" ? { width: 100, height: 400 } : undefined,
      headerLevel: type === "header" ? 2 : undefined,
      bodySize: type === "body" ? "medium" : undefined,
    };
    setBlogContent({
      ...blogContent,
      blocks: [...blogContent.blocks, newBlock],
    });
  };

  const insertBlockAt = (type: ContentBlock["type"], index: number, content = "") => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: type === "image-grid" ? ["", ""] : content,
      size: type === "single-image" ? { width: 100, height: 500 } : type === "image-grid" ? { width: 100, height: 400 } : undefined,
      headerLevel: type === "header" ? 2 : undefined,
      bodySize: type === "body" ? "medium" : undefined,
    };
    const newBlocks = [...blogContent.blocks];
    newBlocks.splice(index, 0, newBlock);
    setBlogContent({
      ...blogContent,
      blocks: newBlocks,
    });
  };

  return (
    <BlogEditorContext.Provider
      value={{
        blogContent,
        setBlogContent,
        blogType,
        setBlogType,
        selectedMerchant,
        setSelectedMerchant,
        isPreview,
        setIsPreview,
        selectedBlockId,
        setSelectedBlockId,
        updateBlock,
        deleteBlock,
        addBlock,
        insertBlockAt,
      }}
    >
      {children}
    </BlogEditorContext.Provider>
  );
}

export function useBlogEditor() {
  const context = useContext(BlogEditorContext);
  if (context === undefined) {
    throw new Error("useBlogEditor must be used within a BlogEditorProvider");
  }
  return context;
}