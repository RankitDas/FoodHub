'use client';

import { HeroSection } from '@/components/HeroSection';
import { FeaturedFoods } from '@/components/FeaturedFoods';
import { MenuSection } from '@/components/MenuSection';
import { AboutSection } from '@/components/AboutSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { CheckoutSection } from '@/components/CheckoutSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <section id="featured">
        <FeaturedFoods />
      </section>
      <AboutSection />
      <section id="menu">
        <MenuSection />
      </section>
      <section id="testimonials">
        <TestimonialsSection />
      </section>
      <CheckoutSection />
    </main>
  );
}
