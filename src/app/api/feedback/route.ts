import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Question } from '@/lib/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `역할: 너는 TOEIC Speaking 채점관 + 영어 교정 전문가다.
입력으로 (question, transcript, target_level)을 받는다.
반드시 아래 JSON 스키마만 출력하라. 설명 문장 금지.

규칙:
- transcript의 오류 구간을 찾아 span=[start,end] (문자 인덱스)로 표시한다.
- span의 start/end는 transcript 원문의 정확한 문자 인덱스여야 한다 (0-based, end는 exclusive).
- 오류가 애매하면 type을 "wording" 또는 "coherence"로 두고 과한 단정 금지.
- type 분류:
  - "grammar": 문법 오류 (시제, 수일치, 관사, 전치사 등)
  - "wording": 어색하거나 부자연스러운 표현
  - "coherence": 논리 흐름 또는 구조 문제
  - "pronunciation_guess": STT가 잘못 인식했을 가능성이 있는 구간
- corrected_full에는 자연스러운 교정본(원문 의미 유지)을 제공한다.
- model_answer는 target_level에 맞는 모범답안 1개를 제공한다 (영어만).
- message와 tips는 한국어로 작성한다.
- tips는 3개, 짧고 실행 가능한 조언으로 작성한다.

출력 JSON:
{
  "errors":[
    {"span":[0,0],"type":"grammar","message":"","fix":"","alternatives":["",""]}
  ],
  "corrected_full":"",
  "model_answer":"",
  "scores":{"grammar":0,"vocab":0,"coherence":0,"overall":0},
  "tips":["","",""]
}

출력은 반드시 위 JSON만. 마크다운 코드펜스(\`\`\`) 금지. 다른 텍스트 금지.`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { question, transcript, targetLevel } = body as {
      question: Question
      transcript: string
      targetLevel: string
    }

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json({ error: 'Empty transcript' }, { status: 400 })
    }

    const userMessage = `question: "${question.prompt}"${question.passage ? `\npassage: "${question.passage}"` : ''}${question.imageDescription ? `\nimage: ${question.imageDescription}` : ''}
transcript: "${transcript}"
target_level: "${targetLevel || 'IH (Intermediate High)'}"

위 입력을 바탕으로 JSON을 출력하라.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const raw = response.content[0].type === 'text' ? response.content[0].text : ''

    // Strip markdown code fences if present
    const jsonStr = raw.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim()
    const feedback = JSON.parse(jsonStr)

    return NextResponse.json(feedback)
  } catch (err) {
    console.error('Feedback API error:', err)
    return NextResponse.json(
      { error: 'Failed to generate feedback. Check your API key or try again.' },
      { status: 500 }
    )
  }
}
