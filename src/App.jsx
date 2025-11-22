import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Schedule from './pages/Schedule'
import Assignments from './pages/Assignments'
import Events from './pages/Events'
import Communities from './pages/Communities'
import StudyMaterials from './pages/StudyMaterials'
import Canteen from './pages/Canteen'
import Settings from './pages/Settings'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
          <Navbar />
          <main className="pt-20 pb-8 px-4 md:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/events" element={<Events />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/materials" element={<StudyMaterials />} />
              <Route path="/canteen" element={<Canteen />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
