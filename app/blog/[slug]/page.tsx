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
} from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { CommentsSection } from "@/components/comments-section";
import { ArticleHeader } from "@/components/article-header";
import { SponsorshipCard } from "@/components/sponsorship-card";
import { RelatedTopics } from "@/components/related-topics";
import type { Comment } from "@/lib/types/comments";

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

  const relatedPosts = [
    {
      id: 1,
      title: "Want to get sponsored?",
      description:
        "Smart furniture choices and layout tricks merchants recommend for turning compact.",
      author: "DirectStay",
      date: "Nov 18",
      views: "1.6k",
      comments: "3.8k",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Want to get sponsored?",
      description:
        "Smart furniture choices and layout tricks merchants recommend for turning compact.",
      author: "DirectStay",
      date: "Nov 18",
      views: "1.6k",
      comments: "3.8k",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Want to get sponsored?",
      description:
        "Smart furniture choices and layout tricks merchants recommend for turning compact.",
      author: "DirectStay",
      date: "Nov 18",
      views: "1.6k",
      comments: "3.8k",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

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
      {/* Article Header - Full Width */}
      <ArticleHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "How Hosts Can Transform Small Spaces", href: "#" },
        ]}
        title="How Hosts Can Transform Small Spaces"
        heroImage="/images/attachments-gen-images-public-beautiful-modern-house-with-garden.jpg"
        heroImageAlt="Small cozy house with white exterior and green lawn"
        author={{
          name: "DirectStay",
          avatar: "/placeholder.svg",
          isVerified: true,
        }}
        collaboration={{
          partner: "Gymco",
        }}
        publishDate="Nov 18"
        readTime="10 mins read"
        likes="3.8k"
        comments="3.8k"
        onLike={() => console.log("Liked!")}
        onSave={() => {
          setIsSaved(!isSaved);
          console.log("Saved!");
        }}
        onShare={() => console.log("Shared!")}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Article Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
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

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
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
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/attachments-gen-images-public-cozy-vacation-rental-bedroom.jpg"
                    alt="Property exterior"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
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
                  <div className="border rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">Related posts</h3>
                    <div className="space-y-3">
                      {sidebarPosts.slice(0, 4).map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.id}`}
                          className="flex gap-3 group"
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium mb-1 line-clamp-2 group-hover:text-primary">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{post.author}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {post.views}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
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

                {/* Read More From The Writer */}
                <section className="mt-16 py-12">
                  <h2 className="text-2xl font-bold mb-6">
                    Read More From The Writer
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.id}`}
                        className="group"
                      >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <h3 className="font-semibold mb-2 group-hover:text-primary">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>DS</AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium">
                              {post.author}
                            </span>
                            <Badge
                              variant="secondary"
                              className="h-3 px-1 text-[8px]"
                            >
                              ✓
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {post.comments}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="hidden lg:block sticky top-8 space-y-6">
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

                  {/* Related Posts */}
                  <div className="border rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">Related posts</h3>
                    <div className="space-y-3">
                      {sidebarPosts.slice(0, 4).map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.id}`}
                          className="flex gap-3 group"
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={post.image || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium mb-1 line-clamp-2 group-hover:text-primary">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{post.author}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {post.views}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
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
