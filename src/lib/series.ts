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
]