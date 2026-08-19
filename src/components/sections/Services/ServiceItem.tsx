import { ArrowUpRight } from 'lucide-react';
import { Service } from '../../../types/index.ts';

interface ServiceItemProps {
  service: Service;
  index: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export default function ServiceItem({
  service,
  index,
  onHoverStart,
  onHoverEnd,
}: ServiceItemProps) {
  const formattedNumber = String(index + 1).padStart(2, '0');

  return (
    <div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(11,11,10,0.15)] transition-colors hover:bg-[rgba(11,11,10,0.03)] px-4 sm:px-6 rounded-2xl cursor-default"
    >
      {/* Index Number */}
      <div className="text-4xl sm:text-6xl md:text-7xl font-black text-[#0B0B0A]/30 group-hover:text-[#0B0B0A] transition-colors md:w-32 mb-4 md:mb-0">
        {formattedNumber}
      </div>

      {/* Service Details */}
      <div className="flex-1 md:px-8">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-[#0B0B0A]">
            {service.name}
          </h3>
          {service.duration && (
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#6E5A37] bg-[#6E5A37]/10 px-2.5 py-1 rounded-full">
              {service.duration}
            </span>
          )}
        </div>
        <p className="text-sm sm:text-base font-light text-[#0B0B0A]/70 max-w-xl">
          {service.description}
        </p>
      </div>

      {/* Price & Action */}
      <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0">
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#0B0B0A]">
          {service.price}
        </span>
        <div className="p-2 rounded-full border border-[rgba(11,11,10,0.2)] group-hover:border-[#0B0B0A] group-hover:bg-[#0B0B0A] group-hover:text-[#F4F0E8] transition-all">
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
}
