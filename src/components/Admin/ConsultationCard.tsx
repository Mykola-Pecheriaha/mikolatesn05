'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ConsultationStatus, type Consultation } from '@/types/consultation';

const ERROR_MESSAGES = {
  EMPTY_RESPONSE: 'Будь ласка, введіть відповідь',
  UNAUTHORIZED: 'Немає прав адміністратора для надсилання відповіді',
  SUBMIT_ERROR: 'Помилка при відправці відповіді. Перевірте підключення до інтернету та спробуйте ще раз.',
  STATUS_UPDATE_ERROR: 'Помилка при оновленні статусу. Перевірте підключення до інтернету та спробуйте ще раз.'
} as const;

interface ConsultationCardProps {
  consultation: Consultation;
  onStatusChange: (id: string, status: ConsultationStatus) => Promise<void>;
  onResponseSubmit: (id: string, response: string) => Promise<void>;
}

export default function ConsultationCard({
  consultation,
  onStatusChange,
  onResponseSubmit,
}: ConsultationCardProps) {
  const [isResponding, setIsResponding] = useState(false);
  const [response, setResponse] = useState(consultation.response || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const handleStatusChange = async (newStatus: ConsultationStatus) => {
    try {
      if (session?.user?.role !== 'ADMIN') {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      setIsUpdatingStatus(true);
      await onStatusChange(consultation.id, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
      alert(error instanceof Error ? error.message : ERROR_MESSAGES.STATUS_UPDATE_ERROR);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const { data: session } = useSession();

  const handleResponseSubmit = async () => {
    try {
      if (!response.trim()) {
        throw new Error(ERROR_MESSAGES.EMPTY_RESPONSE);
      }

      if (session?.user?.role !== 'ADMIN') {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      }

      setIsSubmitting(true);
      await onResponseSubmit(consultation.id, response);
      setIsResponding(false);
    } catch (error) {
      console.error('Error submitting response:', error);
      alert(error instanceof Error ? error.message : ERROR_MESSAGES.SUBMIT_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900">{consultation.name}</h3>
        <span className={`px-2 py-1 rounded text-sm ${
          consultation.status === ConsultationStatus.NEW ? 'bg-blue-100 text-blue-800' :
          consultation.status === ConsultationStatus.IN_PROGRESS ? 'bg-yellow-100 text-yellow-800' :
          consultation.status === ConsultationStatus.ANSWERED ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {consultation.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600">{consultation.email}</p>
        <p className="text-sm text-gray-600">{consultation.phone}</p>
        <p className="text-sm text-gray-800">{consultation.message}</p>

        {consultation.response && (
          <div className="mt-2 p-2 bg-gray-50 rounded">
            <p className="text-sm italic text-gray-700">
              Відповідь: {consultation.response}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          {!isUpdatingStatus && consultation.status !== ConsultationStatus.IN_PROGRESS && consultation.status !== ConsultationStatus.ANSWERED && (
            <button
              onClick={() => handleStatusChange(ConsultationStatus.IN_PROGRESS)}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm font-medium disabled:opacity-50"
              disabled={isUpdatingStatus}
            >
              В роботу
            </button>
          )}

          <button
            onClick={() => setIsResponding(true)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium"
            disabled={isUpdatingStatus}
          >
            Відповісти
          </button>

          {!isUpdatingStatus && consultation.status !== ConsultationStatus.ARCHIVED && (
            <button
              onClick={() => {
                if (window.confirm('Ви впевнені, що хочете архівувати цю консультацію?')) {
                  handleStatusChange(ConsultationStatus.ARCHIVED);
                }
              }}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm font-medium disabled:opacity-50"
              disabled={isUpdatingStatus}
            >
              Архівувати
            </button>
          )}
        </div>

        {isResponding && (
          <div className="mt-4 space-y-3">
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Введіть відповідь..."
              disabled={isSubmitting}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsResponding(false)}
                className="px-3 py-1 border rounded hover:bg-gray-50 text-sm"
                disabled={isSubmitting}
              >
                Скасувати
              </button>
              <button
                onClick={handleResponseSubmit}
                disabled={isSubmitting}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium disabled:opacity-50"
              >
                {isSubmitting ? 'Відправка...' : 'Відправити'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}