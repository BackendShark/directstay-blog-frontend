"use client"

export function TopPerformingPost() {
  const posts = [
    {
      title: "Lagos Home Tour Guide",
      description: "A walkthrough of a modern Lagos shortlet highlighting design, pricing, and host amenities.",
      image: "🏠",
      views: "3.8k",
      likes: "3.8k",
      shares: "3.8k",
      comments: "3.8k",
    },
    {
      title: "Weekend Stay in Lekki",
      description: "A quick feature on a host's two-bedroom apartment perfect for short weekend bookings.",
      image: "🏢",
      views: "3.8k",
      likes: "3.8k",
      shares: "3.8k",
      comments: "3.8k",
    },
    {
      title: "Best Furniture for Small Spaces",
      description: "A curated list of compact furniture options ideal for hosts optimizing small apartments.",
      image: "🪑",
      views: "3.8k",
      likes: "3.8k",
      shares: "3.8k",
      comments: "3.8k",
    },
    {
      title: "How to Style Your Shortlet",
      description: "A styling guide showing how hosts can decorate listings to boost bookings.",
      image: "✨",
      views: "3.8k",
      likes: "3.8k",
      shares: "3.8k",
      comments: "3.8k",
    },
  ]

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Top Performing Post</h2>
        <button className="text-blue-600 text-sm font-medium">This Week 📊</button>
      </div>
      <div className="space-y-3">
        {posts.map((post, idx) => (
          <div key={idx} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-b-0">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
              {post.image}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 text-sm">{post.title}</h3>
              <p className="text-gray-600 text-xs mt-1">{post.description}</p>
            </div>
            <div className="flex items-center gap-4 text-gray-500 text-xs flex-shrink-0">
              <div className="flex items-center gap-1">
                <span>👁️</span>
                <span>{post.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>❤️</span>
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>📋</span>
                <span>{post.shares}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>💬</span>
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
