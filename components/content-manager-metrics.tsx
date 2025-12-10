export function ContentManagerMetrics() {
  const metrics = [
    {
      label: "Total Blog Post",
      value: "500",
      icon: "📋",
      change: "+35%",
      color: "bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      label: "Views",
      value: "10.1k",
      icon: "👁️",
      change: "-5%",
      color: "bg-purple-50",
      iconBg: "bg-purple-100",
      changeNegative: true,
    },
    {
      label: "Likes",
      value: "3.6k",
      icon: "👍",
      change: "+35%",
      color: "bg-yellow-50",
      iconBg: "bg-yellow-100",
    },
    {
      label: "Saves",
      value: "267",
      icon: "🔖",
      change: "+35%",
      color: "bg-pink-50",
      iconBg: "bg-pink-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className={`${metric.color} rounded-lg p-6 border border-gray-100`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
              <p className={`text-xs mt-2 ${metric.changeNegative ? "text-red-600" : "text-green-600"}`}>
                {metric.change}
              </p>
            </div>
            <div className={`${metric.iconBg} p-3 rounded-lg text-xl`}>{metric.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
