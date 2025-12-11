import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, MessageSquare, ChevronRight } from "lucide-react";
import { CollaborationBadge } from "@/components/collaboration-badge";
import type { MerchantSpotlightItem } from "@/lib/types";
import Underline from "./underline";

interface MerchantSpotlightProps {
  items: MerchantSpotlightItem[];
  seeMoreUrl?: string;
}

export function MerchantSpotlight({
  items,
  seeMoreUrl = "#",
}: MerchantSpotlightProps) {
  return (
    <div className="col-span-1 lg:col-span-5 flex flex-col">
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Merchant Spotlight
          </h2>
          <Link
            href={seeMoreUrl}
            className="text-xs sm:text-sm font-medium flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            See More
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>
        <Underline className="w-[30%]" />
      </div>

      <div className="flex-1 h-full flex flex-col gap-3 sm:gap-4 lg:gap-5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/blog/${item.slug}`}
            className="block relative flex-1 rounded-xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1 min-h-[180px] sm:min-h-[220px] lg:min-h-[250px]"
          >
            <div className="relative h-full">
              <Image
                src={item.image}
                height={300}
                width={300}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5 transform transition-all duration-500 group-hover:translate-y-0">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-blue-300 transition-all duration-300 transform group-hover:scale-105 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 mb-2 sm:mb-3 lg:mb-4 line-clamp-2 transition-all duration-300 group-hover:text-white">
                  {item.description}
                </p>

                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4 text-white text-xs transform transition-all duration-500 group-hover:translate-x-1 flex-wrap">
                  <CollaborationBadge collaborator={item.collaborator} />
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">{item.publishedAt}</span>
                    <span className="sm:hidden">
                      {item.publishedAt.split(" ")[0]}
                    </span>
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
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
