import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase, type Job, type Testimonial } from "@/lib/supabase";

/* ─── Demo data (renders while Supabase tables are empty) ─── */
const DEMO_JOBS: Job[] = [
  { id: "1", title: "Senior Software Engineer", company: "Guardian Group", location: "Port of Spain", type: "full-time", salary_range: "TTD 18,000 – 25,000/mo", description: "", tags: ["React", "Node.js", "AWS"], apply_url: "/jobs/1", is_featured: true,  created_at: "" },
  { id: "2", title: "Marketing Manager",        company: "Massy Holdings",  location: "San Fernando",  type: "full-time", salary_range: "TTD 12,000 – 16,000/mo", description: "", tags: ["Brand", "Digital", "CRM"], apply_url: "/jobs/2", is_featured: false, created_at: "" },
  { id: "3", title: "Financial Analyst",        company: "Republic Bank",   location: "Port of Spain", type: "full-time", salary_range: "TTD 10,000 – 14,000/mo", description: "", tags: ["Excel", "SAP", "IFRS"],   apply_url: "/jobs/3", is_featured: false, created_at: "" },
  { id: "4", title: "UX/UI Designer",           company: "Digicel T&T",    location: "Remote (T&T)",  type: "full-time", salary_range: "TTD 9,000 – 13,000/mo",  description: "", tags: ["Figma", "Research"],        apply_url: "/jobs/4", is_featured: true,  created_at: "" },
  { id: "5", title: "Project Manager",          company: "NGC",            location: "Point Lisas",   type: "full-time", salary_range: "TTD 15,000 – 22,000/mo", description: "", tags: ["Agile", "PMP"],            apply_url: "/jobs/5", is_featured: false, created_at: "" },
  { id: "6", title: "Data Analyst",             company: "Caribbean Airlines", location: "Piarco",    type: "contract",  salary_range: "TTD 8,000 – 11,000/mo",  description: "", tags: ["Python", "SQL", "Power BI"], apply_url: "/jobs/6", is_featured: false, created_at: "" },
];

const DEMO_TESTIMONIALS: Testimonial[] = [
  { id: "1", name: "Candice Williams", role: "Software Engineer", company: "Guardian Group",    quote: "ClimbHire connected me with my dream role in two weeks. The listings are actually relevant — no noise.",                              created_at: "" },
  { id: "2", name: "Darius Baptiste",  role: "HR Director",       company: "Massy Holdings",   quote: "We reduced our time-to-hire by 40%. The quality of candidates from ClimbHire is head and shoulders above traditional job boards.", created_at: "" },
  { id: "3", name: "Priya Rampersad", role: "UX Designer",        company: "Digicel T&T",      quote: "As a creative professional I struggled to find good T&T-based roles. ClimbHire actually curates for our market.",                  created_at: "" },
];

const SECTORS = ["Technology", "Finance & Banking", "Energy & Petroleum", "Marketing", "Healthcare", "Engineering", "Education", "Hospitality"];

const STATS = [
  { value: "2,400+", label: "Active Listings" },
  { value: "450+",   label: "Companies" },
  { value: "12,000+", label: "Professionals" },
  { value: "94%",   label: "Placement Rate" },
];

async function getFeaturedJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from("jobs").select("*")
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(6);
    if (error || !data?.length) return DEMO_JOBS;
    return data as Job[];
  } catch { return DEMO_JOBS; }
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from("testimonials").select("*")
      .order("created_at", { ascending: false })
      .limit(3);
    if (error || !data?.length) return DEMO_TESTIMONIALS;
    return data as Testimonial[];
  } catch { return DEMO_TESTIMONIALS; }
}

