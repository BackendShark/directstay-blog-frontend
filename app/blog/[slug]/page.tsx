"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  ThumbsUp,
  ExternalLink,
  ChevronRight,
  Sun,
  Star,
} from "lucide-react";
import { RootNav } from "@/components/root-nav";

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
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Gabriella Montez",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "I plan India really amazing, and the photos were 9 ever more inviting. I'm planning a weekend trip soon and I'm thinking this might be the perfect spot. I just want to know what the atmosphere is like during the holidays. Does it tend to get crowded around that time, or is it still calm enough to enjoy without too much noise or traffic?",
      timestamp: "5 mins ago",
      likes: 0,
      replies: [],
      isAuthor: true,
    },
    {
      id: 2,
      author: "Gabriella Montez",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "It gets a bit busy around Christmas, but weekday are usually calm. You can book early to get the best dates.",
      timestamp: "5 mins ago",
      likes: 0,
      replies: [],
    },
    {
      id: 3,
      author: "Gabriella Montez",
      avatar: "/placeholder.svg?height=40&width=40",
      content:
        "It gets a bit busy around Christmas, but weekday are usually calm. You can book early to get the best dates.",
      timestamp: "5 mins ago",
      likes: 0,
      replies: [],
    },
    {
      id: 4,
      author: "Gabriella Montez",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Love this guide. Are there family friendly spots nearby?",
      timestamp: "5 mins ago",
      likes: 0,
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
      title: "Want to get sponsored?",
      author: "DirectStay",
      date: "Nov 18",
      views: "1.6k",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Want to get sponsored?",
      author: "DirectStay",
      date: "Nov 18",
      views: "1.6k",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Want to get sponsored?",
      author: "DirectStay",
      date: "Nov 18",
      views: "1.6k",
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
      {/* Header */}
      <RootNav />

      {/* Breadcrumb */}
      <div className="container px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">
            How Hosts Can Transform Small Spaces
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Article Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
              <Image
                src="/images/attachments-gen-images-public-beautiful-modern-house-with-garden.jpg"
                alt="Property"
                fill
                className="object-cover"
              />
            </div>

            {/* Article Header */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-4">
                How Hosts Can Transform Small Spaces
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">DirectStay</span>
                        <Badge
                          variant="secondary"
                          className="h-4 px-1 text-[10px]"
                        >
                          ✓
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    Opined
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Nov 18</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>10 mins read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>4.8k</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>1.9k</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Bookmark
                    className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`}
                  />
                  Save
                </Button>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none mb-8">
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

            {/* Comments Section */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">Comments (20)</h2>

              {/* Comment Input */}
              <div className="mb-8">
                <div className="flex gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>GM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <span className="font-semibold">Gabriella Montez</span>
                  </div>
                </div>
                <Textarea
                  placeholder="Share your thoughts"
                  className="mb-2 min-h-[100px]"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comment
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                      <AvatarFallback>GM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{comment.author}</span>
                        {comment.isAuthor && (
                          <Badge variant="secondary" className="h-5 text-xs">
                            Author
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                          Reply
                        </button>
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                          <ThumbsUp className="h-3 w-3" />
                          {comment.likes > 0 && comment.likes}
                        </button>
                        {comment.replies.length > 0 && (
                          <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                            <MessageCircle className="h-3 w-3" />
                            {comment.replies.length}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!isGeneralPost && (
              <>
                {/* Listings From Host - Only for Host Posts */}
                {isHostPost && (
                  <div className="border-t mt-12 pt-12">
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
                          <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
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
                <section className="max-w-7xl mx-auto px-4 py-16">
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
            <div className="sticky top-20 space-y-6">
              {isGeneralPost ? (
                <>
                  {/* General Blog - DirectStay Badge + Sponsorship */}
                  <div className="border rounded-2xl p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="relative w-10 h-10">
                        <div className="absolute inset-0">
                          <svg viewBox="0 0 40 40" fill="none">
                            <path d="M20 5L28 15H12L20 5Z" fill="#FDB022" />
                            <path d="M20 15L28 25H12L20 15Z" fill="#4A7FFF" />
                          </svg>
                        </div>
                      </div>
                      <span className="font-bold text-lg">DirectStay</span>
                      <span className="text-yellow-500">✓</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Want to feature your business on the DirectStay Blog?
                    </p>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Request for Sponsorship
                    </Button>
                  </div>

                  {/* Related Topics */}
                  <div className="border rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">Related topics</h3>
                    <div className="space-y-3">
                      {sidebarPosts.slice(0, 4).map((post, index) => (
                        <Link key={index} href="#" className="flex gap-3 group">
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

                  {/* Related Topics */}
                  <div className="border rounded-2xl p-6">
                    <h3 className="font-semibold mb-4">Related topics</h3>
                    <div className="space-y-3">
                      {sidebarPosts.slice(0, 4).map((post, index) => (
                        <Link key={index} href="#" className="flex gap-3 group">
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
              ) : (
                <>
                  {/* Sponsor Card for Merchant Spotlight */}
                  <div className="border rounded-2xl p-6 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <div className="relative w-8 h-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-t-full" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[12px] border-t-blue-600" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-1">DirectStay Blog</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Want to feature your business on the DirectStay Blog?
                    </p>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Request for Sponsorship
                    </Button>
                  </div>

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
                      {sidebarPosts.slice(0, 4).map((post, index) => (
                        <Link key={index} href="#" className="flex gap-3 group">
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

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full" />
          <div
            className="absolute bottom-10 right-10 w-96 h-96 border-2 border-white"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
        </div>
        <div className="container px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Become a Host with DirectStay
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Connect with travelers, share your space and join a community of
            hosts earning extra income.
          </p>
          <Button size="lg" variant="secondary">
            Become a Host
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="hover:text-foreground">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="hover:text-foreground">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/affiliate" className="hover:text-foreground">
                    Affiliate Program
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/contact-team" className="hover:text-foreground">
                    Contact Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community-forum"
                    className="hover:text-foreground"
                  >
                    Community Forum
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/directstay-org"
                    className="hover:text-foreground"
                  >
                    DirectStay.org
                  </Link>
                </li>
                <li>
                  <Link
                    href="/host-community"
                    className="hover:text-foreground"
                  >
                    Host Community
                  </Link>
                </li>
                <li>
                  <Link href="/partnerships" className="hover:text-foreground">
                    Partnerships & Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    href="/referral-policy"
                    className="hover:text-foreground"
                  >
                    Referral & Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sustainable-deposit"
                    className="hover:text-foreground"
                  >
                    Sustainable Deposit Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/fraud-prevention"
                    className="hover:text-foreground"
                  >
                    Fraud Prevention & Account Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community-standards"
                    className="hover:text-foreground"
                  >
                    Community Standards & Guest Conduct Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/background-check"
                    className="hover:text-foreground"
                  >
                    Background Check Policy
                  </Link>
                </li>
                <li>
                  <Link href="/tax-identity" className="hover:text-foreground">
                    Tax & Identity Verification
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Policies</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/cancellation" className="hover:text-foreground">
                    Cancellation & Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Guides & Agreements</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/urbanization-guide"
                    className="hover:text-foreground"
                  >
                    Urbanization Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/property-valuations"
                    className="hover:text-foreground"
                  >
                    Property Valuations & Migration Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/new-host-onboarding"
                    className="hover:text-foreground"
                  >
                    New Host Onboarding Guide
                  </Link>
                </li>
                <li>
                  <Link href="/trust-safety" className="hover:text-foreground">
                    Trust & Safety
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dispute-resolution"
                    className="hover:text-foreground"
                  >
                    Dispute Resolution & Arbitration Agreement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guest-agreement"
                    className="hover:text-foreground"
                  >
                    Guest Agreement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/host-agreement"
                    className="hover:text-foreground"
                  >
                    Host Agreement
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Partners</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/tcs" className="hover:text-foreground">
                    TCS
                  </Link>
                </li>
                <li>
                  <Link href="/snaplogic" className="hover:text-foreground">
                    Snaplogic
                  </Link>
                </li>
                <li>
                  <Link
                    href="/power-pay-startups"
                    className="hover:text-foreground"
                  >
                    Power Pay Startups
                  </Link>
                </li>
                <li>
                  <Link
                    href="/invest-in-visas"
                    className="hover:text-foreground"
                  >
                    Invest In Visas
                  </Link>
                </li>
                <li>
                  <Link href="/power-pay" className="hover:text-foreground">
                    Power Pay
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t text-sm text-muted-foreground">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-t-full" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[12px] border-t-blue-600" />
              </div>
              <div>
                <div className="font-bold">DIRECTSTAY</div>
                <div className="text-xs">
                  your direct route around the world
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="/sitemap" className="hover:text-foreground">
                Sitemap
              </Link>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground mt-4">
            2025 DirectStay, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
