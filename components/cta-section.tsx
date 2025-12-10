import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-12 bg-[#4569FD] p-16 text-center">
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

      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-white mb-4">
          Become a Host with DirectStay
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Elevate your property's presence. Connect with our community of guests
          and merchants eager to explore.
        </p>
        <Button className="bg-white text-[#4569FD] hover:bg-gray-100 h-12 px-8 rounded-lg font-semibold text-base">
          Request a Visit
        </Button>
      </div>
    </div>
  );
}
