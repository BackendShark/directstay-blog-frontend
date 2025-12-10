"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function CollaborationSummary() {
  const data = [
    { date: "Dec 20", value: 95 },
    { date: "Dec 21", value: 92 },
    { date: "Dec 22", value: 94 },
    { date: "Dec 23", value: 96 },
    { date: "Dec 24", value: 95 },
    { date: "Dec 31", value: 95 },
  ]

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Collaboration Summary</h2>
        <button className="text-gray-400 hover:text-gray-600">⋯</button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🤝</div>
          <p className="text-yellow-600 font-medium text-sm">Negotiating</p>
          <p className="text-gray-900 font-bold text-2xl">40</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">✓</div>
          <p className="text-green-600 font-medium text-sm">Active</p>
          <p className="text-gray-900 font-bold text-2xl">40</p>
        </div>
        <div className="bg-blue-600 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">✕</div>
          <p className="text-blue-200 font-medium text-sm">Closed</p>
          <p className="text-white font-bold text-2xl">40</p>
        </div>
      </div>

      {/* Negotiation Rate */}
      <div className="mb-4">
        <p className="text-gray-600 text-xs font-medium mb-2">On-time Negotiation Rate</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-gray-900">95%</span>
          <span className="text-green-500 text-xs font-medium">+2.1%</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
