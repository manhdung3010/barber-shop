import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/Hero/HeroSection';
import StylesSection from './components/sections/Styles/StylesSection';
import ServicesSection from './components/sections/Services/ServicesSection';
import AboutSection from './components/sections/About/AboutSection';
import GallerySection from './components/sections/Gallery/GallerySection';
import TestimonialsSection from './components/sections/Testimonials/TestimonialsSection';
import LocationSection from './components/sections/Location/LocationSection';
import BookingSection from './components/sections/Booking/BookingSection';
import Footer from './components/layout/Footer';
import MarqueeTicker from './components/ui/MarqueeTicker';
import PlateProgress from './components/ui/PlateProgress';
import { barberProfile } from './data/barber';
import { generateBarberShopJsonLd } from './utils/seo';

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
    <div className="min-h-screen bg-[#0B0B0A] text-[#F4F0E8] flex flex-col selection:bg-[#C7A66A] selection:text-[#0B0B0A] overflow-x-clip relative">
      <Navbar />
      <PlateProgress />
      <main>
        <HeroSection />
        
        {/* Editorial Transition Ticker 1 */}
        <MarqueeTicker
          direction="left"
          speedSeconds={32}
          items={[
            'FADE CHUYÊN SÂU SẮC NÉT',
            'CẮT TÓC THIẾT KẾ CÁ NHÂN HÓA',
            'TEXTURED CROP HIỆN ĐẠI',
            'UỐN PHỒNG CHUẨN FORM',
            'CLASSIC QUÝ ÔNG LỊCH LÃM',
            'TẠO KIỂU RÂU ĐẲNG CẤP',
          ]}
        />

        <StylesSection />
        <ServicesSection />
        <AboutSection />

        {/* Editorial Transition Ticker 2 */}
        <MarqueeTicker
          direction="right"
          speedSeconds={38}
          items={[
            'TRẢI NGHIỆM GHẾ CẮT 1-ON-1',
            'TẬP TRUNG TỐI ĐA CHO BẠN',
            'KÉO CẮT THỦ CÔNG NHẬT BẢN',
            'LIỆU TRÌNH KHĂN NÓNG THẢO MỘC',
            'SẢN PHẨM DƯỠNG CAO CẤP',
            'ĐỊNH HÌNH DẤU ẤN PHONG CÁCH',
          ]}
        />

        <GallerySection />
        <TestimonialsSection />
        <LocationSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
