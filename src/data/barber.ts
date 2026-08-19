import { BarberProfile } from '../types/index.ts';

export const barberProfile: BarberProfile = {
  name: '[BARBER_NAME]',
  shopName: '[BARBERSHOP_NAME]',
  tagline: 'YOUR STYLE. YOUR SIGNATURE.',
  heroHeadline: 'YOUR STYLE. YOUR SIGNATURE.',
  heroSupportingText: 'Precision cuts, modern fades, and personalized grooming crafted for your style.',
  heroImage: {
    src: '/images/hero/hero.jpg',
    alt: 'Master barber at work styling precision haircut',
  },
  barberImage: {
    src: '/images/barber/barber.jpg',
    alt: 'Portrait of master barber [BARBER_NAME]',
  },
  bioHeadline: 'MORE THAN A HAIRCUT.',
  bioParagraphs: [
    "I'm [BARBER_NAME], a personal barber focused on clean cuts, modern fades, and styles that actually fit the person wearing them.",
    'Every haircut starts with understanding your face shape, hair texture, lifestyle, and the look you want to achieve.',
    "The goal isn't simply to give you a good haircut. It's to give you a style that feels like you.",
  ],
  stats: [
    { value: '[XX]+', label: 'YEARS EXPERIENCE' },
    { value: '[XXXX]+', label: 'HAIRCUTS DELIVERED' },
    { value: '[XX]+', label: 'CUSTOM STYLES' },
    { value: '[XX]+', label: 'REGULAR CLIENTS' },
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
};
