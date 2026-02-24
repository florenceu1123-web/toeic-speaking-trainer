import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY not set' }, { status: 503 })
    }

    const formData = await req.formData()
    const audio = formData.get('audio') as File | null
    if (!audio) {
      return NextResponse.json({ error: 'No audio file' }, { status: 400 })
    }

    const transcription = await openai.audio.transcriptions.create({
      file: audio,
      model: 'whisper-1',
      language: 'en',
      prompt: 'This is an English spoken response for a TOEIC Speaking test.',
    })

    return NextResponse.json({ transcript: transcription.text })
  } catch (err) {
    console.error('Whisper API error:', err)
    return NextResponse.json({ error: 'Transcription failed' }, { status: 500 })
  }
}
