"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ListFilter,
  Check,
} from "lucide-react";

// US Major Cities Data
const US_LOCATIONS = [
  { city: "Birmingham", state: "Alabama" },
  { city: "Mobile", state: "Alabama" },
  { city: "Montgomery", state: "Alabama" },
  { city: "Anchorage", state: "Alaska" },
  { city: "Phoenix", state: "Arizona" },
  { city: "Tucson", state: "Arizona" },
  { city: "Little Rock", state: "Arkansas" },
  { city: "Los Angeles", state: "California" },
  { city: "San Francisco", state: "California" },
  { city: "San Diego", state: "California" },
  { city: "Sacramento", state: "California" },
  { city: "Denver", state: "Colorado" },
  { city: "Hartford", state: "Connecticut" },
  { city: "Wilmington", state: "Delaware" },
  { city: "Jacksonville", state: "Florida" },
  { city: "Miami", state: "Florida" },
  { city: "Orlando", state: "Florida" },
  { city: "Tampa", state: "Florida" },
  { city: "Atlanta", state: "Georgia" },
  { city: "Honolulu", state: "Hawaii" },
  { city: "Boise", state: "Idaho" },
  { city: "Chicago", state: "Illinois" },
  { city: "Indianapolis", state: "Indiana" },
  { city: "Des Moines", state: "Iowa" },
  { city: "Wichita", state: "Kansas" },
  { city: "Louisville", state: "Kentucky" },
  { city: "New Orleans", state: "Louisiana" },
  { city: "Portland", state: "Maine" },
  { city: "Baltimore", state: "Maryland" },
  { city: "Boston", state: "Massachusetts" },
  { city: "Detroit", state: "Michigan" },
  { city: "Minneapolis", state: "Minnesota" },
  { city: "Jackson", state: "Mississippi" },
  { city: "Kansas City", state: "Missouri" },
  { city: "St. Louis", state: "Missouri" },
  { city: "Billings", state: "Montana" },
  { city: "Omaha", state: "Nebraska" },
  { city: "Las Vegas", state: "Nevada" },
  { city: "Reno", state: "Nevada" },
  { city: "Manchester", state: "New Hampshire" },
  { city: "Newark", state: "New Jersey" },
  { city: "Albuquerque", state: "New Mexico" },
  { city: "New York City", state: "New York" },
  { city: "Buffalo", state: "New York" },
  { city: "Charlotte", state: "North Carolina" },
  { city: "Raleigh", state: "North Carolina" },
  { city: "Fargo", state: "North Dakota" },
  { city: "Columbus", state: "Ohio" },
  { city: "Cleveland", state: "Ohio" },
  { city: "Oklahoma City", state: "Oklahoma" },
  { city: "Tulsa", state: "Oklahoma" },
  { city: "Portland", state: "Oregon" },
  { city: "Philadelphia", state: "Pennsylvania" },
  { city: "Pittsburgh", state: "Pennsylvania" },
  { city: "Providence", state: "Rhode Island" },
  { city: "Charleston", state: "South Carolina" },
  { city: "Columbia", state: "South Carolina" },
  { city: "Sioux Falls", state: "South Dakota" },
  { city: "Nashville", state: "Tennessee" },
  { city: "Memphis", state: "Tennessee" },
  { city: "Houston", state: "Texas" },
  { city: "Dallas", state: "Texas" },
  { city: "Austin", state: "Texas" },
  { city: "San Antonio", state: "Texas" },
  { city: "Salt Lake City", state: "Utah" },
  { city: "Burlington", state: "Vermont" },
  { city: "Virginia Beach", state: "Virginia" },
  { city: "Richmond", state: "Virginia" },
  { city: "Seattle", state: "Washington" },
  { city: "Spokane", state: "Washington" },
  { city: "Charleston", state: "West Virginia" },
  { city: "Milwaukee", state: "Wisconsin" },
  { city: "Cheyenne", state: "Wyoming" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "most-popular", label: "Most Popular" },
  { value: "most-viewed", label: "Most Viewed" },
  { value: "alphabetical", label: "Alphabetical" },
  { value: "rating", label: "Highest Rating" },
];

const POPULAR_SEARCHES = ["Home", "Garden", "Restaurant"];

