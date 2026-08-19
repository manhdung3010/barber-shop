import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { barberProfile } from '../../../data/barber.ts';
import { processStepsData } from '../../../data/process.ts';
import EditorialImage from '../../ui/EditorialImage.tsx';
import PerspectiveTilt from '../../ui/PerspectiveTilt.tsx';
import CountUpNumber from '../../ui/CountUpNumber.tsx';
import FadeIn from '../../ui/FadeIn.tsx';
import ImageReveal from '../../ui/ImageReveal.tsx';

export default function AboutSection() {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  const toggleStep = (index: number) => {
    setActiveStep((prev) => (prev === index ? null : index));
  };

  return (
    <section id="about" className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="eyebrow mb-3">03 / THE BARBER</p>
          <h2 className="display-heading mb-12 sm:mb-16">
            {barberProfile.bioHeadline}
          </h2>
        </FadeIn>

        {/* Top Story & Barber Portrait with 3D Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 sm:mb-28">
          {/* Barber Portrait with Focal Subtle 3D Tilt */}
          <div className="lg:col-span-5">
            <PerspectiveTilt maxAngle={5}>
              <ImageReveal className="rounded-[30px] sm:rounded-[40px] shadow-2xl overflow-hidden border border-[rgba(244,240,232,0.12)]">
                <EditorialImage
                  src={barberProfile.barberImage.src}
                  alt={barberProfile.barberImage.alt}
                  aspectRatio="4/5"
                  watermarkLabel="MASTER BARBER"
                  imageClassName="hover:scale-103 transition-transform duration-700"
                />
              </ImageReveal>
            </PerspectiveTilt>
          </div>

          {/* Bio Story & Live Animated Statistics */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <FadeIn delay={0.2} className="space-y-6 text-[#D6D1C8] text-base sm:text-lg md:text-xl font-light leading-relaxed mb-12">
              {barberProfile.bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </FadeIn>

            {/* Live Count-Up Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[rgba(244,240,232,0.15)]">
              {barberProfile.stats.map((stat, i) => (
                <FadeIn key={i} delay={0.3 + i * 0.08} className="flex flex-col">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F4F0E8] mb-1 font-mono tracking-tight">
                    <CountUpNumber
                      value={stat.numericValue}
                      suffix={stat.suffix}
                      duration={1.8}
                    />
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#A7A39B]">
                    {stat.label}
                  </span>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* The Chair Experience / Studio Process Accordion */}
        <FadeIn delay={0.2} className="pt-16 border-t border-[rgba(244,240,232,0.12)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66A] mb-2">
                <Sparkles className="w-3.5 h-3.5" /> STUDIO RITUAL
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#F4F0E8]">
                THE CHAIR EXPERIENCE
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#A7A39B] max-w-md font-light">
              Every appointment follows a refined, four-stage ritual designed for precision, relaxation, and individual attention.
            </p>
          </div>

          <div className="divide-y divide-[rgba(244,240,232,0.12)] border-y border-[rgba(244,240,232,0.12)]">
            {processStepsData.map((step, idx) => {
              const isOpen = activeStep === idx;
              return (
                <div key={step.number} className="py-5 sm:py-7 transition-colors hover:bg-[rgba(244,240,232,0.02)]">
                  <button
                    onClick={() => toggleStep(idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-6 sm:gap-10">
                      <span className="text-xs sm:text-sm font-mono font-bold text-[#C7A66A] tracking-wider">
                        {step.number}
                      </span>
                      <span className="text-base sm:text-xl font-bold uppercase tracking-wider text-[#F4F0E8] group-hover:text-[#C7A66A] transition-colors">
                        {step.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {step.duration && (
                        <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-[#A7A39B] border border-[rgba(244,240,232,0.15)] px-2.5 py-1 rounded-full">
                          {step.duration}
                        </span>
                      )}
                      <div
                        className={`p-1.5 rounded-full border border-[rgba(244,240,232,0.2)] text-[#F4F0E8] transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-[#C7A66A] text-[#0B0B0A] border-[#C7A66A]' : ''
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 pl-12 sm:pl-16 text-sm sm:text-base text-[#A7A39B] font-light leading-relaxed max-w-2xl">
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
