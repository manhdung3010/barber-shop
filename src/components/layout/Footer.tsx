import { barberProfile } from '../../data/barber.ts';
import { navigationData } from '../../data/navigation.ts';

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0A] border-t border-[rgba(244,240,232,0.12)] py-12 sm:py-16 px-5 sm:px-8 md:px-10 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <span className="text-xl font-black uppercase tracking-wider text-[#F4F0E8] block mb-1">
            {barberProfile.shopName}
          </span>
          <p className="text-xs uppercase tracking-widest text-[#A7A39B]">
            {barberProfile.tagline}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-6 sm:gap-8" aria-label="Footer Navigation">
          {navigationData.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-widest text-[#A7A39B] hover:text-[#F4F0E8] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-[#A7A39B] uppercase tracking-widest">
          © 2026 {barberProfile.shopName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
