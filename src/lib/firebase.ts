// 클라이언트 전용 — 'use client' 컴포넌트에서만 import
//
// 이 파일의 모든 firebase/* import는 반드시 정적(top-level) import여야 한다.
// require()나 동적 import()를 함수 안에서 섞어 쓰면 Next.js 번들링 시 서로 다른
// webpack 청크(= 서로 다른 모듈 인스턴스)로 갈라질 수 있고, 그러면
// initializeApp()으로 만든 app과 getFirestore()/getAuth()가 서로 다른 컴포넌트
// 레지스트리를 참조하게 되어 "Service firestore is not available"이나
// "Expected first argument to doc() to be a ... FirebaseFirestore" 같은
// 에러가 난다. 이 프로젝트에서 실제로 두 에러를 다 겪었다.
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User,
} from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

let _app: FirebaseApp | null = null
let _auth: Auth | null = null
let _db: Firestore | null = null

function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === 'undefined') return null
  if (_app) return _app

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  if (!apiKey) return null

  _app = getApps().length
    ? getApps()[0]
    : initializeApp({
        apiKey,
        authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      })
  return _app
}

function getFirebaseAuth(): Auth | null {
  if (_auth) return _auth
  const app = getFirebaseApp()
  if (!app) return null
  _auth = getAuth(app)
  return _auth
}

export function getFirebaseDb(): Firestore | null {
  if (_db) return _db
  const app = getFirebaseApp()
  if (!app) return null
  _db = getFirestore(app)
  return _db
}

// han-book 프로젝트의 Firebase 호스팅 인증 중계 페이지(/__/auth/handler)가
// "The requested action is invalid."로 죽어있어 signInWithPopup/signInWithRedirect
// 둘 다 그 페이지를 거치다 실패한다. Google Identity Toolkit API 자체(createAuthUri)는
// 정상 동작함을 확인했으므로, Google Identity Services로 직접 액세스 토큰을 받아
// signInWithCredential로 그 중계 페이지를 완전히 우회한다.
export async function signInWithGoogleAccessToken(accessToken: string) {
  const auth = getFirebaseAuth()
  if (!auth) throw new Error('Firebase not configured')
  const credential = GoogleAuthProvider.credential(undefined, accessToken)
  return signInWithCredential(auth, credential)
}

export async function signInWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth()
  if (!auth) throw new Error('Firebase not configured')
  return signInWithEmailAndPassword(auth, email, password)
}

export async function signUpWithEmail(email: string, password: string) {
  const auth = getFirebaseAuth()
  if (!auth) throw new Error('Firebase not configured')
  return createUserWithEmailAndPassword(auth, email, password)
}

export async function logout() {
  const auth = getFirebaseAuth()
  if (!auth) return
  return signOut(auth)
}

export function subscribeAuth(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth()
  if (!auth) {
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(auth, callback)
}

export type { User }
