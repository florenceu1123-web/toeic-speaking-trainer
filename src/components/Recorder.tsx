'use client'

import { useEffect, useRef, useState } from 'react'

interface RecorderProps {
  onTranscriptChange: (text: string) => void
  onAudioReady: (url: string) => void
  onAudioBlobReady?: (blob: Blob) => void
  active: boolean
}

export default function Recorder({ onTranscriptChange, onAudioReady, onAudioBlobReady, active }: RecorderProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const finalTranscriptRef = useRef('')
  const streamRef = useRef<MediaStream | null>(null)

  // Start when active prop changes to true
  useEffect(() => {
    if (active) {
      startRecording()
    } else {
      stopRecording()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  function startRecording() {
    setTranscript('')
    setAudioUrl(null)
    setError(null)
    finalTranscriptRef.current = ''

    // 1. Web Speech API for STT
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setError('이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용해 주세요.')
      return
    }

    const recognition = new SR()
    recognition.lang = 'en-US'
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = ''
      let final = finalTranscriptRef.current

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i]
        if (r.isFinal) {
          final += r[0].transcript + ' '
        } else {
          interim += r[0].transcript
        }
      }
      finalTranscriptRef.current = final
      const combined = (final + interim).trim()
      setTranscript(combined)
      onTranscriptChange(combined)
    }

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error !== 'no-speech') {
        setError(`음성 인식 오류: ${e.error}`)
      }
    }

    recognition.start()
    recognitionRef.current = recognition
    setIsListening(true)

    // 2. MediaRecorder for audio playback
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        streamRef.current = stream
        chunksRef.current = []
        const mr = new MediaRecorder(stream)
        mr.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data)
        }
        mr.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
          const url = URL.createObjectURL(blob)
          setAudioUrl(url)
          onAudioReady(url)
          onAudioBlobReady?.(blob)
        }
        mr.start()
        mediaRecorderRef.current = mr
      })
      .catch(() => {
        setError('마이크 접근 권한이 필요합니다.')
      })
  }

  function stopRecording() {
    recognitionRef.current?.stop()
    recognitionRef.current = null

    if (mediaRecorderRef.current?.state !== 'inactive') {
      mediaRecorderRef.current?.stop()
    }
    mediaRecorderRef.current = null

    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null

    setIsListening(false)
  }

  return (
    <div className="space-y-3">
      {/* Recording indicator */}
      <div className="flex items-center gap-2 justify-center">
        {isListening && (
          <>
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm text-red-600 font-medium">녹음 중...</span>
          </>
        )}
        {!isListening && !active && transcript && (
          <span className="text-sm text-green-600 font-medium">녹음 완료</span>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
      )}

      {/* Transcript live preview */}
      {transcript && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-800 leading-relaxed min-h-16">
          {transcript}
        </div>
      )}

      {/* Audio playback */}
      {audioUrl && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">내 녹음 듣기:</span>
          <audio controls src={audioUrl} className="h-8 flex-1" />
        </div>
      )}

      {/* Manual fallback */}
      {error && (
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-1">직접 타이핑으로 입력할 수도 있습니다:</p>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            placeholder="답변을 여기에 입력하세요..."
            onChange={(e) => {
              setTranscript(e.target.value)
              onTranscriptChange(e.target.value)
            }}
          />
        </div>
      )}
    </div>
  )
}
