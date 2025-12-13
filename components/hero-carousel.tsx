"use client";

import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Eye,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  MoveUpRight,
} from "lucide-react";
import { DirectStayBadge } from "./directstay-badge";
import Image from "next/image";

interface CarouselItem {
  image: string;
  title: string;
  description: string;
  author: string;
  date: string;
  views: string;
  comments: string;
  tags: string[];
}

interface HeroCarouselProps {
  items: CarouselItem[];
}

export function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => {
    if (isAnimating) return;
    setDirection("next");
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setDirection("prev");
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setDirection(index > currentSlide ? "next" : "prev");
    setIsAnimating(true);
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const currentItem = items[currentSlide];

  return (
    <div className="relative rounded-xl overflow-hidden mb-4 sm:mb-6">
      <div
        className="relative aspect-video"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Images with Crossfade Transition */}
        <div className="absolute inset-0">
          {items.map((item, index) => (
            <Image
              height={400}
              width={400}
              key={index}
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            />
          ))}
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-black/50 backdrop-blur-xl transition-all duration-500 ease-out ${
            isAnimating
              ? direction === "next"
                ? "transform translate-x-4 opacity-60"
                : "transform -translate-x-4 opacity-60"
              : "transform translate-x-0 opacity-100"
          }`}
        >
          {/* Top Bar with Featured Badge and Arrow Icon */}
          <div className="flex items-center justify-between mb-2">
            <div className="hidden sm:flex px-2 py-1 bg-[#FFFFFF0F] rounded-full items-center gap-2">
              <span className="text-[#ECAB00] text-xs font-semibold">
                Featured
              </span>
            </div>
            <button className="hidden sm:flex w-8 h-8 rounded-full bg-black/10 backdrop-blur-sm items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200 active:scale-95">
              <MoveUpRight className="w-4 h-4 text-white" />
            </button>
          </div>

          <h1
            className={`text-sm sm:text-xl lg:text-2xl font-bold text-white mb-2 max-w-2xl leading-tight transition-all duration-700 ${
              !isAnimating ? "animate-in fade-in slide-in-from-bottom-4" : ""
            }`}
          >
            {currentItem.title}
          </h1>

          <p
            className={`hidden sm:block text-xs sm:text-sm text-white/90 mb-3 max-w-2xl transition-all duration-700 delay-100 ${
              !isAnimating ? "animate-in fade-in slide-in-from-bottom-4" : ""
            }`}
          >
            {currentItem.description}
          </p>

          {/* Author Info, Metadata and Tags */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <DirectStayBadge className="text-white" />

              <span className="hidden sm:flex text-xs sm:text-sm text-white/80 items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                {currentItem.date}
              </span>
              <span className="hidden sm:flex text-xs sm:text-sm text-white/80 items-center gap-1">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                {currentItem.views}
              </span>
              <span className="hidden sm:flex text-xs sm:text-sm text-white/80 items-center gap-1">
                <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                {currentItem.comments}
              </span>
            </div>

            {/* Tags */}
            <div className="hidden sm:flex items-center gap-1 sm:gap-2 flex-wrap">
              {currentItem.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Navigation - Dots and Arrows */}
          <div className="border-t border-white/20 pt-2">
            <div className="flex items-center justify-between">
              {/* Dot Indicators */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 sm:h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                      index === currentSlide
                        ? "w-6 sm:w-8 bg-white"
                        : "w-2 sm:w-2 bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="hidden sm:flex items-center gap-1 sm:gap-2">
                <button
                  onClick={prevSlide}
                  disabled={isAnimating}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isAnimating}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
