export const runtime = "edge";

import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import Tag from "@/components/ui/Tag";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { JOBS, COMPANIES, getCompanyByName } from "@/lib/data";
import {
  ArrowUpRight,
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Globe,
  Briefcase,
  Bookmark,
} from "lucide-react";

export function generateStaticParams() {
  return JOBS.map((j) => ({ id: j.id }));
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = JOBS.find((j) => j.id === params.id);
  if (!job) notFound();

  const company = getCompanyByName(job.company);

  const descLines = (job.description ?? "").split("\n\n");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-cream px-7 py-10">
        <div className="max-w-[1100px] mx-auto">
          {/* Back link */}
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 font-body font-bold text-[11px] uppercase tracking-[0.12em] text-ink/60 hover:text-ink mb-8 transition-colors"
          >
            <ArrowLeft size={13} /> Back to jobs
          </Link>

          {/* Main card */}
          <div
            className="bg-white border-2 border-ink rounded-squircle p-8 mb-6"
            style={{ boxShadow: "8px 8px 0 0 #1C1C18" }}
          >
            {/* Header */}
            <div className="flex justify-between items-start gap-6 mb-6 flex-wrap">
              <div className="flex items-start gap-4">
                <Avatar
                  initials={company.initials}
                  size={56}
                  bg={company.bg}
                  color={company.color}
                />
                <div>
                  <Eyebrow className="block mb-1.5">{company.industry}</Eyebrow>
                  <h1
                    className="font-display font-bold uppercase text-ink mb-3"
                    style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.04em", lineHeight: 1 }}
                  >
                    {job.title}
                  </h1>
                  <div className="flex gap-1.5 flex-wrap">
                    <Tag tone="cream" className="text-[9px]">
                      <MapPin size={9} /> {job.location}
                    </Tag>
                    <Tag tone="cream" className="text-[9px]">
                      <Briefcase size={9} /> {job.type}
                    </Tag>
                    <Tag tone="cream" className="text-[9px]">
                      {job.level}
                    </Tag>
                    <Tag tone="cream" className="text-[9px]">
                      <DollarSign size={9} /> {job.salary}
                    </Tag>
                    {job.remote && (
                      <Tag tone="tealfaint" className="text-[9px]">
                        <Globe size={9} /> Remote
                      </Tag>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 flex-shrink-0">
                <button className="w-10 h-10 border border-ink rounded-[14px] flex items-center justify-center hover:bg-lime transition-colors">
                  <Bookmark size={16} />
                </button>
                <Button href="/sign-in" size="lg">
                  Apply Now
                </Button>
              </div>
            </div>

            {/* Tags row */}
            <div className="flex gap-1.5 flex-wrap pt-5 border-t border-ink/10">
              {job.tags.map((t) => (
                <Tag key={t} tone="ghost" className="text-[9px]">
                  {t}
                </Tag>
              ))}
            </div>
          </div>

          {/* Body — 2 col */}
          <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 340px" }}>
            {/* Left — description */}
            <div
              className="bg-white border border-ink rounded-squircle p-8"
              style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}
            >
              <Eyebrow className="block mb-4">About this role</Eyebrow>
              <div className="font-body text-[15px] leading-[1.65] text-ink/80 space-y-4">
                {descLines.map((para, i) => {
                  if (para.startsWith("**") && para.endsWith("**")) {
                    return (
                      <h3
                        key={i}
                        className="font-display font-bold text-[18px] uppercase tracking-[-0.025em] text-ink mt-6 mb-2"
                      >
                        {para.replace(/\*\*/g, "")}
                      </h3>
                    );
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

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-ink/10">
                <Eyebrow color="dim" className="block mb-3">
                  Skills & tools
                </Eyebrow>
                <div className="flex gap-1.5 flex-wrap">
                  {job.tags.map((t) => (
                    <Tag key={t} tone="cream">
                      {t}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="flex flex-col gap-4">
              {/* At a glance */}
              <div
                className="bg-white border border-ink rounded-squircle p-6"
                style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}
              >
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
                        <dt className="font-body font-bold text-[10px] uppercase tracking-[0.1em] text-ink/40 mb-0.5">
                          {label}
                        </dt>
                        <dd className="font-body font-medium text-sm text-ink">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 pt-5 border-t border-ink/10 flex flex-col gap-2.5">
                  <Button block href="/sign-in" size="md">
                    Apply Now
                  </Button>
                  <button className="w-full flex items-center justify-center gap-1.5 font-body font-bold text-[11px] uppercase tracking-[0.1em] py-2.5 border border-ink rounded-squircle-sm hover:scale-95 transition-transform">
                    <Bookmark size={13} /> Save role
                  </button>
                </div>
              </div>

              {/* Company card */}
              <Link
                href={`/companies/${company.id}`}
                className="bg-white border border-ink rounded-squircle p-5 block hover:-translate-y-0.5 transition-transform duration-200"
                style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}
              >
                <Eyebrow color="dim" className="block mb-3">
                  About the employer
                </Eyebrow>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar
                    initials={company.initials}
                    size={40}
                    bg={company.bg}
                    color={company.color}
                  />
                  <div>
                    <div className="font-display font-bold text-[15px] uppercase tracking-[-0.02em]">
                      {company.name}
                    </div>
                    <div className="font-body text-xs text-ink/55">{company.industry}</div>
                  </div>
                </div>
                <p className="font-body text-[13px] text-ink/70 leading-[1.5] mb-3">
                  {company.about.slice(0, 120)}…
                </p>
                <div className="flex items-center gap-1 font-body font-bold text-[10px] uppercase tracking-[0.1em] text-teal">
                  View company profile <ArrowUpRight size={11} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
