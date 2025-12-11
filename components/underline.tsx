import React from "react";

const Underline = ({ className }: { className?: string }) => {
  return (
    <div className="relative ">
      <div className="h-0.5 w-full bg-gray-200"></div>
      <div className={`absolute inset-0 h-0.5 bg-black ${className}`}></div>
    </div>
  );
};

export default Underline;
