import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, Calendar, FileText, CalendarDays, 
  Users, BookOpen, UtensilsCrossed, Settings, Menu, X,
  GraduationCap, User, ChevronDown, ClipboardCheck, 
  GraduationCap as ExamIcon, Briefcase, Award, FileEdit, MessageSquare
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { studentInfo } from '../data/demoData'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/schedule', icon: Calendar, label: 'Schedule' },
  { path: '/assignments', icon: FileText, label: 'Assignments' },
  { path: '/events', icon: CalendarDays, label: 'Events' },
  { path: '/communities', icon: Users, label: 'Communities' },
  { path: '/materials', icon: BookOpen, label: 'Materials' },
  { path: '/canteen', icon: UtensilsCrossed, label: 'Canteen' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

const Navbar = () => {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

  const academicMenuItems = [
    { path: '/attendance', icon: ClipboardCheck, label: 'Attendance' },
    { path: '/examination-schedule', icon: ExamIcon, label: 'Examination Schedule' },
    { path: '/placement-cell', icon: Briefcase, label: 'Placement Cell' },
    { path: '/exam-results', icon: Award, label: 'Exam Results' },
    { path: '/leave-application', icon: FileEdit, label: 'Leave Application' },
    { path: '/contact-mentor', icon: MessageSquare, label: 'Contact Mentor' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.relative')) {
        setIsProfileDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileDropdownOpen])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-lg backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                      isActive
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary-500 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </motion.button>

            {/* User Avatar with Dropdown */}
            <div className="hidden sm:block relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-2 py-1 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                  {studentInfo.avatar}
                </div>
                <span className="text-sm font-medium hidden lg:block dark:text-gray-300">
                  {studentInfo.name}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`text-gray-600 dark:text-gray-400 transition-transform ${
                    isProfileDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Academic
                      </p>
                    </div>
                    <div className="py-2">
                      {academicMenuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsProfileDropdownOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-2.5 transition-colors ${
                              isActive
                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            <Icon size={18} />
                            <span className="text-sm font-medium">{item.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

