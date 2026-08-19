import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { servicesData } from '../../../data/services.ts';
import ServiceCard from './ServiceCard.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Measure scroll progress across the whole services stacking container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-8 md:px-12 bg-[#0B0B0A]"
    >
      <div className="max-w-6xl mx-auto">
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

        {/* Sticky Stacking Cards Container */}
        <div className="flex flex-col w-full">
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
    </section>
  );
}
