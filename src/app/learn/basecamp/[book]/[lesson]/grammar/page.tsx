'use client'
import { useLesson } from '@/context/LessonContext'

export default function BasecampGrammarPage() {
  const { lesson } = useLesson()
  if (!lesson) return null

  return (
    <div className="space-y-5 fade-up">
      {lesson.grammar.length === 0 ? (
        <div className="card p-5 text-sm text-gray-400">등록된 문법이 없습니다.</div>
      ) : (
        lesson.grammar.map((g, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-500">
                G{i + 1}
              </span>
              <h2 className="text-base font-bold text-gray-900">{g.name}</h2>
            </div>
            {g.nameEng && <p className="text-xs text-gray-400 mb-2">{g.nameEng}</p>}
            {g.desc && <p className="text-sm text-gray-700 leading-relaxed">{g.desc}</p>}
            {g.descEng && <p className="text-xs text-gray-400 mt-1 leading-relaxed">{g.descEng}</p>}

            {g.examples && g.examples.length > 0 && (
              <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
                {g.examples.map((ex, ei) => (
                  <div key={ei}>
                    <p className="text-sm font-medium text-gray-800">{ex.kr}</p>
                    <p className="text-xs text-gray-400">{ex.en}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}
