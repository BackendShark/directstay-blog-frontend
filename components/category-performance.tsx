"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { date: "Dec 24", value: 25000 },
  { date: "Dec 25", value: 30000 },
  { date: "Dec 26", value: 28000 },
  { date: "Dec 27", value: 35000 },
  { date: "Dec 28", value: 32000 },
  { date: "Dec 29", value: 28000 },
  { date: "Dec 30", value: 38000 },
  { date: "Dec 31", value: 40000 },
]

const categories = [
  { name: "Travel", posts: "11m Post" },
  { name: "Property Tips", posts: "1.5k Post" },
  { name: "Food & Lifestyle", posts: "11k Post" },
  { name: "Host Resources", posts: "1k Post" },
]

export function CategoryPerformance() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Category Performance</h2>
      <div className="space-y-6">
        {categories.map((cat, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">{cat.name}</h3>
              <span className="text-xs text-gray-500">👁️ 3.8k</span>
            </div>
            <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={[0, 50000]} />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 mt-1">{cat.posts}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
