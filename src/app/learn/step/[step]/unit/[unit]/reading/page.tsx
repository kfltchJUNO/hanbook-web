import { getUnitData } from '@/lib/data'
import { STEP_META } from '@/lib/constants'
import { notFound } from 'next/navigation'

export default function ReadingPage({
  params,
}: {
  params: { step: string; unit: string }
}) {
  const step = Number(params.step)
  const unit = Number(params.unit)
  const data = getUnitData(step, unit)
  const meta = STEP_META[step]
  if (!data || !meta) notFound()

  return (
    <div className="space-y-5 fade-up">
      {/* 읽기 지문 */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="px-2 py-0.5 rounded text-xs font-bold font-en"
            style={{ backgroundColor: meta.color, color: meta.colorDk }}
          >
            읽기
          </span>
          <h2 className="text-base font-bold text-gray-800">{data.reading_title}</h2>
        </div>
        <p className="text-xs text-gray-400 font-en mb-4">{data.reading_title_eng}</p>

        <div className="bg-gray-50 rounded-xl p-4 space-y-2 mb-4">
          {data.reading_text?.filter(Boolean).map((line, i) => (
            <p key={i} className="text-sm text-gray-800 leading-relaxed">{line}</p>
          ))}
        </div>

        {/* 읽기 문제 */}
        {data.q_labels && data.q_labels.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-gray-500">읽기 문제</h3>
            {data.q_labels.map((q, i) => (
              <div key={i} className="flex gap-2">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{ backgroundColor: meta.color, color: meta.colorDk }}
                >
                  Q
                </span>
                <p className="text-sm text-gray-700">{q}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 듣기 대화 */}
      {data.listening_script && data.listening_script.length > 0 && (
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="px-2 py-0.5 rounded text-xs font-bold font-en"
              style={{ backgroundColor: meta.color + '60', color: meta.colorDk }}
            >
              듣기
            </span>
            <h2 className="text-base font-bold text-gray-800">대화 스크립트</h2>
          </div>

          <div className="space-y-3 mb-5">
            {data.listening_script.map(([speaker, line], i) => (
              <div key={i} className="flex gap-3">
                <span
                  className="text-xs font-bold flex-shrink-0 pt-0.5 w-16 truncate"
                  style={{ color: meta.colorDk }}
                >
                  {speaker}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">{line}</p>
              </div>
            ))}
          </div>

          {/* 듣기 문제 */}
          {data.listening_qs && data.listening_qs.length > 0 && (
            <div className="space-y-4 border-t border-gray-100 pt-4">
              <h3 className="text-xs font-semibold text-gray-500">듣기 문제</h3>
              {data.listening_qs.map((item, qi) => {
                const q = typeof item === 'string' ? item : (item as any).q || JSON.stringify(item)
                const opts = (item as any).opts || (item as any).options || []
                return (
                  <div key={qi} className="space-y-2">
                    <p className="text-sm font-medium text-gray-800">Q{qi + 1}. {q}</p>
                    {opts.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {opts.map((opt: string, oi: number) => (
                          <div
                            key={oi}
                            className="p-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-gray-300 hover:bg-gray-50 cursor-pointer transition-colors"
                          >
                            <span className="font-bold text-gray-400 mr-1.5">
                              {['①', '②', '③', '④'][oi]}
                            </span>
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
