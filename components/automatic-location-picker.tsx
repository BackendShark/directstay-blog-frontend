"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface LocationData {
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
  address?: string;
}

interface AutomaticLocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationDetected: (location: LocationData) => void;
}

export function AutomaticLocationPicker({
  isOpen,
  onClose,
  onLocationDetected,
}: AutomaticLocationPickerProps) {
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedLocation, setDetectedLocation] = useState<LocationData | null>(
    null
  );

  const reverseGeocode = async (
    lat: number,
    lng: number
  ): Promise<LocationData> => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=YOUR_API_KEY`
      );

      if (!response.ok) {
        // Fallback to a free service
        const fallbackResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
        );

        if (fallbackResponse.ok) {
          const data = await fallbackResponse.json();
          return {
            latitude: lat,
            longitude: lng,
            city:
              data.address?.city || data.address?.town || data.address?.village,
            state: data.address?.state,
            country: data.address?.country,
            address: data.display_name,
          };
        }
      }

      // If both fail, return basic coordinates
      return {
        latitude: lat,
        longitude: lng,
        city: "Unknown City",
        state: "Unknown State",
        country: "Unknown Country",
      };
    } catch (error) {
      console.error("Geocoding error:", error);
      return {
        latitude: lat,
        longitude: lng,
        city: "Unknown City",
        state: "Unknown State",
        country: "Unknown Country",
      };
    }
  };

  const detectLocation = async () => {
    setIsDetecting(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const locationData = await reverseGeocode(latitude, longitude);
          
          // Log the detected location to console
          console.log('User location detected:', {
            coordinates: { latitude, longitude },
            location: locationData,
            timestamp: new Date().toISOString()
          });
          
          setDetectedLocation(locationData);
          setIsDetecting(false);
        } catch (error) {
          setError("Failed to get location details.");
          setIsDetecting(false);
        }
      },
      (error) => {
        let errorMessage = "Failed to get your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        setError(errorMessage);
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  const handleUseLocation = () => {
    if (detectedLocation) {
      onLocationDetected(detectedLocation);
      onClose();
    }
  };

  const handleManualEntry = () => {
    // For now, just close and use default location
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          {!detectedLocation && !error && !isDetecting && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Enable Location Access
              </h2>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                Allow DirectStay to use your location to show nearby stays,
                events, and curated blog recommendations based on where you are.
              </p>

              <Image
                src={"/assets/location.svg"}
                alt="Location Illustration"
                width={150}
                height={150}
                className="w-full h-full mb-6"
              />

              <div className="space-y-3">
                <Button
                  onClick={detectLocation}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Enable Location
                </Button>
                <Button
                  onClick={handleManualEntry}
                  variant="outline"
                  className="w-full h-12 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                  Not Now
                </Button>
              </div>
            </>
          )}

          {isDetecting && (
            <>
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Detecting Location...
              </h2>
              <p className="text-sm text-gray-600">
                Please allow location access when prompted.
              </p>
            </>
          )}

          {detectedLocation && (
            <>
              <MapPin className="w-8 h-8 mx-auto mb-4 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Location Detected
              </h2>
              <div className="text-sm text-gray-600 mb-6">
                <p className="font-medium">{detectedLocation.city}, {detectedLocation.state}</p>
                <p className="text-xs mt-1">{detectedLocation.country}</p>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleUseLocation}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"
                >
                  Use This Location
                </Button>
                <Button
                  onClick={() => {
                    setDetectedLocation(null);
                    setError(null);
                  }}
                  variant="outline"
                  className="w-full h-12 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                  Try Again
                </Button>
              </div>
            </>
          )}

          {error && (
            <>
              <div className="w-8 h-8 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <X className="w-4 h-4 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Location Error
              </h2>
              <p className="text-sm text-red-600 mb-6">{error}</p>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setError(null);
                    detectLocation();
                  }}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                >
                  Try Again
                </Button>
                <Button
                  onClick={handleManualEntry}
                  variant="outline"
                  className="w-full h-12 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                  Skip for Now
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
