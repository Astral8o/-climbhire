import { Job } from "@/lib/supabase";

const typeColors: Record<string, string> = {
  "full-time": "bg-green-50 text-green-700",
  "part-time": "bg-blue-50 text-blue-700",
  contract: "bg-orange-50 text-orange-700",
  internship: "bg-purple-50 text-purple-700",
};

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className={`card flex flex-col gap-4 ${job.is_featured ? "border-brand-200 ring-1 ring-brand-100" : ""}`}>
      {job.is_featured && (
        <div className="flex items-center gap-1.5">
          <span className="badge bg-brand-50 text-brand-700">
            <svg className="mr-1 h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 leading-tight">{job.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{job.company}</p>
        </div>
        <span className={`badge shrink-0 ${typeColors[job.type] ?? "bg-gray-100 text-gray-700"}`}>
          {job.type}
        </span>
      </div>

      <div className="flex flex-wrap gap-3 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {job.location}
        </span>
        {job.salary_range && (
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {job.salary_range}
          </span>
        )}
      </div>

      {job.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.tags.map((tag) => (
            <span key={tag} className="badge bg-gray-100 text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      )}

      <a
        href={job.apply_url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-auto w-full text-center"
      >
        Apply Now
      </a>
    </div>
  );
}
