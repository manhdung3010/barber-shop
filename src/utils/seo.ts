import { BarberProfile } from '../types/index';
import { servicesData } from '../data/services';
import { testimonialsData } from '../data/testimonials';
import { faqData } from '../data/faq';

export function generateBarberShopJsonLd(profile: BarberProfile): string {
  const baseUrl = 'https://sownbarbershop.vn';

  // 1. Comprehensive LocalBusiness / BarberShop / HairSalon Schema
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['BarberShop', 'HairSalon', 'HealthAndBeautyBusiness', 'LocalBusiness'],
    '@id': `${baseUrl}/#barbershop`,
    name: profile.shopName,
    alternateName: [
      'Sown Barber',
      'Sown Barbershop Nghi Sơn',
      'Sown Barbershop Tĩnh Gia',
      'Tiệm cắt tóc nam Sown Barbershop Thanh Hóa',
      'Nguyễn Sơn Barber',
    ],
    url: baseUrl,
    logo: `${baseUrl}/images/logo.jpg`,
    image: [
      `${baseUrl}/images/hero/hero-mobile.jpg`,
      `${baseUrl}/images/hero/hero.jpg`,
      `${baseUrl}/images/barber/barber.jpg`,
      `${baseUrl}/images/gallery/interior.jpg`,
      `${baseUrl}/images/gallery/chair.jpg`,
      `${baseUrl}/images/gallery/tools.jpg`,
      `${baseUrl}/images/gallery/barber-working.jpg`,
    ],
    telephone: profile.phone.replace(/\s+/g, ''),
    priceRange: '50.000đ — 250.000đ',
    currenciesAccepted: 'VND',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, ZaloPay, VietQR',
    description: profile.heroSupportingText,
    slogan: profile.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: profile.address,
      addressLocality: 'Thị xã Nghi Sơn',
      addressRegion: 'Thanh Hóa',
      postalCode: '440000',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.3364,
      longitude: 105.7869,
    },
    hasMap: profile.socials?.googleMaps,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '08:30',
        closes: '18:30',
      },
    ],
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Thị xã Nghi Sơn, Thanh Hóa',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Phường Hải Hòa, TX. Nghi Sơn',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Huyện Tĩnh Gia, Thanh Hóa',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Tỉnh Thanh Hóa',
      },
    ],
    founder: {
      '@type': 'Person',
      name: profile.name,
      jobTitle: 'Master Barber & Founder',
      image: `${baseUrl}/images/barber/barber.jpg`,
      sameAs: [profile.socials.facebook, profile.booking.primaryUrl],
    },
    employee: [
      {
        '@type': 'Person',
        name: profile.name,
        jobTitle: 'Master Barber',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Bảng Giá Dịch Vụ Sown Barbershop',
      itemListElement: servicesData.map((svc, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: svc.name,
          description: svc.description,
          category: svc.categoryLabel,
          image: `${baseUrl}${svc.image}`,
        },
        price: svc.price.replace(/[^\d]/g, ''),
        priceCurrency: 'VND',
        position: idx + 1,
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.95',
      bestRating: '5',
      ratingCount: '138',
      reviewCount: '138',
    },
    review: testimonialsData.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.clientName,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.rating.toString(),
        bestRating: '5',
      },
      reviewBody: t.quote,
    })),
    sameAs: [
      profile.socials.facebook,
      profile.socials.zalo,
      profile.socials.messenger,
      profile.socials.googleMaps,
    ].filter(Boolean),
  };

  // 2. Google FAQPage Rich Snippets Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // 3. WebSite & Breadcrumbs Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Sown Barbershop',
    description: profile.heroSupportingText,
    inLanguage: 'vi',
    publisher: {
      '@id': `${baseUrl}/#barbershop`,
    },
  };

  return JSON.stringify([businessSchema, faqSchema, websiteSchema], null, 2);
}
