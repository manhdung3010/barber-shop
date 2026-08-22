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
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 items-center my-auto py-4 sm:py-6 relative z-10">
        {/* Left Column: Eyebrow + Headline + Mobile Artwork + Subtitle + Action CTAs */}
        <div className="md:col-span-6 lg:col-span-7 flex flex-col items-start text-left">
          {/* Eyebrow Plate */}
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-2 sm:gap-2.5 mb-2.5 sm:mb-3 flex-wrap">
              <span className="font-mono text-xs font-bold text-[#C7A66A] tracking-wider uppercase shrink-0">
                00 // SOWN BARBERSHOP
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C7A66A]/60 shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#A7A39B]">
                TIỆM BARBER CÁ NHÂN CAO CẤP
              </span>
            </div>
          </FadeIn>

          {/* Hero Dominant Headline */}
          <FadeIn delay={0.2} y={20}>
            <h1 className="hero-heading text-left mb-3 sm:mb-4">
              {barberProfile.heroHeadline}
            </h1>
          </FadeIn>

          {/* Mobile Featured Artwork Banner - Full Width 16:9 Cinematic Composition */}
          <FadeIn delay={0.25} className="md:hidden w-full my-4 sm:my-5">
            <div className="w-full rounded-[20px] sm:rounded-[24px] shadow-2xl overflow-hidden border border-[rgba(244,240,232,0.18)] relative bg-[#141413]">
              <EditorialImage
                src="/images/hero/hero-mobile.jpg"
                alt={barberProfile.heroImage.alt}
                aspectRatio="16/9"
                priority={true}
                watermarkLabel="SOWN BARBERSHOP · SIGNATURE CRAFT"
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

        {/* Right Column: Tablet & Desktop Multi-Image Editorial Composition */}
        <div className="hidden md:flex md:col-span-6 lg:col-span-5 justify-center md:justify-end relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#C7A66A]/12 to-transparent rounded-[36px] blur-2xl -z-10 pointer-events-none" />
          
          {/* Main Signature Artwork */}
          <ImageReveal delay={0.35} className="w-full max-w-[280px] sm:max-w-[310px] lg:max-w-[370px] xl:max-w-[410px] rounded-[26px] sm:rounded-[32px] shadow-2xl border border-[rgba(244,240,232,0.14)] relative">
            <EditorialImage
              src={barberProfile.heroImage.src}
              alt={barberProfile.heroImage.alt}
              aspectRatio="3/4"
              priority={true}
              watermarkLabel="SIGNATURE CRAFT"
              imageClassName="hover:scale-105 transition-transform duration-700"
            />
          </ImageReveal>

          {/* Companion Overlapping Craft Card (Prevents vertical stretch on tablet & enriches editorial balance) */}
          <FadeIn
            delay={0.5}
            className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-4 lg:-bottom-6 lg:-left-6 z-20 pointer-events-none"
          >
            <div className="w-[150px] sm:w-[170px] lg:w-[200px] rounded-[18px] sm:rounded-[22px] overflow-hidden border border-[rgba(199,166,106,0.45)] shadow-[0_16px_36px_rgba(0,0,0,0.9)] bg-[#0B0B0A]/95 backdrop-blur-md">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={barberProfile.barberImage.src}
                  alt={barberProfile.barberImage.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A]/90 via-[#0B0B0A]/20 to-transparent" />
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A] animate-pulse" />
                  <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-[#C7A66A] truncate">
                    MASTER BARBER · SOWN
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
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

