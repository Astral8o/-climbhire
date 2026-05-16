import { ReactNode } from "react";

type Color = "teal" | "dim" | "invert" | "lime" | "ink";

interface EyebrowProps {
  children: ReactNode;
  color?: Color;
  className?: string;
}

const colors: Record<Color, string> = {
  teal: "text-teal",
  dim: "text-ink/40",
  invert: "text-white/60",
  lime: "text-lime",
  ink: "text-ink",
};

export default function Eyebrow({ children, color = "teal", className = "" }: EyebrowProps) {
  return (
    <span
      className={[
        "font-body font-bold text-[10px] uppercase tracking-[0.2em]",
        colors[color],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
