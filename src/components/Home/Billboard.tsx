'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Billboard() {
  return (
    <div className="relative flex-1 min-h-screen">
      {/* Фонове зображення */}
      <div className="absolute inset-0 h-full min-h-screen">
                  <Image
            src="/images/billboard.jpg"
            alt="Хірургічна клініка"
            fill
            sizes="100vw"
            quality={100}
            className="object-cover object-center w-full h-full brightness-125 contrast-105"
            style={{ minHeight: '100vh' }}
            priority
          />
        {/* Темний градієнт поверх зображення */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Контент */}
      <div className="container-custom relative h-full">
        <div className="flex flex-col justify-center h-full max-w-2xl mt-64">
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E8F1F5] drop-shadow-lg mb-7">
              Хірургічна клініка ЦМКЛ
            </h1>
           <p className="text-lg md:text-3xl text-[#B8E1F2] drop-shadow-md">
              Професійна медична допомога від кращих хірургів Чернівців. 
              Сучасне обладнання та індивідуальний підхід до кожного пацієнта.
          </p>
        </div>
      </div>

      {/* Статистика */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
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