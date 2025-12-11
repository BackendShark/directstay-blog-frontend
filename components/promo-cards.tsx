"use client";

import Image from "next/image";

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
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 ${className}`}>
      {cards.map((card) => (
        <div key={card.id} className="flex gap-3 sm:gap-4 items-stretch p-3 sm:p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
          <div className="shrink-0">
            <Image
              src={card.image}
              alt={card.title}
              width={160}
              height={120}
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover rounded-md"
            />
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-1.5 text-sm sm:text-base line-clamp-2">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 leading-relaxed line-clamp-2 sm:line-clamp-3">
                {card.description}
              </p>
            </div>
            {(card.buttonText || card.onButtonClick) && (
              <button
                className="text-xs sm:text-sm font-normal cursor-pointer text-left text-blue-600 hover:text-blue-800 transition-colors"
                onClick={card.onButtonClick}
              >
                {card.buttonText || "Read More"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
