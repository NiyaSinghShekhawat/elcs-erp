import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, TrendingUp, MessageSquare, BookOpen } from 'lucide-react'
import { examResults } from '../data/academicData'

const ExamResults = () => {
  const [selectedResult, setSelectedResult] = useState(null)

  // Calculate overall GPA
  const overallGPA = (examResults.reduce((sum, result) => sum + result.gpa, 0) / examResults.length).toFixed(2)

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'text-green-600 dark:text-green-400'
    if (grade === 'B+' || grade === 'B') return 'text-yellow-600 dark:text-yellow-400'
    return 'text-orange-600 dark:text-orange-400'
  }

  const getGradeBg = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
    if (grade === 'B+' || grade === 'B') return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
    return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Exam Results</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View your marks, GPA, and teacher remarks
        </p>
      </motion.div>

      {/* Overall GPA Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="p-6 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall GPA</h2>
              <p className="text-primary-100">Based on all examinations</p>
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold">{overallGPA}</p>
              <p className="text-primary-100 text-sm mt-1">Out of 4.0</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {examResults.map((result, idx) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedResult(selectedResult === result.id ? null : result.id)}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {result.subject}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {result.code} • {result.examType}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-lg font-bold text-lg ${getGradeBg(result.grade)}`}>
                  {result.grade}
                </span>
              </div>
            </div>

            {/* Marks and GPA */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Marks</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {result.marks.obtained} / {result.marks.total}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {((result.marks.obtained / result.marks.total) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">GPA</p>
                <p className={`text-2xl font-bold ${getGradeColor(result.grade)}`}>
                  {result.gpa}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Out of 4.0
                </p>
              </div>
            </div>

            {/* Teacher Remarks (Expandable) */}
            {selectedResult === result.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <MessageSquare size={20} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                      Teacher Remarks
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {result.teacherRemarks}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Click to view remarks hint */}
            {selectedResult !== result.id && (
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <MessageSquare size={14} />
                <span>Click to view teacher remarks</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ExamResults


