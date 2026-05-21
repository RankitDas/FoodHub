'use client';

import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X } from 'lucide-react';

export const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();

  const slideInVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeCart}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />

          <motion.div
            className="fixed right-0 top-0 h-screen w-full md:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
            variants={slideInVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
              <h2 className="text-2xl font-bold">Cart</h2>
              <motion.button
                onClick={closeCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Your cart is empty
                  </p>
                </motion.div>
              ) : (
                <motion.div className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center gap-4"
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <div className="text-4xl">{item.image}</div>
                        <div className="flex-1">
                          <h3 className="font-bold">{item.name}</h3>
                          <p className="text-orange-600 font-semibold">
                            ${item.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(0, item.quantity - 1)
                              )
                            }
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            −
                          </motion.button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <motion.button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            +
                          </motion.button>
                          <motion.button
                            onClick={() => removeItem(item.id)}
                            className="ml-2 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t dark:border-gray-800 p-6 space-y-4">
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-orange-600">${getTotalPrice().toFixed(2)}</span>
                </div>
                <motion.button
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Checkout
                </motion.button>
                <motion.button
                  onClick={clearCart}
                  className="w-full py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear Cart
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
