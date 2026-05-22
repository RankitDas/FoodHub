'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CATEGORY_COPY, CATEGORIES, CategoryFilter, FOODS } from '@/constants/foods';
import { FoodCard } from '@/components/FoodCard';
import { ParallaxFoodRibbon } from '@/components/ParallaxFoodRibbon';

gsap.registerPlugin(ScrollTrigger);

const menuRibbonIds = [
  'salad-caesar',
  'pizza-truffle',
  'asian-pad-thai',
  'burger-mushroom',
  'drink-mango',
  'dessert-brownie',
];

const floatingAssets = [
  { id: 'pizza-margherita', className: 'left-[4%] top-[12%] h-24 w-24 md:h-32 md:w-32', y: -70 },
  { id: 'burger-classic', className: 'right-[5%] top-[18%] h-20 w-20 md:h-28 md:w-28', y: -95 },
  { id: 'asian-ramen', className: 'bottom-[10%] left-[8%] h-20 w-20 md:h-28 md:w-28', y: -55 },
  { id: 'dessert-chocolate', className: 'bottom-[14%] right-[10%] h-24 w-24 md:h-32 md:w-32', y: -85 },
];

export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const filteredFoods = useMemo(() => {
    if (activeCategory === 'All') return FOODS;
    return FOODS.filter((food) => food.category === activeCategory);
  }, [activeCategory]);

  const floatingFoods = useMemo(
    () =>
      floatingAssets
        .map((asset) => ({ ...asset, food: FOODS.find((food) => food.id === asset.id) }))
        .filter((asset): asset is (typeof floatingAssets)[number] & { food: (typeof FOODS)[number] } => Boolean(asset.food)),
    []
  );

  useEffect(() => {
    if (!sectionRef.current || reduceMotion) return;

    const context = gsap.context(() => {
      gsap.to('.menu-depth-layer', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to('.menu-floating-asset', {
        y: (index) => floatingFoods[index]?.y ?? -60,
        rotate: (index) => (index % 2 === 0 ? -8 : 8),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.menu-food-ribbon', {
        xPercent: 10,
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.35,
        },
      });

      gsap.to('.menu-food-ribbon-reverse', {
        xPercent: -12,
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.15,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, [floatingFoods, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-4 py-20 dark:bg-gray-950 sm:py-24"
    >
      <div className="menu-depth-layer pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-orange-300/20 blur-3xl dark:bg-orange-500/10" />
        <div className="absolute bottom-20 right-0 h-80 w-80 rounded-full bg-red-300/20 blur-3xl dark:bg-red-500/10" />
        <div className="food-particles absolute inset-0 opacity-60" />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block" aria-hidden="true">
        <ParallaxFoodRibbon
          ids={menuRibbonIds}
          className="menu-food-ribbon absolute -right-24 top-28 rotate-3 opacity-[0.18]"
          itemClassName="h-24 w-24 rounded-2xl"
          imageClassName="saturate-125"
        />
        <ParallaxFoodRibbon
          ids={menuRibbonIds}
          reverse
          className="menu-food-ribbon-reverse absolute -left-24 bottom-36 -rotate-3 opacity-[0.14]"
          itemClassName="h-20 w-20 rounded-xl"
          imageClassName="saturate-125"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {floatingFoods.map(({ food, className }) => (
          <motion.div
            key={food.id}
            className={`menu-floating-asset absolute overflow-hidden rounded-3xl border border-white/40 bg-white/40 shadow-2xl backdrop-blur ${className}`}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image src={food.image} alt="" fill sizes="160px" className="object-cover opacity-80" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
            Full Menu
          </span>
          <h2 className="mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-4xl font-black tracking-normal text-transparent md:text-5xl">
            Every craving, ready to order
          </h2>
          <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
            {CATEGORY_COPY[activeCategory]}
          </p>
        </motion.div>

        <motion.div
          className="sticky top-[76px] z-20 mx-auto mb-12 flex max-w-5xl gap-2 overflow-x-auto rounded-2xl border border-black/5 bg-white/80 p-2 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.5)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/80 sm:justify-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;

            return (
              <motion.button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`relative shrink-0 rounded-xl px-4 py-3 text-sm font-black transition-colors sm:px-5 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-300'
                }`}
                aria-pressed={isActive}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-menu-category"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_12px_28px_-18px_rgba(249,115,22,1)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {filteredFoods.map((food, index) => (
              <FoodCard key={food.id} food={food} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
