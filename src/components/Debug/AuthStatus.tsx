'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function AuthStatus() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('Session updated:', {
      status,
      session,
      timestamp: new Date().toISOString()
    });
  }, [session, status]);

  if (status === 'loading') {
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-500/80 text-white p-4 rounded-lg text-sm z-50">
        Перевірка авторизації...
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm z-50 space-y-2">
      <div>Status: {status}</div>
      <div>User: {session?.user?.email || 'Not logged in'}</div>
      <div>Role: {session?.user?.role || 'No role'}</div>
      <div>Name: {session?.user?.name || 'No name'}</div>
      <div className="text-xs text-gray-400">
        Last update: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}