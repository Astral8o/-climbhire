export interface Company {
  id: string;
  name: string;
  initials: string;
  jobs: number;
  industry: string;
  location: string;
  size: string;
  bg: string;
  color: string;
  about: string;
  openRoles: string[];
  benefits: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: string;
  level: string;
  salary: string;
  posted: string;
  closing: string;
  remote: boolean;
  tags: string[];
  description?: string;
}

export const COMPANIES: Company[] = [
  {
    id: "getright",
    name: "Get Right Finance",
    initials: "GR",
    jobs: 12,
    industry: "Financial Services",
    location: "Port of Spain, TT",
    size: "250-500",
    bg: "#1C1C18",
    color: "#D4FF5E",
    about:
      "Get Right Finance is the Caribbean's fastest-growing consumer finance platform, serving 500,000+ customers across 5 islands.",
    openRoles: [
      "Senior UX Designer",
      "Credit Analyst",
      "Mobile Engineer",
      "Risk Manager",
      "Customer Success Lead",
    ],
    benefits: [
      "Hybrid work",
      "Private medical",
      "Annual bonus",
      "13-month salary",
      "Learning stipend",
    ],
  },
  {
    id: "mygg",
    name: "MyGG",
    initials: "GG",
    jobs: 6,
    industry: "Fintech / Payments",
    location: "Kingston, JM",
    size: "80-150",
    bg: "#D4FF5E",
    color: "#1C1C18",
    about:
      "MyGG is a digital wallet and merchant payments platform serving Jamaica, TT and Barbados.",
    openRoles: [
      "Product Manager",
      "Backend Engineer",
      "Compliance Lead",
      "Merchant Partnerships",
    ],
    benefits: ["Full remote", "Stock options", "Unlimited PTO", "Wellness credits"],
  },
  {
    id: "bmobile",
    name: "bmobile",
    initials: "bm",
    jobs: 14,
    industry: "Telecommunications",
    location: "Port of Spain, TT",
    size: "1000+",
    bg: "#70A4A4",
    color: "#fff",
    about:
      "bmobile is Trinidad & Tobago's leading telecommunications provider — voice, data, enterprise and cloud.",
    openRoles: [
      "Network Engineer",
      "Enterprise Account Exec",
      "Cloud Architect",
      "Retail Manager",
      "Data Scientist",
    ],
    benefits: ["Pension plan", "Health & dental", "Staff discounts", "Study leave"],
  },
  {
    id: "digicel",
    name: "Digicel",
    initials: "Dg",
    jobs: 9,
    industry: "Telecommunications",
    location: "Kingston, JM",
    size: "5000+",
    bg: "#1C1C18",
    color: "#fff",
    about:
      "Digicel connects 14 million people across 25 Caribbean and Central American markets with mobile and broadband services.",
    openRoles: [
      "Brand Marketing Manager",
      "Senior iOS Engineer",
      "VP of People",
      "Field Service Tech",
    ],
    benefits: [
      "International mobility",
      "Group life",
      "Employee assistance",
      "Career framework",
    ],
  },
  {
    id: "massy",
    name: "Massy Stores",
    initials: "MS",
    jobs: 18,
    industry: "Retail & Grocery",
    location: "Bridgetown, BB",
    size: "2500+",
    bg: "#fff",
    color: "#1C1C18",
    about:
      "Massy Stores is the Caribbean's largest supermarket chain, with 70+ locations across Trinidad, Barbados, Guyana and St. Lucia.",
    openRoles: [
      "Supply Chain Manager",
      "Category Lead – Fresh",
      "Store Manager",
      "Data Analyst",
      "HR Business Partner",
    ],
    benefits: ["Staff discount", "Pension", "Private medical", "Paid parental leave"],
  },
];

