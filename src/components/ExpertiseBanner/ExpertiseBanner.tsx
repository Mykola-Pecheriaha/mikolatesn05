import type React from 'react';
import Image from 'next/image';

interface ExpertiseBannerProps {
  imageUrl?: string;
  imageAlt?: string;
}

const ExpertiseBanner: React.FC<ExpertiseBannerProps> = ({
  imageUrl = '/images/profession/proff2.bmp',
  imageAlt = 'Команда хірургів',
}) => {
  return (
    <div className="w-full py-16 bg-[#d5dce1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">
          Хірургія - там, де професіоналізм поєднується з турботою
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <p className="text-lg leading-relaxed text-gray-800 mb-5">
              Відділення хірургії — це поєднання передових технологій і досвіду.
              Наші хірурги — висококваліфіковані фахівці, які дбають про ваше
              здоров`я та гарантовано забезпечують найкращий результат.
            </p>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <Image
              src={imageUrl || '/placeholder.svg'}
              alt={imageAlt}
              width={500}
              height={350}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseBanner;