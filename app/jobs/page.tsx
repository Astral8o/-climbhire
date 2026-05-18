"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import Highlight from "@/components/ui/Highlight";
import Tag from "@/components/ui/Tag";
import { getSupabaseClient, formatSalary, formatExpiry, formatPosted, type DbJob } from "@/lib/supabase";
import {
  ArrowUpRight,
  Bookmark,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  salary: string;
  description: string;
  tags: string[];
  remote: boolean;
  posted: string;
  closing: string;
  apply_url: string;
  category: string;
  is_featured: boolean;
};

function dbToJob(raw: DbJob): Job {
  return {
    id: raw.id,
    title: raw.title,
    company: raw.companies?.name ?? "Unknown",
    location: raw.location,
    type: raw.employment_type ?? "full-time",
    level: "Mid-level",
    salary: formatSalary(raw),
    description: raw.summary ?? "",
    tags: raw.tags ?? [],
    remote: raw.work_mode === "remote" || raw.work_mode === "hybrid",
    posted: formatPosted(raw.published_at),
    closing: formatExpiry(raw.expires_at),
    apply_url: raw.apply_url ?? "",
    category: raw.industry ?? (raw.tags?.[0] ?? "General"),
    is_featured: raw.is_urgent ?? false,
  };
}

function FilterPills({
  label,
  items,
  active,
  onToggle,
}: {
  label: string;
  items: string[];
  active: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <Eyebrow color="dim" className="block mb-2.5">
        {label}
      </Eyebrow>
      <div className="flex gap-1.5 flex-wrap">
        {items.map((v) => (
          <span
            key={v}
            onClick={() => onToggle(v)}
            className="px-3 py-1.5 border border-ink rounded-2xl font-body font-bold text-[10px] uppercase tracking-[0.1em] cursor-pointer transition-all duration-150"
            style={{
              background: active.includes(v) ? "#1C1C18" : "#fff",
              color: active.includes(v) ? "#fff" : "#1C1C18",
            }}
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

function JobCard({ job, saved, onSave }: { job: Job; saved: boolean; onSave: () => void }) {
  return (
    <div
      className="p-5 bg-white border border-ink rounded-[28px] relative cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_#00C9B1]"
      style={{ boxShadow: "3px 3px 0 0 #1C1C18" }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onSave(); }}
        className="absolute top-3.5 right-3.5 w-[34px] h-[34px] rounded-xl border border-ink flex items-center justify-center cursor-pointer transition-all duration-200"
        style={{ background: saved ? "#00C9B1" : "#fff", color: saved ? "#1C1C18" : "rgba(28,28,24,0.35)" }}
      >
        <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
      </button>

      <div className="flex gap-2 items-center mb-2.5">
        <Eyebrow color="dim">{job.category}</Eyebrow>
        <span className="w-[3px] h-[3px] bg-ink/25 rounded-full" />
        <Eyebrow color="dim">Posted {job.posted}</Eyebrow>
      </div>

      <Link href={`/jobs/${job.id}`} className="block">
        <h4 className="font-display font-semibold text-[19px] uppercase tracking-[-0.028em] leading-[1.05] mb-2 pr-10">
          {job.title}
        </h4>
      </Link>

      <p className="font-body text-xs text-ink/65 mb-3.5 flex items-center gap-1.5">
        <span className="font-bold">{job.company}</span>
        <span className="w-[3px] h-[3px] bg-ink/30 rounded-full" />
        <span>{job.location}</span>
      </p>

      <div className="flex gap-1.5 mb-4 flex-wrap">
        <Tag tone="cream" className="text-[9px] px-2.5 py-1">{job.type}</Tag>
        <Tag tone="cream" className="text-[9px] px-2.5 py-1">{job.level}</Tag>
        {job.remote && <Tag tone="tealfaint" className="text-[9px] px-2.5 py-1">Remote</Tag>}
      </div>

      <div className="flex justify-between items-center pt-3.5 border-t border-ink/8 mb-3.5">
        <span className="font-body font-bold text-[11px] text-ink">{job.salary}</span>
        <span className="font-body font-bold text-[10px] uppercase tracking-[0.1em] text-teal">
          Closes {job.closing}
        </span>
      </div>

      <Link
        href={`/jobs/${job.id}`}
        className="flex items-center justify-center gap-2 border border-ink rounded-squircle-sm px-3 py-2 text-[10px] font-body font-bold uppercase tracking-[0.1em] hover:scale-95 transition-transform"
      >
        View role <ArrowUpRight size={12} />
      </Link>
    </div>
  );
}

export default function FindJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [activeTypes, setActiveTypes] = useState<string[]>([]);
  const [activeLevels, setActiveLevels] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchJobs() {
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from("jobs")
          .select("*, companies(name, slug, logo_url, industry)")
          .eq("status", "published")
          .order("published_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setJobs(data.map((j) => dbToJob(j as unknown as DbJob)));
        }
      } catch {
        // keep fallback data
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const toggle = (arr: string[], setArr: (v: string[]) => void, v: string) =>
    setArr(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const TYPES = Array.from(new Set(jobs.map((j) => j.type)));
  const LEVELS = Array.from(new Set(jobs.map((j) => j.level)));

  const activeCount = activeTypes.length + activeLevels.length + (remoteOnly ? 1 : 0);

  const filtered = jobs.filter(
    (j) =>
      (q === "" || (j.title + j.company + j.location).toLowerCase().includes(q.toLowerCase())) &&
      (activeTypes.length === 0 || activeTypes.includes(j.type)) &&
      (activeLevels.length === 0 || activeLevels.includes(j.level)) &&
      (!remoteOnly || j.remote)
  );

  const reset = () => { setActiveTypes([]); setActiveLevels([]); setRemoteOnly(false); setQ(""); };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-cream">
        <section className="px-7 pt-12 pb-6 border-b border-ink">
          <div className="max-w-[1360px] mx-auto">
            <div className="flex justify-between items-end gap-6 flex-wrap mb-6">
              <div>
                <Eyebrow className="mb-2.5 block">§ Find jobs</Eyebrow>
                <h1
                  className="font-display font-bold uppercase text-ink m-0"
                  style={{ fontSize: "clamp(40px, 5.5vw, 76px)", letterSpacing: "-0.05em", lineHeight: 0.95 }}
                >
                  {loading ? "Loading" : filtered.length} ways to{" "}
                  <Highlight color="#00C9B1" delay={0}>climb.</Highlight>
                </h1>
              </div>

              <div className="flex gap-2.5 items-center flex-wrap">
                <div className="flex items-center gap-2.5 bg-white border border-ink rounded-[18px] px-3.5 py-1 min-w-[280px]">
                  <Search size={16} />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search title, company, skill…"
                    className="border-0 outline-none bg-transparent font-body text-[13px] py-2.5 w-full"
                  />
                </div>

                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-ink rounded-[18px] font-body font-bold text-[11px] uppercase tracking-[0.12em] cursor-pointer transition-all"
                  style={{ background: activeCount > 0 ? "#1C1C18" : "#fff", color: activeCount > 0 ? "#fff" : "#1C1C18" }}
                >
                  <Filter size={13} /> Filters{" "}
                  {activeCount > 0 && <span className="bg-lime text-ink rounded-full px-1.5 py-0.5 text-[9px]">{activeCount}</span>}
                </button>

                <div className="relative">
                  <select className="appearance-none px-3.5 py-2.5 pr-8 border border-ink rounded-[18px] bg-white font-body font-bold text-[11px] uppercase tracking-[0.12em] cursor-pointer">
                    <option>Newest</option>
                    <option>Closing soon</option>
                    <option>Salary</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {filtersOpen && (
              <div className="bg-white border border-ink rounded-[24px] p-5 grid gap-6 items-start mt-4" style={{ gridTemplateColumns: "auto 1fr 1fr auto" }}>
                <div>
                  <Eyebrow color="dim" className="block mb-2.5">Remote</Eyebrow>
                  <label className="flex items-center gap-2.5 cursor-pointer font-body text-[13px]">
                    <span
                      onClick={() => setRemoteOnly(!remoteOnly)}
                      className="relative w-9 h-5 rounded-full border border-ink transition-all duration-200 flex-shrink-0 cursor-pointer"
                      style={{ background: remoteOnly ? "#00C9B1" : "#fff" }}
                    >
                      <span className="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-ink transition-all duration-200" style={{ left: remoteOnly ? "18px" : "2px" }} />
                    </span>
                    Remote-only
                  </label>
                </div>
                <FilterPills label="Type" items={TYPES} active={activeTypes} onToggle={(v) => toggle(activeTypes, setActiveTypes, v)} />
                <FilterPills label="Level" items={LEVELS} active={activeLevels} onToggle={(v) => toggle(activeLevels, setActiveLevels, v)} />
                {activeCount > 0 && (
                  <button onClick={reset} className="px-3.5 py-2 border border-ink rounded-2xl bg-transparent cursor-pointer font-body font-bold text-[10px] uppercase tracking-[0.12em] whitespace-nowrap self-end">
                    Reset
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="px-7 py-8 pb-24">
          <div className="max-w-[1360px] mx-auto">
            <Eyebrow color="dim" className="block mb-4">
              {loading ? "Fetching latest jobs…" : `Showing ${filtered.length} of ${jobs.length} jobs`}
            </Eyebrow>
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
              {filtered.map((j) => (
                <JobCard key={j.id} job={j} saved={!!saved[j.id]} onSave={() => setSaved((s) => ({ ...s, [j.id]: !s[j.id] }))} />
              ))}
            </div>

            {!loading && filtered.length === 0 && (
              <div className="px-16 py-16 text-center bg-white border border-dashed border-ink rounded-[28px]">
                <h4 className="font-display text-2xl uppercase mb-2">No matches</h4>
                <p className="font-body text-ink/60">Try clearing filters or broadening your search.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