export const JOBS: Job[] = [
  {
    id: "j1",
    title: "Senior UX Designer",
    company: "Get Right Finance",
    location: "Hybrid · Port of Spain",
    category: "Design",
    type: "Full-time",
    level: "Senior",
    salary: "TT$ 18K-24K /mo",
    posted: "2 days ago",
    closing: "May 30",
    remote: false,
    tags: ["Figma", "Design Systems", "Fintech"],
    description: `We're looking for a Senior UX Designer to lead product design across our consumer finance platform. You'll work closely with product managers and engineers to craft experiences that make financial services accessible and joyful for Caribbean users.

**What you'll do**
- Lead end-to-end design for core product flows (onboarding, lending, repayments)
- Run user research and synthesise insights into actionable design decisions
- Maintain and evolve our design system across mobile and web
- Mentor junior designers and establish team best practices

**What we look for**
- 5+ years of product design experience
- Proficiency in Figma and prototyping tools
- Experience designing for mobile-first, emerging-market audiences
- Portfolio demonstrating research-informed design decisions`,
  },
  {
    id: "j2",
    title: "Product Manager",
    company: "MyGG",
    location: "Remote · Caribbean",
    category: "Product",
    type: "Full-time",
    level: "Mid",
    salary: "US$ 65K-85K /yr",
    posted: "1 day ago",
    closing: "May 25",
    remote: true,
    tags: ["B2C", "Payments", "Roadmapping"],
    description: `MyGG is hiring a Product Manager to own our merchant payments product. You'll work with a lean, fully remote team building the infrastructure for Caribbean commerce.

**What you'll do**
- Own the merchant-facing product roadmap from discovery to delivery
- Collaborate with engineering, design, and compliance to ship features
- Define and track KPIs for merchant activation and retention
- Conduct interviews with merchants to surface pain points

**What we look for**
- 3+ years of product management experience
- Background in payments, fintech, or marketplace platforms
- Strong written communication (fully async team)
- Experience with SQL for data analysis`,
  },
  {
    id: "j3",
    title: "Data Analyst",
    company: "Massy Stores",
    location: "Bridgetown, BB",
    category: "Tech",
    type: "Full-time",
    level: "Mid",
    salary: "BB$ 7K-9K /mo",
    posted: "4 days ago",
    closing: "Jun 10",
    remote: false,
    tags: ["SQL", "Looker", "Retail"],
    description: `Join Massy Stores' data team to help drive decisions across 70+ retail locations in the Caribbean.

**What you'll do**
- Build and maintain dashboards in Looker for category managers and executives
- Analyse sales, inventory, and customer data to surface insights
- Partner with merchandising and supply chain on forecasting models
- Own weekly performance reporting across the group

**What we look for**
- 3+ years in a data analyst role
- Strong SQL; Looker or similar BI tool experience
- Retail or FMCG exposure preferred
- Ability to communicate data clearly to non-technical stakeholders`,
  },
  {
    id: "j4",
    title: "Marketing Lead",
    company: "Digicel",
    location: "Kingston, JM",
    category: "Marketing",
    type: "Full-time",
    level: "Senior",
    salary: "JM$ 450K-600K /mo",
    posted: "3 days ago",
    closing: "Jun 05",
    remote: false,
    tags: ["Brand", "Campaigns", "Telco"],
    description: `Lead brand and campaign strategy for Digicel Jamaica's consumer segment.

**What you'll do**
- Develop and execute integrated marketing campaigns across TV, OOH, digital and social
- Manage agency relationships and production budgets
- Own brand tracking and competitive monitoring
- Lead a team of 4 marketing specialists

**What we look for**
- 7+ years in brand or integrated marketing
- Experience in telecoms, FMCG or consumer tech preferred
- Strong creative judgement and brief-writing skills
- Proven track record managing campaigns at scale`,
  },
  {
    id: "j5",
    title: "Network Engineer II",
    company: "bmobile",
    location: "Port of Spain, TT",
    category: "Tech",
    type: "Full-time",
    level: "Mid",
    salary: "TT$ 14K-18K /mo",
    posted: "Today",
    closing: "Jun 12",
    remote: false,
    tags: ["Cisco", "5G", "Linux"],
    description: `Join bmobile's network infrastructure team as we expand our 5G rollout across T&T.

**What you'll do**
- Design, configure and troubleshoot Cisco routing and switching infrastructure
- Support 5G RAN and core network deployment and optimisation
- Monitor network performance and respond to incidents 24/7 (on-call rotation)
- Document network architecture and maintain runbooks

**What we look for**
- CCNP or equivalent; CCNA minimum
- 4+ years in a network engineering role
- Experience with 4G/5G infrastructure a strong advantage
- Linux proficiency`,
  },
  {
    id: "j6",
    title: "Credit Risk Analyst",
    company: "Get Right Finance",
    location: "Port of Spain, TT",
    category: "Finance",
    type: "Full-time",
    level: "Junior",
    salary: "TT$ 9K-12K /mo",
    posted: "5 days ago",
    closing: "Jun 01",
    remote: false,
    tags: ["Credit", "Modeling", "Excel"],
    description: `Get Right Finance is growing its risk team. As Credit Risk Analyst you'll help model and monitor lending risk across our Caribbean portfolio.

**What you'll do**
- Build and maintain credit scorecards and risk models
- Monitor portfolio performance and flag emerging trends
- Support underwriting decisions with data analysis
- Produce monthly risk reports for leadership

**What we look for**
- Degree in Finance, Statistics, Mathematics or related field
- Proficiency in Excel and at least one scripting language (Python, R)
- Understanding of consumer lending fundamentals
- Strong analytical mindset`,
  },
  {
    id: "j7",
    title: "Mobile Engineer (iOS)",
    company: "MyGG",
    location: "Remote · Caribbean",
    category: "Tech",
    type: "Full-time",
    level: "Senior",
    salary: "US$ 90K-120K /yr",
    posted: "1 week ago",
    closing: "Jun 20",
    remote: true,
    tags: ["Swift", "SwiftUI", "Fintech"],
    description: `Build the iOS app that Caribbean merchants and consumers use to send and receive money.

**What you'll do**
- Own iOS app development in Swift and SwiftUI
- Collaborate with product and backend to define and ship new features
- Maintain code quality through code review, testing and documentation
- Optimise app performance and resolve production issues

**What we look for**
- 6+ years iOS development; Swift and SwiftUI fluency
- Experience integrating payment SDKs and working with financial APIs
- Strong understanding of offline-first design patterns
- Published apps in the App Store`,
  },
  {
    id: "j8",
    title: "Brand Designer",
    company: "Digicel",
    location: "Kingston, JM",
    category: "Design",
    type: "Contract",
    level: "Mid",
    salary: "US$ 55K /yr",
    posted: "2 days ago",
    closing: "Jun 08",
    remote: false,
    tags: ["Branding", "Adobe", "Motion"],
    description: `Digicel is looking for a Brand Designer on a 12-month contract to support campaign production.

**What you'll do**
- Create campaign assets for TV, OOH, digital and social channels
- Maintain brand consistency across 25 markets
- Produce motion graphics for digital placements
- Work with agency partners and internal creative teams

**What we look for**
- 4+ years graphic and brand design experience
- Adobe Creative Suite mastery (Illustrator, Photoshop, After Effects)
- Portfolio demonstrating campaign and brand work at scale`,
  },
  {
    id: "j9",
    title: "Category Lead – Fresh",
    company: "Massy Stores",
    location: "Bridgetown, BB",
    category: "Operations",
    type: "Full-time",
    level: "Senior",
    salary: "BB$ 12K-15K /mo",
    posted: "6 days ago",
    closing: "Jun 15",
    remote: false,
    tags: ["Procurement", "FMCG", "Retail"],
    description: `Lead the fresh produce and proteins category for Massy Stores Barbados.

**What you'll do**
- Own category P&L for fresh produce, dairy, meat and seafood
- Manage supplier relationships and negotiate terms
- Drive ranging, pricing and promotional strategy
- Reduce waste and optimise inventory across stores

**What we look for**
- 6+ years in retail buying or category management
- Experience in fresh or perishables categories
- Strong commercial acumen and negotiation skills`,
  },
  {
    id: "j10",
    title: "Customer Success Lead",
    company: "bmobile",
    location: "Hybrid · Port of Spain",
    category: "Customer",
    type: "Full-time",
    level: "Senior",
    salary: "TT$ 16K-20K /mo",
    posted: "3 days ago",
    closing: "Jun 02",
    remote: false,
    tags: ["SaaS", "Telco", "Enterprise"],
    description: `Own the success of bmobile's enterprise accounts — the largest business customers on the network.

**What you'll do**
- Manage a portfolio of 30+ enterprise accounts
- Drive adoption of new services and identify upsell opportunities
- Conduct quarterly business reviews with CTO/CIO-level stakeholders
- Coordinate cross-functionally to resolve escalations quickly

**What we look for**
- 5+ years in customer success, account management or enterprise sales
- Telecoms or managed services background preferred
- Executive-level communication skills`,
  },
  {
    id: "j11",
    title: "VP of People",
    company: "Digicel",
    location: "Kingston, JM",
    category: "People",
    type: "Full-time",
    level: "Lead",
    salary: "US$ 150K+ /yr",
    posted: "Today",
    closing: "Jul 01",
    remote: false,
    tags: ["HRBP", "Culture", "Strategy"],
    description: `Digicel is hiring a VP of People to lead our HR function across 25 markets.

**What you'll do**
- Define and drive people strategy aligned to business goals
- Lead talent acquisition, development, and retention programmes
- Own culture, engagement and D&I initiatives across the group
- Partner with the C-suite to structure and scale the organisation

**What we look for**
- 12+ years HR leadership experience; CHRO or VP level preferred
- Experience managing people functions across multiple geographies
- Track record driving culture transformation at scale`,
  },
  {
    id: "j12",
    title: "Merchant Partnerships",
    company: "MyGG",
    location: "Remote · TT/JM/BB",
    category: "Sales",
    type: "Full-time",
    level: "Mid",
    salary: "US$ 60K + comms",
    posted: "1 week ago",
    closing: "Jun 25",
    remote: true,
    tags: ["BD", "SMB", "Payments"],
    description: `Build MyGG's merchant base across Trinidad, Jamaica and Barbados.

**What you'll do**
- Identify, pitch and onboard SMB merchants onto the MyGG platform
- Own the full sales cycle from outreach to activation
- Develop market-specific go-to-market playbooks
- Work closely with product to feed merchant feedback into the roadmap

**What we look for**
- 3+ years in B2B sales or business development
- Experience selling SaaS or payments products preferred
- Based in TT, JM or BB; willing to travel`,
  },
  {
    id: "j13",
    title: "Junior Frontend Dev",
    company: "Get Right Finance",
    location: "Hybrid · Port of Spain",
    category: "Tech",
    type: "Full-time",
    level: "Junior",
    salary: "TT$ 8K-11K /mo",
    posted: "4 days ago",
    closing: "Jun 14",
    remote: false,
    tags: ["React", "TypeScript"],
    description: `Start your engineering career at one of the Caribbean's fastest-growing fintech companies.

**What you'll do**
- Build and maintain React components for our web and mobile app
- Work alongside senior engineers on feature development and bug fixes
- Write tests and participate in code review
- Learn our product and codebase with structured mentorship

**What we look for**
- 1-2 years experience or strong portfolio projects in React and TypeScript
- Eagerness to learn and grow in a fast-moving team
- Understanding of accessibility and responsive design basics`,
  },
  {
    id: "j14",
    title: "Store Manager – Holetown",
    company: "Massy Stores",
    location: "Holetown, BB",
    category: "Operations",
    type: "Full-time",
    level: "Senior",
    salary: "BB$ 10K-13K /mo",
    posted: "2 days ago",
    closing: "Jun 07",
    remote: false,
    tags: ["Retail", "Ops", "Team lead"],
    description: `Lead all operations for our busy Holetown, Barbados supermarket location.

**What you'll do**
- Manage day-to-day store operations, team scheduling, and P&L
- Drive sales performance and in-store standards
- Develop and mentor a team of 60+ staff
- Ensure compliance with health, safety and food safety regulations

**What we look for**
- 5+ years in retail store management
- Strong leadership and people development skills
- Experience managing high-volume food retail operations`,
  },
  {
    id: "j15",
    title: "Cloud Architect",
    company: "bmobile",
    location: "Port of Spain, TT",
    category: "Tech",
    type: "Full-time",
    level: "Lead",
    salary: "TT$ 28K-35K /mo",
    posted: "1 week ago",
    closing: "Jun 30",
    remote: false,
    tags: ["AWS", "Kubernetes", "Architecture"],
    description: `Design and govern bmobile's multi-cloud infrastructure strategy as we modernise our network and IT estate.

**What you'll do**
- Define cloud architecture standards and patterns across AWS, Azure and GCP
- Lead migration of legacy on-prem workloads to cloud
- Own infrastructure security posture and compliance
- Mentor engineering teams on cloud-native best practices

**What we look for**
- 8+ years in infrastructure or cloud engineering; architecture experience required
- AWS or Azure certifications (Solutions Architect Professional preferred)
- Experience with Kubernetes in production
- Telecoms or regulated industry experience a plus`,
  },
  {
    id: "j16",
    title: "Compliance Lead",
    company: "MyGG",
    location: "Kingston, JM",
    category: "Legal",
    type: "Full-time",
    level: "Senior",
    salary: "JM$ 600K-800K /mo",
    posted: "5 days ago",
    closing: "Jun 18",
    remote: false,
    tags: ["AML", "KYC", "Fintech"],
    description: `Own compliance for MyGG's payments business across the Caribbean.

**What you'll do**
- Build and manage AML/KYC programmes for Jamaica, TT and Barbados operations
- Liaise with regulators (BOJ, TTSEC, CBB) and manage licensing
- Conduct compliance training for the team
- Monitor transaction monitoring systems and handle SARs

**What we look for**
- 6+ years in financial compliance or AML roles
- CAMS certification or equivalent
- Strong knowledge of Caribbean financial regulations
- Fintech or payments experience preferred`,
  },
];

