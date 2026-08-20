import { barberProfile } from '../../../data/barber.ts';
import Button from '../../ui/Button.tsx';
import Magnet from '../../ui/Magnet.tsx';
import FadeIn from '../../ui/FadeIn.tsx';
import ImageReveal from '../../ui/ImageReveal.tsx';
import EditorialImage from '../../ui/EditorialImage.tsx';

export default function HeroSection() {
  const hoursSummary = barberProfile.openingHours
    .map((h) => `${h.label} / ${h.value}`)
    .join(' • ');

  return (
    <section id="hero" className="relative min-h-[100svh] flex flex-col justify-between pt-28 sm:pt-36 pb-8 md:pb-12 px-5 sm:px-8 md:px-10 lg:px-12 overflow-x-clip bg-[#0B0B0A]">
      {/* Subtle Ambient Radial Aura Glow in Background */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-gradient-to-tr from-[#C7A66A]/10 via-[#96743A]/05 to-transparent blur-[120px] animate-pulse-slow"
        aria-hidden="true"
      />

      {/* Top Header Eyebrow */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <FadeIn delay={0.1}>
          <p className="plate-meta text-center md:text-left mb-4 sm:mb-6">
            00 // {barberProfile.shopName.toUpperCase()} · TIỆM BARBER CÁ NHÂN CAO CẤP
          </p>
        </FadeIn>

        {/* Hero Dominant Headline */}
        <FadeIn delay={0.2} y={35}>
          <h1 className="hero-heading text-center md:text-left">
            {barberProfile.heroHeadline}
          </h1>
        </FadeIn>
      </div>

      {/* Middle Composition: Image & Supporting Copy & Dual CTA */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center my-8 md:my-12 relative z-10">
        {/* Supporting Copy & CTAs */}
        <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          <FadeIn delay={0.35}>
            <p className="body-editorial max-w-lg mb-8">
              {barberProfile.heroSupportingText}
            </p>
          </FadeIn>

          <FadeIn delay={0.45} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Magnet strength={10}>
              <Button
                href={barberProfile.booking.primaryUrl}
                variant="primary"
                size="md"
                className="w-full sm:w-auto shadow-xl shadow-[#C7A66A]/15 font-bold"
              >
                {barberProfile.booking.primaryLabel}
              </Button>
            </Magnet>
            <Button
              href="#styles"
              variant="outline"
              size="md"
              className="w-full sm:w-auto"
            >
              Xem Kiểu Tóc ↓
            </Button>
          </FadeIn>
        </div>

        {/* Hero High-Priority Image with Subtle Halo */}
        <div className="md:col-span-6 flex justify-center md:justify-end order-1 md:order-2 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#C7A66A]/10 to-transparent rounded-[36px] blur-2xl -z-10 pointer-events-none" />
          <ImageReveal delay={0.3} className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] rounded-[24px] sm:rounded-[32px] shadow-2xl border border-[rgba(244,240,232,0.12)]">
            <EditorialImage
              src={barberProfile.heroImage.src}
              alt={barberProfile.heroImage.alt}
              aspectRatio="4/5"
              priority={true}
              watermarkLabel="SIGNATURE CRAFT"
              imageClassName="hover:scale-105 transition-transform duration-700"
            />
          </ImageReveal>
        </div>
      </div>

      {/* Hero Bottom Metadata Row */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-[rgba(244,240,232,0.12)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#A7A39B] relative z-10">
        <FadeIn delay={0.55}>
          <span>{barberProfile.city}, {barberProfile.country}</span>
        </FadeIn>
        <FadeIn delay={0.6}>
          <span className="text-[#C7A66A]">{hoursSummary}</span>
        </FadeIn>
        <FadeIn delay={0.65}>
          <span>EST. {barberProfile.establishedYear}</span>
        </FadeIn>
      </div>
    </section>
  );
}
