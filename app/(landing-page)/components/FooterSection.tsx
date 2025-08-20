import React from "react";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <nav
      className={cn(
        "flex flex-col items-center py-10 border-t mt-10 animate-move-down"
      )}
    >
      <img src="../../favicon.ico" alt="M" className="h-10 mb-4" />
      <p className="text-sm text-gray-400">
        &#169;{new Date().getFullYear()} Miwa Laksmana. All rights reserved.
      </p>
    </nav>
  );
}
