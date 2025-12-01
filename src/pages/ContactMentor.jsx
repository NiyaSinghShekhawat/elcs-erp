import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Send, User, Mail, Phone, MapPin, Clock, Paperclip } from 'lucide-react'
import { mentorInfo } from '../data/academicData'

const ContactMentor = () => {
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'student',
      subject: 'Query about attendance',
      message: 'Hello ma\'am, I wanted to discuss my attendance in Mathematics. Can we schedule a meeting?',
      timestamp: '2024-03-10T10:30:00',
    },
    {
      id: 2,
      from: 'mentor',
      subject: 'Re: Query about attendance',
      message: 'Hello! Yes, we can discuss this. Please come to my office during consultation hours (2-4 PM) or let me know your preferred time.',
      timestamp: '2024-03-10T14:15:00',
    },
  ])

  const handleSend = (e) => {
    e.preventDefault()
    if (!message.trim() || !subject.trim()) return

    const newMessage = {
      id: messages.length + 1,
      from: 'student',
      subject: subject,
      message: message,
      timestamp: new Date().toISOString(),
    }
    setMessages([...messages, newMessage])
    setMessage('')
    setSubject('')
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Contact Mentor</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Message your mentor/counselor teacher and share about anything
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mentor Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                {mentorInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {mentorInfo.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {mentorInfo.designation}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail size={16} className="text-primary-600 dark:text-primary-400" />
                <span className="text-gray-700 dark:text-gray-300">{mentorInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone size={16} className="text-primary-600 dark:text-primary-400" />
                <span className="text-gray-700 dark:text-gray-300">{mentorInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin size={16} className="text-primary-600 dark:text-primary-400" />
                <span className="text-gray-700 dark:text-gray-300">{mentorInfo.office}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Clock size={16} className="text-primary-600 dark:text-primary-400" />
                <span className="text-gray-700 dark:text-gray-300">{mentorInfo.consultationHours}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Department:</strong> {mentorInfo.department}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Messages Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            {/* Messages List */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex ${msg.from === 'student' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        msg.from === 'student'
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <User size={14} />
                        <span className="text-xs font-semibold opacity-80">
                          {msg.from === 'student' ? 'You' : mentorInfo.name.split(' ')[0]}
                        </span>
                        <span className="text-xs opacity-60">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm font-semibold mb-1">{msg.subject}</p>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSend} className="p-6">
              <div className="mb-4">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject..."
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 mb-3"
                  required
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Type your message..."
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Paperclip size={20} />
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-all flex items-center space-x-2"
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ContactMentor


