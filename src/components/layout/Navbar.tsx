'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { barberProfile } from '../../data/barber';
import { navigationData } from '../../data/navigation';
import Button from '../ui/Button';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle focus trapping and Escape for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      firstLinkRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
          menuTriggerRef.current?.focus();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    menuTriggerRef.current?.focus();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      closeMenu();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = 80; // height of fixed navbar + breathing room
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        window.history.pushState(null, '', href);
      } else if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', window.location.pathname);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#0B0B0A]/90 backdrop-blur-md border-[rgba(244,240,232,0.12)] py-3 sm:py-3.5 shadow-xl shadow-black/40'
            : 'bg-[#0B0B0A]/60 backdrop-blur-sm border-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo with Official Circular Emblem */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-2.5 sm:gap-3 text-sm sm:text-base md:text-lg font-black uppercase tracking-wider text-[#F4F0E8] hover:text-[#C7A66A] transition-colors whitespace-nowrap shrink-0 group"
          >
            {barberProfile.logo && (
              <img
                src={barberProfile.logo}
                alt="Sown Barbershop Logo"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-[#C7A66A]/60 shadow-md group-hover:scale-105 transition-transform shrink-0"
              />
            )}
            <span className="font-extrabold">{barberProfile.shopName}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0" aria-label="Menu chính">
            {navigationData.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A7A39B] hover:text-[#C7A66A] transition-colors cursor-pointer whitespace-nowrap py-1 relative group/link"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C7A66A] transition-all duration-300 group-hover/link:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action: Compact Button on Mobile & Full Pill on Desktop */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Small Compact Pill Button */}
            <div className="sm:hidden">
              <Button
                href={barberProfile.booking.primaryUrl}
                variant="pill"
                className="px-3 py-1.5 text-[10px] tracking-wider font-bold whitespace-nowrap"
              >
                Đặt Lịch
              </Button>
            </div>

            {/* Desktop Full Button */}
            <div className="hidden sm:block">
              <Button
                href={barberProfile.booking.primaryUrl}
                variant="pill"
                size="sm"
                className="px-5 py-2 text-xs tracking-wider font-bold whitespace-nowrap shadow-md shadow-[#C7A66A]/15"
              >
                Đặt Lịch Ngay
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              ref={menuTriggerRef}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Mở menu điều hướng"
              className="lg:hidden p-2 -mr-1.5 text-[#F4F0E8] hover:text-[#C7A66A] transition-colors cursor-pointer shrink-0 rounded-lg hover:bg-white/5"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Dialog rendered via Portal onto document.body */}
      {mounted &&
        typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Menu điều hướng di động"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[9999] bg-[#0B0B0A] text-[#F4F0E8] flex flex-col justify-between p-6 sm:p-10 h-[100dvh] w-full overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[rgba(244,240,232,0.12)] pb-5 shrink-0">
                  <div className="flex items-center gap-2.5">
                    {barberProfile.logo && (
                      <img
                        src={barberProfile.logo}
                        alt="Sown Barbershop Logo"
                        className="w-8 h-8 rounded-full object-cover border border-[#C7A66A]/50 shadow-md"
                      />
                    )}
                    <span className="text-lg font-black uppercase tracking-wider text-[#F4F0E8]">
                      {barberProfile.shopName}
                    </span>
                  </div>
                  <button
                    onClick={closeMenu}
                    aria-label="Đóng menu"
                    className="p-2 -mr-2 text-[#F4F0E8] hover:text-[#C7A66A] transition-colors cursor-pointer"
                  >
                    <X className="w-7 h-7" />
                  </button>
                </div>

                {/* Nav items */}
                <div className="flex-1">
                  <nav className="flex flex-col gap-5 sm:gap-6  py-6" aria-label="Danh mục menu">
                    {navigationData.map((item, idx) => (
                      <a
                        key={item.href}
                        ref={idx === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-[#F4F0E8] hover:text-[#C7A66A] hover:translate-x-2 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <span>{item.label}</span>
                        <span className="text-base text-[#C7A66A] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Footer */}
                <div className="pt-5 border-t border-[rgba(244,240,232,0.12)] flex flex-col gap-3.5 shrink-0">
                  <Button
                    href={barberProfile.booking.primaryUrl}
                    variant="primary"
                    size="md"
                    onClick={closeMenu}
                    className="w-full text-center justify-center font-bold"
                  >
                    {barberProfile.booking.primaryLabel}
                  </Button>
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-[#A7A39B] pt-1">
                    <span>{barberProfile.city}</span>
                    <a href={`tel:${barberProfile.phone}`} className="text-[#C7A66A] font-bold">
                      {barberProfile.phone}
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

