"use client";

import { useState } from "react";
import { ChevronDown, Type, ImageIcon, Grid3x3, Building2, Link2, Settings, Bell, TrendingUp, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBlogEditor } from "./blog-editor-context";
import { Merchant } from "@/app/dashboard/blog-editor/page";

interface BlogEditorSidebarProps {
  onPublish: () => void;
  onSaveToDraft: () => void;
  onSchedule: () => void;
  onShowPropertyListingModal: () => void;
  onShowContentSettingsModal: () => void;
  onShowPublishSettingsModal: () => void;
}

const availableMerchants: Merchant[] = [
  {
    id: "1",
    name: "Dynasty Luxury Cafe",
    description: "Premium coffee and dining experience",
    location: "32, John Crescent, Alhambra, Calif...",
    avatar: "/cozy-corner-cafe.png",
    image: "/cozy-corner-cafe.png",
  },
  {
    id: "2",
    name: "Art Nerds Gallery",
    description: "Contemporary art gallery showcasing local artists",
    location: "32, John Crescent, Alhambra, Calif...",
    avatar: "/abstract-fluid-art.png",
    image: "/abstract-fluid-art.png",
  },
  {
    id: "3",
    name: "Holiday Nomads",
    description: "Travel agency specializing in adventure tours",
    location: "32, John Crescent, Alhambra, Calif...",
    avatar: "/diverse-travelers-world-map.png",
    image: "/diverse-travelers-world-map.png",
  },
  {
    id: "4",
    name: "Paint and Sip Place",
    description: "Creative painting studio with refreshments",
    location: "32, John Crescent, Alhambra, Calif...",
    avatar: "/colorful-paint-splatters.png",
    image: "/colorful-paint-splatters.png",
  },
];

export function BlogEditorSidebar({
  onPublish,
  onSaveToDraft,
  onSchedule,
  onShowPropertyListingModal,
  onShowContentSettingsModal,
  onShowPublishSettingsModal,
}: BlogEditorSidebarProps) {
  const { blogType, setBlogType, selectedMerchant, setSelectedMerchant, addBlock } = useBlogEditor();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showMerchantSearch, setShowMerchantSearch] = useState(false);
  const [merchantSearchQuery, setMerchantSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "border-r border-border bg-muted/30 overflow-y-auto transition-all duration-300 relative",
      isCollapsed ? "w-12" : "w-[280px]"
    )}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 -right-3 z-10 w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>

      {isCollapsed ? (
        <div className="p-2 pt-12 space-y-2 flex flex-col items-center">
          <button
            onClick={() => addBlock("header")}
            className="p-2 hover:bg-muted rounded transition-colors"
            title="Add Header"
          >
            <Type className="w-4 h-4" strokeWidth={3} />
          </button>
          <button
            onClick={() => addBlock("body")}
            className="p-2 hover:bg-muted rounded transition-colors"
            title="Add Body Text"
          >
            <Type className="w-4 h-4" strokeWidth={2} />
          </button>
          <button
            onClick={() => addBlock("single-image")}
            className="p-2 hover:bg-muted rounded transition-colors"
            title="Add Image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => addBlock("image-grid")}
            className="p-2 hover:bg-muted rounded transition-colors"
            title="Add Grid"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-6 pt-12">
        {/* Blog Type Selector */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                {blogType === "sponsored" ? (
                  <TrendingUp className="w-3 h-3 text-primary" />
                ) : (
                  <span className="text-xs">😊</span>
                )}
              </div>
              <span className="text-sm font-medium">
                {blogType === "sponsored" ? "Sponsored Blog" : "Personal Blog"}
              </span>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform",
                isDropdownOpen && "rotate-180"
              )}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
              <button
                onClick={() => {
                  setBlogType("personal");
                  setSelectedMerchant(null);
                  setIsDropdownOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors text-left",
                  blogType === "personal" && "bg-muted"
                )}
              >
                <span className="text-xs">😊</span>
                Personal Blog
              </button>
              <button
                onClick={() => {
                  setBlogType("sponsored");
                  setIsDropdownOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors text-left",
                  blogType === "sponsored" && "bg-muted"
                )}
              >
                <TrendingUp className="w-3 h-3 text-primary" />
                Sponsored Blog
              </button>
            </div>
          )}
        </div>

        {/* Merchant Search for Sponsored Blogs */}
        {blogType === "sponsored" && (
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for merchant..."
                value={merchantSearchQuery}
                onChange={(e) => setMerchantSearchQuery(e.target.value)}
                onFocus={() => setShowMerchantSearch(true)}
                className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {showMerchantSearch && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {availableMerchants
                  .filter((m) =>
                    m.name.toLowerCase().includes(merchantSearchQuery.toLowerCase())
                  )
                  .map((merchant) => (
                    <button
                      key={merchant.id}
                      onClick={() => {
                        setSelectedMerchant(merchant);
                        setShowMerchantSearch(false);
                        setMerchantSearchQuery("");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-3 hover:bg-muted transition-colors text-left border-b border-border last:border-b-0"
                    >
                      <img
                        src={merchant.avatar || "/placeholder.svg"}
                        alt={merchant.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{merchant.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {merchant.location}
                        </div>
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Add Element Section */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3 px-1">
            Add Element
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addBlock("header")}
              className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
            >
              <Type className="w-6 h-6 text-foreground font-bold" strokeWidth={3} />
              <span className="text-xs font-medium">Header Text</span>
            </button>
            <button
              onClick={() => addBlock("body")}
              className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
            >
              <Type className="w-5 h-5 text-foreground" strokeWidth={2} />
              <span className="text-xs font-medium">Body Text</span>
            </button>
            <button
              onClick={() => addBlock("single-image")}
              className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
            >
              <ImageIcon className="w-6 h-6 text-foreground" />
              <span className="text-xs font-medium">Single Image</span>
            </button>
            <button
              onClick={() => addBlock("image-grid")}
              className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
            >
              <Grid3x3 className="w-6 h-6 text-foreground" />
              <span className="text-xs font-medium">Grid Image</span>
            </button>
          </div>
        </div>

        {/* Add Attachments Section */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3 px-1">
            Add Attachments
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onShowPropertyListingModal}
              className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
            >
              <Building2 className="w-6 h-6 text-foreground" />
              <span className="text-xs font-medium">Property Listing</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors">
              <Link2 className="w-6 h-6 text-foreground" />
              <span className="text-xs font-medium">Links</span>
            </button>
          </div>
        </div>

        {/* Add Custom Settings Section */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3 px-1">
            Add Custom Settings
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onShowContentSettingsModal}
              className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
            >
              <Settings className="w-6 h-6 text-foreground" />
              <span className="text-xs font-medium">Content Settings</span>
            </button>
            <button
              onClick={onShowPublishSettingsModal}
              className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
            >
              <Bell className="w-6 h-6 text-foreground" />
              <span className="text-xs font-medium">Publish Settings</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <Button onClick={onPublish} className="w-full bg-[#5B6FFF] hover:bg-[#4A5EE8]">
            Publish
          </Button>
          <Button onClick={onSaveToDraft} variant="outline" className="w-full bg-transparent">
            Save to Draft
          </Button>
          <Button onClick={onSchedule} variant="ghost" className="w-full text-muted-foreground">
            Schedule
          </Button>
        </div>
        </div>
      )}
    </div>
  );
}