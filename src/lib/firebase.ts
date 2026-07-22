// 클라이언트 전용 — 'use client' 컴포넌트에서만 import

let _auth: any = null
let _db: any = null

function getFirebaseApp() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  if (!apiKey) return null

  const { initializeApp, getApps } = require('firebase/app')

  return getApps().length
    ? getApps()[0]
    : initializeApp({
        apiKey,
        authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      })
}

function getFirebaseAuth() {
  if (typeof window === 'undefined') return null
  if (_auth) return _auth

  const app = getFirebaseApp()
  if (!app) return null

  const { getAuth } = require('firebase/auth')
  _auth = getAuth(app)
  return _auth
}

// getFirestore()를 require()로 가져오면, doc()/getDoc()을 await import()로 가져오는
// 다른 코드와 서로 다른 webpack 청크(= 서로 다른 Firestore 클래스 인스턴스)로 갈라져
// "Expected first argument to doc() to be a ... FirebaseFirestore" 에러가 난다.
// 그래서 이 함수도 동일하게 동적 import를 사용해 항상 같은 모듈 인스턴스를 쓰게 한다.
export async function getFirebaseDb() {
  if (typeof window === 'undefined') return null
  if (_db) return _db

  const app = getFirebaseApp()
  if (!app) return null

  const { getFirestore } = await import('firebase/firestore')
  _db = getFirestore(app)
  return _db
}

// han-book 프로젝트의 Firebase 호스팅 인증 중계 페이지(/__/auth/handler)가
// "The requested action is invalid."로 죽어있어 signInWithPopup/signInWithRedirect
// 둘 다 그 페이지를 거치다 실패한다. Google Identity Toolkit API 자체(createAuthUri)는
// 정상 동작함을 확인했으므로, Google Identity Services로 직접 액세스 토큰을 받아
// signInWithCredential로 그 중계 페이지를 완전히 우회한다.
export async function signInWithGoogleAccessToken(accessToken: string) {
  const { GoogleAuthProvider, signInWithCredential } = await import('firebase/auth')
  const auth = getFirebaseAuth()
  if (!auth) throw new Error('Firebase not configured')
  const credential = GoogleAuthProvider.credential(undefined, accessToken)
  return signInWithCredential(auth, credential)
}

export async function signInWithEmail(email: string, password: string) {
  const { signInWithEmailAndPassword } = await import('firebase/auth')
  const auth = getFirebaseAuth()
  if (!auth) throw new Error('Firebase not configured')
  return signInWithEmailAndPassword(auth, email, password)
}

export async function signUpWithEmail(email: string, password: string) {
  const { createUserWithEmailAndPassword } = await import('firebase/auth')
  const auth = getFirebaseAuth()
  if (!auth) throw new Error('Firebase not configured')
  return createUserWithEmailAndPassword(auth, email, password)
}

export async function logout() {
  const { signOut } = await import('firebase/auth')
  const auth = getFirebaseAuth()
  if (!auth) return
  return signOut(auth)
}

export function subscribeAuth(callback: (user: any) => void) {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  if (!apiKey || typeof window === 'undefined') {
    callback(null)
    return () => {}
  }
  import('firebase/auth').then(({ onAuthStateChanged }) => {
    const auth = getFirebaseAuth()
    if (!auth) { callback(null); return }
    onAuthStateChanged(auth, callback)
  })
  return () => {}
}

export type { User } from 'firebase/auth'