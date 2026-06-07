import fs from 'fs'
import path from 'path'

export interface UnitData {
  title: string
  title_eng: string
  chars: string
  must_vocab: [string, string, string, string, string][]
  plus_vocab: [string, string, string, string][]
  g1_name: string
  g1_name_eng: string
  g1_desc: string
  g1_desc_eng: string
  g1_cols: string[]
  g1_rows: string[][]
  g1_irr: [string, string, string][]
  g1_tip: string
  g1_tip_eng: string
  g1_exs: [string, string][]
  g1_prac: string[]
  g2_name: string
  g2_name_eng: string
  g2_desc: string
  g2_desc_eng: string
  g2_cols: string[]
  g2_rows: string[][]
  g2_irr: [string, string, string][]
  g2_tip: string
  g2_tip_eng: string
  g2_exs: [string, string][]
  g2_prac: string[]
  reading_title: string
  reading_title_eng: string
  reading_text: string[]
  q_labels: string[]
  listening_script: [string, string][]
  listening_qs: { q: string; opts: string[] }[]
  topik_qs: { q: string; choices: string[]; answer: string; note?: string }[]
  summary_rows: [string, string, string][]
  checklist: string[]
  mission: string
  mission_eng: string
  writing_prompt: string
  writing_prompt_eng: string
  topik_vocab: [string, string, string][]
}

export interface StepData {
  step: number
  level: string
  title: string
  color: string
  colorDk: string
  units: UnitData[]
}

export function getStepData(step: number): StepData | null {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', `step${step}.json`)
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function getUnitData(step: number, unit: number): UnitData | null {
  const data = getStepData(step)
  if (!data) return null
  return data.units[unit - 1] ?? null
}