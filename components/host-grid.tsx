"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface Host {
  id: string;
  name: string;
  title?: string;
  memberSince: string;
  avatar: string;
  profileUrl: string;
}

export interface HostGridProps {
  title?: string;
  hosts: Host[];
  itemsPerPage?: number;
  columns?: number;
  className?: string;
}

export const HostGrid = ({
  title = "Our Host",
  hosts,
  itemsPerPage = 4,
  columns = 4,
  className,
}: HostGridProps) => {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + itemsPerPage, hosts.length));
  };

  const showLess = () => {
    setVisibleCount(itemsPerPage);
  };

  const visibleHosts = hosts.slice(0, visibleCount);
  const canShowMore = visibleCount < hosts.length;
  const canShowLess = visibleCount > itemsPerPage;

  return (
    <div className={`mb-8 sm:mb-12 ${className}`}>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
        {canShowMore && (
          <button
            onClick={showMore}
            className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            See More →
          </button>
        )}
        {canShowLess && !canShowMore && (
          <button
            onClick={showLess}
            className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Hide
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {visibleHosts.map((host) => (
          <div key={host.id} className="text-center">
            <Link href={host.profileUrl}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 mx-auto mb-2 sm:mb-3 cursor-pointer hover:ring-4 hover:ring-blue-100 transition-all overflow-hidden">
                <Image
                  src={host.avatar}
                  alt={host.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <h3 className="text-sm sm:text-base font-semibold mb-1 line-clamp-1">{host.name}</h3>
            {host.title && (
              <p className="text-xs sm:text-sm text-gray-600 mb-1 line-clamp-1">{host.title}</p>
            )}
            <p className="text-xs text-gray-500 mb-2 sm:mb-3 line-clamp-1">{host.memberSince}</p>
            <Link href={host.profileUrl}>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent text-xs sm:text-sm"
              >
                Visit Profile
              </Button>
            </Link>
          </div>
        ))}
      </div>
      {canShowMore && (
        <div className="flex flex-1  mt-6">
          <Button
            onClick={showMore}
            variant="outline"
            className="bg-transparent w-full"
          >
            Show {Math.min(itemsPerPage, hosts.length - visibleCount)} More
            Hosts
          </Button>
        </div>
      )}
    </div>
  );
};
