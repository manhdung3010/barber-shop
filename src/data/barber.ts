import { BarberProfile } from '../types/index.ts';

export const barberProfile: BarberProfile = {
  name: '[BARBER_NAME]',
  shopName: '[BARBERSHOP_NAME]',
  tagline: 'YOUR STYLE. YOUR SIGNATURE.',
  heroHeadline: 'YOUR STYLE. YOUR SIGNATURE.',
  heroSupportingText: 'Precision cuts, modern fades, and personalized grooming crafted for your style.',
  heroImage: {
    src: '/images/hero/hero.svg',
    alt: 'Master barber at work styling precision haircut',
  },
  barberImage: {
    src: '/images/barber/barber.svg',
    alt: 'Portrait of master barber [BARBER_NAME]',
  },
  bioHeadline: 'MORE THAN A HAIRCUT.',
  bioParagraphs: [
    "I'm [BARBER_NAME], a personal barber focused on clean cuts, modern fades, and styles that actually fit the person wearing them.",
    'Every haircut starts with understanding your face shape, hair texture, lifestyle, and the look you want to achieve.',
    "The goal isn't simply to give you a good haircut. It's to give you a style that feels like you.",
  ],
  stats: [
    { value: '8+', numericValue: 8, suffix: '+', label: 'YEARS EXPERIENCE' },
    { value: '4500+', numericValue: 4500, suffix: '+', label: 'HAIRCUTS DELIVERED' },
    { value: '25+', numericValue: 25, suffix: '+', label: 'SIGNATURE STYLES' },
    { value: '99%', numericValue: 99, suffix: '%', label: 'CLIENT SATISFACTION' },
  ],
  city: '[CITY]',
  country: '[COUNTRY]',
  address: '[ADDRESS]',
  phone: '[PHONE]',
  openingHours: [
    { label: 'MON — SAT', value: '09:00 — 20:00' },
    { label: 'SUN', value: '10:00 — 18:00' },
  ],
  booking: {
    primaryChannel: 'zalo',
    primaryUrl: '[ZALO_URL]',
    primaryLabel: 'BOOK AN APPOINTMENT',
    secondaryChannels: [
      { channel: 'zalo', label: 'Zalo', url: '[ZALO_URL]' },
      { channel: 'messenger', label: 'Messenger', url: '[MESSENGER_URL]' },
      { channel: 'instagram', label: 'Instagram', url: '[INSTAGRAM_URL]' },
      { channel: 'phone', label: 'Call [PHONE]', url: 'tel:[PHONE]' },
    ],
  },
  socials: {
    instagram: '[INSTAGRAM_URL]',
    zalo: '[ZALO_URL]',
    messenger: '[MESSENGER_URL]',
    googleMaps: '[GOOGLE_MAPS_URL]',
  },
  establishedYear: '[YEAR]',
  showTestimonials: true,
  showBeforeAfter: true,
  beforeAfter: {
    id: 'transformation-01',
    title: 'Low Skin Taper Fade & Textured Crop',
    category: 'SIGNATURE TRANSFORMATION',
    description: 'From an overgrown, shapeless bulk to a crisp, low-taper skin fade with bespoke texture layering.',
    beforeImage: '/images/transformations/before.svg',
    afterImage: '/images/transformations/after.svg',
    altBefore: 'Before haircut: overgrown unstructured hair profile',
    altAfter: 'After haircut: clean low taper fade with textured crop styling',
  },
};
