import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ClipboardCheck, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { attendanceData } from '../data/academicData'

const Attendance = () => {
  const [selectedSubject, setSelectedSubject] = useState(null)

  const getAttendanceColor = (percentage) => {
    if (percentage < 75) return 'text-red-600 dark:text-red-400'
    if (percentage < 85) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-green-600 dark:text-green-400'
  }

  const getAttendanceBgColor = (percentage) => {
    if (percentage < 75) return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
    if (percentage < 85) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
    return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
  }

  const getAttendanceIcon = (percentage) => {
    if (percentage < 75) return AlertTriangle
    if (percentage < 85) return TrendingUp
    return CheckCircle2
  }

  // Calculate overall attendance
  const overallAttendance = attendanceData.reduce((acc, subject) => {
    acc.present += subject.overall.present
    acc.total += subject.overall.total
    return acc
  }, { present: 0, total: 0 })
  const overallPercentage = ((overallAttendance.present / overallAttendance.total) * 100).toFixed(2)

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Attendance</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monthly and overall attendance per subject
        </p>
      </motion.div>

      {/* Overall Attendance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className={`p-6 rounded-2xl shadow-lg border-2 ${getAttendanceBgColor(overallPercentage)}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Overall Attendance
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Across all subjects
              </p>
            </div>
            <div className="text-right">
              <p className={`text-5xl font-bold ${getAttendanceColor(overallPercentage)}`}>
                {overallPercentage}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {overallAttendance.present} / {overallAttendance.total} classes
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Subject-wise Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {attendanceData.map((subject, idx) => {
          const Icon = getAttendanceIcon(subject.overall.percentage)
          return (
            <motion.div
              key={subject.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedSubject(selectedSubject === subject.code ? null : subject.code)}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 cursor-pointer hover:shadow-xl transition-all ${
                getAttendanceBgColor(subject.overall.percentage)
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {subject.subject}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {subject.code}
                  </p>
                </div>
                <Icon 
                  size={24} 
                  className={getAttendanceColor(subject.overall.percentage)} 
                />
              </div>

              {/* Overall Attendance */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Overall Attendance
                  </span>
                  <span className={`text-2xl font-bold ${getAttendanceColor(subject.overall.percentage)}`}>
                    {subject.overall.percentage.toFixed(2)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      subject.overall.percentage < 75
                        ? 'bg-red-500'
                        : subject.overall.percentage < 85
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(subject.overall.percentage, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {subject.overall.present} / {subject.overall.total} classes
                </p>
              </div>

              {/* Monthly Breakdown (Expandable) */}
              {selectedSubject === subject.code && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Monthly Breakdown
                  </h4>
                  <div className="space-y-3">
                    {subject.monthly.map((month, i) => (
                      <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {month.month}
                          </span>
                          <span className={`text-lg font-bold ${getAttendanceColor(month.percentage)}`}>
                            {month.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              month.percentage < 75
                                ? 'bg-red-500'
                                : month.percentage < 85
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(month.percentage, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {month.present} / {month.total} classes
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Warning for low attendance */}
              {subject.overall.percentage < 75 && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle size={16} className="text-red-600 dark:text-red-400" />
                    <p className="text-sm text-red-700 dark:text-red-300 font-semibold">
                      Attendance below 75% - Action Required
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Attendance Status Legend
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="w-4 h-4 bg-red-500 rounded-full" />
            <div>
              <p className="font-semibold text-red-700 dark:text-red-300">Below 75%</p>
              <p className="text-xs text-red-600 dark:text-red-400">Danger - Shortage</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="w-4 h-4 bg-yellow-500 rounded-full" />
            <div>
              <p className="font-semibold text-yellow-700 dark:text-yellow-300">75% - 85%</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">Moderate</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            <div>
              <p className="font-semibold text-green-700 dark:text-green-300">85% and above</p>
              <p className="text-xs text-green-600 dark:text-green-400">Good</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Attendance


