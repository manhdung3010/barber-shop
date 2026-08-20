import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

interface MarqueeTickerProps {
  items?: string[];
  speedSeconds?: number;
  direction?: 'left' | 'right';
  className?: string;
}

const DEFAULT_ITEMS = [
  'FADE SẮC NÉT',
  'CẮT TÓC THIẾT KẾ',
  'TEXTURED CROP HIỆN ĐẠI',
  'UỐN PHỒNG CHUẨN FORM',
  'CLASSIC LỊCH LÃM',
  'TỈA RÂU ĐẲNG CẤP',
  'TRẢI NGHIỆM 1-ON-1',
  'TÁC PHẨM THAY LỜI NÓI',
];

export default function MarqueeTicker({
  items = DEFAULT_ITEMS,
  speedSeconds = 35,
  direction = 'left',
  className = '',
}: MarqueeTickerProps) {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return (
      <div className={`overflow-x-auto py-3.5 sm:py-4 border-y border-[rgba(244,240,232,0.12)] bg-[#0E0E0D] ${className}`}>
        <div className="flex items-center gap-8 px-6 whitespace-nowrap">
          {items.map((item, idx) => (
            <span key={idx} className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#C7A66A]">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  const animationDirection = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';

  return (
    <div
      className={`relative overflow-hidden py-3.5 sm:py-4.5 border-y border-[rgba(244,240,232,0.12)] bg-[#0B0B0A] select-none ${className}`}
      aria-hidden="true"
    >
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0B0B0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0B0B0A] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max group hover:[animation-play-state:paused]">
        {/* Track 1 */}
        <div
          className={`flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12 ${animationDirection}`}
          style={{ animationDuration: `${speedSeconds}s` }}
        >
          {items.map((item, idx) => (
            <div key={`t1-${idx}`} className="flex items-center gap-8 sm:gap-12">
              <span className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.25em] text-[#F4F0E8] hover:text-[#C7A66A] transition-colors">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]/60" />
            </div>
          ))}
        </div>

        {/* Track 2 for seamless infinite loop */}
        <div
          className={`flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12 ${animationDirection}`}
          style={{ animationDuration: `${speedSeconds}s` }}
        >
          {items.map((item, idx) => (
            <div key={`t2-${idx}`} className="flex items-center gap-8 sm:gap-12">
              <span className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.25em] text-[#F4F0E8] hover:text-[#C7A66A] transition-colors">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]/60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
