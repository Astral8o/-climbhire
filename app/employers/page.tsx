"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import Highlight from "@/components/ui/Highlight";
import Tag from "@/components/ui/Tag";
import Avatar from "@/components/ui/Avatar";
import PanelChrome from "@/components/ui/PanelChrome";
import Button from "@/components/ui/Button";
import { Check, Plus, Mail, AlertTriangle, X } from "lucide-react";

const EMP_FAQS = [
  {
    q: "Is it really free?",
    a: "Yes. There are no listing fees, subscriptions, paid placements or commission on hires. ClimbHire is built as Caribbean public infrastructure for the regional job market.",
  },
  {
    q: "Why up to three active jobs?",
    a: "A hard cap of three live roles per employer keeps the board high-signal for jobseekers and prevents listing spam. Need more for a hiring sprint? Email us and we'll review.",
  },
  {
    q: "How is moderation handled?",
    a: "Every posting is reviewed by a human moderator within 24 hours. We check for legitimacy, clear scope, fair language and basic compensation transparency. Discriminatory or exploitative postings are rejected.",
  },
  {
    q: "Where do applications go?",
    a: "Applications are emailed directly to the address you provide on your employer profile. ClimbHire does not store resumes or applicant data — you own the conversation from first contact.",
  },
  {
    q: "How do I edit or close a posting?",
    a: "Sign in to your employer account at any time to edit, pause, or close a role. Closed roles are removed from search within 5 minutes.",
  },
  {
    q: "Do you support remote and diaspora hiring?",
    a: "Yes. You can post local, regional, hybrid or fully remote roles. Many of our employers explicitly invite diaspora applicants — just tick the box on the posting.",
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="border border-ink rounded-[24px] overflow-hidden transition-shadow duration-200"
      style={{ boxShadow: isOpen ? "4px 4px 0 0 #1C1C18" : "none" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center gap-6 px-6 py-5 bg-transparent border-0 cursor-pointer text-left"
      >
        <h4
          className="font-display font-semibold uppercase text-ink flex-1 m-0"
          style={{ fontSize: 17, letterSpacing: "-0.025em", lineHeight: 1.15 }}
        >
          {q}
        </h4>
        <div
          className="w-[34px] h-[34px] rounded-xl border border-ink flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            background: isOpen ? "#D4FF5E" : "#fff",
            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? 240 : 0 }}
      >
        <div className="px-6 pb-5 pr-[70px] font-body text-[14px] leading-[1.6] text-ink/75">
          {a}
        </div>
      </div>
    </div>
  );
}

