'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons'

interface FooterProps {
  className?: string;
}

interface FooterLink {
  name: string;
  href: string;
}

const navigationLinks: FooterLink[] = [
  { name: 'Послуги', href: '/services' },
  { name: 'Команда', href: '/team' },
  { name: 'Про клініку', href: '/about' },
  { name: 'Блог', href: '/blog' },
]

const socialLinks = [
  { icon: faFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: faInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: faTelegram, href: 'https://t.me/your-channel', label: 'Telegram' },
]

export default function Footer({ className = '' }: FooterProps) {
  return (
        <footer className={`bg-[#7491a3] ${className}`}>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Про клініку */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold text-white mb-4">ЦМКЛ</h2>
            <p className="text-white">
             Професійна медична допомога від кращих хірургів Чернівців. Сучасне обладнання та індивідуальний підхід до кожного пацієнта.
            </p>
          </div>

          {/* Навігація */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Навігація</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакти */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Контакти</h3>
            <ul className="space-y-2 text-white">
              <li>
                <a href="tel:+380507575411" className="hover:text-gray-200 transition-colors">
                  +380 (50) 757-54-11
                </a>
              </li>
              <li>
                <a href="mailto:Pecheryag@gmail.com" className="hover:text-gray-200 transition-colors">
                  Pecheryag@gmail.com
                </a>
              </li>
              <li>м. Чернівці, вул. Героїв Майдану, 226, поверх 4</li>
            </ul>
          </div>

          {/* Соціальні мережі */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Соціальні мережі</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-center text-white/80">
            © {new Date().getFullYear()} ЦМКЛ. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  )
}