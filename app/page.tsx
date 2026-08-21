import Navbar from '../src/components/layout/Navbar';
import HeroSection from '../src/components/sections/Hero/HeroSection';
import StylesSection from '../src/components/sections/Styles/StylesSection';
import ServicesSection from '../src/components/sections/Services/ServicesSection';
import AboutSection from '../src/components/sections/About/AboutSection';
import GallerySection from '../src/components/sections/Gallery/GallerySection';
import TestimonialsSection from '../src/components/sections/Testimonials/TestimonialsSection';
import FAQSection from '../src/components/sections/FAQ/FAQSection';
import LocationSection from '../src/components/sections/Location/LocationSection';
import BookingSection from '../src/components/sections/Booking/BookingSection';
import Footer from '../src/components/layout/Footer';
import MarqueeTicker from '../src/components/ui/MarqueeTicker';
import PlateProgress from '../src/components/ui/PlateProgress';
import { prisma } from '@/lib/prisma';
import { servicesData } from '../src/data/services';
import { stylesData } from '../src/data/styles';
import { testimonialsData } from '../src/data/testimonials';
import { faqData } from '../src/data/faq';
import { Service, StyleItem, Testimonial } from '../src/types/index';

export const revalidate = 0; // On-demand dynamic data fetching

async function getLiveContent() {
  try {
    const [dbServices, dbStyles, dbTestimonials, dbFaqs] = await Promise.all([
      prisma.serviceItem.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
      prisma.styleItem.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
      prisma.testimonialItem.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
      prisma.fAQItem.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    ]);

    const services: Service[] =
      dbServices.length > 0
        ? dbServices.map((s) => {
            let parsedFeatures: string[] = [];
            try {
              parsedFeatures = JSON.parse(s.features);
            } catch {
              parsedFeatures = [s.features];
            }
            return {
              id: s.id,
              name: s.name,
              categoryLabel: s.categoryLabel || undefined,
              description: s.description,
              price: s.price,
              duration: s.duration,
              image: s.image,
              features: parsedFeatures,
            };
          })
        : servicesData;

    const styles: StyleItem[] =
      dbStyles.length > 0
        ? dbStyles.map((st) => ({
            id: st.id,
            title: st.title,
            category: st.category as any,
            description: st.description,
            image: st.image,
            alt: st.alt,
          }))
        : stylesData;

    const testimonials: Testimonial[] =
      dbTestimonials.length > 0
        ? dbTestimonials.map((t) => ({
            id: t.id,
            quote: t.quote,
            clientName: t.clientName,
            avatar: t.avatar || undefined,
            rating: t.rating,
            service: t.service || undefined,
          }))
        : testimonialsData;

    const faqs =
      dbFaqs.length > 0
        ? dbFaqs.map((f) => ({
            id: f.id,
            question: f.question,
            answer: f.answer,
          }))
        : faqData;

    return { services, styles, testimonials, faqs };
  } catch (err) {
    console.error('Prisma fetch fallback to static data:', err);
    return {
      services: servicesData,
      styles: stylesData,
      testimonials: testimonialsData,
      faqs: faqData,
    };
  }
}

export default async function HomePage() {
  const { services, styles, testimonials, faqs } = await getLiveContent();

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

        <StylesSection data={styles} />
        <ServicesSection data={services} />
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
        <TestimonialsSection data={testimonials} />
        <FAQSection data={faqs} />
        <LocationSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
