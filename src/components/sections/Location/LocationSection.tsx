'use client';
import { MapPin, Clock, Phone, ArrowUpRight } from 'lucide-react';
import { barberProfile } from '../../../data/barber';
import Button from '../../ui/Button';
import FadeIn from '../../ui/FadeIn';

export default function LocationSection() {
  return (
    <section id="location" className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 md:px-8 lg:px-10 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-6 sm:mb-10">
          <p className="plate-meta mb-2 sm:mb-3">07 // ĐỊA CHỈ STUDIO</p>
          <h2 className="text-[1.25rem] xs:text-[1.4rem] sm:text-2xl md:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-[#F4F0E8] whitespace-nowrap sm:whitespace-normal mb-3 sm:mb-4">
            MỜI BẠN GHÉ THĂM GHẾ CẮT.
          </h2>
          <p className="body-editorial max-w-lg mx-auto">
            Không gian cắt tóc nam riêng tư, chuẩn chỉ từng chi tiết tại trung tâm thị xã Nghi Sơn.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 items-stretch">
          {/* Left Card: Contact Details */}
          <FadeIn delay={0.1} className="h-full flex flex-col">
            <div className="h-full rounded-[22px] sm:rounded-[32px] bg-[#141413] border border-[rgba(244,240,232,0.12)] p-5 sm:p-8 md:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              {/* Subtle ambient accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#C7A66A]/05 rounded-full blur-3xl pointer-events-none" />

              {/* Address - Clickable to Google Maps */}
              <a
                href={barberProfile.socials.googleMaps || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 sm:gap-4 relative z-10 group/addr cursor-pointer"
                title="Mở địa chỉ trên Google Maps"
              >
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[rgba(244,240,232,0.05)] border border-[rgba(244,240,232,0.1)] text-[#C7A66A] group-hover/addr:bg-[#C7A66A] group-hover/addr:text-[#0B0B0A] flex items-center justify-center shrink-0 aspect-square mt-0.5 transition-colors">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#A7A39B] flex items-center gap-1.5 mb-1 font-mono group-hover/addr:text-[#C7A66A] transition-colors">
                    <span>Địa Chỉ Studio</span>
                    <ArrowUpRight className="w-3 h-3 opacity-70 group-hover/addr:opacity-100" />
                  </span>
                  <p className="text-sm xs:text-base sm:text-lg font-bold text-[#F4F0E8] group-hover/addr:text-[#C7A66A] leading-snug transition-colors">
                    {barberProfile.address}, {barberProfile.city}
                  </p>
                  <p className="text-xs text-[#A7A39B] mt-0.5 group-hover/addr:text-[#C7A66A]/80 transition-colors">
                    {barberProfile.country} · <span className="underline underline-offset-2">Mở Google Maps ↗</span>
                  </p>
                </div>
              </a>

              {/* Divider */}
              <div className="h-[1px] bg-[rgba(244,240,232,0.08)] my-4 sm:my-6 relative z-10" />

              {/* Hours */}
              <div className="flex items-start gap-3.5 sm:gap-4 relative z-10">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[rgba(244,240,232,0.05)] border border-[rgba(244,240,232,0.1)] text-[#C7A66A] flex items-center justify-center shrink-0 aspect-square mt-0.5">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="w-full">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#A7A39B] block mb-1.5 font-mono">
                    Giờ Mở Cửa Phục Vụ
                  </span>
                  <div className="space-y-1.5 sm:space-y-2">
                    {barberProfile.openingHours.map((schedule, i) => (
                      <div key={i} className="flex items-center justify-between text-xs sm:text-sm max-w-sm">
                        <span className="font-semibold text-[#F4F0E8]">
                          {schedule.label}
                        </span>
                        <span className="font-mono text-[#C7A66A] font-bold">{schedule.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-[rgba(244,240,232,0.08)] my-4 sm:my-6 relative z-10" />

              {/* Direct Contact */}
              <div className="flex items-start gap-3.5 sm:gap-4 relative z-10">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[rgba(244,240,232,0.05)] border border-[rgba(244,240,232,0.1)] text-[#C7A66A] flex items-center justify-center shrink-0 aspect-square mt-0.5">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#A7A39B] block mb-1 font-mono">
                    Hotline Trực Tiếp
                  </span>
                  <a
                    href={`tel:${barberProfile.phone}`}
                    className="text-base xs:text-lg sm:text-xl font-bold font-mono text-[#C7A66A] hover:underline transition-colors"
                  >
                    {barberProfile.phone}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Card: Minimalist Stylized Map Card */}
          <FadeIn delay={0.2} className="h-full flex flex-col">
            <div className="h-full rounded-[22px] sm:rounded-[32px] bg-[#141413] border border-[rgba(244,240,232,0.12)] p-5 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl relative min-h-[300px] sm:min-h-[360px]">
              {/* Minimal Grid & Radar Accent */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,240,232,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,240,232,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#C7A66A]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#C7A66A] font-mono block mb-1.5">
                  VỊ TRÍ STUDIO
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase text-[#F4F0E8] mb-2 sm:mb-3">
                  {barberProfile.shopName}
                </h3>
                <p className="text-xs sm:text-sm text-[#A7A39B] leading-relaxed max-w-md">
                  Tọa lạc tại vị trí trung tâm {barberProfile.city}. Không gian studio riêng tư 1-on-1 dành trọn sự tập trung tối đa cho diện mạo và sự thoải mái của bạn.
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C7A66A] bg-[#C7A66A]/10 border border-[#C7A66A]/20 px-2.5 py-1 rounded-full">
                    ✓ KHÔNG GIAN RIÊNG TƯ
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A7A39B] bg-[rgba(244,240,232,0.05)] border border-[rgba(244,240,232,0.1)] px-2.5 py-1 rounded-full">
                    ✓ ĐỖ XE THUẬN TIỆN
                  </span>
                </div>
              </div>

              <div className="relative z-10 pt-5 mt-5 sm:pt-6 sm:mt-6 border-t border-[rgba(244,240,232,0.08)]">
                <Button
                  href={barberProfile.socials.googleMaps || '#'}
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto text-xs font-bold py-2.5"
                >
                  <span>Xem Chỉ Đường Trên Bản Đồ</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

