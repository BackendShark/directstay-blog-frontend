"use client"

import { X, Phone, Mail, FileText, LinkIcon, MapPin, CheckCircle } from "lucide-react"

interface MerchantInfoPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function MerchantInfoPanel({ isOpen, onClose }: MerchantInfoPanelProps) {
  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden h-full">
      {/* Header with Close Button */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Business Details</h3>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close panel"
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Business Header */}
        <div className="p-4 border-b border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
            alt="Dynasty Luxury Cafe"
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
          <div className="flex items-center justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg -mt-10 border-4 border-white shadow-lg">
              DLC
            </div>
          </div>
          <h2 className="font-semibold text-gray-900 text-center text-lg">Dynasty Luxury Cafe</h2>
          <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mt-1">
            <MapPin size={14} className="text-gray-400" />
            <span>32, John Crescent, Alhambra, California</span>
          </div>
          <div className="flex items-center justify-center gap-1 mt-2">
            <CheckCircle size={16} className="text-green-600" />
            <span className="text-sm text-green-600 font-medium">Verified</span>
          </div>
        </div>

        {/* Contact Section */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3 text-sm">Contact</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Phone size={16} className="text-gray-600" />
              </div>
              <span className="text-gray-700">+1 (929) 123 234 X66</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-gray-600" />
              </div>
              <span className="text-gray-700 truncate">info@dynastyluxurycafe.com</span>
            </div>
          </div>
        </div>

        {/* Shared Files Section */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3 text-sm">Shared Files</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Reference.docx</p>
                <p className="text-xs text-gray-500">2 MB</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Dynasty Offer.pdf</p>
                <p className="text-xs text-gray-500">2 MB 8 KB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shared Links Section */}
        <div className="p-4">
          <h4 className="font-medium text-gray-900 mb-3 text-sm">Shared Links</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                <LinkIcon size={18} className="text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Dynasty</p>
                <p className="text-xs text-gray-500 truncate">https://dynastyluxurycaf...</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                <LinkIcon size={18} className="text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Booking</p>
                <p className="text-xs text-gray-500 truncate">https://booking.com/dy...</p>
              </div>
            </div>
          </div>
        </div>

        {/* View Merchant Details Button */}
        <div className="p-4">
          <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
            View Merchant Details
          </button>
        </div>
      </div>
    </div>
  )
}
