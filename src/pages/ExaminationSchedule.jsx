import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, FileText, Filter } from 'lucide-react'
import { examinationSchedule } from '../data/academicData'
import { format, parseISO, differenceInDays, isPast } from 'date-fns'

const ExaminationSchedule = () => {
  const [filter, setFilter] = useState('all')

  const filteredExams = examinationSchedule.filter(exam => {
    if (filter === 'all') return true
    if (filter === 'upcoming') return !isPast(parseISO(exam.date))
    if (filter === 'past') return isPast(parseISO(exam.date))
    return true
  })

  const getExamTypeColor = (type) => {
    const colors = {
      'Mid-Term': 'from-blue-500 to-cyan-500',
      'End Semester': 'from-purple-500 to-pink-500',
      'Lab Practical': 'from-orange-500 to-red-500',
      'Quiz': 'from-green-500 to-emerald-500',
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
        <h1 className="text-4xl font-bold gradient-text mb-2">Examination Schedule</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View all your upcoming and past examinations
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-wrap gap-2">
          {['all', 'upcoming', 'past'].map((f) => (
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

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam, idx) => {
          const isPastExam = isPast(parseISO(exam.date))
          const daysUntil = differenceInDays(parseISO(exam.date), new Date())
          
          return (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all card-hover"
            >
              {/* Exam Type Header */}
              <div className={`h-2 bg-gradient-to-r ${getExamTypeColor(exam.examType)}`} />
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded capitalize">
                        {exam.examType}
                      </span>
                      {isPastExam && (
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-xs rounded">
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {exam.subject}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exam.code}
                    </p>
                  </div>
                </div>

                {/* Exam Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {format(parseISO(exam.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-700 dark:text-gray-300">{exam.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-700 dark:text-gray-300">{exam.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <FileText size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-700 dark:text-gray-300">{exam.duration}</span>
                  </div>
                </div>

                {/* Days Until / Past */}
                {!isPastExam && (
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <p className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                      {daysUntil === 0 
                        ? 'Today!' 
                        : daysUntil === 1 
                        ? 'Tomorrow' 
                        : `${daysUntil} days to go`}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ExaminationSchedule


