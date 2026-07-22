'use client'
import { useLesson } from '@/context/LessonContext'

export default function BasecampVocabPage() {
  const { lesson } = useLesson()
  if (!lesson) return null

  return (
    <div className="space-y-5 fade-up">
      <div className="card p-5">
        <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-500">VOCAB</span>
          핵심 어휘 {lesson.vocab.length}
        </h2>

        {lesson.vocab.length === 0 ? (
          <p className="text-sm text-gray-400">등록된 어휘가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {lesson.vocab.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl w-8 text-center flex-shrink-0">
                  {item.emoji || '📌'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-sm text-gray-900">{item.word}</span>
                    {item.pronunciation && (
                      <span className="text-xs text-gray-400">{item.pronunciation}</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{item.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
