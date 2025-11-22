import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Calendar, AlertCircle, CheckCircle2, Clock, FlaskConical, BookOpen } from 'lucide-react'
import { assignments } from '../data/demoData'
import { format, parseISO, differenceInDays, isPast } from 'date-fns'

const Assignments = () => {
  const [filter, setFilter] = useState('all')
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  const filteredAssignments = assignments.filter(a => {
    if (filter === 'all') return true
    if (filter === 'pending') return a.status === 'pending'
    if (filter === 'in-progress') return a.status === 'in-progress'
    if (filter === 'completed') return a.status === 'completed'
    return true
  })

  const getTypeIcon = (type) => {
    switch (type) {
      case 'lab': return FlaskConical
      case 'record': return BookOpen
      default: return FileText
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'lab': return 'from-purple-500 to-pink-500'
      case 'record': return 'from-orange-500 to-red-500'
      case 'project': return 'from-blue-500 to-cyan-500'
      default: return 'from-green-500 to-emerald-500'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Assignments & Lab Reminders</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Smart reminders for homework, projects, and lab work
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'in-progress', 'completed'].map((f) => (
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
              {f.replace('-', ' ')}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filteredAssignments.map((assignment, idx) => {
            const daysLeft = differenceInDays(parseISO(assignment.dueDate), new Date())
            const isOverdue = isPast(parseISO(assignment.dueDate)) && assignment.status !== 'completed'
            const TypeIcon = getTypeIcon(assignment.type)
            
            return (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedAssignment(assignment)}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all card-hover"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-3 bg-gradient-to-br ${getTypeColor(assignment.type)} rounded-xl text-white`}>
                        <TypeIcon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {assignment.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded font-semibold ${
                            assignment.priority === 'high'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              : assignment.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          }`}>
                            {assignment.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {assignment.subject}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {assignment.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar size={16} className="text-gray-500" />
                          <span className={`font-semibold ${
                            isOverdue ? 'text-red-600' : daysLeft <= 2 ? 'text-orange-600' : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {format(parseISO(assignment.dueDate), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {assignment.status === 'completed' ? (
                            <CheckCircle2 size={16} className="text-green-600" />
                          ) : (
                            <Clock size={16} className="text-orange-600" />
                          )}
                          <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {assignment.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        {!isOverdue && !assignment.status === 'completed' && (
                          <>
                            <p className={`text-2xl font-bold ${
                              daysLeft <= 2 ? 'text-red-600' : daysLeft <= 5 ? 'text-orange-600' : 'text-green-600'
                            }`}>
                              {daysLeft}
                            </p>
                            <p className="text-xs text-gray-500">days left</p>
                          </>
                        )}
                        {isOverdue && (
                          <div className="flex items-center space-x-1 text-red-600">
                            <AlertCircle size={16} />
                            <span className="text-sm font-semibold">Overdue</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {assignment.type === 'lab' && (
                      <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                        <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-1">
                          Lab Instructions:
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          • Bring lab record book<br />
                          • Wear proper lab attire<br />
                          • Complete pre-lab questions
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Sidebar - Assignment Details */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-24"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Assignment Details
              </h3>
              
              {selectedAssignment ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                    <select
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
                      value={selectedAssignment.status}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Due Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {format(parseISO(selectedAssignment.dueDate), 'MMMM d, yyyy')}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Priority</p>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {selectedAssignment.priority}
                    </p>
                  </div>

                  <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
                    Set Reminder
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Select an assignment to view details
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Assignments

