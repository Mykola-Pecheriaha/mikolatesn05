'use client'

import { SessionProvider } from 'next-auth/react'

export function NextAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider 
      refetchInterval={5} // Перевіряти сесію кожні 5 секунд
      refetchOnWindowFocus={true} // Оновлювати при фокусі вікна
    >
      {children}
    </SessionProvider>
  )
}