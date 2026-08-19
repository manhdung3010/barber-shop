import { barberProfile } from '../../../data/barber.ts';
import { testimonialsData } from '../../../data/testimonials.ts';
import TestimonialCard from './TestimonialCard.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function TestimonialsSection() {
  if (!barberProfile.showTestimonials || testimonialsData.length === 0) {
    return null;
  }

  return (
    <section
      className="bg-[#F4F0E8] text-[#0B0B0A] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 -mt-10 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16 sm:mb-20">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#6E5A37] mb-3">
            05 / CLIENTS
          </p>
          <h2 className="display-heading text-[#0B0B0A]">
            GOOD HAIR. GOOD ENERGY.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.map((item) => (
            <FadeIn key={item.id}>
              <TestimonialCard item={item} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
