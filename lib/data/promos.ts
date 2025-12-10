import { PromoCard, FeaturedCarouselItem } from "@/lib/types";

export const promoCardsData: PromoCard[] = [
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

export const featuredCarouselData: FeaturedCarouselItem[] = [
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