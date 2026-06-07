export interface Series {
  id: string
  title: string
  titleEng: string
  description: string
  levels: string
  totalSteps: number
  totalUnits: number
  color: string
  colorDk: string
  emoji: string
  available: boolean
  tag?: string
  basePath: string
}

export const SERIES_LIST: Series[] = [
  {
    id: 'step-korean',
    title: 'STEP Korean',
    titleEng: 'Step Korean',
    description: '체계적인 10단계 한국어 커리큘럼. 알파벳부터 TOPIK II까지.',
    levels: 'A1 → C2',
    totalSteps: 10,
    totalUnits: 50,
    color: '#FFE566',
    colorDk: '#9A7A00',
    emoji: '🇰🇷',
    available: true,
    basePath: '/learn/step/1/unit/1',
  },
  {
    id: 'topik-sprint',
    title: 'TOPIK Sprint',
    titleEng: 'TOPIK Sprint',
    description: 'TOPIK II 시험 집중 대비. 빈출 문형·어휘·쓰기 전략.',
    levels: 'B2 → C2',
    totalSteps: 4,
    totalUnits: 20,
    color: '#F78FAB',
    colorDk: '#8A1A3A',
    emoji: '📝',
    available: false,
    tag: 'COMING SOON',
    basePath: '/learn/topik/1/unit/1',
  },
  {
    id: 'business-korean',
    title: 'Business Korean',
    titleEng: 'Business Korean',
    description: '직장·비즈니스 한국어. 이메일, 회의, 발표, 협상 표현.',
    levels: 'B1 → C1',
    totalSteps: 5,
    totalUnits: 25,
    color: '#74B9FF',
    colorDk: '#0A4A8A',
    emoji: '💼',
    available: false,
    tag: 'COMING SOON',
    basePath: '/learn/business/1/unit/1',
  },
  {
    id: 'k-culture',
    title: 'K-Culture Korean',
    titleEng: 'K-Culture Korean',
    description: 'K-드라마·음악·영화로 배우는 생활 한국어.',
    levels: 'A2 → B2',
    totalSteps: 6,
    totalUnits: 30,
    color: '#4ECDC4',
    colorDk: '#1A6B65',
    emoji: '🎬',
    available: false,
    tag: 'COMING SOON',
    basePath: '/learn/kculture/1/unit/1',
  },
]