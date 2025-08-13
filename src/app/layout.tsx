'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextAuthProvider } from '@/components/providers';
import { ThemeProvider } from '@/context/ThemeContext';
import { ConsultationModalProvider } from '@/components/ConsultationModal/ConsultationModalProvider';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.altKey && e.code === 'KeyA') {
        if (session?.user?.role === 'ADMIN') {
          e.preventDefault();
          router.push('/admin/consultations');
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isClient, router, session, status]);

  return (
    <ThemeProvider>
      <ConsultationModalProvider>
        <Header />
        <div className="page-wrapper">
          {children}
        </div>
        <Footer />
      </ConsultationModalProvider>
    </ThemeProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NextAuthProvider>
          <RootLayoutContent>{children}</RootLayoutContent>
        </NextAuthProvider>
      </body>
    </html>
  );
}