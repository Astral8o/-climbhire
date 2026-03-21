import { supabase, type Job, type Testimonial } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import TestimonialCard from "@/components/TestimonialCard";
import Link from "next/link";

// Fallback data so the page renders even before Supabase tables exist
const DEMO_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Stripe",
    location: "Remote",
    type: "full-time",
    salary_range: "$160k – $220k",
    description: "Build the next generation of payment UIs.",
    tags: ["React", "TypeScript", "GraphQL"],
    apply_url: "#",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Linear",
    location: "San Francisco, CA",
    type: "full-time",
    salary_range: "$140k – $180k",
    description: "Shape the future of project management tooling.",
    tags: ["Figma", "Design Systems", "Prototyping"],
    apply_url: "#",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Staff Backend Engineer",
    company: "Vercel",
    location: "Remote",
    type: "full-time",
    salary_range: "$180k – $250k",
    description: "Scale infrastructure serving millions of developers.",
    tags: ["Go", "Kubernetes", "Postgres"],
    apply_url: "#",
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Growth Marketing Manager",
    company: "Loom",
    location: "New York, NY",
    type: "full-time",
    salary_range: "$120k – $160k",
    description: "Drive user acquisition and retention strategies.",
    tags: ["SEO", "Paid Acquisition", "Analytics"],
    apply_url: "#",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Data Engineer",
    company: "Notion",
    location: "Remote",
    type: "full-time",
    salary_range: "$150k – $200k",
    description: "Build data pipelines powering product insights.",
    tags: ["dbt", "Spark", "Python"],
    apply_url: "#",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "iOS Engineer",
    company: "Figma",
    location: "Remote",
    type: "full-time",
    salary_range: "$160k – $220k",
    description: "Bring collaborative design to iPhone.",
    tags: ["Swift", "UIKit", "SwiftUI"],
    apply_url: "#",
    is_featured: false,
    created_at: new Date().toISOString(),
  },
];

const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Senior Engineer",
    company: "Stripe",
    quote:
      "ClimbHire made it incredibly easy to find a role that matched exactly what I was looking for. I had three offers within two weeks.",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Marcus Webb",
    role: "Product Designer",
    company: "Linear",
    quote:
      "The quality of companies on ClimbHire is unlike anything else. Every listing felt hand-picked and worth my time.",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Yuki Tanaka",
    role: "Engineering Manager",
    company: "Vercel",
    quote:
      "We filled our last three senior positions through ClimbHire. The candidates were top-notch and ready to ship from day one.",
    created_at: new Date().toISOString(),
  },
];

async function getJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(6);

    if (error || !data || data.length === 0) return DEMO_JOBS;
    return data as Job[];
  } catch {
    return DEMO_JOBS;
  }
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    if (error || !data || data.length === 0) return DEMO_TESTIMONIALS;
    return data as Testimonial[];
  } catch {
    return DEMO_TESTIMONIALS;
  }
}

const STATS = [
  { label: "Active Jobs", value: "1,200+" },
  { label: "Companies Hiring", value: "340+" },
  { label: "Placements Made", value: "8,500+" },
  { label: "Avg. Time to Hire", value: "12 days" },
];

const HOW_IT_WORKS = [
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "Browse curated roles",
    description: "Every listing is hand-reviewed for quality. No noise, just signal.",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.82m2.56-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: "Apply in one click",
    description: "Direct links to each company's application — no middlemen.",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: "Climb your career",
    description: "Join thousands of professionals who found their next great role.",
  },
];

export default async function HomePage() {
  const [jobs, testimonials] = await Promise.all([getJobs(), getTestimonials()]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 py-24 sm:py-32">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm mb-6">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              1,200+ active jobs this week
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Find your next
              <br />
              <span className="text-brand-100">big climb.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
              Curated tech jobs at companies worth working for. No spam, no endless recruiter
              calls — just great roles matched to ambitious people.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="#jobs" className="btn-primary bg-white !text-brand-700 hover:bg-brand-50 text-base px-8 py-3 shadow-lg">
                Browse Jobs
              </Link>
              <Link href="mailto:hello@climbhire.com" className="btn-secondary border-white/30 !text-white hover:bg-white/10 text-base px-8 py-3">
                Post a Job →
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-gray-100 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {STATS.map(({ label, value }) => (
                <div key={label} className="text-center">
                  <dt className="text-sm font-medium text-gray-500">{label}</dt>
                  <dd className="mt-1 text-3xl font-bold tracking-tight text-brand-600">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                How ClimbHire works
              </h2>
              <p className="mt-4 text-gray-500">Simple. Fast. No fluff.</p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.title} className="card text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    {step.icon}
                  </div>
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-400">
                    Step {i + 1}
                  </div>
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Jobs */}
        <section id="jobs" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Open positions
                </h2>
                <p className="mt-2 text-gray-500">Hand-picked roles updated daily.</p>
              </div>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Success stories
              </h2>
              <p className="mt-4 text-gray-500">
                Thousands of people have climbed higher with ClimbHire.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-600 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to make your next move?
            </h2>
            <p className="mt-4 text-brand-100">
              Browse 1,200+ roles or post your own opening in minutes.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="#jobs" className="btn-primary bg-white !text-brand-700 hover:bg-brand-50 text-base px-8 py-3">
                Browse Jobs
              </Link>
              <Link href="mailto:hello@climbhire.com" className="btn-secondary border-white/30 !text-white hover:bg-white/10 text-base px-8 py-3">
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
