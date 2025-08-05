'use client'

import TopBar from './TopBar'
import Navbar from './Navbar'

export default function Header() {
  return (
    <>
      {/* Додаємо невидимий div для компенсації фіксованої висоти хедера */}
      <div className="h-[136px]" /> {/* 40px для TopBar + 64px для Navbar + padding */}
      
      {/* Фіксований хедер */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <TopBar />
        <Navbar />
      </header>
    </>
  )
}