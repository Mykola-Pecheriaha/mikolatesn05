import type React from 'react';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import { galleryImages } from '@/data/gallery-images';
import Link from 'next/link';

type SurgeryDepartmentInfoProps = unknown;

const SurgeryDepartmentInfo: React.FC<SurgeryDepartmentInfoProps> = () => {
  return (
    <div className="w-full py-[70px] relative bg-[#eceff1]">
      <div className="max-w-[1200px] mx-auto px-8 w-full">
        <h2 className="text-center mb-10 text-[2.5rem] font-bold text-[#020202] relative after:content-[''] after:absolute after:bottom-[-15px] after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-[3px] after:bg-[#1eaaf1]">
          Чому обирають нас?
        </h2>
        <div className="mb-10 text-[#333]">
          <p className="text-[1.1rem] leading-[1.7] mb-5">
            Хірургічне відділення поєднує сучасні методи лікування з багаторічним досвідом, накопиченим за понад 130 років. Ми цінуємо традиції, але водночас усвідомлюємо, що медицина постійно розвивається. Саме тому впроваджуємо передові технології та вдосконалюємо свої навички, щоб забезпечити максимально ефективну допомогу пацієнтам.
          </p>
          <p className="text-[1.1rem] leading-[1.7] mb-5">
            Завдяки оновленому хірургічному відділенню ми створюємо комфортні умови для лікування, використовуючи новітнє медичне обладнання. Ми розуміємо, що здоровя – найвища цінність, а тому пропонуємо індивідуальний підхід до кожного пацієнта.
          </p>
          <div className="my-10">
            <h3 className="text-[1.5rem] mb-5 font-semibold text-[#020202]">Обирайте нас, якщо вам потрібно:</h3>
            <ul className="list-none p-0">
              <li className="flex items-start mb-4 text-[1.1rem] leading-[1.5]">
                <span className="text-[1.3rem] mr-2 font-bold text-[#7b68ee]">✓</span> Планове або невідкладне хірургічне втручання
              </li>
              <li className="flex items-start mb-4 text-[1.1rem] leading-[1.5]">
                <span className="text-[1.3rem] mr-2 font-bold text-[#7b68ee]">✓</span> Консультація досвідченого фахівця
              </li>
              <li className="flex items-start mb-4 text-[1.1rem] leading-[1.5]">
                <span className="text-[1.3rem] mr-2 font-bold text-[#7b68ee]">✓</span> Отримання другої думки щодо діагнозу чи призначеного лікування
              </li>
              <li className="flex items-start mb-4 text-[1.1rem] leading-[1.5]">
                <span className="text-[1.3rem] mr-2 font-bold text-[#7b68ee]">✓</span> Розгорнута інформація про хід лікування та реабілітацію
              </li>
              <li className="flex items-start mb-4 text-[1.1rem] leading-[1.5]">
                <span className="text-[1.3rem] mr-2 font-bold text-[#7b68ee]">✓</span> Ознайомлення з новітніми методиками лікування та сучасними препаратами
              </li>
              <li className="flex items-start mb-4 text-[1.1rem] leading-[1.5]">
                <span className="text-[1.3rem] mr-2 font-bold text-[#7b68ee]">✓</span> Професійні рекомендації перед операцією
              </li>
            </ul>
          </div>
          <div className="text-[1.3rem] font-semibold text-center my-10">
            <span className="text-[1.5rem] text-[#7b68ee]">✨</span> Ми тут, щоб подбати про ваше здоровя!
          </div>
          <div className="mt-5 text-center p-10 bg-[#bec7ce] rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
            <p className="text-[1.2rem] mb-5 text-[#555]">
              Маєте додаткові запитання? Наші спеціалісти готові надати вам детальну консультацію.
            </p>
            <Link href="/about-doctor/contacts">
              <button className="bg-[#9facb6] text-white border-none py-3 px-7 text-[1.1rem] font-semibold rounded-[30px] cursor-pointer transition-all duration-300 shadow-[0_4px_6px_rgba(0,0,0,0.3)] hover:bg-[#728594] hover:-translate-y-0.5 hover:shadow-[0_6px_8px_rgba(0,0,0,0.15)]">
                Звязатися  з нами
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-[60px]">
          <ImageGallery images={galleryImages} />
        </div>
      </div>
    </div>
  );
};

export default SurgeryDepartmentInfo;
