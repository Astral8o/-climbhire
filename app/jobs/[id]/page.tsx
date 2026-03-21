import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase, type Job } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

// Demo data keyed by id
const DEMO_JOBS: Record<string, Job & { description: string }> = {
  "1": {
    id: "1", title: "Senior Software Engineer", company: "Guardian Group", location: "Port of Spain, Trinidad",
    type: "full-time", salary_range: "TTD 18,000 – 25,000/mo",
    description: `
## About the Role
Guardian Group is seeking a Senior Software Engineer to join our Digital Transformation team. You'll build and maintain the insurance platforms that serve hundreds of thousands of customers across the Caribbean.

## What You'll Do
- Architect and implement scalable front-end and back-end systems using React and Node.js
- Collaborate with product and design teams to deliver delightful user experiences
- Lead code reviews and mentor junior engineers
- Contribute to our cloud migration on AWS

## Requirements
- 5+ years of professional software development experience
- Strong proficiency in React, TypeScript, and Node.js
- Experience with cloud platforms (AWS preferred)
- Excellent communication skills and a team-first mindset

## What We Offer
- Competitive salary: TTD 18,000 – 25,000/month
- Health insurance and pension plan
- Hybrid work arrangement (3 days in-office)
- 20 days annual leave + public holidays
- Professional development budget
    `,
    tags: ["React", "Node.js", "AWS", "TypeScript", "PostgreSQL"],
    apply_url: "https://guardian.com/careers", is_featured: true, created_at: "2024-03-01"
  },
};

// A single fallback so any unknown id gets a reasonable demo page
const FALLBACK: Job & { description: string } = {
  id: "demo", title: "Software Engineer", company: "Demo Company", location: "Port of Spain, Trinidad",
  type: "full-time", salary_range: "TTD 12,000 – 18,000/mo",
  description: "This is a demo job description. Connect your Supabase database to see real listings.",
  tags: ["Demo"], apply_url: "#", is_featured: false, created_at: ""
};

async function getJob(id: string): Promise<(Job & { description: string }) | null> {
  try {
    const { data, error } = await supabase
      .from("jobs").select("*").eq("id", id).single();
    if (error || !data) return DEMO_JOBS[id] ?? FALLBACK;
    return data as Job & { description: string };
  } catch { return DEMO_JOBS[id] ?? FALLBACK; }
}

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id);
  if (!job) notFound();

  const typeColors: Record<string, string> = {
    "full-time": "badge-emerald",
    "part-time": "badge bg-blue-50 text-blue-700",
    contract:    "badge bg-orange-50 text-orange-700",
    internship:  "badge bg-purple-50 text-purple-700",
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">

        {/* Breadcrumb + header */}
        <div className="bg-forest-800 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-4 flex items-center gap-2 text-xs text-white/40">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/jobs" className="hover:text-white">Jobs</Link>
              <span>/</span>
              <span className="text-white/70">{job.title}</span>
            </nav>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-300">{job.company}</p>
                <h1 className="font-heading mt-1 text-3xl font-bold text-white sm:text-4xl">
                  {job.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                    {job.location}
                  </span>
                  {job.salary_range && (
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      {job.salary_range}
                    </span>
                  )}
                  <span className={typeColors[job.type] ?? "badge-gray"}>{job.type}</span>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-3.5 text-base"
                >
                  Apply Now
                </a>
                <button className="btn-outline-light py-2.5 px-5 text-xs">
                  Save Job
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">

            {/* Main content */}
            <article className="flex-1">
              <div className="card">
                <h2 className="font-heading text-xl font-bold text-forest-800 mb-4">Job Description</h2>
                <div className="prose prose-sm prose-headings:font-heading prose-headings:text-forest-800 prose-a:text-emerald max-w-none text-gray-600 leading-relaxed">
                  {job.description.split('\n').map((line, i) => {
                    if (line.startsWith('## ')) {
                      return <h2 key={i} className="font-heading text-lg font-bold text-forest-800 mt-6 mb-3">{line.replace('## ', '')}</h2>;
                    }
                    if (line.startsWith('- ')) {
                      return <li key={i} className="ml-4 text-sm">{line.replace('- ', '')}</li>;
                    }
                    if (line.trim() === '') return <br key={i} />;
                    return <p key={i} className="text-sm">{line}</p>;
                  })}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="shrink-0 space-y-5 lg:w-72">
              {/* Overview */}
              <div className="card">
                <h3 className="font-heading font-bold text-forest-800 mb-4">Job Overview</h3>
                <dl className="space-y-3">
                  {[
                    { label: "Company",   value: job.company },
                    { label: "Location",  value: job.location },
                    { label: "Job Type",  value: job.type },
                    { label: "Salary",    value: job.salary_range ?? "Not specified" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">{label}</dt>
                      <dd className="mt-0.5 text-sm text-gray-700 capitalize">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Skills */}
              <div className="card">
                <h3 className="font-heading font-bold text-forest-800 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span key={tag} className="badge-gray">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Apply CTA */}
              <div className="rounded-2xl bg-forest-800 p-6 text-white text-center">
                <p className="font-heading font-bold text-lg">Interested?</p>
                <p className="mt-1 text-xs text-white/60">Submit your application directly to {job.company}.</p>
                <a href={job.apply_url} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full justify-center">
                  Apply Now
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
