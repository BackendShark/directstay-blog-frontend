import Image from "next/image";
import React from "react";

export const DirectStayBadge = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2  ${className}`}>
      <Image
        src={"/assets/badge.svg"}
        height={5}
        width={5}
        alt="Directstay badge "
        className="w-4 h-4"
      />
      <span className="text-xs font-medium ">DirectStay</span>
      <Image
        src={"/assets/verified.svg"}
        height={5}
        width={5}
        alt="Verified badge "
        className="w-4 h-4"
      />
    </div>
  );
};
