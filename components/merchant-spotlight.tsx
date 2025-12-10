import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, MessageSquare, ChevronRight } from "lucide-react";
import { CollaborationBadge } from "@/components/collaboration-badge";

export interface MerchantSpotlightItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  collaborator: {
    logo: string;
    name: string;
  };
  publishedAt: string;
  views: string;
  comments: string;
}

interface MerchantSpotlightProps {
  items: MerchantSpotlightItem[];
  seeMoreUrl?: string;
}

export function MerchantSpotlight({ items, seeMoreUrl = "#" }: MerchantSpotlightProps) {
  return (
    <div className="col-span-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Merchant Spotlight
        </h2>
        <a
          href={seeMoreUrl}
          className="text-sm font-medium flex items-center gap-1"
        >
          See More
          <ChevronRight className="text-sm w-4 h-4" />
        </a>
      </div>

      <div className="flex-1 h-full flex flex-col gap-5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/blog/${item.slug}`}
            className="block relative flex-1 rounded-xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-101 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="relative h-full">
              <Image
                src={item.image}
                height={300}
                width={300}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-linear-to-t from-black/70 to-[#796A6A00] backdrop-blur-xs transition-all duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-all duration-500 group-hover:translate-y-0">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-all duration-300 transform group-hover:scale-105">
                  {item.title}
                </h3>
                <p className="text-sm text-white/90 mb-4 line-clamp-2 transition-all duration-300 group-hover:text-white">
                  {item.description}
                </p>

                <div className="flex items-center gap-4 text-white text-xs transform transition-all duration-500 group-hover:translate-x-2">
                  <CollaborationBadge collaborator={item.collaborator} />
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
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}