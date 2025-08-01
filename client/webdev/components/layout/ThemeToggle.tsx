'use client'

import { Moon, Sun } from 'lucide-react'
import useTheme from 'next-theme'
import React from 'react'

const ThemeToggle = () => {

    const {theme, setTheme} = useTheme()

    const toggleTheme = () => {
        setTheme(theme == 'light' ? 'dark' : 'light')
    }

  return (
    <button onClick={toggleTheme}>
        <Sun className='hidden dark:block'/>
        <Moon className='block dark:hidden'/>
    </button>
  )
}

export default ThemeToggle