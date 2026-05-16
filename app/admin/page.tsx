import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream p-8">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink text-lime">
          <ArrowUpRight size={32} />
        </div>
        <h1 className="font-display font-bold text-[28px] uppercase tracking-[-0.04em] text-ink">
          ClimbHire Admin
        </h1>
        <p className="mt-3 font-body text-sm text-ink/60">
          The admin dashboard is coming soon.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-lime text-ink border border-ink rounded-squircle-sm px-5 py-3 font-body font-bold text-[11px] uppercase tracking-[0.1em] hover:scale-95 transition-transform"
        >
          Back to Site <ArrowUpRight size={12} />
        </Link>
      </div>
    </div>
  );
}
