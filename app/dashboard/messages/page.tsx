"use client"

import { useState, useRef, useEffect } from "react"

import { MessagesList } from "@/components/messages-list"
import { ChatThread } from "@/components/chat-thread"
import { MessageTemplates } from "@/components/message-templates"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"messages" | "templates">("messages")
  const [sidebarWidth, setSidebarWidth] = useState(320) // Default width: 320px
  const dividerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!dividerRef.current || e.button !== 0) return

      const startX = e.clientX
      const startWidth = sidebarWidth

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - startX
        const newWidth = startWidth + delta

        // Min width: 280px, Max width: 500px
        if (newWidth >= 280 && newWidth <= 500) {
          setSidebarWidth(newWidth)
        }
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    const divider = dividerRef.current
    if (divider) {
      divider.addEventListener("mousedown", handleMouseDown)
      return () => divider.removeEventListener("mousedown", handleMouseDown)
    }
  }, [sidebarWidth])

  return (
    <div className="flex h-screen bg-gray-50">
     
      <div className="flex-1 flex flex-col overflow-hidden">
  
        <main className="flex-1 overflow-hidden flex" ref={containerRef}>
          {/* Left Sidebar - Messages/Templates with Draggable Divider */}
          <div
            style={{ width: `${sidebarWidth}px` }}
            className="bg-white border-r border-gray-200 flex flex-col transition-none"
          >
            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50">
              <button
                onClick={() => setActiveTab("messages")}
                className={`flex-1 py-3 px-4 font-medium text-sm transition-colors relative ${
                  activeTab === "messages" ? "text-gray-900 bg-white" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Messages
                {activeTab === "messages" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />}
              </button>
              <button
                onClick={() => setActiveTab("templates")}
                className={`flex-1 py-3 px-4 font-medium text-sm transition-colors relative ${
                  activeTab === "templates" ? "text-gray-900 bg-white" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Templates
                {activeTab === "templates" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />}
              </button>
            </div>

            {/* Content */}
            {activeTab === "messages" ? (
              <MessagesList onSelectConversation={setSelectedConversation} selectedId={selectedConversation} />
            ) : (
              <MessageTemplates />
            )}
          </div>

          <div ref={dividerRef} className="w-1 bg-gray-200 hover:bg-blue-500 cursor-col-resize transition-colors" />

          {/* Right Panel - Chat Thread */}
          <div className="flex-1 bg-gray-50 flex overflow-hidden">
            {selectedConversation ? (
              <ChatThread conversationId={selectedConversation} />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-4">💬</div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Messages on DirectStay</h3>
                  <p className="text-gray-500">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
