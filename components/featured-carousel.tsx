"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

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

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!items.length) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="relative rounded-2xl overflow-hidden mb-12">
      <style jsx>{`
        @keyframes slideInContent {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="relative w-full h-[45vh] overflow-hidden">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? "translate-x-0 opacity-100"
                : index < currentIndex
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            }`}
          >
            <Image
              height={400}
              width={800}
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute bg-black/40 rounded-md top-10 backdrop-blur-sm right-4 p-8 max-w-lg transform transition-all duration-700 ease-out"
           style={{
             transform: `translateX(${currentIndex * 20}px)`,
             animation: "slideInContent 0.7s ease-out"
           }}>
        <div className="relative z-10">
          {/* Featured Badge */}
          <div className="inline-block bg-white/10 px-3 py-1 rounded-full text-sm text-yellow-500 mb-4">
            Featured
          </div>

          <h2 className="text-2xl font-bold text-white mb-4 leading-tight transform transition-all duration-500 ease-out"
              style={{animation: "fadeInUp 0.6s ease-out 0.1s both"}}>
            {currentItem.title}
          </h2>
          <p className="text-base text-white/90 mb-6 leading-relaxed transform transition-all duration-500 ease-out"
             style={{animation: "fadeInUp 0.6s ease-out 0.2s both"}}>
            {currentItem.description}
          </p>

          <div className="flex items-center gap-2 mb-4 transform transition-all duration-500 ease-out"
               style={{animation: "slideInFromLeft 0.6s ease-out 0.3s both"}}>
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white transform transition-transform duration-300 hover:scale-110">
              <img
                src={currentItem.author.avatar}
                alt={currentItem.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-white">
              {currentItem.author.name}
            </span>
            <span className="text-xs bg-gray-600/80 text-white px-2 py-1 rounded transition-all duration-300 hover:bg-gray-500/80">
              Collab
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6 transform transition-all duration-500 ease-out"
               style={{animation: "slideInFromLeft 0.6s ease-out 0.4s both"}}>
            <span className="text-sm text-white/80 flex items-center gap-1 transition-all duration-300 hover:text-white">
              <Calendar className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
              {currentItem.date}
            </span>
            <span className="text-sm text-white/80 flex items-center gap-1 transition-all duration-300 hover:text-white">
              <Eye className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
              {currentItem.views}
            </span>
          </div>

          <Button className="border cursor-pointer backdrop-blur-sm bg-transparent text-white h-10 px-8 rounded-lg font-medium transition-all duration-300 w-full hover:bg-white/10 hover:scale-105 transform"
                  style={{animation: "fadeInUp 0.6s ease-out 0.5s both"}}>
            Read
          </Button>
        </div>
      </div>

      {/* Bottom navigation bar with indicators and arrows aligned */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between transform transition-all duration-500 ease-out"
           style={{animation: "fadeInUp 0.6s ease-out 0.6s both"}}>
        {/* Slide Indicators - left side */}
        <div className="flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-500 ease-out hover:scale-110 ${
                index === currentIndex ? "w-8 h-2" : "w-2 h-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`w-full h-full rounded-full transition-all duration-500 ease-out ${
                  index === currentIndex
                    ? "bg-yellow-500 shadow-lg shadow-yellow-500/50"
                    : "bg-white/70 hover:bg-white/90 hover:shadow-md"
                }`}
              />
              {index === currentIndex && (
                <div className="absolute inset-0 rounded-full bg-yellow-500 animate-pulse opacity-30"></div>
              )}
            </button>
          ))}
        </div>

        {/* Navigation Arrows - right side */}
        <div className="flex gap-3">
          <button
            onClick={goToPrevious}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={goToNext}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:shadow-lg active:scale-95"
          >
            <ChevronRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
