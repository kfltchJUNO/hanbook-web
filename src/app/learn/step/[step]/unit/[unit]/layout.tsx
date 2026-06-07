'use client'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { STEP_META, UNIT_PAGES } from '@/lib/constants'

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const pathname = usePathname()
  const step = Number(params.step)
  const unit = Number(params.unit)
  const meta = STEP_META[step]

  if (!meta) return <>{children}</>

  const segments = pathname.split('/')
  const currentPage = segments[segments.length - 1]

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-3" style={{ height: '52px' }}>
          <Link href="/catalog" className="text-gray-400 hover:text-gray-700 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div
            className="px-2.5 py-1 rounded-lg text-xs font-bold font-en"
            style={{ backgroundColor: meta.color, color: meta.colorDk }}
          >
            STEP {step} · {meta.level}
          </div>
          <span className="text-sm font-medium text-gray-700 flex-1 truncate">
            Unit {unit}
          </span>
          <div className="flex items-center gap-1">
            {unit > 1 && (
              <Link
                href={`/learn/step/${step}/unit/${unit - 1}`}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </Link>
            )}
            <span className="text-xs text-gray-400 w-8 text-center">{unit}/5</span>
            {unit < 5 && (
              <Link
                href={`/learn/step/${step}/unit/${unit + 1}`}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </Link>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 flex gap-0 border-t border-gray-50 overflow-x-auto">
          {UNIT_PAGES.map((p) => {
            const href = `/learn/step/${step}/unit/${unit}/${p.key}`
            const isActive = currentPage === p.key || (currentPage === String(unit) && p.key === 'vocab')
            return (
              <Link
                key={p.key}
                href={href}
                className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                  isActive
                    ? 'border-current font-semibold'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
                style={isActive ? { color: meta.colorDk, borderColor: meta.colorDk } : {}}
              >
                {p.label}
              </Link>
            )
          })}
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {children}
      </main>
    </div>
  )
}