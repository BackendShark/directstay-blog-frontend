"use client"

export function MessageTemplates() {
  const templates = [
    { id: "1", name: "First Reply", icon: "✍️" },
    { id: "2", name: "Accept Offer", icon: "✅" },
    { id: "3", name: "Decline Offer", icon: "❌" },
    { id: "4", name: "FAQ", icon: "❓" },
  ]

  return (
    <div className="flex flex-col">
      <button className="m-4 bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
        <span>+</span>
        Add New Template
      </button>
      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        {templates.map((template) => (
          <button
            key={template.id}
            className="w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{template.icon}</span>
              <span className="font-medium text-gray-900">{template.name}</span>
              <span className="ml-auto text-gray-400">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
