import { redirect } from 'next/navigation'

export default function BasecampLessonPage({
  params,
}: {
  params: { book: string; lesson: string }
}) {
  redirect(`/learn/basecamp/${params.book}/${params.lesson}/vocab`)
}
