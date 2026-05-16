"""
ClimbHire Caribbean — Google Jobs scraper via Serper.dev
Pulls real Caribbean job listings and writes them into Supabase.

Setup:
  pip install requests supabase

Run:
  python scraper/scrape_jobs.py
"""

import requests
import time
import re
from supabase import create_client

SERPER_KEY = "bb2bf9dbf29dc5c8a72bf9b7867164e35409c476"

SUPABASE_URL = "https://lvvfclktjcghqxauohli.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dmZjbGt0amNnaHF4YXVvaGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNDkyNDksImV4cCI6MjA4OTYyNTI0OX0.NzmpYGJyAMw9_ucjp_nSJocBcN91Oj2hwQhC7zHGdR8"

# (query, country_code) pairs — gl targets Google Jobs to that country
QUERIES = [
    ("jobs in Trinidad",        "tt"),
    ("jobs in Jamaica",         "jm"),
    ("jobs in Barbados",        "bb"),
    ("jobs in Guyana",          "gy"),
    ("jobs in Bahamas",         "bs"),
    ("jobs in Saint Lucia",     "lc"),
    ("jobs in Grenada",         "gd"),
    ("jobs in Antigua",         "ag"),
    ("remote jobs Caribbean",   "tt"),
    ("finance jobs Trinidad",   "tt"),
    ("tech jobs Trinidad",      "tt"),
    ("engineering jobs Trinidad","tt"),
    ("marketing jobs Jamaica",  "jm"),
    ("accounting jobs Barbados","bb"),
    ("healthcare jobs Trinidad","tt"),
    ("management jobs Caribbean","tt"),
]

INDUSTRY_MAP = {
    "engineer": "Technology", "developer": "Technology", "software": "Technology",
    "data": "Technology", "it ": "Technology", "tech": "Technology", "network": "Technology",
    "finance": "Banking & Finance", "financial": "Banking & Finance", "accountant": "Banking & Finance",
    "accounting": "Banking & Finance", "bank": "Banking & Finance", "analyst": "Banking & Finance",
    "audit": "Banking & Finance", "actuari": "Banking & Finance",
    "market": "Marketing", "brand": "Marketing", "digital": "Marketing", "content": "Marketing",
    "sales": "Sales", "business development": "Sales",
    "hr": "Human Resources", "human resource": "Human Resources", "talent": "Human Resources",
    "recruit": "Human Resources", "people": "Human Resources",
    "health": "Healthcare", "nurse": "Healthcare", "doctor": "Healthcare", "medical": "Healthcare",
    "pharmacist": "Healthcare", "clinical": "Healthcare",
    "legal": "Legal", "lawyer": "Legal", "attorney": "Legal", "compliance": "Legal",
    "project manager": "Management", "operations": "Management", "manager": "Management",
    "director": "Management", "executive": "Management",
    "teacher": "Education", "education": "Education", "lecturer": "Education",
    "design": "Design", "ux": "Design", "ui": "Design", "graphic": "Design",
    "logistic": "Logistics", "supply chain": "Logistics", "procurement": "Logistics",
    "energy": "Energy", "oil": "Energy", "gas": "Energy", "petroleum": "Energy",
}


def guess_industry(title: str) -> str:
    t = title.lower()
    for keyword, industry in INDUSTRY_MAP.items():
        if keyword in t:
            return industry
    return "General"


def guess_level(title: str, description: str = "") -> str:
    text = (title + " " + description).lower()
    if any(w in text for w in ["senior", "sr.", "lead", "principal", "head of", "director", "vp ", "chief"]):
        return "Senior"
    if any(w in text for w in ["junior", "jr.", "entry", "graduate", "intern", "trainee"]):
        return "Entry-level"
    return "Mid-level"


def parse_salary(job: dict) -> tuple:
    """Extract salary_min, salary_max, currency, period from a Serper job."""
    salary_str = ""

    detected = job.get("detectedExtensions", {})
    salary_str = detected.get("salary", "") or ""

    if not salary_str:
        for ext in job.get("extensions", []):
            if any(c in ext for c in ["$", "€", "£", "TTD", "JMD", "BBD", "USD"]):
                salary_str = ext
                break

    if not salary_str:
        return 0, 0, "USD", "yearly"

    currency = "USD"
    if "TTD" in salary_str:
        currency = "TTD"
    elif "JMD" in salary_str:
        currency = "JMD"
    elif "BBD" in salary_str:
        currency = "BBD"
    elif "GYD" in salary_str:
        currency = "GYD"
    elif "XCD" in salary_str:
        currency = "XCD"

    period = "yearly"
    low = salary_str.lower()
    if any(w in low for w in ["month", "/mo", "per month"]):
        period = "monthly"
    elif any(w in low for w in ["hour", "/hr", "per hour"]):
        period = "hourly"

    nums = re.findall(r"[\d,]+(?:\.\d+)?", salary_str.replace(",", ""))
    nums = [int(float(n)) for n in nums if n]

    if len(nums) >= 2:
        return min(nums), max(nums), currency, period
    if len(nums) == 1:
        return nums[0], nums[0], currency, period

    return 0, 0, currency, period


