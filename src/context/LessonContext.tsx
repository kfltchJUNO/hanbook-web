'use client'
import { createContext, useContext } from 'react'
import type { LessonData } from '@/lib/basecampData'

interface LessonCtx {
  lesson: LessonData | null
  loading: boolean
}

const LessonContext = createContext<LessonCtx>({ lesson: null, loading: true })

export function LessonProvider({
  lesson,
  loading,
  children,
}: LessonCtx & { children: React.ReactNode }) {
  return (
    <LessonContext.Provider value={{ lesson, loading }}>
      {children}
    </LessonContext.Provider>
  )
}

export const useLesson = () => useContext(LessonContext)
