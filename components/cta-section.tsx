import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 lg:mb-12 bg-[#4569FD] p-6 sm:p-8 lg:p-12 xl:p-16 text-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          Become a Host with DirectStay
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          Elevate your property's presence. Connect with our community of guests
          and merchants eager to explore.
        </p>
        <Button className="bg-white text-[#4569FD] hover:bg-gray-100 transition-all duration-300 hover:scale-105 h-10 sm:h-12 px-6 sm:px-8 rounded-lg font-semibold text-sm sm:text-base shadow-lg">
          Request a Visit
        </Button>
      </div>
    </div>
  );
}
