"use client"

export function SystemHealth() {
  const systems = [
    {
      title: "Server Status",
      icon: "⭐",
      status: "Good",
      description: "All servers are running well with no downtime reports.",
      lastSync: "Last sync 5 mins ago",
      color: "bg-yellow-50",
      statusColor: "text-yellow-700",
    },
    {
      title: "AI Assistant Status",
      icon: "🤖",
      status: "Good",
      description: "AI onboarding and auto reply services are working correctly.",
      lastSync: "Auto refreshed just now",
      color: "bg-blue-50",
      statusColor: "text-blue-700",
    },
    {
      title: "API Usage Today",
      icon: "🌐",
      status: "Stable",
      description: "Sdb. 4,320 API calls made across hosts, merchants, and admin tools.",
      lastSync: "Last sync 5 mins ago",
      color: "bg-green-50",
      statusColor: "text-green-700",
    },
    {
      title: "Pinterest Sync",
      icon: "📌",
      status: "Syncing",
      description: "Merchant content syncing is active with no delays.",
      lastSync: "Last sync 5 mins ago",
      color: "bg-red-50",
      statusColor: "text-red-700",
    },
    {
      title: "Message Delivery",
      icon: "✉️",
      status: "Good",
      description: "All email and in-app messages are delivering without issues.",
      lastSync: "Updated recently",
      color: "bg-gray-50",
      statusColor: "text-gray-700",
    },
    {
      title: "Error Logs",
      icon: "⚠️",
      status: "Good",
      description: "No critical errors detected in the last 24 hours.",
      lastSync: "Updated 30 mins ago",
      color: "bg-purple-50",
      statusColor: "text-purple-700",
    },
  ]

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 mb-6">System Health</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((system, idx) => (
          <div key={idx} className={`${system.color} rounded-lg p-6 border border-gray-200`}>
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{system.icon}</div>
              <span className={`text-xs font-medium ${system.statusColor}`}>{system.status}</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{system.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{system.description}</p>
            <p className="text-gray-500 text-xs">{system.lastSync}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
