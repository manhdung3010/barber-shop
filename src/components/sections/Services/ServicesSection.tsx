import { useState } from 'react';
import { servicesData } from '../../../data/services.ts';
import { barberProfile } from '../../../data/barber.ts';
import AtelierServiceRow from './AtelierServiceRow.tsx';
import AtelierPreview from './AtelierPreview.tsx';
import Button from '../../ui/Button.tsx';
import Magnet from '../../ui/Magnet.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function ServicesSection() {
  const [activePreview, setActivePreview] = useState<{
    image: string | null;
    title: string | null;
  }>({
    image: null,
    title: null,
  });

  const handleHover = (image: string | null, title: string | null) => {
    setActivePreview({ image, title });
  };

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-12 bg-[#0B0B0A]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center mb-16 sm:mb-20 md:mb-24">
          <p className="plate-meta mb-3">02 // DỊCH VỤ & BẢNG GIÁ</p>
          <h2 className="display-heading text-[#F4F0E8] mb-4">
            CẮT. TẠO KIỂU. TRAU CHUỐT.
          </h2>
          <p className="body-editorial max-w-xl mx-auto">
            Trải nghiệm các gói dịch vụ chăm sóc diện mạo cá nhân được thiết kế riêng theo tỉ lệ khuôn mặt và phong cách sống của bạn.
          </p>
        </FadeIn>

        {/* Atelier Service Menu Container with Zero-Reflow Anchored Preview */}
        <div className="relative border-t border-[rgba(244,240,232,0.12)]">
          <AtelierPreview
            activeImage={activePreview.image}
            activeTitle={activePreview.title}
          />

          <div className="flex flex-col w-full">
            {servicesData.map((service, index) => (
              <AtelierServiceRow
                key={service.id}
                service={service}
                index={index}
                onHover={handleHover}
              />
            ))}
          </div>
        </div>

        {/* Single Decisive Booking CTA at Menu Bottom (One CTA = One Decision) */}
        <FadeIn delay={0.2} className="mt-14 sm:mt-18 flex flex-col items-center justify-center text-center">
          <Magnet strength={14}>
            <Button
              href={barberProfile.booking.primaryUrl}
              variant="primary"
              size="lg"
              className="px-10 sm:px-14 py-4 sm:py-5 text-sm sm:text-base font-bold shadow-xl shadow-[#C7A66A]/20"
            >
              {barberProfile.booking.primaryLabel}
            </Button>
          </Magnet>
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#A7A39B] mt-4">
            KHÔNG GIAN RIÊNG TƯ · PHỤC VỤ 1-ON-1 · HẸN TRƯỚC
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
