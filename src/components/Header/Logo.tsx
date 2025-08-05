'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/logo.svg" // Потрібно буде додати файл логотипу
        alt="ЦМКЛ Логотип"
        width={40}
        height={40}
        className="w-10 h-10"
      />
      <span className="text-xl font-bold text-gray-900">ЦМКЛ</span>
    </Link>
  )
}