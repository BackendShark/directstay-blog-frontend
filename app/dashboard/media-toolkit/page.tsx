"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";
import { MediaToolkitContent } from "@/components/dashboard/media-toolkit-content";

export type MediaAsset = {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
  fileType: "JPG File" | "PNG File";
  fileSize: string;
};

export default function MediaToolkitPage() {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage="Media Toolkit" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-auto">
          <MediaToolkitContent
            mediaAssets={mediaAssets}
            setMediaAssets={setMediaAssets}
          />
        </main>
      </div>
    </div>
  );
}
