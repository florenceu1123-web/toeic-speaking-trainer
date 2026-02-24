import { Session } from './types'

const STORAGE_KEY = 'toeic_sessions'
const MAX_SESSIONS = 50

export function saveSessions(sessions: Session[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions.slice(-MAX_SESSIONS)))
  } catch {
    console.warn('Failed to save sessions to localStorage')
  }
}

export function loadSessions(): Session[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Session[]
  } catch {
    return []
  }
}

export function addSession(session: Session): void {
  const sessions = loadSessions()
  sessions.push(session)
  saveSessions(sessions)
}

export function clearSessions(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export function getScoreHistory(): { questionId: string; score: number }[] {
  return loadSessions().map((s) => ({
    questionId: s.question.id,
    score: s.feedback.scores.overall,
  }))
}
