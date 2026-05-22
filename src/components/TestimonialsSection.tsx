'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '@/constants/foods';

gsap.registerPlugin(ScrollTrigger);

export const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || reduceMotion) return;

    const context = gsap.context(() => {
      gsap.to(containerRef.current, {
        y: -28,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 1,
        },
      });

      gsap.from('.testimonial-card', {
        opacity: 0,
        y: 42,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
      });

      gsap.to('.testimonial-ribbon-layer', {
        xPercent: -8,
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.25,
        },
      });

      gsap.to('.testimonial-star-field', {
        xPercent: 7,
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 py-20 dark:from-gray-900 dark:to-gray-950 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-72 bg-gradient-to-r from-orange-200/10 via-red-200/10 to-orange-200/10 blur-3xl dark:from-orange-500/5 dark:via-red-500/5 dark:to-orange-500/5" />
      <div className="testimonial-ribbon-layer pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
        <div className="absolute left-[-8%] top-16 h-28 w-[116%] -rotate-3 border-y border-orange-200/35 bg-[linear-gradient(90deg,transparent,rgba(251,146,60,0.08),transparent)] dark:border-orange-500/10" />
        <div className="absolute bottom-16 right-[-8%] h-24 w-[116%] rotate-3 border-y border-red-200/30 bg-[linear-gradient(90deg,transparent,rgba(239,68,68,0.07),transparent)] dark:border-red-500/10" />
      </div>
      <div className="testimonial-star-field pointer-events-none absolute inset-x-[8%] top-24 hidden justify-between text-yellow-400/15 lg:flex" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, index) => (
          <Star key={index} size={24 + (index % 3) * 10} className="fill-current" />
        ))}
      </div>

      <div ref={containerRef} className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
            Guest Stories
          </span>
          <h2 className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-4xl font-black tracking-normal text-transparent md:text-5xl">
            What customers keep ordering
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              className="testimonial-card rounded-2xl border border-black/5 bg-white p-8 shadow-[0_20px_64px_-42px_rgba(15,23,42,0.75)] transition-colors dark:border-white/10 dark:bg-gray-900"
              whileHover={{ y: -7, scale: 1.015 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
            >
              <div className="mb-5 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                  <motion.div
                    key={starIndex}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: starIndex * 0.05 }}
                  >
                    <Star size={20} className="fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <p className="mb-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <p className="text-lg font-black">{testimonial.name}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
