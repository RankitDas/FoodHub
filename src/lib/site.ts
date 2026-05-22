const fallbackUrl = 'http://localhost:3000';

const getSiteUrl = () => {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackUrl;

  try {
    return new URL(rawUrl).origin;
  } catch {
    return fallbackUrl;
  }
};

export const siteConfig = {
  name: 'FoodHub',
  url: getSiteUrl(),
  description: 'Premium food delivery with cinematic browsing, quick cart actions, and smooth checkout.',
};
