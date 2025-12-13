"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export interface SponsorshipCardProps {
  brandName?: string;
  description?: string;
  buttonText?: string;
  onRequestSponsorship?: () => Promise<void>;
}

export function SponsorshipCard({
  brandName = "DirectStay",
  description = "Want to feature your business on the DirectStay Blog?",
  buttonText = "Request for Sponsorship",
  onRequestSponsorship,
}: SponsorshipCardProps) {
  const { toast } = useToast();

  const handleRequest = async () => {
    try {
      if (onRequestSponsorship) {
        await onRequestSponsorship();
      } else {
        // Fallback behavior
        toast({ title: "Sponsorship request submitted!" });
      }
    } catch (error) {
      toast({ title: "Failed to submit request", variant: "destructive" });
    }
  };

  return (
    <div className="border rounded-md p-6 text-center">
      <div className="flex flex-col items-center gap-2 mb-4">
        <Image
          src="/assets/badge.svg"
          alt="DirectStay Logo"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <div className="flex items-center gap-1">
          <span className="font-bold text-lg">{brandName}</span>
          <Image
            src="/assets/verified.svg"
            alt="Verified Badge"
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button
        className="w-full bg-primary hover:bg-primary/90"
        onClick={handleRequest}
      >
        {buttonText}
      </Button>
    </div>
  );
}
