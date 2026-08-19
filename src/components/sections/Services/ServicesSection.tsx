import { servicesData } from '../../../data/services.ts';
import ServiceItem from './ServiceItem.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-[#F4F0E8] text-[#0B0B0A] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 -mt-10 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-16 sm:mb-20 md:mb-24">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#6E5A37] mb-3">
            02 / SERVICES & PRICING
          </p>
          <h2 className="display-heading text-[#0B0B0A]">
            CUT. STYLE. REFINE.
          </h2>
        </FadeIn>

        {/* Dynamic Services List */}
        <div className="flex flex-col">
          {servicesData.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.08}>
              <ServiceItem service={service} index={index} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
