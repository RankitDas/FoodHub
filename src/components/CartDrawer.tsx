'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2, X } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { scrollToSection } from '@/lib/scroll';

export const CartDrawer = () => {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.getTotalPrice());
  const deliveryFee = subtotal > 0 && subtotal < 35 ? 2.5 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    closeCart();
    setTimeout(() => scrollToSection('checkout'), 260);
  };

  const handleExploreMenu = () => {
    closeCart();
    setTimeout(() => scrollToSection('menu'), 220);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-gray-950/55 backdrop-blur-sm"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.aside
            className="fixed right-0 top-0 z-[70] flex h-screen w-full flex-col border-l border-black/5 bg-white shadow-2xl dark:border-white/10 dark:bg-gray-950 sm:w-[28rem]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            aria-label="Shopping cart"
          >
            <div className="relative overflow-hidden border-b border-black/5 p-5 dark:border-white/10 sm:p-6">
              <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-orange-400/20 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-orange-100 p-3 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                    <ShoppingCart size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-gray-400">
                      FoodHub
                    </p>
                    <h2 className="text-2xl font-black">Your Cart</h2>
                  </div>
                </div>
                <motion.button
                  type="button"
                  onClick={closeCart}
                  className="rounded-xl p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  whileHover={{ scale: 1.08, rotate: 4 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Close cart"
                >
                  <X size={22} />
                </motion.button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-5" data-lenis-prevent>
              {items.length === 0 ? (
                <motion.div
                  className="flex h-full min-h-[26rem] flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="mb-5 rounded-[2rem] bg-orange-50 p-6 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
                    <ShoppingBag size={42} />
                  </div>
                  <h3 className="mb-2 text-2xl font-black">Your cart is empty</h3>
                  <p className="mb-6 max-w-xs text-sm leading-6 text-gray-600 dark:text-gray-400">
                    Add a signature dish from the full menu and it will appear here instantly.
                  </p>
                  <motion.button
                    type="button"
                    onClick={handleExploreMenu}
                    className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-black text-white shadow-[0_18px_38px_-22px_rgba(249,115,22,1)]"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Explore Menu
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div className="space-y-3" layout>
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        className="grid grid-cols-[74px_1fr] gap-3 rounded-2xl border border-black/5 bg-gray-50 p-3 dark:border-white/10 dark:bg-gray-900 sm:grid-cols-[86px_1fr]"
                        initial={{ opacity: 0, x: 24, scale: 0.98 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 32, scale: 0.96 }}
                        transition={{ duration: 0.24 }}
                      >
                        <div className="relative h-[74px] overflow-hidden rounded-xl sm:h-[86px]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="100px"
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="mb-2 flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="truncate font-black">{item.name}</h3>
                              <p className="text-sm font-semibold text-orange-600">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <motion.button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.92 }}
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center rounded-full border border-black/5 bg-white p-1 dark:border-white/10 dark:bg-gray-950">
                              <motion.button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-orange-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                whileTap={{ scale: 0.88 }}
                                aria-label={`Decrease ${item.name} quantity`}
                              >
                                <Minus size={14} />
                              </motion.button>
                              <motion.span
                                key={item.quantity}
                                className="w-8 text-center text-sm font-black"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                              >
                                {item.quantity}
                              </motion.span>
                              <motion.button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-orange-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                whileTap={{ scale: 0.88 }}
                                aria-label={`Increase ${item.name} quantity`}
                              >
                                <Plus size={14} />
                              </motion.button>
                            </div>
                            <p className="text-sm font-black text-gray-950 dark:text-white">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {items.length > 0 && (
              <motion.div
                className="border-t border-black/5 bg-white/92 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/92 sm:p-6"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="mb-5 space-y-2 text-sm">
                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <motion.span key={subtotal} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>
                      ${subtotal.toFixed(2)}
                    </motion.span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-black/5 pt-3 text-xl font-black dark:border-white/10">
                    <span>Total</span>
                    <motion.span
                      key={total}
                      className="text-orange-600"
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      ${total.toFixed(2)}
                    </motion.span>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={handleCheckout}
                  className="mb-3 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-4 text-base font-black text-white shadow-[0_20px_44px_-24px_rgba(249,115,22,1)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Checkout
                </motion.button>
                <motion.button
                  type="button"
                  onClick={clearCart}
                  className="w-full rounded-xl border border-red-200 py-3 text-sm font-black text-red-600 transition-colors hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear Cart
                </motion.button>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
