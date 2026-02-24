/**
 * generate-scene-data.mjs
 *
 * 역방향 설계:
 * 1. Unsplash 이미지를 /public/scenes/dp_XX.jpg 로 다운로드
 * 2. Claude Vision으로 실제 이미지 분석 → 구조화된 설명 생성
 * 3. questions.ts 업데이트용 데이터를 콘솔/JSON으로 출력
 *
 * 실행: node scripts/generate-scene-data.mjs
 */

import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import https from 'https'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PUBLIC_SCENES = path.join(ROOT, 'public', 'scenes')

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// 현재 questions.ts에 설정된 Unsplash 사진들
const SCENES = [
  {
    id: 'dp_01',
    unsplashId: '1488459716781-31db52582fe9',
    localPath: '/scenes/dp_01.jpg',
  },
  {
    id: 'dp_02',
    unsplashId: '1497366216548-37526070297c',
    localPath: '/scenes/dp_02.jpg',
  },
  {
    id: 'dp_03',
    unsplashId: '1436491865332-7a61a109cc05',
    localPath: '/scenes/dp_03.jpg',
  },
  {
    id: 'dp_04',
    unsplashId: '1580582932707-520aed937b7b',
    localPath: '/scenes/dp_04.jpg',
  },
  {
    id: 'dp_05',
    unsplashId: '1519494026892-80bbd2d6fd0d',
    localPath: '/scenes/dp_05.jpg',
  },
  {
    id: 'dp_06',
    unsplashId: '1556909114-f6e7ad7d3136',
    localPath: '/scenes/dp_06.jpg',
  },
  {
    id: 'dp_07',
    unsplashId: '1506702315536-dd8b83e2dcf9',
    localPath: '/scenes/dp_07.jpg',
  },
  {
    id: 'dp_08',
    unsplashId: '1504307651254-35680f356dfd',
    localPath: '/scenes/dp_08.jpg',
  },
  {
    id: 'dp_09',
    unsplashId: '1542838132-92c53300491e',
    localPath: '/scenes/dp_09.jpg',
  },
  {
    id: 'dp_10',
    unsplashId: '1573497620053-ea5300f94f21',
    localPath: '/scenes/dp_10.jpg',
  },
]

function buildUnsplashUrl(id) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    function doGet(currentUrl, redirects = 0) {
      if (redirects > 5) return reject(new Error('Too many redirects'))
      const parsed = new URL(currentUrl)
      const lib = parsed.protocol === 'https:' ? https : http
      lib.get(currentUrl, { timeout: 20000 }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return doGet(res.headers.location, redirects + 1)
        }
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`))
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => {
          fs.writeFileSync(destPath, Buffer.concat(chunks))
          resolve()
        })
      }).on('error', reject)
    }
    doGet(url)
  })
}

async function analyzeImageFile(filePath) {
  const data = fs.readFileSync(filePath)
  const base64 = data.toString('base64')

  const res = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 500,
    system: `You are a TOEIC Speaking exam image analyst.
Describe ONLY what is clearly visible in the image.
Do NOT assume, invent, or imagine anything not visible.
Count people carefully — if uncertain, give a range.
Use this EXACT format with no deviation:

1. Number of people: [count or range, e.g. "3" or "8–10"]
2. Main action: [what people are clearly doing, specific verbs]
3. Location: [only if obvious from visual cues, e.g. "indoor office", "outdoor market"]
4. Objects: [comma-separated list of clearly visible key objects]
5. Mood: [2–3 words describing overall atmosphere]`,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: 'image/jpeg', data: base64 },
          },
          { type: 'text', text: 'Describe this image using the exact format.' },
        ],
      },
    ],
  })

  return res.content[0]?.type === 'text' ? res.content[0].text.trim() : ''
}

async function main() {
  // /public/scenes 폴더 생성
  if (!fs.existsSync(PUBLIC_SCENES)) {
    fs.mkdirSync(PUBLIC_SCENES, { recursive: true })
    console.log(`폴더 생성: ${PUBLIC_SCENES}`)
  }

  console.log('=== TOEIC Scene 역방향 설계 ===\n')
  const results = []

  for (const scene of SCENES) {
    console.log(`[${scene.id}] 처리 중...`)
    const imageUrl = buildUnsplashUrl(scene.unsplashId)
    const destPath = path.join(PUBLIC_SCENES, `${scene.id}.jpg`)

    // 1. 이미지 다운로드
    try {
      if (fs.existsSync(destPath)) {
        console.log(`  캐시 사용: ${destPath}`)
      } else {
        console.log(`  다운로드: ${imageUrl}`)
        await downloadImage(imageUrl, destPath)
        console.log(`  저장 완료: ${destPath}`)
      }
    } catch (err) {
      console.error(`  다운로드 실패: ${err.message}`)
      results.push({ id: scene.id, imageUrl: imageUrl, localPath: scene.localPath, description: '(다운로드 실패)' })
      continue
    }

    // 2. Claude Vision 분석
    let description = ''
    try {
      console.log('  Claude Vision 분석 중...')
      description = await analyzeImageFile(destPath)
      console.log('  결과:')
      description.split('\n').forEach(l => console.log('    ' + l))
    } catch (err) {
      console.error(`  분석 실패: ${err.message}`)
      description = '(분석 실패)'
    }

    results.push({
      id: scene.id,
      imageUrl: imageUrl,
      localPath: scene.localPath,
      description,
    })

    console.log()
    await new Promise(r => setTimeout(r, 1000))
  }

  // questions.ts 업데이트용 출력
  console.log('\n\n=== questions.ts 업데이트용 데이터 ===\n')
  for (const r of results) {
    console.log(`// ${r.id}`)
    console.log(`imageUrl: '${r.localPath}',`)
    console.log(`imageDescription: \`${r.description}\`,`)
    console.log()
  }

  // JSON 저장
  const outputPath = path.join(__dirname, 'scene-data-output.json')
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8')
  console.log(`결과 저장: ${outputPath}`)
}

main().catch(console.error)
