import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import Highlight from "@/components/ui/Highlight";
import Tag from "@/components/ui/Tag";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { COMPANIES, JOBS } from "@/lib/data";
import { ArrowUpRight, MapPin, Users } from "lucide-react";
export default function CompaniesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-cream">
        {/* Header */}
        <section className="px-7 pt-16 pb-14 border-b border-ink">
          <div className="max-w-[1360px] mx-auto">
            <Eyebrow className="mb-3 block">§ Companies</Eyebrow>
            <h1
              className="font-display font-bold uppercase text-ink"
              style={{
                fontSize: "clamp(48px, 7vw, 96px)",
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
              }}
            >
              Verified{" "}
              <Highlight color="#D4FF5E" delay={0}>
                employers.
              </Highlight>
            </h1>
            <p className="font-body font-medium text-lg text-ink/70 mt-4 max-w-[520px]">
              Every company on ClimbHire has been verified and their postings reviewed by a human moderator.
            </p>
          </div>
        </section>
        {/* Company grid */}
        <section className="px-7 py-12 pb-24">
          <div className="max-w-[1360px] mx-auto">
            <Eyebrow color="dim" className="block mb-6">
              {COMPANIES.length} verified employers
            </Eyebrow>
            <div
              className="grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}
            >
              {COMPANIES.map((c) => {
                const companyJobs = JOBS.filter((j) => j.company === c.name);
                return (
                  <Link
                    key={c.id}
                    href={`/companies/${c.id}`}
                    className="block bg-white border border-ink rounded-squircle p-6 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar
                        initials={c.initials}
                        size={52}
                        bg={c.bg}
                        color={c.color}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-display font-bold text-[20px] uppercase tracking-[-0.03em] leading-none mb-1.5">
                          {c.name}
                        </div>
                        <div className="font-body text-[12px] text-ink/55">{c.industry}</div>
                      </div>
                      <Tag tone="lime" className="text-[9px] flex-shrink-0">
                        {companyJobs.length} roles
                      </Tag>
                    </div>
                    <p className="font-body text-[13px] text-ink/65 leading-[1.5] mb-4 line-clamp-2">
                      {c.about}
                    </p>
                    <div className="flex items-center gap-4 text-[11px] font-body text-ink/50 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {c.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={11} /> {c.size}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-ink/10">
                      <div className="flex gap-1.5">
                        {c.benefits.slice(0, 2).map((b) => (
                          <Tag key={b} tone="cream" className="text-[9px]">
                            {b}
                          </Tag>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 font-body font-bold text-[10px] uppercase tracking-[0.1em] text-teal">
                        View <ArrowUpRight size={11} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            {/* CTA for employers */}
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
              <Button href="/employers/onboarding" size="lg">
                Post a job (free)
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
