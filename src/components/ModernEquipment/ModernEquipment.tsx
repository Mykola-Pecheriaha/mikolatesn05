import type React from 'react';
import Image from 'next/image';

interface ModernEquipmentProps {
  imageUrl?: string;
  imageAlt?: string;
}

const ModernEquipment: React.FC<ModernEquipmentProps> = ({
  imageUrl = '/images/modernEquipment/equipment.bmp',
  imageAlt = 'Сучасне медичне обладнання',
}) => {
  return (
    <div className="w-full py-[70px] bg-[#eceff1]">
      <div className="max-w-7xl mx-auto px-8 w-full">
        <h2 className="text-center mb-[50px] text-4xl font-bold text-gray-900 relative
          after:content-[''] after:absolute after:bottom-[-15px] after:left-1/2 
          after:transform after:-translate-x-1/2 after:w-20 after:h-[3px] after:bg-blue-400">
          У нас сучасне обладнання
        </h2>

        <div className="flex flex-col-reverse md:flex-row items-center gap-[50px]">
          <div className="w-full md:w-1/2 md:pr-5">
            <p className="text-lg leading-[1.7] text-gray-800 mb-[25px] pl-5 
              border-l-[3px] border-blue-400 relative">
              Сучасне обладнання — запорука точності та безпеки. Ми
              використовуємо передові технології, щоб забезпечити найкращі
              результати лікування та комфорт для наших пацієнтів.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center">
            <Image
              src={imageUrl || '/placeholder.svg'}
              alt={imageAlt}
              width={600}
              height={400}
              className="rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.15)] 
                transition-transform duration-300 hover:scale-[1.02] object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEquipment;
