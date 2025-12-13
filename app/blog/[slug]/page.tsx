"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  Clock,
  Eye,
  MessageCircle,
  Share2,
  Bookmark,
  ExternalLink,
  Star,
  ChevronRight,
  Heart,
} from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { CommentsSection } from "@/components/comments-section";
import { ArticleHeader } from "@/components/article-header";
import { SponsorshipCard } from "@/components/sponsorship-card";
import { RelatedTopics } from "@/components/related-topics";
import { CollaborationBadge } from "@/components/collaboration-badge";
import type { Comment } from "@/lib/types/comments";
import { DirectStayBadge } from "@/components/directstay-badge";

export default function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const isHostPost = slug.includes("featured-host");
  const isMerchantPost = slug.includes("merchant");
  const isGeneralPost = !isHostPost && !isMerchantPost;

  const [isSaved, setIsSaved] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Gabriella Montez",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I plan India really amazing, and the photos were 9 ever more inviting. I'm planning a weekend trip soon and I'm thinking this might be the perfect spot. I just want to know what the atmosphere is like during the holidays. Does it tend to get crowded around that time, or is it still calm enough to enjoy without too much noise or traffic?",
      timestamp: "5 mins ago",
      likes: 2,
      replies: [
        {
          id: 11,
          author: "John Doe",
          avatar: "/placeholder.svg",
          content:
            "Great question! I visited last December and it was quite peaceful.",
          timestamp: "3 mins ago",
          likes: 1,
          replies: [],
        },
      ],
      isAuthor: true,
    },
    {
      id: 2,
      author: "Sarah Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "It gets a bit busy around Christmas, but weekdays are usually calm. You can book early to get the best dates.",
      timestamp: "8 mins ago",
      likes: 5,
      replies: [],
    },
    {
      id: 3,
      author: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "The photos really capture the essence of the place. Thanks for sharing!",
      timestamp: "12 mins ago",
      likes: 3,
      replies: [],
    },
    {
      id: 4,
      author: "Emma Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Love this guide. Are there family friendly spots nearby?",
      timestamp: "15 mins ago",
      likes: 1,
      replies: [],
    },
  ]);

  const sidebarPosts = [
    {
      id: "how-to-maximize-rental-income",
      title: "How to Maximize Your Rental Income",
      author: "DirectStay",
      date: "Nov 18",
      views: "1.6k",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "guest-experience-tips",
      title: "5 Tips for Better Guest Experience",
      author: "DirectStay",
      date: "Nov 15",
      views: "2.1k",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "property-photography-guide",
      title: "Property Photography That Sells",
      author: "DirectStay",
      date: "Nov 12",
      views: "1.8k",
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  const hostListings = [
    {
      id: 1,
      title: "Cozy 2-Cabin Calabar Gardens Area",
      location: "Matoury, Perspolis State Peer Fields",
      image: "/placeholder.svg?height=300&width=400",
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 2,
      title: "Cozy 2-Cabin Calabar Gardens Area",
      location: "Matoury, Perspolis State Peer Fields",
      image: "/placeholder.svg?height=300&width=400",
      rating: 5.0,
      reviews: 1,
    },
    {
      id: 3,
      title: "Cozy 2-Cabin Calabar Gardens Area",
      location: "Matoury, Perspolis State Peer Fields",
      image: "/placeholder.svg?height=300&width=400",
      rating: 5.0,
      reviews: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation - Full Width */}
      <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li className="flex items-center">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium">
              How Hosts Can Transform Small Spaces
            </span>
          </li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Article Content */}
          <div className="lg:col-span-2 space-y-8 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Article Header */}
            <div className="space-y-6">
              {/* Hero Image */}
              <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden">
                <Image
                  src="/images/attachments-gen-images-public-beautiful-modern-house-with-garden.jpg"
                  alt="Small cozy house with white exterior and green lawn"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                How Hosts Can Transform Small Spaces
              </h1>

              {/* Author and Metadata */}
              {(isMerchantPost || isHostPost) && !isGeneralPost ? (
                <div className="flex items-center gap-4 mb-4">
                  <CollaborationBadge
                    showColaboratorText={false}
                    collaborator={{
                      name: "DirectStay",
                      logo: "/placeholder.svg",
                    }}
                  />
                  <span className="text-gray-400">x</span>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full">
                    <span className="text-sm font-medium text-gray-700">
                      Gymco
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-gray-800 text-white text-sm font-medium rounded-full">
                    Collab
                  </span>
                </div>
              ) : (
                <DirectStayBadge />
              )}

              <div className="flex items-baseline justify-between">
                <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Nov 18</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>10 mins read</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart
                      className={`w-4 h-4 ${
                        isSaved ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                    <span>3.8k</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" />
                    <span>3.8k</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => console.log("Shared!")}
                    className="h-auto p-0 text-sm text-gray-600 hover:text-blue-600 transition-colors font-normal"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsSaved(!isSaved);
                      console.log("Saved!");
                    }}
                    className="h-auto p-0 text-sm text-gray-600 hover:text-yellow-600 transition-colors font-normal"
                  >
                    <Bookmark
                      className={`w-4 h-4 mr-1 ${
                        isSaved ? "fill-yellow-500 text-yellow-500" : ""
                      }`}
                    />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>
            </div>
            {/* Article Body */}
            <div className=" max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                From the cheerful optimism of the 1960s to today's eclectic
                minimalism, the world has lost more than chicness! It has lost
                psychological diversity. Colour has evolved from our cities, our
                products, our websites, and this disappearance is no mere
                aesthetic.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From the cheerful optimism of the 1960s to today's eclectic
                minimalism, the world has lost more than chicness! It has lost
                psychological diversity. Colour has evolved from our cities, our
                products, our websites, and this disappearance is no mere
                aesthetic.
              </p>

              <div className="relative aspect-16/9 rounded-md overflow-hidden mb-8">
                <Image
                  src="/images/attachments-gen-images-public-luxury-apartment-interior.png"
                  alt="Property interior"
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">
                From the cheerful optimism of the 1960s to today's eclectic
                minimalism, the world has lost more than chicness! It has lost
                psychological diversity. Colour has evolved from our cities, our
                products, our websites, and this disappearance is no mere
                aesthetic.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From the cheerful optimism of the 1960s to today's eclectic
                minimalism, the world has lost more than chicness! It has lost
                psychological diversity. Colour has evolved from our cities, our
                products, our websites, and this disappearance is no mere
                aesthetic.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="relative aspect-4/3 rounded-md overflow-hidden">
                  <Image
                    src="/images/attachments-gen-images-public-cozy-vacation-rental-bedroom.jpg"
                    alt="Property exterior"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[/3 rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Property detail"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                From the cheerful optimism of the 1960s to today's eclectic
                minimalism, the world has lost more than chicness! It has lost
                psychological diversity. Colour has evolved from our cities, our
                products, our websites, and this disappearance is no mere
                aesthetic.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From the cheerful optimism of the 1960s to today's eclectic
                minimalism, the world has lost more than chicness! It has lost
                psychological diversity. Colour has evolved from our cities, our
                products, our websites, and this disappearance is no mere
                aesthetic.
              </p>
            </div>

            {/* Mobile Sidebar */}
            <div className="lg:hidden space-y-6">
              {isGeneralPost ? (
                <>
                  <SponsorshipCard
                    onRequestSponsorship={async () => {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                    }}
                  />
                  <RelatedTopics
                    posts={sidebarPosts.map((post) => ({
                      id: post.id,
                      title: post.title,
                      author: post.author,
                      views: post.views,
                      image: post.image,
                      href: `/blog/${post.id}`,
                    }))}
                  />
                </>
              ) : isHostPost ? (
                <>
                  <div className="border rounded-2xl p-6 text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-3">
                      <AvatarImage src="/top-merchant-.jpg" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold mb-1">Stellar Condosky</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Health and Wellness
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Visit Business <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  <RelatedTopics
                    posts={sidebarPosts.map((post) => ({
                      id: post.id,
                      title: post.title,
                      author: post.author,
                      views: post.views,
                      image: post.image,
                      href: `/blog/${post.id}`,
                    }))}
                  />
                </>
              ) : (
                <>
                  <SponsorshipCard
                    onRequestSponsorship={async () => {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                    }}
                  />
                  <div className="border rounded-2xl p-6 text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-3">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold mb-1">Stellar Condosky</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Health and Wellness
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Visit Business <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                  <RelatedTopics
                    posts={sidebarPosts.map((post) => ({
                      id: post.id,
                      title: post.title,
                      author: post.author,
                      views: post.views,
                      image: post.image,
                      href: `/blog/${post.id}`,
                    }))}
                  />
                </>
              )}
            </div>

            {/* Comments Section */}
            <div className="mt-12">
              <CommentsSection
                comments={comments}
                currentUser={{
                  name: "Gabriella Montez",
                  avatar: "/placeholder.svg",
                }}
                onAddComment={async (content, parentId) => {
                  await new Promise((resolve) => setTimeout(resolve, 500));
                  const newComment: Comment = {
                    id: Date.now(),
                    author: "Gabriella Montez",
                    avatar: "/placeholder.svg",
                    content,
                    timestamp: "Just now",
                    likes: 0,
                    replies: [],
                    isOwner: true,
                  };

                  if (parentId) {
                    setComments((prev) =>
                      prev.map((comment) =>
                        comment.id === parentId
                          ? {
                              ...comment,
                              replies: [...comment.replies, newComment],
                            }
                          : comment
                      )
                    );
                  } else {
                    setComments((prev) => [newComment, ...prev]);
                  }
                }}
                onEditComment={async (id, content) => {
                  await new Promise((resolve) => setTimeout(resolve, 500));
                  const updateComment = (comments: Comment[]): Comment[] =>
                    comments.map((comment) =>
                      comment.id === id
                        ? { ...comment, content }
                        : {
                            ...comment,
                            replies: updateComment(comment.replies),
                          }
                    );
                  setComments((prev) => updateComment(prev));
                }}
                onDeleteComment={async (id) => {
                  await new Promise((resolve) => setTimeout(resolve, 500));
                  const removeComment = (comments: Comment[]): Comment[] =>
                    comments
                      .filter((comment) => comment.id !== id)
                      .map((comment) => ({
                        ...comment,
                        replies: removeComment(comment.replies),
                      }));
                  setComments((prev) => removeComment(prev));
                }}
                onLikeComment={async (id) => {
                  await new Promise((resolve) => setTimeout(resolve, 300));
                }}
                onUnlikeComment={async (id) => {
                  await new Promise((resolve) => setTimeout(resolve, 300));
                }}
              />
            </div>

            {!isGeneralPost && (
              <>
                {/* Listings From Host - Only for Host Posts */}
                {isHostPost && (
                  <div className="border-t mt-16 pt-12">
                    <h2 className="text-2xl font-bold mb-6">
                      Listings From Host
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {hostListings.map((listing) => (
                        <Link
                          key={listing.id}
                          href={`/listing/${listing.id}`}
                          className="group"
                        >
                          <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-3">
                            <Image
                              src={listing.image || "/placeholder.svg"}
                              alt={listing.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-white/90 text-foreground backdrop-blur-sm">
                                <MapPin className="h-3 w-3 mr-1" />
                                Comfortable Interiors
                              </Badge>
                            </div>
                            <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-semibold">
                                {listing.rating}
                              </span>
                            </div>
                          </div>
                          <h3 className="font-semibold mb-1 group-hover:text-primary line-clamp-1">
                            {listing.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {listing.location}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="hidden lg:block space-y-6">
              {isGeneralPost ? (
                <>
                  <SponsorshipCard
                    onRequestSponsorship={async () => {
                      // Simulate API call
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                    }}
                  />

                  <RelatedTopics
                    posts={sidebarPosts.map((post) => ({
                      id: post.id,
                      title: post.title,
                      author: post.author,
                      views: post.views,
                      image: post.image,
                      href: `/blog/${post.id}`,
                    }))}
                  />
                </>
              ) : isHostPost ? (
                <>
                  {/* Host Merchant Card */}
                  <div className="border rounded-md p-6 text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-3">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold mb-1">Stellar Condosky</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Health and Wellness
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Visit Business <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  <RelatedTopics
                    posts={sidebarPosts.map((post) => ({
                      id: post.id,
                      title: post.title,
                      author: post.author,
                      views: post.views,
                      image: post.image,
                      href: `/blog/${post.id}`,
                    }))}
                  />
                </>
              ) : (
                <>
                  {/* Sponsor Card for Merchant Spotlight */}
                  <SponsorshipCard
                    onRequestSponsorship={async () => {
                      // Simulate API call
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                    }}
                  />

                  {/* Merchant Card */}
                  <div className="border rounded-md p-6 text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-3">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold mb-1">Stellar Condosky</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Health and Wellness
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Visit Business <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  <RelatedTopics
                    posts={sidebarPosts.map((post) => ({
                      id: post.id,
                      title: post.title,
                      author: post.author,
                      views: post.views,
                      image: post.image,
                      href: `/blog/${post.id}`,
                    }))}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <CtaSection />
    </div>
  );
}
