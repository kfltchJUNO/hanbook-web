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

export function getFirebaseDb() {
  if (typeof window === 'undefined') return null
  if (_db) return _db

  const app = getFirebaseApp()
  if (!app) return null

  const { getFirestore } = require('firebase/firestore')
  _db = getFirestore(app)
  return _db
}

export async function signInWithGoogle() {
  const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth')
  const auth = getFirebaseAuth()
  if (!auth) throw new Error('Firebase not configured')
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  return signInWithPopup(auth, provider)
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