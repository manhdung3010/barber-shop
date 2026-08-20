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
    <section id="hero" className="relative min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-6 md:pb-8 px-4 sm:px-6 md:px-8 lg:px-10 overflow-x-clip bg-[#0B0B0A]">
      {/* Subtle Ambient Radial Aura Glow in Background */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] rounded-full bg-gradient-to-tr from-[#C7A66A]/10 via-[#96743A]/05 to-transparent blur-[120px] animate-pulse-slow"
        aria-hidden="true"
      />

      {/* Unified Hero Grid Composition: All Narrative & Image in Same Cohesive Section */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-4 sm:py-6 relative z-10">
        {/* Left Column: Eyebrow + Headline + Subtitle + Action CTAs Grouped Seamlessly */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Eyebrow Plate */}
          <FadeIn delay={0.1}>
            <p className="plate-meta mb-2.5 sm:mb-3">
              00 // {barberProfile.shopName.toUpperCase()} · TIỆM BARBER CÁ NHÂN CAO CẤP
            </p>
          </FadeIn>

          {/* Hero Dominant Headline */}
          <FadeIn delay={0.2} y={20}>
            <h1 className="hero-heading text-left mb-3 sm:mb-5">
              {barberProfile.heroHeadline}
            </h1>
          </FadeIn>

          {/* Supporting Copy directly below headline */}
          <FadeIn delay={0.3}>
            <p className="body-editorial max-w-xl text-left mb-6 sm:mb-8">
              {barberProfile.heroSupportingText}
            </p>
          </FadeIn>

          {/* Action CTAs directly below copy */}
          <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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

        {/* Right Column: Master Barber Hero Artwork */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#C7A66A]/10 to-transparent rounded-[36px] blur-2xl -z-10 pointer-events-none" />
          <ImageReveal delay={0.35} className="w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[400px] rounded-[24px] sm:rounded-[32px] shadow-2xl border border-[rgba(244,240,232,0.12)]">
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
      <div className="max-w-7xl mx-auto w-full pt-4 sm:pt-5 border-t border-[rgba(244,240,232,0.12)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#A7A39B] relative z-10">
        <FadeIn delay={0.5}>
          <span>{barberProfile.city}, {barberProfile.country}</span>
        </FadeIn>
        <FadeIn delay={0.55}>
          <span className="text-[#C7A66A]">{hoursSummary}</span>
        </FadeIn>
        <FadeIn delay={0.6}>
          <span>EST. {barberProfile.establishedYear}</span>
        </FadeIn>
      </div>
    </section>
  );
}
