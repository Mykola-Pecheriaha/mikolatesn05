'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface SuccessMessageProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessMessage({ isOpen, onClose }: SuccessMessageProps) {
  return (
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-center align-middle shadow-xl transition-all">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#7491a3]/10">
                  <CheckCircleIcon className="h-8 w-8 text-[#7491a3]" />
                </div>
                <Dialog.Title as="h3" className="mt-4 text-lg font-medium text-[#7491a3]">
                  Повідомлення відправлено
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Дякуємо за ваше звернення. Ми зв&apos;яжемося з вами найближчим часом.
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full rounded-md bg-[#7491a3] px-4 py-2 text-sm font-medium text-white hover:bg-[#5f7a8a] focus:outline-none focus:ring-2 focus:ring-[#7491a3] focus:ring-offset-2"
                    onClick={onClose}
                  >
                    Зрозуміло
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
