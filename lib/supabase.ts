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
  is_published?: boolean;
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

export type SeekerProfile = {
  id: string;
  full_name: string;
  headline: string;
  location: string;
  bio?: string;
  avatar_url?: string;
  email?: string;
  linkedin_url?: string;
  skills: string[];
  open_to_work: boolean;
  job_type_preference: string;
  salary_expectation?: string;
  experience: {
    role: string;
    company: string;
    period: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  is_public: boolean;
  created_at: string;
};
