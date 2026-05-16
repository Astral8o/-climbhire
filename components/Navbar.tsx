"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Button from "./ui/Button";

const NAV_LINKS = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "For Employers", href: "/employers" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-ink">
      <nav className="max-w-[1360px] mx-auto px-7 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 flex-shrink-0"
          onClick={() => setOpen(false)}
        >
          <div className="w-[34px] h-[34px] bg-lime border border-ink rounded-[10px] flex items-center justify-center text-ink">
            <ArrowUpRight size={19} strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-[16px] uppercase tracking-[-0.035em]">
            ClimbHire Caribbean
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 font-body text-sm font-medium">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={[
                "transition-colors",
                pathname === href
                  ? "text-teal font-bold"
                  : "text-ink hover:text-teal",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            href="/sign-in"
            className="font-body font-bold text-[10px] uppercase tracking-[0.1em] text-ink px-3.5 py-2 hover:scale-95 transition-transform duration-200"
          >
            Sign in
          </Link>
          <Link
            href="/employers/onboarding"
            className="inline-flex items-center gap-1.5 font-body font-bold text-[10px] uppercase tracking-[0.1em] bg-lime text-ink border border-ink rounded-squircle-sm px-3.5 py-2 hover:scale-95 transition-transform duration-200"
          >
            Get Started <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-ink"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-ink bg-cream px-7 pb-5 pt-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={[
                  "rounded-xl px-3 py-2.5 text-sm font-medium font-body transition-colors",
                  pathname === href
                    ? "bg-lime text-ink font-bold"
                    : "text-ink hover:bg-ink/5",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="border border-ink rounded-squircle-sm px-4 py-2.5 text-center text-xs font-bold uppercase tracking-[0.1em] font-body"
              >
                Sign in
              </Link>
              <Link
                href="/employers/onboarding"
                onClick={() => setOpen(false)}
                className="bg-lime border border-ink rounded-squircle-sm px-4 py-2.5 text-center text-xs font-bold uppercase tracking-[0.1em] font-body flex items-center justify-center gap-2"
              >
                Get Started <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
