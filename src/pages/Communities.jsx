import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, MessageSquare, Hash, Building2, GraduationCap, Heart } from 'lucide-react'
import { groups, clubs } from '../data/demoData'
import { studentInfo } from '../data/demoData'

const Communities = () => {
  const [selectedType, setSelectedType] = useState('all')
  const [joinedGroups, setJoinedGroups] = useState([1, 2, 4, 5])

  const filteredGroups = groups.filter(g => {
    if (selectedType === 'all') return true
    return g.type === selectedType
  })

  const toggleJoin = (groupId) => {
    setJoinedGroups(prev => 
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    )
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'college-wide': return Building2
      case 'branch': return Hash
      case 'year': return GraduationCap
      case 'club': return Heart
      default: return Users
    }
  }

  const getTypeColor = (type) => {
    const colors = {
      'college-wide': 'from-blue-500 to-cyan-500',
      'branch': 'from-purple-500 to-pink-500',
      'year': 'from-green-500 to-emerald-500',
      'club': 'from-orange-500 to-red-500',
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
        <h1 className="text-4xl font-bold gradient-text mb-2">Communities & Groups</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with peers, join discussions, and stay updated
        </p>
      </motion.div>

      {/* Type Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-wrap gap-2">
          {['all', 'college-wide', 'branch', 'year', 'club'].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-2 rounded-xl font-semibold capitalize transition-all ${
                selectedType === type
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {type.replace('-', ' ')}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group, idx) => {
          const TypeIcon = getTypeIcon(group.type)
          const isJoined = joinedGroups.includes(group.id)
          const matchingClub = clubs.find(c => c.id === group.clubId)

          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all card-hover"
            >
              {/* Group Header */}
              <div className={`h-2 bg-gradient-to-r ${getTypeColor(group.type)}`} />
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 bg-gradient-to-br ${getTypeColor(group.type)} rounded-xl text-white text-2xl`}>
                      {group.icon || (matchingClub?.icon || '👥')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {group.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mt-1">
                        {group.type.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {group.description}
                </p>

                {/* Group Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Users size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {group.members} members
                    </span>
                  </div>
                  {group.branch && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Hash size={16} className="text-primary-600 dark:text-primary-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {group.branch}
                      </span>
                    </div>
                  )}
                  {group.year && (
                    <div className="flex items-center space-x-2 text-sm">
                      <GraduationCap size={16} className="text-primary-600 dark:text-primary-400" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Year {group.year}
                      </span>
                    </div>
                  )}
                </div>

                {/* Join/Leave Button */}
                <button
                  onClick={() => toggleJoin(group.id)}
                  className={`w-full px-4 py-3 rounded-lg font-semibold transition-all ${
                    isJoined
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  }`}
                >
                  {isJoined ? 'Leave Group' : 'Join Group'}
                </button>

                {isJoined && (
                  <button className="w-full mt-2 px-4 py-2 bg-white dark:bg-gray-800 border border-primary-500 text-primary-600 dark:text-primary-400 rounded-lg font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
                    <div className="flex items-center justify-center space-x-2">
                      <MessageSquare size={18} />
                      <span>Open Chat</span>
                    </div>
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Recommended Groups */}
      {selectedType === 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Recommended for You
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Based on your branch ({studentInfo.branch}) and year ({studentInfo.year}), here are some groups you might like:
            </p>
            <div className="flex flex-wrap gap-2">
              {groups
                .filter(g => 
                  (g.type === 'branch' && g.branch === studentInfo.branch) ||
                  (g.type === 'year' && g.year === studentInfo.year && g.branch === studentInfo.branch)
                )
                .map(group => (
                  <span
                    key={group.id}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium"
                  >
                    {group.name}
                  </span>
                ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Communities

