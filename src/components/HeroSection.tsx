'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallaxRef.current || !textRef.current) return;

    // Parallax effect
    gsap.to(parallaxRef.current, {
      scrollTrigger: {
        trigger: parallaxRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: 200,
      ease: 'none',
    });

    // Text animation
    const tl = gsap.timeline();
    tl.from(textRef.current.querySelectorAll('h1, p, button'), {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-b from-orange-500/20 via-red-500/10 to-transparent"
      />
      
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <motion.div
          className="text-9xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🍕
        </motion.div>
        <motion.div
          className="text-8xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          🍔
        </motion.div>
        <motion.div
          className="text-8xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          🍜
        </motion.div>
      </div>

      <div ref={textRef} className="relative z-10 text-center px-4 max-w-4xl">
        <motion.h1
          className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Delicious Food, Delivered Fast
        </motion.h1>
        
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience premium food delivery with our modern ordering platform
        </motion.p>
        
        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Order Now
        </motion.button>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl"
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
};
