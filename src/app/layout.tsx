import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from '@/components/providers'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata = {
  title: 'Хірургічна клініка',
  description: 'Професійна хірургічна допомога',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  )
}