import { doc, getDoc } from 'firebase/firestore'
import { getFirebaseDb } from './firebase'

export const ADMIN_EMAIL = 'ot.helper7@gmail.com'

export function isAdmin(email: string | null | undefined): boolean {
  return email === ADMIN_EMAIL
}

export async function checkPurchase(uid: string): Promise<boolean> {
  try {
    const db = getFirebaseDb()
    if (!db) return false
    const snap = await getDoc(doc(db, 'users', uid))
    if (!snap.exists()) return false
    return snap.data()?.purchased === true
  } catch {
    return false
  }
}

// series/book 단위 결제 확인 (users/{uid}/entitlements/{seriesId}_{bookId})
// 기존 purchased 필드와 별개 — Basecamp처럼 시리즈별 개별 구매 모델에 사용
export async function checkEntitlement(uid: string, seriesId: string, bookId: string): Promise<boolean> {
  try {
    const db = getFirebaseDb()
    if (!db) return false
    const snap = await getDoc(doc(db, 'users', uid, 'entitlements', `${seriesId}_${bookId}`))
    return snap.exists()
  } catch {
    return false
  }
}
