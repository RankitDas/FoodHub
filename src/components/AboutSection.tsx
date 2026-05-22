'use client';

import { ElementType, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe2, PackageCheck, ShieldCheck, Zap } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  { icon: Zap, title: 'Lightning Fast', description: 'Optimized ordering and delivery pacing.' },
  { icon: ShieldCheck, title: 'Secure Checkout', description: 'Clean state handling with safe payment flow.' },
  { icon: Globe2, title: 'Wide Range', description: 'Curated categories for every craving.' },
  { icon: PackageCheck, title: 'Fresh Delivery', description: 'Packed hot, tracked clearly, and delivered fast.' },
];

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || reduceMotion) return;

    const context = gsap.context(() => {
      gsap.to(containerRef.current, {
        y: -36,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 1.15,
        },
      });

      gsap.to('.feature-card', {
        y: -18,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'bottom center',
          scrub: 1,
        },
      });

      gsap.to('.about-route-layer', {
        xPercent: -7,
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.3,
        },
      });

      gsap.to('.about-route-icons', {
        xPercent: 8,
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.6,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-white px-4 py-20 dark:bg-gray-950 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/60 to-transparent dark:via-orange-500/30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,146,60,0.12),transparent_28%),radial-gradient(circle_at_80%_65%,rgba(239,68,68,0.1),transparent_30%)]" />
      <div className="about-route-layer pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
        <div className="absolute left-[-8%] top-24 h-24 w-[116%] -rotate-2 border-y border-orange-200/45 bg-[linear-gradient(90deg,transparent,rgba(251,146,60,0.10),transparent)] dark:border-orange-500/10 dark:bg-[linear-gradient(90deg,transparent,rgba(251,146,60,0.06),transparent)]" />
        <div className="absolute bottom-16 left-[8%] h-24 w-[84%] rotate-2 border-y border-red-200/35 bg-[linear-gradient(90deg,transparent,rgba(239,68,68,0.08),transparent)] dark:border-red-500/10 dark:bg-[linear-gradient(90deg,transparent,rgba(239,68,68,0.05),transparent)]" />
        <div className="about-route-icons absolute bottom-20 left-[10%] flex w-[80%] items-center justify-between text-orange-500/10 dark:text-orange-300/10">
          {features.map(({ icon: Icon, title }) => (
            <Icon key={title} size={72} strokeWidth={1.2} />
          ))}
        </div>
      </div>

      <div ref={containerRef} className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mx-auto mb-14 max-w-3xl text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
            Why FoodHub
          </span>
          <h2 className="mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-4xl font-black tracking-normal text-transparent md:text-5xl">
            Built for premium delivery
          </h2>
          <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
            Every interaction is tuned to feel fast, clear, and effortless from first scroll to checkout.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              className="feature-card group rounded-2xl border border-black/5 bg-gradient-to-br from-gray-50 to-white p-6 text-center shadow-[0_20px_60px_-42px_rgba(15,23,42,0.75)] transition-colors duration-300 dark:border-white/10 dark:from-gray-900 dark:to-gray-950"
              initial={{ opacity: 0, scale: 0.95, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <motion.div
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-700 shadow-sm transition-colors group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 group-hover:text-white dark:bg-orange-500/10 dark:text-orange-300"
                animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.2 }}
              >
                <Icon size={26} />
              </motion.div>
              <h3 className="mb-2 text-lg font-black">{title}</h3>
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
