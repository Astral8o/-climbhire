"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Highlight from "@/components/ui/Highlight";
import Eyebrow from "@/components/ui/Eyebrow";
import Tag from "@/components/ui/Tag";
import Avatar from "@/components/ui/Avatar";
import PanelChrome from "@/components/ui/PanelChrome";
import HoverCard from "@/components/ui/HoverCard";
import Button from "@/components/ui/Button";
import FAQ from "@/components/FAQ";
import { getSupabaseClient } from "@/lib/supabase";
import {
  ArrowUpRight,
  Check,
  Bookmark,
  Search,
  MapPin,
  Filter,
  Share2,
  Zap,
  X,
  Plus,
} from "lucide-react";

type LiveJob = { id: string; title: string; company: string; location: string; type: string; salary: string; category: string; remote: boolean; posted: string; closing: string; };
type LiveCompany = { id: string; name: string; industry: string; location: string; jobCount: number; initials: string; };

function initials(name: string) { return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(); }
const TRUST_NAMES = [
  "Get Right Finance",
  "MyGG",
  "bmobile",
  "Digicel",
  "Massy Stores",
  "Sagicor",
  "Island Finance",
  "Republic Bank",
];
const ASSIST_CONVERSATION = [
  {
    from: "bot",
    text: "Hi! I'm ClimbHire Assist. What kind of role are you looking for today?",
  },
  {
    from: "user",
    text: "Product design roles in Trinidad, remote-friendly.",
  },
  {
    from: "bot",
    text: "Got it. I found 4 matches — the strongest is Senior UX Designer at Get Right Finance. Want me to show you the listing?",
  },
  {
    from: "user",
    text: "Yes, and what does the application process look like?",
  },
  {
    from: "bot",
    text: "Sign in to ClimbHire, hit Apply on the job, and your application is sent directly to the employer's inbox. ClimbHire doesn't store your resume — only the employer receives it.",
  },
];
export default function HomePage() {
  const [featuredJobs, setFeaturedJobs] = useState<LiveJob[]>([]);
  const [companies, setCompanies] = useState<LiveCompany[]>([]);
  const [totalJobs, setTotalJobs] = useState(50);

  useEffect(() => {
    async function load() {
      const supabase = getSupabaseClient();
      const [{ data: jobs }, { data: comps }, { count }] = await Promise.all([
        supabase.from("jobs").select("id, title, location, industry, employment_type, work_mode, salary_min, salary_max, salary_currency, salary_period, published_at, expires_at, companies(name)").eq("status", "published").order("published_at", { ascending: false }).limit(4),
        supabase.from("companies").select("id, name, industry, slug").limit(5),
        supabase.from("jobs").select("*", { count: "exact", head: true }).eq("status", "published"),
      ]);
      if (jobs) setFeaturedJobs(jobs.map((j: any) => ({
        id: j.id, title: j.title, company: j.companies?.name ?? "Unknown",
        location: j.location, type: j.employment_type ?? "full-time",
        salary: j.salary_min ? `${j.salary_currency} ${(j.salary_min/1000).toFixed(0)}k–${(j.salary_max/1000).toFixed(0)}k/${j.salary_period === "monthly" ? "mo" : "yr"}` : "Competitive",
        category: j.industry ?? "General", remote: j.work_mode === "remote" || j.work_mode === "hybrid",
        posted: "recently", closing: "soon",
      })));
      if (comps) setCompanies(comps.map((c: any) => ({ id: c.id, name: c.name, industry: c.industry, location: "Caribbean", jobCount: 0, initials: initials(c.name) })));
      if (count) setTotalJobs(count);
    }
    load();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="bg-cream border-b border-ink px-7 pt-[84px] pb-[120px] relative overflow-hidden">
          <div className="max-w-[1360px] mx-auto grid gap-14 items-center" style={{ gridTemplateColumns: "1.15fr 1fr" }}>
            {/* Left */}
            <div>
              {/* Status pill */}
              <div className="inline-flex items-center gap-2.5 mb-8 px-3.5 py-2 bg-white border border-ink rounded-full">
                <span
                  className="w-[7px] h-[7px] rounded-full bg-lime"
                  style={{ boxShadow: "0 0 0 3px rgba(212,255,94,0.3)" }}
                />
                <span className="font-body font-bold text-[10px] uppercase tracking-[0.22em]">
                  Now live across the Caribbean
                </span>
              </div>
              <h1
                className="font-display font-bold uppercase text-ink mb-9"
                style={{
                  fontSize: "clamp(56px, 9vw, 136px)",
                  letterSpacing: "-0.05em",
                  lineHeight: 0.94,
                }}
              >
                <div>Grow here.</div>
                <div>
                  <Highlight color="#70A4A4" delay={0.9}>
                    Hire here.
                  </Highlight>
                </div>
              </h1>
              <p className="font-body font-medium text-xl leading-[1.45] max-w-[560px] mb-10 text-ink/75">
                We{" "}
                <Highlight color="#D4FF5E" delay={1.3}>
                  illuminate
                </Highlight>{" "}
                opportunity. Connecting Caribbean job seekers to leading companies in the Caribbean &amp; beyond.
              </p>
              <div className="flex gap-3.5 flex-wrap">
                <Button size="lg" href="/jobs">Find your next job</Button>
                <Button size="lg" variant="secondary" href="/employers">Hire with us</Button>
              </div>
            </div>
            {/* Right — hero image */}
            <div className="relative aspect-[5/6] max-w-[520px] ml-auto w-full">
              <div
                className="absolute bg-lime rounded-[40px] opacity-35"
                style={{ inset: "-20px -20px -20px 20px", transform: "rotate(-4deg)" }}
              />
              <div
                className="absolute bg-teal rounded-[40px] opacity-25"
                style={{ inset: "10px -30px -10px -10px", transform: "rotate(3deg)" }}
              />
              <div
                className="absolute inset-0 border border-ink rounded-[40px] overflow-hidden bg-[#ddd]"
                style={{ boxShadow: "16px 16px 0 0 #1C1C18" }}
              >
                <Image
                  src="/hero-portrait.png"
                  alt="Caribbean professional"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Hired toast */}
                <div
                  className="absolute left-5 bottom-5 bg-white border border-ink rounded-[20px] px-3.5 py-2.5 flex items-center gap-2.5"
                  style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}
                >
                  <div className="w-7 h-7 bg-lime rounded-lg flex items-center justify-center">
                    <Check size={14} />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xs uppercase tracking-[-0.02em]">
                      Kalinda hired
                    </div>
                    <div className="font-body text-[10px] text-ink/60">
                      Senior UX · Get Right Finance
                    </div>
                  </div>
                </div>
                {/* Verified badge */}
                <div
                  className="absolute right-4 top-4 bg-ink text-lime border border-ink rounded-2xl px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em]"
                  style={{ boxShadow: "4px 4px 0 0 #D4FF5E" }}
                >
                  Verified · Live
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ── TrustBar ── */}
        <section className="bg-ink border-b border-ink py-7 overflow-hidden relative">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-ink pr-3.5 z-10 flex items-center gap-2.5">
            <Eyebrow color="invert" className="text-[9px]">
              Leading companies
            </Eyebrow>
          </div>
          <div
            className="flex whitespace-nowrap pl-[200px]"
            style={{ animation: "marquee 32s linear infinite" }}
          >
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-14 pr-14">
                {TRUST_NAMES.map((n) => (
                  <span
                    key={n + i}
                    className="font-display text-[22px] uppercase tracking-[0.22em] font-semibold text-white/45"
                  >
                    {n}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>
        {/* ── Featured Opportunities ── */}
        <section className="bg-cream border-b border-ink px-7 py-[108px]">
          <div className="max-w-[1360px] mx-auto">
            <div className="flex justify-between items-end mb-14 gap-8 flex-wrap">
              <div>
                <Eyebrow className="mb-4 block">§ 02 · Opportunities</Eyebrow>
                <h2
                  className="font-display font-semibold uppercase text-ink m-0"
                  style={{
                    fontSize: "clamp(52px, 7vw, 108px)",
                    letterSpacing: "-0.045em",
                    lineHeight: 0.95,
                  }}
                >
                  Featured <br />
                  opportunities.
                </h2>
              </div>
              <div className="flex flex-col items-end gap-4">
                <Tag tone="ink">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime mr-0.5" />
                  Updated daily
                </Tag>
              </div>
            </div>
            <div className="grid gap-10" style={{ gridTemplateColumns: "1fr 2fr" }}>
              {/* Companies column */}
              <div>
                <Eyebrow color="dim" className="mb-4 block">
                  Hiring teams
                </Eyebrow>
                <div className="flex flex-col gap-3.5 mb-5">
                  {companies.map((c) => (
                    <HoverCard key={c.id} shadowOn={false} className="p-4">
                      <Link
                        href={`/companies`}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <Avatar initials={c.initials} size={44} bg="#D4FF5E" color="#1C1C18" />
                          <div className="min-w-0">
                            <div className="font-display font-semibold text-[18px] uppercase tracking-[-0.03em] leading-none mb-1.5 truncate">
                              {c.name}
                            </div>
                            <div className="font-body font-bold uppercase text-[9px] tracking-[0.18em] text-ink/45">
                              {c.industry} · Caribbean
                            </div>
                          </div>
                        </div>
                        <ArrowUpRight size={17} />
                      </Link>
                    </HoverCard>
                  ))}
                </div>
                <Button variant="outline" block href="/companies">Explore all companies</Button>
              </div>
              {/* Jobs grid */}
              <div>
                <Eyebrow color="dim" className="mb-4 block">
                  Open positions · {featuredJobs.length} featured
                </Eyebrow>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {featuredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button variant="outline" href="/jobs">See all {totalJobs} jobs</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ── Jobs Preview ── */}
        <section className="bg-white border-b border-ink px-7 py-[120px] relative overflow-hidden">
          <div className="max-w-[1360px] mx-auto">
            <div className="grid gap-16 items-center" style={{ gridTemplateColumns: "1fr 1.3fr" }}>
              {/* Left copy */}
              <div>
                <Eyebrow className="mb-4 block">§ 03 · For Job Seekers</Eyebrow>
                <h2
                  className="font-display font-semibold uppercase text-ink mb-7"
                  style={{
                    fontSize: "clamp(48px, 6.5vw, 92px)",
                    letterSpacing: "-0.045em",
                    lineHeight: 0.95,
                  }}
                >
                  Find your
                  <br />
                  next{" "}
                  <Highlight color="#70A4A4" delay={0}>
                    climb.
                  </Highlight>
                </h2>
                <p className="font-body font-medium text-lg leading-[1.55] text-ink/70 mb-8 max-w-[480px]">
                  Browse verified roles across the region — filter by island, type, level and
                  category. Save what you love, share with a friend, and apply when you&apos;re ready.
                </p>
                <ul className="list-none p-0 m-0 flex flex-col gap-3.5 mb-9">
                  {[
                    ["100% free, forever", "No fees, no paywalls."],
                    ["Verified employers", "Every employer is reviewed before posting."],
                    ["Save & share jobs", "Bookmark roles or send to a friend."],
                    ["Sign in to apply", "Applications go straight to the employer."],
                  ].map(([t, d]) => (
                    <li key={t} className="flex gap-3.5 items-start">
                      <div className="w-6 h-6 rounded-lg bg-lime border border-ink flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={13} strokeWidth={2.5} />
                      </div>
                      <div>
                        <div className="font-display font-semibold text-[15px] uppercase tracking-[-0.02em] mb-0.5">
                          {t}
                        </div>
                        <div className="font-body text-[13px] text-ink/60">{d}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3 flex-wrap">
                  <Button href="/jobs">Browse all jobs</Button>
                  <Button variant="ghost" href="/sign-up">Create free account</Button>
                </div>
              </div>
              {/* Right — PanelChrome */}
              <PanelChrome
                label="Find_Jobs::Live_Search"
                status="Live"
                statusColor="lime"
                shadowClass="shadow-stamp-lime"
              >
                <div className="p-5 bg-cream">
                  {/* Mock search bar */}
                  <div className="flex gap-2 mb-3.5">
                    <div className="flex-1 flex items-center gap-2.5 px-4 py-3 bg-white border border-ink rounded-2xl">
                      <Search size={14} />
                      <span className="font-body text-[13px] font-semibold">Product designer</span>
                      <span className="flex-1 border-l border-ink/20 ml-1.5 pl-2.5 font-body text-[13px] text-ink/50 flex items-center gap-1.5">
                        <MapPin size={12} />
                        Caribbean
                      </span>
                    </div>
                    <div className="px-4 py-3 bg-ink text-white rounded-2xl flex items-center gap-1.5 font-body font-bold text-[11px] uppercase tracking-[0.1em]">
                      <Filter size={12} />
                      Filters · 2
                    </div>
                  </div>
                  {/* Filter chips */}
                  <div className="flex gap-1.5 flex-wrap mb-3.5">
                    {["Full-time", "Remote-friendly", "Senior"].map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-lime border border-ink rounded-xl font-body font-bold text-[10px] uppercase tracking-[0.1em]"
                      >
                        {c} <X size={9} />
                      </span>
                    ))}
                    <span className="inline-flex items-center px-2.5 py-1.5 border border-dashed border-ink rounded-xl font-body font-semibold text-[10px] uppercase tracking-[0.1em] text-ink/55">
                      + Add filter
                    </span>
                  </div>
                  <Eyebrow color="dim" className="block mb-2.5">
                    4 of 38 results
                  </Eyebrow>
                  {/* Job rows */}
                  <div className="flex flex-col gap-2">
                    {featuredJobs.map((j, i) => (
                      <div
                        key={j.id}
                        className="flex items-center gap-3 px-3.5 py-3 bg-white border border-ink rounded-2xl cursor-pointer"
                      >
                        <Avatar initials={initials(j.company)} size={38} bg="#D4FF5E" color="#1C1C18" />
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-bold text-[13px] uppercase tracking-[-0.02em] leading-[1.15] mb-0.5">
                            {j.title}
                          </div>
                          <div className="flex items-center gap-1.5 font-body text-[11px] text-ink/65">
                            <span className="text-teal font-bold">{j.company}</span>
                            <span className="opacity-40">·</span>
                            <span>{j.location}</span>
                          </div>
                        </div>
                        <Tag tone={i === 0 ? "lime" : "cream"} className="text-[9px]">
                          {j.category}
                        </Tag>
                        <Bookmark size={15} className="text-ink/40" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between items-center font-body text-[11px] text-ink/55">
                    <span className="flex items-center gap-1.5">
                      <Share2 size={11} /> Tap any job to view, save or share
                    </span>
                    <Link
                      href="/jobs"
                      className="font-bold text-ink uppercase tracking-[0.1em] flex items-center gap-1"
                    >
                      View all <ArrowUpRight size={11} />
                    </Link>
                  </div>
                </div>
              </PanelChrome>
            </div>
          </div>
        </section>
        {/* ── Assist Showcase ── */}
        <section className="bg-cream border-b border-ink px-7 py-[120px] relative overflow-hidden">
          <div className="max-w-[1360px] mx-auto">
            <div className="grid gap-16 items-center" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
              {/* Left — PanelChrome */}
              <PanelChrome
                label="ClimbHire_Assist::v1.0"
                status="Online"
                statusColor="lime"
                shadowClass="shadow-[16px_16px_0_0_#70A4A4]"
              >
                <div className="bg-white">
                  {/* Chat header */}
                  <div className="px-4 py-3.5 bg-ink text-white flex items-center gap-3 border-b border-ink">
                    <div className="w-9 h-9 bg-lime border border-white rounded-[10px] flex items-center justify-center text-ink relative">
                      <Zap size={18} fill="currentColor" />
                      <div className="absolute -bottom-[3px] -right-[3px] w-3 h-3 bg-lime border-2 border-ink rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="font-display font-bold text-sm uppercase tracking-[-0.02em]">
                        ClimbHire Assist
                      </div>
                      <div className="font-body text-[10px] text-white/60 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-lime rounded-full" /> AI · Online · Avg reply 1s
                      </div>
                    </div>
                    <X size={14} strokeWidth={2} className="text-white/60" />
                  </div>
                  {/* Messages */}
                  <div className="p-5 bg-cream min-h-[340px] flex flex-col gap-3">
                    {ASSIST_CONVERSATION.map((m, i) => (
                      <div
                        key={i}
                        className={`flex gap-2 items-end ${m.from === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {m.from === "bot" && (
                          <div className="w-6 h-6 bg-lime border border-ink rounded-lg flex items-center justify-center flex-shrink-0">
                            <Zap size={11} fill="currentColor" />
                          </div>
                        )}
                        <div
                          className="max-w-[78%] px-3.5 py-2.5 font-body text-[12.5px] leading-[1.5] border border-ink"
                          style={{
                            background: m.from === "user" ? "#1C1C18" : "#fff",
                            color: m.from === "user" ? "#fff" : "#1C1C18",
                            borderRadius:
                              m.from === "user"
                                ? "16px 16px 4px 16px"
                                : "16px 16px 16px 4px",
                          }}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-1">
                      {["Show me the listing", "How to apply?", "More like this"].map((r) => (
                        <span
                          key={r}
                          className="px-2.5 py-1.5 bg-white border border-ink rounded-xl font-body font-semibold text-[10px] cursor-pointer"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Composer */}
                  <div className="px-4 py-3 bg-white border-t border-ink flex items-center gap-2.5">
                    <div className="flex-1 px-3.5 py-2.5 bg-cream border border-ink rounded-xl font-body text-xs text-ink/45">
                      Ask anything about ClimbHire…
                    </div>
                    <div className="w-9 h-9 bg-ink rounded-[10px] flex items-center justify-center text-lime">
                      <ArrowUpRight size={15} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </PanelChrome>
              {/* Right copy */}
              <div>
                <Eyebrow className="mb-4 block">§ 04 · ClimbHire Assist</Eyebrow>
                <h2
                  className="font-display font-semibold uppercase text-ink mb-7"
                  style={{
                    fontSize: "clamp(48px, 6.5vw, 92px)",
                    letterSpacing: "-0.045em",
                    lineHeight: 0.95,
                  }}
                >
                  Your{" "}
                  <Highlight color="#D4FF5E" delay={0}>
                    AI
                  </Highlight>
                  <br />
                  job
                  <br />
                  copilot.
                </h2>
                <p className="font-body font-medium text-lg leading-[1.55] text-ink/70 mb-8 max-w-[480px]">
                  Meet <strong className="text-ink">ClimbHire Assist</strong> — our AI chatbot.
                  Available on every page to help you navigate the platform, find roles that fit, and
                  answer questions about how things work.
                </p>
                <ul className="list-none p-0 m-0 flex flex-col gap-3.5 mb-9">
                  {[
                    ["Find roles faster", "Describe what you want; Assist surfaces matches."],
                    ["Understand the platform", "How applications work, what employers see."],
                    ["Get unstuck", "Resume tips, interview prep, salary context."],
                    ["Available 24/7", "Always on, free for everyone."],
                  ].map(([t, d]) => (
                    <li key={t} className="flex gap-3.5 items-start">
                      <div className="w-6 h-6 rounded-lg bg-lime border border-ink flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={13} strokeWidth={2.5} />
                      </div>
                      <div>
                        <div className="font-display font-semibold text-[15px] uppercase tracking-[-0.02em] mb-0.5">
                          {t}
                        </div>
                        <div className="font-body text-[13px] text-ink/60">{d}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3 flex-wrap">
                  <Button>Try Assist now</Button>
                  <Button variant="ghost" href="/employers">For employers</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ── FAQ ── */}
        <section className="bg-white border-b border-ink px-7 py-[120px]">
          <div className="max-w-[980px] mx-auto">
            <div className="text-center mb-14">
              <Eyebrow className="mb-3.5 block">§ 05 · How it works</Eyebrow>
              <h2
                className="font-display font-semibold uppercase text-ink m-0"
                style={{
                  fontSize: "clamp(48px, 6.5vw, 92px)",
                  letterSpacing: "-0.045em",
                  lineHeight: 0.95,
                }}
              >
                Free. Simple.{" "}
                <Highlight color="#D4FF5E" delay={0}>
                  Caribbean.
                </Highlight>
              </h2>
            </div>
            <FAQ />
          </div>
        </section>
        {/* ── Final CTA ── */}
        <section className="bg-ink px-7 py-[120px] relative overflow-hidden">
          <div
            className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] bg-lime rounded-full opacity-10"
            style={{ filter: "blur(80px)" }}
          />
          <div className="max-w-[1100px] mx-auto relative z-10 text-center">
            <Eyebrow color="lime" className="mb-4 block">
              § Make the climb
            </Eyebrow>
            <h2
              className="font-display font-bold uppercase text-white mb-8"
              style={{
                fontSize: "clamp(64px, 9vw, 160px)",
                letterSpacing: "-0.055em",
                lineHeight: 0.9,
              }}
            >
              Free for
              <br />
              everyone.{" "}
              <span className="relative inline-block px-1.5">
                Always.
                <span
                  className="absolute left-0 right-0 opacity-75"
                  style={{
                    bottom: "0.08em",
                    height: "0.32em",
                    background: "#D4FF5E",
                    zIndex: -1,
                  }}
                />
              </span>
            </h2>
            <p className="font-body text-[19px] leading-[1.5] text-white/70 max-w-[640px] mx-auto mb-10">
              Job seekers apply for free. Employers post up to 3 jobs for free. No subscriptions, no
              paywalls — just Caribbean talent meeting Caribbean opportunity.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <Button size="lg" variant="secondary" href="/jobs">Find a job</Button>
              <Button size="lg" variant="white" href="/employers">Post a job (free)</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
function JobCard({ job }: { job: LiveJob }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block p-5 bg-white border border-ink rounded-[28px] relative cursor-pointer group transition-all duration-200 hover:-translate-y-0.5"
      style={{ boxShadow: "3px 3px 0 0 #1C1C18" }}
    >
      <div className="flex gap-2 items-center mb-2.5">
        <Eyebrow color="dim">{job.category}</Eyebrow>
        <span className="w-[3px] h-[3px] bg-ink/25 rounded-full" />
        <Eyebrow color="dim">Posted {job.posted}</Eyebrow>
      </div>
      <h4 className="font-display font-semibold text-[19px] uppercase tracking-[-0.028em] leading-[1.05] mb-2 pr-9">
        {job.title}
      </h4>
      <p className="font-body text-xs text-ink/65 mb-3.5 flex items-center gap-1.5">
        <span className="font-bold">{job.company}</span>
        <span className="w-[3px] h-[3px] bg-ink/30 rounded-full" />
        <span>{job.location}</span>
      </p>
      <div className="flex gap-1.5 mb-4 flex-wrap">
        <Tag tone="cream" className="text-[9px] px-2.5 py-1">
          {job.type}
        </Tag>
        {job.remote && (
          <Tag tone="tealfaint" className="text-[9px] px-2.5 py-1">
            Remote
          </Tag>
        )}
      </div>
      <div className="flex justify-between items-center pt-3.5 border-t border-ink/8 mb-3.5">
        <span className="font-body font-bold text-[11px] text-ink">{job.salary}</span>
        <span className="font-body font-bold text-[10px] uppercase tracking-[0.1em] text-teal">
          Closes {job.closing}
        </span>
      </div>
      <div className="flex items-center justify-center gap-2 border border-ink rounded-squircle-sm px-3 py-2 text-[10px] font-body font-bold uppercase tracking-[0.1em] hover:scale-95 transition-transform">
        View role <ArrowUpRight size={12} />
      </div>
    </Link>
  );
}
