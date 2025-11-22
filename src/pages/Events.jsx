import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, CheckCircle2, XCircle } from 'lucide-react'
import { events } from '../data/demoData'
import { format, parseISO, isPast, differenceInDays } from 'date-fns'

const Events = () => {
  const [rsvpStatus, setRsvpStatus] = useState({})
  const [filter, setFilter] = useState('all')

  const filteredEvents = events.filter(e => {
    if (filter === 'all') return true
    if (filter === 'upcoming') return !isPast(parseISO(e.date))
    if (filter === 'past') return isPast(parseISO(e.date))
    return true
  })

  const toggleRSVP = (eventId) => {
    setRsvpStatus(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }))
  }

  const getEventTypeColor = (type) => {
    const colors = {
      festival: 'from-purple-500 to-pink-500',
      workshop: 'from-blue-500 to-cyan-500',
      seminar: 'from-green-500 to-emerald-500',
      competition: 'from-orange-500 to-red-500',
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
        <h1 className="text-4xl font-bold gradient-text mb-2">Events & Workshops</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Centralized listing of all college events with RSVP tracking
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, idx) => {
          const isPastEvent = isPast(parseISO(event.date))
          const daysUntil = differenceInDays(parseISO(event.date), new Date())
          const hasRSVPed = rsvpStatus[event.id]
          const isFull = event.attendees >= event.maxAttendees

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all card-hover"
            >
              {/* Event Header */}
              <div className={`h-2 bg-gradient-to-r ${getEventTypeColor(event.type)}`} />
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded capitalize">
                        {event.type}
                      </span>
                      {isPastEvent && (
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-xs rounded">
                          Past
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {format(parseISO(event.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-700 dark:text-gray-300">{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-700 dark:text-gray-300">{event.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {event.attendees}/{event.maxAttendees} attendees
                    </span>
                  </div>
                </div>

                {/* Days Until / Past */}
                {!isPastEvent && (
                  <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <p className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                      {daysUntil === 0 
                        ? 'Today!' 
                        : daysUntil === 1 
                        ? 'Tomorrow' 
                        : `${daysUntil} days to go`}
                    </p>
                  </div>
                )}

                {/* RSVP Button */}
                {event.rsvpRequired && !isPastEvent && (
                  <button
                    onClick={() => toggleRSVP(event.id)}
                    disabled={isFull && !hasRSVPed}
                    className={`w-full px-4 py-3 rounded-lg font-semibold transition-all ${
                      hasRSVPed
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : isFull
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-primary-500 text-white hover:bg-primary-600'
                    }`}
                  >
                    {hasRSVPed ? (
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle2 size={18} />
                        <span>RSVP Confirmed</span>
                      </div>
                    ) : isFull ? (
                      <div className="flex items-center justify-center space-x-2">
                        <XCircle size={18} />
                        <span>Event Full</span>
                      </div>
                    ) : (
                      'RSVP Now'
                    )}
                  </button>
                )}

                {!event.rsvpRequired && !isPastEvent && (
                  <div className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-center text-sm text-gray-600 dark:text-gray-400">
                    No RSVP Required
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

export default Events

