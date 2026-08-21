import Navbar from '../src/components/layout/Navbar';
import HeroSection from '../src/components/sections/Hero/HeroSection';
import StylesSection from '../src/components/sections/Styles/StylesSection';
import ServicesSection from '../src/components/sections/Services/ServicesSection';
import AboutSection from '../src/components/sections/About/AboutSection';
import GallerySection from '../src/components/sections/Gallery/GallerySection';
import TestimonialsSection from '../src/components/sections/Testimonials/TestimonialsSection';
import LocationSection from '../src/components/sections/Location/LocationSection';
import BookingSection from '../src/components/sections/Booking/BookingSection';
import Footer from '../src/components/layout/Footer';
import MarqueeTicker from '../src/components/ui/MarqueeTicker';
import PlateProgress from '../src/components/ui/PlateProgress';

export default function HomePage() {
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
