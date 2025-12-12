"use client";

import { X, Check, Copy } from "lucide-react";

import { useState } from "react";
import { Button } from "../ui/button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "draft" | "publish" | "schedule";
  shareLink?: string;
  onPreview?: () => void;
  onBackToEditor?: () => void;
}

export function SuccessModal({
  isOpen,
  onClose,
  type,
  shareLink,
  onPreview,
  onBackToEditor,
}: SuccessModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBackToEditor = () => {
    onClose();
    if (onBackToEditor) {
      onBackToEditor();
    }
  };

  const handlePreview = () => {
    onClose();
    if (onPreview) {
      onPreview();
    }
  };

  const getContent = () => {
    switch (type) {
      case "draft":
        return {
          title: "Draft saved!",
          icon: (
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          ),
          showShareLink: false,
        };
      case "schedule":
        return {
          title: "Scheduled!",
          icon: (
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          ),
          showShareLink: false,
        };
      case "publish":
        return {
          title: "Blog post published!",
          icon: (
            <div className="mb-6">
              <svg
                width="200"
                height="150"
                viewBox="0 0 200 150"
                fill="none"
                className="mx-auto"
              >
                <rect
                  x="40"
                  y="40"
                  width="120"
                  height="80"
                  rx="8"
                  fill="#E3F2FD"
                />
                <rect
                  x="50"
                  y="50"
                  width="60"
                  height="8"
                  rx="4"
                  fill="#5B6FFF"
                />
                <rect
                  x="50"
                  y="65"
                  width="100"
                  height="4"
                  rx="2"
                  fill="#94A3B8"
                />
                <rect
                  x="50"
                  y="73"
                  width="100"
                  height="4"
                  rx="2"
                  fill="#94A3B8"
                />
                <rect
                  x="50"
                  y="81"
                  width="80"
                  height="4"
                  rx="2"
                  fill="#94A3B8"
                />
                <circle cx="140" cy="80" r="30" fill="#FFB74D" />
                <path
                  d="M125 70 L125 90 L140 85 L155 90 L155 70"
                  fill="#263238"
                />
                <circle cx="135" cy="80" r="3" fill="#263238" />
                <circle cx="145" cy="80" r="3" fill="#263238" />
                <path
                  d="M130 92 Q140 98 150 92"
                  stroke="#263238"
                  strokeWidth="2"
                  fill="none"
                />
                <rect
                  x="115"
                  y="50"
                  width="8"
                  height="8"
                  rx="2"
                  fill="#64B5F6"
                />
                <rect
                  x="126"
                  y="50"
                  width="8"
                  height="8"
                  rx="2"
                  fill="#64B5F6"
                />
                <path
                  d="M165 65 L175 55 M175 55 L170 55 M175 55 L175 60"
                  stroke="#FFA726"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="30" cy="100" r="8" fill="#EF5350" />
                <path d="M28 98 Q30 96 32 98 Q30 100 28 98" fill="white" />
              </svg>
            </div>
          ),
          description:
            "This blog post has been published successfully. You will be able to edit this post and republish changes.",
          showShareLink: true,
        };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          {content.icon}
          <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
          {content.description && (
            <p className="text-muted-foreground mb-6">{content.description}</p>
          )}

          {content.showShareLink && shareLink && (
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block text-left">
                Share link
              </label>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                />
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-background rounded transition-colors"
                  title="Copy link"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleBackToEditor}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              Back to Blog Editor
            </Button>
            <Button
              onClick={handlePreview}
              className="flex-1 bg-[#5B6FFF] hover:bg-[#4A5EE8]"
            >
              Preview Blog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
