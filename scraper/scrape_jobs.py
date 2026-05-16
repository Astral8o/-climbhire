"""
ClimbHire Caribbean — Google Jobs scraper
Scrapes Caribbean job listings and writes them to Supabase.

Setup:
  pip install requests supabase

Usage:
  python scrape_jobs.py
"""

import requests
import os
from supabase import create_client

SUPABASE_URL = "https://lvvfclktjcghqxauohli.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dmZjbGt0amNnaHF4YXVvaGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNDkyNDksImV4cCI6MjA4OTYyNTI0OX0.NzmpYGJyAMw9_ucjp_nSJocBcN91Oj2hwQhC7zHGdR8"

QUERIES = [
    "jobs in Trinidad and Tobago",
    "jobs in Jamaica",
    "jobs in Barbados",
    "jobs in Guyana",
    "jobs in Bahamas",
    "jobs in Saint Lucia",
    "remote jobs Caribbean",
    "finance jobs Trinidad",
    "tech jobs Trinidad",
    "marketing jobs Jamaica",
]

def scrape_google_jobs(query: str) -> list[dict]:
    """Scrape Google Jobs for a query using SerpAPI-compatible free approach."""
    url = "https://www.googleapis.com/customsearch/v1"
    # Using direct Google Jobs search URL scrape
    search_url = f"https://www.google.com/search?q={requests.utils.quote(query)}&ibp=htl;jobs&hl=en"

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }

    try:
        response = requests.get(search_url, headers=headers, timeout=10)
        # Basic parsing — for production use SerpAPI or Oxylabs
        jobs = []
        # Placeholder: returns empty list until real scraper is wired in
        # See README for integration with Oxylabs or SerpAPI
        return jobs
    except Exception as e:
        print(f"Error scraping '{query}': {e}")
        return []


def insert_jobs(jobs: list[dict]):
    """Insert scraped jobs into Supabase, skipping duplicates."""
    if not jobs:
        return

    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    for job in jobs:
        try:
            # Check for duplicate by title + company
            existing = supabase.table("jobs")\
                .select("id")\
                .eq("title", job["title"])\
                .eq("company", job["company"])\
                .execute()

            if existing.data:
                print(f"  Skip (exists): {job['title']} @ {job['company']}")
                continue

            supabase.table("jobs").insert(job).execute()
            print(f"  Inserted: {job['title']} @ {job['company']}")
        except Exception as e:
            print(f"  Error inserting {job.get('title', '?')}: {e}")


