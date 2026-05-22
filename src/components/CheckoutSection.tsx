'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShoppingBag, Truck } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useCartStore } from '@/store/cartStore';
import { scrollToSection } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

export const CheckoutSection = () => {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const deliveryFee = subtotal > 0 && subtotal < 35 ? 2.5 : 0;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (!sectionRef.current || reduceMotion) return;

    const context = gsap.context(() => {
      gsap.from('.checkout-card', {
        opacity: 0,
        y: 42,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to('.checkout-depth', {
        yPercent: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to('.checkout-route-layer', {
        xPercent: 9,
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.35,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, [reduceMotion]);

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 500);
    setTimeout(() => {
      setOrderPlaced(false);
      scrollToSection('home');
    }, 3200);
  };

  return (
    <section
      ref={sectionRef}
      id="checkout"
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 px-4 py-20 dark:from-gray-950 dark:to-gray-900 sm:py-24"
    >
      <div className="checkout-depth pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-orange-300/15 blur-3xl dark:bg-orange-500/10" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-red-300/15 blur-3xl dark:bg-red-500/10" />
      </div>
      <div className="checkout-route-layer pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" aria-hidden="true">
        <div className="absolute left-[8%] top-32 h-px w-[84%] bg-gradient-to-r from-transparent via-orange-300/45 to-transparent dark:via-orange-500/20" />
        <div className="absolute left-[14%] top-40 h-px w-[72%] bg-gradient-to-r from-transparent via-red-300/35 to-transparent dark:via-red-500/15" />
        <Truck className="absolute right-[13%] top-24 text-orange-500/15 dark:text-orange-300/10" size={92} strokeWidth={1.15} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          className="mx-auto mb-10 max-w-2xl text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="mb-4 inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
            Checkout
          </span>
          <h2 className="mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-4xl font-black tracking-normal text-transparent md:text-5xl">
            Finish in one smooth step
          </h2>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            className="checkout-card mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-black/5 bg-white/85 p-10 text-center shadow-[0_24px_80px_-46px_rgba(15,23,42,0.8)] backdrop-blur dark:border-white/10 dark:bg-gray-900/85"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-5 rounded-[2rem] bg-orange-50 p-6 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
              <ShoppingBag size={44} />
            </div>
            <h3 className="mb-2 text-2xl font-black">Build your order first</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Your checkout summary will appear as soon as you add menu items.
            </p>
            <motion.button
              type="button"
              onClick={() => scrollToSection('menu')}
              className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-7 py-3 font-black text-white shadow-[0_18px_38px_-22px_rgba(249,115,22,1)]"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Explore Menu
            </motion.button>
          </motion.div>
        ) : (
          <div className="checkout-card grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              className="rounded-3xl border border-black/5 bg-white/88 p-5 shadow-[0_24px_80px_-46px_rgba(15,23,42,0.8)] backdrop-blur dark:border-white/10 dark:bg-gray-900/88 sm:p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-5 text-2xl font-black">Order Summary</h3>
              <div className="max-h-[27rem] space-y-3 overflow-y-auto pr-1" data-lenis-prevent>
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="grid grid-cols-[72px_1fr_auto] items-center gap-3 rounded-2xl bg-gray-50 p-3 dark:bg-gray-950"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                    >
                      <div className="relative h-[72px] overflow-hidden rounded-xl">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-black">{item.name}</p>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                          Qty {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-black text-gray-950 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-black/5 bg-gray-950 p-6 text-white shadow-[0_24px_80px_-46px_rgba(15,23,42,0.9)] dark:border-white/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-3 text-orange-300">
                  <Truck size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/45">
                    Delivery
                  </p>
                  <h3 className="text-2xl font-black">30-45 minutes</h3>
                </div>
              </div>

              <div className="mb-6 space-y-3 border-y border-white/10 py-6">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between pt-3 text-2xl font-black">
                  <span>Total</span>
                  <motion.span key={total} className="text-orange-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    ${total.toFixed(2)}
                  </motion.span>
                </div>
              </div>

              <motion.button
                type="button"
                onClick={handlePlaceOrder}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-4 text-lg font-black text-white shadow-[0_18px_42px_-22px_rgba(249,115,22,1)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Place Order
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {orderPlaced && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-gray-950/65 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-sm rounded-3xl border border-white/40 bg-white p-8 text-center shadow-2xl dark:border-white/10 dark:bg-gray-950"
              initial={{ scale: 0.9, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            >
              <motion.div
                className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-300"
                initial={{ scale: 0.4, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 18 }}
              >
                <CheckCircle2 size={46} />
              </motion.div>
              <h2 className="mb-2 text-3xl font-black">Order Placed</h2>
              <p className="mb-5 text-gray-600 dark:text-gray-400">
                Your meal is confirmed and the kitchen is already preparing it.
              </p>
              <div className="flex items-center justify-center gap-2 font-bold text-orange-600 dark:text-orange-300">
                <Truck size={20} />
                Preparing your order
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
