'use client'

import TopBar from './TopBar'
import Navbar from './Navbar'
import Breadcrumbs from './Breadcrumbs'

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <Navbar />
      <Breadcrumbs />
    </header>
  )
}