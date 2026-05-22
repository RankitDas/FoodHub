import type { Metadata, Viewport } from 'next';
import { Providers } from '@/lib/providers';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { siteConfig } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'FoodHub - Modern Food Ordering',
    template: '%s | FoodHub',
  },
  description: siteConfig.description,
  keywords: ['food delivery', 'ordering', 'restaurants', 'cuisine', 'online food ordering'],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'FoodHub - Modern Food Ordering',
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoodHub - Modern Food Ordering',
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <CartDrawer />
          {children}
          <Footer />
          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  );
}
