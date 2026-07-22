export interface Series {
  id: string
  title: string
  titleEng: string
  description: string
  levels: string
  totalSteps: number
  totalUnits: number
  stepsLabel?: string
  unitsLabel?: string
  color: string
  colorDk: string
  emoji: string
  basePath: string
}

export const SERIES_LIST: Series[] = [
  {
    id: 'step-korean',
    title: 'STEP Korean',
    titleEng: 'Step Korean',
    description: '체계적인 10단계 한국어 커리큘럼. 초급부터 TOPIK II까지.',
    levels: 'A1 → C2',
    totalSteps: 10,
    totalUnits: 50,
    color: '#FFE566',
    colorDk: '#9A7A00',
    emoji: '🇰🇷',
    basePath: '/learn/step/1/unit/1',
  },
  {
    id: 'basecamp-korean',
    title: 'Basecamp Korean',
    titleEng: 'Basecamp Korean',
    description: '단기 완주형 초급 한국어 문법 교재. Book1(0~1급)·Book2(2급), 총 19과.',
    levels: '0 → 2급',
    totalSteps: 2,
    totalUnits: 19,
    stepsLabel: '북',
    unitsLabel: '과',
    color: '#FFB347',
    colorDk: '#8A4B00',
    emoji: '⛺',
    basePath: '/learn/basecamp/b1/l1',
  },
]