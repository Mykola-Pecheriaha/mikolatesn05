import type React from 'react';
import Image from 'next/image';

interface AnesthesiaCareProps {
  imageUrl?: string;
  imageAlt?: string;
}

const AnesthesiaCare: React.FC<AnesthesiaCareProps> = ({
  imageUrl = '/images/modernEquipment/medicfmtnt2.bmp',
  imageAlt = 'Наркозне забезпечення',
}) => {
  return (
    <div className="w-full py-[70px] relative bg-[#cad2d9]">
      <div className="max-w-[1200px] mx-auto px-8 w-full">
        <h2 className="text-center mb-[50px] text-[2.5rem] font-bold text-gray-900 relative after:content-[''] after:absolute after:bottom-[-15px] after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-[3px] after:bg-[#cad2d9]">
          У нас сучасне і лагідне наркозне забезпечення
        </h2>
        <div className="flex items-center gap-[50px] max-md:flex-col-reverse">
          <div className="flex-1 pr-5 max-md:pr-0 max-md:mt-8 w-full">
            <p className="text-[1.125rem] leading-[1.7] text-gray-900 mb-[25px] relative pl-5 border-l-4 border-[#1eaaf1]">
              Сучасні методи анестезії забезпечують максимальний комфорт і
              безпеку для пацієнта. Ми використовуємо найкращі технології для
              мякого та контрольованого знеболення.
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center w-full">
            <Image
              src={imageUrl || '/placeholder.svg'}
              alt={imageAlt}
              width={600}
              height={400}
              className="rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-in-out object-cover hover:scale-[1.02]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnesthesiaCare;
