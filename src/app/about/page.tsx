'use client'

export default function AboutPage() {
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-[#7491a3] mb-6">Про клініку</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-6">
          Професійна медична допомога від кращих хірургів Чернівців. 
          Сучасне обладнання та індивідуальний підхід до кожного пацієнта.
        </p>
        {/* Тут буде більше інформації про клініку */}
      </div>
    </div>
  )
}