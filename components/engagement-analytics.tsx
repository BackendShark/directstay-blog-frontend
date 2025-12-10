"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "Dec 24", comments: 30000 },
  { date: "Dec 25", comments: 40000 },
  { date: "Dec 26", comments: 35000 },
  { date: "Dec 27", comments: 45000 },
  { date: "Dec 28", comments: 30000 },
  { date: "Dec 29", comments: 35000 },
  { date: "Dec 30", comments: 40000 },
  { date: "Dec 31", comments: 50000 },
]

export function EngagementAnalytics() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Engagement Analytics</h2>
        <select className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-lg cursor-pointer">
          <option>Comments</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}
            labelStyle={{ color: "#fff" }}
            formatter={(value) => `${value.toLocaleString()}`}
          />
          <Line type="monotone" dataKey="comments" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
