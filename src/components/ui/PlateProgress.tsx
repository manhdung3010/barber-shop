'use client';
import { useState, useEffect } from 'react';

interface PlateItem {
  id: string;
  number: string;
  label: string;
}

const PLATES: PlateItem[] = [
  { id: 'hero', number: '00', label: 'INTRO' },
  { id: 'styles', number: '01', label: 'CUTS' },
  { id: 'services', number: '02', label: 'SERVICES' },
  { id: 'about', number: '03', label: 'EXP' },
  { id: 'gallery', number: '04', label: 'CRAFT' },
  { id: 'proof', number: '05', label: 'PROOF' },
  { id: 'location', number: '06', label: 'LOCATION' },
  { id: 'contact', number: '07', label: 'BOOK' },
];

export default function PlateProgress() {
  const [activePlate, setActivePlate] = useState<string>('00');

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          const match = PLATES.find((p) => p.id === targetId);
          if (match) {
            setActivePlate(match.number);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    PLATES.forEach((plate) => {
      const el = document.getElementById(plate.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Minimal Vertical Rail (Right Edge) */}
      <aside
        aria-label="Chỉ số điều hướng Plate"
        className="fixed right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 pointer-events-auto select-none"
      >
        <div className="flex flex-col gap-2.5 items-end">
          {PLATES.map((plate) => {
            const isActive = activePlate === plate.number;
            return (
              <button
                key={plate.id}
                onClick={() => scrollToSection(plate.id)}
                aria-label={`Cuộn tới mục ${plate.number} ${plate.label}`}
                className={`group flex items-center gap-2 cursor-pointer text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? 'text-[#C7A66A] font-bold'
                    : 'text-[#A7A39B]/50 hover:text-[#F4F0E8]'
                }`}
              >
                <span
                  className={`hidden 2xl:inline transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'
                  }`}
                >
                  {plate.label}
                </span>
                <span className="tabular-nums">{plate.number}</span>
                <span
                  className={`w-1.5 transition-all duration-300 rounded-full ${
                    isActive
                      ? 'h-4 bg-[#C7A66A]'
                      : 'h-1.5 bg-[rgba(244,240,232,0.2)] group-hover:bg-[#C7A66A]/60'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}

