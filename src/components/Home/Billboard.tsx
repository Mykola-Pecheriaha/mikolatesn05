'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Billboard() {
  return (
    <div className="relative h-[600px] lg:h-[800px] overflow-hidden">
      {/* Фонове зображення */}
      <div className="absolute inset-0">
        <Image
          src="/images/billboard.jpg" // Потрібно буде додати зображення
          alt="Хірургічна клініка"
          fill
          className="object-cover"
          priority
        />
        {/* Темний градієнт поверх зображення */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      {/* Контент */}
      <div className="container-custom relative h-full">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Хірургічна клініка ЦМКЛ
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Професійна медична допомога від кращих хірургів Чернівців. 
            Сучасне обладнання та індивідуальний підхід до кожного пацієнта.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/consultation"
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Безкоштовна консультація
            </Link>
            <Link
              href="/services"
              className="inline-flex justify-center items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              Наші послуги
            </Link>
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm">
        <div className="container-custom py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
            <div>
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm text-gray-300">Років досвіду</div>
            </div>
            <div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-sm text-gray-300">Операцій на рік</div>
            </div>
            <div>
              <div className="text-3xl font-bold">20+</div>
              <div className="text-sm text-gray-300">Кваліфікованих хірургів</div>
            </div>
            <div>
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm text-gray-300">Задоволених пацієнтів</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}