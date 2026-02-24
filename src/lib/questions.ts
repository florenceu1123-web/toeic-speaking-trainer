import { Question, TaskType } from './types'

const ALL_QUESTIONS: Question[] = [
  // ── Task 1-2: Read Aloud ─────────────────────────────────────────
  {
    id: 'ra_01',
    type: 'read_aloud',
    prepTime: 45,
    answerTime: 45,
    prompt: 'Please read the following announcement aloud.',
    passage:
      'Attention all passengers. The 3:45 express train to Chicago will be departing from Platform 7 in approximately fifteen minutes. Please ensure you have your ticket ready for inspection and make your way to the platform now. We apologize for any inconvenience caused by the slight delay.',
    difficulty: 'easy',
    tags: ['announcement', 'transportation'],
  },
  {
    id: 'ra_02',
    type: 'read_aloud',
    prepTime: 45,
    answerTime: 45,
    prompt: 'Please read the following passage aloud.',
    passage:
      'Our company has recently launched a new employee wellness program designed to promote physical and mental health in the workplace. Starting next month, all staff members will have access to on-site fitness facilities, weekly yoga sessions, and confidential counseling services. We encourage everyone to take full advantage of these benefits.',
    difficulty: 'medium',
    tags: ['workplace', 'wellness'],
  },
  {
    id: 'ra_03',
    type: 'read_aloud',
    prepTime: 45,
    answerTime: 45,
    prompt: 'Please read the following advertisement aloud.',
    passage:
      'Introducing the all-new Lumina Pro smartphone — engineered for those who demand excellence. With its revolutionary triple-lens camera system, all-day battery life, and industry-leading security features, the Lumina Pro redefines what a smartphone can do. Available in five stunning colors. Pre-order yours today at all participating retailers.',
    difficulty: 'medium',
    tags: ['advertisement', 'technology'],
  },
  {
    id: 'ra_04',
    type: 'read_aloud',
    prepTime: 45,
    answerTime: 45,
    prompt: 'Please read the following notice aloud.',
    passage:
      'The city library will be undergoing scheduled maintenance from Monday through Wednesday of next week. During this period, book returns can be made using the external drop box located near the main entrance. Digital library services, including e-books and audiobooks, will remain fully accessible through our website and mobile application.',
    difficulty: 'easy',
    tags: ['notice', 'community'],
  },
  {
    id: 'ra_05',
    type: 'read_aloud',
    prepTime: 45,
    answerTime: 45,
    prompt: 'Please read the following business memo aloud.',
    passage:
      'To all department heads: As we approach the end of the fiscal year, please ensure that all budget reports and expenditure summaries are submitted to the finance department no later than December 15th. Incomplete submissions will delay the annual audit process and may affect the approval of next year\'s budget allocations. Your cooperation is greatly appreciated.',
    difficulty: 'hard',
    tags: ['business', 'memo'],
  },

  // ── Task 3: Describe a Picture ────────────────────────────────────
  {
    id: 'dp_01',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageDescription:
      '[Scene: A busy outdoor farmer\'s market. Colorful fruit and vegetable stalls line both sides. A vendor in an apron is handing a paper bag to a smiling customer. People of various ages browse the stalls. String lights hang overhead. A wooden sign reads "Fresh from the Farm."]',
    difficulty: 'easy',
    tags: ['market', 'outdoor', 'people'],
  },
  {
    id: 'dp_02',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageDescription:
      '[Scene: A modern open-plan office. Several employees sit at standing desks with large monitors. Two colleagues are collaborating at a whiteboard covered with diagrams. Large windows show a city skyline. A coffee station is visible in the corner. Plants are placed around the room.]',
    difficulty: 'medium',
    tags: ['office', 'work', 'indoor'],
  },
  {
    id: 'dp_03',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageDescription:
      '[Scene: A crowded airport departure hall. Travelers with suitcases wait in check-in queues. Departure boards display flight information. A family takes a selfie near the entrance. Security personnel stand at checkpoints. Large digital advertisements line the walls.]',
    difficulty: 'medium',
    tags: ['airport', 'travel', 'crowd'],
  },
  {
    id: 'dp_04',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageDescription:
      '[Scene: A university lecture hall. A professor stands at the front pointing to a projected slide showing a bar graph. About 30 students sit in tiered rows, some taking notes, others using laptops. A clock on the wall shows 10:15. Natural light streams through side windows.]',
    difficulty: 'medium',
    tags: ['education', 'university', 'indoor'],
  },
  {
    id: 'dp_05',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageDescription:
      '[Scene: A hospital corridor. A doctor in a white coat walks alongside a patient in a wheelchair. A nurse at the reception desk speaks on the phone. Medical equipment is stored along one wall. Signs point to various departments. The floor is shiny and well-lit.]',
    difficulty: 'hard',
    tags: ['hospital', 'healthcare', 'indoor'],
  },
  {
    id: 'dp_06',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageDescription:
      '[Scene: A busy restaurant kitchen. Two chefs in white uniforms are plating dishes. Steam rises from pots on a large stove. A sous chef chops vegetables at a prep station. Pots and pans hang from ceiling racks. A timer beeps in the background.]',
    difficulty: 'medium',
    tags: ['restaurant', 'kitchen', 'food'],
  },
  {
    id: 'dp_07',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageDescription:
      '[Scene: A public park on a sunny afternoon. Joggers run along a paved path. Families picnic on the grass. Children play on a colorful playground. A dog chases a frisbee. Trees provide shade. A fountain is visible in the background. People sit on benches reading.]',
    difficulty: 'easy',
    tags: ['park', 'outdoor', 'leisure'],
  },
  {
    id: 'dp_08',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageDescription:
      '[Scene: A construction site. Workers wearing hard hats and safety vests operate machinery. A crane lifts steel beams. Blueprints are spread on a table where two engineers consult them. Scaffolding covers the side of a partially built high-rise. Trucks deliver materials.]',
    difficulty: 'hard',
    tags: ['construction', 'work', 'outdoor'],
  },
  {
    id: 'dp_09',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageDescription:
      '[Scene: A supermarket checkout area. A cashier scans items for a customer. A conveyor belt holds groceries including fresh produce, bread, and beverages. A child helps place items on the belt. Other shoppers wait in adjacent lines. Promotional signs hang above the lanes.]',
    difficulty: 'easy',
    tags: ['shopping', 'indoor', 'daily life'],
  },
  {
    id: 'dp_10',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageDescription:
      '[Scene: A conference room during a business meeting. Six professionals sit around an oval table with laptops and documents. A presenter stands at the head of the table, gesturing toward a projected chart. Coffee cups and water glasses are on the table. The atmosphere appears serious and focused.]',
    difficulty: 'medium',
    tags: ['business', 'meeting', 'indoor'],
  },

  // ── Task 4-6: Respond to Questions ───────────────────────────────
  {
    id: 'rq_01',
    type: 'respond_questions',
    prepTime: 3,
    answerTime: 15,
    prompt:
      'What type of music do you usually listen to, and why?',
    difficulty: 'easy',
    tags: ['personal', 'lifestyle', 'music'],
  },
  {
    id: 'rq_02',
    type: 'respond_questions',
    prepTime: 3,
    answerTime: 15,
    prompt:
      'How often do you exercise, and what activities do you enjoy?',
    difficulty: 'easy',
    tags: ['personal', 'health', 'lifestyle'],
  },
  {
    id: 'rq_03',
    type: 'respond_questions',
    prepTime: 3,
    answerTime: 30,
    prompt:
      'Describe your ideal vacation. Where would you go and what would you do?',
    difficulty: 'medium',
    tags: ['travel', 'personal', 'opinion'],
  },
  {
    id: 'rq_04',
    type: 'respond_questions',
    prepTime: 3,
    answerTime: 15,
    prompt:
      'What is your preferred method of transportation to work or school?',
    difficulty: 'easy',
    tags: ['daily life', 'transportation'],
  },
  {
    id: 'rq_05',
    type: 'respond_questions',
    prepTime: 3,
    answerTime: 30,
    prompt:
      'What qualities do you look for in a good manager or leader?',
    difficulty: 'medium',
    tags: ['business', 'leadership', 'opinion'],
  },
  {
    id: 'rq_06',
    type: 'respond_questions',
    prepTime: 3,
    answerTime: 15,
    prompt:
      'How do you usually spend your weekends?',
    difficulty: 'easy',
    tags: ['personal', 'lifestyle'],
  },
  {
    id: 'rq_07',
    type: 'respond_questions',
    prepTime: 3,
    answerTime: 30,
    prompt:
      'What is the most important skill for succeeding in today\'s job market, and why?',
    difficulty: 'hard',
    tags: ['business', 'career', 'opinion'],
  },
  {
    id: 'rq_08',
    type: 'respond_questions',
    prepTime: 3,
    answerTime: 15,
    prompt:
      'What kind of food do you eat most often during the week?',
    difficulty: 'easy',
    tags: ['daily life', 'food'],
  },
  {
    id: 'rq_09',
    type: 'respond_questions',
    prepTime: 3,
    answerTime: 30,
    prompt:
      'How has technology changed the way you communicate with others over the past ten years?',
    difficulty: 'hard',
    tags: ['technology', 'society', 'opinion'],
  },
  {
    id: 'rq_10',
    type: 'respond_questions',
    prepTime: 3,
    answerTime: 15,
    prompt:
      'Do you prefer shopping online or in a physical store? Why?',
    difficulty: 'medium',
    tags: ['shopping', 'opinion', 'lifestyle'],
  },

  // ── Task 10: Propose a Solution ──────────────────────────────────
  {
    id: 'ps_01',
    type: 'propose_solution',
    prepTime: 30,
    answerTime: 60,
    prompt:
      'Hi, this is Sarah from the events team. We have a serious problem — our keynote speaker for tomorrow\'s annual conference just cancelled due to a family emergency. We need someone to fill the 45-minute slot, but all our backup options have also declined. The audience of 200 industry professionals is expecting a high-quality presentation. What should we do?',
    difficulty: 'medium',
    tags: ['event', 'problem-solving', 'business'],
  },
  {
    id: 'ps_02',
    type: 'propose_solution',
    prepTime: 30,
    answerTime: 60,
    prompt:
      'Hi, this is Mike from IT. We\'ve discovered that the main server went down thirty minutes ago and is affecting all customer-facing services including our website and payment system. The tech team is working on it but estimates it will take at least three hours. We have hundreds of customers trying to place orders right now. What do you suggest?',
    difficulty: 'hard',
    tags: ['IT', 'crisis', 'business'],
  },
  {
    id: 'ps_03',
    type: 'propose_solution',
    prepTime: 30,
    answerTime: 60,
    prompt:
      'Hello, this is Lisa, the store manager at the downtown branch. A customer is extremely upset because they received a damaged product and the return policy technically expired yesterday. They are threatening to post a negative review online. I want to keep this customer happy but I also need to follow company policy. What should I do?',
    difficulty: 'medium',
    tags: ['customer service', 'problem-solving', 'retail'],
  },
  {
    id: 'ps_04',
    type: 'propose_solution',
    prepTime: 30,
    answerTime: 60,
    prompt:
      'Hi, I\'m Tom, the project manager. Our team has been working on a client deliverable for three months, but two key developers just resigned this week. The deadline is in four weeks and we\'re about 60% complete. The client is already anxious about delays. How do we handle this situation?',
    difficulty: 'hard',
    tags: ['project management', 'HR', 'business'],
  },
  {
    id: 'ps_05',
    type: 'propose_solution',
    prepTime: 30,
    answerTime: 60,
    prompt:
      'Hello, this is Jenny from marketing. We just learned that our main competitor is launching a nearly identical product next week — three weeks before our planned launch date. We\'ve invested heavily in our campaign and repositioning now would be expensive. What would you recommend?',
    difficulty: 'hard',
    tags: ['marketing', 'competition', 'business'],
  },
  {
    id: 'ps_06',
    type: 'propose_solution',
    prepTime: 30,
    answerTime: 60,
    prompt:
      'Hi, I\'m the office manager. Several employees have complained that the open-plan office is too noisy and is affecting their concentration and productivity. However, installing private offices is too expensive. What can we do to address this issue within our current budget?',
    difficulty: 'medium',
    tags: ['workplace', 'management', 'problem-solving'],
  },
  {
    id: 'ps_07',
    type: 'propose_solution',
    prepTime: 30,
    answerTime: 60,
    prompt:
      'Hello, this is Rachel from HR. Our company survey revealed that employee satisfaction has dropped significantly over the past year, and turnover is at an all-time high. However, giving salary increases is not possible right now due to budget constraints. What steps can we take to improve morale and retention?',
    difficulty: 'medium',
    tags: ['HR', 'employee relations', 'management'],
  },
  {
    id: 'ps_08',
    type: 'propose_solution',
    prepTime: 30,
    answerTime: 60,
    prompt:
      'Hi, I\'m the restaurant owner. Our head chef just left abruptly, and we have a fully booked weekend ahead, including two large private parties. The remaining kitchen staff can handle basic dishes, but not our signature menu. What should I tell the customers and how should I manage the weekend?',
    difficulty: 'medium',
    tags: ['restaurant', 'crisis', 'customer service'],
  },
  {
    id: 'ps_09',
    type: 'propose_solution',
    prepTime: 30,
    answerTime: 60,
    prompt:
      'Hello, this is David, the school principal. Several parents have raised concerns that students are spending too much time on their phones during class, which is negatively affecting learning. However, outright banning phones has received pushback from students and some parents who argue phones are necessary for emergencies. What policy would you recommend?',
    difficulty: 'hard',
    tags: ['education', 'policy', 'problem-solving'],
  },
  {
    id: 'ps_10',
    type: 'propose_solution',
    prepTime: 30,
    answerTime: 60,
    prompt:
      'Hi, I\'m the logistics coordinator. Due to an unexpected port strike, our inventory shipment — which contains products needed for our biggest seasonal sale — is stuck and won\'t arrive for at least two weeks after the sale starts. We don\'t want to disappoint customers or lose revenue. What options do we have?',
    difficulty: 'hard',
    tags: ['logistics', 'supply chain', 'crisis'],
  },

  // ── Task 11: Express an Opinion ──────────────────────────────────
  {
    id: 'eo_01',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Some people believe that working from home is more productive than working in an office. Do you agree or disagree? Use specific reasons and examples to support your answer.',
    difficulty: 'easy',
    tags: ['work', 'lifestyle', 'opinion'],
  },
  {
    id: 'eo_02',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Some companies require employees to wear uniforms. Do you think workplace uniforms are a good idea? Why or why not?',
    difficulty: 'easy',
    tags: ['workplace', 'policy', 'opinion'],
  },
  {
    id: 'eo_03',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Do you think it is better to have a few close friends or many acquaintances? Explain your view with reasons and examples.',
    difficulty: 'easy',
    tags: ['personal', 'social', 'opinion'],
  },
  {
    id: 'eo_04',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Some people say that experience is more valuable than education when it comes to career success. Do you agree? Why or why not?',
    difficulty: 'medium',
    tags: ['career', 'education', 'opinion'],
  },
  {
    id: 'eo_05',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Is it better to live in a big city or a small town? Give specific reasons and examples to support your choice.',
    difficulty: 'easy',
    tags: ['lifestyle', 'society', 'opinion'],
  },
  {
    id: 'eo_06',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Some believe that social media has done more harm than good to society. Do you agree or disagree? Explain with reasons and examples.',
    difficulty: 'medium',
    tags: ['technology', 'society', 'opinion'],
  },
  {
    id: 'eo_07',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Do you think governments should invest more in public transportation or in road infrastructure? Give reasons for your position.',
    difficulty: 'medium',
    tags: ['government', 'transportation', 'opinion'],
  },
  {
    id: 'eo_08',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Some companies offer unlimited vacation time to employees. Do you think this is a good or bad policy? Support your view with reasons.',
    difficulty: 'medium',
    tags: ['workplace', 'policy', 'opinion'],
  },
  {
    id: 'eo_09',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Do you think it is more important for children to study STEM subjects or arts and humanities? Why?',
    difficulty: 'medium',
    tags: ['education', 'children', 'opinion'],
  },
  {
    id: 'eo_10',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Some people argue that artificial intelligence will eliminate more jobs than it creates. Do you agree? Use specific reasons to support your answer.',
    difficulty: 'hard',
    tags: ['technology', 'economy', 'AI', 'opinion'],
  },
  {
    id: 'eo_11',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Should companies prioritize profitability over environmental sustainability? Explain your view.',
    difficulty: 'hard',
    tags: ['business', 'environment', 'opinion'],
  },
  {
    id: 'eo_12',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Do you think a four-day work week should become the standard? Give specific reasons and examples to support your position.',
    difficulty: 'medium',
    tags: ['workplace', 'policy', 'opinion'],
  },
  {
    id: 'eo_13',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Some people believe that online education will eventually replace traditional classroom learning. Do you agree or disagree?',
    difficulty: 'medium',
    tags: ['education', 'technology', 'opinion'],
  },
  {
    id: 'eo_14',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Is it better to specialize deeply in one skill or to develop a broad range of skills? Why?',
    difficulty: 'medium',
    tags: ['career', 'personal development', 'opinion'],
  },
  {
    id: 'eo_15',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Do you think mandatory community service should be required for high school graduation? Explain your position.',
    difficulty: 'hard',
    tags: ['education', 'society', 'opinion'],
  },
  {
    id: 'eo_16',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Some believe that older employees are more valuable to a company than younger ones. Do you agree? Why or why not?',
    difficulty: 'medium',
    tags: ['workplace', 'generational', 'opinion'],
  },
  {
    id: 'eo_17',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Do you think it is better to rent or to own a home? Support your answer with specific reasons.',
    difficulty: 'medium',
    tags: ['lifestyle', 'finance', 'opinion'],
  },
  {
    id: 'eo_18',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Some argue that celebrities and athletes are paid too much compared to teachers and healthcare workers. Do you agree?',
    difficulty: 'medium',
    tags: ['society', 'economy', 'opinion'],
  },
  {
    id: 'eo_19',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Should companies be allowed to use customer data to personalize advertisements? Explain your view.',
    difficulty: 'hard',
    tags: ['technology', 'privacy', 'business', 'opinion'],
  },
  {
    id: 'eo_20',
    type: 'express_opinion',
    prepTime: 15,
    answerTime: 60,
    prompt:
      'Do you think international travel makes people more open-minded? Use specific examples to support your answer.',
    difficulty: 'easy',
    tags: ['travel', 'culture', 'opinion'],
  },
]

