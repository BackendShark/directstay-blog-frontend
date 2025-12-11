"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Eye,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  MoveUpRight,
} from "lucide-react";
import { DirectStayBadge } from "./directstay-badge";

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

  const currentItem = items[currentSlide];

  return (
    <div className="relative rounded-xl overflow-hidden mb-6">
      <div className="relative h-[65vh]">
        {/* Background Images with Crossfade Transition */}
        <div className="absolute inset-0">
          {items.map((item, index) => (
            <img
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

        <div className="absolute bottom-0 left-0 right-0 h-[55%]  bg-linear-to-t from-black/70 to-[#796A6A00] backdrop-blur-xs" />

        {/* Main Content */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-500 ease-out ${
            isAnimating
              ? direction === "next"
                ? "transform translate-x-4 opacity-60"
                : "transform -translate-x-4 opacity-60"
              : "transform translate-x-0 opacity-100"
          }`}
        >
          {/* Top Bar with Featured Badge and Arrow Icon */}
          <div className="flex items-center justify-between mb-2">
            <div className="px-2 py-1 bg-[#FFFFFF0F] rounded-full flex items-center gap-2">
              <span className="text-[#ECAB00] text-xs font-semibold">
                Featured
              </span>
            </div>
            <button className="w-8 h-8 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200 active:scale-95">
              <MoveUpRight className="w-4 h-4 text-white" />
            </button>
          </div>
          <h1
            className={`text-2xl font-bold text-white mb-2 max-w-2xl leading-tight transition-all duration-700 ${
              !isAnimating ? "animate-in fade-in slide-in-from-bottom-4" : ""
            }`}
          >
            {currentItem.title}
          </h1>
          <p
            className={`text-sm text-white/90 mb-3 max-w-2xl transition-all duration-700 delay-100 ${
              !isAnimating ? "animate-in fade-in slide-in-from-bottom-4" : ""
            }`}
          >
            {currentItem.description}
          </p>

          {/* Author Info, Metadata and Tags */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              {/* <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                    alt="{currentItem.author}"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-white">
                  {currentItem.author}
                </span>
                <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
              </div> */}

              <DirectStayBadge className="text-white" />

              <span className="text-sm text-white/80 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {currentItem.date}
              </span>
              <span className="text-sm text-white/80 flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {currentItem.views}
              </span>
              <span className="text-sm text-white/80 flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {currentItem.comments}
              </span>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2">
              {currentItem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white"
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
              <div className="flex items-center gap-1.5">
                {items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                      index === currentSlide
                        ? "w-8 bg-white"
                        : "w-2 bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  disabled={isAnimating}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isAnimating}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
