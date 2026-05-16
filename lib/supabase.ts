import { createClient } from "@supabase/supabase-js";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  salary: string;
  description: string;
  tags: string[];
  remote: boolean;
  posted: string;
  closing: string;
  apply_url: string;
  source: string;
  is_featured: boolean;
  created_at: string;
};

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}
