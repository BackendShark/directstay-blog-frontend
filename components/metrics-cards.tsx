"use client"

export function MetricsCards() {
  const metrics = [
    {
      title: "Total Active Hosts",
      value: "367",
      change: "+3%",
      icon: "👤",
      color: "bg-pink-100",
    },
    {
      title: "Total Active Merchants",
      value: "500",
      change: "+3%",
      icon: "🏢",
      color: "bg-yellow-100",
    },
    {
      title: "Total Blog Post",
      value: "500",
      change: "+3%",
      icon: "📋",
      color: "bg-blue-100",
    },
    {
      title: "Escrow Transactions",
      value: "$500k",
      change: "+3%",
      icon: "💰",
      color: "bg-red-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => (
        <div key={idx} className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">{metric.title}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                <span className="text-green-500 text-sm font-medium">{metric.change}</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg ${metric.color}`}>
              {metric.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