def seed_sample_jobs():
    """Insert a set of real-looking Caribbean jobs to seed the database."""
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    sample_jobs = [
        {
            "title": "Financial Analyst",
            "company": "Republic Bank",
            "location": "Port of Spain, Trinidad",
            "type": "full-time",
            "level": "Mid-level",
            "salary": "TTD 8,000–12,000/mo",
            "description": "Analyze financial data, prepare reports, and support strategic decision-making for one of the Caribbean's leading banks.",
            "tags": ["Finance", "Excel", "Reporting", "Banking"],
            "remote": False,
            "posted": "2 days ago",
            "closing": "June 15, 2026",
            "apply_url": "https://republicbank.com/careers",
            "source": "seed",
            "is_featured": True,
        },
        {
            "title": "Software Engineer",
            "company": "Digicel Group",
            "location": "Kingston, Jamaica",
            "type": "full-time",
            "level": "Mid-level",
            "salary": "USD 50,000–70,000/yr",
            "description": "Build and maintain scalable backend services for Digicel's digital products across the Caribbean region.",
            "tags": ["Python", "AWS", "REST APIs", "PostgreSQL"],
            "remote": True,
            "posted": "1 week ago",
            "closing": "June 30, 2026",
            "apply_url": "https://digicelgroup.com/careers",
            "source": "seed",
            "is_featured": True,
        },
        {
            "title": "Marketing Manager",
            "company": "Massy Stores",
            "location": "San Fernando, Trinidad",
            "type": "full-time",
            "level": "Senior",
            "salary": "TTD 15,000–20,000/mo",
            "description": "Lead marketing campaigns across digital and traditional channels for the Caribbean's largest retail group.",
            "tags": ["Marketing", "Digital", "Brand", "Retail"],
            "remote": False,
            "posted": "3 days ago",
            "closing": "June 20, 2026",
            "apply_url": "https://massystores.com/careers",
            "source": "seed",
            "is_featured": False,
        },
        {
            "title": "UX Designer",
            "company": "JMMB Group",
            "location": "Kingston, Jamaica",
            "type": "full-time",
            "level": "Mid-level",
            "salary": "USD 40,000–55,000/yr",
            "description": "Design intuitive digital experiences for JMMB's financial products used by hundreds of thousands of Caribbean customers.",
            "tags": ["Figma", "UX Research", "Prototyping", "Finance"],
            "remote": True,
            "posted": "5 days ago",
            "closing": "June 25, 2026",
            "apply_url": "https://jmmb.com/careers",
            "source": "seed",
            "is_featured": False,
        },
        {
            "title": "Network Engineer",
            "company": "bmobile",
            "location": "Port of Spain, Trinidad",
            "type": "full-time",
            "level": "Senior",
            "salary": "TTD 18,000–24,000/mo",
            "description": "Design and maintain bmobile's LTE and 5G network infrastructure across Trinidad and Tobago.",
            "tags": ["Networking", "LTE", "Cisco", "Telecoms"],
            "remote": False,
            "posted": "1 week ago",
            "closing": "June 18, 2026",
            "apply_url": "https://bmobile.co.tt/careers",
            "source": "seed",
            "is_featured": False,
        },
        {
            "title": "Data Analyst",
            "company": "Guardian Group",
            "location": "Port of Spain, Trinidad",
            "type": "full-time",
            "level": "Entry-level",
            "salary": "TTD 6,000–9,000/mo",
            "description": "Support the actuarial and business intelligence teams with data modelling, dashboards, and ad-hoc analysis.",
            "tags": ["SQL", "Power BI", "Python", "Insurance"],
            "remote": False,
            "posted": "2 weeks ago",
            "closing": "June 10, 2026",
            "apply_url": "https://guardiangroup.com/careers",
            "source": "seed",
            "is_featured": False,
        },
        {
            "title": "HR Business Partner",
            "company": "Sagicor Financial",
            "location": "Bridgetown, Barbados",
            "type": "full-time",
            "level": "Senior",
            "salary": "BBD 70,000–90,000/yr",
            "description": "Partner with business leaders to develop people strategies that support Sagicor's growth across the Caribbean.",
            "tags": ["HR", "Talent", "Strategy", "Finance"],
            "remote": False,
            "posted": "4 days ago",
            "closing": "June 22, 2026",
            "apply_url": "https://sagicor.com/careers",
            "source": "seed",
            "is_featured": False,
        },
        {
            "title": "Frontend Developer",
            "company": "Flow Caribbean",
            "location": "Remote — Caribbean",
            "type": "full-time",
            "level": "Mid-level",
            "salary": "USD 45,000–60,000/yr",
            "description": "Build responsive web and mobile interfaces for Flow's customer-facing products across 17 Caribbean markets.",
            "tags": ["React", "TypeScript", "CSS", "Mobile"],
            "remote": True,
            "posted": "3 days ago",
            "closing": "June 28, 2026",
            "apply_url": "https://discoveryflow.com/careers",
            "source": "seed",
            "is_featured": True,
        },
        {
            "title": "Accountant",
            "company": "PriceSmart Trinidad",
            "location": "Chaguanas, Trinidad",
            "type": "full-time",
            "level": "Mid-level",
            "salary": "TTD 7,000–10,000/mo",
            "description": "Manage accounts payable/receivable, payroll, and monthly financial reporting for PriceSmart's Trinidad operations.",
            "tags": ["Accounting", "QuickBooks", "Payroll", "Retail"],
            "remote": False,
            "posted": "1 week ago",
            "closing": "June 16, 2026",
            "apply_url": "https://pricesmart.com/careers",
            "source": "seed",
            "is_featured": False,
        },
        {
            "title": "Project Manager",
            "company": "National Gas Company of T&T",
            "location": "Point Lisas, Trinidad",
            "type": "full-time",
            "level": "Senior",
            "salary": "TTD 22,000–30,000/mo",
            "description": "Lead cross-functional engineering and construction projects for NGC's natural gas infrastructure expansion.",
            "tags": ["Project Management", "PMP", "Engineering", "Energy"],
            "remote": False,
            "posted": "6 days ago",
            "closing": "June 30, 2026",
            "apply_url": "https://ngc.co.tt/careers",
            "source": "seed",
            "is_featured": False,
        },
    ]

    print(f"Seeding {len(sample_jobs)} Caribbean jobs...")
    insert_jobs(sample_jobs)
    print("Done.")


if __name__ == "__main__":
    seed_sample_jobs()
