'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Question, FeedbackResult, PracticePhase, TaskType } from '@/lib/types'
import { getRandomQuestion, getWeightedQuestion, TASK_TYPE_LABELS } from '@/lib/questions'
import { addSession, getScoreHistory } from '@/lib/storage'
import Timer from '@/components/Timer'
import Recorder from '@/components/Recorder'
import HighlightedText from '@/components/HighlightedText'
import FeedbackPanel from '@/components/FeedbackPanel'

function PracticeContent() {
  const router = useRouter()
  const params = useSearchParams()
  const type = params.get('type') as TaskType | 'random' | null
  const level = params.get('level') || 'IH (Intermediate High)'

  const [question, setQuestion] = useState<Question | null>(null)
  const [phase, setPhase] = useState<PracticePhase>('idle')
  const [transcript, setTranscript] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load question on mount
  useEffect(() => {
    const history = getScoreHistory()
    let q: Question
    if (!type || type === 'random') {
      q = getWeightedQuestion(history)
    } else {
      q = getRandomQuestion(type)
    }
    setQuestion(q)
  }, [type])

  function startPrep() {
    setPhase('prep')
    setTranscript('')
    setFeedback(null)
    setError(null)
  }

  function startRecording() {
    setPhase('recording')
  }

  function stopRecording() {
    setPhase('processing')
    // Small delay to let final STT results settle
    setTimeout(() => {
      if (transcript.trim().length > 0) {
        submitForFeedback(transcript)
      } else {
        setError('음성이 인식되지 않았습니다. 다시 시도하거나 직접 입력해 주세요.')
        setPhase('recording')
      }
    }, 800)
  }

  async function submitForFeedback(text: string) {
    if (!question) return
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, transcript: text, targetLevel: level }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'API 오류')
      }

      const fb = await res.json() as FeedbackResult
      setFeedback(fb)
      setPhase('done')

      // Save session
      addSession({
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        question,
        transcript: text,
        feedback: fb,
      })
    } catch (e) {
      setError((e as Error).message || '피드백 생성 실패. API 키를 확인하세요.')
      setPhase('recording')
    } finally {
      setIsLoading(false)
    }
  }

  function nextQuestion() {
    const history = getScoreHistory()
    let q: Question
    if (!type || type === 'random') {
      q = getWeightedQuestion(history)
    } else {
      q = getRandomQuestion(type)
    }
    setQuestion(q)
    setPhase('idle')
    setTranscript('')
    setFeedback(null)
    setError(null)
    setAudioUrl('')
  }

  if (!question) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Question card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            {TASK_TYPE_LABELS[question.type]}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            question.difficulty === 'easy'
              ? 'bg-green-100 text-green-700'
              : question.difficulty === 'medium'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {question.difficulty === 'easy' ? '쉬움' : question.difficulty === 'medium' ? '중간' : '어려움'}
          </span>
          {question.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <p className="text-gray-700 leading-relaxed font-medium">{question.prompt}</p>

        {/* Read aloud passage */}
        {question.passage && (
          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs text-blue-500 uppercase tracking-wide mb-1">읽을 텍스트</p>
            <p className="text-gray-800 leading-relaxed">{question.passage}</p>
          </div>
        )}

        {/* Picture description */}
        {question.imageDescription && (
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs text-amber-600 uppercase tracking-wide mb-1">사진 장면</p>
            <p className="text-gray-700 leading-relaxed italic">{question.imageDescription}</p>
          </div>
        )}

        <div className="flex gap-4 mt-4 text-xs text-gray-400">
          <span>준비 {question.prepTime}초</span>
          <span>답변 {question.answerTime}초</span>
        </div>
      </div>

      {/* Phase: idle */}
      {phase === 'idle' && (
        <button
          onClick={startPrep}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition-colors"
        >
          준비 시작 →
        </button>
      )}

      {/* Phase: prep */}
      {phase === 'prep' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center space-y-4">
          <p className="text-gray-500 text-sm">준비 시간 동안 답변을 구상하세요</p>
          <Timer
            seconds={question.prepTime}
            onComplete={startRecording}
            label="준비"
            colorClass="text-blue-600"
          />
          <button
            onClick={startRecording}
            className="text-sm text-blue-600 underline"
          >
            바로 녹음 시작
          </button>
        </div>
      )}

      {/* Phase: recording */}
      {phase === 'recording' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <div className="flex justify-center">
            <Timer
              seconds={question.answerTime}
              onComplete={stopRecording}
              label="답변"
              colorClass="text-red-500"
            />
          </div>

          <Recorder
            active={phase === 'recording'}
            onTranscriptChange={setTranscript}
            onAudioReady={setAudioUrl}
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            onClick={stopRecording}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            녹음 완료 / 분석 요청
          </button>

          {/* Manual submit if STT fails */}
          {transcript.length === 0 && (
            <div>
              <p className="text-xs text-gray-400 mb-1">음성 인식이 안 되나요? 직접 입력:</p>
              <textarea
                className="w-full border border-gray-300 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
                placeholder="답변을 입력하세요..."
                onChange={(e) => setTranscript(e.target.value)}
              />
              {transcript.trim() && (
                <button
                  onClick={() => submitForFeedback(transcript)}
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded-xl text-sm font-medium"
                >
                  이 텍스트로 분석
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Phase: processing */}
      {phase === 'processing' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600 font-medium">AI가 답변을 분석하는 중...</p>
          <p className="text-gray-400 text-sm">문법 오류, 표현, 점수를 계산하고 있어요</p>
        </div>
      )}

      {/* Phase: done */}
      {phase === 'done' && feedback && (
        <div className="space-y-6">
          {/* Transcript with highlights */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
            <h2 className="font-bold text-gray-800">내 답변 원문</h2>
            <HighlightedText text={transcript} errors={feedback.errors} />
          </div>

          {/* Feedback panel */}
          <FeedbackPanel feedback={feedback} />

          {/* Audio playback */}
          {audioUrl && (
            <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3">
              <span className="text-sm text-gray-500 shrink-0">내 녹음:</span>
              <audio controls src={audioUrl} className="flex-1 h-8" />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={nextQuestion}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              다음 문제 →
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-xl font-medium transition-colors"
            >
              홈으로
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function PracticePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-40">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PracticeContent />
    </Suspense>
  )
}
