import { Star } from 'lucide-react';
import { Testimonial } from '../../../types/index.ts';

interface TestimonialCardProps {
  item: Testimonial;
}

export default function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <div className="p-8 sm:p-10 rounded-3xl border border-[rgba(11,11,10,0.12)] bg-white/40 backdrop-blur-sm flex flex-col justify-between">
      <div>
        {/* 5-Star Rating */}
        <div className="flex items-center gap-1 text-[#6E5A37] mb-6">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#6E5A37]" />
          ))}
        </div>
        <p className="text-base sm:text-lg md:text-xl font-light text-[#0B0B0A] leading-relaxed mb-6">
          "{item.quote}"
        </p>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#0B0B0A]">
          {item.clientName}
        </span>
        {item.service && (
          <span className="block text-[11px] uppercase tracking-wider text-[#6E5A37] mt-0.5">
            {item.service}
          </span>
        )}
      </div>
    </div>
  );
}
