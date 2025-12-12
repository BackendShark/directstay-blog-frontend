"use client";

import { Fira_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { RootNav } from "@/components/root-nav";
import { Toaster } from "@/components/ui/toaster";
import { LoginModal } from "@/components/login-modal";
import { SignupModal } from "@/components/signup-modal";
import { VerificationModal } from "@/components/verification-modal";
import { useState } from "react";
import { usePathname } from "next/navigation";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fira-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  
  const isDashboardRoute = pathname?.startsWith('/dashboard');

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
  };

  const handleLoginToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleSignupContinue = () => {
    setShowSignupModal(false);
    setShowVerificationModal(true);
  };

  const handleVerificationSubmit = () => {
    setShowVerificationModal(false);
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body className={`${firaSans.variable} font-sans antialiased min-h-screen bg-white text-gray-900 overflow-x-hidden`}>
        <div className="flex flex-col min-h-screen">
          {!isDashboardRoute && <RootNav onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />}
          <main className="flex-1">
            {children}
          </main>
          {!isDashboardRoute && <Footer />}
        </div>
        <Toaster />
        <Analytics />
        
        {/* Global Modals */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSwitchToSignup={handleLoginToSignup}
        />
        
        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onContinue={handleSignupContinue}
        />
        
        <VerificationModal
          isOpen={showVerificationModal}
          onClose={() => setShowVerificationModal(false)}
          onSubmit={handleVerificationSubmit}
        />
      </body>
    </html>
  );
}
