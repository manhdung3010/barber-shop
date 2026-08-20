import { useState } from 'react';
import { ChevronDown, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Service } from '../../../types/index.ts';

interface AtelierServiceRowProps {
  service: Service;
  index: number;
  onHover: (image: string | null, title: string | null) => void;
}

export default function AtelierServiceRow({
  service,
  index,
  onHover,
}: AtelierServiceRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div
      onMouseEnter={() => service.image && onHover(service.image, service.name)}
      onMouseLeave={() => onHover(null, null)}
      onFocus={() => service.image && onHover(service.image, service.name)}
      onBlur={() => onHover(null, null)}
      className="group relative border-b border-[rgba(244,240,232,0.12)] py-6 sm:py-8 transition-colors hover:bg-[rgba(244,240,232,0.02)]"
    >
      {/* Primary Row Header (Desktop & Mobile accessible) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        aria-expanded={isExpanded}
        className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
      >
        {/* Left Side: Number + Title + Specs */}
        <div className="flex items-start md:items-center gap-4 sm:gap-6 flex-1">
          <span className="font-mono text-sm sm:text-base font-bold text-[#C7A66A] pt-1 md:pt-0 shrink-0">
            {formattedIndex}
          </span>

          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h3 className="section-item-title text-[#F4F0E8] group-hover:text-[#C7A66A] transition-colors">
                {service.name}
              </h3>
              {service.duration && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#A7A39B] bg-[rgba(244,240,232,0.06)] px-2.5 py-0.5 rounded-full">
                  <Clock className="w-2.5 h-2.5 text-[#C7A66A]" />
                  {service.duration}
                </span>
              )}
            </div>

            <p className="hidden md:block text-sm text-[#A7A39B] font-light mt-1 max-w-xl line-clamp-1">
              {service.description}
            </p>
          </div>
        </div>

        {/* Right Side: Duration (mobile) + Price + Expand Toggle */}
        <div className="flex items-center justify-between md:justify-end gap-6 pl-8 md:pl-0">
          {service.duration && (
            <span className="inline-flex md:hidden items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#A7A39B] bg-[rgba(244,240,232,0.06)] px-2.5 py-0.5 rounded-full">
              <Clock className="w-2.5 h-2.5 text-[#C7A66A]" />
              {service.duration}
            </span>
          )}

          <div className="flex items-center gap-4">
            <span className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#C7A66A]">
              {service.price}
            </span>

            <div
              className={`p-1 rounded-full border border-[rgba(244,240,232,0.15)] text-[#A7A39B] transition-transform duration-300 md:hidden ${
                isExpanded ? 'rotate-180 bg-[#C7A66A] text-[#0B0B0A] border-[#C7A66A]' : ''
              }`}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Inline Detail Expansion */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pl-8 pr-2 space-y-3">
              <p className="text-sm text-[#A7A39B] font-light leading-relaxed">
                {service.description}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#C7A66A]">
                <Sparkles className="w-3 h-3" />
                <span>QUY TRÌNH THIẾT KẾ ĐẶC QUYỀN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
