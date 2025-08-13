'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from './Logo'
import { Bars3Icon, XMarkIcon, ChevronRightIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from '@/context/ThemeContext'
import ConsultationModal from '../ConsultationForm/ConsultationModal'

const navigation = [
  {
    name: 'Головна',
    href: '/',
  },
  {
    name: 'Наші фахівці',
    href: '/specialists',
    submenu: [
      { name: 'Загальна хірургія', href: '/specialists/general' },
      { name: 'Пластична хірургія', href: '/specialists/plastic' },
      { name: 'Урологія', href: '/specialists/urology' },
      { name: 'Хірургія вен', href: '/specialists/vein' },
      { name: 'Пухлини шкіри', href: '/specialists/skin' },
      { name: 'Баріатрична хірургія', href: '/specialists/bariatric' },
    ],
  },
  {
    name: 'Послуги',
    href: '/services',
    submenu: [
      { name: 'Невідкладна хірургія', href: '/services/emergency' },
      { name: 'Традиційна хірургія', href: '/services/traditional' },
      { name: 'Пластична хірургія', href: '/services/plastic' },
      { name: 'Малоінвазивна хірургія', href: '/services/minimally-invasive' },
      { name: 'Хірургія вен', href: '/services/vein' },
      { name: 'Баріартрична хірургія', href: '/services/bariatric' },
      { name: 'Проктологія', href: '/services/proctology' },
      { name: 'Урологія', href: '/services/urology' },
      { name: 'Хірургія пухлин шкіри і слизових', href: '/services/tumor' },
      { name: 'Гнійносептична хірургія', href: '/services/purulent' },
    ],
  },
  {
    name: 'Команда',
    href: '/team',
  },
  {
    name: 'Про клініку',
    href: '/about',
    submenu: [
      { name: 'Відділення хірургічне', href: '/about/department' },
      { name: 'Операційна', href: '/about/operating-room' },
      { name: 'Обладнання', href: '/about/equipment' },
    ],
  },
  {
    name: 'Контакти',
    href: '/contacts',
  },
  {
    name: 'Блог',
    href: '/blog',
  },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setActiveSubmenu(null)
  }

  const handleMenuItemClick = (item: { name: string; submenu?: { name: string; href: string }[] }) => {
    if (item.submenu) {
      setActiveSubmenu(activeSubmenu === item.name ? null : item.name)
    } else {
      closeMobileMenu()
    }
  }

  return (
    <nav style={{
      backgroundColor: 'var(--navbar-bg)',
      color: 'var(--navbar-text)'
    }}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Десктопне меню */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <div className="flex items-center space-x-1">
                  <Link
                    href={item.href}
                    className="text-white hover:text-white/80 text-base font-medium"
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <ChevronRightIcon className="h-4 w-4 text-white group-hover:text-white/80 rotate-90" />
                  )}
                </div>

                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-base text-[#7491a3] hover:bg-gray-50"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Праві кнопки */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 text-white hover:text-white/80"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsConsultationModalOpen(true)}
              className="bg-white text-[#7491a3] px-6 py-2.5 rounded-md hover:bg-white/90 text-base font-medium"
            >
              Безкоштовна консультація
            </button>
          </div>

          {/* Кнопка мобільного меню */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-white/80"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Мобільне меню */}
        <div
          className={`lg:hidden fixed inset-0 z-50 bg-[#7491a3] transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ top: '64px' }}
        >
          <div className="h-full overflow-y-auto">
            <div className="divide-y divide-white/10">
              {navigation.map((item) => (
                <div key={item.name} className="py-2">
                  <button
                    onClick={() => handleMenuItemClick(item)}
                    className="w-full px-4 py-2 flex items-center justify-between text-white hover:text-white/80"
                  >
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.submenu && (
                      <ChevronRightIcon
                        className={`h-5 w-5 transition-transform ${
                          activeSubmenu === item.name ? 'rotate-90' : ''
                        }`}
                      />
                    )}
                  </button>
                  {item.submenu && activeSubmenu === item.name && (
                    <div className="bg-white/10 py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={closeMobileMenu}
                          className="block px-8 py-2 text-sm text-white hover:text-white/80"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="p-4 space-y-4">
                <button 
                  onClick={toggleTheme}
                  className="flex items-center text-white hover:text-white/80"
                >
                  {theme === 'dark' ? (
                    <SunIcon className="h-5 w-5 mr-2" />
                  ) : (
                    <MoonIcon className="h-5 w-5 mr-2" />
                  )}
                  <span>Змінити тему</span>
                </button>
                <button
                  onClick={() => {
                    closeMobileMenu();
                    setIsConsultationModalOpen(true);
                  }}
                  className="block w-full bg-white text-[#7491a3] px-4 py-2 rounded-md hover:bg-white/90 text-sm font-medium text-center"
                >
                  Безкоштовна консультація
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </nav>
  )
}