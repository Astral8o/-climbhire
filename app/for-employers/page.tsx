import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "For Employers | ClimbHire" };

const FEATURES = [
  {
    title: "Talent that's ready",
    body:  "Our candidates have complete profiles with verified experience. Skip the resume screening — go straight to interviews.",
  },
  {
    title: "T&T market expertise",
    body:  "We know the local talent landscape. We help you benchmark salaries, understand availability, and move fast.",
  },
  {
    title: "Quality, not volume",
    body:  "Roles are matched to qualified professionals. Expect fewer, better applicants — not hundreds of irrelevant CVs.",
  },
  {
    title: "Simple, transparent pricing",
    body:  "Pay per listing or subscribe for unlimited posts. No placement fees, no hidden charges.",
  },
];

const PLANS = [
  {
    name:     "Single Post",
    price:    "TTD 800",
    period:   "per listing",
    cta:      "Post a Job",
    ctaStyle: "btn-outline-dark",
    features: [
      "30-day active listing",
      "Unlimited applicants",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name:     "Growth",
    price:    "TTD 2,500",
    period:   "per month",
    cta:      "Get Started",
    ctaStyle: "btn-primary",
    badge:    "Most popular",
    features: [
      "5 active listings",
      "Featured placement",
      "Talent search access",
      "Priority support",
      "Advanced analytics",
    ],
  },
  {
    name:     "Enterprise",
    price:    "Custom",
    period:   "tailored plan",
    cta:      "Talk to Us",
    ctaStyle: "btn-outline-dark",
    features: [
      "Unlimited listings",
      "Dedicated account manager",
      "Employer branding",
      "ATS integration",
      "SLA support",
    ],
  },
];

const STEPS = [
  { step: "01", title: "Create your company profile",   body: "Show candidates who you really are — culture, mission, team. It matters more than you think." },
  { step: "02", title: "Post your role",                body: "Fill in the details, set a salary range, and go live. Takes under 10 minutes." },
  { step: "03", title: "Review matched candidates",     body: "Browse applicants and search our talent pool. Filter by skills, location, and availability." },
  { step: "04", title: "Make your hire",                body: "Message candidates directly through ClimbHire. Extend your offer when you've found your person." },
];

export default function ForEmployersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="bg-white pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="section-label">For Employers</p>
                <h1 className="font-heading mt-4 text-5xl font-bold leading-tight text-forest-800 sm:text-6xl">
                  Hire the people <br />
                  who will build <br />
                  <span className="text-emerald">your future.</span>
                </h1>
                <p className="mt-8 text-lg text-gray-500 leading-relaxed">
                  ClimbHire gives you direct access to Trinidad & Tobago's most ambitious professionals. Post a role, search our talent pool, and hire faster.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link href="#pricing" className="btn-primary text-base px-8 py-3.5">
                    See Pricing
                  </Link>
                  <Link href="mailto:hello@climbhire.com" className="btn-outline-dark text-base px-8 py-3.5">
                    Talk to Us
                  </Link>
                </div>
              </div>

              {/* Stat card cluster */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "12,000+", label: "Active Professionals", bg: "bg-forest-800", text: "text-white", sub: "text-white/50" },
                  { value: "18 days", label: "Avg. Time to Hire",    bg: "bg-lime",       text: "text-forest-800", sub: "text-forest-700" },
                  { value: "94%",     label: "Retention at 12 months", bg: "bg-gray-50 border border-gray-100", text: "text-forest-800", sub: "text-gray-400" },
                  { value: "450+",    label: "Companies Hiring",      bg: "bg-emerald",   text: "text-white", sub: "text-white/60" },
                ].map(({ value, label, bg, text, sub }) => (
                  <div key={label} className={`rounded-2xl p-6 ${bg}`}>
                    <p className={`font-heading text-4xl font-bold ${text}`}>{value}</p>
                    <p className={`mt-1.5 text-xs font-medium ${sub}`}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="border-y border-gray-100 bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map(({ title, body }) => (
                <div key={title} className="flex flex-col gap-3">
                  <div className="h-px w-8 bg-emerald" />
                  <h3 className="font-heading text-lg font-bold text-forest-800">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <p className="section-label">The Process</p>
              <h2 className="font-heading mt-4 text-4xl font-bold text-forest-800 sm:text-5xl">
                From post to hire in days.
              </h2>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map(({ step, title, body }) => (
                <div key={step} className="flex flex-col gap-4">
                  <span className="font-heading text-5xl font-bold text-gray-100">{step}</span>
                  <h3 className="font-heading font-bold text-forest-800">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="bg-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="section-label">Pricing</p>
              <h2 className="font-heading mt-4 text-4xl font-bold text-forest-800 sm:text-5xl">
                Simple, honest pricing.
              </h2>
              <p className="mt-4 text-gray-500">No placement fees. No surprises. Cancel any time.</p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-3xl p-8 ${
                    plan.badge
                      ? "bg-forest-800 text-white ring-4 ring-lime/20"
                      : "border border-gray-200 bg-white"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-lime px-4 py-1 text-xs font-bold text-forest-800">
                      {plan.badge}
                    </span>
                  )}
                  <div>
                    <p className={`text-sm font-semibold ${plan.badge ? "text-lime" : "text-emerald"}`}>
                      {plan.name}
                    </p>
                    <p className={`font-heading mt-2 text-4xl font-bold ${plan.badge ? "text-white" : "text-forest-800"}`}>
                      {plan.price}
                    </p>
                    <p className={`text-xs mt-1 ${plan.badge ? "text-white/50" : "text-gray-400"}`}>
                      {plan.period}
                    </p>
                  </div>

                  <ul className="mt-8 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2.5 text-sm ${plan.badge ? "text-white/80" : "text-gray-600"}`}>
                        <svg className={`h-4 w-4 shrink-0 ${plan.badge ? "text-lime" : "text-emerald"}`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.name === "Enterprise" ? "mailto:hello@climbhire.com" : "/for-employers#post"}
                    className={`mt-8 w-full justify-center ${plan.badge ? "btn-primary" : plan.ctaStyle}`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-heading text-4xl font-bold text-forest-800 sm:text-5xl">
              Start hiring smarter.
            </h2>
            <p className="mt-5 text-gray-500">
              Post your first role today and reach thousands of qualified professionals in T&T.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="#pricing" className="btn-primary text-base px-8 py-3.5">Post a Job</Link>
              <Link href="mailto:hello@climbhire.com" className="btn-outline-dark text-base px-8 py-3.5">Talk to Sales</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
