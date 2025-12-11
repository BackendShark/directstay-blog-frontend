"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, MessageCircle, Bookmark, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DirectStayBadge } from "./directstay-badge";
import { CollaborationBadge } from "./collaboration-badge";
import Underline from "./underline";

export interface GridPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishDate: string;
  likes: string;
  comments: string;
  href: string;
  isBookmarked?: boolean;
  isLiked?: boolean;
}

export interface RecentPostsProps {
  className?: string;
  postBy?: {
    role: "admin" | "collaborator";
    name: string;
    avatar?: string;
  };
  title?: string;
  posts: GridPost[];
  columns?: number;
  onBookmark?: (postId: string, bookmarked: boolean) => Promise<void>;
  onLike?: (postId: string) => Promise<void>;
}

export function GridPosts({
  className,
  postBy = {
    role: "admin",
    name: "DirectStay",
    avatar: "/directstay-logo.png",
  },
  title = "Top Post",
  posts,
  columns = 2,
  onBookmark,
  onLike,
}: RecentPostsProps) {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(
    new Set(posts.filter((post) => post.isBookmarked).map((post) => post.id))
  );
  const [likedPosts, setLikedPosts] = useState<Set<string>>(
    new Set(posts.filter((post) => post.isLiked).map((post) => post.id))
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

  const handleLike = async (postId: string, e: React.MouseEvent) => {
    e.preventDefault();
    const isLiked = likedPosts.has(postId);

    try {
      // Optimistic update
      const newLiked = new Set(likedPosts);
      if (isLiked) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      setLikedPosts(newLiked);

      if (onLike) {
        await onLike(postId);
      }

      toast({
        title: isLiked ? "Like removed" : "Post liked",
      });
    } catch (error) {
      // Revert on error
      setLikedPosts(likedPosts);
      toast({
        title: "Failed to update like",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={` col-span-2 ${className}`}>
      <div className="mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <Underline className="w-[20%]" />
      </div>
      <div className={`grid grid-cols-${columns} gap-4`}>
        {posts.map((post) => (
          <Link key={post.id} href={post.href} className="group">
            <div className="rounded-md overflow-hidden mb-3 relative">
              <Image
                width={400}
                height={250}
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
            {postBy.role === "admin" ? (
              <DirectStayBadge className="mb-2 sm:mb-3" />
            ) : (
              <CollaborationBadge
                collaborator={{
                  name: postBy.name,
                  logo: postBy.avatar || "/directstay-logo.png",
                }}
              />
            )}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{post.publishDate}</span>
              </div>
              <button
                onClick={(e) => handleLike(post.id, e)}
                className={`flex items-center gap-1 hover:text-primary transition-colors ${
                  likedPosts.has(post.id) ? "text-primary" : ""
                }`}
              >
                <ThumbsUp
                  className={`w-3 h-3 ${
                    likedPosts.has(post.id) ? "fill-current" : ""
                  }`}
                />
                <span>{post.likes}</span>
              </button>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                <span>{post.comments}</span>
              </div>
              <button
                onClick={(e) => handleBookmark(post.id, e)}
                className={`ml-auto p-1 rounded hover:bg-gray-100 transition-colors ${
                  bookmarkedPosts.has(post.id)
                    ? "text-primary"
                    : "text-gray-500"
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
}
