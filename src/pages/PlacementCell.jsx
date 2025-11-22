import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, Clock, ExternalLink, Tag, Filter } from 'lucide-react'
import { placementOpportunities } from '../data/academicData'
import { format, parseISO, differenceInDays } from 'date-fns'

const PlacementCell = () => {
  const [filter, setFilter] = useState('all')

  const filteredOpportunities = placementOpportunities.filter(opp => {
    if (filter === 'all') return true
    return opp.type.toLowerCase() === filter.toLowerCase()
  })

  const getTypeColor = (type) => {
    const colors = {
      'Workshop': 'from-blue-500 to-cyan-500',
      'Seminar': 'from-purple-500 to-pink-500',
      'Bootcamp': 'from-orange-500 to-red-500',
    }
    return colors[type] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Placement Cell</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Workshops and seminars by MNCs to learn and upskill
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-wrap gap-2">
          {['all', 'workshop', 'seminar', 'bootcamp'].map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl font-semibold capitalize transition-all ${
                filter === f
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpportunities.map((opp, idx) => {
          const daysUntil = differenceInDays(parseISO(opp.date), new Date())
          
          return (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all card-hover"
            >
              {/* Type Header */}
              <div className={`h-2 bg-gradient-to-r ${getTypeColor(opp.type)}`} />
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded capitalize">
                        {opp.type}
                      </span>
                      <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded font-semibold">
                        {opp.company}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {opp.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {opp.description}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {format(parseISO(opp.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-700 dark:text-gray-300">{opp.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Briefcase size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-700 dark:text-gray-300">{opp.platform}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {opp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded flex items-center space-x-1"
                      >
                        <Tag size={12} />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Days Until */}
                <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <p className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                    {daysUntil === 0 
                      ? 'Today!' 
                      : daysUntil === 1 
                      ? 'Tomorrow' 
                      : `${daysUntil} days to go`}
                  </p>
                </div>

                {/* Register Button */}
                <a
                  href={opp.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Register Now</span>
                  <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default PlacementCell

