import { BarberProfile } from '../types/index.ts';

export function generateBarberShopJsonLd(profile: BarberProfile): string {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BarberShop',
    name: profile.shopName,
    description: profile.heroSupportingText,
  };

  if (profile.heroImage?.src) {
    schema.image = profile.heroImage.src;
  }

  if (profile.phone && !profile.phone.includes('[')) {
    schema.telephone = profile.phone;
  }

  if (profile.address && !profile.address.includes('[')) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: profile.address,
      addressLocality: profile.city,
      addressCountry: profile.country,
    };
  }

  if (profile.socials?.googleMaps && !profile.socials.googleMaps.includes('[')) {
    schema.hasMap = profile.socials.googleMaps;
  }

  return JSON.stringify(schema, null, 2);
}
