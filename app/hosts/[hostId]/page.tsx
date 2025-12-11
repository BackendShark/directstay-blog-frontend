"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Calendar,
  Eye,
  MessageSquare,
  Bookmark,
  ChevronRight,
} from "lucide-react";

export default function HostProfilePage({
  params,
}: {
  params: { hostId: string };
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>How Hosts Can Transform Small Spaces</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* About Host */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">About Host</h2>
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <Image
                src="https://blob.v0.app/qR2sT.jpg"
                alt="Gabriella Montez"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Gabriella Montez</h3>
              <p className="text-gray-600 mb-2">
                Smart furniture choices and layout tricks merchants recommend
                for turning compact. Smart furniture choices and layout tricks
                merchants recommend for turning compact.
              </p>
              <p className="text-sm text-gray-500">Member since Aug 26, 2025</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                Request for Sponsorship
              </Button>
              <Button
                variant="outline"
                className="px-6 flex items-center gap-2 bg-transparent"
              >
                View Listings
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Button>
              <button className="text-blue-600 hover:underline text-sm font-medium">
                Learn more
              </button>
            </div>
          </div>
        </div>

        {/* Listings From Host */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Listings From Host</h2>
            <button className="text-sm text-blue-600 font-medium flex items-center gap-1">
              See More <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Link key={i} href="/blog/host-listing-1" className="group">
                <div className="relative rounded-lg overflow-hidden mb-3">
                  <Image
                    src={`https://blob.v0.app/${
                      i === 1 ? "T23zG" : i === 2 ? "MDnVb" : "cquHL"
                    }.jpg`}
                    alt="Property"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Lumberpond, Alabama</span>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium text-gray-900">5.0</span>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                  Casey's Cabin-Callaway Gardens Area -Historic Property-Lake-
                  Pool-Trails
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for post, merchant..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Birmingham, Alabama</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort:</span>
              <button className="flex items-center gap-1 text-sm font-medium">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                Newest
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium">Popular Searches:</span>
            {["Home", "Garden", "Restaurant"].map((search) => (
              <button
                key={search}
                className="px-3 py-1 text-sm rounded-full border hover:bg-gray-50"
              >
                {search}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border-b">
            {["All", "Personal Blog", "Collaboration"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeCategory === cat
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Post & Top Post */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {/* Recent Post */}
          <div className="col-span-2">
            <h2 className="text-xl font-bold mb-6">Recent Post</h2>
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Link key={i} href="/blog/recent-post" className="group">
                  <div className="relative rounded-lg overflow-hidden mb-3">
                    <Image
                      src="/images/attachments-gen-images-public-beautiful-modern-house-with-garden.jpg"
                      alt="Post"
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-blue-600">
                    Want to get sponsored?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Smart furniture choices and layout tricks merchants
                    recommend for turning compact.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
                      <span className="text-sm font-medium">
                        Gabriella montez
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Nov 18
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      3.8k
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      3.8k
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Post */}
          <div>
            <h2 className="text-xl font-bold mb-6">Top Post</h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Link
                  key={i}
                  href="/blog/top-post"
                  className="flex gap-3 group"
                >
                  <Image
                    src="/images/attachments-gen-images-public-beautiful-modern-house-with-garden.jpg"
                    alt="Post"
                    width={100}
                    height={80}
                    className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-600">
                      Want to get sponsored?
                    </h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                      Smart furniture choices and layout tricks merchants
                      recommend for turning compact.
                    </p>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
                      <span className="text-xs font-medium">
                        Gabriella montez
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Nov 18
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        3.8k
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        1.6k
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* For You */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">For You</h2>
          <div className="grid grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Link
                key={i}
                href="/blog/for-you"
                className="group relative rounded-xl overflow-hidden h-64"
              >
                <Image
                  src={
                    i === 1
                      ? "https://blob.v0.app/wF8xY.jpg"
                      : "https://blob.v0.app/zG3kL.jpg"
                  }
                  alt="Featured"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    How Hosts Can Transform Small Spaces
                  </h3>
                  <p className="text-sm text-white/90 mb-3">
                    Smart furniture choices and layout tricks merchants
                    recommend for turning compact.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
                      <span className="text-sm font-medium">DirectStay</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                    <span className="px-2 py-1 bg-yellow-500/20 backdrop-blur-sm text-xs rounded">
                      Collab
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4" />
                      Nov 18
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <Eye className="w-4 h-4" />
                      3.8k
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <MessageSquare className="w-4 h-4" />
                      1.6k
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Post */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6">All Post</h2>
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Link key={i} href="/blog/all-post" className="group">
                <div className="relative rounded-lg overflow-hidden mb-3">
                  <Image
                    src="/images/attachments-gen-images-public-beautiful-modern-house-with-garden.jpg"
                    alt="Post"
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-blue-600">
                  Want to get sponsored?
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  Smart furniture choices and layout tricks merchants recommend
                  for turning compact.
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
                  <span className="text-sm font-medium">DirectStay</span>
                  <span className="text-yellow-400">★</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Nov 18
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    2.8k
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    3.8k
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" className="px-8 bg-transparent">
              See More
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-blue-600 to-blue-700 p-12 text-center text-white">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-3">
              Become a Host with DirectStay
            </h2>
            <p className="text-blue-100 mb-6">
              Connect with travelers, share your space, and join a community of
              hosts earning together.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8">
              Become a host
            </Button>
          </div>
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M0,0 L100,0 L100,100 Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
