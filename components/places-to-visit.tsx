"use client";

import { useState } from "react";
import Link from "next/link";

export interface PlaceItem {
  id: number;
  name: string;
  type: string;
  distance: string;
  image: string;
  category: string;
  slug: string;
}

export interface PlacesToVisitProps {
  title: string;
  description: string;
  places: PlaceItem[];
  categories: string[];
  onCategoryChange?: (category: string) => void;
}

export function PlacesToVisit({
  title,
  description,
  places,
  categories,
  onCategoryChange,
}: PlacesToVisitProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  const filteredPlaces = selectedCategory === "All" 
    ? places 
    : places.filter(place => place.category === selectedCategory);

  return (
    <div className="mt-12 mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-6">{description}</p>

      {/* Category Pills */}
      <div className="flex items-center gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-4 gap-5">
        {filteredPlaces.map((place) => (
          <Link
            key={place.id}
            href={`/blog/${place.slug}`}
            className="block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-base mb-1">
                {place.name}
              </h3>
              <p className="text-sm text-gray-600">
                {place.type} • {place.distance}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}