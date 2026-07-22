export const SERIES_ID = 'basecamp-korean'

export const BASECAMP_BOOKS: Record<string, {
  title: string
  levelLabel: string
  lessons: string[]
  color: string
  colorDk: string
}> = {
  b1: {
    title: 'Book 1',
    levelLabel: '0~1급',
    lessons: ['l0', 'l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8'],
    color: '#FFB347',
    colorDk: '#8A4B00',
  },
  b2: {
    title: 'Book 2',
    levelLabel: '2급',
    lessons: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10'],
    color: '#6FCF97',
    colorDk: '#1F6B3A',
  },
}

export const BASECAMP_PAGES = [
  { key: 'vocab',     label: '어휘',        labelEng: 'Vocabulary' },
  { key: 'grammar',   label: '문법',        labelEng: 'Grammar' },
  { key: 'dialogue',  label: '대화·말하기', labelEng: 'Dialogue' },
  { key: 'listening', label: '듣기·읽기',   labelEng: 'Listening' },
  { key: 'quiz',      label: '퀴즈',        labelEng: 'Quiz' },
] as const

export type BasecampPageKey = typeof BASECAMP_PAGES[number]['key']
