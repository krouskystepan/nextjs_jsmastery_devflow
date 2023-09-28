'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface ThemeContextType {
  mode: string
  setMode: (mode: string) => void
}

const themeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState('')

  const handleThemeChange = () => {
    if (mode === 'light') {
      setMode('light')
      document.documentElement.classList.add('light')
    } else {
      setMode('dark')
      document.documentElement.classList.add('dark')
    }
  }

  useEffect(() => {
    handleThemeChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  return (
    <themeContext.Provider value={{ mode, setMode }}>
      {children}
    </themeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(themeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used with a ThemeProvider')
  }

  return context
}