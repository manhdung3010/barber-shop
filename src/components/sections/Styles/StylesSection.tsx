import { useState } from 'react';
import { stylesData } from '../../../data/styles.ts';
import { barberProfile } from '../../../data/barber.ts';
import { StyleCategory, StyleFilter } from '../../../types/index.ts';
import StyleCard from './StyleCard.tsx';
import BeforeAfterSlider from '../../ui/BeforeAfterSlider.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

const FILTER_TABS: { label: string; value: StyleFilter }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'FADE', value: 'fade' },
  { label: 'TEXTURED', value: 'textured' },
  { label: 'CLASSIC', value: 'classic' },
  { label: 'LONG', value: 'long' },
  { label: 'BEARD', value: 'beard' },
];

export default function StylesSection() {
  const [activeFilter, setActiveFilter] = useState<StyleFilter>('all');

  const filteredStyles = activeFilter === 'all'
    ? stylesData
    : stylesData.filter((s) => s.category === (activeFilter as StyleCategory));

  return (
    <section id="styles" className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn>
          <p className="eyebrow mb-3">01 / SIGNATURE STYLES</p>
          <h2 className="display-heading max-w-4xl mb-6">
            THE WORK SPEAKS FOR ITSELF.
          </h2>
          <p className="body-editorial max-w-xl mb-12 sm:mb-16">
            A selection of precision cuts, skin fades, textured crops, and crafted styles created in the chair.
          </p>
        </FadeIn>

        {/* Interactive Before & After Transformation Slider Showcase */}
        {barberProfile.showBeforeAfter && barberProfile.beforeAfter && (
          <FadeIn delay={0.1} className="mb-20 sm:mb-28">
            <BeforeAfterSlider data={barberProfile.beforeAfter} />
          </FadeIn>
        )}

        {/* Filter Tabs */}
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-3 sm:gap-6 border-b border-[rgba(244,240,232,0.12)] pb-6 mb-12 sm:mb-16">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`relative text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] py-2 px-1 transition-colors cursor-pointer ${
                    isActive ? 'text-[#F4F0E8]' : 'text-[#A7A39B] hover:text-[#F4F0E8]'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7A66A]" />
                  )}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Portfolio Masonry Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {filteredStyles.map((item) => (
            <StyleCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
