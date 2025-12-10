"use client"

export function RecentActivities() {
  const activities = [
    {
      title: "Pinterest Connected",
      time: "27 mins ago",
      description: "Jane posted a pin to a new product link",
      icon: "📌",
    },
    {
      title: "Blog Sent",
      time: "9 mins ago",
      description: "Adams added a new travel story and requested mer...",
      icon: "📄",
    },
    {
      title: "Collaboration Started",
      time: "17 mins ago",
      description: "A host wants to collaborate with UrbanLiving Inter...",
      icon: "🤝",
    },
    {
      title: "Merchant Verified",
      time: "2 mins ago",
      description: "Sdb. UrbanLiving Interiors completed Eth verificat...",
      icon: "✓",
    },
  ]

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Recent Activities</h2>
        <button className="text-blue-600 text-sm font-medium">See All →</button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0">
            <div className="text-xl flex-shrink-0">{activity.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm">{activity.title}</h3>
              <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
              <p className="text-gray-600 text-xs mt-1 truncate">{activity.description}</p>
            </div>
            <button className="text-blue-600 text-xs whitespace-nowrap">View Details →</button>
          </div>
        ))}
      </div>
    </div>
  )
}