export function getRandomQuestion(type?: TaskType): Question {
  const pool = type ? ALL_QUESTIONS.filter((q) => q.type === type) : ALL_QUESTIONS
  return pool[Math.floor(Math.random() * pool.length)]
}

export function getWeightedQuestion(history: { questionId: string; score: number }[]): Question {
  // Prioritize question types where the user has lower scores
  const scoreByType: Record<string, number[]> = {}
  history.forEach(({ questionId, score }) => {
    const q = ALL_QUESTIONS.find((q) => q.id === questionId)
    if (q) {
      if (!scoreByType[q.type]) scoreByType[q.type] = []
      scoreByType[q.type].push(score)
    }
  })

  // Average score per type
  const avgByType: Record<string, number> = {}
  Object.entries(scoreByType).forEach(([type, scores]) => {
    avgByType[type] = scores.reduce((a, b) => a + b, 0) / scores.length
  })

  // Weight: lower score → higher probability
  const weights = ALL_QUESTIONS.map((q) => {
    const avg = avgByType[q.type]
    if (avg === undefined) return 2 // Not practiced yet → higher weight
    return Math.max(0.5, 10 - avg) // Lower score → higher weight
  })

  const total = weights.reduce((a, b) => a + b, 0)
  let rand = Math.random() * total
  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    rand -= weights[i]
    if (rand <= 0) return ALL_QUESTIONS[i]
  }
  return ALL_QUESTIONS[ALL_QUESTIONS.length - 1]
}

export function getAllQuestions(): Question[] {
  return ALL_QUESTIONS
}

export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  read_aloud: 'Read Aloud',
  describe_picture: 'Describe a Picture',
  respond_questions: 'Respond to Questions',
  propose_solution: 'Propose a Solution',
  express_opinion: 'Express an Opinion',
}

export const TASK_TYPE_DESCRIPTIONS: Record<TaskType, string> = {
  read_aloud: '주어진 텍스트를 자연스럽게 읽으세요.',
  describe_picture: '사진 속 상황을 영어로 자세히 묘사하세요.',
  respond_questions: '질문에 영어로 간결하게 답하세요.',
  propose_solution: '문제 상황을 듣고 해결책을 제시하세요.',
  express_opinion: '주제에 대한 의견을 이유와 함께 말하세요.',
}
