"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import { getSupabaseClient, formatSalary, formatExpiry, formatPosted, type DbJob } from "@/lib/supabase";
import {
  ArrowUpRight,
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Globe,
  Briefcase,
  Bookmark,
  ExternalLink,
} from "lucide-react";

type JobDetail = {
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
  industry: string;
};

function dbToDetail(raw: DbJob): JobDetail {
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
    industry: raw.industry ?? "General",
  };
}

export default function JobDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [job, setJob] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Try Supabase first
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from("jobs")
          .select("*, companies(name, slug, logo_url, industry)")
          .eq("id", id)
          .single();
        if (!error && data) {
          setJob(dbToDetail(data as unknown as DbJob));
          setLoading(false);
          return;
        }
      } catch {}

      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-cream flex items-center justify-center">
          <p className="font-body text-ink/50">Loading…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-cream flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-3xl uppercase mb-2">Role not found</h2>
            <Link href="/jobs" className="font-body text-teal underline">Back to jobs</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const descLines = job.description.split("\n\n");

  const applyHref = job.apply_url || null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-cream px-7 py-10">
        <div className="max-w-[1100px] mx-auto">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 font-body font-bold text-[11px] uppercase tracking-[0.12em] text-ink/60 hover:text-ink mb-8 transition-colors"
          >
            <ArrowLeft size={13} /> Back to jobs
          </Link>

          <div
            className="bg-white border-2 border-ink rounded-squircle p-8 mb-6"
            style={{ boxShadow: "8px 8px 0 0 #1C1C18" }}
          >
            <div className="flex justify-between items-start gap-6 mb-6 flex-wrap">
              <div>
                <Eyebrow className="block mb-1.5">{job.industry}</Eyebrow>
                <h1
                  className="font-display font-bold uppercase text-ink mb-3"
                  style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  {job.title}
                </h1>
                <p className="font-body font-bold text-sm text-ink/60 mb-3">{job.company}</p>
                <div className="flex gap-1.5 flex-wrap">
                  <Tag tone="cream" className="text-[9px]"><MapPin size={9} /> {job.location}</Tag>
                  <Tag tone="cream" className="text-[9px]"><Briefcase size={9} /> {job.type}</Tag>
                  <Tag tone="cream" className="text-[9px]">{job.level}</Tag>
                  <Tag tone="cream" className="text-[9px]"><DollarSign size={9} /> {job.salary}</Tag>
                  {job.remote && <Tag tone="tealfaint" className="text-[9px]"><Globe size={9} /> Remote</Tag>}
                </div>
              </div>
              <div className="flex gap-2.5 flex-shrink-0">
                <button className="w-10 h-10 border border-ink rounded-[14px] flex items-center justify-center hover:bg-lime transition-colors">
                  <Bookmark size={16} />
                </button>
                {applyHref ? (
                  <a
                    href={applyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-cream font-body font-bold text-[11px] uppercase tracking-[0.12em] rounded-squircle-sm hover:scale-95 transition-transform"
                  >
                    Apply Now <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink/20 text-ink/50 font-body font-bold text-[11px] uppercase tracking-[0.12em] rounded-squircle-sm cursor-not-allowed">
                    Apply on company site
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap pt-5 border-t border-ink/10">
              {job.tags.map((t) => <Tag key={t} tone="ghost" className="text-[9px]">{t}</Tag>)}
            </div>
          </div>

          <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 340px" }}>
            <div className="bg-white border border-ink rounded-squircle p-8" style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}>
              <Eyebrow className="block mb-4">About this role</Eyebrow>
              <div className="font-body text-[15px] leading-[1.65] text-ink/80 space-y-4">
                {descLines.map((para, i) => {
                  if (para.startsWith("**") && para.endsWith("**")) {
                    return <h3 key={i} className="font-display font-bold text-[18px] uppercase tracking-[-0.025em] text-ink mt-6 mb-2">{para.replace(/\*\*/g, "")}</h3>;
                  }
                  if (para.startsWith("- ")) {
                    const items = para.split("\n- ").map((l) => l.replace(/^- /, ""));
                    return (
                      <ul key={i} className="list-none p-0 m-0 flex flex-col gap-2">
                        {items.map((item, j) => (
                          <li key={j} className="flex gap-2.5 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0 mt-[7px]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>
              <div className="mt-8 pt-6 border-t border-ink/10">
                <Eyebrow color="dim" className="block mb-3">Skills & tools</Eyebrow>
                <div className="flex gap-1.5 flex-wrap">
                  {job.tags.map((t) => <Tag key={t} tone="cream">{t}</Tag>)}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white border border-ink rounded-squircle p-6" style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}>
                <Eyebrow className="block mb-4">At a glance</Eyebrow>
                <dl className="flex flex-col gap-4">
                  {[
                    { icon: <MapPin size={14} />, label: "Location", value: job.location },
                    { icon: <Briefcase size={14} />, label: "Type", value: job.type },
                    { icon: <Clock size={14} />, label: "Level", value: job.level },
                    { icon: <DollarSign size={14} />, label: "Salary", value: job.salary },
                    { icon: <Clock size={14} />, label: "Closes", value: job.closing },
                    { icon: <Clock size={14} />, label: "Posted", value: job.posted },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-start gap-2.5">
                      <span className="text-ink/40 mt-0.5 flex-shrink-0">{icon}</span>
                      <div className="min-w-0">
                        <dt className="font-body font-bold text-[10px] uppercase tracking-[0.1em] text-ink/40 mb-0.5">{label}</dt>
                        <dd className="font-body font-medium text-sm text-ink">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 pt-5 border-t border-ink/10 flex flex-col gap-2.5">
                  {applyHref ? (
                    <a
                      href={applyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-ink text-cream font-body font-bold text-[11px] uppercase tracking-[0.12em] py-3 rounded-squircle-sm hover:scale-95 transition-transform"
                    >
                      Apply Now <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="w-full flex items-center justify-center gap-2 bg-ink/20 text-ink/50 font-body font-bold text-[11px] uppercase tracking-[0.12em] py-3 rounded-squircle-sm cursor-not-allowed">
                      Apply on company site
                    </span>
                  )}
                  <button className="w-full flex items-center justify-center gap-1.5 font-body font-bold text-[11px] uppercase tracking-[0.1em] py-2.5 border border-ink rounded-squircle-sm hover:scale-95 transition-transform">
                    <Bookmark size={13} /> Save role
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
