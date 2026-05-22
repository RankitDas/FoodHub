'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </ThemeProvider>
  );
}
