'use client'
import { useState } from 'react'

interface GrammarPageProps {
  step: number
  unit: number
  grammarNum: 1 | 2
  name: string
  nameEng: string
  desc: string
  descEng: string
  cols: string[]
  rows: string[][]
  irr: [string, string, string][]
  tip: string
  tipEng: string
  exs: [string, string][]
  prac: string[]
  color: string
  colorDk: string
}

export default function GrammarView({
  step, unit, grammarNum,
  name, nameEng, desc, descEng,
  cols, rows, irr, tip, tipEng,
  exs, prac,
  color, colorDk,
}: GrammarPageProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="space-y-5 fade-up">
      {/* 헤더 */}
      <div className="card p-5" style={{ borderLeft: `4px solid ${color}` }}>
        <div className="flex items-center gap-2 mb-2">
          <span
            className="px-2 py-0.5 rounded text-xs font-bold font-en"
            style={{ backgroundColor: color, color: colorDk }}
          >
            G{grammarNum}
          </span>
          <h1 className="text-lg font-bold text-gray-900">{name}</h1>
        </div>
        <p className="text-xs font-en text-gray-400 mb-3">{nameEng}</p>
        <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>
        <p className="text-xs text-gray-400 font-en mt-1 leading-relaxed">{descEng}</p>
      </div>

      {/* 형태표 */}
      {cols.length > 0 && rows.length > 0 && (
        <div className="card overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500">형태표</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full grammar-table text-sm">
              <thead>
                <tr>
                  {cols.map((col, i) => (
                    <th key={i} className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 bg-gray-50/80 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className="hover:bg-gray-50/50">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-4 py-2.5 border-t border-gray-100 text-sm leading-relaxed whitespace-pre-line"
                        style={ci === 2 ? { color: colorDk, fontWeight: 600 } : {}}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 불규칙 */}
      {irr.length > 0 && (
        <div className="card p-5">
          <h3 className="text-xs font-semibold text-gray-500 mb-3">불규칙 · 참고</h3>
          <div className="space-y-2">
            {irr.map(([type, rule, ex], i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span
                  className="px-2 py-0.5 rounded text-xs font-bold flex-shrink-0 h-fit"
                  style={{ backgroundColor: color + '40', color: colorDk }}
                >
                  {type}
                </span>
                <div>
                  <span className="text-gray-600">{rule}</span>
                  <span className="text-gray-400 mx-1">→</span>
                  <span className="font-medium text-gray-800">{ex}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 팁 */}
      {tip && (
        <div
          className="rounded-xl p-4 text-sm"
          style={{ backgroundColor: color + '20', borderLeft: `3px solid ${color}` }}
        >
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{tip}</p>
          {tipEng && <p className="text-xs text-gray-400 font-en mt-1 leading-relaxed whitespace-pre-line">{tipEng}</p>}
        </div>
      )}

      {/* 예문 */}
      {exs.length > 0 && (
        <div className="card p-5">
          <h3 className="text-xs font-semibold text-gray-500 mb-3">예문 Examples</h3>
          <div className="space-y-3">
            {exs.map(([kr, en], i) => (
              <div key={i} className="flex gap-3 items-start">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: color, color: colorDk }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{kr}</p>
                  <p className="text-xs text-gray-400 font-en">{en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 연습 */}
      {prac.length > 0 && (
        <div className="card p-5">
          <h3 className="text-xs font-semibold text-gray-500 mb-3">연습 Practice</h3>
          <div className="space-y-2">
            {prac.map((q, i) => (
              <div key={i} className="flex gap-3 items-center">
                <span className="text-xs text-gray-400 w-4 flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-gray-700">{q}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
