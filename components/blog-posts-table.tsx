interface BlogPost {
  id: number
  title: string
  image: string
  date: string
  readTime: string
  status: "Featured" | "Normal"
  views: string
  likes: string
  saves: string
  shares: string
}

interface BlogPostsTableProps {
  currentPage: number
}

export function BlogPostsTable({ currentPage }: BlogPostsTableProps) {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Top 7 Key Features that Define Luxurious Houses in Miami",
      image: "/luxury-house-miami.jpg",
      date: "Nov 18",
      readTime: "10 mins read",
      status: "Featured",
      views: "3.8k",
      likes: "3.8k",
      saves: "3.8k",
      shares: "3.8k",
    },
    {
      id: 2,
      title: "Top 7 Key Features that Define Luxurious Houses in Miami",
      image: "/luxury-house-miami.jpg",
      date: "Nov 18",
      readTime: "10 mins read",
      status: "Normal",
      views: "3.8k",
      likes: "3.8k",
      saves: "3.8k",
      shares: "3.8k",
    },
    {
      id: 3,
      title: "Top 7 Key Features that Define Luxurious Houses in Miami",
      image: "/luxury-house-miami.jpg",
      date: "Nov 18",
      readTime: "10 mins read",
      status: "Featured",
      views: "3.8k",
      likes: "3.8k",
      saves: "3.8k",
      shares: "3.8k",
    },
    {
      id: 4,
      title: "Top 7 Key Features that Define Luxurious Houses in Miami",
      image: "/luxury-house-miami.jpg",
      date: "Nov 18",
      readTime: "10 mins read",
      status: "Normal",
      views: "3.8k",
      likes: "3.8k",
      saves: "3.8k",
      shares: "3.8k",
    },
    {
      id: 5,
      title: "Top 7 Key Features that Define Luxurious Houses in Miami",
      image: "/luxury-house-miami.jpg",
      date: "Nov 18",
      readTime: "10 mins read",
      status: "Featured",
      views: "3.8k",
      likes: "3.8k",
      saves: "3.8k",
      shares: "3.8k",
    },
    {
      id: 6,
      title: "Top 7 Key Features that Define Luxurious Houses in Miami",
      image: "/luxury-house-miami.jpg",
      date: "Nov 18",
      readTime: "10 mins read",
      status: "Normal",
      views: "3.8k",
      likes: "3.8k",
      saves: "3.8k",
      shares: "3.8k",
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Blog Title</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogPosts.map((post) => (
            <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-20 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {post.date} • {post.readTime}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    post.status === "Featured" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {post.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>👁️</span>
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>👍</span>
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🔖</span>
                    <span>{post.saves}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>↗️</span>
                    <span>{post.shares}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">⋯</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
