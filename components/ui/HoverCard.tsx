"use client";

import { ReactNode, useState } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  shadowOn?: boolean;
  liftOnly?: boolean;
}

export default function HoverCard({
  children,
  className = "",
  onClick,
  shadowOn = true,
  liftOnly = false,
}: HoverCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className={[
        "bg-white border border-ink rounded-squircle transition-all duration-200",
        onClick ? "cursor-pointer" : "",
        className,
      ].join(" ")}
      style={{
        transform: hover
          ? liftOnly
            ? "translateY(-4px)"
            : "translateY(-2px)"
          : "translateY(0)",
        boxShadow: hover && shadowOn
          ? "8px 8px 0 0 #00C9B1"
          : shadowOn
          ? "4px 4px 0 0 #1C1C18"
          : "none",
      }}
    >
      {children}
    </div>
  );
}
