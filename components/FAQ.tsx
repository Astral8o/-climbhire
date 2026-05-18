"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Highlight from "./ui/Highlight";

const FAQS = [
  { q: "Is ClimbHire really free?", a: "Yes — ClimbHire Caribbean is completely free for both job seekers and employers. No subscriptions, no paid tiers, no hidden fees." },
  { q: "How many jobs can an employer post?", a: "Each employer account can post up to three (3) active jobs at any time, free of charge. Once a role is filled or closed, you can post another." },
  { q: "Do I need an account to apply?", a: "Yes. You must sign in (or create a free account) before applying to any job. This keeps applications fair and lets employers reach you reliably." },
  { q: "Where do my applications go?", a: "Applications are sent directly to the employer's email inbox. ClimbHire does not store resumes or applicant files on our servers — only the employer receives them." },
  { q: "How do company pages get created?", a: "Company pages are created automatically during employer onboarding. When a verified employer signs up, their profile is built from the info and logo they provide." },
  { q: "Are job posts reviewed?", a: "Every job post is manually reviewed by our team. We screen for quality, accuracy and tone before a post goes live to the public." },
  { q: "What gets a posting removed?", a: "Posts that are offensive, misleading, spam, low-quality or otherwise inappropriate will be removed. Employers who violate our guidelines may be banned from the platform." },
  { q: "What is ClimbHire Assist?", a: "ClimbHire Assist is our AI chatbot available on the homepage. It helps job seekers navigate the platform, find roles that match their goals, and answer questions about how things work." },
  { q: "Do you have remote roles?", a: "Yes. A significant share of postings are remote-within-Caribbean or fully global-remote from regional and international companies." },
];

export default function FAQ({ faqs = FAQS }: { faqs?: typeof FAQS }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="flex flex-col gap-2.5">
      {faqs.map((f, i) => (
        <div
          key={i}
          className="border border-ink rounded-[22px] overflow-hidden transition-all duration-200"
          style={{
            background: open === i ? "#EDEAE4" : "#fff",
            boxShadow: open === i ? "4px 4px 0 0 #1C1C18" : "none",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full flex justify-between items-center gap-5 px-6 py-5 cursor-pointer bg-transparent border-0 text-left"
          >
            <span
              className="font-display font-bold uppercase text-ink flex-1"
              style={{ fontSize: "clamp(16px, 1.8vw, 21px)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
            >
              {f.q}
            </span>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border border-ink transition-all duration-200"
              style={{
                background: open === i ? "#D4FF5E" : "#fff",
                transform: open === i ? "rotate(45deg)" : "rotate(0)",
              }}
            >
              <Plus size={14} strokeWidth={2.5} />
            </div>
          </button>
          {open === i && (
            <div className="px-6 pb-5 font-body text-[15px] leading-[1.55] text-ink/75">
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
