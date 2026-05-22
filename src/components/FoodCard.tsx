'use client';

import Image from 'next/image';
import { memo, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Flame, Plus, ShoppingCart, Star } from 'lucide-react';
import { Food } from '@/constants/foods';
import { useCartStore } from '@/store/cartStore';

interface FoodCardProps {
  food: Food;
  index?: number;
  priority?: boolean;
  compact?: boolean;
}

const FoodCardComponent = ({ food, index = 0, priority = false, compact = false }: FoodCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleAdd = () => {
    addItem(food);
    setJustAdded(true);

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setJustAdded(false), 1100);
  };

  return (
    <motion.article
      layout
      className="menu-food-card group relative overflow-hidden rounded-2xl border border-black/5 bg-white/90 shadow-[0_18px_60px_-36px_rgba(15,23,42,0.65)] backdrop-blur transition-colors duration-300 dark:border-white/10 dark:bg-gray-900/90"
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ duration: 0.42, delay: Math.min(index * 0.035, 0.22), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="absolute -bottom-14 left-10 h-32 w-32 rounded-full bg-red-400/20 blur-3xl" />
      </div>

      <div className={`relative overflow-hidden ${compact ? 'h-56' : 'h-64'}`}>
        <Image
          src={food.image}
          alt={food.imageAlt}
          fill
          priority={priority}
          sizes={compact ? '(min-width: 768px) 33vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
          className="object-cover transition duration-700 will-change-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {food.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/20 bg-white/85 px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm backdrop-blur dark:bg-gray-950/80 dark:text-white"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span>{food.rating.toFixed(1)}</span>
            </div>
            <h3 className="text-2xl font-black tracking-normal">{food.name}</h3>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-black/35 px-3 py-1.5 text-sm font-semibold backdrop-blur">
            <Flame size={15} className="text-orange-300" />
            {food.calories}
          </div>
        </div>
      </div>

      <div className="relative p-5">
        <p className="mb-5 min-h-[3rem] text-sm leading-6 text-gray-600 dark:text-gray-400">
          {food.description}
        </p>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Price</p>
            <p className="text-2xl font-black text-orange-600">${food.price.toFixed(2)}</p>
          </div>

          <motion.button
            type="button"
            onClick={handleAdd}
            className="relative inline-flex min-w-[122px] items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 text-sm font-bold text-white shadow-[0_16px_32px_-18px_rgba(249,115,22,0.9)] transition-shadow hover:shadow-[0_20px_36px_-16px_rgba(249,115,22,1)]"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label={`Add ${food.name} to cart`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {justAdded ? (
                <motion.span
                  key="added"
                  className="flex items-center gap-2"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Check size={17} />
                  Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  className="flex items-center gap-2"
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <ShoppingCart size={17} />
                  Add
                  <Plus size={15} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export const FoodCard = memo(FoodCardComponent);
