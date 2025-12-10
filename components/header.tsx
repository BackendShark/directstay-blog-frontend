"use client"

interface HeaderProps {
  title?: string
  subtitle?: string
}

export function Header({ title = "Admin Overview", subtitle }: HeaderProps) {
  const defaultSubtitle =
    title === "Content Manager"
      ? "Monitor activity and platform performance."
      : title === "Analytics"
        ? "Monitor platform performance and user activity in real time."
        : title === "Host Blog Post Editor"
          ? "Create and manage your blogs"
          : title === "Messages"
            ? "Keep up with others on business easily"
            : "Monitor activity and platform performance."

  const displaySubtitle = subtitle || defaultSubtitle

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600">{displaySubtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search for post, merchant..."
            className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 placeholder-gray-500 w-64"
          />
          <button className="text-gray-500 hover:text-gray-700">🔔</button>
          <button className="text-gray-500 hover:text-gray-700">⚙️</button>
          <div className="text-sm font-medium text-gray-700">$78.68</div>
          <button className="text-gray-500 hover:text-gray-700">👤</button>
        </div>
      </div>
    </header>
  )
}
