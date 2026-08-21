'use client';
import { Star } from 'lucide-react';
import { barberProfile } from '../../../data/barber';
import { testimonialsData } from '../../../data/testimonials';
import BeforeAfterSlider from '../../ui/BeforeAfterSlider';
import FadeIn from '../../ui/FadeIn';

export default function TestimonialsSection() {
  if (!barberProfile.showTestimonials || testimonialsData.length === 0) {
    return null;
  }

  return (
    <section id="proof" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center mb-8 sm:mb-12">
          <p className="plate-meta mb-2.5 sm:mb-3">05 // BẰNG CHỨNG & BIẾN ĐỔI DIỆN MẠO</p>
          <h2 className="display-heading text-[#F4F0E8] mb-3 sm:mb-4">
            TÓC ĐẸP. NĂNG LƯỢNG TÍCH CỰC.
          </h2>
          <p className="body-editorial max-w-lg mx-auto">
            Cảm nhận thực tế và sự chuyển hóa phong độ từ những vị khách thân thiết trải nghiệm dịch vụ tại studio.
          </p>
        </FadeIn>

        {/* Optional Interactive Before/After Transformation Layer */}
        {barberProfile.showBeforeAfter && barberProfile.beforeAfter && (
          <FadeIn delay={0.1} className="mb-10 sm:mb-14 max-w-4xl mx-auto">
            <BeforeAfterSlider data={barberProfile.beforeAfter} />
          </FadeIn>
        )}

        {/* Inverted Rounded Cream Sheet for Testimonial Cards */}
        <div className="rounded-[24px] sm:rounded-[36px] md:rounded-[44px] bg-[#F4F0E8] text-[#0B0B0A] py-7 sm:py-12 md:py-14 px-4 sm:px-8 md:px-10 border border-[rgba(11,11,10,0.08)] shadow-2xl relative overflow-hidden">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#6E5A37] bg-[#6E5A37]/10 px-3 py-1 rounded-full">
              LỜI CHIA SẺ TỪ KHÁCH HÀNG
            </span>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonialsData.map((item, index) => {
              const initial = item.clientName.replace(/^Anh\s+/i, '').charAt(0) || 'K';

              return (
                <FadeIn
                  key={item.id}
                  delay={index * 0.1}
                  className="bg-white/90 backdrop-blur-sm rounded-[20px] sm:rounded-[24px] p-5 sm:p-7 border border-[rgba(11,11,10,0.06)] shadow-sm flex flex-col justify-between"
                >
                  {/* Rating Stars & Quote Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-1 text-[#C7A66A]">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6E5A37]/80 bg-[#6E5A37]/08 px-2 py-0.5 rounded-full">
                        5.0 ★
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-[#0B0B0A]/90 font-light leading-relaxed mb-6 italic">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Client Info with Avatar */}
                  <div className="pt-4 border-t border-[rgba(11,11,10,0.08)] flex items-center gap-3">
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt={item.clientName}
                        className="w-10 h-10 rounded-full object-cover border border-[#6E5A37]/30 shrink-0 shadow-sm"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#6E5A37]/12 border border-[#6E5A37]/20 text-[#6E5A37] font-mono font-extrabold text-xs flex items-center justify-center shrink-0 shadow-inner">
                        {initial}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="font-extrabold uppercase tracking-wide text-xs sm:text-sm text-[#0B0B0A] truncate">
                        {item.clientName}
                      </span>
                      {item.service && (
                        <span className="text-[11px] font-medium text-[#6E5A37] flex items-center gap-1.5 truncate mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A] shrink-0" />
                          <span className="truncate">{item.service}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

