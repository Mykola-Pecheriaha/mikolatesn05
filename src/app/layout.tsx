import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from '@/components/providers'
import { ThemeProvider } from '@/context/ThemeContext'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

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
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NextAuthProvider>
          <ThemeProvider>
            <Header />
            <div className="page-wrapper">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}