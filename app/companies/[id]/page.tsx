"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import Tag from "@/components/ui/Tag";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { getSupabaseClient, formatSalary, type DbJob } from "@/lib/supabase";
import { ArrowLeft, ArrowUpRight, MapPin, ExternalLink } from "lucide-react";

type LiveCompany = {
  id: string;
  name: string;
  slug: string;
  industry: string | null;
  logo_url: string | null;
};

type LiveJob = {
  id: string;
  title: string;
  location: string;
  employment_type: string | null;
  industry: string | null;
  salary: string;
  apply_url: string | null;
};

const BG_COLORS = ["#D4FF5E", "#5ECFFF", "#FFB347", "#B5A8FF", "#FF7F7F", "#5EFF9B"];

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function bgForName(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff;
  return BG_COLORS[hash % BG_COLORS.length];
}

export default function CompanyProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [company, setCompany] = useState<LiveCompany | null>(null);
  const [jobs, setJobs] = useState<LiveJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = getSupabaseClient();
        const { data: co } = await supabase
          .from("companies")
          .select("id, name, slug, industry, logo_url")
          .eq("id", id)
          .single();

        if (co) {
          setCompany(co);
          const { data: jobData } = await supabase
            .from("jobs")
            .select("id, title, location, employment_type, industry, salary_min, salary_max, salary_currency, salary_period, apply_url")
            .eq("company_id", co.id)
            .eq("status", "published")
            .order("published_at", { ascending: false });

          if (jobData) {
            setJobs(jobData.map((j) => ({
              id: j.id,
              title: j.title,
              location: j.location,
              employment_type: j.employment_type,
              industry: j.industry,
              salary: formatSalary(j as unknown as DbJob),
              apply_url: j.apply_url,
            })));
          }
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

  if (!company) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 bg-cream flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-3xl uppercase mb-2">Company not found</h2>
            <Link href="/companies" className="font-body text-teal underline">Back to companies</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const bg = bgForName(company.name);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-cream px-7 py-10">
        <div className="max-w-[1100px] mx-auto">
          <Link
            href="/companies"
            className="inline-flex items-center gap-1.5 font-body font-bold text-[11px] uppercase tracking-[0.12em] text-ink/60 hover:text-ink mb-8 transition-colors"
          >
            <ArrowLeft size={13} /> All companies
          </Link>

          <div
            className="bg-white border-2 border-ink rounded-squircle p-8 mb-6"
            style={{ boxShadow: "8px 8px 0 0 #1C1C18" }}
          >
            <div className="flex items-start gap-6 flex-wrap">
              <Avatar initials={initials(company.name)} size={72} bg={bg} color="#1C1C18" />
              <div className="flex-1">
                <Eyebrow className="block mb-2">{company.industry ?? "General"}</Eyebrow>
                <h1
                  className="font-display font-bold uppercase text-ink mb-3"
                  style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  {company.name}
                </h1>
                <Tag tone="lime" className="text-[9px]">{jobs.length} open roles</Tag>
              </div>
            </div>
          </div>

          <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 300px" }}>
            <div>
              <Eyebrow color="dim" className="block mb-4">{jobs.length} open roles</Eyebrow>
              {jobs.length === 0 && (
                <p className="font-body text-ink/50 text-sm">No open roles at the moment.</p>
              )}
              <div className="flex flex-col gap-3">
                {jobs.map((j) => (
                  <Link
                    key={j.id}
                    href={`/jobs/${j.id}`}
                    className="flex items-center gap-4 px-5 py-4 bg-white border border-ink rounded-[24px] transition-all duration-200 hover:-translate-y-0.5"
                    style={{ boxShadow: "3px 3px 0 0 #1C1C18" }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-[17px] uppercase tracking-[-0.025em] mb-1">
                        {j.title}
                      </div>
                      <div className="flex gap-2 items-center font-body text-[11px] text-ink/55">
                        <span>{j.location}</span>
                        {j.employment_type && <><span>·</span><span>{j.employment_type}</span></>}
                        {j.salary && <><span>·</span><span>{j.salary}</span></>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {j.industry && <Tag tone="cream" className="text-[9px]">{j.industry}</Tag>}
                      <ArrowUpRight size={16} className="text-ink/40" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div
                className="bg-ink text-white border border-ink rounded-squircle p-5"
                style={{ boxShadow: "4px 4px 0 0 #D4FF5E" }}
              >
                <Eyebrow color="invert" className="block mb-2.5">Interested?</Eyebrow>
                <p className="font-body text-[13px] text-white/70 mb-4 leading-[1.5]">
                  Browse open roles and apply directly — free for everyone.
                </p>
                <Button href="/jobs" block variant="primary">View all jobs</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
