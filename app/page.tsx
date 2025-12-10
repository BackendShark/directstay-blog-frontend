"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Eye,
  MessageSquare,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  Globe,
} from "lucide-react";
import { HeroCarousel } from "@/components/hero-carousel";
import { PromoCards, type PromoCard } from "@/components/promo-cards";
import { SearchFilters } from "@/components/search-filters";
import {
  FeaturedCarousel,
  type FeaturedCarouselItem,
} from "@/components/featured-carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RootNav } from "@/components/root-nav";
import Image from "next/image";
import { DirectStayBadge } from "@/components/directstay-badge";
import { CollaborationBadge } from "@/components/collaboration-badge";

// Carousel data
const carouselItems = [
  {
    image: "/beautiful-modern-house-with-garden.jpg",
    title: "How Hosts Can Transform Small Spaces",
    description:
      "Smart furniture choices and layout tricks merchants recommend for turning compact apartments into high performing listings.",
    author: "Direct Stay",
    date: "Nov 18",
    views: "3.8k",
    comments: "3.8k",
    tags: ["Small Spaces", "Small Spaces", "Merchants"],
  },
  {
    image: "/luxury-apartment-interior.png",
    title: "Creating Instagram-Worthy Spaces on a Budget",
    description:
      "Learn how successful hosts design beautiful, photogenic spaces without breaking the bank. Expert tips from top-rated properties.",
    author: "Direct Stay",
    date: "Nov 17",
    views: "4.2k",
    comments: "2.9k",
    tags: ["Interior Design", "Budget Tips", "Photography"],
  },
  {
    image: "/cozy-vacation-rental-bedroom.jpg",
    title: "The Ultimate Guide to Guest Experience",
    description:
      "Discover the small touches that make a big difference in guest satisfaction and lead to 5-star reviews consistently.",
    author: "Direct Stay",
    date: "Nov 16",
    views: "5.1k",
    comments: "3.2k",
    tags: ["Guest Experience", "Reviews", "Hosting Tips"],
  },
];

// Promotional cards data
const promoCards: PromoCard[] = [
  {
    id: "sponsor-post",
    image: "/assets/sponsor-post.png",
    title: "Want to get sponsored?",
    description:
      "Smart furniture choices and layout tricks merchants recommend for turning compact apartments into high performing listings.",
    buttonText: "Read More",
  },
  {
    id: "become-host",
    image: "/assets/become-a-host.png",
    title: "Becoming a host",
    description:
      "Smart furniture choices and layout tricks merchants recommend for turning compact apartments into high performing listings.",
    buttonText: "Read More",
  },
];

// Featured carousel data
const featuredCarouselItems: FeaturedCarouselItem[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&h=500&fit=crop",
    title: "How Hosts Can Transform Small Spaces",
    description:
      "Smart furniture choices and layout tricks merchants recommend .",
    author: {
      name: "Switer Condady",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
      verified: true,
    },
    date: "Nov 18,2025",
    views: "10 mins read",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&h=500&fit=crop",
    title: "Creating Instagram-Worthy Spaces on a Budget",
    description:
      "Learn how successful hosts design beautiful, photogenic spaces without breaking the bank.",
    author: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9b39a20?w=40&h=40&fit=crop",
      verified: true,
    },
    date: "Nov 17,2025",
    views: "8 mins read",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1400&h=500&fit=crop",
    title: "The Ultimate Guide to Guest Experience",
    description:
      "Discover the small touches that make a big difference in guest satisfaction and reviews.",
    author: {
      name: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      verified: true,
    },
    date: "Nov 16,2025",
    views: "12 mins read",
  },
];

