import { Star, Sparkles } from 'lucide-react';
import { barberProfile } from '../../../data/barber.ts';
import { testimonialsData } from '../../../data/testimonials.ts';
import FadeIn from '../../ui/FadeIn.tsx';

export default function TestimonialsSection() {
  if (!barberProfile.showTestimonials || testimonialsData.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        {/* Inverted Rounded Cream Sheet Container */}
        <div className="rounded-[32px] sm:rounded-[48px] md:rounded-[56px] bg-[#F4F0E8] text-[#0B0B0A] py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-16 lg:px-20 border border-[rgba(11,11,10,0.08)] shadow-2xl relative overflow-hidden">
          {/* Section Header */}
          <FadeIn className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0A]/08 text-[#6E5A37] text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" /> 05 / ĐÁNH GIÁ KHÁCH HÀNG
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0B0B0A] mb-4">
              TÓC ĐẸP. NĂNG LƯỢNG TÍCH CỰC.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#0B0B0A]/70 max-w-lg mx-auto font-light leading-relaxed">
              Cảm nhận thực tế từ những vị khách thân thiết trải nghiệm dịch vụ chăm sóc diện mạo tại studio.
            </p>
          </FadeIn>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {testimonialsData.map((item, index) => (
              <FadeIn
                key={item.id}
                delay={index * 0.1}
                className="bg-white/80 backdrop-blur-sm rounded-[24px] sm:rounded-[32px] p-8 sm:p-10 border border-[rgba(11,11,10,0.06)] shadow-sm flex flex-col justify-between"
              >
                {/* Rating Stars */}
                <div>
                  <div className="flex gap-1 mb-6 text-[#C7A66A]">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg text-[#0B0B0A] font-light leading-relaxed mb-8 italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Client Info */}
                <div className="pt-6 border-t border-[rgba(11,11,10,0.08)] flex items-center justify-between">
                  <span className="font-extrabold uppercase tracking-wider text-sm sm:text-base text-[#0B0B0A]">
                    {item.clientName}
                  </span>
                  {item.service && (
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E5A37] bg-[#6E5A37]/10 px-2.5 py-1 rounded-full">
                      {item.service}
                    </span>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
