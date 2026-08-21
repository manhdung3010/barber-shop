'use client';
import { barberProfile } from '../../../data/barber';
import Button from '../../ui/Button';
import Magnet from '../../ui/Magnet';
import FadeIn from '../../ui/FadeIn';

export default function BookingSection() {
  return (
    <section id="contact" className="py-14 sm:py-18 md:py-24 px-4 sm:px-6 md:px-8 lg:px-10 bg-[#0B0B0A] relative overflow-hidden">
      {/* Background Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C7A66A]/05 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeIn>
          <p className="plate-meta mb-2.5 sm:mb-3">07 // ĐẶT LỊCH HẸN NGAY</p>
          <h2 className="display-heading text-[#F4F0E8] mb-4 sm:mb-6">
            SẴN SÀNG CHO MỘT DIỆN MẠO MỚI?
          </h2>
          <p className="body-editorial max-w-xl mx-auto mb-6 sm:mb-8">
            Chọn phong cách bạn muốn, hẹn trước khung giờ phù hợp và để Master Barber chăm sóc trọn vẹn phần còn lại.
          </p>
        </FadeIn>

        {/* Primary Magnetic CTA */}
        <FadeIn delay={0.2} className="flex justify-center mb-8 sm:mb-10">
          <Magnet strength={18}>
            <Button
              href={barberProfile.booking.primaryUrl}
              variant="primary"
              size="lg"
              className="px-8 sm:px-12 py-4 text-sm sm:text-base shadow-2xl shadow-[#C7A66A]/20"
            >
              {barberProfile.booking.primaryLabel}
            </Button>
          </Magnet>
        </FadeIn>

        {/* Secondary Direct Channels */}
        {barberProfile.booking.secondaryChannels && (
          <FadeIn delay={0.3} className="pt-6 sm:pt-8 border-t border-[rgba(244,240,232,0.12)]">
            <span className="text-xs uppercase tracking-widest text-[#A7A39B] block mb-4">
              HOẶC LIÊN HỆ TRỰC TIẾP QUA CÁC KÊNH
            </span>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {barberProfile.booking.secondaryChannels.map((channel, i) => (
                <Button
                  key={i}
                  href={channel.url}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  {channel.label}
                </Button>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

