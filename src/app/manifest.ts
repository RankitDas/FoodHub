import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FoodHub',
    short_name: 'FoodHub',
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f97316',
    icons: [
      {
        src: '/icon.svg',
        sizes: '128x128',
        type: 'image/svg+xml',
      },
    ],
  };
}
