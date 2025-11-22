import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Calendar, Clock, Bell, BookOpen, Users, 
  TrendingUp, AlertCircle, CheckCircle2 
} from 'lucide-react'
import { 
  classSchedule, assignments, events, messages, 
  studentInfo 
} from '../data/demoData'
import { format, parseISO, isPast, differenceInDays } from 'date-fns'

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Safe date formatting with error handling
  const getDayName = (date) => {
    try {
      return format(date, 'EEEE')
    } catch (e) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return days[date.getDay()]
    }
  }
  
  const todayClasses = classSchedule.filter(cls => cls.day === getDayName(currentTime))
  const upcomingAssignments = assignments
    .filter(a => {
      try {
        return !isPast(parseISO(a.dueDate))
      } catch (e) {
        return true
      }
    })
    .sort((a, b) => {
      try {
        return parseISO(a.dueDate) - parseISO(b.dueDate)
      } catch (e) {
        return 0
      }
    })
    .slice(0, 3)
  const upcomingEvents = events
    .filter(e => {
      try {
        return !isPast(parseISO(e.date))
      } catch (e) {
        return true
      }
    })
    .sort((a, b) => {
      try {
        return parseISO(a.date) - parseISO(b.date)
      } catch (e) {
        return 0
      }
    })
    .slice(0, 3)
  const unreadMessages = messages.filter(m => !m.read).length

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Welcome back, {studentInfo.name}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {getDayName(currentTime)}, {format(currentTime, 'MMMM d, yyyy')} • {format(currentTime, 'h:mm a')}
            </p>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 rounded-lg border border-primary-200 dark:border-primary-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Class & Year</p>
            <p className="text-lg font-bold text-primary-700 dark:text-primary-300">
              {studentInfo.classInfo}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <motion.div variants={itemVariants}>
          <StatCard
            icon={Calendar}
            label="Today's Classes"
            value={todayClasses.length}
            color="blue"
            link="/schedule"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            icon={BookOpen}
            label="Pending Assignments"
            value={assignments.filter(a => a.status === 'pending').length}
            color="purple"
            link="/assignments"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            icon={Bell}
            label="Unread Messages"
            value={unreadMessages}
            color="orange"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            icon={Users}
            label="Upcoming Events"
            value={upcomingEvents.length}
            color="green"
            link="/events"
          />
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2"
        >
          <Card title="Today's Schedule" icon={Clock} link="/schedule">
            {todayClasses.length > 0 ? (
              <div className="space-y-3">
                {todayClasses.map((cls, idx) => (
                  <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-primary-200 dark:border-gray-600"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {cls.subject}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {cls.time} • {cls.room} • {cls.faculty}
                        </p>
                        {cls.upcomingTopic && (
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded">
                              Topic: {cls.upcomingTopic}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No classes scheduled for today! 🎉
              </p>
            )}
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <Card title="Quick Actions" icon={TrendingUp}>
            <div className="space-y-2">
              <Link
                to="/assignments"
                className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen size={20} className="text-purple-600 dark:text-purple-400" />
                  <span className="font-medium">View Assignments</span>
                </div>
              </Link>
              <Link
                to="/events"
                className="block p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-3">
                  <Calendar size={20} className="text-green-600 dark:text-green-400" />
                  <span className="font-medium">Browse Events</span>
                </div>
              </Link>
              <Link
                to="/communities"
                className="block p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-3">
                  <Users size={20} className="text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">Join Communities</span>
                </div>
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2"
        >
          <Card title="Upcoming Deadlines" icon={AlertCircle} link="/assignments">
            <div className="space-y-3">
              {upcomingAssignments.map((assignment, idx) => {
                let daysLeft = 0
                try {
                  daysLeft = differenceInDays(parseISO(assignment.dueDate), new Date())
                } catch (e) {
                  daysLeft = 7
                }
                return (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {assignment.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded ${
                            assignment.priority === 'high' 
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {assignment.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {assignment.subject}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                          Due: {format(parseISO(assignment.dueDate), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`text-lg font-bold ${
                          daysLeft <= 2 ? 'text-red-600' : daysLeft <= 5 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {daysLeft}d
                        </span>
                        <p className="text-xs text-gray-500">left</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Card>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <Card title="Upcoming Events" icon={Calendar} link="/events">
            <div className="space-y-3">
              {upcomingEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {format(parseISO(event.date), 'MMM d')} • {event.time}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, label, value, color, link }) => {
  const colors = {
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500',
    green: 'from-green-500 to-emerald-500',
  }

  const content = (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className={`p-6 bg-gradient-to-br ${colors[color]} rounded-2xl shadow-lg text-white card-hover`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  )

  if (link) {
    return <Link to={link}>{content}</Link>
  }
  return content
}

const Card = ({ title, icon: Icon, children, link }) => {
  const content = (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {Icon && <Icon size={20} className="text-primary-600 dark:text-primary-400" />}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        {link && (
          <Link
            to={link}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            View all →
          </Link>
        )}
      </div>
      {children}
    </div>
  )

  return content
}

export default Dashboard
