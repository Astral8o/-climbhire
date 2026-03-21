import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase, type Job } from "@/lib/supabase";
import Link from "next/link";

const DEMO_JOBS: Job[] = [
  { id: "1",  title: "Senior Software Engineer",     company: "Guardian Group",    location: "Port of Spain", type: "full-time", salary_range: "TTD 18,000–25,000/mo", description: "Build and maintain mission-critical insurance platforms serving hundreds of thousands of customers across the Caribbean.",                tags: ["React", "Node.js", "AWS"],         apply_url: "/jobs/1",  is_featured: true,  created_at: "2024-03-01" },
  { id: "2",  title: "Marketing Manager",             company: "Massy Holdings",   location: "San Fernando",  type: "full-time", salary_range: "TTD 12,000–16,000/mo", description: "Lead brand and digital strategy for one of the Caribbean's largest conglomerates.",                                                       tags: ["Brand", "Digital", "CRM"],         apply_url: "/jobs/2",  is_featured: false, created_at: "2024-03-02" },
  { id: "3",  title: "Financial Analyst",             company: "Republic Bank",    location: "Port of Spain", type: "full-time", salary_range: "TTD 10,000–14,000/mo", description: "Support the finance team with budgeting, forecasting, and financial reporting under IFRS standards.",                                     tags: ["Excel", "SAP", "IFRS"],            apply_url: "/jobs/3",  is_featured: false, created_at: "2024-03-03" },
  { id: "4",  title: "UX/UI Designer",                company: "Digicel T&T",     location: "Remote (T&T)",  type: "full-time", salary_range: "TTD 9,000–13,000/mo",  description: "Craft delightful mobile and web experiences for 4 million Caribbean subscribers.",                                                          tags: ["Figma", "Research", "Prototyping"], apply_url: "/jobs/4",  is_featured: true,  created_at: "2024-03-04" },
  { id: "5",  title: "Project Manager",               company: "NGC",             location: "Point Lisas",   type: "full-time", salary_range: "TTD 15,000–22,000/mo", description: "Manage large-scale capital projects within the National Gas Company's infrastructure division.",                                            tags: ["Agile", "PMP", "MS Project"],      apply_url: "/jobs/5",  is_featured: false, created_at: "2024-03-05" },
  { id: "6",  title: "Data Analyst",                  company: "Caribbean Airlines", location: "Piarco",    type: "contract",  salary_range: "TTD 8,000–11,000/mo",  description: "Analyse operational and revenue data to improve route performance and customer experience.",                                               tags: ["Python", "SQL", "Power BI"],       apply_url: "/jobs/6",  is_featured: false, created_at: "2024-03-06" },
  { id: "7",  title: "Civil Engineer",                company: "NIDCO",           location: "Port of Spain", type: "full-time", salary_range: "TTD 14,000–19,000/mo", description: "Design and oversee national infrastructure development projects across T&T.",                                                               tags: ["AutoCAD", "Structural", "QA/QC"], apply_url: "/jobs/7",  is_featured: false, created_at: "2024-03-07" },
  { id: "8",  title: "Registered Nurse",              company: "EWMSC",           location: "Mt. Hope",      type: "full-time", salary_range: "TTD 7,000–9,500/mo",   description: "Provide quality patient care in the Eastern Regional Health Authority's largest hospital.",                                               tags: ["ICU", "Pediatrics", "ACLS"],       apply_url: "/jobs/8",  is_featured: false, created_at: "2024-03-08" },
  { id: "9",  title: "Legal Counsel",                 company: "Angostura",       location: "Laventille",    type: "full-time", salary_range: "TTD 16,000–22,000/mo", description: "Advise on corporate and commercial legal matters for one of T&T's most iconic brands.",                                                     tags: ["Contract Law", "IP", "Compliance"], apply_url: "/jobs/9",  is_featured: false, created_at: "2024-03-09" },
];

const JOB_TYPES = ["All Types", "full-time", "part-time", "contract", "internship"];
const LOCATIONS = ["All Locations", "Port of Spain", "San Fernando", "Chaguanas", "Point Lisas", "Remote (T&T)"];
const SECTORS   = ["All Sectors", "Technology", "Finance & Banking", "Energy & Petroleum", "Marketing", "Healthcare", "Engineering", "Legal"];

async function getJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from("jobs").select("*")
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });
    if (error || !data?.length) return DEMO_JOBS;
    return data as Job[];
  } catch { return DEMO_JOBS; }
}

const TYPE_COLORS: Record<string, string> = {
  "full-time":  "badge-emerald",
  "part-time":  "badge bg-blue-50 text-blue-700",
  "contract":   "badge bg-orange-50 text-orange-700",
  "internship": "badge bg-purple-50 text-purple-700",
};

export const metadata = { title: "Browse Jobs | ClimbHire" };

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">

        {/* Page header */}
        <div className="bg-forest-800 py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="section-label">Opportunities</p>
            <h1 className="font-heading mt-2 text-4xl font-bold text-white sm:text-5xl">
              Find your next role
            </h1>
            <p className="mt-3 text-white/60">{jobs.length} open positions across Trinidad & Tobago</p>

            {/* Search bar */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/></svg>
                <input
                  type="text"
                  placeholder="Job title, skill, or keyword…"
                  className="w-full rounded-xl border-0 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-lime outline-none"
                />
              </div>
              <button className="btn-primary rounded-xl px-8 py-3.5">Search</button>
            </div>
          </div>
        </div>

        {/* Filters + grid */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">

            {/* Sidebar filters */}
            <aside className="shrink-0 lg:w-64">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Job Type</h3>
                  <div className="space-y-2">
                    {JOB_TYPES.map((t) => (
                      <label key={t} className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 hover:text-forest-800">
                        <input type="radio" name="type" className="accent-emerald" defaultChecked={t === "All Types"} />
                        <span className="capitalize">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Location</h3>
                  <div className="space-y-2">
                    {LOCATIONS.map((l) => (
                      <label key={l} className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 hover:text-forest-800">
                        <input type="radio" name="location" className="accent-emerald" defaultChecked={l === "All Locations"} />
                        {l}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Sector</h3>
                  <div className="space-y-2">
                    {SECTORS.map((s) => (
                      <label key={s} className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 hover:text-forest-800">
                        <input type="checkbox" className="accent-emerald rounded" />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Job cards */}
            <div className="flex-1">
              <p className="mb-6 text-sm text-gray-500">Showing {jobs.length} results</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {jobs.map((job) => (
                  <Link key={job.id} href={`/jobs/${job.id}`} className="card group relative flex flex-col gap-3 hover:border-emerald/40 hover:shadow-md">
                    {job.is_featured && (
                      <span className="badge-lime absolute right-4 top-4">Featured</span>
                    )}
                    <div>
                      <p className="text-xs font-medium text-gray-400">{job.company}</p>
                      <h3 className="font-heading mt-0.5 text-lg font-semibold text-forest-800 group-hover:text-emerald transition-colors">
                        {job.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                        {job.location}
                      </span>
                      {job.salary_range && (
                        <span>{job.salary_range}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className={TYPE_COLORS[job.type] ?? "badge-gray"}>{job.type}</span>
                      {job.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="badge-gray">{tag}</span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
