import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const UnderlinedText = ({
  seeMoreUrl,
  text,
}: {
  seeMoreUrl?: string;
  text: string;
}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <div className="inline-block z-10  relative">
          <h2 className="text-base sm:text-xl font-bold">{text}</h2>
          <div className="  h-0.5 bg-black/90 rounded-md"></div>
        </div>
        {seeMoreUrl && (
          <Link
            href={seeMoreUrl}
            className="text-xs sm:text-sm font-medium flex items-center gap-1  transition-colors"
          >
            See More
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        )}
      </div>
      <div className="absolute w-full bottom-0 h-0.5 bg-gray-200 rounded-md"></div>
    </div>
  );
};

export default UnderlinedText;
