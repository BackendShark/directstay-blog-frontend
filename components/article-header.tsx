"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  Share,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CollaborationBadge } from "./collaboration-badge";

export interface ArticleBreadcrumb {
  label: string;
  href: string;
}

export interface ArticleAuthor {
  name: string;
  avatar?: string;
  isVerified?: boolean;
}

export interface ArticleCollaboration {
  partner: string;
  partnerLogo?: string;
}

export interface ArticleStats {
  publishDate: string;
  readTime: string;
  views: string;
  comments: string;
}

// New interface for the redesigned header
export interface ArticleHeaderProps {
  breadcrumbs?: ArticleBreadcrumb[];
  title: string;
  heroImage: string;
  heroImageAlt: string;
  author: ArticleAuthor;
  collaboration?: ArticleCollaboration;
  publishDate: string;
  readTime: string;
  likes: string;
  comments: string;
  onLike?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  className?: string;
}

// Legacy interface for backward compatibility
export interface LegacyArticleHeaderProps {
  title: string;
  author: ArticleAuthor;
  category?: string;
  stats: ArticleStats;
  featuredImage?: string;
  isSaved?: boolean;
  onShare?: () => Promise<void>;
  onSave?: (saved: boolean) => Promise<void>;
}

// Combined props type
export type CombinedArticleHeaderProps =
  | ArticleHeaderProps
  | LegacyArticleHeaderProps;

// Type guard to check if props are for the new interface
function isNewInterface(
  props: CombinedArticleHeaderProps
): props is ArticleHeaderProps {
  return "heroImage" in props;
}

export function ArticleHeader(props: CombinedArticleHeaderProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Handle legacy interface
  if (!isNewInterface(props)) {
    const legacyProps = props as LegacyArticleHeaderProps;
    return (
      <div className="mb-6">
        {legacyProps.featuredImage && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
            <Image
              src={legacyProps.featuredImage}
              alt={legacyProps.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{legacyProps.title}</h1>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                {legacyProps.author.avatar ? (
                  <Image
                    src={legacyProps.author.avatar}
                    alt={legacyProps.author.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-base font-semibold text-blue-600">
                    {legacyProps.author.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">
                    {legacyProps.author.name}
                  </span>
                  {legacyProps.author.isVerified && (
                    <span className="h-4 px-1 text-[10px] bg-gray-200 rounded">
                      ✓
                    </span>
                  )}
                </div>
              </div>
            </div>
            {legacyProps.category && (
              <span className="rounded-full bg-gray-200 px-3 py-1 text-sm">
                {legacyProps.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{legacyProps.stats.publishDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{legacyProps.stats.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span>{legacyProps.stats.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{legacyProps.stats.comments}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              if (legacyProps.onShare) {
                await legacyProps.onShare();
              }
            }}
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => {
              const newSavedState = !isSaved;
              setIsSaved(newSavedState);
              if (legacyProps.onSave) {
                await legacyProps.onSave(newSavedState);
              }
            }}
          >
            <Bookmark
              className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`}
            />
            {isSaved ? "Saved" : "Save"}
          </Button>
        </div>
      </div>
    );
  }

  // Handle new interface
  const newProps = props as ArticleHeaderProps;
  const {
    breadcrumbs = [],
    title,
    heroImage,
    heroImageAlt,
    author,
    collaboration,
    publishDate,
    readTime,
    likes,
    comments,
    onLike,
    onSave,
    onShare,
    className = "",
  } = newProps;

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  return (
    <article className={`w-full mb-8 ${className}`}>
      {/* Breadcrumb Navigation */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Hero Image */}
      <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] rounded-xl sm:rounded-2xl overflow-hidden">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1400px"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 pt-6 sm:pt-8 lg:pt-10">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl  font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          {title}
        </h1>

        {/* Author and Metadata Row */}
        <div className="flex items-center gap-4 mb-4">
          <CollaborationBadge
            collaborator={{
              name: author.name,
              logo: author.avatar || "/assets/default-avatar.png",
            }}
          />

          {/* Collaboration Badge */}
          {collaboration && (
            <>
              <span className="text-gray-400">×</span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full">
                <span className="text-sm font-medium text-gray-700">
                  {collaboration.partner}
                </span>
              </div>
              <span className="px-3 py-1 bg-gray-800 text-white text-sm font-medium rounded-full">
                Collab
              </span>
            </>
          )}
        </div>

        <div className="flex items-baseline justify-between">
          <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600">
            <div className="flex items-center  gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{publishDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart
                className={`w-4 h-4 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              <span>{comments}</span>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                try {
                  if (navigator.share) {
                    await navigator.share({
                      title: title,
                      text: `Check out this article: ${title}`,
                      url: window.location.href,
                    });
                  } else {
                    await navigator.clipboard.writeText(window.location.href);
                    // You could add a toast notification here
                    alert("Link copied to clipboard!");
                  }
                  onShare?.();
                } catch (error) {
                  console.error("Error sharing:", error);
                }
              }}
              className="h-auto p-0 item-center text-sm text-gray-600 hover:text-blue-600 transition-colors font-normal"
            >
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="h-auto p-0 text-sm text-gray-600 hover:text-yellow-600 transition-colors font-normal"
            >
              <Bookmark
                className={`w-4 h-4 mr-1 ${
                  isSaved ? "fill-yellow-500 text-yellow-500" : ""
                }`}
              />
              {isSaved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
