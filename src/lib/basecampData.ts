// 클라이언트 전용 — 'use client' 컴포넌트에서만 import
import { doc, getDoc } from 'firebase/firestore'
import { getFirebaseDb } from './firebase'

export interface VocabItem {
  word: string
  meaning: string
  pronunciation?: string
  emoji?: string
}

export interface GrammarItem {
  name: string
  nameEng?: string
  desc?: string
  descEng?: string
  // Firestore는 배열 안에 배열을 직접 담을 수 없어 {kr, en} 객체로 표현
  examples?: { kr: string; en: string }[]
}

export interface DialogueLine {
  speaker: string
  line: string
  lineEng?: string
}

export interface ListeningQuestion {
  q: string
  opts?: string[]
  answer?: string
}

export interface QuizItem {
  q: string
  choices?: string[]
  answer?: string
}

export interface LessonData {
  title: string
  order: number
  isFree: boolean
  vocab: VocabItem[]
  grammar: GrammarItem[]
  dialogue: DialogueLine[]
  dialogueAudioUrl?: string
  speakingActivities: string[]
  selfCheckItems: string[]
  listening: {
    audioUrl?: string
    questions: ListeningQuestion[]
  }
  reading: {
    text?: string
    writingPrompt?: string
  }
  topikPreview: QuizItem[]
  quiz: QuizItem[]
  images: string[]
}

export async function getLesson(
  seriesId: string,
  bookId: string,
  lessonId: string
): Promise<LessonData | null> {
  const db = getFirebaseDb()
  if (!db) return null

  const snap = await getDoc(doc(db, 'series', seriesId, 'books', bookId, 'lessons', lessonId))
  if (!snap.exists()) return null
  return snap.data() as LessonData
}
