"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

type ContentSettings = {
  sectionSpacing: number
  marginPadding: number
}

type ContentSettingsModalProps = {
  contentSettings: ContentSettings
  onClose: () => void
  onSave: (settings: ContentSettings) => void
}

export function ContentSettingsModal({ contentSettings, onClose, onSave }: ContentSettingsModalProps) {
  const [sectionSpacing, setSectionSpacing] = useState(contentSettings.sectionSpacing)
  const [marginPadding, setMarginPadding] = useState(contentSettings.marginPadding)

  const handleContinue = () => {
    onSave({ sectionSpacing, marginPadding })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">Content Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Section Spacing */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Section Spacing</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={sectionSpacing}
                onChange={(e) => setSectionSpacing(Number(e.target.value))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                min="0"
                max="200"
              />
              <span className="text-sm text-gray-500">px</span>
              <input
                type="range"
                value={sectionSpacing}
                onChange={(e) => setSectionSpacing(Number(e.target.value))}
                min="0"
                max="200"
                className="flex-1 accent-[#5B6FFF]"
              />
            </div>
          </div>

          {/* Margin Padding */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Margin Padding</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={marginPadding}
                onChange={(e) => setMarginPadding(Number(e.target.value))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                min="0"
                max="200"
              />
              <span className="text-sm text-gray-500">px</span>
              <input
                type="range"
                value={marginPadding}
                onChange={(e) => setMarginPadding(Number(e.target.value))}
                min="0"
                max="200"
                className="flex-1 accent-[#5B6FFF]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleContinue} className="bg-[#5B6FFF] hover:bg-[#4A5EE8]">
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
