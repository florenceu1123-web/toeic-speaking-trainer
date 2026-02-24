import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json()
    if (!imageUrl) {
      return NextResponse.json({ error: 'imageUrl required' }, { status: 400 })
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'url', url: imageUrl },
            },
            {
              type: 'text',
              text: `이 사진에 실제로 보이는 것을 한국어로 간결하게 묘사해 주세요.
형식: [장소: ...] 로 시작하고, 인물·사물·행동·분위기를 2~3문장으로 설명하세요.
예시: [장소: 실내 사무실] 여러 명의 직원이 책상에 앉아 컴퓨터로 작업 중입니다. 한쪽 벽에는 화이트보드가 있으며, 창문으로 햇빛이 들어오고 있습니다.
사진에 없는 내용은 절대 추가하지 마세요.`,
            },
          ],
        },
      ],
    })

    const description = response.content[0].type === 'text' ? response.content[0].text.trim() : ''
    return NextResponse.json({ description })
  } catch (err) {
    console.error('describe-image error:', err)
    return NextResponse.json({ error: 'Failed to describe image' }, { status: 500 })
  }
}
