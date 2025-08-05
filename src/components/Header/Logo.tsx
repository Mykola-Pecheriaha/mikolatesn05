'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="relative w-10 h-10">
        <Image
          src="/images/logo/logo.bmp"
          alt="ЦМКЛ Логотип"
          width={40}
          height={40}
          className="w-10 h-10"
        />
      </div>
      <span className="text-xl font-bold text-gray-900">ЦМКЛ</span>
    </Link>
  )
}