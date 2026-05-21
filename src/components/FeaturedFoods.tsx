'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '@/store/cartStore';
import { FOODS } from '@/constants/foods';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedFoods = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();
  const featured = FOODS.slice(0, 3);

  useEffect(() => {
    if (!ref.current) return;

    const cards = ref.current.querySelectorAll('.food-card');
    cards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.2,
      });
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Featured Foods
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Handpicked delicious dishes just for you
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((food) => (
            <motion.div
              key={food.id}
              className="food-card bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-64 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 flex items-center justify-center overflow-hidden">
                <motion.div
                  className="text-8xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {food.image}
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{food.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {food.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">
                    ${food.price}
                  </span>
                  <motion.button
                    onClick={() => addItem(food)}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add
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
