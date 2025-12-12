"use client";

import { useState } from "react";
import { X, MapPin } from "lucide-react";
import { BlogEditorProvider } from "./blog-editor-context";
import { BlogEditorHeader } from "./blog-editor-header";
import { BlogEditorSidebar } from "./blog-editor-sidebar";
import { BlogAIPrompt } from "./blog-ai-prompt";
import { BlogContentBlocks } from "./blog-content-blocks";
import { BlogPreview } from "./blog-preview";
import { BlogActions } from "./blog-actions";
import { ScheduleModal } from "./schedule-modal";
import { SuccessModal } from "./success-modal";
import { PropertyListingModal } from "./property-listing-modal";
import { ContentSettingsModal } from "./content-settings-modal";
import { PublishSettingsModal } from "./publish-settings-modal";
import {
  BlogContent,
  PropertyListing,
  PublishSettings,
} from "@/app/dashboard/blog-editor/page";

interface EditorStateProps {
  onBack: () => void;
  blogContent: BlogContent;
  setBlogContent: (content: BlogContent) => void;
}

export function EditorState({
  onBack,
  blogContent,
  setBlogContent,
}: EditorStateProps) {
  const [showPropertyListingModal, setShowPropertyListingModal] = useState(false);
  const [showContentSettingsModal, setShowContentSettingsModal] = useState(false);
  const [showPublishSettings, setShowPublishSettings] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalType, setSuccessModalType] = useState<"draft" | "publish" | "schedule">("draft");
  const [publishedBlogLink, setPublishedBlogLink] = useState("");

  const availablePropertyListings: PropertyListing[] = [
    {
      id: "listing-1",
      title: "Soft Cotton Pants Luxury",
      description: "Peaceful countryside retreat...",
      location: "England, UK",
      rating: 4.1,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "listing-2",
      title: "Soft Cotton Pants Luxury",
      description: "Peaceful countryside retreat...",
      location: "England, UK",
      rating: 4.1,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "listing-3",
      title: "Soft Cotton Pants Luxury",
      description: "Peaceful countryside retreat...",
      location: "England, UK",
      rating: 4.1,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "listing-4",
      title: "Cason's Cabin-Callaway Gardens Area",
      description: "Historic Property-Lake-Pool-Trails",
      location: "Carletonport, Alabama",
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "listing-5",
      title: "Mountain View Retreat",
      description: "Stunning views and modern amenities",
      location: "Colorado, USA",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  const handleAddPropertyListings = (listings: PropertyListing[]) => {
    setBlogContent({
      ...blogContent,
      propertyListings: [...blogContent.propertyListings, ...listings],
    });
  };

  const handleRemovePropertyListing = (id: string) => {
    setBlogContent({
      ...blogContent,
      propertyListings: blogContent.propertyListings.filter(
        (listing) => listing.id !== id
      ),
    });
  };

  const blogActions = BlogActions({
    onShowPublishSettings: () => setShowPublishSettings(true),
    onShowScheduleModal: () => setShowScheduleModal(true),
    onShowSuccessModal: setSuccessModalType,
    onSetPublishedBlogLink: setPublishedBlogLink,
  });

  return (
    <BlogEditorProvider initialContent={blogContent} onContentChange={setBlogContent}>
      <div className="h-full flex flex-col">
        <BlogEditorHeader onBack={onBack} />

        <div className="flex-1 flex overflow-hidden">
          <BlogEditorSidebar
            onPublish={blogActions.publishBlog}
            onSaveToDraft={blogActions.saveToDraft}
            onSchedule={() => setShowScheduleModal(true)}
            onShowPropertyListingModal={() => setShowPropertyListingModal(true)}
            onShowContentSettingsModal={() => setShowContentSettingsModal(true)}
            onShowPublishSettingsModal={() => setShowPublishSettings(true)}
          />

        {/* Main Editor Area */}
        <div className="flex-1 overflow-y-auto bg-background">
          <div className="max-w-4xl mx-auto py-8">
            {/* Main editor content */}
            <div className="flex-1 overflow-y-auto">
              <div
                className="max-w-4xl mx-auto py-8"
                style={{
                  paddingLeft: `${
                    blogContent.contentSettings?.marginPadding || 48
                  }px`,
                  paddingRight: `${
                    blogContent.contentSettings?.marginPadding || 48
                  }px`,
                }}
              >
                {isPreview ? (
                  <div
                    className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-12"
                    style={{
                      padding: `${
                        blogContent.contentSettings?.marginPadding || 48
                      }px`,
                    }}
                  >
                    {blogContent.title && (
                      <h1 className="text-5xl font-bold mb-8 text-balance">
                        {blogContent.title}
                      </h1>
                    )}
                    {blogContent.blocks.map((block) => (
                      <div key={block.id} className="mb-6">
                        {block.type === "header" && (
                          <>
                            {block.headerLevel === 1 && (
                              <h1 className="text-5xl font-bold text-balance">
                                {block.content}
                              </h1>
                            )}
                            {block.headerLevel === 2 && (
                              <h2 className="text-4xl font-bold text-balance">
                                {block.content}
                              </h2>
                            )}
                            {block.headerLevel === 3 && (
                              <h3 className="text-3xl font-bold text-balance">
                                {block.content}
                              </h3>
                            )}
                            {block.headerLevel === 4 && (
                              <h4 className="text-2xl font-bold text-balance">
                                {block.content}
                              </h4>
                            )}
                            {block.headerLevel === 5 && (
                              <h5 className="text-xl font-bold text-balance">
                                {block.content}
                              </h5>
                            )}
                            {block.headerLevel === 6 && (
                              <h6 className="text-lg font-bold text-balance">
                                {block.content}
                              </h6>
                            )}
                          </>
                        )}
                        {block.type === "body" && (
                          <div
                            className={cn(
                              "whitespace-pre-wrap",
                              block.bodySize === "small" && "text-sm",
                              block.bodySize === "medium" && "text-base",
                              block.bodySize === "large" && "text-lg"
                            )}
                            dangerouslySetInnerHTML={{
                              __html: (block.content as string)
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  "<strong>$1</strong>"
                                )
                                .replace(
                                  /(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g,
                                  "<em>$1</em>"
                                )
                                .replace(/~~(.*?)~~/g, "<del>$1</del>")
                                .replace(/<u>(.*?)<\/u>/g, "<u>$1</u>")
                                .replace(
                                  /`(.*?)`/g,
                                  "<code class='bg-muted px-1 rounded'>$1</code>"
                                )
                                .replace(
                                  /\[(.*?)\]$$(.*?)$$/g,
                                  "<a href='$2' class='text-[#5B6FFF] underline'>$1</a>"
                                )
                                .replace(
                                  /^- (.*)$/gm,
                                  "<li class='ml-4'>$1</li>"
                                )
                                .replace(
                                  /^\d+\. (.*)$/gm,
                                  "<li class='ml-4 list-decimal'>$1</li>"
                                )
                                .replace(
                                  /^> (.*)$/gm,
                                  "<blockquote class='border-l-4 border-[#5B6FFF] pl-4 italic'>$1</blockquote>"
                                ),
                            }}
                          />
                        )}
                        {block.type === "single-image" && block.content && (
                          <img
                            src={
                              (block.content as string) || "/placeholder.svg"
                            }
                            alt="Blog content"
                            className="w-full rounded-lg object-cover"
                            style={{ height: block.size?.height || 500 }}
                          />
                        )}
                        {block.type === "image-grid" && (
                          <div
                            className={cn(
                              "grid gap-4",
                              (block.content as string[]).length === 2 &&
                                "grid-cols-2",
                              (block.content as string[]).length === 3 &&
                                "grid-cols-3",
                              (block.content as string[]).length > 3 &&
                                "grid-cols-2 md:grid-cols-3"
                            )}
                          >
                            {(block.content as string[]).map(
                              (img, idx) =>
                                img && (
                                  <img
                                    key={idx}
                                    src={img || "/placeholder.svg"}
                                    alt={`Grid image ${idx + 1}`}
                                    className="w-full rounded-lg object-cover"
                                    style={{
                                      height: block.size?.height || 400,
                                    }}
                                  />
                                )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {blogType === "sponsored" &&
                      selectedMerchant &&
                      blogContent.blocks.length > 0 && (
                        <div className="mb-8 flex items-center justify-between p-4 bg-background border-2 border-dashed border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                src={
                                  selectedMerchant.avatar || "/placeholder.svg"
                                }
                                alt={selectedMerchant.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                                ✓
                              </div>
                            </div>
                            <span className="font-semibold text-foreground">
                              {selectedMerchant.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full">
                              Collab
                            </span>
                            <button
                              onClick={() => {
                                setSelectedMerchant(null);
                                setBlogType("personal");
                              }}
                              className="p-1 hover:bg-muted rounded transition-colors"
                            >
                              <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                          </div>
                        </div>
                      )}

                    {/* Empty state with AI input - only show when no blocks exist */}
                    {blogContent.blocks.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-24 px-8">
                        {isGenerating ? (
                          <>
                            <div className="w-24 h-24 bg-[#5B6FFF]/10 rounded-full flex items-center justify-center mb-8 opacity-50">
                              <div className="w-12 h-12 bg-[#5B6FFF]/20 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-[#5B6FFF]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-muted-foreground mb-12">
                              Start Creating Your Blog
                            </h2>
                            <div className="w-16 h-16 bg-[#5B6FFF] rounded-full flex items-center justify-center animate-pulse">
                              <div className="flex gap-1">
                                <div
                                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                                  style={{ animationDelay: "0ms" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                                  style={{ animationDelay: "150ms" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                                  style={{ animationDelay: "300ms" }}
                                ></div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-24 h-24 bg-[#5B6FFF]/10 rounded-full flex items-center justify-center mb-8">
                              <div className="w-12 h-12 bg-[#5B6FFF]/20 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-[#5B6FFF]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground mb-12">
                              Start Creating Your Blog
                            </h2>
                            <div className="w-full max-w-2xl space-y-4">
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder={
                                    selectedMerchant && blogType === "sponsored"
                                      ? `Write a blog using the offer of the ${selectedMerchant.name}`
                                      : "What do you want to explore today?"
                                  }
                                  value={aiPrompt}
                                  onChange={(e) => setAiPrompt(e.target.value)}
                                  className="w-full px-6 py-4 pr-24 text-base border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-[#5B6FFF]/20 focus:border-[#5B6FFF] transition-all"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && aiPrompt.trim()) {
                                      handleAIGenerate(aiPrompt);
                                    }
                                  }}
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                  <button
                                    className="p-2 hover:bg-accent rounded-full transition-colors"
                                    title="Voice input"
                                    onClick={() => {
                                      alert("Voice input feature coming soon!");
                                    }}
                                  >
                                    <Mic className="w-5 h-5 text-muted-foreground" />
                                  </button>
                                  <button
                                    className="p-2 bg-[#5B6FFF] hover:bg-[#5B6FFF]/90 rounded-full transition-colors"
                                    title="Send"
                                    onClick={() => {
                                      if (aiPrompt.trim()) {
                                        handleAIGenerate(aiPrompt);
                                      }
                                    }}
                                  >
                                    <Send className="w-5 h-5 text-white" />
                                  </button>
                                </div>
                              </div>

                              {/* Show selected merchant tag */}
                              {selectedMerchant && blogType === "sponsored" && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full w-fit">
                                  <img
                                    src={
                                      selectedMerchant.avatar ||
                                      "/placeholder.svg"
                                    }
                                    alt={selectedMerchant.name}
                                    className="w-6 h-6 rounded-full object-cover"
                                  />
                                  <span className="text-sm font-medium">
                                    {selectedMerchant.name}
                                  </span>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )}

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
                                ? `${
                                    blogContent.contentSettings
                                      ?.sectionSpacing || 48
                                  }px`
                                : "0",
                          }}
                        >
                          <div
                            draggable
                            onDragStart={(e) => handleDragStart(e, block.id)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                            className={cn(
                              "editor-block relative group",
                              selectedBlockId === block.id &&
                                "ring-2 ring-[#5B6FFF] rounded-lg",
                              draggedBlock === block.id && "opacity-50",
                              dragOverIndex === index &&
                                "border-t-2 border-[#5B6FFF]"
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

                            {/* Header Block */}
                            {block.type === "header" && (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <select
                                    value={block.headerLevel || 2}
                                    onChange={(e) =>
                                      updateBlock(block.id, {
                                        headerLevel: Number(e.target.value),
                                      })
                                    }
                                    className="px-2 py-1 text-xs border border-border rounded bg-background"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <option value={1}>H1</option>
                                    <option value={2}>H2</option>
                                    <option value={3}>H3</option>
                                    <option value={4}>H4</option>
                                    <option value={5}>H5</option>
                                    <option value={6}>H6</option>
                                  </select>
                                </div>
                                <textarea
                                  data-block-id={block.id}
                                  value={block.content as string}
                                  onChange={(e) => {
                                    e.target.style.height = "auto";
                                    e.target.style.height =
                                      e.target.scrollHeight + "px";
                                    updateBlock(block.id, {
                                      content: e.target.value,
                                    });
                                  }}
                                  onBlur={(e) => {
                                    if (!e.target.value.trim()) {
                                      e.target.style.height = "auto";
                                    }
                                  }}
                                  onKeyDown={(e) =>
                                    handleTextareaKeyDown(e, block.id)
                                  }
                                  placeholder="Enter header text..."
                                  className={cn(
                                    "w-full font-bold text-foreground placeholder:text-muted-foreground/50 bg-transparent border-none outline-none focus:ring-0 resize-none overflow-hidden",
                                    getHeaderStyles(block.headerLevel || 2)
                                  )}
                                  rows={1}
                                />
                                {selectedBlockId === block.id && (
                                  <div className="flex items-center gap-1 p-2 bg-[#5B6FFF] rounded-lg w-fit">
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "bold")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Bold"
                                    >
                                      <Bold className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "italic")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Italic"
                                    >
                                      <Italic className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "underline")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Underline"
                                    >
                                      <Underline className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(
                                          block.id,
                                          "strikethrough"
                                        )
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Strikethrough"
                                    >
                                      <Strikethrough className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "link")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Link"
                                    >
                                      <Link className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Body Text Block */}
                            {block.type === "body" && (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <select
                                    value={block.bodySize || "medium"}
                                    onChange={(e) =>
                                      updateBlock(block.id, {
                                        bodySize: e.target.value,
                                      })
                                    }
                                    className="px-2 py-1 text-xs border border-border rounded bg-background"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                  </select>
                                </div>
                                <textarea
                                  data-block-id={block.id}
                                  value={block.content as string}
                                  onChange={(e) => {
                                    e.target.style.height = "auto";
                                    e.target.style.height =
                                      e.target.scrollHeight + "px";
                                    updateBlock(block.id, {
                                      content: e.target.value,
                                    });
                                  }}
                                  onBlur={(e) => {
                                    if (!e.target.value.trim()) {
                                      e.target.style.height = "auto";
                                    }
                                  }}
                                  onKeyDown={(e) =>
                                    handleTextareaKeyDown(e, block.id)
                                  }
                                  placeholder="Start typing your content..."
                                  className={cn(
                                    "w-full text-foreground placeholder:text-muted-foreground/50 bg-transparent border-none outline-none focus:ring-0 resize-none overflow-hidden min-h-[60px]",
                                    getBodyTextSize(block.bodySize)
                                  )}
                                  rows={3}
                                />
                                {selectedBlockId === block.id && (
                                  <div className="flex items-center gap-1 p-2 bg-[#5B6FFF] rounded-lg w-fit flex-wrap">
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "bold")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Bold"
                                    >
                                      <Bold className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "italic")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Italic"
                                    >
                                      <Italic className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "underline")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Underline"
                                    >
                                      <Underline className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(
                                          block.id,
                                          "strikethrough"
                                        )
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Strikethrough"
                                    >
                                      <Strikethrough className="w-4 h-4" />
                                    </button>
                                    <div className="w-px h-6 bg-white/30" />
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "link")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Link"
                                    >
                                      <Link className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "code")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Inline Code"
                                    >
                                      <Code className="w-4 h-4" />
                                    </button>
                                    <div className="w-px h-6 bg-white/30" />
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "ul")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Bullet List"
                                    >
                                      <List className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "ol")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Numbered List"
                                    >
                                      <ListOrdered className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "quote")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Quote"
                                    >
                                      <Quote className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Single Image Block */}
                            {block.type === "single-image" && (
                              <div className="relative group/image">
                                {block.content ? (
                                  <div className="relative">
                                    <img
                                      src={
                                        (block.content as string) ||
                                        "/placeholder.svg"
                                      }
                                      alt="Blog content"
                                      className="w-full rounded-lg object-cover"
                                      style={{
                                        height: block.size?.height || 500,
                                      }}
                                    />
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openImageModal(block.id);
                                      }}
                                      className="absolute top-2 right-2 p-2 bg-background/90 border border-border rounded opacity-0 group-hover/image:opacity-100 transition-opacity"
                                    >
                                      <Upload className="w-4 h-4" />
                                    </button>
                                    <div
                                      className="absolute bottom-0 left-0 right-0 h-2 bg-[#5B6FFF] opacity-0 group-hover:opacity-50 cursor-ns-resize rounded-b-lg"
                                      onMouseDown={(e) =>
                                        handleResizeStart(e, block.id, block)
                                      }
                                    />
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => openImageModal(block.id)}
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
                            )}

                            {/* Image Grid Block */}
                            {block.type === "image-grid" && (
                              <div className="relative group/grid">
                                <div
                                  className={cn(
                                    "grid gap-4",
                                    (block.content as string[]).length === 2 &&
                                      "grid-cols-2",
                                    (block.content as string[]).length === 3 &&
                                      "grid-cols-3",
                                    (block.content as string[]).length > 3 &&
                                      "grid-cols-2 md:grid-cols-3"
                                  )}
                                >
                                  {(block.content as string[]).map(
                                    (img, idx) => (
                                      <div
                                        key={idx}
                                        className="relative group/grid-item"
                                      >
                                        {img ? (
                                          <>
                                            <img
                                              src={img || "/placeholder.svg"}
                                              alt={`Grid image ${idx + 1}`}
                                              className="w-full rounded-lg object-cover"
                                              style={{
                                                height:
                                                  block.size?.height || 400,
                                              }}
                                            />
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                openImageModal(block.id, idx);
                                              }}
                                              className="absolute top-2 right-2 p-2 bg-background/90 border border-border rounded opacity-0 group-hover/grid-item:opacity-100 transition-opacity"
                                            >
                                              <Upload className="w-4 h-4" />
                                            </button>
                                            {(block.content as string[])
                                              .length > 2 && (
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  removeImageFromGrid(
                                                    block.id,
                                                    idx
                                                  );
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
                                            onClick={() =>
                                              openImageModal(block.id, idx)
                                            }
                                            className="w-full h-[400px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
                                          >
                                            <Upload className="w-6 h-6 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">
                                              Upload Image
                                            </span>
                                          </button>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                                {(block.content as string[]).length < 3 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      addImageToGrid(block.id);
                                    }}
                                    className="mt-4 w-full py-3 border-2 border-dashed border-border rounded-lg flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                                  >
                                    <Plus className="w-5 h-5" />
                                    <span className="text-sm font-medium">
                                      Add Image to Grid
                                    </span>
                                  </button>
                                )}
                                <div
                                  className="absolute bottom-0 left-0 right-0 h-2 bg-[#5B6FFF] opacity-0 group-hover/grid:opacity-50 cursor-ns-resize rounded-b-lg"
                                  onMouseDown={(e) =>
                                    handleResizeStart(e, block.id, block)
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Insert Zone */}
                        <div
                          className="relative h-8 group"
                          onMouseEnter={() => setShowInsertAt(index + 1)}
                          onMouseLeave={() => setShowInsertAt(null)}
                        >
                          {showInsertAt === index + 1 && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-2 bg-background border border-border rounded-lg shadow-lg p-2 z-10">
                              <button
                                onClick={() =>
                                  insertBlockAt("header", index + 1)
                                }
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
                                onClick={() =>
                                  insertBlockAt("single-image", index + 1)
                                }
                                className="p-2 hover:bg-muted rounded"
                                title="Add Image"
                              >
                                <ImageIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  insertBlockAt("image-grid", index + 1)
                                }
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

                    {blogContent.propertyListings.length > 0 && (
                      <div className="mt-8 space-y-4">
                        {blogContent.propertyListings.map((listing) => (
                          <div
                            key={listing.id}
                            className="flex items-center gap-4 p-4 bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                          >
                            <img
                              src={listing.image || "/placeholder.svg"}
                              alt={listing.title}
                              className="w-20 h-20 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground text-sm mb-1">
                                {listing.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{listing.location}</span>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                handleRemovePropertyListing(listing.id)
                              }
                              className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`bg-background border border-border rounded-lg ${
              imageModalStep === "initial" ? "max-w-2xl" : "max-w-5xl"
            } w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2 text-sm">
                <h3 className="text-lg font-semibold">Upload Image</h3>
                {imageModalStep === "toolkit" && (
                  <>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Media Tool Kit
                    </span>
                  </>
                )}
                {imageModalStep === "upload" && (
                  <>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Upload from Computer
                    </span>
                  </>
                )}
              </div>
              <button
                onClick={closeImageModal}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Initial Step - Choose Upload Method */}
              {imageModalStep === "initial" && (
                <div
                  className="flex flex-col items-center justify-center py-16"
                  onDragOver={handleDragOverGrid}
                  onDrop={handleDropOnModal}
                >
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">
                    Drop your files here or browse
                  </h4>
                  <p className="text-sm text-muted-foreground mb-8">
                    max file up to 1 GB
                  </p>

                  <div className="flex gap-3">
                    <label htmlFor="file-upload-initial">
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer bg-transparent"
                        onClick={() =>
                          document
                            .getElementById("file-upload-initial")
                            ?.click()
                        }
                      >
                        Upload from Computer
                      </Button>
                    </label>
                    <input
                      id="file-upload-initial"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        handleFileUpload(e);
                        setImageModalStep("upload");
                      }}
                      className="hidden"
                    />
                    <Button
                      onClick={() => setImageModalStep("toolkit")}
                      className="bg-[#5B6FFF] hover:bg-[#4A5EE8]"
                    >
                      Browse Medial Toolkit
                    </Button>
                  </div>
                </div>
              )}

              {/* Upload from Computer Step */}
              {imageModalStep === "upload" && (
                <div>
                  <div className="grid grid-cols-4 gap-4">
                    {uploadedImages.map((image) => (
                      <div
                        key={image.id}
                        className={`relative group rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                          selectedImages.includes(image.url)
                            ? "border-[#5B6FFF] ring-2 ring-[#5B6FFF]/20"
                            : "border-transparent hover:border-gray-300"
                        }`}
                        onClick={() => toggleImageSelection(image.url)}
                      >
                        {selectedImages.includes(image.url) && (
                          <div className="absolute top-2 left-2 w-5 h-5 bg-[#5B6FFF] rounded flex items-center justify-center z-10">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-white text-sm font-medium truncate">
                              {image.name}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Show context menu
                              }}
                              className="p-1 hover:bg-white/20 rounded"
                            >
                              <MoreVertical className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {uploadedImages.length === 0 && (
                    <div className="text-center py-16">
                      <p className="text-muted-foreground mb-4">
                        No images uploaded yet
                      </p>
                      <label htmlFor="file-upload-more">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            document.getElementById("file-upload-more")?.click()
                          }
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Images
                        </Button>
                      </label>
                      <input
                        id="file-upload-more"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Media Toolkit Step */}
              {imageModalStep === "toolkit" && (
                <div>
                  <div className="grid grid-cols-4 gap-4">
                    {mediaToolkitImages.map((image) => (
                      <div
                        key={image.id}
                        className={`relative group rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                          selectedImages.includes(image.url)
                            ? "border-[#5B6FFF] ring-2 ring-[#5B6FFF]/20"
                            : "border-transparent hover:border-gray-300"
                        }`}
                        onClick={() => toggleImageSelection(image.url)}
                      >
                        {selectedImages.includes(image.url) && (
                          <div className="absolute top-2 left-2 w-5 h-5 bg-[#5B6FFF] rounded flex items-center justify-center z-10">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-white text-sm font-medium truncate">
                              {image.name}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Show context menu
                              }}
                              className="p-1 hover:bg-white/20 rounded"
                            >
                              <MoreVertical className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {(imageModalStep === "upload" || imageModalStep === "toolkit") && (
              <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                <Button onClick={closeImageModal} variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={handleAddMediaFromSelection}
                  disabled={selectedImages.length === 0}
                  className="bg-[#5B6FFF] hover:bg-[#4A5EE8]"
                >
                  Add Media
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <PropertyListingModal
        isOpen={showPropertyListingModal}
        onClose={() => setShowPropertyListingModal(false)}
        onAddListings={handleAddPropertyListings}
        availableListings={availablePropertyListings}
      />

      {showContentSettingsModal && (
        <ContentSettingsModal
          contentSettings={
            blogContent.contentSettings || {
              sectionSpacing: 48,
              marginPadding: 48,
            }
          }
          onClose={() => setShowContentSettingsModal(false)}
          onSave={(settings) => {
            setBlogContent({ ...blogContent, contentSettings: settings });
            setShowContentSettingsModal(false);
          }}
        />
      )}

      <PublishSettingsModal
        isOpen={showPublishSettings}
        onClose={() => setShowPublishSettings(false)}
        onPublish={handleFinalPublish}
        initialTitle={blogContent.title}
      />

      <ScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSchedule={handleSchedule}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type={successModalType}
        shareLink={
          successModalType === "publish" ? publishedBlogLink : undefined
        }
        onPreview={() => setIsPreview(true)}
      />
    </div>
  );
}
