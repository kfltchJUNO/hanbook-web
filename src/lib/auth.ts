export const ADMIN_EMAIL = 'ot.helper7@gmail.com'

export function isAdmin(email: string | null | undefined): boolean {
  return email === ADMIN_EMAIL
}

export async function checkPurchase(uid: string): Promise<boolean> {
  try {
    const { getFirestore, doc, getDoc } = await import('firebase/firestore')
    const { getApps } = await import('firebase/app')
    if (!getApps().length) return false
    const db = getFirestore()
    const snap = await getDoc(doc(db, 'users', uid))
    if (!snap.exists()) return false
    return snap.data()?.purchased === true
  } catch {
    return false
  }
}