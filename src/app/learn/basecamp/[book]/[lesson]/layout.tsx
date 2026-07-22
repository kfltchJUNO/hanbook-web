'use client'
import { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { LessonProvider } from '@/context/LessonContext'
import { isAdmin, checkEntitlement } from '@/lib/auth'
import { getLesson, type LessonData } from '@/lib/basecampData'
import { BASECAMP_BOOKS, BASECAMP_PAGES, SERIES_ID } from '@/lib/basecampConstants'

type Status = 'checking' | 'allowed' | 'denied'

export default function BasecampLessonLayout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const book = String(params.book)
  const lessonId = String(params.lesson)
  const bookMeta = BASECAMP_BOOKS[book]

  const [lesson, setLesson] = useState<LessonData | null>(null)
  const [status, setStatus] = useState<Status>('checking')

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.replace('/login')
      return
    }
    if (!bookMeta) return

    let cancelled = false
    setStatus('checking')

    getLesson(SERIES_ID, book, lessonId).then(async (data) => {
      if (cancelled) return
      setLesson(data)

      if (!data) {
        setStatus('allowed') // 콘텐츠 미등록 — 접근은 허용하고 "준비 중" 화면을 보여줌
        return
      }
      if (isAdmin(user.email) || data.isFree) {
        setStatus('allowed')
        return
      }
      const entitled = await checkEntitlement(user.uid, SERIES_ID, book)
      if (cancelled) return
      if (entitled) {
        setStatus('allowed')
      } else {
        setStatus('denied')
        router.replace('/no-access')
      }
    })

    return () => { cancelled = true }
  }, [authLoading, user, book, lessonId, bookMeta, router])

  if (authLoading || status === 'checking') {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFB347] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (status === 'denied') return null

  if (!bookMeta) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center px-4">
        <p className="text-sm text-gray-500 mb-4">존재하지 않는 교재입니다.</p>
        <Link href="/catalog" className="text-xs text-gray-400 underline">카탈로그로 돌아가기</Link>
      </div>
    )
  }

  const lessonIdx = bookMeta.lessons.indexOf(lessonId)
  const prevLessonId = lessonIdx > 0 ? bookMeta.lessons[lessonIdx - 1] : null
  const nextLessonId = lessonIdx >= 0 && lessonIdx < bookMeta.lessons.length - 1
    ? bookMeta.lessons[lessonIdx + 1]
    : null
  const nextBookId = !nextLessonId && book === 'b1' && BASECAMP_BOOKS['b2'] ? 'b2' : null
  const nextBookFirstLesson = nextBookId ? BASECAMP_BOOKS[nextBookId].lessons[0] : null

  const segments = pathname.split('/')
  const currentPage = segments[segments.length - 1]

  return (
    <LessonProvider lesson={lesson} loading={false}>
      <div className="min-h-screen bg-[#F8F7F4] flex flex-col">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
          <div className="max-w-4xl mx-auto px-4 flex items-center gap-3" style={{ height: '52px' }}>
            <Link href="/catalog" className="text-gray-400 hover:text-gray-700 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Link>
            <div
              className="px-2.5 py-1 rounded-lg text-xs font-bold"
              style={{ backgroundColor: bookMeta.color, color: bookMeta.colorDk }}
            >
              {bookMeta.title} · {bookMeta.levelLabel}
            </div>
            <span className="text-sm font-medium text-gray-700 flex-1 truncate">
              {lesson?.title ?? `${lessonId.replace('l', '')}과`}
            </span>
            <div className="flex items-center gap-1">
              {prevLessonId && (
                <Link
                  href={`/learn/basecamp/${book}/${prevLessonId}`}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </Link>
              )}
              <span className="text-xs text-gray-400 w-10 text-center">
                {lessonIdx + 1}/{bookMeta.lessons.length}
              </span>
              {nextLessonId && (
                <Link
                  href={`/learn/basecamp/${book}/${nextLessonId}`}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Link>
              )}
              {!nextLessonId && nextBookId && nextBookFirstLesson && (
                <Link
                  href={`/learn/basecamp/${nextBookId}/${nextBookFirstLesson}`}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Link>
              )}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 flex gap-0 border-t border-gray-50 overflow-x-auto">
            {BASECAMP_PAGES.map((p) => {
              const href = `/learn/basecamp/${book}/${lessonId}/${p.key}`
              const isActive = currentPage === p.key || (currentPage === lessonId && p.key === 'vocab')
              return (
                <Link
                  key={p.key}
                  href={href}
                  className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                    isActive
                      ? 'border-current font-semibold'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                  style={isActive ? { color: bookMeta.colorDk, borderColor: bookMeta.colorDk } : {}}
                >
                  {p.label}
                </Link>
              )
            })}
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
          {lesson ? children : (
            <div className="card p-5 text-center text-sm text-gray-400">
              콘텐츠 준비 중입니다.
            </div>
          )}
        </main>
      </div>
    </LessonProvider>
  )
}
