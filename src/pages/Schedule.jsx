import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, User, BookOpen, Bell, CheckCircle2 } from 'lucide-react'
import { classSchedule } from '../data/demoData'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('Monday')
  const [selectedClass, setSelectedClass] = useState(null)
  const [notifications, setNotifications] = useState({})

  const dayClasses = classSchedule.filter(cls => cls.day === selectedDay)

  const toggleNotification = (classId) => {
    setNotifications(prev => ({
      ...prev,
      [classId]: !prev[classId]
    }))
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Class Schedule</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Interactive timetable with topics and notifications
        </p>
      </motion.div>

      {/* Day Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedDay === day
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {day}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes List */}
        <div className="lg:col-span-2 space-y-4">
          {dayClasses.length > 0 ? (
            dayClasses.map((cls, idx) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedClass(cls)}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all card-hover"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {cls.subject}
                      </h3>
                      {cls.isLab && (
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded">
                          Lab
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {cls.code}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock size={16} className="text-primary-600 dark:text-primary-400" />
                        <span className="text-gray-700 dark:text-gray-300">{cls.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin size={16} className="text-primary-600 dark:text-primary-400" />
                        <span className="text-gray-700 dark:text-gray-300">{cls.room}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <User size={16} className="text-primary-600 dark:text-primary-400" />
                        <span className="text-gray-700 dark:text-gray-300">{cls.faculty}</span>
                      </div>
                    </div>

                    {cls.upcomingTopic && (
                      <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                        <div className="flex items-center space-x-2 mb-1">
                          <BookOpen size={16} className="text-primary-600 dark:text-primary-400" />
                          <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                            Upcoming Topic
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {cls.upcomingTopic}
                        </p>
                      </div>
                    )}

                    {cls.topics && cls.topics.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          Covered Topics:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {cls.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleNotification(cls.id)
                    }}
                    className={`p-2 rounded-lg transition-all ${
                      notifications[cls.id]
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Bell size={20} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No classes scheduled for {selectedDay}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar - Class Details */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-24"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Class Details
              </h3>
              
              {selectedClass ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Subject</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedClass.subject}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Upcoming Topic</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {selectedClass.upcomingTopic || 'Not specified'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Absence Tracking
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-600 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Mark as absent
                        </span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-primary-600 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Mark topics as reviewed
                        </span>
                      </label>
                    </div>
                  </div>

                  {notifications[selectedClass.id] && (
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />
                        <span className="text-sm text-green-700 dark:text-green-300">
                          Notifications enabled
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Select a class to view details
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Schedule

