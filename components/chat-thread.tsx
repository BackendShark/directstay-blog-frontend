"use client"

import { useState } from "react"
import { Send, Paperclip, Smile, Search, Info, Eye } from "lucide-react"
import { MerchantInfoPanel } from "./merchant-info-panel"

interface Message {
  id: string
  sender: string
  avatar: string
  content: string
  timestamp: string
  isUser: boolean
  isTemplate?: boolean
}

interface ChatThreadProps {
  conversationId: string
}

export function ChatThread({ conversationId }: ChatThreadProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Hello Mike",
      avatar: "👤",
      content:
        "I discovered your profile on Direct Stay blog page and I think you'll be a perfect fit to write me a sponsored blog.",
      timestamp: "2:30pm",
      isUser: false,
    },
    {
      id: "2",
      sender: "Dynasty Luxury Cafe",
      avatar: "🏛️",
      content: "Sponsored Blog Offer\nDynasty Luxury Cafe",
      timestamp: "2:32pm",
      isUser: false,
      isTemplate: true,
    },
    {
      id: "3",
      sender: "You",
      avatar: "👤",
      content: "Hi Dynasty Luxury Cafe!\n\nThank you for your kind words and also for reaching out.",
      timestamp: "2:34pm",
      isUser: true,
    },
    {
      id: "4",
      sender: "You",
      avatar: "👤",
      content: "I'll go through your offer and revert back soon enough.",
      timestamp: "2:35pm",
      isUser: true,
    },
    {
      id: "5",
      sender: "You",
      avatar: "👤",
      content: "Thank you!",
      timestamp: "2:35pm",
      isUser: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [showMerchantInfo, setShowMerchantInfo] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: String(messages.length + 1),
          sender: "You",
          avatar: "👤",
          content: newMessage,
          timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          isUser: true,
        },
      ])
      setNewMessage("")
    }
  }

  return (
    <div className="flex h-full w-full">
      <div
        className={`flex flex-col min-w-0 transition-all duration-300 flex-1`}
      >
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              DLC
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Dynasty Luxury Cafe</h2>
              <span className="text-xs text-green-600 font-medium">Active</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search size={20} className="text-gray-500" />
            </button>
            <button
              onClick={() => setShowMerchantInfo(!showMerchantInfo)}
              className={`p-2 hover:bg-gray-100 rounded-lg transition-colors ${showMerchantInfo ? "bg-blue-50" : ""}`}
            >
              <Info size={20} className={showMerchantInfo ? "text-blue-600" : "text-gray-500"} />
            </button>
          </div>
        </div>

        {/* Date Separator */}
        <div className="px-6 py-4">
          <p className="text-center text-sm text-gray-500">02, 04, 2025</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 ${message.isUser ? "flex-row-reverse" : ""} max-w-xs`}>
                {!message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    DLC
                  </div>
                )}
                <div className={message.isUser ? "text-right" : ""}>
                  {message.isTemplate ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-2 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          DLC
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">Sponsored Blog Offer</p>
                          <p className="text-xs text-gray-600">{message.sender}</p>
                        </div>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
                        alt="offer"
                        className="w-full rounded-lg mb-3 h-32 object-cover"
                      />
                      <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                        <Eye size={16} /> View Offer
                      </button>
                    </div>
                  ) : (
                    <>
                      <p
                        className={`${
                          message.isUser
                            ? "bg-blue-600 text-white rounded-2xl rounded-tr-none"
                            : "bg-gray-200 text-gray-900 rounded-2xl rounded-tl-none"
                        } px-4 py-2 inline-block text-sm leading-relaxed whitespace-normal`}
                      >
                        {message.content}
                      </p>
                    </>
                  )}
                  <p className="text-xs text-gray-500 mt-1 px-2">{message.timestamp}</p>
                </div>
                {message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    YOU
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Paperclip size={20} className="text-gray-500" />
            </button>
            <input
              type="text"
              placeholder="Send a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white"
            />
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Smile size={20} className="text-gray-500" />
            </button>
            <button onClick={handleSendMessage} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Send size={20} className="text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      <div className={`transition-all duration-300 overflow-hidden ${showMerchantInfo ? "w-80" : "w-0"}`}>
        <MerchantInfoPanel isOpen={showMerchantInfo} onClose={() => setShowMerchantInfo(false)} />
      </div>
    </div>
  )
}
