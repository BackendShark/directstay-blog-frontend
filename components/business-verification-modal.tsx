"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface BusinessVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function BusinessVerificationModal({ isOpen, onClose, onSubmit }: BusinessVerificationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-6">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 rounded-xl"></div>
            <svg
              viewBox="0 0 32 32"
              fill="white"
              className="absolute inset-0 w-full h-full p-2"
            >
              <path d="M12 3L4 9v12h16V9L12 3z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Business Verification
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Provide your EIN to activate your merchant payout profile.
        </p>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
          <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
          <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-500 mb-6">3/3</p>

        <div className="space-y-4 mb-6">
          <div>
            <Label
              htmlFor="ein"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Employment Identification Number
            </Label>
            <Input
              id="ein"
              placeholder="Enter EIN here"
              className="h-11 border-gray-300"
            />
          </div>

          <div>
            <Label
              htmlFor="businessAddress"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Business Address
            </Label>
            <Input
              id="businessAddress"
              placeholder="Enter Business Address"
              className="h-11 border-gray-300"
            />
          </div>

          <div>
            <Label
              htmlFor="businessType"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Registered business type
            </Label>
            <select
              id="businessType"
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Restaurant</option>
              <option>Retail</option>
              <option>Services</option>
              <option>Hospitality</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <Button
          onClick={onSubmit}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
        >
          Verify EIN
        </Button>
      </div>
    </div>
  );
}