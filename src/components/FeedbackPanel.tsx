'use client'

import { FeedbackResult } from '@/lib/types'

interface FeedbackPanelProps {
  feedback: FeedbackResult
}

const SCORE_COLORS = (score: number) => {
  if (score >= 8) return 'text-green-600'
  if (score >= 6) return 'text-yellow-600'
  return 'text-red-500'
}

const SCORE_BG = (score: number) => {
  if (score >= 8) return 'bg-green-500'
  if (score >= 6) return 'bg-yellow-500'
  return 'bg-red-500'
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className={`font-bold ${SCORE_COLORS(score)}`}>{score}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-700 ${SCORE_BG(score)}`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  )
}

export default function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  const { corrected_full, model_answer, scores, tips } = feedback

  const overallLabel =
    scores.overall >= 9
      ? 'Advanced High'
      : scores.overall >= 8
      ? 'Advanced'
      : scores.overall >= 7
      ? 'Intermediate High'
      : scores.overall >= 5
      ? 'Intermediate Mid'
      : 'Intermediate Low'

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">종합 점수</p>
        <p className={`text-6xl font-black ${SCORE_COLORS(scores.overall)}`}>{scores.overall}</p>
        <p className="text-gray-400 text-sm">/10</p>
        <p className="mt-2 text-indigo-700 font-semibold text-lg">{overallLabel}</p>
      </div>

      {/* Score breakdown */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        <p className="font-semibold text-gray-700">세부 점수</p>
        <ScoreBar label="문법 정확성" score={scores.grammar} />
        <ScoreBar label="어휘 다양성" score={scores.vocab} />
        <ScoreBar label="논리 구조" score={scores.coherence} />
      </div>

      {/* Corrected answer */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
        <p className="font-semibold text-green-800 mb-2">교정된 답변</p>
        <p className="text-gray-800 leading-relaxed text-sm">{corrected_full}</p>
      </div>

      {/* Model answer */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5">
        <p className="font-semibold text-indigo-800 mb-2">모범 답안</p>
        <p className="text-gray-800 leading-relaxed text-sm">{model_answer}</p>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <p className="font-semibold text-amber-800 mb-3">개선 포인트</p>
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-700">
              <span className="shrink-0 w-5 h-5 rounded-full bg-amber-400 text-white text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