export default async function HomePage() {
  const [jobs, testimonials] = await Promise.all([getFeaturedJobs(), getTestimonials()]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-forest-800">
          {/* Radial glow */}
          <div className="pointer-events-none absolute inset-0 bg-hero-pattern" />
          {/* Grid texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)" }} />

          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-4 py-1.5 text-sm text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
                Trinidad & Tobago's #1 Talent Platform
              </div>

              <h1 className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
                Your next <br />
                <span className="text-lime">big career</span> <br />
                starts here.
              </h1>

              <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
                ClimbHire connects ambitious professionals across Trinidad & Tobago with the region's top employers — from energy giants to tech startups.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/jobs" className="btn-primary text-base px-8 py-3.5">
                  Explore Jobs
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
                </Link>
                <Link href="/for-employers" className="btn-outline-light text-base px-8 py-3.5">
                  Hire Talent
                </Link>
              </div>

              {/* Quick search hint */}
              <div className="mt-8 flex flex-wrap gap-2">
                {["Software Engineer", "Finance", "Energy Sector", "Remote"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/jobs?q=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/60 hover:border-lime/40 hover:text-lime transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="border-b border-gray-100 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <dd className="font-heading text-4xl font-bold text-forest-800">{value}</dd>
                  <dt className="mt-1 text-sm text-gray-500">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Browse by Sector ── */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="section-label">Explore</p>
              <h2 className="font-heading mt-2 text-3xl font-bold text-forest-800 sm:text-4xl">
                Browse by sector
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {SECTORS.map((sector) => (
                <Link
                  key={sector}
                  href={`/jobs?sector=${encodeURIComponent(sector)}`}
                  className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-emerald hover:shadow-md"
                >
                  <span className="group-hover:text-forest-800">{sector}</span>
                  <svg className="h-4 w-4 text-gray-300 group-hover:text-emerald transition-colors" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Jobs ── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="section-label">Opportunities</p>
                <h2 className="font-heading mt-2 text-3xl font-bold text-forest-800 sm:text-4xl">
                  Featured jobs
                </h2>
              </div>
              <Link href="/jobs" className="hidden text-sm font-medium text-emerald hover:text-emerald-600 sm:inline-flex items-center gap-1">
                View all
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
              </Link>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`} className="card group relative flex flex-col gap-4 hover:border-emerald/30">
                  {job.is_featured && (
                    <span className="badge-lime absolute right-4 top-4">Featured</span>
                  )}
                  <div>
                    <p className="text-xs font-medium text-gray-400">{job.company}</p>
                    <h3 className="font-heading mt-1 text-lg font-semibold text-forest-800 group-hover:text-emerald transition-colors leading-snug">
                      {job.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                      {job.location}
                    </span>
                    {job.salary_range && (
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {job.salary_range}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {job.tags.map((tag) => (
                      <span key={tag} className="badge-gray">{tag}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/jobs" className="btn-outline-dark">View all jobs</Link>
            </div>
          </div>
        </section>

        {/* ── Split CTA ── */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Professionals */}
              <div className="rounded-3xl bg-forest-800 p-10 text-white">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-lime/20 px-3 py-1 text-xs font-semibold text-lime">
                  For Professionals
                </div>
                <h3 className="font-heading text-2xl font-bold sm:text-3xl">
                  Take your career to new heights.
                </h3>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">
                  Build a standout profile, get discovered by top employers, and access roles you won't find anywhere else in T&T.
                </p>
                <Link href="/for-professionals" className="btn-primary mt-8 inline-flex">
                  Get Started
                </Link>
              </div>

              {/* Employers */}
              <div className="rounded-3xl border-2 border-emerald bg-white p-10">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
                  For Employers
                </div>
                <h3 className="font-heading text-2xl font-bold text-forest-800 sm:text-3xl">
                  Hire the best Caribbean talent.
                </h3>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  Post a job in minutes and reach thousands of vetted professionals across Trinidad & Tobago.
                </p>
                <Link href="/for-employers" className="btn-emerald mt-8 inline-flex">
                  Post a Job
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="section-label">Success Stories</p>
              <h2 className="font-heading mt-2 text-3xl font-bold text-forest-800 sm:text-4xl">
                From the ClimbHire community
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.id} className="card flex flex-col gap-4">
                  <svg className="h-8 w-8 text-lime" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M10 8C6.686 8 4 10.686 4 14v2c0 3.314 2.686 6 6 6h.5a.5.5 0 010 1H10c-3.314 0-6 2.686-6 6v1h4v-1c0-1.105.895-2 2-2h.5C13.538 27 16 24.538 16 21.5v-7.5C16 10.686 13.314 8 10 8zm18 0c-3.314 0-6 2.686-6 6v2c0 3.314 2.686 6 6 6h.5a.5.5 0 010 1H28c-3.314 0-6 2.686-6 6v1h4v-1c0-1.105.895-2 2-2h.5C31.538 27 34 24.538 34 21.5v-7.5C34 10.686 31.314 8 28 8z" />
                  </svg>
                  <p className="text-gray-600 leading-relaxed flex-1">{t.quote}</p>
                  <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-800 text-lime font-heading font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-forest-800">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA banner ── */}
        <section className="bg-lime py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="font-heading text-3xl font-bold text-forest-800 sm:text-4xl">
              Ready to climb?
            </h2>
            <p className="mt-3 text-forest-700">
              Join thousands of professionals and hundreds of companies on ClimbHire today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/jobs" className="btn-outline-dark bg-white">
                Find Your Next Role
              </Link>
              <Link href="/for-employers" className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest-800 px-6 py-3 text-sm font-semibold text-white hover:bg-forest-700 transition-colors">
                Post a Job
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
