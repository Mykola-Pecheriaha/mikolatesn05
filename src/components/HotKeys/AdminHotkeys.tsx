'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useHotkeys } from '@/hooks/useHotkeys';

export default function AdminHotkeys() {
  const router = useRouter();
  const { data: session } = useSession();

  useHotkeys(
    { key: 'a', altKey: true },
    () => {
      console.log('Hotkey pressed', { session });
      if (session?.user?.role === 'ADMIN') {
        console.log('Navigating to admin panel');
        router.push('/admin/consultations');
      }
    }
  );

  return null;
}