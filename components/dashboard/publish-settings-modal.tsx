"use client";

import type React from "react";

import { useState, useRef } from "react";
import { X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageUploadModal from "./image-upload-modal";
import { PublishSettings } from "@/app/dashboard/blog-editor/page";

type PublishSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (settings: PublishSettings) => void;
  initialTitle: string;
};

const SUGGESTED_TAGS = [
  "Interior",
  "Housing",
  "Air Bnb Apartments",
  "Furniture",
  "Design",
  "Real Estate",
  "Hosting",
  "Travel",
];

export function PublishSettingsModal({
  isOpen,
  onClose,
  onPublish,
  initialTitle,
}: PublishSettingsModalProps) {
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isAdultContent, setIsAdultContent] = useState(false);
  const [commentsDisabled, setCommentsDisabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false); // Added state for image upload modal

  const wordCount = description.trim()
    ? description.trim().split(/\s+/).length
    : 0;
  const maxWords = 50;

  if (!isOpen) return null;

  const handleSelectImage = (imageUrl: string) => {
    // Updated handleImageUpload to work with our image modal
    setThumbnail(imageUrl);
    setShowImageUploadModal(false);
  };

  const handleAddTag = (tag: string) => {
    if (tags.length >= 10) return;
    const normalizedTag = tag.trim().toLowerCase();
    if (normalizedTag && !tags.includes(normalizedTag)) {
      setTags([...tags, normalizedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      handleAddTag(tagInput);
    }
  };

  const handlePublish = () => {
    if (!thumbnail || !description || tags.length < 3) {
      alert(
        "Please fill in all required fields:\n- Thumbnail image\n- Description\n- At least 3 tags"
      );
      return;
    }

    onPublish({
      thumbnail,
      description,
      tags,
      isAdultContent,
      commentsDisabled,
    });
  };

  const isValid = thumbnail && description && tags.length >= 3;

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);

    if (words.length <= maxWords || text.trim() === "") {
      setDescription(text);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Publish Settings</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Thumbnail */}
            <div>
              <div className="mb-2">
                <span className="text-sm font-medium">Blog Thumbnail</span>
                <span className="text-red-500 ml-1">*</span>
              </div>

              {thumbnail ? (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted group">
                  <img
                    src={thumbnail || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      onClick={() => setShowImageUploadModal(true)}
                      variant="secondary"
                      size="sm"
                      className="bg-white text-black hover:bg-gray-100"
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Change Image
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowImageUploadModal(true)}
                  className="w-full aspect-video rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted flex flex-col items-center justify-center gap-3 transition-colors"
                >
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Upload Image
                  </span>
                </button>
              )}

              <p className="text-xs text-muted-foreground mt-2">
                Aspect ratio size of 920px by 487px
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Right Column - Blog Details */}
            <div className="space-y-6">
              <div>
                <div className="mb-2">
                  <span className="text-sm font-medium">Blog Details</span>
                  <span className="text-red-500 ml-1">*</span>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your blog a title"
                    className="w-full px-3 py-2 bg-muted rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-[#5B6FFF]"
                    readOnly
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm text-muted-foreground">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <span
                      className={`text-xs ${
                        wordCount > maxWords
                          ? "text-red-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {wordCount}/{maxWords} words
                    </span>
                  </div>
                  <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Add a short description of your blog"
                    className="w-full px-3 py-2 bg-muted rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-[#5B6FFF] min-h-[120px] resize-none"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Tags <span className="text-red-500">*</span> (10 max)
                  </label>
                  <div className="mb-2">
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-600 text-white text-sm rounded-md"
                          >
                            {tag}
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              className="hover:text-gray-300 ml-1"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Add a minimum of 3 tags to help others easily discover your blog"
                      className="w-full px-3 py-2 bg-muted rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-[#5B6FFF]"
                      disabled={tags.length >= 10}
                    />
                  </div>

                  {/* Suggested Tags */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      Suggested Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_TAGS.filter(
                        (tag) => !tags.includes(tag.toLowerCase())
                      ).map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleAddTag(tag)}
                          disabled={tags.length >= 10}
                          className="px-3 py-1 text-sm border border-border rounded-full hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Public Settings */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-sm font-medium mb-4">
                  Public Settings{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </h3>

                {/* Adult Content */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Adult Content</h4>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAdultContent}
                      onChange={(e) => setIsAdultContent(e.target.checked)}
                      className="w-4 h-4 rounded border-border text-[#5B6FFF] focus:ring-[#5B6FFF]"
                    />
                    <span className="text-sm text-muted-foreground">
                      This blog contains adult content
                    </span>
                  </label>
                </div>

                {/* Comments */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Comments</h4>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={commentsDisabled}
                      onChange={(e) => setCommentsDisabled(e.target.checked)}
                      className="w-4 h-4 rounded border-border text-[#5B6FFF] focus:ring-[#5B6FFF]"
                    />
                    <span className="text-sm text-muted-foreground">
                      Disable comments on this blog
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-8 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePublish}
              disabled={!isValid}
              className="px-8 bg-[#5B6FFF] hover:bg-[#4A5EE8] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
      {showImageUploadModal && ( // Added image upload modal at the end
        <ImageUploadModal
          isOpen={showImageUploadModal}
          onClose={() => setShowImageUploadModal(false)}
          onSelectImage={handleSelectImage}
          allowMultiple={false}
        />
      )}
    </div>
  );
}
