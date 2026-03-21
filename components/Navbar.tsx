"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Climb<span className="text-brand-600">Hire</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#jobs" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Jobs
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Success Stories
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            How It Works
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="#jobs" className="btn-secondary text-xs px-4 py-2">
            Browse Jobs
          </Link>
          <Link href="mailto:hello@climbhire.com" className="btn-primary text-xs px-4 py-2">
            Post a Job
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="#jobs" className="text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>
              Jobs
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>
              Success Stories
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-gray-600" onClick={() => setMenuOpen(false)}>
              How It Works
            </Link>
            <div className="flex gap-3 pt-2">
              <Link href="#jobs" className="btn-secondary flex-1 text-center text-xs" onClick={() => setMenuOpen(false)}>
                Browse Jobs
              </Link>
              <Link href="mailto:hello@climbhire.com" className="btn-primary flex-1 text-center text-xs">
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
