'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TaskType } from '@/lib/types'
import { TASK_TYPE_LABELS, TASK_TYPE_DESCRIPTIONS } from '@/lib/questions'
import { loadSessions } from '@/lib/storage'

const TASK_ICONS: Record<TaskType, string> = {
  read_aloud: '📖',
  describe_picture: '🖼️',
  respond_questions: '💬',
  propose_solution: '🧩',
  express_opinion: '💡',
}

const ALL_TYPES: TaskType[] = [
  'read_aloud',
  'describe_picture',
  'respond_questions',
  'propose_solution',
  'express_opinion',
]

const TARGET_LEVELS = ['IL (Intermediate Low)', 'IM (Intermediate Mid)', 'IH (Intermediate High)', 'AL (Advanced Low)']

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<TaskType | 'random'>('random')
  const [targetLevel, setTargetLevel] = useState('IH (Intermediate High)')
  const [sessionCount, setSessionCount] = useState(0)
  const [todayCount, setTodayCount] = useState(0)

  useEffect(() => {
    const sessions = loadSessions()
    setSessionCount(sessions.length)
    const today = new Date().toDateString()
    setTodayCount(sessions.filter((s) => new Date(s.date).toDateString() === today).length)
  }, [])

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-gray-900">🎙️ 토스 스피킹 트레이너</h1>
        <p className="text-gray-500 text-sm">
          기출 유형 문제 → 녹음 → AI 문법 교정까지 한 번에
        </p>
        {sessionCount > 0 && (
          <div className="flex justify-center gap-4 text-sm">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              오늘 {todayCount}문제
            </span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              누적 {sessionCount}문제
            </span>
          </div>
        )}
      </div>

      {/* Target Level */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
        <p className="font-semibold text-gray-700 text-sm">목표 레벨</p>
        <div className="grid grid-cols-2 gap-2">
          {TARGET_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setTargetLevel(level)}
              className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                targetLevel === level
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Task Type Selection */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
        <p className="font-semibold text-gray-700 text-sm">연습 유형</p>

        {/* Random */}
        <button
          onClick={() => setSelectedType('random')}
          className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
            selectedType === 'random'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-2xl">🎲</span>
          <div className="text-left">
            <p className="font-semibold text-gray-800">랜덤 출제</p>
            <p className="text-xs text-gray-500">내 기록 기반 약점 유형 우선 출제</p>
          </div>
          {selectedType === 'random' && (
            <span className="ml-auto text-blue-500 text-lg">✓</span>
          )}
        </button>

        {/* Specific types */}
        <div className="grid grid-cols-1 gap-2">
          {ALL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                selectedType === type
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-xl">{TASK_ICONS[type]}</span>
              <div className="text-left">
                <p className="font-medium text-gray-800 text-sm">{TASK_TYPE_LABELS[type]}</p>
                <p className="text-xs text-gray-400">{TASK_TYPE_DESCRIPTIONS[type]}</p>
              </div>
              {selectedType === type && (
                <span className="ml-auto text-blue-500">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <Link
        href={`/practice?type=${selectedType}&level=${encodeURIComponent(targetLevel)}`}
        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-2xl font-bold text-lg transition-colors shadow-lg shadow-blue-200"
      >
        연습 시작하기 →
      </Link>

      {/* Quick links */}
      <div className="flex gap-3">
        <Link
          href="/history"
          className="flex-1 bg-white border border-gray-200 hover:border-gray-300 text-gray-600 text-center py-3 rounded-xl text-sm font-medium transition-colors"
        >
          📊 학습 기록 보기
        </Link>
      </div>
    </div>
  )
}
