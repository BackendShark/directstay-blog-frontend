"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UnderlinedText from "./underline-text";

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
  const [hasShownMore, setHasShownMore] = useState(false);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + itemsPerPage, hosts.length));
    setHasShownMore(true);
  };

  const showLess = () => {
    setVisibleCount(itemsPerPage);
    setHasShownMore(false);
  };

  const visibleHosts = hosts.slice(0, visibleCount);
  const canShowMore = visibleCount < hosts.length;
  const canShowLess = visibleCount > itemsPerPage;

  return (
    <div className={`mb-8 sm:mb-12 ${className}`}>
      <div className="mb-4">
        <UnderlinedText text={title} />
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
            <h3 className="text-sm sm:text-base font-semibold mb-1 line-clamp-1">
              {host.name}
            </h3>
            {host.title && (
              <p className="text-xs sm:text-sm text-gray-600 mb-1 line-clamp-1">
                {host.title}
              </p>
            )}
            <p className="text-xs text-gray-500 mb-2 sm:mb-3 line-clamp-1">
              {host.memberSince}
            </p>
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
      {(canShowMore || canShowLess) && (
        <div className="flex gap-2 mt-6">
          {!canShowLess ? (
            <Button
              onClick={showMore}
              variant="outline"
              className="bg-transparent w-full"
            >
              Show {Math.min(itemsPerPage, hosts.length - visibleCount)} More
              Hosts
            </Button>
          ) : (
            <>
              {canShowMore && (
                <Button
                  onClick={showMore}
                  variant="outline"
                  className="bg-transparent w-[70%]"
                >
                  Show {Math.min(itemsPerPage, hosts.length - visibleCount)} More
                  Hosts
                </Button>
              )}
              {!canShowMore && (
                <div className="w-[70%]"></div>
              )}
              <Button
                onClick={showLess}
                variant="outline"
                className="bg-transparent w-[30%]"
              >
                Hide
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
