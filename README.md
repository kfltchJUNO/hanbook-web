# Hanbook Web — STEP Korean

한국어 학습 웹앱. A1~C2 (Step 1~10), 총 50개 유닛.

## 기술 스택

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **TypeScript**
- 콘텐츠: `src/data/step1~10.json` (Python content에서 변환)

## 로컬 실행

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Vercel 배포 (첫 배포)

### 1. GitHub 저장소 생성

```bash
git init
git add .
git commit -m "init: hanbook web app"
git remote add origin https://github.com/<your-username>/hanbook-web.git
git push -u origin main
```

### 2. Vercel 연결

1. [vercel.com](https://vercel.com) 로그인 (GitHub 계정)
2. **"Add New Project"** → GitHub 저장소 선택
3. Framework: **Next.js** (자동 감지)
4. Region: **Seoul (icn1)** 선택
5. **Deploy** 클릭

배포 완료 후 `https://hanbook-web.vercel.app` (또는 커스텀 도메인) 접속 가능.

### 3. 커스텀 도메인 (선택)

Vercel 프로젝트 Settings → Domains → `hanbook.kr` 또는 원하는 도메인 추가.

---

## 폴더 구조

```
src/
├── app/
│   ├── page.tsx                    # 홈 (Step 목록)
│   └── learn/step/[step]/unit/[unit]/
│       ├── layout.tsx              # 네비게이션 바
│       ├── vocab/page.tsx          # 어휘
│       ├── grammar1/page.tsx       # 문법 1
│       ├── grammar2/page.tsx       # 문법 2
│       ├── reading/page.tsx        # 읽기·듣기
│       └── review/page.tsx         # 정리·TOPIK
├── components/
│   └── GrammarView.tsx             # 문법 공통 컴포넌트
├── data/
│   └── step1~10.json               # 콘텐츠 데이터
└── lib/
    ├── constants.ts                # Step 색상/메타
    └── data.ts                     # 데이터 로더
```

## 다음 단계 (Phase 2)

- [ ] Firebase Auth (Google 로그인)
- [ ] Firestore 진도 저장
- [ ] Gumroad PDF 구매 연동
- [ ] ElevenLabs TTS (발음 듣기)
- [ ] 의뢰인 어드민 패널
