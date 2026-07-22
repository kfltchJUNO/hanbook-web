'use client'
import { useLesson } from '@/context/LessonContext'

export default function BasecampDialoguePage() {
  const { lesson } = useLesson()
  if (!lesson) return null

  return (
    <div className="space-y-5 fade-up">
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-500">대화</span>
            Dialogue
          </h2>
          {lesson.dialogueAudioUrl && (
            <audio controls src={lesson.dialogueAudioUrl} className="h-8" />
          )}
        </div>

        {lesson.dialogue.length === 0 ? (
          <p className="text-sm text-gray-400">등록된 대화가 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {lesson.dialogue.map((d, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-xs font-bold flex-shrink-0 pt-0.5 w-16 truncate text-gray-500">
                  {d.speaker}
                </span>
                <div>
                  <p className="text-sm text-gray-800 leading-relaxed">{d.line}</p>
                  {d.lineEng && <p className="text-xs text-gray-400">{d.lineEng}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {lesson.speakingActivities.length > 0 && (
        <div className="card p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-3">말하기 활동</h2>
          <div className="space-y-2">
            {lesson.speakingActivities.map((a, i) => (
              <p key={i} className="text-sm text-gray-700">{a}</p>
            ))}
          </div>
        </div>
      )}

      {lesson.selfCheckItems.length > 0 && (
        <div className="card p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-3">✅ 자가 점검</h2>
          <div className="space-y-2">
            {lesson.selfCheckItems.map((item, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded border-2 border-gray-300 group-hover:border-gray-400 transition-colors flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
