"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (date: string, time: string) => void;
}

export function ScheduleModal({
  isOpen,
  onClose,
  onSchedule,
}: ScheduleModalProps) {
  const [scheduleDate, setScheduleDate] = useState("2025-09-26");
  const [scheduleTime, setScheduleTime] = useState("12:00");

  if (!isOpen) return null;

  const handleSchedule = () => {
    onSchedule(scheduleDate, scheduleTime);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-6">Schedule</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Date</label>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B6FFF]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Time</label>
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B6FFF]"
            />
          </div>
        </div>

        <Button
          onClick={handleSchedule}
          className="w-full mt-6 bg-[#5B6FFF] hover:bg-[#4A5EE8] text-white"
        >
          Schedule
        </Button>
      </div>
    </div>
  );
}
