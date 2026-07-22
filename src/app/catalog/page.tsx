'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { SERIES_LIST } from '@/lib/series'
import { isAdmin, checkPurchase } from '@/lib/auth'
import { logout } from '@/lib/firebase'

export default function CatalogPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [accessChecked, setAccessChecked] = useState(false)
  const isFirebaseReady = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.replace('/login')
      return
    }

    if (!isFirebaseReady) {
      router.replace('/login')
      return
    }

    if (isAdmin(user.email)) {
      setAccessChecked(true)
      return
    }

    checkPurchase(user.uid).then((purchased) => {
      if (purchased) {
        setAccessChecked(true)
      } else {
        router.replace('/no-access')
      }
    })
  }, [user, loading, isFirebaseReady, router])

  if (loading || !accessChecked) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFE566] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const displayName = user?.displayName || user?.email?.split('@')[0] || '학습자'
  const admin = isAdmin(user?.email)

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FFE566] flex items-center justify-center text-sm font-bold text-[#9A7A00]">
              H
            </div>
            <span className="font-bold text-lg tracking-tight">Hanbook</span>
            {admin && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-900 text-white ml-1">
                ADMIN
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                    {displayName[0].toUpperCase()}
                  </div>
                )}
                <span className="text-sm text-gray-600 hidden sm:block">{displayName}</span>
              </div>
            )}
            <button
              onClick={() => { logout(); router.push('/login') }}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-8 fade-up">
          <p className="text-xs text-gray-400 mb-1">안녕하세요, {displayName} 님 👋</p>
          <h1 className="text-2xl font-bold text-gray-900">어떤 시리즈를 공부할까요?</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERIES_LIST.map((series, idx) => (
            <Link
              key={series.id}
              href={series.basePath}
              className="card p-5 fade-up transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer block"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: series.color }}
                >
                  {series.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-gray-900 text-base mb-1">{series.title}</h2>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{series.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="font-semibold font-en" style={{ color: series.colorDk }}>
                      {series.levels}
                    </span>
                    <span>·</span>
                    <span>{series.stepsLabel ?? 'Step'} {series.totalSteps}개</span>
                    <span>·</span>
                    <span>{series.unitsLabel ?? 'Unit'} {series.totalUnits}개</span>
                  </div>
                </div>
                <div className="flex items-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}