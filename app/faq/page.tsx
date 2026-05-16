import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Eyebrow from "@/components/ui/Eyebrow";
import Highlight from "@/components/ui/Highlight";
import { Zap } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <section className="px-7 pt-16 pb-4 border-b border-ink bg-cream">
          <div className="max-w-[980px] mx-auto">
            <Eyebrow className="mb-3 block">§ FAQ</Eyebrow>
            <h1
              className="font-display font-bold uppercase text-ink"
              style={{
                fontSize: "clamp(48px, 7vw, 96px)",
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
              }}
            >
              Questions,{" "}
              <Highlight color="#D4FF5E" delay={0}>
                answered.
              </Highlight>
            </h1>
          </div>
        </section>

        <section className="px-7 py-14 pb-24">
          <div className="max-w-[980px] mx-auto">
            <FAQ />

            {/* Assist CTA */}
            <div
              className="mt-10 bg-lime border border-ink rounded-squircle p-8 flex items-center justify-between gap-6 flex-wrap cursor-pointer hover:-translate-y-0.5 transition-transform"
              style={{ boxShadow: "8px 8px 0 0 #1C1C18" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-ink rounded-[14px] flex items-center justify-center text-lime flex-shrink-0">
                  <Zap size={22} fill="currentColor" />
                </div>
                <div>
                  <div className="font-display font-bold text-[22px] uppercase tracking-[-0.03em] leading-none mb-1">
                    Still curious?
                  </div>
                  <p className="font-body text-[14px] text-ink/70 m-0">
                    Ask ClimbHire Assist — our AI chatbot answers instantly.
                  </p>
                </div>
              </div>
              <div className="font-body font-bold text-[11px] uppercase tracking-[0.12em] flex items-center gap-1.5">
                Open Assist
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7,7 17,7 17,17" />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
