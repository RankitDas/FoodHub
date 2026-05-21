import type { Metadata } from 'next';
import { Providers } from '@/lib/providers';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'FoodHub - Modern Food Ordering',
  description: 'Premium food delivery with beautiful UI and smooth animations',
  keywords: 'food delivery, ordering, restaurants, cuisine',
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
        </Providers>
      </body>
    </html>
  );
}
