'use client';

import { motion } from 'framer-motion';

export const AboutSection = () => {
  const features = [
    { icon: '⚡', title: 'Lightning Fast', description: 'Order in seconds' },
    { icon: '🔒', title: 'Secure', description: 'Safe payments & data' },
    { icon: '🌍', title: 'Wide Range', description: 'All cuisines available' },
    { icon: '📦', title: 'Fresh Delivery', description: 'Hot & fresh guaranteed' },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Why Choose FoodHub?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Experience the future of food delivery
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
