'use client';

import { useEffect, useMemo, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FEATURED_FOOD_IDS, FOODS } from '@/constants/foods';
import { FoodCard } from '@/components/FoodCard';
import { ParallaxFoodRibbon } from '@/components/ParallaxFoodRibbon';

gsap.registerPlugin(ScrollTrigger);

const featuredRibbonIds = [
  'pizza-margherita',
  'burger-classic',
  'asian-sushi',
  'drink-berry',
  'salad-quinoa',
  'dessert-tiramisu',
];

export const FeaturedFoods = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const featured = useMemo(
    () =>
      FEATURED_FOOD_IDS.map((id) => FOODS.find((food) => food.id === id)).filter(
        (food): food is (typeof FOODS)[number] => Boolean(food)
      ),
    []
  );

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || reduceMotion) return;

    const context = gsap.context(() => {
      gsap.to(containerRef.current, {
        y: -34,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom center',
          scrub: 1.1,
        },
      });

      gsap.to('.featured-glow', {
        yPercent: -18,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      });

      gsap.to('.featured-food-ribbon', {
        xPercent: -14,
        yPercent: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.25,
        },
      });

      gsap.to('.featured-food-ribbon-reverse', {
        xPercent: 12,
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.45,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 px-4 py-20 dark:from-gray-950 dark:to-gray-900 sm:py-24"
    >
      <div className="featured-glow pointer-events-none absolute inset-x-0 top-10 mx-auto h-80 max-w-5xl rounded-full bg-gradient-to-r from-orange-300/20 via-red-300/20 to-amber-200/20 blur-3xl dark:from-orange-500/10 dark:via-red-500/10 dark:to-amber-500/10" />
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
        <ParallaxFoodRibbon
          ids={featuredRibbonIds}
          className="featured-food-ribbon absolute -left-20 top-12 -rotate-3 opacity-20"
          itemClassName="h-24 w-24 rounded-2xl"
          imageClassName="saturate-125"
        />
        <ParallaxFoodRibbon
          ids={featuredRibbonIds}
          reverse
          className="featured-food-ribbon-reverse absolute -right-20 bottom-12 rotate-3 opacity-[0.16]"
          itemClassName="h-20 w-20 rounded-xl"
          imageClassName="saturate-125"
        />
      </div>

      <div ref={containerRef} className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
            Featured
          </span>
          <h2 className="mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-4xl font-black tracking-normal text-transparent md:text-5xl">
            Signature dishes with real momentum
          </h2>
          <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
            The most ordered plates this week, tuned for fast checkout and fresh delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((food, index) => (
            <FoodCard key={food.id} food={food} index={index} priority={index === 0} compact />
          ))}
        </div>
      </div>
    </section>
  );
};
