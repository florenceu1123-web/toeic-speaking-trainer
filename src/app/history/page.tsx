'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Session } from '@/lib/types'
import { loadSessions, clearSessions } from '@/lib/storage'
import { TASK_TYPE_LABELS } from '@/lib/questions'

const SCORE_COLOR = (score: number) =>
  score >= 8 ? 'text-green-600' : score >= 6 ? 'text-yellow-600' : 'text-red-500'

export default function HistoryPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<string>('all')

  useEffect(() => {
    setSessions(loadSessions().reverse())
  }, [])

  function handleClear() {
    if (confirm('모든 학습 기록을 삭제할까요?')) {
      clearSessions()
      setSessions([])
    }
  }

  const filtered = sessions.filter((s) => {
    const matchType = filterType === 'all' || s.question.type === filterType
    const matchSearch =
      !search ||
      s.question.prompt.toLowerCase().includes(search.toLowerCase()) ||
      s.transcript.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  const avgScore =
    sessions.length > 0
      ? (sessions.reduce((acc, s) => acc + s.feedback.scores.overall, 0) / sessions.length).toFixed(1)
      : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">📊 학습 기록</h1>
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          ← 홈
        </Link>
      </div>

      {/* Stats */}
      {sessions.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-3xl font-black text-blue-600">{sessions.length}</p>
            <p className="text-xs text-gray-500 mt-1">총 연습 횟수</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className={`text-3xl font-black ${SCORE_COLOR(parseFloat(avgScore || '0'))}`}>{avgScore}</p>
            <p className="text-xs text-gray-500 mt-1">평균 점수</p>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      {sessions.length > 0 && (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="문제 또는 답변 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="all">모든 유형</option>
            {Object.entries(TASK_TYPE_LABELS).map(([type, label]) => (
              <option key={type} value={type}>{label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Session list */}
      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📭</p>
          {sessions.length === 0 ? (
            <>
              <p className="font-medium">아직 연습 기록이 없어요</p>
              <Link href="/" className="mt-3 inline-block text-blue-600 text-sm underline">
                첫 번째 연습 시작하기
              </Link>
            </>
          ) : (
            <p>검색 결과가 없습니다</p>
          )}
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((session) => (
          <div
            key={session.id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
          >
            {/* Summary row */}
            <button
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
              onClick={() => setExpanded(expanded === session.id ? null : session.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {TASK_TYPE_LABELS[session.question.type]}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(session.date).toLocaleDateString('ko-KR', {
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-700 truncate">{session.question.prompt}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-xl font-black ${SCORE_COLOR(session.feedback.scores.overall)}`}>
                  {session.feedback.scores.overall}
                </p>
                <p className="text-xs text-gray-400">/10</p>
              </div>
              <span className="text-gray-400">{expanded === session.id ? '▲' : '▼'}</span>
            </button>

            {/* Expanded detail */}
            {expanded === session.id && (
              <div className="border-t border-gray-100 p-4 space-y-4 bg-gray-50">
                {/* Transcript */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">내 답변</p>
                  <p className="text-sm text-gray-700 leading-relaxed bg-white border border-gray-200 rounded-xl p-3">
                    {session.transcript || '(기록 없음)'}
                  </p>
                </div>

                {/* Corrected */}
                <div>
                  <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">교정본</p>
                  <p className="text-sm text-gray-700 leading-relaxed bg-green-50 border border-green-200 rounded-xl p-3">
                    {session.feedback.corrected_full}
                  </p>
                </div>

                {/* Scores */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '문법', score: session.feedback.scores.grammar },
                    { label: '어휘', score: session.feedback.scores.vocab },
                    { label: '논리', score: session.feedback.scores.coherence },
                  ].map(({ label, score }) => (
                    <div key={label} className="bg-white border border-gray-200 rounded-xl p-2 text-center">
                      <p className={`font-bold text-lg ${SCORE_COLOR(score)}`}>{score}</p>
                      <p className="text-xs text-gray-400">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                <div>
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">개선 포인트</p>
                  <ul className="space-y-1">
                    {session.feedback.tips.map((tip, i) => (
                      <li key={i} className="text-xs text-gray-600 flex gap-1.5">
                        <span className="text-amber-500 shrink-0">{i + 1}.</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Error count */}
                {session.feedback.errors.length > 0 && (
                  <p className="text-xs text-red-600">
                    오류 {session.feedback.errors.length}개 발견
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Clear */}
      {sessions.length > 0 && (
        <button
          onClick={handleClear}
          className="w-full py-2 text-sm text-red-400 hover:text-red-600 transition-colors"
        >
          모든 기록 삭제
        </button>
      )}
    </div>
  )
}
