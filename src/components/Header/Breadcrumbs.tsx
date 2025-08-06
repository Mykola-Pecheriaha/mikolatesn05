'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'

const routeNames: { [key: string]: string } = {
  specialists: 'Наші фахівці',
  services: 'Послуги',
  team: 'Команда',
  about: 'Про клініку',
  contacts: 'Контакти',
  blog: 'Блог',
  consultation: 'Консультація',
}

interface BreadcrumbsProps {
  className?: string;
}

export default function Breadcrumbs({ className = '' }: BreadcrumbsProps) {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(path => path)

  if (pathname === '/') return null

  return (
    <div className={`bg-gray-50 border-b border-gray-200 ${className}`}>
      <div className="container-custom py-2">
        <nav className="flex items-center text-sm">
          <Link 
            href="/" 
            className="text-[#7491a3] hover:text-[#69879b] flex items-center"
          >
            <HomeIcon className="h-4 w-4" />
          </Link>

          {paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join('/')}`
            const isLast = index === paths.length - 1
            const name = routeNames[path] || path

            return (
              <div key={path} className="flex items-center">
                <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
                {isLast ? (
                  <span className="text-[#7491a3] font-medium">
                    {name}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="text-[#7491a3] hover:text-[#69879b]"
                  >
                    {name}
                  </Link>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}