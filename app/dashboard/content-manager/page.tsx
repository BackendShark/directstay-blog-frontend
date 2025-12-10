"use client"

import { useState } from "react"
import { ContentManagerMetrics } from "@/components/content-manager-metrics"
import { BlogPostsTable } from "@/components/blog-posts-table"

export default function ContentManagerPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState("All")
  const [sortBy, setSortBy] = useState("Latest")

  return (
    <div className="flex h-screen bg-gray-50">
     
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            {/* Filters and Search */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm">
                  <span>📅</span>
                  <span className="text-gray-700">Dec 24 - Dec 31</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 cursor-pointer"
                  >
                    <option>All</option>
                    <option>Featured</option>
                    <option>Normal</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 cursor-pointer"
                  >
                    <option>Latest</option>
                    <option>Oldest</option>
                    <option>Most Views</option>
                    <option>Most Likes</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
                <span className="text-gray-500">🔍</span>
                <input
                  type="text"
                  placeholder="Search by title, host, merchant, or tag"
                  className="text-sm text-gray-700 placeholder-gray-500 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Metrics Cards */}
            <ContentManagerMetrics />

            {/* Blog Posts Table */}
            <BlogPostsTable currentPage={currentPage} />

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Showing 1 to 6 of 500 Blog post</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">&lt;</button>
                {[1, 2, 3, 4, 5, 6].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm rounded-lg font-medium ${
                      currentPage === page ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">&gt;</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
