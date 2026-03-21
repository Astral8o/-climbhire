import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "For Professionals | ClimbHire" };

const BENEFITS = [
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title:  "Be discovered",
    body:   "Build a profile once. Let T&T's best employers come to you. No cold applications into the void.",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title:  "Curated, not cluttered",
    body:   "Every listing is reviewed. You'll only see roles worth your time — no spam, no outdated posts.",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title:  "Salary transparency",
    body:   "Every role shows a real salary range. Know your worth before you apply.",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title:  "Built for T&T",
    body:   "Roles filtered by local market — Port of Spain, San Fernando, remote. No irrelevant international noise.",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Create your profile",  body: "Your work history, skills, and aspirations — beautifully presented. Takes about 10 minutes." },
  { step: "02", title: "Set your preferences", body: "Tell us the role, salary, location, and culture you're looking for. We match accordingly." },
  { step: "03", title: "Get matched",          body: "Employers browse your profile and reach out. You also apply directly to roles that excite you." },
  { step: "04", title: "Climb",               body: "Accept the offer that's right for you. Our team checks in post-placement to ensure it's going well." },
];

export default function ForProfessionalsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="bg-white pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="section-label">For Professionals</p>
              <h1 className="font-heading mt-4 text-5xl font-bold leading-tight text-forest-800 sm:text-6xl lg:text-7xl">
                Your ambition <br />
                deserves the <br />
                <em className="not-italic text-emerald">right stage.</em>
              </h1>
              <p className="mt-8 max-w-xl text-lg text-gray-500 leading-relaxed">
                ClimbHire is where Trinidad & Tobago's best professionals go when they're ready to move up. Curated roles. Real salaries. No noise.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/jobs" className="btn-primary text-base px-8 py-3.5">
                  Browse Open Roles
                </Link>
                <Link href="/profile/new" className="btn-outline-dark text-base px-8 py-3.5">
                  Build Your Profile
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="border-y border-gray-100 bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map(({ icon, title, body }) => (
                <div key={title} className="flex flex-col gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-800 text-lime">
                    {icon}
                  </div>
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
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
              <div>
                <p className="section-label">The Process</p>
                <h2 className="font-heading mt-4 text-4xl font-bold text-forest-800 sm:text-5xl">
                  How ClimbHire works for you
                </h2>
                <p className="mt-5 text-gray-500 leading-relaxed">
                  We've stripped away everything that makes job hunting miserable. What remains is a clear, respectful process that values your time.
                </p>
                <Link href="/jobs" className="btn-primary mt-10 inline-flex text-base px-8 py-3.5">
                  Start Exploring
                </Link>
              </div>

              <div className="space-y-8">
                {HOW_IT_WORKS.map(({ step, title, body }) => (
                  <div key={step} className="flex gap-6">
                    <div className="shrink-0">
                      <span className="font-heading text-3xl font-bold text-gray-100">{step}</span>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-forest-800">{title}</h3>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Social proof ── */}
        <section className="bg-forest-800 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                { stat: "94%",     label: "of placed professionals stay 12+ months" },
                { stat: "18 days", label: "average time from profile to first offer" },
                { stat: "3.4×",    label: "more interview requests vs. traditional job boards" },
              ].map(({ stat, label }) => (
                <div key={stat} className="border-l-2 border-lime pl-6">
                  <p className="font-heading text-4xl font-bold text-white">{stat}</p>
                  <p className="mt-2 text-sm text-white/60">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-heading text-4xl font-bold text-forest-800 sm:text-5xl">
              Ready to make your move?
            </h2>
            <p className="mt-5 text-gray-500">
              Thousands of professionals across T&T have already made theirs.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/jobs" className="btn-primary text-base px-8 py-3.5">Browse Jobs</Link>
              <Link href="/profile/new" className="btn-outline-dark text-base px-8 py-3.5">Build Profile</Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
