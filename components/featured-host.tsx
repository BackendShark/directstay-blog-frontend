import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, MessageSquare, Bookmark } from "lucide-react";
import { DirectStayBadge } from "./directstay-badge";

export interface FeaturedHostItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  views: string;
  comments: string;
}

interface FeaturedHostProps {
  items: FeaturedHostItem[];
}

export function FeaturedHost({ items }: FeaturedHostProps) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Featured Host</h2>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <Link key={item.id} href={`/blog/${item.slug}`}>
            <div className="bg-white border-gray-200 transition-shadow flex">
              <div className="relative w-28 h-28">
                <Image
                  height={200}
                  width={200}
                  src={item.image}
                  alt="Property"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-1 p-3 flex flex-col">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2 leading-relaxed line-clamp-2 flex-1">
                  {item.description}
                </p>

                <DirectStayBadge className="mb-2" />

                {/* <div className="flex items-center gap-1.5 mb-2">
                  <div className="relative w-4 h-4 shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 rounded-full"></div>
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      className="absolute inset-0 w-full h-full p-0.5"
                    >
                      <path d="M12 3L4 9v12h16V9L12 3z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-900">
                    DirectStay
                  </span>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-1.5 h-1.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                </div> */}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5">
                      <Calendar className="w-3 h-3" />
                      {item.publishedAt}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Eye className="w-3 h-3" />
                      {item.views}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <MessageSquare className="w-3 h-3" />
                      {item.comments}
                    </span>
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
