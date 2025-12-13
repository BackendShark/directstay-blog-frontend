"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { CollaborationBadge } from "./collaboration-badge";

export interface FeaturedCarouselItem {
  id: string;
  image: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  date: string;
  views: string;
  readTime?: string;
}

interface FeaturedCarouselProps {
  items: FeaturedCarouselItem[];
  autoplay?: boolean;
  autoplayInterval?: number;
}

export function FeaturedCarousel({
  items,
  autoplay = false,
  autoplayInterval = 5000,
}: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 1. Logic for Automatic Infinite Scrolling
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 5000); // Changes every 5 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [items.length, isAutoPlaying]);

  // Helper to handle manual navigation (pauses auto-scroll momentarily)
  const handleManualNav = (direction: "next" | "prev") => {
    setIsAutoPlaying(false);
    if (direction === "next") {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }
    // Resume auto-play after interaction
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  if (!items.length) return null;

  const currentItem = items[currentIndex];

  return (
    // 2. Main Container: Enforcing 16:9 Aspect Ratio (aspect-video)
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 sm:mb-12 group bg-gray-900">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* 3. Image Layer */}
      <div className="absolute inset-0 w-full h-full">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="w-full aspect-video object-cover"
              priority={index === 0}
            />
            {/* Dark overlay specifically for the image to ensure text readability */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* 4. Content Overlay Layer 
          - Mobile: justify-center (Center)
          - Desktop: justify-end (Right)
      */}
      <div className="absolute inset-0 z-20 flex items-center justify-center sm:justify-end p-4 sm:p-12 pointer-events-none">
        {/* The Card Box 
            - pointer-events-auto ensures the text/buttons are clickable 
        */}
        <div
          key={currentIndex} // Key change forces animation restart on slide change
          className="pointer-events-auto relative w-full max-w-[90%] sm:max-w-md bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5 sm:p-8 text-left shadow-2xl"
          style={{ animation: "slideUp 0.6s ease-out forwards" }}
        >
          {/* Featured Badge */}
          <div className="hidden sm:inline-block bg-yellow-500/20 px-3 py-1 rounded-full text-xs font-bold text-yellow-400 mb-3 border border-yellow-500/30">
            Featured
          </div>

          <h2 className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-3 leading-tight line-clamp-2">
            {currentItem.title}
          </h2>

          <p className=" hidden sm:block text-sm text-gray-200 sm:mb-4 sm:line-clamp-3">
            {currentItem.description}
          </p>

          {/* Author Row */}
          <CollaborationBadge />

          {/* Metadata Row */}
          <div className="flex flex-col gap-4">
            <div className="hidden sm:flex items-center gap-4 text-xs sm:text-sm text-gray-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                {currentItem.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                {currentItem.views}
              </span>
            </div>
            <Button className="h-8 sm:h-9 px-4 bg-transparent hover:bg-transparent border text-xs sm:text-sm transition-colors">
              Read
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 z-30 px-4 sm:px-12 flex items-center justify-between">
        {/* Dots */}
        <div className="flex gap-1 sm:gap-1.5">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentIndex
                  ? "w-6 sm:w-8 bg-white"
                  : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <Button
            onClick={() => handleManualNav("prev")}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <button
            onClick={() => handleManualNav("next")}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
