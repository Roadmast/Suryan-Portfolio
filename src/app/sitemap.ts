import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://suryasiddamurthi.is-a.dev';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      images: [
        `${baseUrl}/og-image.png`,
        `${baseUrl}/twitter-image.png`,
      ],
    },
  ];
}
