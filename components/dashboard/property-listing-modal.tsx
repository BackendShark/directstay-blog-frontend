"use client";

import { useState } from "react";
import { X, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PropertyListing } from "@/app/dashboard/blog-editor/page";

interface PropertyListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListings: (listings: PropertyListing[]) => void;
  availableListings: PropertyListing[];
}

export function PropertyListingModal({
  isOpen,
  onClose,
  onAddListings,
  availableListings,
}: PropertyListingModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedListings, setSelectedListings] = useState<Set<string>>(
    new Set()
  );

  if (!isOpen) return null;

  const filteredListings = availableListings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleListing = (id: string) => {
    const newSelected = new Set(selectedListings);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedListings(newSelected);
  };

  const handleContinue = () => {
    const listings = availableListings.filter((listing) =>
      selectedListings.has(listing.id)
    );
    onAddListings(listings);
    setSelectedListings(new Set());
    setSearchQuery("");
    onClose();
  };

  const handleCancel = () => {
    setSelectedListings(new Set());
    setSearchQuery("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-foreground">
            Select Property Listings
          </h2>
          <button
            onClick={handleCancel}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search from your listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B6FFF]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-3">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                onClick={() => toggleListing(listing.id)}
                className={`flex items-center gap-4 p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedListings.has(listing.id)
                    ? "border-[#5B6FFF] bg-[#5B6FFF]/5"
                    : "border-border hover:border-[#5B6FFF]/50"
                }`}
              >
                <div className="flex items-center justify-center w-5 h-5 border-2 border-muted-foreground rounded flex-shrink-0">
                  {selectedListings.has(listing.id) && (
                    <div className="w-3 h-3 bg-[#5B6FFF] rounded-sm flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <img
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-16 h-16 rounded object-cover"
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-sm truncate">
                    {listing.title}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {listing.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{listing.location}</span>
                  <span className="font-medium">{listing.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={selectedListings.size === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
