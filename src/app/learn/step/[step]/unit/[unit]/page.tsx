import { redirect } from 'next/navigation'

export default function UnitPage({
  params,
}: {
  params: { step: string; unit: string }
}) {
  redirect(`/learn/step/${params.step}/unit/${params.unit}/vocab`)
}
