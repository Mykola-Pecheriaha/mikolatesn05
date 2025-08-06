'use client'

import TopBar from './TopBar'
import Navbar from './Navbar'
import Breadcrumbs from './Breadcrumbs'

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-50 ${className}`}>
      <TopBar />
      <Navbar />
      <Breadcrumbs />
    </header>
  )
}