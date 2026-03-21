import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  salary_range?: string;
  description: string;
  tags: string[];
  apply_url: string;
  is_featured: boolean;
  created_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar_url?: string;
  quote: string;
  created_at: string;
};
