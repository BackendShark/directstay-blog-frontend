"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  LayoutGrid,
  FileText,
  PenTool,
  ImageIcon,
  Grid3x3,
  FileImage,
  LinkIcon,
  Settings,
  Send,
  Mic,
  Menu,
  ShoppingBag,
  MessageSquare,
  CreditCard,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BlogPostEditorPage() {
  const [isDark, setIsDark] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={`min-h-screen ${isDark ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo and Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-yellow-500">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.9" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none text-gray-900">
                  DIRECT<span className="font-normal">STAY</span>
                </span>
              </div>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Center: Title */}
          <div className="flex-1 text-center">
            <h1 className="text-xl font-semibold text-gray-900">Host Blog Post Editor</h1>
            <p className="text-sm text-gray-500">Create and manage your blogs</p>
          </div>

          {/* Right: Search, Actions, User */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search for post, merchant..." className="w-64 pl-9 pr-4" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun className="h-5 w-5 text-gray-600" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </Button>
            <Button variant="ghost" className="gap-2 text-gray-700">
              <CreditCard className="h-4 w-4" />
              <span className="font-semibold">$78.68</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <img src="/placeholder.svg?height=32&width=32" alt="User" className="h-8 w-8 rounded-full" />
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar Navigation */}
        {sidebarOpen && (
          <aside className="sticky top-[73px] h-[calc(100vh-73px)] w-60 border-r bg-white p-4">
            <nav className="space-y-2">
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
                  <LayoutGrid className="h-5 w-5" />
                  <span>Overview</span>
                </Button>
              </Link>
              <Link href="/content-manager">
                <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
                  <FileText className="h-5 w-5" />
                  <span>Content Manager</span>
                </Button>
              </Link>
              <Link href="/blog-post-editor">
                <Button
                  variant="default"
                  className="w-full justify-start gap-3 bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <PenTool className="h-5 w-5" />
                  <span>Blog Post Editor</span>
                </Button>
              </Link>
              <Link href="/media-toolkit">
                <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
                  <ImageIcon className="h-5 w-5" />
                  <span>Media Toolkit</span>
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
                  <BarChart3 className="h-5 w-5" />
                  <span>Analytics</span>
                </Button>
              </Link>
              <Link href="/merchants">
                <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Merchants</span>
                </Button>
              </Link>
              <Link href="/messages">
                <Button variant="ghost" className="relative w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
                  <MessageSquare className="h-5 w-5" />
                  <span>Messages</span>
                  <span className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    1
                  </span>
                </Button>
              </Link>
              <Link href="/payments">
                <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100">
                  <CreditCard className="h-5 w-5" />
                  <span>Payments</span>
                </Button>
              </Link>
            </nav>
          </aside>
        )}

        {/* Middle Panel: Editor Controls */}
        <aside className="sticky top-[73px] h-[calc(100vh-73px)] w-80 border-r bg-white p-6">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Write a Blog Post</h2>
              <Button variant="link" className="p-0 text-sm text-indigo-600">
                Start with AI
              </Button>
            </div>

            {/* Blog Type Selector */}
            <div>
              <Select defaultValue="personal">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal Blog</SelectItem>
                  <SelectItem value="business">Business Blog</SelectItem>
                  <SelectItem value="technical">Technical Blog</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Add Element Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500">Add Element</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="flex h-20 flex-col items-center justify-center gap-2 hover:border-indigo-600 hover:text-indigo-600 bg-transparent"
                >
                  <span className="text-2xl font-bold">H</span>
                  <span className="text-xs">Header Text</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex h-20 flex-col items-center justify-center gap-2 hover:border-indigo-600 hover:text-indigo-600 bg-transparent"
                >
                  <span className="text-xl font-normal">h</span>
                  <span className="text-xs">Body Text</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex h-20 flex-col items-center justify-center gap-2 hover:border-indigo-600 hover:text-indigo-600 bg-transparent"
                >
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-xs">Single Image</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex h-20 flex-col items-center justify-center gap-2 hover:border-indigo-600 hover:text-indigo-600 bg-transparent"
                >
                  <Grid3x3 className="h-6 w-6" />
                  <span className="text-xs">Grid Image</span>
                </Button>
              </div>
            </div>

            {/* Add Attachments Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500">Add Attachments</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="flex h-20 flex-col items-center justify-center gap-2 hover:border-indigo-600 hover:text-indigo-600 bg-transparent"
                >
                  <FileImage className="h-6 w-6" />
                  <span className="text-xs">Document</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex h-20 flex-col items-center justify-center gap-2 hover:border-indigo-600 hover:text-indigo-600 bg-transparent"
                >
                  <LinkIcon className="h-6 w-6" />
                  <span className="text-xs">Links</span>
                </Button>
              </div>
            </div>

            {/* Add Custom Settings Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500">Add Custom Settings</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="flex h-20 flex-col items-center justify-center gap-2 hover:border-indigo-600 hover:text-indigo-600 bg-transparent"
                >
                  <Settings className="h-6 w-6" />
                  <span className="text-xs">Content Settings</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex h-20 flex-col items-center justify-center gap-2 hover:border-indigo-600 hover:text-indigo-600 bg-transparent"
                >
                  <Send className="h-6 w-6" />
                  <span className="text-xs">Publish Settings</span>
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Publish</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Save to Draft
              </Button>
              <Button variant="ghost" className="w-full text-gray-500">
                Schedule
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 p-12">
          <div className="mx-auto max-w-4xl">
            {/* Empty State */}
            <div className="flex min-h-[600px] flex-col items-center justify-center">
              <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-indigo-100">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-200">
                  <PenTool className="h-10 w-10 text-indigo-600" />
                </div>
              </div>
              <h2 className="mb-8 text-3xl font-semibold text-gray-900">Start Creating Your Blog</h2>
              <div className="relative w-full max-w-2xl">
                <Input
                  placeholder="What do you want to explore today?"
                  className="h-14 w-full rounded-full border-gray-300 pl-6 pr-24 text-base shadow-sm"
                />
                <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-2">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-gray-100">
                    <Mic className="h-5 w-5 text-gray-600" />
                  </Button>
                  <Button size="icon" className="h-10 w-10 rounded-full bg-indigo-600 hover:bg-indigo-700">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
