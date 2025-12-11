import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DirectStay - America's Host-Powered Direct Booking Platform",
  description: "Connect with hosts and merchants across America. Book direct stays and discover local experiences.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  shrinkToFit: 'no',
};