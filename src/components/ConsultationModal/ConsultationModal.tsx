import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ConsultationModalProps {
  onClose: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ onClose }) => {
  const router = useRouter();
  const [showCount, setShowCount] = useState(0);

  useEffect(() => {
    // Отримуємо поточний лічильник показів
    const count = parseInt(localStorage.getItem('modalShowCount') || '0');
    setShowCount(count + 1);
    localStorage.setItem('modalShowCount', (count + 1).toString());

    // Якщо модальне вікно показувалося більше 3 разів за сесію,
    // збільшуємо затримку показу
    if (count > 3) {
      localStorage.setItem('modalDelay', '5000'); // 5 секунд
    }
  }, []);

  const handleConsultation = () => {
    router.push('/consultation');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Запишіться на консультацію
        </h2>
        
        <p className="text-gray-600 mb-6 text-center">
          Отримайте професійну консультацію від наших спеціалістів. Ми допоможемо вам зберегти ваше здоров&apos;я!
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleConsultation}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg 
              hover:bg-blue-600 transition-colors font-medium"
          >
            Записатися на консультацію
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg 
              hover:bg-gray-200 transition-colors font-medium"
          >
            {showCount <= 3 ? 'Можливо пізніше' : 'Не показувати більше'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;