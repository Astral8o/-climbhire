import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Platform",
    items: [
      { label: "Find Jobs", href: "/jobs" },
      { label: "Companies", href: "/companies" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Employers",
    items: [
      { label: "For Employers", href: "/employers" },
      { label: "Post a Job (Free)", href: "/employers/onboarding" },
      { label: "Moderation Policy", href: "/employers" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/" },
      { label: "Contact", href: "/" },
      { label: "Blog", href: "/" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help Center", href: "/faq" },
      { label: "hello@climbhire.cc", href: "mailto:hello@climbhire.cc" },
      { label: "Terms", href: "/" },
      { label: "Privacy", href: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white px-7 pt-[72px] pb-7 border-t border-ink">
      <div className="max-w-[1360px] mx-auto">
        <div
          className="grid gap-14 pb-14 border-b border-white/10"
          style={{ gridTemplateColumns: "1.3fr 1fr 1fr 1fr 1fr" }}
        >
          {/* Brand col */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-[34px] h-[34px] bg-lime border border-white rounded-[10px] flex items-center justify-center text-ink">
                <ArrowUpRight size={19} strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-base uppercase tracking-[-0.035em]">
                ClimbHire Caribbean
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-[260px] mb-6">
              The Caribbean&apos;s free job board. Reimagining recruitment for the region.
            </p>
            <div className="flex gap-2.5">
              {["tw", "ig", "in", "fb"].map((k) => (
                <a
                  key={k}
                  href="#"
                  aria-label={k}
                  className="w-[38px] h-[38px] border border-white/20 rounded-xl flex items-center justify-center text-white/80 hover:bg-lime hover:text-ink hover:border-lime transition-all duration-200 font-mono text-[9px] uppercase tracking-widest"
                >
                  {k}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(({ title, items }) => (
            <div key={title}>
              <h4 className="font-display text-[10px] uppercase tracking-[0.22em] text-lime mb-5 font-bold">
                {title}
              </h4>
              <ul className="flex flex-col gap-3.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[13px] text-white/70 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-center pt-7 font-body text-[11px] text-white/40">
          <span>© 2026 ClimbHire Caribbean. Port of Spain · Bridgetown · Kingston.</span>
          <span className="font-mono uppercase tracking-[0.22em] text-[10px]">
            <span className="text-lime">●</span>&nbsp; All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
