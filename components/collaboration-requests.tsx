"use client"

export function CollaborationRequests() {
  const requests = [
    {
      name: "UrbanLiving Interiors",
      category: "Furniture and decor",
      time: "4h hour ago",
      status: "Real-life Housing",
      avatars: ["👤"],
    },
    {
      name: "UrbanLiving Interiors",
      category: "Furniture and decor",
      time: "5 hours ago",
      status: "Real-life Housing",
      avatars: ["👤", "👤"],
    },
    {
      name: "UrbanLiving Interiors",
      category: "Furniture and decor",
      time: "1 day ago",
      status: "Real-life Housing",
      avatars: ["👤", "👤"],
    },
    {
      name: "UrbanLiving Interiors",
      category: "Furniture and decor",
      time: "3 day ago",
      status: "Real-life Housing",
      avatars: ["👤", "👤"],
    },
  ]

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Collaboration Requests (4)</h2>
        <button className="text-blue-600 text-sm font-medium">See All →</button>
      </div>
      <div className="space-y-4">
        {requests.map((request, idx) => (
          <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                {request.avatars[0]}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">{request.name}</h3>
                <p className="text-gray-500 text-xs">
                  {request.category} · {request.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-600">{request.status}</span>
              <div className="flex items-center -space-x-2">
                {request.avatars.map((avatar, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center text-xs"
                  >
                    {avatar}
                  </div>
                ))}
              </div>
              <button className="text-gray-400 hover:text-gray-600">⋯</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
