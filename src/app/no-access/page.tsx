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
        <div className="w-16 h-16 rounded-2xl bg-[#FFE566] flex items-center justify-center text-3xl mx-auto mb-6">
          🔒
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">접근 권한이 없습니다</h1>
        <p className="text-sm text-gray-500 mb-2">
          Hanbook은 구매자만 이용할 수 있습니다.
        </p>
        <p className="text-xs text-gray-400 mb-8">
          현재 로그인: <span className="font-medium text-gray-600">{user?.email}</span>
        </p>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5 text-left">
          <p className="text-sm font-semibold text-gray-800 mb-3">이용 방법</p>
          <ol className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="font-bold text-[#9A7A00] flex-shrink-0">1.</span>
              아래 버튼으로 Gumroad에서 구매해주세요.
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#9A7A00] flex-shrink-0">2.</span>
              구매 시 사용한 이메일로 이 계정을 만들었다면 자동으로 활성화됩니다.
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-[#9A7A00] flex-shrink-0">3.</span>
              활성화에 문제가 있으면 ot.helper7@gmail.com으로 문의하세요.
            </li>
          </ol>
        </div>
        
          href="https://gumroad.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-xl bg-[#FFE566] text-[#9A7A00] text-sm font-bold text-center hover:bg-[#FFD94D] transition-colors mb-3"
        >
          Gumroad에서 구매하기
        </a>
        <button
          onClick={() => { logout(); router.push('/login') }}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          다른 계정으로 로그인
        </button>
      </div>
    </div>
  )
}
