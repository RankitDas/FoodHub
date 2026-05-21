'use client';

import { useCartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export const CheckoutSection = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setOrderPlaced(false);
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            ✅
          </motion.div>
          <h2 className="text-3xl font-bold mb-2">Order Placed!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your food will arrive in 30-45 minutes
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <section id="checkout" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {items.length === 0 ? (
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Add items to your cart to proceed with checkout
          </p>
        </motion.div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Order Summary */}
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-8 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="border-t dark:border-gray-700 pt-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 dark:text-gray-400">
                  Delivery Fee
                </span>
                <span>$2.00</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span className="text-orange-600">
                  ${(getTotalPrice() + 2).toFixed(2)}
                </span>
              </div>
            </div>

            <motion.button
              onClick={handlePlaceOrder}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Place Order
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      )}
    </section>
  );
};
