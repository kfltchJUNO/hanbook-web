'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '@/lib/firebase'

type Mode = 'login' | 'signup'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isFirebaseReady = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY

  async function handleGoogle() {
    if (!isFirebaseReady) {
      setError('서비스 준비 중입니다. 잠시 후 다시 시도해주세요.')
      return
    }
    setLoading(true); setError('')
    try {
      await signInWithGoogle()
      router.push('/catalog')
    } catch (e: any) {
      console.error('Google sign-in error:', e)
      setError(`Google 로그인에 실패했습니다. (${e.code || e.message || 'unknown'})`)
    } finally { setLoading(false) }
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!isFirebaseReady) {
      setError('서비스 준비 중입니다. 잠시 후 다시 시도해주세요.')
      return
    }
    setLoading(true); setError('')
    try {
      if (mode === 'login') await signInWithEmail(email, password)
      else await signUpWithEmail(email, password)
      router.push('/catalog')
    } catch (e: any) {
      const msg: Record<string, string> = {
        'auth/user-not-found': '등록되지 않은 이메일입니다.',
        'auth/wrong-password': '비밀번호가 틀렸습니다.',
        'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않습니다.',
        'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
        'auth/weak-password': '비밀번호는 6자 이상이어야 합니다.',
        'auth/invalid-email': '올바른 이메일 형식이 아닙니다.',
      }
      setError(msg[e.code] || '오류가 발생했습니다. 다시 시도해주세요.')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#FFE566] flex items-center justify-center text-2xl font-bold text-[#9A7A00] mx-auto mb-3 shadow-sm">
            H
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Hanbook</h1>
          <p className="text-sm text-gray-400 mt-1">한국어 학습의 새로운 기준</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
            {(['login', 'signup'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError('') }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === m
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {m === 'login' ? '로그인' : '회원가입'}
              </button>
            ))}
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-4 disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google로 계속하기
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">또는</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <form onSubmit={handleEmail} className="space-y-3">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FFE566] focus:ring-2 focus:ring-[#FFE566]/30 transition-all"
            />
            <input
              type="password"
              placeholder="비밀번호 (6자 이상)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#FFE566] focus:ring-2 focus:ring-[#FFE566]/30 transition-all"
            />

            {error && (
              <p className="text-xs text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#FFE566] text-[#9A7A00] text-sm font-bold hover:bg-[#FFD94D] transition-colors disabled:opacity-50"
            >
              {loading ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          로그인 시{' '}
          <span className="underline cursor-pointer">이용약관</span>
          {' '}및{' '}
          <span className="underline cursor-pointer">개인정보처리방침</span>
          에 동의합니다.
        </p>
      </div>
    </div>
  )
}