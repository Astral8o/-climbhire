import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

// Demo profile type
type Profile = {
  id: string;
  full_name: string;
  headline: string;
  location: string;
  bio: string;
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
};

const DEMO_PROFILE: Profile = {
  id: "1",
  full_name: "Candice Williams",
  headline: "Senior Software Engineer · 7 years experience",
  location: "Port of Spain, Trinidad & Tobago",
  bio: "I build fast, accessible web products that people actually want to use. Spent 4 years at Guardian Group modernising their insurance platform, before moving to a fintech startup where I led front-end architecture across 3 product lines. I care deeply about code quality, clear communication, and shipping things that matter.",
  skills: ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL", "GraphQL", "Figma", "System Design"],
  open_to_work: true,
  job_type_preference: "Full-time · Open to remote",
  salary_expectation: "TTD 18,000 – 25,000/mo",
  experience: [
    {
      role: "Senior Frontend Engineer",
      company: "Fintech Startup (Confidential)",
      period: "2022 – Present",
      description: "Led front-end architecture for 3 product lines. Reduced bundle size by 42%, improved Lighthouse scores from 58 to 94, and introduced a component library adopted across 5 teams.",
    },
    {
      role: "Software Engineer",
      company: "Guardian Group",
      period: "2018 – 2022",
      description: "Built and maintained the customer-facing insurance portal serving 300,000+ users. Migrated legacy jQuery codebase to React, cutting page load times by 3×.",
    },
  ],
  education: [
    { degree: "B.Sc. Computer Science",    institution: "University of the West Indies, St. Augustine", year: "2018" },
    { degree: "AWS Certified Solutions Architect", institution: "Amazon Web Services", year: "2021" },
  ],
};

async function getProfile(id: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from("seeker_profiles").select("*").eq("id", id).single();
    if (error || !data) return DEMO_PROFILE;
    return data as Profile;
  } catch { return DEMO_PROFILE; }
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const profile = await getProfile(params.id);
  if (!profile) return null;

  const initials = profile.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">

        {/* ── Profile header ── */}
        <div className="bg-forest-800">
          <div className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-6">
                {/* Avatar */}
                {profile.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white/10"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-lime text-forest-800 font-heading text-3xl font-bold ring-4 ring-white/10">
                    {initials}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                      {profile.full_name}
                    </h1>
                    {profile.open_to_work && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                        Open to Work
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-white/70">{profile.headline}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-white/50">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                    </svg>
                    {profile.location}
                  </p>
                </div>
              </div>

              {/* Contact CTA */}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-primary shrink-0"
                >
                  Contact {profile.full_name.split(" ")[0]}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Left: main content */}
            <div className="space-y-8 lg:col-span-2">

              {/* About */}
              <div className="card">
                <h2 className="font-heading text-xl font-bold text-forest-800">About</h2>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
              </div>

              {/* Experience */}
              <div className="card">
                <h2 className="font-heading text-xl font-bold text-forest-800">Experience</h2>
                <div className="mt-6 space-y-8">
                  {profile.experience.map((exp, i) => (
                    <div key={i} className="relative flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald mt-1.5 shrink-0" />
                        {i < profile.experience.length - 1 && (
                          <div className="mt-2 w-px flex-1 bg-gray-100" />
                        )}
                      </div>
                      <div className="pb-8">
                        <h3 className="font-heading font-bold text-forest-800">{exp.role}</h3>
                        <div className="mt-0.5 flex items-center gap-2 text-sm">
                          <span className="text-gray-700">{exp.company}</span>
                          <span className="text-gray-300">·</span>
                          <span className="text-gray-400">{exp.period}</span>
                        </div>
                        <p className="mt-3 text-sm text-gray-500 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="card">
                <h2 className="font-heading text-xl font-bold text-forest-800">Education</h2>
                <div className="mt-6 space-y-5">
                  {profile.education.map((edu, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-800 text-lime">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-forest-800 text-sm">{edu.degree}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{edu.institution} · {edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: sidebar */}
            <div className="space-y-6">

              {/* Work preferences */}
              <div className="card">
                <h3 className="font-heading font-bold text-forest-800">Work Preferences</h3>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">Type</dt>
                    <dd className="mt-1 text-sm text-gray-700">{profile.job_type_preference}</dd>
                  </div>
                  {profile.salary_expectation && (
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">Salary expectation</dt>
                      <dd className="mt-1 text-sm text-gray-700">{profile.salary_expectation}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Skills */}
              <div className="card">
                <h3 className="font-heading font-bold text-forest-800">Skills</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span key={skill} className="badge-gray">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Employer CTA */}
              <div className="rounded-2xl bg-lime p-6">
                <p className="font-heading font-bold text-forest-800">Interested in {profile.full_name.split(" ")[0]}?</p>
                <p className="mt-2 text-xs text-forest-700">Post a role or reach out directly to start a conversation.</p>
                <div className="mt-5 flex flex-col gap-2">
                  <a href="mailto:hello@climbhire.com" className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-700 transition-colors">
                    Contact via ClimbHire
                  </a>
                  <a href="/for-employers" className="btn-outline-dark w-full justify-center text-sm">
                    Post a Job
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
