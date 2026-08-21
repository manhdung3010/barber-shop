import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sownbarbershop.vn';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${baseUrl}/images/logo.jpg`,
        `${baseUrl}/images/hero/hero.jpg`,
        `${baseUrl}/images/barber/barber.jpg`,
        `${baseUrl}/images/styles/low-fade.jpg`,
        `${baseUrl}/images/styles/mid-fade.jpg`,
        `${baseUrl}/images/styles/textured-crop.jpg`,
        `${baseUrl}/images/styles/high-fade.jpg`,
        `${baseUrl}/images/styles/classic.jpg`,
        `${baseUrl}/images/styles/long-hair.jpg`,
        `${baseUrl}/images/styles/beard.jpg`,
      ],
    },
  ];
}
