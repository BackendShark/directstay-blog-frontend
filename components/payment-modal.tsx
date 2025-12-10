"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export function PaymentModal({ isOpen, onClose, onContinue }: PaymentModalProps) {
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

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          One-Time Onboarding Fee
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Pay ₦49.95 to activate your merchant profile and access your
          dashboard.
        </p>

        <div className="flex justify-center mb-8">
          <svg className="w-48 h-48" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="80" r="50" fill="#FCD34D" opacity="0.2" />
            <rect
              x="70"
              y="60"
              width="60"
              height="80"
              rx="4"
              fill="#3B82F6"
            />
            <rect
              x="75"
              y="65"
              width="50"
              height="30"
              rx="2"
              fill="#93C5FD"
            />
            <circle cx="90" cy="110" r="3" fill="white" />
            <circle cx="100" cy="110" r="3" fill="white" />
            <circle cx="110" cy="110" r="3" fill="white" />

            <rect
              x="40"
              y="110"
              width="50"
              height="32"
              rx="4"
              fill="#EF4444"
            />
            <rect x="43" y="113" width="44" height="8" fill="#FCA5A5" />
            <text
              x="45"
              y="132"
              fontSize="8"
              fill="white"
              fontFamily="monospace"
            >
              ****
            </text>

            <circle cx="130" cy="120" r="12" fill="#FBBF24" />
            <path
              d="M130 132 L120 160 L130 155 L140 160 Z"
              fill="#FBBF24"
            />
            <circle cx="130" cy="116" r="4" fill="#92400E" />
            <circle cx="127" cy="115" r="1" fill="white" />
            <circle cx="133" cy="115" r="1" fill="white" />
          </svg>
        </div>

        <Button
          onClick={onContinue}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg mb-4"
        >
          Pay & Continue
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Secure processing powered by PowerPay.
        </p>
      </div>
    </div>
  );
}