import { useEffect } from 'react';
import Navbar from './components/layout/Navbar.tsx';
import HeroSection from './components/sections/Hero/HeroSection.tsx';
import StylesSection from './components/sections/Styles/StylesSection.tsx';
import ServicesSection from './components/sections/Services/ServicesSection.tsx';
import AboutSection from './components/sections/About/AboutSection.tsx';
import GallerySection from './components/sections/Gallery/GallerySection.tsx';
import TestimonialsSection from './components/sections/Testimonials/TestimonialsSection.tsx';
import LocationSection from './components/sections/Location/LocationSection.tsx';
import BookingSection from './components/sections/Booking/BookingSection.tsx';
import Footer from './components/layout/Footer.tsx';
import { barberProfile } from './data/barber.ts';
import { generateBarberShopJsonLd } from './utils/seo.ts';

export default function App() {
  useEffect(() => {
    // Inject dynamic JSON-LD structured data into head
    const existingScript = document.getElementById('barbershop-jsonld');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'barbershop-jsonld';
      script.type = 'application/ld+json';
      script.textContent = generateBarberShopJsonLd(barberProfile);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F4F0E8] flex flex-col selection:bg-[#C7A66A] selection:text-[#0B0B0A] overflow-x-clip">
      <Navbar />
      <main>
        <HeroSection />
        <StylesSection />
        <ServicesSection />
        <AboutSection />
        <GallerySection />
        <TestimonialsSection />
        <LocationSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
