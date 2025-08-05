export default function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Хірургічна клініка м.Чернівці
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Є структурним підрозділом "Центрвльної міської клінічної лікарні" Чернівецької міської ради.
            Професійна медична допомога від кращих хірургів. Ми піклуємося про ваше здоров'я та комфорт.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/appointments"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Записатися на прийом
            </a>
            <a href="/about" className="text-sm font-semibold leading-6 text-gray-900">
              Дізнатися більше <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
