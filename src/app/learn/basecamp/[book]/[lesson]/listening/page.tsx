'use client'
import { useLesson } from '@/context/LessonContext'

export default function BasecampListeningPage() {
  const { lesson } = useLesson()
  if (!lesson) return null

  return (
    <div className="space-y-5 fade-up">
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-500">듣기</span>
            Listening
          </h2>
          {lesson.listening.audioUrl && (
            <audio controls src={lesson.listening.audioUrl} className="h-8" />
          )}
        </div>

        {lesson.listening.questions.length === 0 ? (
          <p className="text-sm text-gray-400">등록된 듣기 문제가 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {lesson.listening.questions.map((q, qi) => (
              <div key={qi} className="space-y-2">
                <p className="text-sm font-medium text-gray-800">Q{qi + 1}. {q.q}</p>
                {q.opts && q.opts.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {q.opts.map((opt, oi) => (
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
            ))}
          </div>
        )}
      </div>

      {lesson.reading.text && (
        <div className="card p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-500">읽기</span>
            Reading
          </h2>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
              {lesson.reading.text}
            </p>
          </div>
          {lesson.reading.writingPrompt && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 mb-2">쓰기 예문</h3>
              <p className="text-sm text-gray-600">{lesson.reading.writingPrompt}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
