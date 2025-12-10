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
    <div className={`grid grid-cols-2 gap-4 mb-8 ${className}`}>
      {cards.map((card) => (
        <div key={card.id} className="flex gap-4 items-stretch p-4 b">
          <div className="shrink-0">
            <Image
              src={card.image}
              alt={card.title}
              width={160}
              height={120}
              className="h-24 object-cover rounded-md"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-semibold text-gray-900 mb-1.5 text-base">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                {card.description}
              </p>
            </div>
            {(card.buttonText || card.onButtonClick) && (
              <button
                className="text-sm font-normalcursor-pointer text-left"
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
