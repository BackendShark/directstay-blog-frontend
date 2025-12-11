import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, MessageSquare, Bookmark } from "lucide-react";
import { DirectStayBadge } from "@/components/directstay-badge";
import type { TopPostItem } from "@/lib/types";

interface TopPostsProps {
  items: TopPostItem[];
}

export function TopPosts({ items }: TopPostsProps) {
  return (
    <div className="col-span-1 lg:col-span-7 flex flex-col">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Top Post</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/blog/${item.slug}`}
            className="group block bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative h-36 sm:h-40 lg:h-44 overflow-hidden rounded-t-lg">
              <Image
                src={item.image}
                height={200}
                width={300}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
            </div>
            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 leading-relaxed line-clamp-2">
                {item.description}
              </p>

              <DirectStayBadge className="mb-2 sm:mb-3" />

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">{item.publishedAt}</span>
                    <span className="sm:hidden">{item.publishedAt.split(' ')[0]}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {item.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {item.comments}
                  </span>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600 shrink-0"
                  onClick={(e) => e.preventDefault()}
                >
                  <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}