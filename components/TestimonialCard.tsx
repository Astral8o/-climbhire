import { Testimonial } from "@/lib/supabase";
import Image from "next/image";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="card flex flex-col gap-4">
      <svg className="h-8 w-8 text-brand-200" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
      </svg>
      <p className="text-gray-600 leading-relaxed">{testimonial.quote}</p>
      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-50">
        {testimonial.avatar_url ? (
          <Image
            src={testimonial.avatar_url}
            alt={testimonial.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold text-sm">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
          <p className="text-xs text-gray-500">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
