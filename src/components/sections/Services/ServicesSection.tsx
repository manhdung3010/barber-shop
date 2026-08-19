import { useRef, useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { servicesData } from '../../../data/services.ts';
import ServiceCard from './ServiceCard.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Measure scroll progress across the whole services stacking container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track active card for the side progress indicator
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const step = 1 / servicesData.length;
      const index = Math.min(
        servicesData.length - 1,
        Math.floor(latest / step)
      );
      setActiveCardIndex(index);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-8 md:px-12 bg-[#0B0B0A]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center mb-16 sm:mb-20 md:mb-24">
          <p className="eyebrow mb-3">02 / SERVICES & PRICING</p>
          <h2 className="display-heading text-[#F4F0E8] mb-4">
            CUT. STYLE. REFINE.
          </h2>
          <p className="body-editorial max-w-xl mx-auto">
            Scroll through our individual signature grooming offerings, tailored to your head structure and lifestyle.
          </p>
        </FadeIn>

        {/* Main Content Layout with Sticky Side Progress Indicator */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Desktop Sticky Vertical Progress Indicator */}
          <div className="hidden lg:block lg:col-span-2 sticky top-36 z-20">
            <div className="flex flex-col gap-6 py-6 border-l border-[rgba(244,240,232,0.15)] pl-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A7A39B]">
                INDEX
              </span>
              {servicesData.map((service, idx) => {
                const isActive = activeCardIndex === idx;
                return (
                  <div
                    key={service.id}
                    className={`flex items-center gap-3 transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-bold tracking-wider ${
                        isActive ? 'text-[#C7A66A]' : 'text-[#F4F0E8]'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div
                      className={`h-[2px] transition-all duration-300 rounded-full ${
                        isActive
                          ? 'w-10 bg-[#C7A66A]'
                          : 'w-4 bg-[rgba(244,240,232,0.3)]'
                      }`}
                    />
                    <span
                      className={`text-[11px] uppercase tracking-wider font-semibold truncate max-w-[100px] ${
                        isActive ? 'text-[#F4F0E8]' : 'text-[#A7A39B]'
                      }`}
                    >
                      {service.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Stacking Cards Container */}
          <div className="lg:col-span-10 flex flex-col w-full">
            {servicesData.map((service, index) => {
              // Target scale calculation: deeper cards scale down slightly more
              const targetScale = 1 - (servicesData.length - index) * 0.035;
              const range: [number, number] = [
                index * (1 / servicesData.length),
                1,
              ];

              return (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                  total={servicesData.length}
                  progress={scrollYProgress}
                  range={range}
                  targetScale={targetScale}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