export default function EmployersPage() {
  const [openFAQ, setOpenFAQ] = useState(0);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-cream">

        {/* ── Hero ── */}
        <section className="px-7 pt-20 pb-[110px] border-b border-ink relative overflow-hidden">
          <div className="max-w-[1360px] mx-auto grid gap-14 items-center" style={{ gridTemplateColumns: "1.1fr 1fr" }}>
            <div>
              <Eyebrow className="mb-4 block">§ For Employers</Eyebrow>
              <h1
                className="font-display font-bold uppercase text-ink mb-7"
                style={{ fontSize: "clamp(48px, 7vw, 124px)", letterSpacing: "-0.05em", lineHeight: 0.92 }}
              >
                <div>Post jobs.</div>
                <div>Reach the</div>
                <div>
                  Caribbean.{" "}
                  <Highlight color="#D4FF5E" delay={0}>
                    Free.
                  </Highlight>
                </div>
              </h1>
              <p className="font-body font-medium text-[19px] leading-[1.5] text-ink/70 max-w-[540px] mb-7">
                Up to three live roles per employer. Reviewed by a human within 24 hours. Applications emailed straight to your team. No fees, no commission, no catch.
              </p>
              <div className="flex gap-3 flex-wrap mb-7">
                <Button size="lg" href="/employers/onboarding">Post a job</Button>
                <Button size="lg" variant="outline" href="/sign-in">Employer sign in</Button>
              </div>
              <div className="flex gap-4 flex-wrap font-body font-bold text-[11px] uppercase tracking-[0.12em] text-ink/55">
                {["$0 forever", "Up to 3 live roles", "Human-moderated", "24h turnaround"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-1 bg-lime border border-ink" style={{ borderRadius: 4 }} />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <PanelChrome
              label="Console::Post_a_Role"
              status="Preview"
              statusColor="lime"
              shadowClass="shadow-stamp-md"
            >
              <div className="p-5 bg-white">
                <div className="flex items-center gap-2.5 mb-4">
                  <Avatar initials="GR" size={36} bg="#1C1C18" color="#D4FF5E" />
                  <div className="flex-1">
                    <div className="font-display font-bold text-[14px] uppercase tracking-[-0.02em]">
                      Get Right Finance
                    </div>
                    <div className="font-body text-[11px] text-ink/55">
                      Employer console · 2 of 3 slots used
                    </div>
                  </div>
                  <Tag tone="lime" className="text-[9px]">● Verified</Tag>
                </div>
                <Eyebrow color="dim" className="block mb-2.5">Active postings</Eyebrow>
                {[
                  ["Senior UX Designer", "Live · 86 applicants", "live"],
                  ["Backend Engineer", "In review · posted 4h ago", "review"],
                ].map(([t, s, k]) => (
                  <div key={t} className="flex items-center gap-2.5 px-3.5 py-3 bg-cream border border-ink rounded-2xl mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-[13px] uppercase">{t}</div>
                      <div className="font-body text-[10px] text-ink/55">{s}</div>
                    </div>
                    <Tag tone={k === "live" ? "lime" : "cream"} className="text-[8px]">
                      {k === "live" ? "Live" : "Reviewing"}
                    </Tag>
                  </div>
                ))}
                <div className="flex items-center gap-2.5 px-3.5 py-3 bg-white border border-dashed border-ink rounded-2xl">
                  <div className="w-[30px] h-[30px] rounded-[10px] bg-lime border border-ink flex items-center justify-center">
                    <Plus size={14} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-bold text-[13px] uppercase">Open 3rd slot</div>
                    <div className="font-body text-[10px] text-ink/55">One slot remaining</div>
                  </div>
                </div>
              </div>
            </PanelChrome>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="px-7 py-[108px] bg-white border-b border-ink">
          <div className="max-w-[1360px] mx-auto">
            <div className="text-center mb-16">
              <Eyebrow className="mb-3.5 block">§ How it works</Eyebrow>
              <h2
                className="font-display font-semibold uppercase text-ink m-0"
                style={{ fontSize: "clamp(44px, 6vw, 84px)", letterSpacing: "-0.045em", lineHeight: 0.95 }}
              >
                Four steps.{" "}
                <Highlight color="#70A4A4" delay={0}>
                  No invoice.
                </Highlight>
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                ["01", "Create a free account", "Verify your business email and add your company essentials. Takes about 2 minutes."],
                ["02", "Draft your role", "Title, scope, salary band, location. Required salary transparency keeps the board honest."],
                ["03", "Human review · 24h", "A regional moderator checks for clarity, legitimacy and fair scope. We message you if anything needs a tweak."],
                ["04", "Applications by email", "When a candidate applies, their note and resume land in your inbox. We never see it."],
              ].map(([n, t, d]) => (
                <div
                  key={n}
                  className="bg-cream border border-ink rounded-[28px] p-6"
                  style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}
                >
                  <div
                    className="font-display font-bold leading-[0.85] mb-4"
                    style={{
                      fontSize: 72,
                      letterSpacing: "-0.06em",
                      color: n === "03" ? "#D4FF5E" : "#1C1C18",
                      textShadow: n === "03" ? "2px 2px 0 #1C1C18" : "none",
                    }}
                  >
                    {n}
                  </div>
                  <h3 className="font-display font-bold text-[18px] uppercase tracking-[-0.025em] leading-[1.15] mb-2.5">
                    {t}
                  </h3>
                  <p className="font-body text-[13px] leading-[1.55] text-ink/70 m-0">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Moderation Policy ── */}
        <section className="px-7 py-[108px] bg-cream border-b border-ink">
          <div className="max-w-[1360px] mx-auto grid gap-14 items-center" style={{ gridTemplateColumns: "1fr 1.1fr" }}>
            <div>
              <Eyebrow className="mb-3.5 block">§ Moderation policy</Eyebrow>
              <h2
                className="font-display font-bold uppercase text-ink mb-5"
                style={{ fontSize: "clamp(40px, 5vw, 72px)", letterSpacing: "-0.045em", lineHeight: 0.95 }}
              >
                A board you can{" "}
                <Highlight color="#D4FF5E" delay={0}>
                  trust.
                </Highlight>
              </h2>
              <p className="font-body text-[17px] leading-[1.55] text-ink/70 mb-5 max-w-[520px]">
                We keep the board high-signal so candidates stay engaged. Every posting is touched by a person.
              </p>
              <ul className="list-none p-0 m-0 flex flex-col gap-3.5">
                {[
                  ["Salary transparency required", 'Bands must be filled. No “competitive” or “DOE”.'],
                  ["Verified employer identity", "Real business email + light verification on first post."],
                  ["Clear, fair scope", "We reject postings that bundle 3 roles into 1 salary."],
                  ["No discrimination", "Postings that filter on protected characteristics are removed."],
                  ["Three live roles, hard cap", "Keeps employers focused and the board clean."],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-3.5 items-start">
                    <span className="w-7 h-7 rounded-[9px] bg-lime border border-ink flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={13} strokeWidth={2.5} />
                    </span>
                    <div>
                      <div className="font-display font-bold text-[15px] uppercase tracking-[-0.02em]">{t}</div>
                      <div className="font-body text-[13px] text-ink/65 leading-[1.5]">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <PanelChrome
              label="Moderation::Review_Queue"
              status="Reviewing"
              statusColor="lime"
              shadowClass="shadow-stamp-lime-md"
            >
              <div className="p-5 bg-white">
                <div className="flex justify-between items-center mb-3.5">
                  <Eyebrow color="dim">Today · 14 in queue</Eyebrow>
                  <Tag tone="cream" className="text-[9px]">Avg 4h to live</Tag>
                </div>
                {[
                  ["Senior Designer · Digicel", "Approved · live in 12 min", "ok"],
                  ["Sales Lead · Get Right Finance", "Needs salary band", "flag"],
                  ["Backend Eng · MyGG", "Approved · live in 38 min", "ok"],
                  ["Marketing Assistant · *redacted*", "Rejected · unverified employer", "no"],
                ].map(([t, s, k]) => (
                  <div key={t} className="flex items-center gap-2.5 px-3.5 py-3 bg-cream border border-ink rounded-2xl mb-2">
                    <div
                      className="w-[30px] h-[30px] rounded-[10px] border border-ink flex items-center justify-center flex-shrink-0"
                      style={{
                        background: k === "ok" ? "#D4FF5E" : k === "flag" ? "#FFD466" : "#fff",
                      }}
                    >
                      {k === "ok" ? <Check size={13} strokeWidth={2.5} /> : k === "flag" ? <AlertTriangle size={13} /> : <X size={13} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-[12px] uppercase">{t}</div>
                      <div className="font-body text-[10px] text-ink/60">{s}</div>
                    </div>
                  </div>
                ))}
                <div className="p-3.5 bg-ink text-white border border-ink rounded-2xl font-body text-[11px] leading-[1.5] flex gap-2.5 items-start mt-1.5">
                  <span className="text-lime">●</span>
                  <span>
                    <strong className="text-lime">Moderator note:</strong> Each posting is reviewed by a human in the region. No automated approvals.
                  </span>
                </div>
              </div>
            </PanelChrome>
          </div>
        </section>

        {/* ── Why ClimbHire ── */}
        <section className="px-7 py-[108px] bg-white border-b border-ink">
          <div className="max-w-[1100px] mx-auto text-center">
            <Eyebrow className="mb-3.5 block">§ Why ClimbHire</Eyebrow>
            <h2
              className="font-display font-bold uppercase text-ink mb-7"
              style={{ fontSize: "clamp(44px, 6vw, 96px)", letterSpacing: "-0.045em", lineHeight: 0.95 }}
            >
              A board you can{" "}
              <Highlight color="#D4FF5E" delay={0}>
                stand behind.
              </Highlight>
            </h2>
            <p className="font-body text-[19px] leading-[1.55] text-ink/75 max-w-[780px] mx-auto mb-5">
              Your job postings deserve a home that takes them seriously. Every listing on ClimbHire is reviewed by a human, every employer is verified, and every candidate reaches you directly — no resume databases, no recycled applicants, no engagement traps.
            </p>
            <p className="font-body text-[16px] leading-[1.55] text-ink/60 max-w-[680px] mx-auto mb-10">
              We&rsquo;ve built ClimbHire as{" "}
              <strong className="text-ink">safe, reliable Caribbean hiring infrastructure</strong>{" "}
              — so when you list a role here, you can trust that the platform is working with you, not against you.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-[920px] mx-auto">
              {[
                ["Trusted board", "Every employer is verified and every posting is moderated by a real person."],
                ["Reliable reach", "Your roles surface to Caribbean talent across TT, JM, BB, LC, GY and diaspora."],
                ["Real applicants", "Candidates apply with intent. No bots, no recycled resumes, no spam pipelines."],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="p-6 bg-cream border border-ink rounded-[24px] text-left"
                  style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}
                >
                  <div className="w-9 h-9 rounded-[11px] bg-lime border border-ink flex items-center justify-center mb-4">
                    <Check size={16} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-display font-bold text-[18px] uppercase tracking-[-0.025em] mb-2">{t}</h3>
                  <p className="font-body text-[13.5px] leading-[1.55] text-ink/70 m-0">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Employer FAQ ── */}
        <section className="px-7 py-[108px] bg-cream border-b border-ink">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-12">
              <Eyebrow className="mb-3.5 block">§ Employer FAQ</Eyebrow>
              <h2
                className="font-display font-semibold uppercase text-ink m-0"
                style={{ fontSize: "clamp(40px, 5.5vw, 76px)", letterSpacing: "-0.045em", lineHeight: 0.95 }}
              >
                Frequently asked
                <br />
                questions.
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {EMP_FAQS.map((f, i) => (
                <FAQItem
                  key={i}
                  q={f.q}
                  a={f.a}
                  isOpen={openFAQ === i}
                  onToggle={() => setOpenFAQ(openFAQ === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="px-7 py-[108px] bg-lime border-b border-ink text-center relative overflow-hidden">
          <div className="max-w-[900px] mx-auto">
            <Eyebrow color="dim" className="mb-4 block">Ready to hire?</Eyebrow>
            <h2
              className="font-display font-bold uppercase text-ink mb-5"
              style={{ fontSize: "clamp(40px, 5.5vw, 96px)", letterSpacing: "-0.045em", lineHeight: 0.95 }}
            >
              Post your first
              <br />
              role.
            </h2>
            <p className="font-body text-[17px] text-ink/75 max-w-[580px] mx-auto mb-8">
              It costs nothing. It takes about two minutes. A human reviewer reads it within a day.
            </p>
            <div className="flex justify-center gap-3.5 flex-wrap mb-8">
              <Button size="lg" variant="secondary" href="/employers/onboarding">
                Post a job (free)
              </Button>
              <Button size="lg" variant="white" href="/sign-in">
                Employer sign in
              </Button>
            </div>
            <div
              className="inline-flex items-center gap-2.5 px-5 py-3 bg-white border border-ink rounded-[18px] font-mono text-[13px]"
              style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}
            >
              <Mail size={15} />
              employers@climbhirecaribbean.com
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
