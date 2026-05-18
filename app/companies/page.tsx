"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import Highlight from "@/components/ui/Highlight";
import Tag from "@/components/ui/Tag";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { getSupabaseClient } from "@/lib/supabase";
import { ArrowUpRight, MapPin, Users } from "lucide-react";

type LiveCompany = {
  id: string;
  name: string;
  slug: string;
  industry: string | null;
  logo_url: string | null;
  jobCount: number;
};

const BG_COLORS = ["#D4FF5E", "#5ECFFF", "#FFB347", "#B5A8FF", "#FF7F7F", "#5EFF9B"];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function bgForName(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff;
  return BG_COLORS[hash % BG_COLORS.length];
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<LiveCompany[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = getSupabaseClient();
        const { data: cos } = await supabase
          .from("companies")
          .select("id, name, slug, industry, logo_url")
          .order("name", { ascending: true });

        if (!cos) { setLoading(false); return; }

        const withCounts = await Promise.all(
          cos.map(async (c) => {
            const { count } = await supabase
              .from("jobs")
              .select("id", { count: "exact", head: true })
              .eq("company_id", c.id)
              .eq("status", "published");
            return { ...c, jobCount: count ?? 0 };
          })
        );

        setCompanies(withCounts);
      } catch {}
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-cream">
        <section className="px-7 pt-16 pb-14 border-b border-ink">
          <div className="max-w-[1360px] mx-auto">
            <Eyebrow className="mb-3 block">§ Companies</Eyebrow>
            <h1
              className="font-display font-bold uppercase text-ink"
              style={{ fontSize: "clamp(48px, 7vw, 96px)", letterSpacing: "-0.05em", lineHeight: 0.95 }}
            >
              Verified{" "}
              <Highlight color="#D4FF5E" delay={0}>employers.</Highlight>
            </h1>
            <p className="font-body font-medium text-lg text-ink/70 mt-4 max-w-[520px]">
              Every company on ClimbHire has been verified and their postings reviewed by a human moderator.
            </p>
          </div>
        </section>

        <section className="px-7 py-12 pb-24">
          <div className="max-w-[1360px] mx-auto">
            <Eyebrow color="dim" className="block mb-6">
              {loading ? "Loading employers…" : `${companies.length} verified employers`}
            </Eyebrow>

            {!loading && companies.length === 0 && (
              <div className="py-16 text-center bg-white border border-dashed border-ink rounded-[28px]">
                <h4 className="font-display text-2xl uppercase mb-2">No companies yet</h4>
                <p className="font-body text-ink/60">Check back soon — employers are being added.</p>
              </div>
            )}

            <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
              {companies.map((c) => {
                const bg = bgForName(c.name);
                return (
                  <Link
                    key={c.id}
                    href={`/companies/${c.id}`}
                    className="block bg-white border border-ink rounded-squircle p-6 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar initials={initials(c.name)} size={52} bg={bg} color="#1C1C18" />
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-bold text-[20px] uppercase tracking-[-0.03em] leading-none mb-1.5">
                          {c.name}
                        </div>
                        <div className="font-body text-[12px] text-ink/55">{c.industry ?? "General"}</div>
                      </div>
                      <Tag tone="lime" className="text-[9px] flex-shrink-0">{c.jobCount} roles</Tag>
                    </div>
                    <div className="flex items-center justify-end pt-4 border-t border-ink/10">
                      <div className="flex items-center gap-1 font-body font-bold text-[10px] uppercase tracking-[0.1em] text-teal">
                        View <ArrowUpRight size={11} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div
              className="mt-12 bg-ink text-white border border-ink rounded-squircle p-8 flex items-center justify-between gap-6 flex-wrap"
              style={{ boxShadow: "8px 8px 0 0 #D4FF5E" }}
            >
              <div>
                <Eyebrow color="invert" className="mb-2 block">For employers</Eyebrow>
                <h3 className="font-display font-bold text-[28px] uppercase tracking-[-0.04em] text-white m-0">
                  Get your company listed. Free.
                </h3>
              </div>
              <Button href="/employers/onboarding" size="lg">Post a job (free)</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
