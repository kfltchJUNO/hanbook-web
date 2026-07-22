'use client'
import { useLesson } from '@/context/LessonContext'

export default function BasecampQuizPage() {
  const { lesson } = useLesson()
  if (!lesson) return null

  return (
    <div className="space-y-5 fade-up">
      <div className="card p-5">
        <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-500">QUIZ</span>
          미니 퀴즈
        </h2>

        {lesson.quiz.length === 0 ? (
          <p className="text-sm text-gray-400">등록된 퀴즈가 없습니다.</p>
        ) : (
          <div className="space-y-5">
            {lesson.quiz.map((item, qi) => (
              <div key={qi} className="space-y-2.5">
                <p className="text-sm font-medium text-gray-800">
                  <span className="text-gray-400 font-bold mr-1.5">[{qi + 1}]</span>
                  {item.q}
                </p>
                {item.choices && item.choices.length > 0 && (
                  <div className="grid grid-cols-2 gap-1.5">
                    {item.choices.map((c, ci) => (
                      <div
                        key={ci}
                        className="p-2.5 rounded-lg border border-gray-200 text-sm cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-bold text-gray-400 mr-1.5">
                          {['①', '②', '③', '④'][ci]}
                        </span>
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {lesson.topikPreview.length > 0 && (
        <div className="card p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs bg-red-50 text-red-500 font-bold">TOPIK</span>
            미리보기
          </h2>
          <div className="space-y-5">
            {lesson.topikPreview.map((item, qi) => (
              <div key={qi} className="space-y-2.5">
                <p className="text-sm font-medium text-gray-800">
                  <span className="text-red-400 font-bold mr-1.5">[{qi + 1}]</span>
                  {item.q}
                </p>
                {item.choices && item.choices.length > 0 && (
                  <div className="grid grid-cols-2 gap-1.5">
                    {item.choices.map((c, ci) => (
                      <div
                        key={ci}
                        className="p-2.5 rounded-lg border border-gray-200 text-sm cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-bold text-gray-400 mr-1.5">
                          {['①', '②', '③', '④'][ci]}
                        </span>
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
