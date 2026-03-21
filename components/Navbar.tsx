"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Find Jobs",          href: "/jobs" },
  { label: "For Professionals",  href: "/for-professionals" },
  { label: "For Employers",      href: "/for-employers" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-forest-800 shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          {/* Icon mark */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime">
            <svg className="h-5 w-5 text-forest-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          <span className="font-heading text-xl font-bold text-white tracking-tight">
            Climb<span className="text-lime">Hire</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-lime"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/for-employers" className="btn-outline-light py-2 px-4 text-xs">
            Post a Job
          </Link>
          <Link href="/jobs" className="btn-primary py-2 px-4 text-xs">
            Find Jobs
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-white/70 hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-white/10 bg-forest-800 px-4 pb-5 pt-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-white/10 text-lime"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/for-employers" className="btn-outline-light w-full justify-center" onClick={() => setOpen(false)}>
                Post a Job
              </Link>
              <Link href="/jobs" className="btn-primary w-full justify-center" onClick={() => setOpen(false)}>
                Find Jobs
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
