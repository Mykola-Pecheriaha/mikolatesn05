'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SuccessMessage from '../Notification/SuccessMessage';

const consultationFormSchema = z.object({
  name: z.string().min(2, 'Імʼя має містити мінімум 2 символи'),
  phone: z.string().min(10, 'Введіть коректний номер телефону'),
  email: z.string().email('Введіть коректну email адресу'),
  service: z.string().min(1, 'Оберіть послугу'),
  message: z.string().min(10, 'Повідомлення має містити мінімум 10 символів'),
});

type ConsultationFormData = z.infer<typeof consultationFormSchema>;

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationFormSchema),
  });

  const onSubmit = async (data: ConsultationFormData) => {
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Помилка при відправці форми');
      }

      reset();
      onClose();
      setShowSuccess(true);
    } catch (error) {
      console.error('Помилка:', error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h2" className="text-2xl font-semibold text-[#7491a3] mb-6">
                    Записатися на консультацію
                  </Dialog.Title>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
                        Імʼя
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Введіть ваше імʼя"
                        {...register('name')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#7491a3] focus:border-[#7491a3]"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-1">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        placeholder="+380 XX XXX XX XX"
                        {...register('phone')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#7491a3] focus:border-[#7491a3]"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        {...register('email')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#7491a3] focus:border-[#7491a3]"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-900 mb-1">
                        Послуга
                      </label>
                      <select
                        id="service"
                        {...register('service')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#7491a3] focus:border-[#7491a3]"
                      >
                        <option value="">Оберіть послугу</option>
                        <option value="emergency">Невідкладна хірургія</option>
                        <option value="traditional">Традиційна хірургія</option>
                        <option value="plastic">Пластична хірургія</option>
                        <option value="minimally-invasive">Малоінвазивна хірургія</option>
                        <option value="vein">Хірургія вен</option>
                        <option value="bariatric">Баріатрична хірургія</option>
                        <option value="proctology">Проктологія</option>
                        <option value="urology">Урологія</option>
                        <option value="tumor">Хірургія пухлин шкіри і слизових</option>
                        <option value="purulent">Гнійносептична хірургія</option>
                      </select>
                      {errors.service && (
                        <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-1">
                        Повідомлення
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Додаткова інформація або запитання"
                        {...register('message')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#7491a3] focus:border-[#7491a3]"
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                      )}
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#7491a3] text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-[#5f7a8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7491a3] disabled:opacity-50"
                      >
                        {isSubmitting ? 'Відправка...' : 'Записатися на консультацію'}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <SuccessMessage 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
      />
    </>
  );
}