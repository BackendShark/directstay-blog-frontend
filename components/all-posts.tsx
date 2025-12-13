"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, MessageCircle, Bookmark } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CollaborationBadge } from "./collaboration-badge";
import UnderlinedText from "./underline-text";

export interface AllPost {
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

export interface AllPostsProps {
  title?: string;
  posts: AllPost[];
  itemsPerPage?: number;
  columns?: number;
  className?: string;
  onBookmark?: (postId: string, bookmarked: boolean) => Promise<void>;
  onLoadMore?: (page: number) => Promise<AllPost[]>;
  hasMore?: boolean;
  loading?: boolean;
}

export const AllPosts = ({
  title = "All Post",
  posts: initialPosts,
  itemsPerPage = 4,
  columns = 4,
  className,
  onBookmark,
  onLoadMore,
  hasMore = false,
  loading = false,
}: AllPostsProps) => {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);
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

  const handleLoadMore = async () => {
    if (!onLoadMore || isLoading) return;

    setIsLoading(true);
    try {
      const newPosts = await onLoadMore(currentPage + 1);
      setPosts((prev) => [...prev, ...newPosts]);
      setCurrentPage((prev) => prev + 1);
      setHasLoadedMore(true);
    } catch (error) {
      toast({
        title: "Failed to load more posts",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHideMore = () => {
    setPosts(initialPosts);
    setCurrentPage(1);
    setHasLoadedMore(false);
  };

  return (
    <div className={`mb-8 sm:mb-12 ${className} space-y-4`}>
      <UnderlinedText text={title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {posts.map((post) => (
          <Link key={post.id} href={post.href} className="group">
            <div className="rounded-xl overflow-hidden mb-3 relative">
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="w-full aspect-4/3 object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="font-semibold text-sm sm:text-base lg:text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-xs text-gray-600 mb-2 sm:mb-3 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-2 text-xs mb-2 sm:mb-3">
              <CollaborationBadge size="sm" />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 flex-wrap">
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
      {((hasMore || onLoadMore) || hasLoadedMore) && (
        <div className="flex gap-2">
          {!hasLoadedMore ? (
            <Button
              variant="outline"
              size="lg"
              className="w-full bg-transparent"
              onClick={handleLoadMore}
              disabled={isLoading || loading}
            >
              {isLoading || loading ? "Loading..." : "See More"}
            </Button>
          ) : (
            <>
              {(hasMore || onLoadMore) && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-[70%] bg-transparent"
                  onClick={handleLoadMore}
                  disabled={isLoading || loading || !hasMore}
                >
                  {isLoading || loading ? "Loading..." : "See More"}
                </Button>
              )}
              {!(hasMore || onLoadMore) && (
                <div className="w-[70%]"></div>
              )}
              <Button
                variant="outline"
                size="lg"
                className="w-[30%] bg-transparent"
                onClick={handleHideMore}
              >
                Hide
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
