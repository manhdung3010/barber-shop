'use client';
import { barberProfile } from '../../../data/barber';
import Button from '../../ui/Button';
import Magnet from '../../ui/Magnet';
import FadeIn from '../../ui/FadeIn';
import ImageReveal from '../../ui/ImageReveal';
import EditorialImage from '../../ui/EditorialImage';

export default function HeroSection() {


  return (
    <section id="hero" className="relative min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-6 md:pb-8 px-4 sm:px-6 md:px-8 lg:px-10 overflow-x-clip bg-[#0B0B0A]">
      {/* Subtle Ambient Radial Aura Glow in Background */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-gradient-to-tr from-[#C7A66A]/10 via-[#96743A]/05 to-transparent blur-[120px] animate-pulse-slow"
        aria-hidden="true"
      />

      {/* Unified Hero Grid Composition: All Narrative & Image in Same Cohesive Section */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-4 sm:py-6 relative z-10">
        {/* Left Column: Eyebrow + Headline + Mobile Artwork + Subtitle + Action CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Eyebrow Plate */}
          <FadeIn delay={0.1}>
            <p className="plate-meta mb-2 sm:mb-3">
              00 // {barberProfile.shopName.toUpperCase()} · TIỆM BARBER CÁ NHÂN CAO CẤP
            </p>
          </FadeIn>

          {/* Hero Dominant Headline */}
          <FadeIn delay={0.2} y={20}>
            <h1 className="hero-heading text-left mb-3 sm:mb-4">
              {barberProfile.heroHeadline}
            </h1>
          </FadeIn>

          {/* Mobile Featured Artwork Card (Visible immediately on mobile) */}
          <FadeIn delay={0.25} className="lg:hidden w-full flex justify-center my-3.5 sm:my-5">
            <div className="w-full max-w-[260px] sm:max-w-[300px] rounded-[20px] sm:rounded-[24px] shadow-2xl overflow-hidden border border-[rgba(244,240,232,0.14)] relative">
              <EditorialImage
                src={barberProfile.heroImage.src}
                alt={barberProfile.heroImage.alt}
                aspectRatio="3/4"
                priority={true}
                watermarkLabel="SOWN BARBERSHOP"
                imageClassName="hover:scale-105 transition-transform duration-700"
              />
            </div>
          </FadeIn>

          {/* Supporting Copy directly below headline/mobile artwork */}
          <FadeIn delay={0.3}>
            <p className="body-editorial max-w-xl text-left mb-5 sm:mb-7">
              {barberProfile.heroSupportingText}
            </p>
          </FadeIn>

          {/* Action CTAs directly below copy */}
          <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
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

        {/* Right Column: Desktop Only Hero Artwork */}
        <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#C7A66A]/10 to-transparent rounded-[36px] blur-2xl -z-10 pointer-events-none" />
          <ImageReveal delay={0.35} className="w-full max-w-[360px] xl:max-w-[400px] rounded-[28px] sm:rounded-[32px] shadow-2xl border border-[rgba(244,240,232,0.12)]">
            <EditorialImage
              src={barberProfile.heroImage.src}
              alt={barberProfile.heroImage.alt}
              aspectRatio="3/4"
              priority={true}
              watermarkLabel="SIGNATURE CRAFT"
              imageClassName="hover:scale-105 transition-transform duration-700"
            />
          </ImageReveal>
        </div>
      </div>

      {/* Hero Bottom Metadata Row */}
      <div className="max-w-7xl mx-auto w-full pt-4 sm:pt-5 border-t border-[rgba(244,240,232,0.12)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#A7A39B] relative z-10">
        <FadeIn delay={0.5}>
          <span>{barberProfile.city}, {barberProfile.country}</span>
        </FadeIn>
        <FadeIn delay={0.55} className="flex flex-col sm:flex-row items-center sm:gap-4 gap-1.5 text-center">
          {barberProfile.openingHours.map((h, i) => (
            <div key={i} className="flex items-center gap-1.5 sm:gap-4">
              {i > 0 && <span className="hidden sm:inline text-[#A7A39B]/40">•</span>}
              <span className="text-[#C7A66A]">{h.label} / {h.value}</span>
            </div>
          ))}
        </FadeIn>
        <FadeIn delay={0.6}>
          <span>EST. {barberProfile.establishedYear}</span>
        </FadeIn>
      </div>
    </section>
  );
}

