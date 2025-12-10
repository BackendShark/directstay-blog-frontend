"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

interface SidebarProps {
  activeItem?: string
}

export function Sidebar({ activeItem: initialActive = "Overview" }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  let currentActive = initialActive
  if (pathname === "/dashboard") currentActive = "Overview"
  else if (pathname.includes("content-manager")) currentActive = "Content Manager"
  else if (pathname.includes("blog-post-editor")) currentActive = "Blog Post Editor"
  else if (pathname.includes("analytics")) currentActive = "Analytics"
  else if (pathname.includes("verification-hub")) currentActive = "Verification Hub"
  else if (pathname.includes("messages")) currentActive = "Messages"
  else if (pathname.includes("sponsored-content")) currentActive = "Sponsored Content"
  else if (pathname.includes("payments")) currentActive = "Payments"
  else if (pathname.includes("merchant-list")) currentActive = "Merchant List"
  else if (pathname.includes("user-management")) currentActive = "User Management"

  const menuItems = [
    { label: "Overview", icon: "📊", href: "/dashboard" },
    { label: "Content Manager", icon: "📝", href: "/dashboard/content-manager" },
    { label: "Blog Post Editor", icon: "✏️", href: "/dashboard/blog-post-editor" },
    // { label: "Media Toolkit", icon: "🖼️", href: "/dashboard/media-toolkit" },
    { label: "Analytics", icon: "📈", href: "/dashboard/analytics" },
    { label: "Verification Hub", icon: "✓", href: "/dashboard/verification-hub" },
    // { label: "Merchants", icon: "🏪", href: "/dashboard/merchants" },
    { label: "Messages", icon: "💬", href: "/dashboard/messages", badge: true },
    { label: "Sponsored Content", icon: "📢", href: "/dashboard/sponsored-content", badge: true },
    { label: "Payments", icon: "💳", href: "/dashboard/payments" },
    { label: "Merchant List", icon: "🏪", href: "/dashboard/merchant-list" },
    { label: "User Management", icon: "👥", href: "/dashboard/user-management" },
  ]

  return (
    <>
      <aside
        className={`${isOpen ? "w-64" : "w-20"} bg-white border-r border-gray-200 p-6 overflow-y-auto transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
            {isOpen && <span className="font-bold text-gray-900 whitespace-nowrap">DIRECTSTAY</span>}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`block px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-3 relative transition-colors ${
                currentActive === item.label ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              title={!isOpen ? item.label : ""}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {isOpen && (
                <>
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
