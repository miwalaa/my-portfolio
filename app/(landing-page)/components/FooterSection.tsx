import React from "react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <nav
      className={cn(
        "flex flex-col items-center py-10 border-t mt-10 animate-move-down",
        className
      )}
    >
      <img src="../../favicon.ico" alt="M" className="h-10 mb-4" />
      <p className="text-sm text-gray-400">
        &#169;{new Date().getFullYear()} Miwa Laksmana. All rights reserved.
      </p>
    </nav>
  );
}
