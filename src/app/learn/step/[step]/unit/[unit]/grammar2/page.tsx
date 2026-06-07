import { getUnitData } from '@/lib/data'
import { STEP_META } from '@/lib/constants'
import { notFound } from 'next/navigation'
import GrammarView from '@/components/GrammarView'

export default function Grammar2Page({
  params,
}: {
  params: { step: string; unit: string }
}) {
  const step = Number(params.step)
  const unit = Number(params.unit)
  const data = getUnitData(step, unit)
  const meta = STEP_META[step]
  if (!data || !meta) notFound()

  return (
    <GrammarView
      step={step}
      unit={unit}
      grammarNum={2}
      name={data.g2_name}
      nameEng={data.g2_name_eng}
      desc={data.g2_desc}
      descEng={data.g2_desc_eng}
      cols={data.g2_cols || []}
      rows={data.g2_rows || []}
      irr={data.g2_irr || []}
      tip={data.g2_tip}
      tipEng={data.g2_tip_eng}
      exs={data.g2_exs || []}
      prac={data.g2_prac || []}
      color={meta.color}
      colorDk={meta.colorDk}
    />
  )
}