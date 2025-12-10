export function AnalyticsMetrics() {
  const metrics = [
    { label: "Total Views", value: "10.1k", change: "-5%", icon: "👁️", color: "bg-purple-100" },
    { label: "Unique Readers", value: "500", change: "+35%", icon: "📖", color: "bg-blue-100" },
    { label: "Avg. Read Time", value: "3m 42s", change: "+30%", icon: "⏱️", color: "bg-yellow-100" },
    { label: "Engagement Rate", value: "18%", change: "-8%", icon: "💬", color: "bg-pink-100" },
    { label: "Bounce Rate", value: "22%", change: "+10%", icon: "🔀", color: "bg-blue-100" },
    { label: "Posts Published", value: "267", change: "+30%", icon: "📝", color: "bg-red-100" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((metric, idx) => (
        <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
          <div className={`w-10 h-10 ${metric.color} rounded-lg flex items-center justify-center mb-3 text-lg`}>
            {metric.icon}
          </div>
          <p className="text-xs text-gray-600 mb-1">{metric.label}</p>
          <h3 className="text-xl font-bold text-gray-900">{metric.value}</h3>
          <p
            className={`text-xs font-semibold mt-2 ${metric.change.includes("-") ? "text-red-500" : "text-green-500"}`}
          >
            {metric.change}
          </p>
        </div>
      ))}
    </div>
  )
}
