import Link from 'next/link'
import { STEP_META } from '@/lib/constants'

export default function HomePage() {
  const steps = Object.entries(STEP_META)

  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FFE566] flex items-center justify-center text-sm font-bold text-[#9A7A00] font-en">H</div>
            <span className="font-bold text-lg tracking-tight">Hanbook</span>
          </div>
          <span className="text-xs text-gray-400 font-en">STEP Korean · A1 → C2</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* 히어로 */}
        <div className="mb-10 fade-up">
          <p className="text-xs font-medium text-gray-400 font-en uppercase tracking-widest mb-2">STEP KOREAN</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            첫걸음부터 TOPIK II까지
          </h1>
          <p className="text-gray-500 text-sm">
            A1부터 C2까지 체계적으로 설계된 10단계 한국어 커리큘럼
          </p>
        </div>

        {/* Step 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {steps.map(([stepNum, meta], idx) => (
            <Link
              key={stepNum}
              href={`/learn/step/${stepNum}/unit/1`}
              className="card p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 fade-up group"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              {/* 색상 배지 */}
              <div
                className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-lg font-bold group-hover:scale-105 transition-transform"
                style={{ backgroundColor: meta.color, color: meta.colorDk }}
              >
                {stepNum}
              </div>
              <div
                className="text-[10px] font-semibold font-en uppercase tracking-wider mb-1"
                style={{ color: meta.colorDk }}
              >
                {meta.level}
              </div>
              <div className="text-xs font-medium text-gray-700 leading-tight">
                {meta.title}
              </div>
              {/* 진행 바 (더미) */}
              <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    backgroundColor: meta.color,
                    width: Number(stepNum) === 1 ? '0%' : '0%'
                  }}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* 하단 안내 */}
        <div className="mt-10 card p-5 flex items-start gap-4 fade-up" style={{ animationDelay: '450ms' }}>
          <div className="text-2xl">📖</div>
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-1">PDF 교재도 함께 제공됩니다</p>
            <p className="text-xs text-gray-500">각 Step의 완성본 PDF를 다운로드해서 오프라인으로도 학습하세요.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
