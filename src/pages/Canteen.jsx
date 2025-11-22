import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Coffee, IceCream, ChefHat, Star } from 'lucide-react'
import { canteenMenu } from '../data/demoData'

const Canteen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState([])

  const categories = ['all', 'main', 'snack', 'beverage']
  const categoryLabels = {
    all: 'All Items',
    main: 'Main Course',
    snack: 'Snacks',
    beverage: 'Beverages',
  }

  const allItems = [...canteenMenu.specials, ...canteenMenu.regular]
  const filteredItems = allItems.filter(item => {
    if (selectedCategory === 'all') return true
    return item.category === selectedCategory || (!item.category && selectedCategory === 'main')
  })

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId))
  }

  const updateQuantity = (itemId, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id === itemId) {
        const newQuantity = i.quantity + delta
        if (newQuantity <= 0) return null
        return { ...i, quantity: newQuantity }
      }
      return i
    }).filter(Boolean))
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'main': return ChefHat
      case 'snack': return IceCream
      case 'beverage': return Coffee
      default: return UtensilsCrossed
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Canteen Menu</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Today's specials and regular menu
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {new Date(canteenMenu.today).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Section */}
        <div className="lg:col-span-2">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const CategoryIcon = getCategoryIcon(category)
                return (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                      selectedCategory === category
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <CategoryIcon size={18} />
                    <span>{categoryLabels[category]}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Today's Specials Banner */}
          {selectedCategory === 'all' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Star size={24} className="fill-white" />
                <h2 className="text-2xl font-bold">Today's Specials</h2>
              </div>
              <p className="text-orange-100">
                Fresh and delicious meals prepared daily
              </p>
            </motion.div>
          )}

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item, idx) => {
              const isSpecial = canteenMenu.specials.some(s => s.id === item.id)
              const inCart = cart.find(c => c.id === item.id)
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 transition-all ${
                    isSpecial 
                      ? 'border-orange-300 dark:border-orange-700' 
                      : 'border-gray-200 dark:border-gray-700'
                  } hover:shadow-xl card-hover`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        {isSpecial && (
                          <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded font-semibold flex items-center space-x-1">
                            <Star size={12} className="fill-orange-500" />
                            <span>Special</span>
                          </span>
                        )}
                      </div>
                      <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        ₹{item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
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
                    
                    {item.available && (
                      <button
                        onClick={() => addToCart(item)}
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-all"
                      >
                        {inCart ? `Add More (${inCart.quantity})` : 'Add to Cart'}
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-24"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Your Cart
              </h3>
              
              {cart.length > 0 ? (
                <>
                  <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              ₹{item.price} each
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            ×
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                            >
                              −
                            </button>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        Total:
                      </span>
                      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        ₹{total}
                      </span>
                    </div>
                    <button className="w-full px-4 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-all">
                      Place Order
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <UtensilsCrossed size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Your cart is empty
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Canteen

