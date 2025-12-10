import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, MessageSquare, Bookmark } from "lucide-react";
import { DirectStayBadge } from "@/components/directstay-badge";

export interface TopPostItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  views: string;
  comments: string;
}

interface TopPostsProps {
  items: TopPostItem[];
}

export function TopPosts({ items }: TopPostsProps) {
  return (
    <div className="col-span-7 flex flex-col">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Top Post</h2>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/blog/${item.slug}`}
            className="group block bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="relative h-44 overflow-hidden rounded-t-lg">
              <Image
                src={item.image}
                height={200}
                width={300}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2">
                {item.description}
              </p>

              <DirectStayBadge className="mb-3" />

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {item.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {item.comments}
                  </span>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={(e) => e.preventDefault()}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}