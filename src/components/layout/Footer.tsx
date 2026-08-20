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

  return (
    <footer className="py-10 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-10 border-t border-[rgba(244,240,232,0.12)] bg-[#0B0B0A] text-[#F4F0E8]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="text-xl sm:text-2xl font-black uppercase tracking-wider text-[#F4F0E8] hover:text-[#C7A66A] transition-colors"
          >
            {barberProfile.shopName}
          </a>
          <p className="text-xs uppercase tracking-widest text-[#A7A39B] mt-2">
            {barberProfile.tagline}
          </p>
        </div>

        {/* Minimal Navigation */}
        <nav className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#A7A39B]" aria-label="Menu chân trang">
          {navigationData.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="hover:text-[#F4F0E8] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <div className="text-[10px] uppercase tracking-widest text-[#A7A39B] text-center md:text-right">
          <p>© {currentYear} {barberProfile.shopName}. Bản quyền thuộc về tiệm.</p>
          <p className="mt-1 text-[9px] text-[#A7A39B]/60">THIẾT KẾ CÁ NHÂN HÓA CAO CẤP</p>
        </div>
      </div>
    </footer>
  );
}
