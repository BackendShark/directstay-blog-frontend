"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
}

export function SuccessModal({ isOpen, onClose, onGoToDashboard }: SuccessModalProps) {
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

        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="28" fill="#FBBF24" opacity="0.3" />
              <path
                d="M32 16 L28 28 L16 32 L28 36 L32 48 L36 36 L48 32 L36 28 Z"
                fill="#F59E0B"
              />
              <circle cx="20" cy="20" r="3" fill="#FCD34D" />
              <circle cx="44" cy="20" r="3" fill="#FCD34D" />
              <circle cx="20" cy="44" r="3" fill="#FCD34D" />
              <circle cx="44" cy="44" r="3" fill="#FCD34D" />
              <rect
                x="24"
                y="12"
                width="2"
                height="4"
                fill="#EF4444"
                transform="rotate(15 25 14)"
              />
              <rect
                x="38"
                y="12"
                width="2"
                height="4"
                fill="#3B82F6"
                transform="rotate(-15 39 14)"
              />
              <circle cx="16" cy="28" r="1.5" fill="#10B981" />
              <circle cx="48" cy="28" r="1.5" fill="#8B5CF6" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Your Dashboard Is Ready
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Your merchant account has been created. Explore your tools and
          link your affiliate account.
        </p>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-12 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 bg-transparent"
          >
            Connect TapFiliate
          </Button>
          <Button
            onClick={onGoToDashboard}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}