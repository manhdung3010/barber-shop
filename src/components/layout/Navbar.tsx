import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { barberProfile } from '../../data/barber.ts';
import { navigationData } from '../../data/navigation.ts';
import Button from '../ui/Button.tsx';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0A]/85 backdrop-blur-md border-b border-[rgba(244,240,232,0.12)] py-4'
          : 'bg-[#0B0B0A]/30 backdrop-blur-sm py-6 sm:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="text-sm sm:text-lg md:text-xl font-extrabold uppercase tracking-wider text-[#F4F0E8] hover:text-[#C7A66A] transition-colors whitespace-nowrap shrink-0"
        >
          {barberProfile.shopName}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10 shrink-0" aria-label="Menu chính">
          {navigationData.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-[#F4F0E8] hover:text-[#C7A66A] transition-colors cursor-pointer whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action: Compact Button on Mobile & Full Pill on Desktop */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* Mobile Small Compact Pill Button */}
          <div className="sm:hidden">
            <Button
              href={barberProfile.booking.primaryUrl}
              variant="pill"
              className="px-3 py-1 text-[10px] tracking-wider font-bold whitespace-nowrap"
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
              className="px-5 py-2 text-xs tracking-wider whitespace-nowrap"
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
            className="lg:hidden p-1.5 text-[#F4F0E8] hover:text-[#C7A66A] transition-colors cursor-pointer shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu Dialog */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng di động"
          className="fixed inset-0 z-50 bg-[#0B0B0A] flex flex-col justify-between p-6 sm:p-10"
        >
          <div className="flex items-center justify-between border-b border-[rgba(244,240,232,0.12)] pb-6">
            <span className="text-lg font-bold uppercase tracking-wider text-[#F4F0E8]">
              {barberProfile.shopName}
            </span>
            <button
              onClick={closeMenu}
              aria-label="Đóng menu"
              className="p-2 text-[#F4F0E8] hover:text-[#C7A66A] transition-colors cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto" aria-label="Danh mục menu">
            {navigationData.map((item, idx) => (
              <a
                key={item.href}
                ref={idx === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-[#F4F0E8] hover:text-[#C7A66A] transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-[rgba(244,240,232,0.12)] flex flex-col gap-4">
            <Button
              href={barberProfile.booking.primaryUrl}
              variant="primary"
              size="md"
              onClick={closeMenu}
            >
              Đặt Lịch Hẹn Ngay
            </Button>
            <p className="text-center text-[10px] uppercase tracking-widest text-[#A7A39B]">
              {barberProfile.city} • {barberProfile.phone}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
