import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      return saved || 'light'
    } catch (e) {
      return 'light'
    }
  })
  
  const [accentColor, setAccentColor] = useState(() => {
    try {
      const saved = localStorage.getItem('accentColor')
      return saved || 'blue'
    } catch (e) {
      return 'blue'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    
    // Set accent color CSS variable
    const accentColors = {
      blue: '#0ea5e9',
      purple: '#a855f7',
      pink: '#ec4899',
      green: '#10b981',
      orange: '#f59e0b',
      red: '#ef4444',
    }
    
    root.style.setProperty('--accent-color', accentColors[accentColor])
    root.style.setProperty('--accent-hover', accentColors[accentColor] + 'dd')
  }, [theme, accentColor])

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {
      console.warn('Could not save theme to localStorage:', e)
    }
  }, [theme])

  useEffect(() => {
    try {
      localStorage.setItem('accentColor', accentColor)
    } catch (e) {
      console.warn('Could not save accent color to localStorage:', e)
    }
  }, [accentColor])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