def parse_work_mode(job: dict) -> str:
    detected = job.get("detectedExtensions", {})
    if detected.get("workFromHome", False):
        return "remote"
    text = (job.get("title", "") + job.get("description", "")).lower()
    if "remote" in text:
        return "remote"
    if "hybrid" in text:
        return "hybrid"
    return "on-site"


def parse_employment_type(job: dict) -> str:
    detected = job.get("detectedExtensions", {})
    sched = (detected.get("scheduleType", "") or "").lower()
    if "part" in sched:
        return "part-time"
    if "contract" in sched:
        return "contract"
    if "intern" in sched:
        return "internship"
    return "full-time"


def get_apply_url(job: dict) -> str:
    links = job.get("relatedLinks", [])
    if links:
        return links[0].get("link", "")
    return job.get("link", "")


def extract_tags(title: str, description: str) -> list:
    tag_keywords = [
        "Python", "Java", "SQL", "Excel", "Power BI", "Tableau", "Figma",
        "React", "JavaScript", "TypeScript", "AWS", "Azure", "GCP",
        "QuickBooks", "SAP", "Salesforce", "HubSpot", "Google Ads",
        "PMP", "Agile", "Scrum", "ACCA", "CPA", "CFA",
        "AutoCAD", "MATLAB", "Cisco", "Linux",
        "HR", "Payroll", "Recruitment", "Training",
        "Marketing", "Finance", "Accounting", "Legal", "Compliance",
    ]
    text = title + " " + (description[:500] if description else "")
    found = [t for t in tag_keywords if t.lower() in text.lower()]
    found.append(guess_industry(title))
    return list(dict.fromkeys(found))[:8]


def get_or_create_company(supabase, company_name: str):
    if not company_name:
        return None

    slug = re.sub(r"[^a-z0-9]+", "-", company_name.lower()).strip("-")

    result = supabase.table("companies").select("id").eq("slug", slug).execute()
    if result.data:
        return result.data[0]["id"]

    new_co = supabase.table("companies").insert({
        "name": company_name,
        "slug": slug,
        "industry": "General",
        "tier": "free",
        "is_hiring_partner": False,
    }).execute()

    if new_co.data:
        return new_co.data[0]["id"]
    return None


def job_exists(supabase, slug: str) -> bool:
    result = supabase.table("jobs").select("id").eq("slug", slug).execute()
    return bool(result.data)


def scrape_query(query: str, gl: str) -> list:
    """Fetch jobs from Serper.dev for one query."""
    try:
        resp = requests.post(
            "https://google.serper.dev/jobs",
            headers={
                "X-API-KEY": SERPER_KEY,
                "Content-Type": "application/json",
            },
            json={"q": query, "gl": gl},
            timeout=30,
        )
        resp.raise_for_status()
        data = resp.json()
        return data.get("jobs", [])
    except Exception as e:
        print(f"  Serper error for '{query}': {e}")
        return []


def insert_job(supabase, job: dict, company_id: str) -> bool:
    title = job.get("title", "").strip()
    company_name = job.get("companyName", "").strip()
    slug_base = re.sub(r"[^a-z0-9]+", "-", (title + "-" + company_name).lower()).strip("-")
    slug = slug_base[:80]

    if job_exists(supabase, slug):
        return False

    salary_min, salary_max, currency, period = parse_salary(job)
    description = job.get("description", "")
    tags = extract_tags(title, description)

    try:
        supabase.table("jobs").insert({
            "company_id": company_id,
            "title": title,
            "slug": slug,
            "summary": description[:600] if description else "",
            "employment_type": parse_employment_type(job),
            "work_mode": parse_work_mode(job),
            "location": job.get("location", "Caribbean"),
            "industry": guess_industry(title),
            "tags": tags,
            "salary_min": salary_min,
            "salary_max": salary_max,
            "salary_currency": currency,
            "salary_period": period,
            "apply_url": get_apply_url(job),
            "status": "published",
            "published_at": "now()",
            "expires_at": "now() + interval '60 days'",
        }).execute()
        return True
    except Exception as e:
        print(f"    Insert error: {e}")
        return False


def main():
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    total_inserted = 0

    for query, gl in QUERIES:
        print(f"\nScraping: '{query}' (gl={gl})")
        jobs = scrape_query(query, gl)
        print(f"  Found {len(jobs)} listings")

        for job in jobs:
            company_name = job.get("companyName", "").strip()
            if not company_name:
                continue

            company_id = get_or_create_company(supabase, company_name)
            if not company_id:
                continue

            inserted = insert_job(supabase, job, company_id)
            status = "+" if inserted else "~"
            print(f"  [{status}] {job.get('title')} @ {company_name}")
            if inserted:
                total_inserted += 1

        time.sleep(1)

    print(f"\nDone. {total_inserted} new jobs added to Supabase.")


if __name__ == "__main__":
    main()
