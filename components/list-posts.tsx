import { Calendar, Eye, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CollaborationBadge } from "./collaboration-badge";
import UnderlinedText from "./underline-text";

export interface ListPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  publishDate: string;
  views: string;
  comments: string;
  href: string;
}

export interface ListPostsProps {
  title?: string;
  posts: ListPost[];
  className?: string;
}

export const ListPosts = ({
  title = "Top Post",
  posts,
  className,
}: ListPostsProps) => {
  return (
    <div className={className}>
      <div className="mb-4 sm:mb-6">
        <div>
          <UnderlinedText text={title} />
        </div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={post.href}
            className="flex gap-3 sm:gap-4 group"
          >
            <div className="w-32 sm:w-36 aspect-4/3 shrink-0 rounded-sm overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <h3 className="font-semibold text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-gray-600 mb-1 sm:mb-2 line-clamp-2">
                {post.excerpt}
              </p>
              <CollaborationBadge />
              <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.publishDate}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {post.views}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  {post.comments}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
