"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Eye,
  MessageCircle,
  Bookmark,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/hero-carousel";

export default function MerchantsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Promotional Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-white border rounded-2xl hover:shadow-md transition-shadow">
            <img
              src="/sponsored-posts-badge.jpg"
              alt="Sponsored Posts"
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">
                Want to get sponsored?
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Smart furniture choices and layout tricks merchants recommend
                for turning compact.
              </p>
              <Button
                variant="link"
                className="p-0 h-auto text-blue-600 font-medium"
              >
                Read More
              </Button>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-white border rounded-2xl hover:shadow-md transition-shadow">
            <img
              src="/becoming-a-host.jpg"
              alt="Becoming a host"
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Becoming a host</h3>
              <p className="text-sm text-gray-600 mb-3">
                Smart furniture choices and layout tricks merchants recommend
                for turning compact.
              </p>
              <Button
                variant="link"
                className="p-0 h-auto text-blue-600 font-medium"
              >
                Read More
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for post, merchant..."
                className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 border rounded-xl hover:bg-gray-50">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span className="text-sm">Birmingham, Alabama</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
            <button className="flex items-center gap-2 px-4 py-3 border rounded-xl hover:bg-gray-50">
              <span className="text-sm">Sort:</span>
              <span className="text-sm font-medium">Newest</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
            <button className="px-4 py-3 border rounded-xl hover:bg-gray-50">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Popular Searches */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-gray-600">Popular Searches:</span>
            <div className="flex gap-2">
              {["Home", "Garden", "Restaurant"].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-sm rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              "All",
              "Home and Living",
              "Lifestyle and Experiences",
              "Art and Cuisines",
              "Food and Drinks",
              "Fashion and Personal Style",
              "Health and Wellness",
            ].map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Post and Top Post Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Recent Post - 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Post</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <Link
                  key={item}
                  href={`/blog/merchant-recent-post-${item}`}
                  className="group bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={`/merchant-property-.jpg?height=300&width=400&query=merchant property ${item}`}
                      alt="Property"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600">
                      Want to get sponsored?
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Smart furniture choices and layout tricks merchants
                      recommend for turning compact.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">
                            GM
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          Gabriela montez
                        </span>
                        <span className="text-yellow-400 text-xs">⭐</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Nov 18
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        3.8k
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        3.8k
                      </span>
                      <button className="ml-auto">
                        <Bookmark className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Post - 1 column */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Post</h2>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <Link
                  key={item}
                  href={`/blog/merchant-top-post-${item}`}
                  className="flex gap-4 group"
                >
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={`/top-merchant-.jpg?height=100&width=100&query=top merchant ${item}`}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-2 group-hover:text-blue-600 line-clamp-2">
                      Want to get sponsored?
                    </h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      Smart furniture choices and layout tricks merchants
                      recommend for turning compact.
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-[8px] font-bold">
                          GM
                        </span>
                      </div>
                      <span className="text-xs font-medium">
                        Gabriela montez
                      </span>
                      <span className="text-yellow-400 text-[10px]">⭐</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Nov 18
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        2.1k
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        3.8k
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* For You Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">For You</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "How Hosts Can Transform Small Spaces",
                image: "pharmacy interior with pharmacist",
              },
              {
                title: "How Hosts Can Transform Small Spaces",
                image: "people dining restaurant",
              },
            ].map((item, index) => (
              <Link
                key={index}
                href={`/blog/for-you-merchant-${index + 1}`}
                className="relative group rounded-2xl overflow-hidden aspect-[16/9]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                <img
                  src={`/.jpg?height=400&width=700&query=${item.image}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    Smart furniture choices and layout tricks merchants
                    recommend for turning compact.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">DS</span>
                      </div>
                      <span className="text-white text-sm font-medium">
                        DirectStay
                      </span>
                      <span className="text-yellow-400 text-sm">⭐</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Nov 18
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        2.1k
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        3.8k
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Post Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Post</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Link
                key={item}
                href={`/blog/all-merchant-post-${item}`}
                className="group bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={`/merchant-listing-.jpg?height=300&width=400&query=merchant listing ${item}`}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600">
                    Want to get sponsored?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Smart furniture choices and layout tricks merchants
                    recommend for turning compact.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">
                        DS
                      </span>
                    </div>
                    <span className="text-sm font-medium">DirectStay</span>
                    <span className="text-yellow-400 text-xs">⭐</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Nov 18
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      2.1k
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      3.8k
                    </span>
                    <button className="ml-auto">
                      <Bookmark className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Carousel Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-12 h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
          <img
            src="/modern-architecture-facade.jpg"
            alt="Featured"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-12">
            <span className="inline-block w-fit px-3 py-1 bg-yellow-500 text-black text-xs font-semibold rounded mb-4">
              Featured
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              How Hosts Can Transform Small Spaces
            </h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl">
              Smart furniture choices and layout tricks merchants recommend.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">SC</span>
                </div>
                <span className="text-white font-medium">Switzer Contiddy</span>
                <span className="text-yellow-400">⭐</span>
                <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded">
                  Collab
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Nov 18, 2025
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  10 mins read
                </span>
              </div>
            </div>
            <Button className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-black max-w-md">
              Read
            </Button>
          </div>

          <button className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 flex items-center justify-center">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* All Post Section (Second Grid) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Post</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[5, 6, 7, 8].map((item) => (
              <Link
                key={item}
                href={`/blog/all-merchant-post-${item}`}
                className="group bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={`/merchant-property-.jpg?height=300&width=400&query=merchant property ${item}`}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600">
                    Want to get sponsored?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Smart furniture choices and layout tricks merchants
                    recommend for turning compact.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">
                        DS
                      </span>
                    </div>
                    <span className="text-sm font-medium">DirectStay</span>
                    <span className="text-yellow-400 text-xs">⭐</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Nov 18
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      2.1k
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      3.8k
                    </span>
                    <button className="ml-auto">
                      <Bookmark className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              className="px-8 py-2 rounded-xl bg-transparent"
            >
              See More
            </Button>
          </div>
        </div>

        {/* Places to Visit This December */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              Places to Visit This December
            </h2>
            <p className="text-gray-600">
              Explore fun destinations, festive events, and exciting cities you
              can travel to this holiday season in Alabama.
            </p>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              "All",
              "Beaches",
              "Festivals",
              "Family Trips",
              "Nightlife",
              "Adventure",
            ].map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Lagos Beachfront Escape",
                category: "Beach",
                distance: "42 km away",
              },
              {
                name: "Calabar Carnival Village",
                category: "Festival",
                distance: "744 km away",
              },
              {
                name: "Abuja Weekend City Break",
                category: "City Break",
                distance: "536 km away",
              },
              {
                name: "Elegushi Beachfront",
                category: "Beach",
                distance: "28 km away",
              },
            ].map((place, index) => (
              <div key={index} className="group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                  <img
                    src={`/.jpg?height=300&width=400&query=${place.name}`}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1">{place.name}</h3>
                <p className="text-sm text-gray-600">
                  {place.category} • {place.distance}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Promotional Cards (Repeat) */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-white border rounded-2xl hover:shadow-md transition-shadow">
            <img
              src="/sponsored-posts-badge.jpg"
              alt="Sponsored Posts"
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">
                Want to get sponsored?
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Smart furniture choices and layout tricks merchants recommend
                for turning compact.
              </p>
              <Button
                variant="link"
                className="p-0 h-auto text-blue-600 font-medium"
              >
                Read More
              </Button>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-white border rounded-2xl hover:shadow-md transition-shadow">
            <img
              src="/becoming-a-host.jpg"
              alt="Becoming a host"
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Becoming a host</h3>
              <p className="text-sm text-gray-600 mb-3">
                Smart furniture choices and layout tricks merchants recommend
                for turning compact.
              </p>
              <Button
                variant="link"
                className="p-0 h-auto text-blue-600 font-medium"
              >
                Read More
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 p-16 text-center">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Become a Host with DirectStay
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Connect with travelers, share your space, and join a community of
              hosts earning together.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold">
              Become a host
            </Button>
          </div>
          <div className="absolute inset-0 opacity-10">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <path
                d="M100 200 L150 150 L150 250 Z M250 150 L200 200 L250 250 Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}
