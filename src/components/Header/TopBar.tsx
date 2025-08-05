'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faYoutube,
  faInstagram,
  faFacebookMessenger
} from '@fortawesome/free-brands-svg-icons'
import { faPhone, faEnvelope, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons'

export default function TopBar() {
  return (
    <div className="bg-gray-900 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center text-sm">
          <div className="hidden lg:flex space-x-6">
            {/* Контактна інформація */}
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mr-2" />
              <a href="tel:+380507575411" className="hover:text-gray-300 transition-colors">
                +380 (50) 757-54-11
              </a>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mr-2" />
              <a href="mailto:Pecheryag@gmail.com" className="hover:text-gray-300 transition-colors">
                Pecheryag@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 mr-2" />
              <span>м. Чернівці, вул. Героїв Майдану, 226</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-2" />
              <span>Пн-Пт: 9:00-16:00</span>
            </div>
          </div>

          {/* Мобільна версія - тільки телефон */}
          <div className="lg:hidden flex items-center">
            <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mr-2" />
            <a href="tel:+380507575411" className="hover:text-gray-300 transition-colors">
              +380 (50) 757-54-11
            </a>
          </div>

          {/* Соціальні мережі */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
              aria-label="YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
            </a>
            <a
              href="https://m.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
              aria-label="Messenger"
            >
              <FontAwesomeIcon icon={faFacebookMessenger} className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}