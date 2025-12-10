"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Eye,
  MessageCircle,
  Bookmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HostsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 3

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 rounded-lg"></div>
              <svg viewBox="0 0 24 24" fill="white" className="absolute inset-0 w-full h-full p-1.5">
                <path d="M12 3L4 9v12h16V9L12 3z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none">DIRECT</span>
              <span className="font-normal text-sm text-muted-foreground leading-none">STAY</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-blue-600">
              HOME
            </Link>
            <Link href="/merchants" className="text-sm font-medium text-foreground hover:text-blue-600">
              MERCHANTS
            </Link>
            <Link href="/hosts" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              HOSTS
            </Link>
            <Link href="/support" className="text-sm font-medium text-foreground hover:text-blue-600">
              SUPPORT
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Alabama, US</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <Button variant="ghost" className="text-sm font-medium">
              Register
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              Login
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Hero Carousel */}
        <div className="relative rounded-3xl overflow-hidden mb-8 h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=500&fit=crop"
            alt="Featured post"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 z-20 flex flex-col justify-end p-12">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-yellow-500 text-black text-xs font-semibold rounded mb-4">
                Featured
              </span>
              <h1 className="text-4xl font-bold text-white mb-4">How Hosts Can Transform Small Spaces</h1>
              <p className="text-white/90 text-lg mb-6">
                Smart furniture choices and layout tricks merchants recommend for turning compact apartments into high
                performing listings.
              </p>

              <div className="flex items-center gap-6 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                  <span className="font-medium">Direct Stay</span>
                  <span className="text-yellow-400">✓</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Nov 18</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>3.8k</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>3.8k</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded text-xs">Small Spaces</span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded text-xs">Small Spaces</span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded text-xs">Merchants</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-12 flex gap-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1 rounded-full transition-all ${
                    currentSlide === index ? "bg-white w-8" : "bg-white/50 w-1"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute bottom-6 right-20 w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute bottom-6 right-6 w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Promotional Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex gap-4 items-center p-4 bg-white border rounded-xl">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-14 bg-white border-2 border-orange-400 rounded shadow-sm transform -rotate-6"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-xs font-bold text-orange-500 transform rotate-6">
                    SPONSORED
                    <br />
                    POSTS
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Want to get sponsored?</h3>
              <p className="text-sm text-gray-600 mb-2">
                Smart furniture choices and layout tricks merchants recommend for turning compact apartments into high
                performing listings.
              </p>
              <button className="text-sm font-medium text-blue-600 hover:underline">Read More</button>
            </div>
          </div>

          <div className="flex gap-4 items-center p-4 bg-white border rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=80&h=80&fit=crop"
              alt="Becoming a host"
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Becoming a host</h3>
              <p className="text-sm text-gray-600 mb-2">
                Smart furniture choices and layout tricks merchants recommend for turning compact apartments into high
                performing listings.
              </p>
              <button className="text-sm font-medium text-blue-600 hover:underline">Read More</button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for post, merchant..."
                className="w-full h-12 pl-12 pr-4 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <button className="flex items-center gap-2 h-12 px-4 text-sm font-medium border border-gray-300 rounded-lg">
              <MapPin className="w-4 h-4" />
              Birmingham, Alabama
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 h-12 px-4 text-sm">Sort: Newest</button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Popular Searches:</p>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 border rounded-lg text-sm">Home</button>
              <button className="px-4 py-1.5 border rounded-lg text-sm">Garden</button>
              <button className="px-4 py-1.5 border rounded-lg text-sm">Restaurant</button>
            </div>
          </div>
        </div>

        {/* Recent Post and Top Post */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {/* Recent Post - Left (2 columns) */}
          <div className="col-span-2">
            <h2 className="text-xl font-bold mb-6">Recent Post</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Link key={i} href="/blog/general-blog-post" className="group">
                  <div className="rounded-xl overflow-hidden mb-3 relative">
                    <img
                      src={`https://images.unsplash.com/photo-${1600596542815 + i}?w=400&h=250&fit=crop`}
                      alt="Post"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                      <Bookmark className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    Want to get sponsored?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Smart furniture choices and layout tricks merchants recommend for turning compact apartments into
                    high performing listings.
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-blue-600"></div>
                      <span className="font-medium text-gray-900">Gabriella montez</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Nov 18</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>3.8k</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>3.8k</span>
                    </div>
                    <button className="ml-auto">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Post - Right */}
          <div>
            <h2 className="text-xl font-bold mb-6">Top Post</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Link key={i} href="/blog/general-blog-post" className="flex gap-3 group">
                  <img
                    src={`https://images.unsplash.com/photo-${1600596542815 + i}?w=100&h=100&fit=crop`}
                    alt="Post"
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-blue-600 line-clamp-2">
                      Want to get sponsored?
                    </h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      Smart furniture choices and layout tricks merchants recommend for turning compact apartments into
                      high performing listings.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                        <span className="font-medium text-gray-900">Gabriella montez</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Nov 18</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>3.8k</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>3.8k</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Article Carousel */}
        <div className="relative rounded-3xl overflow-hidden mb-12 h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&h=500&fit=crop"
            alt="Featured"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 z-20 flex flex-col justify-end p-12">
            <span className="inline-block w-fit px-3 py-1 bg-yellow-500 text-black text-xs font-semibold rounded mb-4">
              Featured
            </span>
            <h2 className="text-4xl font-bold text-white mb-4">How Hosts Can Transform Small Spaces</h2>
            <p className="text-white/90 mb-6 max-w-2xl">
              Smart furniture choices and layout tricks merchants recommend for turning compact apartments into high
              performing listings.
            </p>

            <div className="flex items-center gap-6 text-white/80 text-sm mb-8">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                <span>Switzer Connidaly</span>
                <span className="px-2 py-0.5 bg-gray-700 rounded text-xs">Collab</span>
              </div>
              <span>Nov 18,2025</span>
              <span>10 mins read</span>
            </div>

            <Button className="w-full max-w-md bg-transparent border-2 border-white text-white hover:bg-white/10">
              Read
            </Button>

            <div className="absolute bottom-6 left-12 flex gap-2">
              {[0, 1].map((index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === 0 ? "bg-white w-8" : "bg-white/50"}`}
                />
              ))}
            </div>

            <button className="absolute bottom-6 right-20 w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button className="absolute bottom-6 right-6 w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Most Read */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">Most Read</h2>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Link key={i} href="/blog/general-blog-post" className="group">
                <div className="rounded-xl overflow-hidden mb-3 relative">
                  <img
                    src={`https://images.unsplash.com/photo-${1600585154340 + i}?w=300&h=200&fit=crop`}
                    alt="Post"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                  />
                  <button className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                    <Bookmark className="w-3.5 h-3.5 text-gray-700" />
                  </button>
                </div>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">Want to get sponsored?</h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  Smart furniture choices and layout tricks merchants recommend for turning compact apartments into high
                  performing listings.
                </p>
                <div className="flex items-center gap-2 text-xs mb-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600"></div>
                  <span className="font-medium text-gray-900">DirectStay</span>
                  <span className="text-yellow-400">✓</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Nov 18</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>3.8k</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>3.8k</span>
                  </div>
                  <button className="ml-auto">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Our Host */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Our Host</h2>
            <button className="text-sm text-blue-600 font-medium">See More →</button>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {[
              { name: "Robyn", date: "Member since Aug 10, 2025", img: 1 },
              { name: "DirectStay", title: "Want to get sponsored?", date: "Member since Aug 10, 2025", img: 2 },
              { name: "DirectStay", title: "Want to get sponsored?", date: "Member since Aug 10, 2025", img: 3 },
              { name: "DirectStay", title: "Want to get sponsored?", date: "Member since Aug 10, 2025", img: 4 },
            ].map((host, i) => (
              <div key={i} className="text-center">
                <Link href={`/hosts/gabriella-montez-${i + 1}`}>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 mx-auto mb-3 cursor-pointer hover:ring-4 hover:ring-blue-100 transition-all overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${1535713875002 + i * 100}-${i}?w=80&h=80&fit=crop&crop=faces`}
                      alt={host.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <h3 className="font-semibold mb-1">{host.name}</h3>
                {host.title && <p className="text-sm text-gray-600 mb-1">{host.title}</p>}
                <p className="text-xs text-gray-500 mb-3">{host.date}</p>
                <Link href={`/hosts/gabriella-montez-${i + 1}`}>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Visit Profile
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* For You */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">For You</h2>
            <button className="text-sm text-blue-600 font-medium">See More →</button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Link key={i} href="/blog/general-blog-post" className="relative rounded-2xl overflow-hidden h-64 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img
                  src={`https://images.unsplash.com/photo-${i === 1 ? "1522771739844" : "1543269865"}-${i}?w=700&h=300&fit=crop`}
                  alt="For you"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">How Hosts Can Transform Small Spaces</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Smart furniture choices and layout tricks merchants recommend for turning compact apartments into
                    high performing listings.
                  </p>
                  <div className="flex items-center gap-2 text-white/80 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full bg-blue-600"></div>
                      <span className="font-medium text-gray-900">Gabriella montez</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Nov 18</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>3.8k</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>3.8k</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Post */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">All Post</h2>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <Link key={i} href="/blog/general-blog-post" className="group">
                <div className="rounded-xl overflow-hidden mb-3 relative">
                  <img
                    src={`https://images.unsplash.com/photo-${1600585154340 + i * 100}?w=300&h=200&fit=crop`}
                    alt="Post"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                  />
                  <button className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                    <Bookmark className="w-3.5 h-3.5 text-gray-700" />
                  </button>
                </div>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">Want to get sponsored?</h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  Smart furniture choices and layout tricks merchants recommend for turning compact apartments into high
                  performing listings.
                </p>
                <div className="flex items-center gap-2 text-xs mb-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600"></div>
                  <span className="font-medium text-gray-900">DirectStay</span>
                  <span className="text-yellow-400">✓</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Nov 18</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>3.8k</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>3.8k</span>
                  </div>
                  <button className="ml-auto">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Button variant="outline" size="lg" className="w-full max-w-md bg-transparent">
              See More
            </Button>
          </div>
        </div>

        {/* Places to Visit */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-2">Places to Visit This December</h2>
          <p className="text-sm text-gray-600 mb-6">
            Explore fun destinations, festive events, and exciting cities you can travel to this holiday season in
            Alabama
          </p>

          <div className="flex gap-2 mb-6">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">All</button>
            <button className="px-4 py-2 bg-white border rounded-lg text-sm">Beaches</button>
            <button className="px-4 py-2 bg-white border rounded-lg text-sm">Festivals</button>
            <button className="px-4 py-2 bg-white border rounded-lg text-sm">Family Trips</button>
            <button className="px-4 py-2 bg-white border rounded-lg text-sm">Nightlife</button>
            <button className="px-4 py-2 bg-white border rounded-lg text-sm">Adventure</button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "Lagos Beachfront Escape", type: "Beach", distance: "42 km away" },
              { name: "Calabar Carnival Village", type: "Festival", distance: "744 km away" },
              { name: "Abuja Weekend City Break", type: "City Break", distance: "536 km away" },
              { name: "Elegushi Beachfront", type: "Beach", distance: "28 km away" },
            ].map((place, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="rounded-xl overflow-hidden mb-3">
                  <img
                    src={`https://images.unsplash.com/photo-${1600585154340 + i * 150}?w=300&h=200&fit=crop`}
                    alt={place.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-semibold text-sm mb-1">{place.name}</h3>
                <p className="text-xs text-gray-600">
                  {place.type} • {place.distance}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 p-16 text-center">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">Become a Host with DirectStay</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with travelers, share your space, and join a community of hosts earning together.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-base font-semibold">
              Become a host
            </Button>
          </div>
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 L100,0 L100,100 Z" fill="white" opacity="0.1" />
            </svg>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="grid grid-cols-5 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 rounded-lg"></div>
                  <svg viewBox="0 0 24 24" fill="white" className="absolute inset-0 w-full h-full p-1.5">
                    <path d="M12 3L4 9v12h16V9L12 3z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg leading-none">DIRECT</span>
                  <span className="text-sm text-gray-600 leading-none">STAY</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Your direct connection to unique stays around the world</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
                <li>
                  <a href="#">Testimonials</a>
                </li>
                <li>
                  <a href="#">Affiliate Program</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Resources Team</a>
                </li>
                <li>
                  <a href="#">Community Forum</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Community</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">DirectStaying</a>
                </li>
                <li>
                  <a href="#">Host Community</a>
                </li>
                <li>
                  <a href="#">Community & Refund Policy</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Policies</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Press Policy</a>
                </li>
                <li>
                  <a href="#">Cancellation & Refund Policy</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t">
            <p className="text-sm text-gray-600">2025 DirectStay, Inc. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-600">
              <a href="#">Terms</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
