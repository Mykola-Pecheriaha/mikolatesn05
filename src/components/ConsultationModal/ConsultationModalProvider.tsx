'use client';

import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { usePathname } from 'next/navigation';
import ConsultationModal from './ConsultationModal';

interface ConsultationModalContextType {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const ConsultationModalContext = createContext<ConsultationModalContextType>({
  showModal: false,
  setShowModal: () => {},
});

export const useConsultationModal = () => useContext(ConsultationModalContext);

export function ConsultationModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Ігноруємо певні шляхи, де не потрібно показувати модальне вікно
    const excludedPaths = [
      '/consultation', // сторінка консультації
      '/admin',       // адмін панель
      '/login',       // сторінка входу
      '/register'     // сторінка реєстрації
    ];

    const shouldShowModal = !excludedPaths.some(path => pathname.startsWith(path));

    if (shouldShowModal) {
      // Показуємо модальне вікно через 2 секунди після переходу на нову сторінку
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, [pathname]); // Ефект спрацьовує при зміні шляху

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <ConsultationModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
      {showModal && <ConsultationModal onClose={handleClose} />}
    </ConsultationModalContext.Provider>
  );
}