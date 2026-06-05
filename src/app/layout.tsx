import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hanbook — STEP Korean',
  description: '첫걸음부터 TOPIK II까지. 체계적인 한국어 학습',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
