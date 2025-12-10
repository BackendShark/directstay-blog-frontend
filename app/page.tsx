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
import { AutomaticLocationPicker } from "@/components/automatic-location-picker";
import { LoginModal } from "@/components/login-modal";
import { SignupModal } from "@/components/signup-modal";
import { VerificationModal } from "@/components/verification-modal";
import { PaymentModal } from "@/components/payment-modal";
import { BusinessVerificationModal } from "@/components/business-verification-modal";
import { SuccessModal } from "@/components/success-modal";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { FeaturedHost, type FeaturedHostItem } from "@/components/featured-host";
import { MerchantSpotlight, type MerchantSpotlightItem } from "@/components/merchant-spotlight";
import { TopPosts, type TopPostItem } from "@/components/top-posts";
import { PlacesToVisit, type PlaceItem } from "@/components/places-to-visit";

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

// Top posts data
const topPostItems: TopPostItem[] = [
  {
    id: 1,
    slug: "maximizing-small-apartment-spaces",
    title: "Want to get sponsored?",
    description: "Smart furniture choices and layout tricks merchants recommend for turning compact.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
    publishedAt: "Nov 18",
    views: "1.6k",
    comments: "3.8k",
  },
  {
    id: 2,
    slug: "modern-interior-design-trends",
    title: "Want to get sponsored?",
    description: "Smart furniture choices and layout tricks merchants recommend for turning compact.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop",
    publishedAt: "Nov 18",
    views: "1.6k",
    comments: "3.8k",
  },
  {
    id: 3,
    slug: "sustainable-home-renovations",
    title: "Want to get sponsored?",
    description: "Smart furniture choices and layout tricks merchants recommend for turning compact.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop",
    publishedAt: "Nov 18",
    views: "1.6k",
    comments: "3.8k",
  },
  {
    id: 4,
    slug: "budget-friendly-home-staging",
    title: "Want to get sponsored?",
    description: "Smart furniture choices and layout tricks merchants recommend for turning compact.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    publishedAt: "Nov 18",
    views: "1.6k",
    comments: "3.8k",
  },
];

// Merchant spotlight data
const merchantSpotlightItems: MerchantSpotlightItem[] = [
  {
    id: 1,
    slug: "merchant-cozy-restaurant-ambiance",
    title: "How Hosts Can Transform Small Spaces",
    description: "Smart furniture choices and layout tricks merchants recommend for turning compact.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    collaborator: {
      logo: "/assets/merchant.jpg",
      name: "Merchant",
    },
    publishedAt: "Nov 18",
    views: "3.8k",
    comments: "3.8k",
  },
  {
    id: 2,
    slug: "merchant-fitness-studio-design",
    title: "How Hosts Can Transform Small Spaces",
    description: "Smart furniture choices and layout tricks merchants recommend for turning compact.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    collaborator: {
      logo: "/assets/merchant.jpg",
      name: "Merchant",
    },
    publishedAt: "Nov 18",
    views: "3.8k",
    comments: "3.8k",
  },
];

// Places to visit data
const placesToVisitData: PlaceItem[] = [
  {
    id: 1,
    name: "Lagos Beachfront Escape",
    type: "Beach",
    distance: "42 km away",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop",
    category: "Beaches",
    slug: "lagos-beachfront-escape-guide",
  },
  {
    id: 2,
    name: "Calabar Carnival Village",
    type: "Festival",
    distance: "744 km away",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    category: "Festivals",
    slug: "calabar-carnival-festival-experience",
  },
  {
    id: 3,
    name: "Abuja Weekend City Break",
    type: "City Break",
    distance: "536 km away",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop",
    category: "Family Trips",
    slug: "abuja-weekend-city-break-guide",
  },
  {
    id: 4,
    name: "Elegushi Beachfront",
    type: "Beach",
    distance: "28 km away",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    category: "Beaches",
    slug: "elegushi-beach-ultimate-guide",
  },
  {
    id: 5,
    name: "Victoria Island Nightlife",
    type: "Nightlife",
    distance: "15 km away",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=300&fit=crop",
    category: "Nightlife",
    slug: "victoria-island-nightlife-hotspots",
  },
  {
    id: 6,
    name: "Olumo Rock Adventure",
    type: "Adventure",
    distance: "120 km away",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    category: "Adventure",
    slug: "olumo-rock-climbing-adventure",
  },
];

