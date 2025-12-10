"use client"

import { useState, useMemo } from "react"
import { Search, ChevronDown, Check } from "lucide-react"

interface Conversation {
  id: string
  name: string
  avatar: string
  status: "active" | "declined" | "in-negotiation" | "completed"
  lastMessage: string
  timestamp: string
  unread: boolean
  location?: string
}

interface MessagesListProps {
  onSelectConversation: (id: string) => void
  selectedId: string | null
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Dynasty Luxury Cafe",
    avatar: "DLC",
    status: "active",
    lastMessage: "I approved the blog already. Thank you for making th...",
    timestamp: "2 hours ago",
    unread: false,
    location: "32, John Crescent, Alh...",
  },
  {
    id: "2",
    name: "Art Nerds Gallery",
    avatar: "ANG",
    status: "declined",
    lastMessage: "I'm sorry but i can't take your offer. Thank you for re...",
    timestamp: "3:12am",
    unread: false,
    location: "32, John Crescent, Alh...",
  },
  {
    id: "3",
    name: "Holiday Nomads",
    avatar: "HN",
    status: "in-negotiation",
    lastMessage: "I just sent you my bid. Please check the attached off...",
    timestamp: "2 hours ago",
    unread: true,
    location: "32, John Crescent, Alh...",
  },
  {
    id: "4",
    name: "Paint and Sip Place",
    avatar: "PSP",
    status: "completed",
    lastMessage: "I published your blog already. Thank you for choosin...",
    timestamp: "12:24am",
    unread: false,
    location: "32, John Crescent, Alh...",
  },
  {
    id: "5",
    name: "Holiday Nomads",
    avatar: "HN",
    status: "in-negotiation",
    lastMessage: "I just sent you my bid. Please check the attached off...",
    timestamp: "2 hours ago",
    unread: true,
    location: "32, John Crescent, Alh...",
  },
]

const statusConfig = {
  active: { color: "bg-green-100", text: "text-green-700", label: "Active" },
  declined: { color: "bg-red-100", text: "text-red-700", label: "Declined" },
  "in-negotiation": { color: "bg-yellow-100", text: "text-yellow-700", label: "In Negotiation" },
  completed: { color: "bg-gray-100", text: "text-gray-700", label: "Completed" },
}

export function MessagesList({ onSelectConversation, selectedId }: MessagesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [showFilter, setShowFilter] = useState(false)

  const filteredConversations = useMemo(() => {
    return mockConversations.filter((conv) => {
      const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = !filterStatus || conv.status === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [searchQuery, filterStatus])

  const showSearchDropdown = searchQuery.length > 0

  return (
    <>
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 relative">
        <div className="relative flex items-center gap-2">
          <Search size={18} className="text-gray-400 absolute left-3 z-10" />
          <input
            type="text"
            placeholder="Search chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronDown size={18} className="text-gray-500" />
            </button>
            {showFilter && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <button
                  onClick={() => {
                    setFilterStatus(null)
                    setShowFilter(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  All
                </button>
                {Object.entries(statusConfig).map(([status, config]) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilterStatus(status)
                      setShowFilter(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {showSearchDropdown && (
          <div className="absolute top-full left-4 right-4 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => {
                const config = statusConfig[conversation.status]
                return (
                  <button
                    key={conversation.id}
                    onClick={() => {
                      onSelectConversation(conversation.id)
                      setSearchQuery("")
                    }}
                    className="w-full p-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {conversation.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900 truncate text-sm">{conversation.name}</h3>
                          <span
                            className={`${config.color} ${config.text} text-xs px-2 py-0.5 rounded-full whitespace-nowrap`}
                          >
                            {config.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">No conversations found</div>
            )}
          </div>
        )}
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => {
          const config = statusConfig[conversation.status]
          const isSelected = selectedId === conversation.id
          const showCheckmark = conversation.status === "declined" || conversation.status === "completed"

          return (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${
                isSelected ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {conversation.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                    <span
                      className={`${config.color} ${config.text} text-xs px-2 py-0.5 rounded-full whitespace-nowrap`}
                    >
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-1">{conversation.lastMessage}</p>
                  <p className="text-xs text-gray-500 mt-1">{conversation.location}</p>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  {showCheckmark ? (
                    <Check size={16} className="text-gray-400" />
                  ) : (
                    conversation.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </>
  )
}
