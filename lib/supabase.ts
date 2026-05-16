import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export type DbJob = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  employment_type: string;
  work_mode: string;
  location: string;
  industry: string;
  tags: string[];
  salary_min: number;
  salary_max: number;
  salary_currency: string;
  salary_period: string;
  apply_url: string;
  status: string;
  published_at: string;
  expires_at: string;
  is_urgent: boolean;
  companies: {
    name: string;
    slug: string;
    logo_url: string | null;
    industry: string;
  };
};

export function formatSalary(job: DbJob): string {
  if (!job.salary_min && !job.salary_max) return "Competitive";
  const fmt = (n: number) =>
    job.salary_period === "yearly"
      ? `${(n / 1000).toFixed(0)}k`
      : n.toLocaleString();
  const period = job.salary_period === "yearly" ? "/yr" : "/mo";
  return `${job.salary_currency} ${fmt(job.salary_min)}–${fmt(job.salary_max)}${period}`;
}

export function formatExpiry(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString("en-TT", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function formatPosted(isoDate: string): string {
  try {
    const diff = Date.now() - new Date(isoDate).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 14) return "1 week ago";
    return `${Math.floor(days / 7)} weeks ago`;
  } catch {
    return "";
  }
}
