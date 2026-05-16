"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import { ArrowUpRight, ArrowLeft, Camera, Check, Plus, X } from "lucide-react";

const STEPS = [
  { n: "01", label: "Welcome" },
  { n: "02", label: "Company profile" },
  { n: "03", label: "Post a job" },
  { n: "04", label: "Done" },
];

function Step01() {
  return (
    <div>
      <h2 className="font-display font-bold text-[40px] uppercase tracking-[-0.04em] leading-[1.05] mb-4">
        Welcome to ClimbHire Caribbean.
      </h2>
      <p className="font-body text-[17px] leading-[1.55] text-ink/70 mb-8 max-w-[580px]">
        You&apos;re about to join the Caribbean&apos;s free job board. This 4-step setup takes about 2 minutes and gets your company page live.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-lime border border-ink rounded-[24px]" style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}>
          <div className="font-display font-bold text-[48px] tracking-[-0.05em] leading-none mb-2">$0</div>
          <div className="font-display font-bold text-[16px] uppercase tracking-[-0.02em] mb-1.5">Forever free</div>
          <div className="font-body text-[13px] text-ink/70">No fees, subscriptions, or commissions. Ever.</div>
        </div>
        {[
          ["3 live roles", "Post up to 3 active roles at any time."],
          ["Human review", "Every posting reviewed within 24h."],
          ["Email delivery", "Applications go straight to your inbox."],
        ].map(([t, d]) => (
          <div key={t} className="p-6 bg-white border border-ink rounded-[24px]" style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}>
            <div className="w-8 h-8 rounded-[10px] bg-lime border border-ink flex items-center justify-center mb-3">
              <Check size={15} strokeWidth={2.5} />
            </div>
            <div className="font-display font-bold text-[16px] uppercase tracking-[-0.02em] mb-1.5">{t}</div>
            <div className="font-body text-[13px] text-ink/70">{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, type = "text", placeholder, textarea }: { label: string; type?: string; placeholder?: string; textarea?: boolean }) {
  return (
    <div>
      <label className="block font-body font-bold text-[11px] uppercase tracking-[0.12em] text-ink/60 mb-1.5">
        {label}
      </label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          rows={4}
          className="w-full px-4 py-3 border border-ink rounded-[16px] font-body text-[14px] bg-white outline-none focus:ring-2 focus:ring-lime resize-none"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-ink rounded-[16px] font-body text-[14px] bg-white outline-none focus:ring-2 focus:ring-lime"
        />
      )}
    </div>
  );
}

function Step02() {
  return (
    <div>
      <h2 className="font-display font-bold text-[40px] uppercase tracking-[-0.04em] leading-[1.05] mb-2">
        Company profile.
      </h2>
      <p className="font-body text-[16px] text-ink/60 mb-8">
        This becomes your public company page on ClimbHire.
      </p>
      <div className="grid gap-6" style={{ gridTemplateColumns: "140px 1fr" }}>
        <div>
          <label className="block font-body font-bold text-[11px] uppercase tracking-[0.12em] text-ink/60 mb-1.5">
            Logo
          </label>
          <div className="w-[140px] h-[140px] border-2 border-dashed border-ink rounded-[20px] flex flex-col items-center justify-center gap-2 cursor-pointer bg-cream hover:bg-white transition-colors relative">
            <Camera size={24} className="text-ink/40" />
            <span className="font-body text-[11px] text-ink/40">Upload logo</span>
            <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-lime border border-ink rounded-full flex items-center justify-center">
              <Plus size={13} strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Field label="Company name" placeholder="e.g. Get Right Finance" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Industry" placeholder="e.g. Financial Services" />
            <Field label="Company size" placeholder="e.g. 100-500" />
          </div>
          <Field label="Headquarters" placeholder="e.g. Port of Spain, Trinidad" />
          <Field label="Contact email" type="email" placeholder="hr@yourcompany.com" />
          <Field label="About your company" textarea placeholder="Describe what you do and what makes your team great…" />
        </div>
      </div>
      <p className="font-body text-[12px] text-ink/50 mt-4">
        Your company page is published automatically when you complete this step.
      </p>
    </div>
  );
}

function Step03() {
  const [jobs, setJobs] = useState<string[]>([]);
  const [title, setTitle] = useState("");

  const addJob = () => {
    if (title.trim() && jobs.length < 3) {
      setJobs([...jobs, title.trim()]);
      setTitle("");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display font-bold text-[40px] uppercase tracking-[-0.04em] leading-[1.05]">
          Post a job.
        </h2>
        <Tag tone={jobs.length < 3 ? "cream" : "lime"}>
          {jobs.length} of 3 slots used
        </Tag>
      </div>
      <p className="font-body text-[16px] text-ink/60 mb-8">
        Optional — you can add roles now or later from your employer dashboard.
      </p>

      {jobs.length > 0 && (
        <div className="flex flex-col gap-2.5 mb-6">
          {jobs.map((j, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 bg-cream border border-ink rounded-2xl">
              <Check size={14} className="text-teal flex-shrink-0" />
              <span className="font-display font-bold text-[14px] uppercase tracking-[-0.02em] flex-1">{j}</span>
              <button
                onClick={() => setJobs(jobs.filter((_, idx) => idx !== i))}
                className="text-ink/40 hover:text-ink transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {jobs.length < 3 ? (
        <div className="bg-white border border-ink rounded-[24px] p-6" style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}>
          <div className="flex flex-col gap-4">
            <Field label="Job title" placeholder="e.g. Senior UX Designer" />
            <div className="grid grid-cols-3 gap-4">
              <Field label="Location" placeholder="e.g. Port of Spain, TT" />
              <Field label="Type" placeholder="Full-time" />
              <Field label="Level" placeholder="Senior" />
            </div>
            <Field label="Salary band (required)" placeholder="e.g. TT$ 18,000–24,000/mo" />
            <Field label="Role description" textarea placeholder="What will this person do? What are you looking for?" />
            <Button onClick={addJob} variant="outline" block showArrow={false}>
              + Add this job
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-lime border border-ink rounded-[24px] p-8 text-center" style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}>
          <div className="font-display font-bold text-[32px] uppercase tracking-[-0.04em] mb-2">All 3 slots filled!</div>
          <p className="font-body text-ink/70">You&apos;ve reached the maximum 3 active roles. Close a role to post a new one.</p>
        </div>
      )}
    </div>
  );
}

function Step04() {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-lime border-2 border-ink rounded-[24px] flex items-center justify-center mx-auto mb-6" style={{ boxShadow: "6px 6px 0 0 #1C1C18" }}>
        <Check size={40} strokeWidth={2.5} />
      </div>
      <h2 className="font-display font-bold text-[48px] uppercase tracking-[-0.05em] leading-[0.95] mb-4">
        You&apos;re live.
      </h2>
      <p className="font-body text-[17px] leading-[1.55] text-ink/70 max-w-[480px] mx-auto mb-3">
        Your company page is published and your jobs are in moderation. A human reviewer will check them within 24 hours.
      </p>
      <p className="font-body text-[13px] text-ink/50 max-w-[400px] mx-auto mb-10">
        You&apos;ll receive a confirmation email once each role goes live. Look out for us at <strong>employers@climbhirecaribbean.com</strong>.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Button href="/companies/getright">View company page</Button>
        <Button variant="outline" href="/">Back to home</Button>
      </div>
    </div>
  );
}

export default function EmployerOnboardingPage() {
  const [step, setStep] = useState(0);

  const steps = [Step01, Step02, Step03, Step04];
  const CurrentStep = steps[step];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-cream px-7 py-12">
        <div className="max-w-[860px] mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <Eyebrow className="block mb-2">§ Employer onboarding</Eyebrow>
              <h1 className="font-display font-bold text-[28px] uppercase tracking-[-0.04em] leading-none m-0">
                Set up your account
              </h1>
            </div>
            <Link
              href="/employers"
              className="font-body font-bold text-[10px] uppercase tracking-[0.12em] text-ink/50 hover:text-ink transition-colors flex items-center gap-1.5"
            >
              <X size={12} /> Exit onboarding
            </Link>
          </div>

          {/* Progress pills */}
          <div className="flex gap-2.5 mb-10">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="flex items-center gap-2 px-4 py-2.5 border border-ink rounded-squircle-sm font-body font-bold text-[10px] uppercase tracking-[0.1em] transition-all"
                style={{
                  background: i === step ? "#D4FF5E" : i < step ? "#1C1C18" : "#fff",
                  color: i < step ? "#D4FF5E" : "#1C1C18",
                }}
              >
                <span>{s.n}</span>
                <span className="hidden sm:block">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Step content */}
          <div
            className="bg-white border-2 border-ink rounded-squircle p-8 mb-6"
            style={{ boxShadow: "8px 8px 0 0 #1C1C18" }}
          >
            <CurrentStep />
          </div>

          {/* Nav */}
          {step < 3 && (
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                showArrow={false}
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
              >
                <ArrowLeft size={13} /> Back
              </Button>
              <Button
                onClick={() => setStep(Math.min(3, step + 1))}
              >
                {step === 2 ? "Finish" : "Continue"}
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
