import { getUnitData } from '@/lib/data'
import { STEP_META } from '@/lib/constants'
import { notFound } from 'next/navigation'
import GrammarView from '@/components/GrammarView'

export default function Grammar1Page({
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
      grammarNum={1}
      name={data.g1_name}
      nameEng={data.g1_name_eng}
      desc={data.g1_desc}
      descEng={data.g1_desc_eng}
      cols={data.g1_cols || []}
      rows={data.g1_rows || []}
      irr={data.g1_irr || []}
      tip={data.g1_tip}
      tipEng={data.g1_tip_eng}
      exs={data.g1_exs || []}
      prac={data.g1_prac || []}
      color={meta.color}
      colorDk={meta.colorDk}
    />
  )
}
