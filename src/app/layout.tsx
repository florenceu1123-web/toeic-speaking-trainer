import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '토스 스피킹 트레이너',
  description: 'TOEIC Speaking 기출 유형 연습 — 녹음 → STT → AI 문법 교정',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🎙️</span>
              <span className="font-bold text-gray-800">토스 트레이너</span>
            </a>
            <nav className="flex gap-4 text-sm">
              <a href="/" className="text-gray-500 hover:text-blue-600 transition-colors">홈</a>
              <a href="/history" className="text-gray-500 hover:text-blue-600 transition-colors">기록</a>
            </nav>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
