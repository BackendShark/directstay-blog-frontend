import { Calendar, Eye, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CollaborationBadge } from "./collaboration-badge";

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link key={post.id} href={post.href} className="flex gap-4 group">
            <div className="w-28 h-28 flex-shrink-0 rounded-sm overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-2 group-hover:text-blue-600 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {post.excerpt}
              </p>
              {/* <div className="flex items-center gap-2 mb-2">
                {post.author.avatar ? (
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={60}
                    height={60}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">
                      {post.author.initials ||
                       post.author.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="text-xs font-medium">{post.author.name}</span>
                <span className="text-yellow-400 text-[10px]">⭐</span>
              </div>  */}
              <CollaborationBadge />
              <div className="flex items-center gap-3 text-xs text-gray-500">
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
