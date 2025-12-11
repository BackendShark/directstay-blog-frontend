import { Globe } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 sm:py-10 lg:py-12 mt-auto">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
            <Image
              src="/assets/logo.svg"
              alt="DirectStay Logo"
              width={120}
              height={30}
              className="mb-3"
            />
            <p className="text-sm text-gray-600 leading-relaxed">{`America's Host-Powered Direct Booking Platform`}</p>
          </div>

          {/* Company */}
          <div className="xl:col-span-1">
            <h3 className="font-semibold text-sm text-gray-900 mb-3 sm:mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Newsroom
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="xl:col-span-1">
            <h3 className="font-semibold text-sm text-gray-900 mb-3 sm:mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Safety & Trust
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Community - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block xl:col-span-1">
            <h3 className="font-semibold text-sm text-gray-900 mb-3 sm:mb-4">
              Community
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  DirectStay.org
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Host Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Discussion & Wishlist
                </a>
              </li>
              <li className="hidden xl:block">
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Referrals & Affiliate
                </a>
              </li>
              <li className="hidden xl:block">
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Terms & Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Policies - Hidden on mobile, shown on larger screens */}
          <div className="hidden lg:block xl:col-span-1">
            <h3 className="font-semibold text-sm text-gray-900 mb-3 sm:mb-4">
              Policies
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Scarcity Deposit Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links - Hidden on mobile, shown on xl screens */}
          <div className="hidden xl:block xl:col-span-1">
            <h3 className="font-semibold text-sm text-gray-900 mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Host Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Regional Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Safety Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <p className="text-sm text-gray-600">
            © 2025 DirectStay, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              <span>English</span>
            </button>
            <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
