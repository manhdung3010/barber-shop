import { MapPin, Clock, Phone, ArrowUpRight } from 'lucide-react';
import { barberProfile } from '../../../data/barber.ts';
import Button from '../../ui/Button.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function LocationSection() {
  return (
    <section id="location" className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="eyebrow mb-3">06 / ĐỊA CHỈ STUDIO</p>
          <h2 className="display-heading mb-12 sm:mb-16">
            MỜI BẠN GHÉ THĂM GHẾ CẮT.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Details Column */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            {/* Address */}
            <FadeIn delay={0.1} className="flex gap-4">
              <div className="p-3 rounded-full bg-[rgba(244,240,232,0.05)] border border-[rgba(244,240,232,0.1)] text-[#C7A66A] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A7A39B] block mb-1">
                  Địa Chỉ Studio
                </span>
                <p className="text-xl sm:text-2xl font-bold text-[#F4F0E8] leading-snug">
                  {barberProfile.address}, {barberProfile.city}
                </p>
                <p className="text-sm text-[#A7A39B] mt-1">{barberProfile.country}</p>
              </div>
            </FadeIn>

            {/* Hours */}
            <FadeIn delay={0.2} className="flex gap-4">
              <div className="p-3 rounded-full bg-[rgba(244,240,232,0.05)] border border-[rgba(244,240,232,0.1)] text-[#C7A66A] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A7A39B] block mb-2">
                  Giờ Mở Cửa Phục Vụ
                </span>
                <div className="space-y-2">
                  {barberProfile.openingHours.map((schedule, i) => (
                    <div key={i} className="flex items-center gap-6 text-sm sm:text-base">
                      <span className="font-semibold text-[#F4F0E8] w-36 sm:w-44">
                        {schedule.label}
                      </span>
                      <span className="font-mono text-[#C7A66A]">{schedule.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Direct Contact */}
            <FadeIn delay={0.3} className="flex gap-4">
              <div className="p-3 rounded-full bg-[rgba(244,240,232,0.05)] border border-[rgba(244,240,232,0.1)] text-[#C7A66A] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A7A39B] block mb-1">
                  Hotline Trực Tiếp
                </span>
                <a
                  href={`tel:${barberProfile.phone}`}
                  className="text-xl sm:text-2xl font-bold font-mono text-[#F4F0E8] hover:text-[#C7A66A] transition-colors"
                >
                  {barberProfile.phone}
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Minimalist Stylized Map Card */}
          <FadeIn delay={0.3} className="lg:col-span-6 w-full">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-[28px] sm:rounded-[36px] bg-[#141413] border border-[rgba(244,240,232,0.12)] p-8 sm:p-12 flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Minimal Grid & Radar Accent */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,240,232,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,240,232,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#C7A66A]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C7A66A] font-mono block mb-2">
                  VỊ TRÍ STUDIO
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#F4F0E8]">
                  {barberProfile.shopName}
                </h3>
                <p className="text-sm text-[#A7A39B] mt-2 max-w-sm">
                  Tọa lạc tại vị trí trung tâm {barberProfile.city}. Không gian studio riêng tư dành trọn sự tập trung cho diện mạo của bạn.
                </p>
              </div>

              <div className="relative z-10 pt-6">
                <Button
                  href={barberProfile.socials.googleMaps || '#'}
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  <span>Xem Chỉ Đường Trên Bản Đồ</span>
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
