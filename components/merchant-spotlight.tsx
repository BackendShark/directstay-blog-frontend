import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, MessageSquare, ChevronRight } from "lucide-react";
import { CollaborationBadge } from "@/components/collaboration-badge";
import type { MerchantSpotlightItem } from "@/lib/types";
import Underline from "./underline-text";

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
        <Underline text="Merchant Spotlight" seeMoreUrl="#" />
      </div>

      <div className="flex-1 h-full flex flex-col gap-3 sm:gap-4 lg:gap-5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/blog/${item.slug}`}
            className="block relative flex-1 rounded-xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1 min-h-[180px] sm:min-h-[220px] lg:min-h-[250px]"
          >
            <div className="relative h-full group overflow-hidden rounded-xl">
              {/* 1. Image Layer */}
              <Image
                src={item.image}
                height={300}
                width={300}
                alt={item.title}
                className="w-full aspect-video object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 z-10 w-full bg-black/70 backdrop-blur-xl p-3 sm:p-4 transition-all duration-500">
                <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-blue-300 transition-all duration-300 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/90 mb-2 sm:mb-3 lg:mb-4 line-clamp-1 transition-all duration-300 group-hover:text-white">
                  {item.description}
                </p>

                <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4 text-white text-xs flex-wrap">
                  <CollaborationBadge collaborator={item.collaborator} />

                  <span className="hidden sm:flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{item.publishedAt}</span>
                  </span>

                  <span className="hidden sm:flex items-center gap-1">
                    <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {item.views}
                  </span>

                  <span className="hidden sm:flex items-center gap-1">
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
