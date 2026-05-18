"""
ClimbHire Caribbean — Google Jobs scraper via SerpAPI
Pulls real Caribbean job listings with direct apply URLs into Supabase.

Setup:
  pip install google-search-results supabase

Run:
  python scraper/scrape_jobs.py

SerpAPI docs: https://serpapi.com/google-jobs-api
Each job result includes apply_options[] with direct links to the
specific job post on LinkedIn, Indeed, company site, etc.
"""

import time
import re
from serpapi import GoogleSearch
from supabase import create_client

SERPAPI_KEY = "YOUR_SERPAPI_KEY_HERE"

SUPABASE_URL = "https://lvvfclktjcghqxauohli.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dmZjbGt0amNnaHF4YXVvaGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNDkyNDksImV4cCI6MjA4OTYyNTI0OX0.NzmpYGJyAMw9_ucjp_nSJocBcN91Oj2hwQhC7zHGdR8"

# Each tuple: (search query, location, gl country code)
QUERIES = [
    ("jobs",                        "Trinidad and Tobago", "tt"),
    ("finance jobs",                "Trinidad and Tobago", "tt"),
    ("technology jobs",             "Trinidad and Tobago", "tt"),
    ("engineering jobs",            "Trinidad and Tobago", "tt"),
    ("healthcare jobs",             "Trinidad and Tobago", "tt"),
    ("marketing jobs",              "Trinidad and Tobago", "tt"),
    ("management jobs",             "Trinidad and Tobago", "tt"),
    ("jobs",                        "Jamaica",             "jm"),
    ("finance jobs",                "Jamaica",             "jm"),
    ("technology jobs",             "Jamaica",             "jm"),
    ("jobs",                        "Barbados",            "bb"),
    ("jobs",                        "Guyana",              "gy"),
    ("jobs",                        "Bahamas",             "bs"),
    ("remote jobs Caribbean",       "Trinidad and Tobago", "tt"),
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


def parse_salary(job: dict) -> tuple:
    salary_str = ""
    detected = job.get("detected_extensions", {})
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
    detected = job.get("detected_extensions", {})
    if detected.get("work_from_home", False):
        return "remote"
    text = (job.get("title", "") + " " + job.get("description", "")).lower()
    if "remote" in text:
        return "remote"
    if "hybrid" in text:
        return "hybrid"
    return "on-site"


def parse_employment_type(job: dict) -> str:
    detected = job.get("detected_extensions", {})
    sched = (detected.get("schedule_type", "") or "").lower()
    if "part" in sched:
        return "part-time"
    if "contract" in sched:
        return "contract"
    if "intern" in sched:
        return "internship"
    return "full-time"


def get_apply_url(job: dict) -> str:
    """
    SerpAPI returns apply_options[] — each item has a direct link to the
    specific job post (LinkedIn, Indeed, company ATS, etc.).
    We prefer LinkedIn/Indeed/company-direct over generic career pages.
    """
    options = job.get("apply_options", [])
    if not options:
        return ""

    # Priority order: direct company link > LinkedIn > Indeed > first available
    for opt in options:
        title = (opt.get("title", "") or "").lower()
        link = opt.get("link", "") or ""
        if link and "linkedin" not in link and "indeed" not in link and "glassdoor" not in link:
            return link  # company's own ATS / careers page with direct post

    for opt in options:
        link = opt.get("link", "") or ""
        if "linkedin.com" in link:
            return link

    for opt in options:
        link = opt.get("link", "") or ""
        if "indeed.com" in link:
            return link

    return options[0].get("link", "")


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


def scrape_query(query: str, location: str, gl: str) -> list:
    """Fetch jobs from SerpAPI Google Jobs for one query."""
    try:
        search = GoogleSearch({
            "engine": "google_jobs",
            "q": query,
            "location": location,
            "google_domain": "google.tt",
            "hl": "en",
            "gl": gl,
            "api_key": SERPAPI_KEY,
        })
        results = search.get_dict()
        return results.get("jobs_results", [])
    except Exception as e:
        print(f"  SerpAPI error for '{query}' in {location}: {e}")
        return []


def insert_job(supabase, job: dict, company_id: str) -> bool:
    title = job.get("title", "").strip()
    company_name = job.get("company_name", "").strip()
    slug_base = re.sub(r"[^a-z0-9]+", "-", (title + "-" + company_name).lower()).strip("-")
    slug = slug_base[:80]

    if job_exists(supabase, slug):
        return False

    salary_min, salary_max, currency, period = parse_salary(job)
    description = job.get("description", "")
    apply_url = get_apply_url(job)
    tags = extract_tags(title, description)

    # Print the apply URL so you can spot-check it during the run
    print(f"    apply_url: {apply_url or '(none)'}")

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
            "apply_url": apply_url,
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

    for query, location, gl in QUERIES:
        print(f"\nScraping: '{query}' in {location}")
        jobs = scrape_query(query, location, gl)
        print(f"  Found {len(jobs)} listings")

        for job in jobs:
            company_name = job.get("company_name", "").strip()
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

        time.sleep(1.5)  # be gentle with the API

    print(f"\nDone. {total_inserted} new jobs added to Supabase.")


if __name__ == "__main__":
    main()
