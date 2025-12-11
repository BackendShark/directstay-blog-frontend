import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, MessageSquare, Bookmark } from "lucide-react";
import { DirectStayBadge } from "./directstay-badge";
import type { FeaturedHostItem } from "@/lib/types";

interface FeaturedHostProps {
  items: FeaturedHostItem[];
}

export function FeaturedHost({ items }: FeaturedHostProps) {
  return (
    <div className="mb-6 sm:mb-8 lg:mb-12">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Featured Host</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {items.map((item) => (
          <Link key={item.id} href={`/blog/${item.slug}`}>
            <div className="bg-white border border-gray-100 rounded-lg transition-all duration-300 hover:shadow-lg hover:border-gray-200 flex p-3 sm:p-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 shrink-0">
                <Image
                  height={200}
                  width={200}
                  src={item.image}
                  alt="Property"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-1 pl-3 sm:pl-4 flex flex-col min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-sm lg:text-base line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 leading-relaxed line-clamp-2 flex-1">
                  {item.description}
                </p>

                <DirectStayBadge className="mb-2" />

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap min-w-0">
                    <span className="flex items-center gap-0.5 shrink-0">
                      <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden sm:inline truncate">{item.publishedAt}</span>
                      <span className="sm:hidden">{item.publishedAt.split(' ')[0]}</span>
                    </span>
                    <span className="flex items-center gap-0.5 shrink-0">
                      <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {item.views}
                    </span>
                    <span className="flex items-center gap-0.5 shrink-0">
                      <MessageSquare className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {item.comments}
                    </span>
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 ml-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Bookmark className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
