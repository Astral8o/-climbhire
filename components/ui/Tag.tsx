import { ReactNode } from "react";

type Tone = "lime" | "white" | "cream" | "ink" | "teal" | "tealfaint" | "ghost";

interface TagProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

const tones: Record<Tone, string> = {
  lime: "bg-lime text-ink border-ink",
  white: "bg-white text-ink border-ink",
  cream: "bg-cream text-ink border-ink",
  ink: "bg-ink text-lime border-ink",
  teal: "bg-teal text-white border-ink",
  tealfaint: "bg-teal/15 text-[#4F7777] border-transparent",
  ghost: "bg-transparent text-ink border-ink",
};

export default function Tag({ children, tone = "lime", className = "" }: TagProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 font-body font-bold uppercase text-[10px] tracking-[0.1em] leading-none border rounded-squircle-sm px-3 py-1.5 whitespace-nowrap",
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
