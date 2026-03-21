import Link from "next/link";

const LINKS = {
  "For Job Seekers": [
    { label: "Browse Jobs",        href: "/jobs" },
    { label: "Create Profile",     href: "/profile/new" },
    { label: "For Professionals",  href: "/for-professionals" },
  ],
  "For Employers": [
    { label: "Post a Job",        href: "/for-employers" },
    { label: "Browse Talent",     href: "/for-employers#talent" },
    { label: "Pricing",           href: "/for-employers#pricing" },
  ],
  Company: [
    { label: "About",   href: "#" },
    { label: "Blog",    href: "#" },
    { label: "Contact", href: "mailto:hello@climbhire.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-forest-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime">
                <svg className="h-5 w-5 text-forest-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <span className="font-heading text-xl font-bold">
                Climb<span className="text-lime">Hire</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Trinidad & Tobago's premier talent platform — connecting ambitious Caribbean professionals with the region's best employers.
            </p>
            <p className="mt-4 text-xs text-white/40">Port of Spain, Trinidad and Tobago</p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-lime mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} ClimbHire. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <Link key={item} href="#" className="text-xs text-white/40 hover:text-white/70">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
