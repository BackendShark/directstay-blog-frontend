import { Globe } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-6 gap-8 mb-8">
          <div>
            <Image
              src="/assets/logo.svg"
              alt="DirectStay Logo"
              width={120}
              height={120}
              className="col-span-1"
            />
            <span className="text-sm text-gray-600">{`America’s Host-Powered Direct Booking Platform`}</span>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Newsroom
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Safety & Trust
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">
              Community
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">
                  DirectStay.org
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Host Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Discussion & Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Referrals & Affiliate
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Terms & Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Travel Registration & Information Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Complaint Resolution & Guest Registration Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Community Standards & Guest Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Background Check Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  DirectStay & Affiliate
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">
              Policies
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Scarcity Deposit Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Guides & Agreements */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">
              Guides & Agreements
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">
                  Urbanhost Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Regional Onboarding
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Tours & Safety
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Stay Packages
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Vacation Restriction & Information Agreement
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Hotel Agreement
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Host Agreement
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            2025 DirectStay, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <span>English</span>
            </button>
            <button className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1.5">
              <span>Sitemap</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
