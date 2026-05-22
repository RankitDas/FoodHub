'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FOODS } from '@/constants/foods';
import { scrollToSection } from '@/lib/scroll';
import { ParallaxFoodRibbon } from '@/components/ParallaxFoodRibbon';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
}

const heroRibbonIds = [
  'pizza-pepperoni',
  'asian-ramen',
  'salad-greek',
  'burger-bacon',
  'dessert-cheesecake',
  'drink-orange',
];

const AnimatedCounter = ({ value, suffix = '', decimals = 0 }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const totalFrames = 54;

    const tick = () => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(value * progress);

      if (frame < totalFrames) requestAnimationFrame(tick);
    };

    const request = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(request);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const heroFoods = useMemo(
    () => [
      FOODS.find((food) => food.id === 'pizza-margherita'),
      FOODS.find((food) => food.id === 'burger-classic'),
      FOODS.find((food) => food.id === 'drink-berry'),
    ].filter((food): food is (typeof FOODS)[number] => Boolean(food)),
    []
  );

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || reduceMotion) return;

    const section = sectionRef.current;
    const pointerLayer = section.querySelector<HTMLElement>('.hero-pointer-layer');
    const movePointerX = pointerLayer ? gsap.quickTo(pointerLayer, 'x', { duration: 0.65, ease: 'power3.out' }) : undefined;
    const movePointerY = pointerLayer ? gsap.quickTo(pointerLayer, 'y', { duration: 0.65, ease: 'power3.out' }) : undefined;

    const handlePointerMove = (event: PointerEvent) => {
      if (!movePointerX || !movePointerY) return;

      const bounds = section.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      movePointerX(x * 34);
      movePointerY(y * 24);
    };

    const handlePointerLeave = () => {
      movePointerX?.(0);
      movePointerY?.(0);
    };

    section.addEventListener('pointermove', handlePointerMove);
    section.addEventListener('pointerleave', handlePointerLeave);

    const context = gsap.context(() => {
      gsap.from(textRef.current?.querySelectorAll('[data-hero-reveal]') ?? [], {
        opacity: 0,
        y: 30,
        duration: 0.85,
        stagger: 0.09,
        ease: 'power3.out',
      });

      gsap.to('.hero-gradient-depth', {
        yPercent: 22,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1,
        },
      });

      gsap.to('.hero-food-ribbon', {
        xPercent: -12,
        yPercent: 18,
        rotate: -9,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.25,
        },
      });

      gsap.to('.hero-food-ribbon-secondary', {
        xPercent: 10,
        yPercent: -12,
        rotate: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.35,
        },
      });

      gsap.to('.hero-float-card', {
        y: (index) => 110 + index * 32,
        rotate: (index) => (index % 2 === 0 ? 8 : -8),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => {
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerleave', handlePointerLeave);
      context.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:pt-32"
    >
      <div className="hero-gradient-depth pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(251,146,60,0.22),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(239,68,68,0.16),transparent_30%),linear-gradient(180deg,rgba(255,247,237,0.76),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(251,146,60,0.16),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(239,68,68,0.12),transparent_30%),linear-gradient(180deg,rgba(17,24,39,0.72),rgba(3,7,18,0))]" />
      <div className="food-particles pointer-events-none absolute inset-0 opacity-70" />

      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden xl:block" aria-hidden="true">
        <ParallaxFoodRibbon
          ids={heroRibbonIds}
          className="hero-food-ribbon absolute -left-24 top-[15%] -rotate-6 opacity-25"
          itemClassName="h-28 w-28 rounded-[1.35rem]"
          imageClassName="opacity-90 saturate-125"
        />
        <ParallaxFoodRibbon
          ids={heroRibbonIds}
          reverse
          className="hero-food-ribbon-secondary absolute -right-24 bottom-[14%] rotate-6 opacity-20"
          itemClassName="h-24 w-24 rounded-[1.2rem]"
          imageClassName="opacity-90 saturate-125"
        />
      </div>

      <div className="hero-pointer-layer pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {heroFoods.map((food, index) => (
          <motion.div
            key={food.id}
            className={`hero-float-card absolute overflow-hidden rounded-[2rem] border border-white/45 bg-white/40 shadow-2xl backdrop-blur ${
              index === 0
                ? 'left-[6%] top-[22%] h-44 w-44'
                : index === 1
                  ? 'right-[7%] top-[18%] h-52 w-52'
                  : 'bottom-[12%] right-[18%] h-36 w-36'
            }`}
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src={food.image}
              alt=""
              fill
              priority={index === 0}
              sizes="220px"
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      <div ref={textRef} className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          data-hero-reveal
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/75 px-4 py-2 text-sm font-bold text-orange-700 shadow-sm backdrop-blur dark:border-orange-500/20 dark:bg-gray-950/70 dark:text-orange-300"
          whileHover={{ y: -2 }}
        >
          <Sparkles size={16} />
          Cinematic food ordering, delivered fast
        </motion.div>

        <h1
          data-hero-reveal
          className="mb-6 bg-gradient-to-r from-orange-600 via-red-500 to-orange-500 bg-clip-text text-5xl font-black tracking-normal text-transparent sm:text-6xl md:text-7xl"
        >
          Delicious Food, Delivered Fast
        </h1>

        <p
          data-hero-reveal
          className="mx-auto mb-9 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400 sm:text-xl"
        >
          Premium meals, smooth checkout, and a menu that feels as polished as the food tastes.
        </p>

        <div data-hero-reveal className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <motion.button
            type="button"
            onClick={() => scrollToSection('menu')}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-black text-white shadow-[0_24px_50px_-24px_rgba(249,115,22,1)] transition-shadow hover:shadow-[0_28px_60px_-22px_rgba(249,115,22,1)] sm:w-auto"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Order Now
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </motion.button>

          <motion.button
            type="button"
            onClick={() => scrollToSection('featured')}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white/80 px-8 py-4 text-lg font-black text-gray-900 shadow-sm backdrop-blur transition-colors hover:border-orange-200 hover:text-orange-700 dark:border-white/10 dark:bg-gray-950/70 dark:text-white dark:hover:border-orange-500/30 dark:hover:text-orange-300 sm:w-auto"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Explore Menu
            <Clock size={20} />
          </motion.button>
        </div>

        <div
          data-hero-reveal
          className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-3 rounded-2xl border border-black/5 bg-white/65 p-3 shadow-[0_20px_70px_-42px_rgba(15,23,42,0.8)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/55"
        >
          {[
            { value: 25, suffix: ' min', label: 'average delivery' },
            { value: 4.9, suffix: '', label: 'guest rating', decimals: 1 },
            { value: 24, suffix: '/7', label: 'live ordering' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl px-2 py-3 text-center">
              <p className="text-2xl font-black text-gray-950 dark:text-white">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection('featured')}
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 rounded-full border border-black/10 bg-white/70 p-3 text-gray-700 shadow-sm backdrop-blur transition-colors hover:text-orange-600 dark:border-white/10 dark:bg-gray-950/70 dark:text-gray-300 dark:hover:text-orange-300 sm:block"
        aria-label="Scroll to featured food"
      >
        <motion.span
          className="block h-5 w-5 rounded-full border-b-2 border-r-2 border-current"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ rotate: 45 }}
        />
      </button>
    </section>
  );
};
