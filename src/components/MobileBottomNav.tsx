'use client';

import { motion } from 'framer-motion';
import { CreditCard, Home, ShoppingBag, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { scrollToSection } from '@/lib/scroll';

const mobileItems = [
  { label: 'Home', id: 'home', icon: Home },
  { label: 'Menu', id: 'menu', icon: ShoppingBag },
  { label: 'Cart', id: 'cart', icon: ShoppingCart },
  { label: 'Checkout', id: 'checkout', icon: CreditCard },
];

export const MobileBottomNav = () => {
  const openCart = useCartStore((state) => state.openCart);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const handleClick = (id: string) => {
    if (id === 'cart') {
      openCart();
      return;
    }

    scrollToSection(id);
  };

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 rounded-2xl border border-white/50 bg-white/88 p-1.5 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.75)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/88">
        {mobileItems.map(({ label, id, icon: Icon }) => (
          <motion.button
            key={id}
            type="button"
            onClick={() => handleClick(id)}
            className="relative flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-bold text-gray-600 transition-colors hover:bg-orange-50 hover:text-orange-600 dark:text-gray-300 dark:hover:bg-orange-500/10 dark:hover:text-orange-300"
            whileTap={{ scale: 0.94 }}
            aria-label={label}
          >
            <Icon size={20} />
            <span>{label}</span>
            {id === 'cart' && totalItems > 0 && (
              <motion.span
                key={totalItems}
                className="absolute right-3 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white"
                initial={{ scale: 0.2 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 24 }}
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  );
};
