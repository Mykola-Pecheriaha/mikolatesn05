import React from 'react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#eceff1]">
      <h1 className="text-3xl font-bold mb-6 text-[#1e88e5]">Адмін-панель</h1>
      <p className="mb-4 text-lg text-gray-700">Вітаємо в адміністративному розділі!</p>
      <Link href="/admin/consultations">
        <button className="bg-[#1e88e5] text-white py-2 px-6 rounded-lg font-semibold shadow hover:bg-[#3a5a8a] transition-all duration-300">
          Перейти до консультацій
        </button>
      </Link>
    </div>
  );
}
