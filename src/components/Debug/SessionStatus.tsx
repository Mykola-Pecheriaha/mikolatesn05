'use client';

import { useSession } from 'next-auth/react';

export default function SessionStatus() {
  const { data: session, status } = useSession();

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm z-50">
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(
          {
            status,
            user: session?.user,
            expires: session?.expires,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}
