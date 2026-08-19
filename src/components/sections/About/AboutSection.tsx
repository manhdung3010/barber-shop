import { barberProfile } from '../../../data/barber.ts';
import EditorialImage from '../../ui/EditorialImage.tsx';
import FadeIn from '../../ui/FadeIn.tsx';
import ImageReveal from '../../ui/ImageReveal.tsx';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="eyebrow mb-3">03 / THE BARBER</p>
          <h2 className="display-heading mb-12 sm:mb-16">
            {barberProfile.bioHeadline}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Barber Portrait */}
          <div className="lg:col-span-5">
            <ImageReveal className="rounded-[30px] sm:rounded-[40px] shadow-2xl overflow-hidden">
              <EditorialImage
                src={barberProfile.barberImage.src}
                alt={barberProfile.barberImage.alt}
                aspectRatio="4/5"
                watermarkLabel="MASTER BARBER"
                imageClassName="hover:scale-103 transition-transform duration-700"
              />
            </ImageReveal>
          </div>

          {/* Bio Story & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <FadeIn delay={0.2} className="space-y-6 text-[#D6D1C8] text-base sm:text-lg md:text-xl font-light leading-relaxed mb-12">
              {barberProfile.bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </FadeIn>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[rgba(244,240,232,0.15)]">
              {barberProfile.stats.map((stat, i) => (
                <FadeIn key={i} delay={0.3 + i * 0.08} className="flex flex-col">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F4F0E8] mb-1">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#A7A39B]">
                    {stat.label}
                  </span>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
