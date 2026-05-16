export const runtime = "edge";

import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/ui/Eyebrow";
import Tag from "@/components/ui/Tag";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { COMPANIES, JOBS } from "@/lib/data";
import { ArrowLeft, MapPin, Users, Check, ArrowUpRight } from "lucide-react";

export function generateStaticParams() {
  return COMPANIES.map((c) => ({ id: c.id }));
}

export default function CompanyProfilePage({ params }: { params: { id: string } }) {
  const company = COMPANIES.find((c) => c.id === params.id);
  if (!company) notFound();

  const companyJobs = JOBS.filter((j) => j.company === company.name);

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

          {/* Company hero card */}
          <div
            className="bg-white border-2 border-ink rounded-squircle p-8 mb-6"
            style={{ boxShadow: "8px 8px 0 0 #1C1C18" }}
          >
            <div className="flex items-start gap-6 flex-wrap">
              <Avatar
                initials={company.initials}
                size={72}
                bg={company.bg}
                color={company.color}
              />
              <div className="flex-1">
                <Eyebrow className="block mb-2">{company.industry}</Eyebrow>
                <h1
                  className="font-display font-bold uppercase text-ink mb-3"
                  style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  {company.name}
                </h1>
                <div className="flex gap-2 flex-wrap mb-4">
                  <Tag tone="cream" className="text-[9px]">
                    <MapPin size={9} /> {company.location}
                  </Tag>
                  <Tag tone="cream" className="text-[9px]">
                    <Users size={9} /> {company.size} employees
                  </Tag>
                  <Tag tone="lime" className="text-[9px]">
                    {companyJobs.length} open roles
                  </Tag>
                </div>
                <p className="font-body text-[15px] leading-[1.6] text-ink/75 max-w-[600px]">
                  {company.about}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 300px" }}>
            {/* Open roles */}
            <div>
              <Eyebrow color="dim" className="block mb-4">
                {companyJobs.length} open roles
              </Eyebrow>
              <div className="flex flex-col gap-3">
                {companyJobs.map((j) => (
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
                        <span>·</span>
                        <span>{j.type}</span>
                        <span>·</span>
                        <span>{j.level}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Tag tone="cream" className="text-[9px]">
                        {j.category}
                      </Tag>
                      <ArrowUpRight size={16} className="text-ink/40" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">
              {/* Benefits */}
              <div
                className="bg-white border border-ink rounded-squircle p-5"
                style={{ boxShadow: "4px 4px 0 0 #1C1C18" }}
              >
                <Eyebrow className="block mb-4">Benefits</Eyebrow>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                  {company.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-lime border border-ink flex items-center justify-center flex-shrink-0">
                        <Check size={11} strokeWidth={2.5} />
                      </span>
                      <span className="font-body text-sm text-ink/80">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply CTA */}
              <div
                className="bg-ink text-white border border-ink rounded-squircle p-5"
                style={{ boxShadow: "4px 4px 0 0 #D4FF5E" }}
              >
                <Eyebrow color="invert" className="block mb-2.5">
                  Interested?
                </Eyebrow>
                <p className="font-body text-[13px] text-white/70 mb-4 leading-[1.5]">
                  Browse open roles and apply directly — free for everyone.
                </p>
                <Button href="/sign-in" block variant="primary">
                  Apply to a role
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
