'use client'

import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Logo from './Logo'

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
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // Тут буде логіка зміни теми
  }

  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-200">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Logo />
                </div>
              </div>

              {/* Десктопне меню */}
              <div className="hidden lg:ml-6 lg:flex lg:space-x-6">
                {navigation.map((item) => (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600"
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="absolute left-0 mt-2 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-1 bg-white p-2">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="p-2 flex items-start rounded-lg hover:bg-gray-50"
                              >
                                <div className="text-sm font-medium text-gray-900">
                                  {subItem.name}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="hidden lg:ml-6 lg:flex lg:items-center space-x-4">
                {/* Перемикач теми */}
                <button
                  onClick={toggleTheme}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                >
                  {isDarkMode ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>

                {/* Кнопка консультації */}
                <Link
                  href="/consultation"
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Безкоштовна консультація
                </Link>
              </div>

              {/* Мобільне меню */}
              <div className="flex items-center lg:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <span className="sr-only">Відкрити головне меню</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Мобільне меню панель */}
          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Fragment key={item.name}>
                  <Disclosure.Button
                    as={Link}
                    href={item.href}
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                  >
                    {item.name}
                  </Disclosure.Button>
                  {item.submenu && (
                    <div className="pl-4">
                      {item.submenu.map((subItem) => (
                        <Disclosure.Button
                          key={subItem.name}
                          as={Link}
                          href={subItem.href}
                          className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                        >
                          {subItem.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  )}
                </Fragment>
              ))}
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center justify-between px-4">
                  <button
                    onClick={toggleTheme}
                    className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {isDarkMode ? (
                      <SunIcon className="h-5 w-5" />
                    ) : (
                      <MoonIcon className="h-5 w-5" />
                    )}
                  </button>
                  <Link
                    href="/consultation"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  >
                    Безкоштовна консультація
                  </Link>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}