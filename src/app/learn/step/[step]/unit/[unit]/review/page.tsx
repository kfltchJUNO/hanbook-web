import { getUnitData } from '@/lib/data'
import { STEP_META } from '@/lib/constants'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default function ReviewPage({
  params,
}: {
  params: { step: string; unit: string }
}) {
  const step = Number(params.step)
  const unit = Number(params.unit)
  const data = getUnitData(step, unit)
  const meta = STEP_META[step]
  if (!data || !meta) notFound()

  const nextUnit = unit < 5 ? unit + 1 : null
  const nextStep = unit === 5 && step < 10 ? step + 1 : null

  return (
    <div className="space-y-5 fade-up">
      {/* 핵심 표현 */}
      {data.summary_rows && data.summary_rows.length > 0 && (
        <div className="card p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded text-xs font-en font-bold"
              style={{ backgroundColor: meta.color, color: meta.colorDk }}
            >
              REVIEW
            </span>
            핵심 표현 모아보기
          </h2>
          <div className="space-y-2">
            {data.summary_rows.map(([label, kr, en], i) => (
              <div key={i} className="flex gap-3 items-start text-sm py-1.5 border-b border-gray-50 last:border-0">
                <span
                  className="text-xs font-bold w-24 flex-shrink-0 pt-0.5"
                  style={{ color: meta.colorDk }}
                >
                  {label}
                </span>
                <span className="text-gray-800 flex-1">{kr}</span>
                <span className="text-gray-400 font-en text-xs flex-shrink-0 max-w-[120px] text-right">{en}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 자기 점검 */}
      {data.checklist && data.checklist.length > 0 && (
        <div className="card p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-3">✅ 자기 점검</h2>
          <div className="space-y-2">
            {data.checklist.map((item, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded border-2 border-gray-300 group-hover:border-gray-400 transition-colors flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* TOPIK 문제 */}
      {data.topik_qs && data.topik_qs.length > 0 && (
        <div className="card p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs bg-red-50 text-red-500 font-bold font-en">TOPIK II</span>
            미리보기
          </h2>
          <div className="space-y-5">
            {data.topik_qs.map((item, qi) => {
              const q = (item as any).q || ''
              const choices = (item as any).choices || (item as any).opts || []
              const answer = (item as any).answer || ''
              const note = (item as any).note || ''
              return (
                <div key={qi} className="space-y-2.5">
                  <p className="text-sm font-medium text-gray-800">
                    <span className="text-red-400 font-bold mr-1.5">[{qi + 1}]</span>
                    {q}
                  </p>
                  {choices.length > 0 && (
                    <div className="grid grid-cols-2 gap-1.5">
                      {choices.map((c: string, ci: number) => (
                        <div
                          key={ci}
                          className="p-2.5 rounded-lg border text-sm cursor-pointer transition-colors hover:bg-gray-50"
                          style={
                            answer === String(ci + 1) || answer === c
                              ? { borderColor: meta.colorDk, backgroundColor: meta.color + '20' }
                              : { borderColor: '#E5E7EB' }
                          }
                        >
                          <span className="font-bold text-gray-400 mr-1.5">
                            {['①','②','③','④'][ci]}
                          </span>
                          {c}
                        </div>
                      ))}
                    </div>
                  )}
                  {(answer || note) && (
                    <p className="text-xs text-gray-400 pl-1">
                      정답: <span className="font-bold" style={{ color: meta.colorDk }}>{answer}</span>
                      {note && <span className="ml-2">({note})</span>}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* 쓰기 미션 */}
      {data.writing_prompt && (
        <div className="card p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-2">✏️ 쓰기 연습</h2>
          <p className="text-sm text-gray-600 mb-3">{data.writing_prompt}</p>
          <div className="space-y-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-10 border-b border-dashed border-gray-200 flex items-end pb-1">
                <span className="text-xs text-gray-300">{n}.</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 다음 이동 버튼 */}
      <div className="flex gap-3 pt-2">
        {nextUnit && (
          <Link
            href={`/learn/step/${step}/unit/${nextUnit}`}
            className="flex-1 py-3 rounded-xl text-center text-sm font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: meta.color, color: meta.colorDk }}
          >
            Unit {nextUnit}로 이동 →
          </Link>
        )}
        {nextStep && (
          <Link
            href={`/learn/step/${nextStep}/unit/1`}
            className="flex-1 py-3 rounded-xl text-center text-sm font-semibold bg-gray-900 text-white transition-all hover:bg-gray-800"
          >
            STEP {nextStep}로 이동 →
          </Link>
        )}
        {!nextUnit && !nextStep && (
          <Link
            href="/"
            className="flex-1 py-3 rounded-xl text-center text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
          >
            🎉 전체 완료! 홈으로
          </Link>
        )}
      </div>
    </div>
  )
}
