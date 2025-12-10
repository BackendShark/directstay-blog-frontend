"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { date: "Dec 25", views: 700, readers: 350 },
  { date: "Dec 26", views: 350, readers: 200 },
  { date: "Dec 27", views: 500, readers: 300 },
  { date: "Dec 28", views: 900, readers: 500 },
  { date: "Dec 29", views: 450, readers: 250 },
  { date: "Dec 30", views: 800, readers: 450 },
  { date: "Dec 31", views: 1000, readers: 600 },
]

export function TrafficOverview() {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Traffic Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb" }} />
          <Legend />
          <Bar dataKey="views" fill="#3b82f6" name="Views" />
          <Bar dataKey="readers" fill="#8b5cf6" name="Unique Readers" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
