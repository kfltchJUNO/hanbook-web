import { getUnitData, getStepData } from '@/lib/data'
import { STEP_META } from '@/lib/constants'
import { notFound } from 'next/navigation'

export default function VocabPage({
  params,
}: {
  params: { step: string; unit: string }
}) {
  const step = Number(params.step)
  const unit = Number(params.unit)
  const data = getUnitData(step, unit)
  const stepData = getStepData(step)
  const meta = STEP_META[step]

  if (!data || !stepData || !meta) notFound()

  return (
    <div className="space-y-5 fade-up">
      {/* 유닛 제목 */}
      <div className="card p-5" style={{ borderLeft: `4px solid ${meta.color}` }}>
        <p className="text-xs font-medium font-en mb-1" style={{ color: meta.colorDk }}>
          STEP {step} — Unit {unit}
        </p>
        <h1 className="text-xl font-bold text-gray-900">{data.title}</h1>
        <p className="text-sm text-gray-400 font-en">{data.title_eng}</p>
      </div>

      {/* 핵심 어휘 20 */}
      <div className="card p-5">
        <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <span
            className="px-2 py-0.5 rounded text-xs font-en"
            style={{ backgroundColor: meta.color, color: meta.colorDk }}
          >
            VOCAB
          </span>
          핵심 어휘 {data.must_vocab.length + data.plus_vocab.length}
        </h2>

        {/* 핵심 20 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          {data.must_vocab.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer"
            >
              <span className="text-xl w-8 text-center flex-shrink-0">
                {item[1] || '📌'}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-sm text-gray-900">{item[2]}</span>
                  <span className="text-xs text-gray-400">{item[3]}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{item[4]}</p>
              </div>
              <span
                className="text-[10px] font-bold font-en opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0"
                style={{ color: meta.colorDk }}
              >
                {item[0].padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>

        {/* 추가 어휘 */}
        {data.plus_vocab.length > 0 && (
          <>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs font-medium text-gray-400 mb-3">추가 어휘</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {data.plus_vocab.map((item, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="font-medium text-sm text-gray-800">{item[1]}</div>
                    <div className="text-xs text-gray-400 font-en">{item[2]}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* TOPIK 기출 어휘 */}
      {data.topik_vocab && data.topik_vocab.length > 0 && (
        <div className="card p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs bg-red-50 text-red-600 font-en font-bold">TOPIK II</span>
            기출 어휘
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {data.topik_vocab.slice(0, 10).map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-colors cursor-pointer"
              >
                <div className="text-[10px] font-bold text-red-300 font-en mb-1">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="font-bold text-sm text-gray-800">{item[0] || (item as any)[1]}</div>
                <div className="text-xs text-gray-400 mt-0.5 font-en leading-tight">
                  {item[1] || (item as any)[2]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
