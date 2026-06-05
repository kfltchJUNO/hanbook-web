export const STEP_META: Record<number, {
  level: string
  title: string
  color: string
  colorDk: string
  textColor: string
}> = {
  1:  { level: 'A1',  title: '인사·자기소개',      color: '#FFE566', colorDk: '#9A7A00', textColor: '#7A6000' },
  2:  { level: 'A2',  title: '이유·과거·소망',     color: '#7BC67E', colorDk: '#2E7A32', textColor: '#1E5422' },
  3:  { level: 'A2+', title: '경험·가능·이유',     color: '#56C1E8', colorDk: '#0A6A8A', textColor: '#0A5A78' },
  4:  { level: 'B1',  title: '관형형·조건·시간',   color: '#F78FAB', colorDk: '#8A1A3A', textColor: '#7A1030' },
  5:  { level: 'B1+', title: '인용·보조동사·피동', color: '#4ECDC4', colorDk: '#1A6B65', textColor: '#155955' },
  6:  { level: 'B2',  title: '복문·격식연결',      color: '#A78BFA', colorDk: '#4A2AAA', textColor: '#3A1A9A' },
  7:  { level: 'B2+', title: '고급발화·태도',      color: '#74B9FF', colorDk: '#0A4A8A', textColor: '#0A3A7A' },
  8:  { level: 'C1',  title: '격식문어체',         color: '#FFA07A', colorDk: '#8A3A00', textColor: '#7A3000' },
  9:  { level: 'C1+', title: 'TOPIK 읽기·듣기',   color: '#5B8DB8', colorDk: '#2E5A8A', textColor: '#1E4A7A' },
  10: { level: 'C2',  title: 'TOPIK 쓰기',        color: '#E8735A', colorDk: '#9A2E1A', textColor: '#8A2010' },
}

export const UNIT_PAGES = [
  { key: 'vocab',    label: '어휘',     labelEng: 'Vocabulary' },
  { key: 'grammar1', label: '문법 1',  labelEng: 'Grammar 1' },
  { key: 'grammar2', label: '문법 2',  labelEng: 'Grammar 2' },
  { key: 'reading',  label: '읽기·듣기', labelEng: 'Reading' },
  { key: 'review',   label: '정리',    labelEng: 'Review' },
] as const

export type PageKey = typeof UNIT_PAGES[number]['key']
