"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { getSupabaseClient } from "@/lib/supabase";
import { ArrowUpRight, ArrowLeft, Check, Plus, X, Mail } from "lucide-react";

const STEPS = [
  { n: "01", label: "Pricing" },
  { n: "02", label: "Company" },
  { n: "03", label: "Job details" },
  { n: "04", label: "Done" },
];

type CompanyForm = {
  name: string;
  industry: string;
  headquarters: string;
  contactEmail: string;
  about: string;
};

type JobForm = {
  title: string;
  location: string;
  type: string;
  description: string;
  applyUrl: string;
};

function Field({
  label,
  type = "text",
  placeholder,
  textarea,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block font-body font-bold text-[11px] uppercase tracking-[0.12em] text-ink/60 mb-1.5">
        {label}
      </label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border border-ink rounded-[16px] font-body text-[14px] bg-white outline-none focus:ring-2 focus:ring-lime resize-none"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border border-ink rounded-[16px] font-body text-[14px] bg-white outline-none focus:ring-2 focus:ring-lime"
        />
      )}
    </div>
  );
}

function Step01() {
  return (
    <div>
      <h2 className="font-display font-bold text-[40px] uppercase tracking-[-0.04em] leading-[1.05] mb-4">
        List your roles on ClimbHire.
      </h2>
      <p className="font-body text-[17px] leading-[1.55] text-ink/70 mb-8 max-w-[580px]">
        Fill in this 4-step form and we&apos;ll review your submission within 24 hours. Choose a plan below — we&apos;ll invoice you once approved.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-6 bg-lime border-2 border-ink rounded-[24px]" style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}>
          <div className="font-display font-bold text-[48px] tracking-[-0.05em] leading-none mb-1">$599</div>
          <div className="font-body text-[12px] text-ink/60 mb-3">TTD · per package</div>
          <div className="font-display font-bold text-[16px] uppercase tracking-[-0.02em] mb-3">Standard</div>
          <ul className="flex flex-col gap-2">
            {["Up to 3 active listings", "Human review within 24h", "Job seekers click to your site", "Listed until filled or expired"].map((t) => (
              <li key={t} className="flex items-start gap-2 font-body text-[13px]">
                <Check size={13} strokeWidth={2.5} className="mt-0.5 flex-shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 bg-ink text-white border border-ink rounded-[24px]" style={{ boxShadow: "4px 4px 0 0 #00C9B1" }}>
          <div className="font-display font-bold text-[48px] tracking-[-0.05em] leading-none mb-1 text-lime">∞</div>
          <div className="font-body text-[12px] text-white/50 mb-3">Reach out to discuss</div>
          <div className="font-display font-bold text-[16px] uppercase tracking-[-0.02em] mb-3 text-white">Enterprise</div>
          <ul className="flex flex-col gap-2 mb-5">
            {["Unlimited active listings", "Dedicated account manager", "Priority review", "Branded employer profile"].map((t) => (
              <li key={t} className="flex items-start gap-2 font-body text-[13px] text-white/80">
                <Check size={13} strokeWidth={2.5} className="mt-0.5 flex-shrink-0 text-lime" />
                {t}
              </li>
            ))}
          </ul>
          <a
            href="mailto:employers@climbhire.cc"
            className="inline-flex items-center gap-1.5 font-body font-bold text-[10px] uppercase tracking-[0.1em] text-lime border border-lime rounded-squircle-sm px-3 py-2 hover:bg-lime hover:text-ink transition-colors"
          >
            <Mail size={11} /> Contact us
          </a>
        </div>
      </div>

      <p className="font-body text-[12px] text-ink/50">
        Continue below to submit your company info and job details. We&apos;ll review everything and send an invoice to your contact email.
      </p>
    </div>
  );
}

function Step02({ form, setForm }: { form: CompanyForm; setForm: (f: CompanyForm) => void }) {
  function set(key: keyof CompanyForm) {
    return (v: string) => setForm({ ...form, [key]: v });
  }

  return (
    <div>
      <h2 className="font-display font-bold text-[40px] uppercase tracking-[-0.04em] leading-[1.05] mb-2">
        Company profile.
      </h2>
      <p className="font-body text-[16px] text-ink/60 mb-8">
        This becomes your public employer profile on ClimbHire.
      </p>
      <div className="flex flex-col gap-4">
        <Field label="Company name" placeholder="e.g. Sagicor Financial" value={form.name} onChange={set("name")} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Industry" placeholder="e.g. Financial Services" value={form.industry} onChange={set("industry")} />
          <Field label="Headquarters" placeholder="e.g. Port of Spain, TT" value={form.headquarters} onChange={set("headquarters")} />
        </div>
        <Field label="Contact email" type="email" placeholder="hr@yourcompany.com" value={form.contactEmail} onChange={set("contactEmail")} />
        <Field label="About your company" textarea placeholder="What you do and what makes your team great…" value={form.about} onChange={set("about")} />
      </div>
    </div>
  );
}

function Step03({ jobs, setJobs }: { jobs: JobForm[]; setJobs: (j: JobForm[]) => void }) {
  const [draft, setDraft] = useState<JobForm>({ title: "", location: "", type: "Full-time", description: "", applyUrl: "" });

  function setDraftField(key: keyof JobForm) {
    return (v: string) => setDraft((d) => ({ ...d, [key]: v }));
  }

  function addJob() {
    if (!draft.title.trim() || !draft.applyUrl.trim() || jobs.length >= 3) return;
    setJobs([...jobs, { ...draft }]);
    setDraft({ title: "", location: "", type: "Full-time", description: "", applyUrl: "" });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display font-bold text-[40px] uppercase tracking-[-0.04em] leading-[1.05]">
          Job details.
        </h2>
        <div className={`px-3 py-1.5 rounded-squircle-sm border border-ink font-body font-bold text-[10px] uppercase tracking-[0.1em] ${jobs.length >= 3 ? "bg-lime" : "bg-white"}`}>
          {jobs.length} of 3 slots
        </div>
      </div>
      <p className="font-body text-[16px] text-ink/60 mb-8">
        Add up to 3 roles. Candidates will click directly to your own apply link.
      </p>

      {jobs.length > 0 && (
        <div className="flex flex-col gap-2.5 mb-6">
          {jobs.map((j, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 bg-cream border border-ink rounded-2xl">
              <Check size={14} className="text-teal flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-[14px] uppercase tracking-[-0.02em]">{j.title}</div>
                <div className="font-body text-[11px] text-ink/50 truncate">{j.applyUrl}</div>
              </div>
              <button onClick={() => setJobs(jobs.filter((_, idx) => idx !== i))} className="text-ink/40 hover:text-ink transition-colors">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {jobs.length < 3 ? (
        <div className="bg-white border border-ink rounded-[24px] p-6" style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}>
          <div className="flex flex-col gap-4">
            <Field label="Job title" placeholder="e.g. Senior Accountant" value={draft.title} onChange={setDraftField("title")} />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Location" placeholder="e.g. Port of Spain, TT" value={draft.location} onChange={setDraftField("location")} />
              <Field label="Type" placeholder="Full-time" value={draft.type} onChange={setDraftField("type")} />
            </div>
            <Field label="Role description" textarea placeholder="What will this person do? What are you looking for?" value={draft.description} onChange={setDraftField("description")} />
            <Field
              label="Direct apply URL (required)"
              placeholder="https://yourcompany.com/careers/this-role"
              value={draft.applyUrl}
              onChange={setDraftField("applyUrl")}
            />
            <p className="font-body text-[11px] text-ink/50">
              This is where candidates land when they click &ldquo;View Role&rdquo; on ClimbHire — link directly to the specific job post, not a general careers page.
            </p>
            <button
              onClick={addJob}
              disabled={!draft.title.trim() || !draft.applyUrl.trim()}
              className="w-full flex items-center justify-center gap-1.5 py-3 border border-ink rounded-[14px] font-body font-bold text-[11px] uppercase tracking-[0.1em] hover:bg-lime transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={13} /> Add this role
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-lime border border-ink rounded-[24px] p-8 text-center" style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}>
          <div className="font-display font-bold text-[32px] uppercase tracking-[-0.04em] mb-2">All 3 slots filled!</div>
          <p className="font-body text-ink/70">Click Finish to submit your listing for review.</p>
        </div>
      )}
    </div>
  );
}

function Step04({ submitted }: { submitted: boolean }) {
  return (
    <div className="text-center py-8">
      <div
        className="w-20 h-20 bg-lime border-2 border-ink rounded-[24px] flex items-center justify-center mx-auto mb-6"
        style={{ boxShadow: "6px 6px 0 0 #1C1C18" }}
      >
        <Check size={40} strokeWidth={2.5} />
      </div>
      <h2 className="font-display font-bold text-[48px] uppercase tracking-[-0.05em] leading-[0.95] mb-4">
        {submitted ? "Submitted." : "Almost there."}
      </h2>
      <p className="font-body text-[17px] leading-[1.55] text-ink/70 max-w-[480px] mx-auto mb-3">
        {submitted
          ? "We've received your submission and will review it within 24 hours. We'll email you once your roles are live."
          : "Click Finish to send your submission."}
      </p>
      {submitted && (
        <p className="font-body text-[13px] text-ink/50 max-w-[400px] mx-auto mb-10">
          Look out for us at <strong>employers@climbhire.cc</strong>. We&apos;ll include your invoice in that email.
        </p>
      )}
      <div className="flex gap-3 justify-center flex-wrap mt-8">
        <Button variant="outline" href="/">Back to home</Button>
        <Button href="/jobs">Browse live jobs</Button>
      </div>
    </div>
  );
}

export default function EmployerOnboardingPage() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [companyForm, setCompanyForm] = useState<CompanyForm>({ name: "", industry: "", headquarters: "", contactEmail: "", about: "" });
  const [jobs, setJobs] = useState<JobForm[]>([]);

  async function handleFinish() {
    setSubmitting(true);
    try {
      const supabase = getSupabaseClient();
      const slug = companyForm.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 80) || `employer-${Date.now()}`;

      let companyId: string | null = null;
      const { data: existing } = await supabase.from("companies").select("id").eq("slug", slug).single();
      if (existing) {
        companyId = existing.id;
      } else {
        const { data: newCo } = await supabase.from("companies").insert({
          name: companyForm.name || "Unnamed Company",
          slug,
          industry: companyForm.industry || "General",
          tier: "free",
          is_hiring_partner: false,
        }).select("id").single();
        companyId = newCo?.id ?? null;
      }

      if (companyId && jobs.length > 0) {
        await supabase.from("jobs").insert(
          jobs.map((j) => ({
            company_id: companyId,
            title: j.title,
            slug: `${j.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60)}-${slug.slice(0, 20)}-${Date.now()}`,
            summary: j.description,
            employment_type: j.type.toLowerCase().replace(/\s+/g, "-"),
            work_mode: "on-site",
            location: j.location || companyForm.headquarters || "Caribbean",
            industry: companyForm.industry || "General",
            tags: [companyForm.industry || "General"],
            salary_min: 0,
            salary_max: 0,
            salary_currency: "TTD",
            salary_period: "yearly",
            apply_url: j.applyUrl,
            status: "pending",
          }))
        );
      }

      setSubmitted(true);
      setStep(3);
    } catch {
      // still advance — we don't want to block the user
      setSubmitted(false);
      setStep(3);
    } finally {
      setSubmitting(false);
    }
  }

  const steps = [
    () => <Step01 />,
    () => <Step02 form={companyForm} setForm={setCompanyForm} />,
    () => <Step03 jobs={jobs} setJobs={setJobs} />,
    () => <Step04 submitted={submitted} />,
  ];
  const CurrentStep = steps[step];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-cream px-7 py-12">
        <div className="max-w-[860px] mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div>
              <Eyebrow className="block mb-2">§ Employer onboarding</Eyebrow>
              <h1 className="font-display font-bold text-[28px] uppercase tracking-[-0.04em] leading-none m-0">
                List your roles
              </h1>
            </div>
            <Link
              href="/employers"
              className="font-body font-bold text-[10px] uppercase tracking-[0.12em] text-ink/50 hover:text-ink transition-colors flex items-center gap-1.5"
            >
              <X size={12} /> Exit
            </Link>
          </div>

          <div className="flex gap-2.5 mb-10">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="flex items-center gap-2 px-4 py-2.5 border border-ink rounded-squircle-sm font-body font-bold text-[10px] uppercase tracking-[0.1em] transition-all"
                style={{
                  background: i === step ? "#00C9B1" : i < step ? "#1C1C18" : "#fff",
                  color: i < step ? "#00C9B1" : "#1C1C18",
                }}
              >
                <span>{s.n}</span>
                <span className="hidden sm:block">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="bg-white border-2 border-ink rounded-squircle p-8 mb-6" style={{ boxShadow: "8px 8px 0 0 #1C1C18" }}>
            <CurrentStep />
          </div>

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
              {step < 2 ? (
                <Button onClick={() => setStep(step + 1)}>Continue</Button>
              ) : (
                <Button onClick={handleFinish} disabled={submitting || jobs.length === 0}>
                  {submitting ? "Submitting…" : "Finish & Submit"}
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
