"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Eye,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/hero-carousel";
import { getHomepageData } from "@/lib/api/content";

import { PromoCards } from "@/components/promo-cards";
import type {
  CarouselItem,
  TopPostItem,
  MerchantSpotlightItem,
  PlaceItem,
  FeaturedHostItem,
  PromoCard,
  FeaturedCarouselItem,
} from "@/lib/types";
import { SearchFilters } from "@/components/search-filters";
import { GridPosts } from "@/components/grid-posts";
import { ListPosts } from "@/components/list-posts";
import ForYou from "@/components/for-you";
import { MostRead } from "@/components/most-read";
import { FeaturedCarousel } from "@/components/featured-carousel";
import { AllPosts } from "@/components/all-posts";
import { PlacesToVisit } from "@/components/places-to-visit";
import { CtaSection } from "@/components/cta-section";

export default function MerchantsPage() {
  const [loading, setLoading] = useState(true);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(
    "Birmingham, Alabama"
  );
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Data states
  const [data, setData] = useState<{
    carousel: CarouselItem[];
    topPosts: TopPostItem[];
    merchantSpotlight: MerchantSpotlightItem[];
    places: PlaceItem[];
    categories: string[];
    featuredHosts: FeaturedHostItem[];
    promoCards: PromoCard[];
    featuredCarousel: FeaturedCarouselItem[];
  } | null>(null);

  useEffect(() => {
    // Load homepage data
    const loadData = async () => {
      try {
        const homepageData = await getHomepageData();
        setData(homepageData);
      } catch (error) {
        console.error("Failed to load homepage data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Failed to load content</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <HeroCarousel items={data.carousel} />
        {/* Promotional Cards */}
        <PromoCards cards={data.promoCards} />

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
        {/* Recent Post and Top Post Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Recent Post - Left (2 columns) */}
          <GridPosts
            posts={[
              {
                id: "1",
                title: "Want to get sponsored?",
                excerpt:
                  "Smart furniture choices and layout tricks merchants recommend for turning compact apartments into high performing listings.",
                image: "/luxury-apartment-interior.png",
                author: {
                  name: "Gabriella Montez",
                  avatar: "/placeholder.svg",
                },
                publishDate: "Nov 18",
                likes: "3.8k",
                comments: "3.8k",
                href: "/blog/general-blog-post",
              },
              {
                id: "2",
                title: "Modern Interior Design Trends",
                excerpt:
                  "Discover the latest interior design trends that are transforming rental properties worldwide.",
                image: "/cozy-vacation-rental-bedroom.jpg",
                author: {
                  name: "Sarah Wilson",
                  avatar: "/placeholder.svg",
                },
                publishDate: "Nov 16",
                likes: "2.5k",
                comments: "1.8k",
                href: "/blog/modern-interior-design",
              },
              {
                id: "3",
                title: "Hosting Best Practices",
                excerpt:
                  "Essential tips and strategies for becoming a successful host in today's competitive market.",
                image: "/luxury-apartment-interior.png",
                author: {
                  name: "Mike Johnson",
                  avatar: "/placeholder.svg",
                },
                publishDate: "Nov 14",
                likes: "4.1k",
                comments: "2.3k",
                href: "/blog/hosting-best-practices",
              },
              {
                id: "4",
                title: "Revenue Optimization Guide",
                excerpt:
                  "Learn how to maximize your rental income with proven pricing and marketing strategies.",
                image: "/cozy-vacation-rental-bedroom.jpg",
                author: {
                  name: "Emma Davis",
                  avatar: "/placeholder.svg",
                },
                publishDate: "Nov 12",
                likes: "3.2k",
                comments: "1.5k",
                href: "/blog/revenue-optimization",
              },
            ]}
            onBookmark={async (postId, bookmarked) => {
              // Simulate API call
              await new Promise((resolve) => setTimeout(resolve, 500));
              console.log(
                `Recent post ${postId} ${
                  bookmarked ? "bookmarked" : "unbookmarked"
                }`
              );
            }}
            onLike={async (postId) => {
              // Simulate API call
              await new Promise((resolve) => setTimeout(resolve, 300));
              console.log(`Recent post ${postId} liked`);
            }}
          />

          {/* Top Post - Right */}
          <ListPosts
            posts={[
              {
                id: "1",
                title: "Want to get sponsored?",
                excerpt:
                  "Smart furniture choices and layout tricks merchants recommend for turning compact apartments into high performing listings.",
                image: "/cozy-vacation-rental-bedroom.jpg",
                author: {
                  name: "DirectStay",
                  initials: "DS",
                },
                publishDate: "Nov 18",
                views: "3.8k",
                comments: "3.8k",
                href: "/blog/general-blog-post",
              },
              {
                id: "2",
                title: "Maximizing Small Spaces",
                excerpt:
                  "Transform your compact rental into a spacious haven with these proven design strategies.",
                image: "/luxury-apartment-interior.png",
                author: {
                  name: "DirectStay",
                  initials: "DS",
                },
                publishDate: "Nov 15",
                views: "2.1k",
                comments: "1.2k",
                href: "/blog/maximizing-small-spaces",
              },
              {
                id: "3",
                title: "Guest Experience Tips",
                excerpt:
                  "5 essential tips to create memorable experiences that keep guests coming back.",
                image: "/cozy-vacation-rental-bedroom.jpg",
                author: {
                  name: "DirectStay",
                  initials: "DS",
                },
                publishDate: "Nov 12",
                views: "1.9k",
                comments: "890",
                href: "/blog/guest-experience-tips",
              },
              {
                id: "4",
                title: "Property Photography Guide",
                excerpt:
                  "Professional photography techniques that make your listings stand out from the competition.",
                image: "/luxury-apartment-interior.png",
                author: {
                  name: "DirectStay",
                  initials: "DS",
                },
                publishDate: "Nov 10",
                views: "1.5k",
                comments: "650",
                href: "/blog/property-photography-guide",
              },
            ]}
          />
        </div>

        {/* For You */}
        <div className="mb-8 sm:mb-12">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold">For You</h2>
          </div>
          <ForYou
            items={[
              {
                id: 1,
                slug: "transform-small-spaces",
                title: "How Hosts Can Transform Small Spaces",
                description:
                  "Smart furniture choices and layout tricks merchants recommend for turning compact apartments into high performing listings.",
                image: "/beautiful-modern-house-with-garden.jpg",
                collaborator: {
                  logo: "/placeholder.svg",
                  name: "Gabriella montez",
                },
                publishedAt: "Nov 18",
                views: "3.8k",
                comments: "3.8k",
              },
              {
                id: 2,
                slug: "luxury-design-trends",
                title: "Luxury Property Design Trends",
                description:
                  "Explore the latest luxury design trends that are captivating high-end property guests and increasing booking rates.",
                image: "/beautiful-modern-house-with-garden.jpg",
                collaborator: {
                  logo: "/placeholder.svg",
                  name: "Design Expert",
                },
                publishedAt: "Nov 15",
                views: "2.9k",
                comments: "89",
              },
            ]}
          />
        </div>

        <MostRead
          posts={[
            {
              id: "1",
              title: "Want to get sponsored?",
              excerpt:
                "Smart furniture choices and layout tricks merchants recommend for turning compact apartments into high performing listings.",
              image: "/cozy-vacation-rental-bedroom.jpg",
              author: {
                name: "DirectStay",
                verified: true,
              },
              publishDate: "Nov 18",
              views: "3.8k",
              comments: "3.8k",
              href: "/blog/general-blog-post",
            },
            {
              id: "2",
              title: "Maximizing Small Spaces",
              excerpt:
                "Transform your compact rental into a spacious haven with these proven design strategies.",
              image: "/luxury-apartment-interior.png",
              author: {
                name: "DirectStay",
                verified: true,
              },
              publishDate: "Nov 16",
              views: "2.5k",
              comments: "1.8k",
              href: "/blog/maximizing-small-spaces",
            },
            {
              id: "3",
              title: "Hosting Best Practices",
              excerpt:
                "Essential tips and strategies for becoming a successful host in today's competitive market.",
              image: "/cozy-vacation-rental-bedroom.jpg",
              author: {
                name: "DirectStay",
                verified: true,
              },
              publishDate: "Nov 14",
              views: "4.1k",
              comments: "2.3k",
              href: "/blog/hosting-best-practices",
            },
            {
              id: "4",
              title: "Revenue Optimization Guide",
              excerpt:
                "Learn how to maximize your rental income with proven pricing and marketing strategies.",
              image: "/luxury-apartment-interior.png",
              author: {
                name: "DirectStay",
                verified: true,
              },
              publishDate: "Nov 12",
              views: "3.2k",
              comments: "1.5k",
              href: "/blog/revenue-optimization",
            },
          ]}
          onBookmark={async (postId, bookmarked) => {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log(
              `Most read post ${postId} ${
                bookmarked ? "bookmarked" : "unbookmarked"
              }`
            );
          }}
        />

        {/* Featured Article Carousel */}
        <div className="mb-8 sm:mb-12">
          <FeaturedCarousel items={data.featuredCarousel} />
        </div>

        {/* All Post */}
        <AllPosts
          posts={[
            {
              id: "1",
              title: "Property Investment Strategies for 2025",
              excerpt:
                "Discover the most effective property investment strategies that are driving success in today's market.",
              image: "/luxury-apartment-interior.png",
              author: {
                name: "DirectStay",
                verified: true,
              },
              publishDate: "Nov 18",
              views: "5.2k",
              comments: "89",
              href: "/blog/property-investment-strategies",
            },
            {
              id: "2",
              title: "Smart Home Technology for Rentals",
              excerpt:
                "How to integrate smart home features that increase property value and attract tech-savvy tenants.",
              image: "/cozy-vacation-rental-bedroom.jpg",
              author: {
                name: "Tech Homes",
                verified: true,
              },
              publishDate: "Nov 16",
              views: "3.8k",
              comments: "67",
              href: "/blog/smart-home-technology",
            },
            {
              id: "3",
              title: "Sustainable Property Management",
              excerpt:
                "Eco-friendly practices that reduce costs and appeal to environmentally conscious renters.",
              image: "/beautiful-modern-house-with-garden.jpg",
              author: {
                name: "Green Living",
                verified: true,
              },
              publishDate: "Nov 14",
              views: "4.1k",
              comments: "92",
              href: "/blog/sustainable-property-management",
            },
            {
              id: "4",
              title: "Legal Compliance for Property Hosts",
              excerpt:
                "Essential legal requirements and compliance guidelines every property host must know.",
              image: "/luxury-apartment-interior.png",
              author: {
                name: "Legal Experts",
                verified: true,
              },
              publishDate: "Nov 12",
              views: "2.9k",
              comments: "45",
              href: "/blog/legal-compliance",
            },
          ]}
          hasMore={true}
          onBookmark={async (postId, bookmarked) => {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));
            console.log(
              `All post ${postId} ${bookmarked ? "bookmarked" : "unbookmarked"}`
            );
          }}
          onLoadMore={async (page) => {
            // Simulate API call for loading more posts
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Return more property-related posts
            const morePosts = [
              {
                id: `${page.toString()}-1`,
                title: "Property Maintenance Best Practices",
                excerpt:
                  "Preventive maintenance strategies that save money and keep tenants happy.",
                image: "/cozy-vacation-rental-bedroom.jpg",
                author: { name: "Maintenance Pro", verified: true },
                publishDate: "Nov 10",
                views: "1.8k",
                comments: "34",
                href: "/blog/property-maintenance",
              },
              {
                id: `${page.toString()}-2`,
                title: "Market Analysis: Property Trends",
                excerpt:
                  "Current market trends and predictions for the property rental industry.",
                image: "/beautiful-modern-house-with-garden.jpg",
                author: { name: "Market Analyst", verified: true },
                publishDate: "Nov 08",
                views: "2.3k",
                comments: "56",
                href: "/blog/market-analysis",
              },
              {
                id: `${page.toString()}-3`,
                title: "Insurance for Property Owners",
                excerpt:
                  "Comprehensive guide to property insurance options and coverage requirements.",
                image: "/luxury-apartment-interior.png",
                author: { name: "Insurance Guide", verified: true },
                publishDate: "Nov 06",
                views: "1.5k",
                comments: "28",
                href: "/blog/property-insurance",
              },
              {
                id: `${page.toString()}-4`,
                title: "Tenant Screening Process",
                excerpt:
                  "Effective strategies for screening tenants and reducing rental risks.",
                image: "/cozy-vacation-rental-bedroom.jpg",
                author: { name: "Rental Expert", verified: true },
                publishDate: "Nov 04",
                views: "3.1k",
                comments: "73",
                href: "/blog/tenant-screening",
              },
            ];

            console.log(`Loading page ${page} with ${morePosts.length} posts`);
            return morePosts;
          }}
        />

        {/* Places to Visit */}
        <div className="mb-8 sm:mb-12">
          <PlacesToVisit
            title="Places to Visit This December"
            description="Explore fun destinations, festive events, and exciting cities you can travel to this holiday season in Alabama"
            places={data.places}
            categories={data.categories}
            onCategoryChange={(category) =>
              console.log("Selected category:", category)
            }
          />
        </div>

        <CtaSection />
      </main>
    </div>
  );
}
