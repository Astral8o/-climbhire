"use client";

import { ReactNode } from "react";

interface HighlightProps {
  children: ReactNode;
  color?: string;
  delay?: number;
}

export default function Highlight({
  children,
  color = "#D4FF5E",
  delay = 0.7,
}: HighlightProps) {
  return (
    <span className="relative inline-block px-1.5">
      <span className="relative z-10">{children}</span>
      <span
        className="absolute left-0 right-0 bottom-[0.12em] h-[0.32em] origin-left opacity-75"
        style={{
          background: color,
          animation: `growWidth 0.6s ${delay}s ease-out both`,
        }}
      />
    </span>
  );
}
