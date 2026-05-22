'use client';

import { ElementType } from 'react';
import { motion } from 'framer-motion';
import { FileText, HelpCircle, Instagram, Mail, Shield, Truck } from 'lucide-react';
import { scrollToSection } from '@/lib/scroll';

const quickLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Menu', id: 'menu' },
  { label: 'About', id: 'about' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Checkout', id: 'checkout' },
];

type SupportLink =
  | { label: string; href: string; external: true }
  | { label: string; id: string; external?: false };

const supportLinks: SupportLink[] = [
  { label: 'Contact', href: 'mailto:dasrankit2018@gmail.com', external: true },
  { label: 'FAQ', id: 'footer-faq' },
  { label: 'Delivery Info', id: 'footer-delivery' },
  { label: 'Terms', id: 'footer-terms' },
  { label: 'Privacy Policy', id: 'footer-privacy' },
];

const supportCards: Array<{
  id: string;
  icon: ElementType;
  title: string;
  text: string;
}> = [
  {
    id: 'footer-faq',
    icon: HelpCircle,
    title: 'FAQ',
    text: 'Orders can be adjusted from the cart before checkout. Delivery timing updates after confirmation.',
  },
  {
    id: 'footer-delivery',
    icon: Truck,
    title: 'Delivery Info',
    text: 'Standard delivery is 30-45 minutes. Delivery is free on orders of $35 or more.',
  },
  {
    id: 'footer-terms',
    icon: FileText,
    title: 'Terms',
    text: 'Menu availability, pricing, and delivery estimates can vary by location and demand.',
  },
  {
    id: 'footer-privacy',
    icon: Shield,
    title: 'Privacy Policy',
    text: 'FoodHub only uses order details to prepare checkout, delivery, and support experiences.',
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleInternalLink = (id: string) => {
    scrollToSection(id);
  };

  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-gray-950 px-4 pb-28 pt-14 text-white md:pb-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,146,60,0.18),transparent_28%),radial-gradient(circle_at_90%_30%,rgba(239,68,68,0.12),transparent_26%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <button
              type="button"
              onClick={() => handleInternalLink('home')}
              className="mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-3xl font-black tracking-normal text-transparent"
            >
              FoodHub
            </button>
            <p className="max-w-xs leading-7 text-gray-400">
              Premium food delivery with cinematic browsing, quick cart actions, and smooth checkout.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06 }}
          >
            <h4 className="mb-4 font-black">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <motion.button
                    type="button"
                    onClick={() => handleInternalLink(link.id)}
                    className="text-left transition-colors hover:text-orange-300"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <h4 className="mb-4 font-black">Support</h4>
            <ul className="space-y-2 text-gray-400">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <motion.a
                      href={link.href}
                      className="inline-flex transition-colors hover:text-orange-300"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.label}
                    </motion.a>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={() => handleInternalLink(link.id)}
                      className="text-left transition-colors hover:text-orange-300"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.label}
                    </motion.button>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            <h4 className="mb-4 font-black">Follow Us</h4>
            <div className="flex gap-3">
              <motion.a
                href="https://www.instagram.com/ig_always_?igsh=MTk5YzB6NDFoY2pjZg=="
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 p-3 text-gray-300 transition-colors hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300"
                whileHover={{ scale: 1.12, rotate: 5, boxShadow: '0 0 34px rgba(251,146,60,0.25)' }}
                whileTap={{ scale: 0.92 }}
                aria-label="Open FoodHub Instagram"
              >
                <Instagram size={21} />
              </motion.a>
              <motion.a
                href="mailto:dasrankit2018@gmail.com"
                className="rounded-2xl border border-white/10 bg-white/5 p-3 text-gray-300 transition-colors hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-300"
                whileHover={{ scale: 1.12, rotate: -5, boxShadow: '0 0 34px rgba(251,146,60,0.25)' }}
                whileTap={{ scale: 0.92 }}
                aria-label="Email FoodHub support"
              >
                <Mail size={21} />
              </motion.a>
            </div>
            <a
              href="mailto:dasrankit2018@gmail.com"
              className="mt-4 inline-flex text-sm font-semibold text-gray-400 transition-colors hover:text-orange-300"
            >
              dasrankit2018@gmail.com
            </a>
          </motion.div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-4">
          {supportCards.map(({ id, icon: Icon, title, text }, index) => (
            <motion.article
              id={id}
              key={id}
              className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-orange-500/10 p-3 text-orange-300">
                <Icon size={22} />
              </div>
              <h5 className="mb-2 font-black">{title}</h5>
              <p className="text-sm leading-6 text-gray-400">{text}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-gray-400 md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p>&copy; {currentYear} FoodHub. All rights reserved.</p>
          <div className="flex gap-4">
            <button type="button" onClick={() => handleInternalLink('footer-privacy')} className="hover:text-orange-300">
              Privacy Policy
            </button>
            <button type="button" onClick={() => handleInternalLink('footer-terms')} className="hover:text-orange-300">
              Terms
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
