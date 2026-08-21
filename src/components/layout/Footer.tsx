import React from 'react';
import { ArrowUp, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { barberProfile } from '../../data/barber.ts';
import { navigationData } from '../../data/navigation.ts';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        window.history.pushState(null, '', href);
      } else if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[rgba(244,240,232,0.12)] bg-[#0B0B0A] text-[#F4F0E8] pt-12 sm:pt-14 pb-8 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top Tier: Brand, Navigation, and Contact Quick Hub */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Brand & Studio Summary with Official Emblem */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <a
              href="#"
              onClick={(e) => handleNavClick(e, '#')}
              className="flex items-center gap-3 text-2xl sm:text-3xl font-black uppercase tracking-wider text-[#F4F0E8] hover:text-[#C7A66A] transition-colors mb-3 group"
            >
              {barberProfile.logo && (
                <img
                  src={barberProfile.logo}
                  alt="Sown Barbershop Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#C7A66A]/40 shadow-lg group-hover:scale-105 transition-transform shrink-0"
                />
              )}
              <span>{barberProfile.shopName}</span>
            </a>
            <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#C7A66A] mb-3">
              {barberProfile.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#A7A39B] font-light leading-relaxed max-w-md mb-5">
              {barberProfile.address}, {barberProfile.city}
            </p>

            {/* Quick Contact Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${barberProfile.phone}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#F4F0E8] bg-[rgba(244,240,232,0.05)] border border-[rgba(244,240,232,0.12)] hover:border-[#C7A66A] hover:text-[#C7A66A] transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#C7A66A]" />
                <span>{barberProfile.phone}</span>
              </a>
              {barberProfile.socials.facebook && (
                <a
                  href={barberProfile.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-[#A7A39B] bg-[rgba(244,240,232,0.05)] border border-[rgba(244,240,232,0.12)] hover:border-[#C7A66A] hover:text-[#F4F0E8] transition-all"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3 text-[#C7A66A]" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links - 2 Clean Columns */}
          <div className="md:col-span-4 flex flex-col">
            <span className="plate-meta mb-4">DANH MỤC ĐIỀU HƯỚNG</span>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-3" aria-label="Menu chân trang">
              {navigationData.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#A7A39B] hover:text-[#C7A66A] transition-colors inline-flex items-center gap-1 group"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-[#C7A66A] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Hours & Direct Booking Action */}
          <div className="md:col-span-3 flex flex-col">
            <span className="plate-meta mb-4">GIỜ MỞ CỬA</span>
            <div className="space-y-2 text-xs sm:text-sm mb-5">
              {barberProfile.openingHours.map((schedule, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[#A7A39B] font-medium">{schedule.label}</span>
                  <span className="font-mono text-[#C7A66A] font-bold">{schedule.value}</span>
                </div>
              ))}
            </div>
            <a
              href={barberProfile.booking.primaryUrl}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#C7A66A] text-[#0B0B0A] text-xs font-bold uppercase tracking-wider hover:bg-[#D8B87A] transition-all shadow-md shadow-[#C7A66A]/20"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Đặt Lịch Hẹn Ngay</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to top */}
        <div className="pt-6 border-t border-[rgba(244,240,232,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#A7A39B]">
          <p>© {currentYear} {barberProfile.shopName}. Bản quyền thuộc về tiệm.</p>
          
          <div className="flex items-center gap-6">
            <span>TX. NGHI SƠN, THANH HÓA</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#C7A66A] hover:text-[#F4F0E8] transition-colors cursor-pointer"
              aria-label="Cuộn về đầu trang"
            >
              <span>ĐẦU TRANG</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
