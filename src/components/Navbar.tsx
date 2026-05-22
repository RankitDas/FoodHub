'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Moon, ShoppingCart, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCartStore } from '@/store/cartStore';
import { scrollToSection } from '@/lib/scroll';

const navItems = [
  { label: 'Featured', id: 'featured' },
  { label: 'Menu', id: 'menu' },
  { label: 'About', id: 'about' },
  { label: 'Stories', id: 'testimonials' },
  { label: 'Checkout', id: 'checkout' },
];

export const Navbar = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.35 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const sectionIds = ['home', ...navItems.map((item) => item.id)];

    const handleScroll = () => {
      let current = 'home';

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 150) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-black/5 bg-white/78 backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/78"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-orange-500 to-red-500"
        style={{ scaleX: progress }}
      />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <motion.button
          type="button"
          onClick={() => handleNavClick('home')}
          className="text-3xl font-black tracking-normal"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Go to FoodHub home"
        >
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            FoodHub
          </span>
        </motion.button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  isActive
                    ? 'text-orange-700 dark:text-orange-300'
                    : 'text-gray-700 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-300'
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-orange-100 dark:bg-orange-500/10"
                    transition={{ type: 'spring', stiffness: 430, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            type="button"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="rounded-xl p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-orange-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-orange-300"
            whileHover={{ scale: 1.08, rotate: resolvedTheme === 'dark' ? -8 : 8 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <motion.button
            type="button"
            onClick={openCart}
            className="relative rounded-xl p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-orange-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-orange-300"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Open cart"
          >
            <ShoppingCart size={21} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white shadow-lg"
                  initial={{ scale: 0.2, y: 6 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.2, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 520, damping: 24 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="rounded-xl p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-orange-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-orange-300 md:hidden"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="border-t border-black/5 bg-white/95 px-4 pb-4 pt-2 backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/95 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24 }}
          >
            <div className="grid gap-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className="rounded-xl px-4 py-3 text-left font-bold text-gray-700 transition-colors hover:bg-orange-50 hover:text-orange-700 dark:text-gray-300 dark:hover:bg-orange-500/10 dark:hover:text-orange-300"
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
