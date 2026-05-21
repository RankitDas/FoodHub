'use client';

import { useState } from 'react';
import { FOODS, CATEGORIES } from '@/constants/foods';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';

export const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addItem } = useCartStore();

  const filtered = activeCategory === 'All'
    ? FOODS
    : FOODS.filter((f) => f.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  const categoryButtonVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Full Menu
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Explore our delicious selection</p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-12"
          initial="hidden"
          whileInView="visible"
          variants={categoryButtonVariants}
          viewport={{ once: false }}
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all text-sm sm:text-base ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filtered.map((food) => (
            <motion.div
              key={food.id}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 flex items-center justify-center">
                <motion.div
                  className="text-6xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {food.image}
                </motion.div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{food.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(food.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                    />
                  ))}
                  <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">{food.rating}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {food.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-600">
                    ${food.price}
                  </span>
                  <motion.button
                    onClick={() => addItem(food)}
                    className="px-3 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700 transition-colors flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart size={16} />
                    <span className="hidden sm:inline">Add</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
