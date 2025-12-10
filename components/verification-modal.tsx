"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Upload } from "lucide-react";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function VerificationModal({ isOpen, onClose, onSubmit }: VerificationModalProps) {
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
          Identity Verification
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Verify your identity to complete your merchant registration.
        </p>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
          <div className="flex-1 h-1 bg-yellow-400 rounded-full"></div>
          <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-500 mb-6">2/3</p>

        <div className="space-y-4 mb-6">
          <div>
            <Label
              htmlFor="governmentId"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Government ID
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                Click or drag file to this area to upload
              </p>
            </div>
          </div>

          <div>
            <Label
              htmlFor="businessDoc"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Business registration document
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                Click or drag file to this area to upload
              </p>
            </div>
          </div>

          <div>
            <Label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Full legal name
            </Label>
            <Input
              id="fullName"
              placeholder="Enter Name"
              className="h-11 border-gray-300"
            />
          </div>

          <div>
            <Label
              htmlFor="dob"
              className="text-sm font-medium text-gray-700 mb-1.5 block"
            >
              Date of birth
            </Label>
            <Input
              id="dob"
              type="date"
              placeholder="09/08/2025"
              className="h-11 border-gray-300"
            />
          </div>
        </div>

        <Button
          onClick={onSubmit}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
        >
          Submit Verification
        </Button>
      </div>
    </div>
  );
}