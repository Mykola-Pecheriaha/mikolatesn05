'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faYoutube,
  faInstagram,
  faFacebookMessenger
} from '@fortawesome/free-brands-svg-icons'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline'

export default function TopBar() {
  return (
    <div style={{ 
      backgroundColor: 'var(--topbar-bg)',
      color: 'var(--topbar-text)'
    }}>
      <div className="container-custom py-2">
        <div className="flex justify-between items-center">
          {/* Контактна інформація */}
          <div className="hidden lg:flex space-x-6">
            <a href="tel:+380507575411" className="flex items-center hover:opacity-80">
              <PhoneIcon className="h-4 w-4 mr-2" />
              <span>+380 (50) 757-54-11</span>
            </a>
            <a href="mailto:Pecheryag@gmail.com" className="flex items-center hover:opacity-80">
              <EnvelopeIcon className="h-4 w-4 mr-2" />
              <span>Pecheryag@gmail.com</span>
            </a>
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 mr-2" />
              <span>м. Чернівці, вул. Героїв Майдану, 226</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-2" />
              <span>Пн-Пт: 9:00-16:00</span>
            </div>
          </div>

          {/* Мобільна версія - тільки телефон */}
          <div className="lg:hidden">
            <a href="tel:+380507575411" className="flex items-center hover:opacity-80">
              <PhoneIcon className="h-4 w-4 mr-2" />
              <span>+380 (50) 757-54-11</span>
            </a>
          </div>

          {/* Соціальні мережі */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
            </a>
            <a
              href="https://m.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              aria-label="Messenger"
            >
              <FontAwesomeIcon icon={faFacebookMessenger} className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}