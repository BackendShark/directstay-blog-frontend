"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export interface PromoCard {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

interface PromoCardsProps {
  cards: PromoCard[];
  className?: string;
}

export function PromoCards({ cards, className = "" }: PromoCardsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  if (!cards || cards.length === 0) {
    return null;
  }

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

    if (isLeftSwipe && currentSlide < cards.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [cards.length]);

  const currentCard = cards[currentSlide];

  return (
    <div className={`mb-6 sm:mb-8 ${className}`}>
      {/* Mobile Carousel */}
      <div
        className="sm:hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex gap-4 items-stretch p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
          <div className="shrink-0">
            <Image
              src={currentCard.image}
              alt={currentCard.title}
              width={200}
              height={200}
              className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-md"
            />
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-semibold text-gray-900 mb-1.5 text-base line-clamp-2">
                {currentCard.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 leading-relaxed line-clamp-3">
                {currentCard.description}
              </p>
            </div>
            {(currentCard.buttonText || currentCard.onButtonClick) && (
              <button
                className="text-sm font-normal cursor-pointer text-left text-blue-600 hover:text-blue-800 transition-colors"
                onClick={currentCard.onButtonClick}
              >
                {currentCard.buttonText || "Read More"}
              </button>
            )}
          </div>
        </div>
        <div className="flex ml-2 justify-start gap-1 mt-3">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-6 bg-[#2C3236]" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex gap-4 items-stretch p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="shrink-0">
              <Image
                src={card.image}
                alt={card.title}
                width={160}
                height={120}
                className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-md"
              />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-semibold text-gray-900 mb-1.5 text-base line-clamp-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 leading-relaxed line-clamp-3">
                  {card.description}
                </p>
              </div>
              {(card.buttonText || card.onButtonClick) && (
                <button
                  className="text-sm font-normal cursor-pointer text-left text-blue-600 hover:text-blue-800 transition-colors"
                  onClick={card.onButtonClick}
                >
                  {card.buttonText || "Read More"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