export default function HomePage() {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBusinessVerificationModal, setShowBusinessVerificationModal] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showPasswordOnLogin, setShowPasswordOnLogin] = useState(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(
    "Birmingham, Alabama"
  );
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLocationModal(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Search and filter handlers
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    console.log("Selected location:", location);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    console.log("Selected sort:", sort);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  const handlePopularSearchClick = (search: string) => {
    console.log("Popular search clicked:", search);
  };
  // </CHANGE>

  const handleLocationEnable = () => {
    setShowLocationModal(false);
    setShowLoginModal(true);
  };

  const handleLoginSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleSignupContinue = () => {
    setShowSignupModal(false);
    setShowVerificationModal(true);
  };

  const handleVerificationSubmit = () => {
    setShowVerificationModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentContinue = () => {
    setShowPaymentModal(false);
    setShowBusinessVerificationModal(true);
  };

  const handleBusinessVerificationSubmit = () => {
    setShowBusinessVerificationModal(false);
    setShowSuccessModal(true);
  };

  const handleGoToDashboard = () => {
    window.location.href = "/dashboard";
  };
  // </CHANGE>

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <RootNav />
      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <HeroCarousel items={carouselItems} />

        {/* Promotional Cards */}
        <PromoCards cards={promoCards} />

        {/* Search and Filters */}
        <SearchFilters
          onSearchChange={handleSearchChange}
          onLocationChange={handleLocationChange}
          onSortChange={handleSortChange}
          onCategoryChange={handleCategoryChange}
          onPopularSearchClick={handlePopularSearchClick}
          initialLocation={selectedLocation}
          initialSort={selectedSort}
          initialCategory={selectedCategory}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Top Posts */}
          <div className="col-span-7 flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Post</h2>

            <div className="grid grid-cols-2 gap-4 flex-1">
              {/* Post Card */}
              {[
                { id: 1, slug: "maximizing-small-apartment-spaces" },
                { id: 2, slug: "modern-interior-design-trends" },
                { id: 3, slug: "sustainable-home-renovations" },
                { id: 4, slug: "budget-friendly-home-staging" },
              ].map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="group block bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative h-44 overflow-hidden rounded-t-lg">
                    <Image
                      src={`https://images.unsplash.com/photo-${
                        item.id === 1
                          ? "1600585154340-be6161a56a0c"
                          : item.id === 2
                          ? "1600566753190-17f0baa2a6c3"
                          : item.id === 3
                          ? "1600047509807-ba8f99d2cdde"
                          : "1600596542815-ffad4c1539a9"
                      }?w=400&h=300&fit=crop`}
                      height={200}
                      width={300}
                      alt="Property"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                      Want to get sponsored?
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2">
                      Smart furniture choices and layout tricks merchants
                      recommend for turning compact.
                    </p>

                    <DirectStayBadge className="mb-3" />

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Nov 18
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          1.6k
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          3.8k
                        </span>
                      </div>
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column - Merchant Spotlight */}
          <div className="col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Merchant Spotlight
              </h2>
              <a
                href="#"
                className="text-sm font-medium flex items-center gap-1"
              >
                See More
                <ChevronRight className=" text-sm w-4 h-4" />
              </a>
            </div>

            <div className="flex-1 h-full  flex flex-col gap-5">
              {[
                {
                  id: 1,
                  slug: "merchant-cozy-restaurant-ambiance",
                  title: "How Hosts Can Transform Small Spaces",
                },
                {
                  id: 2,
                  slug: "merchant-fitness-studio-design",
                  title: "How Hosts Can Transform Small Spaces",
                },
              ].map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="block relative flex-1  rounded-xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-101 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="relative h-full">
                    <Image
                      src={
                        item.id === 1
                          ? "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
                          : "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop"
                      }
                      height={300}
                      width={300}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-[55%]  bg-linear-to-t from-black/70 to-[#796A6A00] backdrop-blur-xs transition-all duration-500 " />

                    <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-all duration-500 group-hover:translate-y-0">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-all duration-300 transform group-hover:scale-105">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/90 mb-4 line-clamp-2 transition-all duration-300 group-hover:text-white">
                        Smart furniture choices and layout tricks merchants
                        recommend for turning compact.
                      </p>

                      <div className="flex items-center gap-4 text-white text-xs transform transition-all duration-500 group-hover:translate-x-2">
                        <CollaborationBadge
                          collaborator={{
                            logo: "/assets/merchant.jpg",
                            name: "Merchant",
                          }}
                        />
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Nov 18
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          3.8k
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          3.8k
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Places to Visit Section */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Places to Visit This December
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Explore fun destinations, festive events, and exciting cities you
            can travel to this holiday season in Alabama
          </p>

          {/* Category Pills */}
          <div className="flex items-center gap-2 mb-6">
            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium">
              All
            </button>
            <button className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Beaches
            </button>
            <button className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Festivals
            </button>
            <button className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Family Trips
            </button>
            <button className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Nightlife
            </button>
            <button className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Adventure
            </button>
          </div>

          {/* Places Grid */}
          <div className="grid grid-cols-4 gap-5">
            {[
              {
                name: "Lagos Beachfront Escape",
                type: "Beach",
                distance: "42 km away",
              },
              {
                name: "Calabar Carnival Village",
                type: "Festival",
                distance: "744 km away",
              },
              {
                name: "Abuja Weekend City Break",
                type: "City Break",
                distance: "536 km away",
              },
              {
                name: "Elegushi Beachfront",
                type: "Beach",
                distance: "28 km away",
              },
            ].map((place, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      index === 0
                        ? "1600047509807-ba8f99d2cdde"
                        : index === 1
                        ? "1600596542815-ffad4c1539a9"
                        : index === 2
                        ? "1600047509807-ba8f99d2cdde"
                        : "1600596542815-ffad4c1539a9"
                    }?w=400&h=300&fit=crop`}
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
              </div>
            ))}
          </div>
        </div>

        {/* Featured Carousel */}
        <FeaturedCarousel items={featuredCarouselItems} />

        <PromoCards cards={promoCards} />

        {/* Featured Host section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Featured Host
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                id: 1,
                slug: "featured-host-urban-living-tips",
                title: "Want to get sponsored?",
              },
              {
                id: 2,
                slug: "featured-host-vacation-rental-success",
                title: "Want to get sponsored?",
              },
              {
                id: 3,
                slug: "featured-host-property-photography",
                title: "Want to get sponsored?",
              },
              {
                id: 4,
                slug: "featured-host-guest-experience",
                title: "Want to get sponsored?",
              },
              {
                id: 5,
                slug: "featured-host-seasonal-hosting",
                title: "Want to get sponsored?",
              },
              {
                id: 6,
                slug: "featured-host-amenities-guide",
                title: "Want to get sponsored?",
              },
            ].map((item) => (
              <Link key={item.id} href={`/blog/${item.slug}`}>
                <div className="bg-white border-gray-200 transition-shadow flex">
                  <div className="relative w-28 h-28">
                    <Image
                      height={200}
                      width={200}
                      src={`https://images.unsplash.com/photo-${
                        item.id === 1
                          ? "1600585154340-be6161a56a0c"
                          : item.id === 2
                          ? "1600566753190-17f0baa2a6c3"
                          : item.id === 3
                          ? "1600047509807-ba8f99d2cdde"
                          : item.id === 4
                          ? "1600596542815-ffad4c1539a9"
                          : item.id === 5
                          ? "1600607687939-ce8a6c25118c"
                          : "1600607687644-c7171b42498b"
                      }?w=300&h=300&fit=crop`}
                      alt="Property"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 p-3 flex flex-col">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed line-clamp-2 flex-1">
                      Smart furniture choices and layout tricks merchants
                      recommend for turning compact.
                    </p>

                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="relative w-4 h-4 shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 rounded-full"></div>
                        <svg
                          viewBox="0 0 24 24"
                          fill="white"
                          className="absolute inset-0 w-full h-full p-0.5"
                        >
                          <path d="M12 3L4 9v12h16V9L12 3z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-gray-900">
                        DirectStay
                      </span>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-1.5 h-1.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-0.5">
                          <Calendar className="w-3 h-3" />
                          Nov 18
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Eye className="w-3 h-3" />
                          3.8k
                        </span>
                        <span className="flex items-center gap-0.5">
                          <MessageSquare className="w-3 h-3" />
                          3.8k
                        </span>
                      </div>
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section with gradient background */}
        <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 p-16 text-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="20" cy="20" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Become a Host with DirectStay
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Elevate your property's presence. Connect with our community of
              guests and merchants eager to explore.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-8 rounded-lg font-semibold text-base">
              Request a Visit
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-6 gap-8 mb-8">
            {/* Logo Column */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 rounded-lg"></div>
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    className="absolute inset-0 w-full h-full p-1.5"
                  >
                    <path d="M12 3L4 9v12h16V9L12 3z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm leading-none">DIRECT</span>
                  <span className="font-normal text-xs text-gray-600 leading-none">
                    STAY
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">around the world</p>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3">
                Company
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Newsroom
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3">
                Support
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Safety & Trust
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3">
                Community
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    DirectStay.org
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Host Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Discussion & Wishlist
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Referrals & Affiliate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Terms & Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Travel Registration & Information Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Complaint Resolution & Guest Registration Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Community Standards & Guest Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Background Check Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    DirectStay & Affiliate
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3">
                Policies
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Scarcity Deposit Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Guides & Agreements */}
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3">
                Guides & Agreements
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Urbanhost Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Regional Onboarding
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Tours & Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Stay Packages
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Vacation Restriction & Information Agreement
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Hotel Agreement
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Host Agreement
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              2025 DirectStay, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                <span>English</span>
              </button>
              <button className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5">
                <span>Sitemap</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Location Access Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowLocationModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowLocationModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <MapPin className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
              Enable Location Access
            </h2>
            <p className="text-sm text-gray-600 text-center mb-8 leading-relaxed">
              Allow DirectStay to use your location to show nearby stays,
              events, and curated blog recommendations based on where you are.
            </p>

            <div className="mb-8 flex items-center justify-center">
              <svg
                className="w-full max-w-xs h-40"
                viewBox="0 0 300 160"
                fill="none"
              >
                {/* World Map Illustration */}
                <path
                  d="M50 80 Q 75 60, 100 80 T 150 80 T 200 80 T 250 80"
                  stroke="#E5E7EB"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M50 100 Q 75 120, 100 100 T 150 100 T 200 100 T 250 100"
                  stroke="#E5E7EB"
                  strokeWidth="1"
                  fill="none"
                />

                {/* Location Pins */}
                <circle cx="80" cy="70" r="4" fill="#3B82F6" />
                <circle cx="120" cy="90" r="4" fill="#3B82F6" />
                <circle cx="180" cy="75" r="4" fill="#3B82F6" />
                <circle cx="220" cy="95" r="4" fill="#3B82F6" />
                <circle cx="100" cy="110" r="4" fill="#3B82F6" />
                <circle cx="160" cy="105" r="4" fill="#3B82F6" />

                {/* Main Location Pin */}
                <g transform="translate(150, 60)">
                  <circle cx="0" cy="0" r="24" fill="#3B82F6" opacity="0.2" />
                  <circle cx="0" cy="0" r="16" fill="#3B82F6" opacity="0.4" />
                  <path
                    d="M0,-20 C-8,-20 -15,-13 -15,-5 C-15,5 0,20 0,20 C0,20 15,5 15,-5 C15,-13 8,-20 0,-20 Z"
                    fill="#3B82F6"
                  />
                  <circle cx="0" cy="-5" r="5" fill="white" />
                </g>
              </svg>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleLocationEnable}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                Enable Location
              </Button>
              <Button
                onClick={() => setShowLocationModal(false)}
                variant="outline"
                className="w-full h-12 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
              >
                Not Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowLoginModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <MapPin className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 rounded-xl"></div>
                <svg
                  viewBox="0 0 32 32"
                  fill="white"
                  className="absolute inset-0 w-full h-full p-2"
                >
                  <path d="M12 3L4 9v12h16V9L12 3z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Welcome Back!
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              First time here?{" "}
              <button
                onClick={handleLoginSignup}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Sign up for free.
              </button>
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-11 border-gray-300"
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPasswordOnLogin ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-11 border-gray-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordOnLogin(!showPasswordOnLogin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot Password?
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mb-4">
              By signing up you agree with our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>

            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">
              Sign in
            </Button>
          </div>
        </div>
      )}

      {/* Sign Up Modal - Step 1 */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowSignupModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowSignupModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <MapPin className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 rounded-xl"></div>
                <svg
                  viewBox="0 0 32 32"
                  fill="white"
                  className="absolute inset-0 w-full h-full p-2"
                >
                  <path d="M12 3L4 9v12h16V9L12 3z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Create Your Merchant Account
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter your basic business details to start your onboarding.
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
              <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
              <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-500 mb-6">1/3</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Label
                  htmlFor="businessName"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  placeholder="Enter Name"
                  className="h-11 border-gray-300"
                />
              </div>

              <div>
                <Label
                  htmlFor="contactEmail"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Contact Email
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-11 border-gray-300"
                />
              </div>

              <div>
                <Label
                  htmlFor="contactPhone"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Contact Phone Number (Optional)
                </Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="Enter Name"
                  className="h-11 border-gray-300"
                />
              </div>

              <div>
                <Label
                  htmlFor="businessCategory"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Business Category
                </Label>
                <Select>
                  <SelectTrigger className="h-11 border-gray-300">
                    <SelectValue placeholder="Restaurant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label
                  htmlFor="website"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Website link (Optional)
                </Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://"
                  className="h-11 border-gray-300"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 mb-6">
              <Checkbox id="terms" className="mt-0.5" />
              <label
                htmlFor="terms"
                className="text-xs text-gray-600 cursor-pointer"
              >
                By creating an account, you agree with our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleSignupContinue}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {showVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowVerificationModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowVerificationModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 rounded-xl"></div>
                <svg
                  viewBox="0 0 32 32"
                  fill="white"
                  className="absolute inset-0 w-full h-full p-2"
                >
                  <path d="M12 3L4 9v12h16V9L12 3z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Identity Verification
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Verify your identity to complete your merchant registration.
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
              <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
              <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-500 mb-6">2/3</p>

            <div className="space-y-4 mb-6">
              <div>
                <Label
                  htmlFor="governmentId"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Government ID
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click or drag file to this area to upload
                  </p>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="businessDoc"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Business registration document
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click or drag file to this area to upload
                  </p>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Full legal name
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter Name"
                  className="h-11 border-gray-300"
                />
              </div>

              <div>
                <Label
                  htmlFor="dob"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Date of birth
                </Label>
                <Input
                  id="dob"
                  type="date"
                  placeholder="09/08/2025"
                  className="h-11 border-gray-300"
                />
              </div>
            </div>

            <Button
              onClick={handleVerificationSubmit}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
            >
              Submit Verification
            </Button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowPaymentModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
              One-Time Onboarding Fee
            </h2>
            <p className="text-sm text-gray-600 text-center mb-8">
              Pay ₦49.95 to activate your merchant profile and access your
              dashboard.
            </p>

            <div className="flex justify-center mb-8">
              <svg className="w-48 h-48" viewBox="0 0 200 200" fill="none">
                {/* Illustration of payment */}
                <circle cx="100" cy="80" r="50" fill="#FCD34D" opacity="0.2" />
                <rect
                  x="70"
                  y="60"
                  width="60"
                  height="80"
                  rx="4"
                  fill="#3B82F6"
                />
                <rect
                  x="75"
                  y="65"
                  width="50"
                  height="30"
                  rx="2"
                  fill="#93C5FD"
                />
                <circle cx="90" cy="110" r="3" fill="white" />
                <circle cx="100" cy="110" r="3" fill="white" />
                <circle cx="110" cy="110" r="3" fill="white" />

                {/* Credit card */}
                <rect
                  x="40"
                  y="110"
                  width="50"
                  height="32"
                  rx="4"
                  fill="#EF4444"
                />
                <rect x="43" y="113" width="44" height="8" fill="#FCA5A5" />
                <text
                  x="45"
                  y="132"
                  fontSize="8"
                  fill="white"
                  fontFamily="monospace"
                >
                  ****
                </text>

                {/* Person figure */}
                <circle cx="130" cy="120" r="12" fill="#FBBF24" />
                <path
                  d="M130 132 L120 160 L130 155 L140 160 Z"
                  fill="#FBBF24"
                />
                <circle cx="130" cy="116" r="4" fill="#92400E" />
                <circle cx="127" cy="115" r="1" fill="white" />
                <circle cx="133" cy="115" r="1" fill="white" />
              </svg>
            </div>

            <Button
              onClick={handlePaymentContinue}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg mb-4"
            >
              Pay & Continue
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Secure processing powered by PowerPay.
            </p>
          </div>
        </div>
      )}

      {/* Business Verification Modal - Step 3/3 */}
      {showBusinessVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowBusinessVerificationModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowBusinessVerificationModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 rounded-xl"></div>
                <svg
                  viewBox="0 0 32 32"
                  fill="white"
                  className="absolute inset-0 w-full h-full p-2"
                >
                  <path d="M12 3L4 9v12h16V9L12 3z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Business Verification
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Provide your EIN to activate your merchant payout profile.
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
              <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
              <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-500 mb-6">3/3</p>

            <div className="space-y-4 mb-6">
              <div>
                <Label
                  htmlFor="ein"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Employment Identification Number
                </Label>
                <Input
                  id="ein"
                  placeholder="Enter EIN here"
                  className="h-11 border-gray-300"
                />
              </div>

              <div>
                <Label
                  htmlFor="businessAddress"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Business Address
                </Label>
                <Input
                  id="businessAddress"
                  placeholder="Enter Business Address"
                  className="h-11 border-gray-300"
                />
              </div>

              <div>
                <Label
                  htmlFor="businessType"
                  className="text-sm font-medium text-gray-700 mb-1.5 block"
                >
                  Registered business type
                </Label>
                <select
                  id="businessType"
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Restaurant</option>
                  <option>Retail</option>
                  <option>Services</option>
                  <option>Hospitality</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <Button
              onClick={handleBusinessVerificationSubmit}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
            >
              Verify EIN
            </Button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
                  {/* Celebration illustration */}
                  <circle cx="32" cy="32" r="28" fill="#FBBF24" opacity="0.3" />
                  <path
                    d="M32 16 L28 28 L16 32 L28 36 L32 48 L36 36 L48 32 L36 28 Z"
                    fill="#F59E0B"
                  />
                  <circle cx="20" cy="20" r="3" fill="#FCD34D" />
                  <circle cx="44" cy="20" r="3" fill="#FCD34D" />
                  <circle cx="20" cy="44" r="3" fill="#FCD34D" />
                  <circle cx="44" cy="44" r="3" fill="#FCD34D" />
                  {/* Confetti */}
                  <rect
                    x="24"
                    y="12"
                    width="2"
                    height="4"
                    fill="#EF4444"
                    transform="rotate(15 25 14)"
                  />
                  <rect
                    x="38"
                    y="12"
                    width="2"
                    height="4"
                    fill="#3B82F6"
                    transform="rotate(-15 39 14)"
                  />
                  <circle cx="16" cy="28" r="1.5" fill="#10B981" />
                  <circle cx="48" cy="28" r="1.5" fill="#8B5CF6" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
              Your Dashboard Is Ready
            </h2>
            <p className="text-sm text-gray-600 text-center mb-8">
              Your merchant account has been created. Explore your tools and
              link your affiliate account.
            </p>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 bg-transparent"
              >
                Connect TapFiliate
              </Button>
              <Button
                onClick={handleGoToDashboard}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* </CHANGE> End of new modals */}
    </div>
  );
}
