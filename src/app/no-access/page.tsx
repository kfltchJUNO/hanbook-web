'use client'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { logout } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function NoAccessPage() {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">접근 권한이 없습니다</h1>
        <p className="text-sm text-gray-500 mb-4">Hanbook은 구매자만 이용할 수 있습니다.</p>
        <p className="text-xs text-gray-400 mb-8">현재 로그인: {user?.email}</p>
        <a href="https://gumroad.com" target="_blank" rel="noopener noreferrer" className="block w-full py-3 rounded-xl bg-[#FFE566] text-[#9A7A00] text-sm font-bold text-center mb-3">Gumroad에서 구매하기</a>
        <button onClick={() => { logout(); router.push('/login') }} className="text-xs text-gray-400">다른 계정으로 로그인</button>
      </div>
    </div>
  )
}