import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileEdit, Calendar, Clock, Send, CheckCircle2 } from 'lucide-react'
import { format, parseISO } from 'date-fns'

const LeaveApplication = () => {
  const [formData, setFormData] = useState({
    leaveType: 'sick',
    startDate: '',
    endDate: '',
    reason: '',
    contactNumber: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [applications, setApplications] = useState([
    {
      id: 1,
      leaveType: 'Sick Leave',
      startDate: '2024-03-15',
      endDate: '2024-03-16',
      reason: 'Fever and cold',
      status: 'approved',
      submittedDate: '2024-03-10',
    },
    {
      id: 2,
      leaveType: 'Personal Leave',
      startDate: '2024-03-20',
      endDate: '2024-03-20',
      reason: 'Family function',
      status: 'pending',
      submittedDate: '2024-03-18',
    },
  ])

  const leaveTypes = [
    { value: 'sick', label: 'Sick Leave' },
    { value: 'personal', label: 'Personal Leave' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'other', label: 'Other' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const newApplication = {
      id: applications.length + 1,
      leaveType: leaveTypes.find(lt => lt.value === formData.leaveType)?.label || formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
    }
    setApplications([newApplication, ...applications])
    setSubmitted(true)
    setFormData({
      leaveType: 'sick',
      startDate: '',
      endDate: '',
      reason: '',
      contactNumber: '',
    })
    setTimeout(() => setSubmitted(false), 3000)
  }

  const getStatusColor = (status) => {
    if (status === 'approved') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
    if (status === 'rejected') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
    return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Leave Application</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Apply for leave and track your applications
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-6">
            <FileEdit size={24} className="text-primary-600 dark:text-primary-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Application</h2>
          </div>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 flex items-center space-x-2"
            >
              <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />
              <span className="text-green-700 dark:text-green-300 font-semibold">
                Application submitted successfully!
              </span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Leave Type
              </label>
              <select
                value={formData.leaveType}
                onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                {leaveTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Reason
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Please provide a reason for your leave..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Contact Number (during leave)
              </label>
              <input
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-all flex items-center justify-center space-x-2"
            >
              <Send size={18} />
              <span>Submit Application</span>
            </button>
          </form>
        </motion.div>

        {/* Previous Applications */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Previous Applications
          </h2>

          <div className="space-y-4">
            {applications.map((app, idx) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {app.leaveType}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>
                          {format(parseISO(app.startDate), 'MMM d')} - {format(parseISO(app.endDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {app.reason}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Submitted: {format(parseISO(app.submittedDate), 'MMM d, yyyy')}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LeaveApplication

