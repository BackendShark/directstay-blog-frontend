"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function UserActivityTrend() {
  const data = [
    { date: "Dec 24", value: 30000 },
    { date: "Dec 25", value: 35000 },
    { date: "Dec 26", value: 32000 },
    { date: "Dec 27", value: 40000 },
    { date: "Dec 28", value: 45000 },
    { date: "Dec 29", value: 42000 },
    { date: "Dec 30", value: 35000 },
    { date: "Dec 31", value: 38000 },
  ]

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">User Activity Trend</h2>
        <button className="text-blue-600 text-sm font-medium">Impressions 📊</button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" label={{ value: "50k", angle: -90, position: "insideLeft", offset: 10 }} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
