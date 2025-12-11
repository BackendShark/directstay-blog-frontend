"use client";

import { useState, useEffect } from "react";
import { HeroCarousel } from "@/components/hero-carousel";
import { PromoCards } from "@/components/promo-cards";
import { SearchFilters } from "@/components/search-filters";
import { FeaturedCarousel } from "@/components/featured-carousel";
import { RootNav } from "@/components/root-nav";
import { AutomaticLocationPicker } from "@/components/automatic-location-picker";
import { LoginModal } from "@/components/login-modal";
import { SignupModal } from "@/components/signup-modal";
import { VerificationModal } from "@/components/verification-modal";
import { PaymentModal } from "@/components/payment-modal";
import { BusinessVerificationModal } from "@/components/business-verification-modal";
import { SuccessModal } from "@/components/success-modal";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/cta-section";
import { FeaturedHost } from "@/components/featured-host";
import { MerchantSpotlight } from "@/components/merchant-spotlight";
import { TopPosts } from "@/components/top-posts";
import { PlacesToVisit } from "@/components/places-to-visit";
import { getHomepageData } from "@/lib/api/content";
import type {
  CarouselItem,
  TopPostItem,
  MerchantSpotlightItem,
  PlaceItem,
  FeaturedHostItem,
  PromoCard,
  FeaturedCarouselItem,
} from "@/lib/types";

export default function HomePage() {
  // Modal states
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBusinessVerificationModal, setShowBusinessVerificationModal] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(
    "Birmingham, Alabama"
  );
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [userLocation, setUserLocation] = useState<any>(null);

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
  const [loading, setLoading] = useState(true);

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

    // Show location modal after delay
    const timer = setTimeout(() => {
      setShowLocationModal(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLocationDetected = (location: any) => {
    setUserLocation(location);
    setSelectedLocation(`${location.city}, ${location.state}`);
    console.log("Location detected:", location);
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
      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-8">
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6">
          {/* Left Column - Top Posts */}
          <TopPosts items={data.topPosts} />

          {/* Right Column - Merchant Spotlight */}
          <MerchantSpotlight items={data.merchantSpotlight} />
        </div>

        {/* Places to Visit Section */}
        <PlacesToVisit
          title="Places to Visit This December"
          description="Explore fun destinations, festive events, and exciting cities you can travel to this holiday season in Alabama"
          places={data.places}
          categories={data.categories}
          onCategoryChange={(category) =>
            console.log("Selected category:", category)
          }
        />

        {/* Featured Carousel */}
        <FeaturedCarousel items={data.featuredCarousel} />

        <PromoCards cards={data.promoCards} />

        {/* Featured Host section */}
        <FeaturedHost items={data.featuredHosts} />

        {/* CTA Section */}
        <CtaSection />
      </main>

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
