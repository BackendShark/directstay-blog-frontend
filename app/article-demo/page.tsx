"use client";

import { ArticleHeader } from "@/components/article-header";

export default function ArticleDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      <ArticleHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "How Hosts Can Transform Small Spaces", href: "#" },
        ]}
        title="How Hosts Can Transform Small Spaces"
        heroImage="https://images.unsplash.com/photo-1584132636473-61c083514bf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        heroImageAlt="Small cozy house with white exterior and green lawn"
        author={{
          name: "DirectStay",
          avatar: "/assets/logo.svg",
        }}
        collaboration={{
          partner: "Gymco",
        }}
        publishDate="Nov 18"
        readTime="10 mins read"
        likes="3.8k"
        comments="3.8k"
        onLike={() => console.log("Liked!")}
        onSave={() => console.log("Saved!")}
        onShare={() => console.log("Shared!")}
      />
      
      {/* Demo content */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-8">
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            This is a demo page showing the article header component that matches the design perfectly.
          </p>
          <p className="text-gray-600">
            The component includes all the elements from the design: breadcrumb navigation, 
            large hero image, article title, author info with collaboration badge, 
            metadata (date, read time, likes, comments), and action buttons.
          </p>
        </div>
      </div>
    </div>
  );
}