const placesCategories = ["All", "Beaches", "Festivals", "Family Trips", "Nightlife", "Adventure"];

// Featured host data
const featuredHostItems: FeaturedHostItem[] = [
  {
    id: 1,
    slug: "featured-host-urban-living-tips",
    title: "Want to get sponsored?",
    description: "Smart furniture choices and layout tricks merchants recommend for turning compact.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=300&fit=crop",
    publishedAt: "Nov 18",
    views: "3.8k",
    comments: "3.8k",
  },
  {
    id: 2,
    slug: "featured-host-vacation-rental-success",
    title: "Want to get sponsored?",
    description: "Smart furniture choices and layout tricks merchants recommend for turning compact.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&h=300&fit=crop",
    publishedAt: "Nov 18",
    views: "3.8k",
    comments: "3.8k",
  },
  {
    id: 3,
    slug: "featured-host-property-photography",
    title: "Want to get sponsored?",
    description: "Smart furniture choices and layout tricks merchants recommend for turning compact.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=300&h=300&fit=crop",
    publishedAt: "Nov 18",
    views: "3.8k",
    comments: "3.8k",
  },
  {
    id: 4,
    slug: "featured-host-guest-experience",
    title: "Want to get sponsored?",
    description: "Smart furniture choices and layout tricks merchants recommend for turning compact.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=300&fit=crop",
    publishedAt: "Nov 18",
    views: "3.8k",
    comments: "3.8k",
  },
  {
    id: 5,
    slug: "featured-host-seasonal-hosting",
    title: "Want to get sponsored?",
    description: "Smart furniture choices and layout tricks merchants recommend for turning compact.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=300&fit=crop",
    publishedAt: "Nov 18",
    views: "3.8k",
    comments: "3.8k",
  },
  {
    id: 6,
    slug: "featured-host-amenities-guide",
    title: "Want to get sponsored?",
    description: "Smart furniture choices and layout tricks merchants recommend for turning compact.",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=300&h=300&fit=crop",
    publishedAt: "Nov 18",
    views: "3.8k",
    comments: "3.8k",
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
  const [userLocation, setUserLocation] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLocationModal(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleLocationDetected = (location: any) => {
    setUserLocation(location);
    setSelectedLocation(`${location.city}, ${location.state}`);
    console.log('Location detected:', location);
  };

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
      <RootNav 
        onLoginClick={() => setShowLoginModal(true)}
        onSignupClick={() => setShowSignupModal(true)}
      />
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
          <TopPosts items={topPostItems} />

          {/* Right Column - Merchant Spotlight */}
          <MerchantSpotlight items={merchantSpotlightItems} />
        </div>

        {/* Places to Visit Section */}
        <PlacesToVisit
          title="Places to Visit This December"
          description="Explore fun destinations, festive events, and exciting cities you can travel to this holiday season in Alabama"
          places={placesToVisitData}
          categories={placesCategories}
          onCategoryChange={(category) => console.log('Selected category:', category)}
        />

        {/* Featured Carousel */}
        <FeaturedCarousel items={featuredCarouselItems} />

        <PromoCards cards={promoCards} />

        {/* Featured Host section */}
        <FeaturedHost items={featuredHostItems} />

        {/* CTA Section */}
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Automatic Location Picker */}
      <AutomaticLocationPicker
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onLocationDetected={handleLocationDetected}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={handleLoginSignup}
      />

      {/* Modals */}
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onContinue={handleSignupContinue}
      />

      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        onSubmit={handleVerificationSubmit}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onContinue={handlePaymentContinue}
      />

      <BusinessVerificationModal
        isOpen={showBusinessVerificationModal}
        onClose={() => setShowBusinessVerificationModal(false)}
        onSubmit={handleBusinessVerificationSubmit}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onGoToDashboard={handleGoToDashboard}
      />
    </div>
  );
}