export const FEATURED_JOB_IDS = ["j1", "j2", "j3", "j4", "j5", "j7"];

export const FAQS = [
  {
    q: "Is ClimbHire really free?",
    a: "Yes — ClimbHire Caribbean is completely free for both job seekers and employers. No subscriptions, no paid tiers, no hidden fees.",
  },
  {
    q: "How many jobs can an employer post?",
    a: "Each employer account can post up to three (3) active jobs at any time, free of charge. Once a role is filled or closed, you can post another.",
  },
  {
    q: "Do I need an account to apply?",
    a: "Yes. You must sign in (or create a free account) before applying to any job. This keeps applications fair and lets employers reach you reliably.",
  },
  {
    q: "Where do my applications go?",
    a: "Applications are sent directly to the employer's email inbox. ClimbHire does not store resumes or applicant files on our servers — only the employer receives them.",
  },
  {
    q: "How do company pages get created?",
    a: "Company pages are created automatically during employer onboarding. When a verified employer signs up, their profile is built from the info and logo they provide.",
  },
  {
    q: "Are job posts reviewed?",
    a: "Every job post is manually reviewed by our team. We screen for quality, accuracy and tone before a post goes live to the public.",
  },
  {
    q: "What gets a posting removed?",
    a: "Posts that are offensive, misleading, spam, low-quality or otherwise inappropriate will be removed. Employers who violate our guidelines may be banned from the platform.",
  },
  {
    q: "What is ClimbHire Assist?",
    a: "ClimbHire Assist is our AI chatbot available on the homepage. It helps job seekers navigate the platform, find roles that match their goals, and answer questions about how things work.",
  },
  {
    q: "Do you have remote roles?",
    a: "Yes. A significant share of postings are remote-within-Caribbean or fully global-remote from regional and international companies.",
  },
];

export function getCompanyByName(name: string): Company {
  return COMPANIES.find((c) => c.name === name) ?? COMPANIES[0];
}
