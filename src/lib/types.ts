export type TaskType =
  | 'read_aloud'
  | 'describe_picture'
  | 'respond_questions'
  | 'propose_solution'
  | 'express_opinion'

export interface Question {
  id: string
  type: TaskType
  prepTime: number   // seconds
  answerTime: number // seconds
  prompt: string
  passage?: string          // read_aloud: text to read
  imageDescription?: string // describe_picture: scene description
  imageUrl?: string         // describe_picture: actual photo URL
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
}

export interface ErrorSpan {
  span: [number, number]
  type: 'grammar' | 'wording' | 'coherence' | 'pronunciation_guess'
  message: string
  fix: string
  alternatives: string[]
}

export interface FeedbackResult {
  errors: ErrorSpan[]
  corrected_full: string
  model_answer: string
  scores: {
    grammar: number
    vocab: number
    coherence: number
    overall: number
  }
  tips: string[]
}

export interface Session {
  id: string
  date: string
  question: Question
  transcript: string
  feedback: FeedbackResult
}

export type PracticePhase =
  | 'idle'
  | 'prep'
  | 'recording'
  | 'processing'
  | 'done'
