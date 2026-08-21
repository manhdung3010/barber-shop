'use client';
import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { servicesData } from '../../../data/services';
import ServiceCard from './ServiceCard';
import FadeIn from '../../ui/FadeIn';

export default function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Measure scroll progress across the whole services stacking container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="services" ref={containerRef} className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#0B0B0A]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center mb-8 sm:mb-12 md:mb-14">
          <p className="plate-meta mb-2.5 sm:mb-3">02 // DỊCH VỤ & BẢNG GIÁ</p>
          <h2 className="display-heading text-[#F4F0E8] mb-3 sm:mb-4">
            CẮT. TẠO KIỂU. TRAU CHUỐT.
          </h2>
          <p className="body-editorial max-w-xl mx-auto">
            Trải nghiệm các gói dịch vụ chăm sóc diện mạo cá nhân được thiết kế riêng theo tỉ lệ khuôn mặt và phong cách sống của bạn.
          </p>
        </FadeIn>

        {/* Sticky Stacking Cards Container */}
        <div className="flex flex-col w-full relative">
          {servicesData.map((service, index) => {
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

