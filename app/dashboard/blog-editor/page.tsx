"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";
import { InitialState } from "@/components/dashboard/initial-state";
import { AIPromptState } from "@/components/dashboard/ai-prompt-state";
import { EditorState } from "@/components/dashboard/editor-state";

export type ContentBlock = {
  id: string;
  type: "header" | "body" | "single-image" | "image-grid";
  content: string | string[];
  size?: { width: number; height: number };
  headerLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  bodySize?: "small" | "medium" | "large";
};

export type PropertyListing = {
  id: string;
  title: string;
  description: string;
  location: string;
  rating: number;
  image: string;
};

export type PublishSettings = {
  thumbnail: string;
  description: string;
  tags: string[];
  isAdultContent: boolean;
  commentsDisabled: boolean;
};

export type Merchant = {
  id: string;
  name: string;
  description: string;
  location: string;
  avatar: string;
  image?: string;
};

export type BlogContent = {
  title: string;
  blocks: ContentBlock[];
  propertyListings: PropertyListing[];
  contentSettings?: {
    sectionSpacing: number;
    marginPadding: number;
  };
  publishSettings?: PublishSettings;
  blogType?: "personal" | "sponsored";
  selectedMerchant?: Merchant;
};

export default function BlogEditorPage() {
  const [editorState, setEditorState] = useState<
    "initial" | "ai-prompt" | "editor"
  >("initial");
  const [blogContent, setBlogContent] = useState<BlogContent>({
    title: "",
    blocks: [],
    propertyListings: [],
    contentSettings: {
      sectionSpacing: 48,
      marginPadding: 48,
    },
    blogType: "personal",
  });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage="Blog Post Editor" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-auto">
          {editorState === "initial" && (
            <InitialState
              onWriteYourself={() => setEditorState("editor")}
              onStartWithAI={() => setEditorState("ai-prompt")}
            />
          )}
          {editorState === "ai-prompt" && (
            <AIPromptState
              onBack={() => setEditorState("initial")}
              onStartEditor={() => setEditorState("editor")}
            />
          )}
          {editorState === "editor" && (
            <EditorState
              onBack={() => setEditorState("initial")}
              blogContent={blogContent}
              setBlogContent={setBlogContent}
            />
          )}
        </main>
      </div>
    </div>
  );
}
