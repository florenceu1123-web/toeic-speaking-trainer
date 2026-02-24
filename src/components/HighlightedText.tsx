'use client'

import { useState } from 'react'
import { ErrorSpan } from '@/lib/types'

interface HighlightedTextProps {
  text: string
  errors: ErrorSpan[]
}

const ERROR_COLORS: Record<ErrorSpan['type'], string> = {
  grammar: 'bg-red-200 text-red-900 border-b-2 border-red-500',
  wording: 'bg-yellow-200 text-yellow-900 border-b-2 border-yellow-500',
  coherence: 'bg-purple-200 text-purple-900 border-b-2 border-purple-500',
  pronunciation_guess: 'bg-blue-200 text-blue-900 border-b-2 border-blue-500',
}

const ERROR_LABELS: Record<ErrorSpan['type'], string> = {
  grammar: '문법',
  wording: '표현',
  coherence: '논리',
  pronunciation_guess: 'STT 오류 추정',
}

export default function HighlightedText({ text, errors }: HighlightedTextProps) {
  const [activeError, setActiveError] = useState<ErrorSpan | null>(null)

  if (!text) return null

  // Sort errors by start index
  const sorted = [...errors].sort((a, b) => a.span[0] - b.span[0])

  // Build segments
  const segments: { text: string; error?: ErrorSpan }[] = []
  let cursor = 0

  for (const err of sorted) {
    const [start, end] = err.span
    if (start > cursor) {
      segments.push({ text: text.slice(cursor, start) })
    }
    if (start < end && end <= text.length) {
      segments.push({ text: text.slice(start, end), error: err })
    }
    cursor = Math.max(cursor, end)
  }
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor) })
  }

  return (
    <div className="space-y-3">
      {/* Legend */}
      <div className="flex flex-wrap gap-2 text-xs">
        {Object.entries(ERROR_LABELS).map(([type, label]) => (
          <span key={type} className={`px-2 py-0.5 rounded ${ERROR_COLORS[type as ErrorSpan['type']]}`}>
            {label}
          </span>
        ))}
      </div>

      {/* Highlighted text */}
      <div className="text-base leading-8 bg-white border border-gray-200 rounded-xl p-4">
        {segments.map((seg, i) =>
          seg.error ? (
            <span
              key={i}
              className={`cursor-pointer rounded px-0.5 ${ERROR_COLORS[seg.error.type]}`}
              onClick={() => setActiveError(seg.error === activeError ? null : seg.error!)}
              title={seg.error.message}
            >
              {seg.text}
            </span>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </div>

      {/* Active error detail */}
      {activeError && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm space-y-2">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-xs ${ERROR_COLORS[activeError.type]}`}>
              {ERROR_LABELS[activeError.type]}
            </span>
            <p className="font-medium text-amber-900">{activeError.message}</p>
          </div>
          <div>
            <span className="text-gray-500">수정: </span>
            <span className="font-semibold text-green-700">{activeError.fix}</span>
          </div>
          {activeError.alternatives.length > 0 && (
            <div>
              <span className="text-gray-500">더 자연스러운 표현: </span>
              {activeError.alternatives.map((alt, i) => (
                <span key={i} className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded mr-1">
                  {alt}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Error list */}
      {errors.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-600">오류 목록 ({errors.length}개)</p>
          {sorted.map((err, i) => (
            <div
              key={i}
              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                activeError === err ? 'ring-2 ring-offset-1 ring-blue-400' : 'hover:border-blue-300'
              }`}
              onClick={() => setActiveError(err === activeError ? null : err)}
            >
              <div className="flex items-start gap-2">
                <span className={`shrink-0 px-1.5 py-0.5 rounded text-xs ${ERROR_COLORS[err.type]}`}>
                  {ERROR_LABELS[err.type]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{err.message}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    원문:{' '}
                    <span className="line-through text-red-600">
                      "{text.slice(err.span[0], err.span[1])}"
                    </span>{' '}
                    → <span className="text-green-700 font-medium">"{err.fix}"</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
