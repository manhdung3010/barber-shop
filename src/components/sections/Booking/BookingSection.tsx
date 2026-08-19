import { barberProfile } from '../../../data/barber.ts';
import Button from '../../ui/Button.tsx';
import Magnet from '../../ui/Magnet.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function BookingSection() {
  return (
    <section id="contact" className="py-28 sm:py-36 md:py-48 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A] relative overflow-hidden">
      {/* Background Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C7A66A]/05 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeIn>
          <p className="eyebrow mb-4">07 / ĐẶT LỊCH HẸN NGAY</p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#F4F0E8] mb-8 leading-[0.95]">
            SẴN SÀNG CHO MỘT DIỆN MẠO MỚI?
          </h2>
          <p className="body-editorial max-w-xl mx-auto mb-12">
            Chọn phong cách bạn muốn, hẹn trước khung giờ phù hợp và để Master Barber chăm sóc trọn vẹn phần còn lại.
          </p>
        </FadeIn>

        {/* Primary Magnetic CTA */}
        <FadeIn delay={0.2} className="flex justify-center mb-16">
          <Magnet strength={18}>
            <Button
              href={barberProfile.booking.primaryUrl}
              variant="primary"
              size="lg"
              className="px-10 sm:px-14 py-5 text-base sm:text-lg shadow-2xl shadow-[#C7A66A]/20"
            >
              {barberProfile.booking.primaryLabel}
            </Button>
          </Magnet>
        </FadeIn>

        {/* Secondary Direct Channels */}
        {barberProfile.booking.secondaryChannels && (
          <FadeIn delay={0.3} className="pt-10 border-t border-[rgba(244,240,232,0.12)]">
            <span className="text-xs uppercase tracking-widest text-[#A7A39B] block mb-6">
              HOẶC LIÊN HỆ TRỰC TIẾP QUA CÁC KÊNH
            </span>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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
