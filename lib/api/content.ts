// Fake API service functions that simulate real API calls

import { carouselData } from "@/lib/data/carousel";
import { topPostsData } from "@/lib/data/posts";
import { merchantSpotlightData } from "@/lib/data/merchants";
import { placesData, placesCategories } from "@/lib/data/places";
import { featuredHostsData } from "@/lib/data/hosts";
import { promoCardsData, featuredCarouselData } from "@/lib/data/promos";
import type {
  CarouselItem,
  TopPostItem,
  MerchantSpotlightItem,
  PlaceItem,
  FeaturedHostItem,
  PromoCard,
  FeaturedCarouselItem,
} from "@/lib/types";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Carousel API
export async function getCarouselItems(): Promise<CarouselItem[]> {
  await delay(300);
  return carouselData;
}

// Top Posts API
export async function getTopPosts(): Promise<TopPostItem[]> {
  await delay(200);
  return topPostsData;
}

// Merchant Spotlight API
export async function getMerchantSpotlight(): Promise<MerchantSpotlightItem[]> {
  await delay(250);
  return merchantSpotlightData;
}

// Places API
export async function getPlaces(): Promise<PlaceItem[]> {
  await delay(180);
  return placesData;
}

export async function getPlacesCategories(): Promise<string[]> {
  await delay(100);
  return placesCategories;
}

export async function getPlacesByCategory(category: string): Promise<PlaceItem[]> {
  await delay(150);
  if (category === "All") {
    return placesData;
  }
  return placesData.filter(place => place.category === category);
}

// Featured Hosts API
export async function getFeaturedHosts(): Promise<FeaturedHostItem[]> {
  await delay(220);
  return featuredHostsData;
}

// Promo Cards API
export async function getPromoCards(): Promise<PromoCard[]> {
  await delay(120);
  return promoCardsData;
}

// Featured Carousel API
export async function getFeaturedCarousel(): Promise<FeaturedCarouselItem[]> {
  await delay(280);
  return featuredCarouselData;
}

// Combined homepage data API
export async function getHomepageData() {
  const [
    carousel,
    topPosts,
    merchantSpotlight,
    places,
    categories,
    featuredHosts,
    promoCards,
    featuredCarousel,
  ] = await Promise.all([
    getCarouselItems(),
    getTopPosts(),
    getMerchantSpotlight(),
    getPlaces(),
    getPlacesCategories(),
    getFeaturedHosts(),
    getPromoCards(),
    getFeaturedCarousel(),
  ]);

  return {
    carousel,
    topPosts,
    merchantSpotlight,
    places,
    categories,
    featuredHosts,
    promoCards,
    featuredCarousel,
  };
}