'use client'

import React from 'react'
import { CelebrateButton } from '@/components/CelebrateButton'
import { DarkModeToggle } from '@/components/DarkModeToggle'

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 flex items-center space-x-2">
        <CelebrateButton>
          Click Me
        </CelebrateButton>
        <DarkModeToggle />
      </div>
    </header>
  )
}

export default Header
