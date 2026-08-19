export interface OpeningHour {
  label: string;
  value: string;
  closed?: boolean;
}

export interface BarberProfile {
  name: string;
  shopName: string;
  tagline: string;
  heroHeadline: string;
  heroSupportingText: string;
  heroImage: {
    src: string;
    alt: string;
  };
  barberImage: {
    src: string;
    alt: string;
  };
  bioHeadline: string;
  bioParagraphs: string[];
  stats: { value: string; label: string }[];
  city: string;
  country: string;
  address: string;
  phone: string;
  openingHours: OpeningHour[];
  booking: {
    primaryChannel: 'zalo' | 'messenger' | 'instagram' | 'phone' | 'external';
    primaryUrl: string;
    primaryLabel: string;
    secondaryChannels: {
      channel: 'zalo' | 'messenger' | 'instagram' | 'phone';
      label: string;
      url: string;
    }[];
  };
  socials: {
    instagram?: string;
    zalo?: string;
    messenger?: string;
    facebook?: string;
    googleMaps?: string;
  };
  establishedYear: string;
  showTestimonials: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
}

export type StyleCategory = 'fade' | 'textured' | 'classic' | 'long' | 'beard';
export type StyleFilter = 'all' | StyleCategory;

export interface StyleItem {
  id: string;
  title: string;
  category: StyleCategory;
  description: string;
  image: string;
  alt: string;
  layoutVariant?: 'featured' | 'wide' | 'standard' | 'tall';
}

export interface GalleryItem {
  id: string;
  title: string;
  alt: string;
  image: string;
  layoutVariant?: 'featured' | 'wide' | 'standard' | 'tall';
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  rating: number;
  service?: string;
  isPlaceholder?: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
}
