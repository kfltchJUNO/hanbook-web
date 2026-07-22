// Basecamp Korean 콘텐츠를 Firestore(series/books/lessons)에 밀어넣는 1회성 import 스크립트.
// 실행: node scripts/import-basecamp.js
//
// 서비스 계정 키 필요 — 아래 경로 중 하나에 준비:
//   1) 환경변수 FIREBASE_SERVICE_ACCOUNT_KEY=<키 파일 절대/상대 경로>
//   2) scripts/serviceAccountKey.json (기본값, .gitignore 처리됨 — 커밋되지 않음)
//
// 키 발급: Firebase 콘솔 > 프로젝트 설정 > 서비스 계정 > "새 비공개 키 생성"
//
// scripts/basecamp-import-data/ 아래 구조를 그대로 읽어 업서트한다 (merge: true, 여러 번 실행해도 안전):
//   series.json          -> series/{id}
//   {bookId}/book.json   -> series/{id}/books/{bookId}
//   {bookId}/{lessonId}.json (book.json 제외) -> series/{id}/books/{bookId}/lessons/{lessonId}

const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(__dirname, 'basecamp-import-data')

function resolveKeyPath() {
  const fromEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  if (fromEnv) return path.resolve(fromEnv)
  return path.join(__dirname, 'serviceAccountKey.json')
}

function loadServiceAccount() {
  const keyPath = resolveKeyPath()
  if (!fs.existsSync(keyPath)) {
    console.error(`서비스 계정 키를 찾을 수 없습니다: ${keyPath}`)
    console.error('Firebase 콘솔 > 프로젝트 설정 > 서비스 계정에서 키를 발급받아 위 경로에 두거나,')
    console.error('FIREBASE_SERVICE_ACCOUNT_KEY 환경변수로 경로를 지정하세요.')
    process.exit(1)
  }
  return JSON.parse(fs.readFileSync(keyPath, 'utf-8'))
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

async function main() {
  const { initializeApp, cert } = require('firebase-admin/app')
  const { getFirestore } = require('firebase-admin/firestore')
  const serviceAccount = loadServiceAccount()
  const app = initializeApp({ credential: cert(serviceAccount) })
  const db = getFirestore(app)

  if (!fs.existsSync(DATA_DIR)) {
    console.error(`데이터 디렉터리가 없습니다: ${DATA_DIR}`)
    process.exit(1)
  }

  const seriesPath = path.join(DATA_DIR, 'series.json')
  if (!fs.existsSync(seriesPath)) {
    console.error(`series.json이 없습니다: ${seriesPath}`)
    process.exit(1)
  }
  const seriesData = readJson(seriesPath)
  const seriesId = seriesData.id
  if (!seriesId) {
    console.error('series.json에 id 필드가 없습니다.')
    process.exit(1)
  }

  const { id, ...seriesFields } = seriesData
  await db.doc(`series/${seriesId}`).set(seriesFields, { merge: true })
  console.log(`✓ series/${seriesId}`)

  const bookDirs = fs.readdirSync(DATA_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())

  for (const dirent of bookDirs) {
    const bookId = dirent.name
    const bookDir = path.join(DATA_DIR, bookId)
    const bookJsonPath = path.join(bookDir, 'book.json')

    if (fs.existsSync(bookJsonPath)) {
      const bookData = readJson(bookJsonPath)
      await db.doc(`series/${seriesId}/books/${bookId}`).set(bookData, { merge: true })
      console.log(`✓ series/${seriesId}/books/${bookId}`)
    } else {
      console.warn(`  book.json 없음, 건너뜀: ${bookDir}`)
    }

    const lessonFiles = fs.readdirSync(bookDir)
      .filter((f) => f.endsWith('.json') && f !== 'book.json')

    for (const file of lessonFiles) {
      const lessonId = file.replace(/\.json$/, '')
      const lessonData = readJson(path.join(bookDir, file))
      await db.doc(`series/${seriesId}/books/${bookId}/lessons/${lessonId}`).set(lessonData, { merge: true })
      console.log(`✓ series/${seriesId}/books/${bookId}/lessons/${lessonId}`)
    }
  }

  console.log('\n완료.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
