import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Star, ChefHat } from 'lucide-react'
import { canteenMenu } from '../data/demoData'

const Canteen = () => {
  const allItems = [...canteenMenu.specials, ...canteenMenu.regular]

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-4xl font-bold gradient-text mb-2">Canteen Menu</h1>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-full font-semibold">
                🥬 Pure Vegetarian
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Today's specials and regular menu prices
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Specials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Star size={28} className="fill-white" />
              <h2 className="text-3xl font-bold">Today's Specials</h2>
            </div>
            <p className="text-orange-100 text-lg">
              Fresh and delicious meals prepared daily
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              {canteenMenu.specials.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 rounded-lg border-2 ${
                    item.available
                      ? 'border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded font-semibold flex items-center space-x-1">
                          <Star size={12} className="fill-orange-500" />
                          <span>Special</span>
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        ₹{item.price}
                      </p>
                    </div>
                    <div className="ml-4">
                      {item.available ? (
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded font-semibold">
                          Available
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded font-semibold">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Regular Menu Price Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 mb-6">
              <ChefHat size={24} className="text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Regular Menu - Price Chart
              </h2>
            </div>
            
            <div className="space-y-3">
              {canteenMenu.regular.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <UtensilsCrossed size={18} className="text-gray-500 dark:text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    {item.available ? (
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        Available
                      </span>
                    ) : (
                      <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                        Unavailable
                      </span>
                    )}
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400 min-w-[60px] text-right">
                      ₹{item.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                <strong>🥬 Pure Vegetarian:</strong> All items in our canteen are 100% vegetarian.
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Note:</strong> Regular menu items are available throughout the day. 
                Prices are subject to change. Please visit the canteen for the most up-to-date menu.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Canteen
