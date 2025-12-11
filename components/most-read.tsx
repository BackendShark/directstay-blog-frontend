"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, MessageCircle, Bookmark } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CollaborationBadge } from "./collaboration-badge";
import { DirectStayBadge } from "./directstay-badge";

export interface MostReadPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  publishDate: string;
  views: string;
  comments: string;
  href: string;
  isBookmarked?: boolean;
}

export interface MostReadProps {
  title?: string;
  posts: MostReadPost[];
  columns?: number;
  className?: string;
  onBookmark?: (postId: string, bookmarked: boolean) => Promise<void>;
}

export const MostRead = ({
  title = "Most Read",
  posts,
  columns = 4,
  className,
  onBookmark,
}: MostReadProps) => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(
    new Set(posts.filter((post) => post.isBookmarked).map((post) => post.id))
  );
  const { toast } = useToast();

  const handleBookmark = async (postId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const isBookmarked = bookmarkedPosts.has(postId);

    try {
      // Optimistic update
      const newBookmarked = new Set(bookmarkedPosts);
      if (isBookmarked) {
        newBookmarked.delete(postId);
      } else {
        newBookmarked.add(postId);
      }
      setBookmarkedPosts(newBookmarked);

      if (onBookmark) {
        await onBookmark(postId, !isBookmarked);
      }

      toast({
        title: isBookmarked ? "Bookmark removed" : "Post bookmarked",
      });
    } catch (error) {
      // Revert on error
      setBookmarkedPosts(bookmarkedPosts);
      toast({
        title: "Failed to update bookmark",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`mb-12 ${className}`}>
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      <div className={`grid grid-cols-${columns} gap-4`}>
        {posts.map((post) => (
          <Link key={post.id} href={post.href} className="group">
            <div className="rounded-md overflow-hidden mb-3 relative">
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="font-semibold text-sm mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
              {post.excerpt}
            </p>
            <DirectStayBadge className="mb-4" />
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{post.publishDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                <span>{post.comments}</span>
              </div>
              <button
                onClick={(e) => handleBookmark(post.id, e)}
                className={`ml-auto ${
                  bookmarkedPosts.has(post.id) ? "text-primary" : ""
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    bookmarkedPosts.has(post.id) ? "fill-current" : ""
                  }`}
                />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
