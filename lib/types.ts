// Shared type definitions for API responses

export interface CarouselItem {
  image: string;
  title: string;
  description: string;
  author: string;
  date: string;
  views: string;
  comments: string;
  tags: string[];
}

export interface TopPostItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  views: string;
  comments: string;
}

export interface MerchantSpotlightItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  collaborator: {
    logo: string;
    name: string;
  };
  publishedAt: string;
  views: string;
  comments: string;
}

export interface PlaceItem {
  id: number;
  name: string;
  type: string;
  distance: string;
  image: string;
  category: string;
  slug: string;
}

export interface FeaturedHostItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  views: string;
  comments: string;
}

export interface PromoCard {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

export interface FeaturedCarouselItem {
  id: string;
  image: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  date: string;
  views: string;
}