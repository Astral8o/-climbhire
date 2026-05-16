"use client";

import { ArrowUpRight } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "teal" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  showArrow?: boolean;
  block?: boolean;
  href?: string;
  children?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: "bg-lime text-ink border-ink hover:scale-95",
  secondary: "bg-ink text-white border-ink hover:scale-95",
  teal: "bg-teal text-white border-ink hover:scale-95",
  outline: "bg-transparent text-ink border-ink hover:scale-95",
  ghost: "bg-transparent text-ink border-transparent hover:scale-95",
  white: "bg-white text-ink border-ink hover:scale-95",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-[10px]",
  md: "px-5 py-3 text-[11px]",
  lg: "px-7 py-[18px] text-[13px]",
};

const arrowSizes: Record<Size, number> = { sm: 12, md: 13, lg: 15 };

const BASE =
  "inline-flex items-center justify-center gap-2 font-body font-bold uppercase tracking-[0.1em] leading-none border rounded-squircle-sm transition-transform duration-200 cursor-pointer";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  showArrow = true,
  block = false,
  href,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const classes = [
    BASE,
    variants[variant],
    sizes[size],
    block ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {children}
      {showArrow && <ArrowUpRight size={arrowSizes[size]} strokeWidth={2} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={classes} {...props}>
      {inner}
    </button>
  );
}
