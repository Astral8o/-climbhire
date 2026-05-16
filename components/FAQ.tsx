"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "@/lib/data";
import Highlight from "./ui/Highlight";

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
