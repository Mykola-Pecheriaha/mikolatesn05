import Billboard from './Billboard'

export default function Home() {
  return (
    <div className="home-container">
      <div className="billboard-wrapper">
        <div className="billboard-content">
          <Billboard />
        </div>
      </div>
      {/* Тут будуть інші секції головної сторінки */}
    </div>
  )
}