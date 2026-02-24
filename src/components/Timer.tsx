'use client'

import { useEffect, useRef, useState } from 'react'

interface TimerProps {
  seconds: number
  onComplete: () => void
  label: string
  colorClass?: string
  autoStart?: boolean
}

export default function Timer({
  seconds,
  onComplete,
  label,
  colorClass = 'text-blue-600',
  autoStart = true,
}: TimerProps) {
  const [remaining, setRemaining] = useState(seconds)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    setRemaining(seconds)
  }, [seconds])

  useEffect(() => {
    if (!autoStart) return
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setTimeout(() => onCompleteRef.current(), 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [autoStart, seconds])

  const pct = remaining / seconds
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const stroke = circumference * (1 - pct)

  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={stroke}
            strokeLinecap="round"
            className={`transition-all duration-1000 ${colorClass}`}
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${colorClass}`}>
          {remaining}
        </span>
      </div>
    </div>
  )
}
