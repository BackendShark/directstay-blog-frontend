import type React from "react"
import { RootNav } from "@/components/root-nav"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <RootNav />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