const CATEGORIES = [
  "All",
  "Travel & Destinations",
  "Stays & Hosting",
  "Merchants & Business",
  "Food & Lifestyle",
  "Travel Essentials",
  "Platform Updates",
  "Property Management",
  "Guest Experience",
  "Marketing Tips",
  "Revenue Optimization",
  "Local Attractions",
  "Safety & Security",
  "Cleaning & Maintenance",
  "Interior Design",
  "Technology & Apps",
  "Legal & Regulations",
  "Community Events",
  "Seasonal Guides",
  "Photography Tips",
];

export interface SearchFiltersProps {
  onSearchChange?: (query: string) => void;
  onLocationChange?: (location: string) => void;
  onSortChange?: (sort: string) => void;
  onCategoryChange?: (category: string) => void;
  onPopularSearchClick?: (search: string) => void;
  initialLocation?: string;
  initialSort?: string;
  initialCategory?: string;
  className?: string;
}

export function SearchFilters({
  onSearchChange,
  onLocationChange,
  onSortChange,
  onCategoryChange,
  onPopularSearchClick,
  initialLocation = "Birmingham, Alabama",
  initialSort = "newest",
  initialCategory = "All",
  className = "",
}: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [selectedSort, setSelectedSort] = useState(initialSort);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const categoriesRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange?.(value);
  };

  const handleLocationSelect = (city: string, state: string) => {
    const locationString = `${city}, ${state}`;
    setSelectedLocation(locationString);
    setShowLocationDropdown(false);
    setLocationSearch("");
    onLocationChange?.(locationString);
  };

  const handleSortSelect = (value: string) => {
    setSelectedSort(value);
    setShowSortDropdown(false);
    onSortChange?.(value);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  const handlePopularSearch = (search: string) => {
    setSearchQuery(search);
    onSearchChange?.(search);
    onPopularSearchClick?.(search);
  };

  const checkScrollButtons = () => {
    if (categoriesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = 200;
      const scrollDirection = direction === 'left' ? -scrollAmount : scrollAmount;
      
      categoriesRef.current.scrollBy({
        left: scrollDirection,
        behavior: 'smooth'
      });
      
      // Update scroll button states after animation
      setTimeout(checkScrollButtons, 300);
    }
  };

  const filteredLocations = US_LOCATIONS.filter(
    (location) =>
      location.city.toLowerCase().includes(locationSearch.toLowerCase()) ||
      location.state.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const selectedSortLabel = SORT_OPTIONS.find(option => option.value === selectedSort)?.label || "Newest";

  // Check scroll buttons on mount and resize
  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollButtons();
    }, 100);

    const handleResize = () => {
      checkScrollButtons();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`mb-6 ${className}`}>
      {/* Search Bar and Controls */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for post, merchant..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full h-12 pl-12 pr-4 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Location Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            className="flex items-center gap-2 h-12 px-4 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span className="max-w-40 truncate">{selectedLocation}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showLocationDropdown && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredLocations.slice(0, 20).map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(location.city, location.state)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <span>{location.city}, {location.state}</span>
                    {selectedLocation === `${location.city}, ${location.state}` && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                ))}
                {filteredLocations.length === 0 && (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No locations found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 h-12 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>Sort:</span>
            <span className="flex items-center gap-1">
              <ListFilter className="w-4 h-4" />
              {selectedSortLabel}
            </span>
          </button>

          {showSortDropdown && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <span>{option.label}</span>
                  {selectedSort === option.value && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popular Searches */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-3">Popular Searches:</p>
        <div className="flex items-center gap-3">
          {POPULAR_SEARCHES.map((search) => (
            <button
              key={search}
              onClick={() => handlePopularSearch(search)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2">
        {/* Left scroll button */}
        <button 
          onClick={() => scrollCategories('left')}
          className={`p-2 rounded-lg transition-colors shrink-0 ${
            canScrollLeft 
              ? "hover:bg-gray-100 text-gray-600" 
              : "text-gray-300 cursor-not-allowed"
          }`}
          disabled={!canScrollLeft}
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {/* Categories container */}
        <div 
          ref={categoriesRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={checkScrollButtons}
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Right scroll button */}
        <button 
          onClick={() => scrollCategories('right')}
          className={`p-2 rounded-lg transition-colors shrink-0 ${
            canScrollRight 
              ? "hover:bg-gray-100 text-gray-600" 
              : "text-gray-300 cursor-not-allowed"
          }`}
          disabled={!canScrollRight}
          aria-label="Scroll categories right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showLocationDropdown || showSortDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowLocationDropdown(false);
            setShowSortDropdown(false);
          }}
        />
      )}
    </div>
  );
}