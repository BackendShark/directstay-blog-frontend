"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import { DirectStayBadge } from "./directstay-badge";

export interface RelatedPost {
  id: string;
  title: string;
  author: string;
  views: string;
  likes?: string;
  image?: string;
  href: string;
}

export interface RelatedTopicsProps {
  title?: string;
  posts: RelatedPost[];
  maxPosts?: number;
}

export function RelatedTopics({
  title = "Related topics",
  posts,
  maxPosts = 4,
}: RelatedTopicsProps) {
  const displayPosts = posts.slice(0, maxPosts);

  return (
    <div>
      <div className="relative mb-6">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="relative">
          <div className="h-0.5 bg-black/10 w-full mt-0.5"></div>
          <div className="h-0.5 w-[40%] bg-black absolute inset-0"></div>
        </div>
      </div>
      <div className="space-y-4">
        {displayPosts.map((post) => (
          <Link key={post.id} href={post.href} className="flex gap-4 group">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium mb-2 line-clamp-2 group-hover:text-primary">
                {post.title}
              </h4>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <DirectStayBadge />
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {post.views}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {post.likes || post.views}
                </div>
              </div>
            </div>
            <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
