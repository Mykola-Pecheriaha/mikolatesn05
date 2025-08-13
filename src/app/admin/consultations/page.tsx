'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ConsultationCard from '@/components/Admin/ConsultationCard';

import { ConsultationStatus, type Consultation } from '@/types/consultation';

export default function ConsultationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<ConsultationStatus | 'ALL'>('ALL');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await fetch('/api/admin/consultations');
        if (!response.ok) throw new Error('Failed to fetch consultations');
        const data = await response.json();
        setConsultations(data);
      } catch (error) {
        console.error('Error fetching consultations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.role === 'ADMIN') {
      fetchConsultations();
    }
  }, [session]);

  const handleStatusChange = async (id: string, newStatus: ConsultationStatus) => {
    try {
      if (session?.user?.role !== 'ADMIN') {
        throw new Error('Немає прав адміністратора');
      }

      if (!id) {
        throw new Error('ID консультації не вказано');
      }

      console.log('Оновлення статусу:', { id, newStatus });
      
      const response = await fetch(`/api/admin/consultations/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include'
      });

      const data = await response.json();
      console.log('Відповідь сервера:', { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.error || `Помилка сервера: ${response.status}`);
      }

      setConsultations(prevConsultations =>
        prevConsultations.map(consultation =>
          consultation.id === id 
            ? { ...consultation, status: newStatus }
            : consultation
        )
      );

      return data;
  } catch (error: unknown) {
      let message = 'Помилка при оновленні статусу';
      let stack = undefined;
      if (error && typeof error === 'object' && 'message' in error) {
        message = (error as { message: string }).message || message;
        stack = (error as { stack?: string }).stack;
      }
      console.error('Детальна помилка при оновленні статусу:', {
        error,
        message,
        stack
      });
      alert(message);
      throw error;
    }
  };

  const handleResponseSubmit = async (id: string, response: string) => {
    try {
      const res = await fetch(`/api/admin/consultations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          response,
          status: ConsultationStatus.ANSWERED,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit response');

      setConsultations(prevConsultations =>
        prevConsultations.map(consultation =>
          consultation.id === id
            ? { ...consultation, response, status: ConsultationStatus.ANSWERED }
            : consultation
        )
      );
    } catch (error) {
      console.error('Error submitting response:', error);
      throw error;
    }
  };

  const sortedAndFilteredConsultations = (activeFilter === 'ALL'
    ? consultations
    : consultations.filter(c => c.status === activeFilter))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (status === 'loading' || isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-gray-600">Завантаження...</div>
        </div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="container mx-auto p-4">

      <h1 className="text-2xl font-bold mb-6 text-gray-900">Управління консультаціями</h1>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setActiveFilter('ALL')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeFilter === 'ALL'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Всі
        </button>
        {(Object.keys(ConsultationStatus) as Array<keyof typeof ConsultationStatus>).map((key) => (
          <button
            key={key}
            onClick={() => setActiveFilter(ConsultationStatus[key])}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeFilter === ConsultationStatus[key]
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {ConsultationStatus[key]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAndFilteredConsultations.map((consultation) => (
          <ConsultationCard
            key={consultation.id}
            consultation={consultation}
            onStatusChange={handleStatusChange}
            onResponseSubmit={handleResponseSubmit}
          />
        ))}
        
        {sortedAndFilteredConsultations.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            Немає консультацій для відображення
          </div>
        )}
      </div>
    </div>
  );
}