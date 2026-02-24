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
    imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80',
    imageDescription: '',
    difficulty: 'easy',
    tags: ['cafe', 'indoor', 'people'],
  },
  {
    id: 'dp_02',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    imageDescription: '',
    difficulty: 'medium',
    tags: ['office', 'work', 'people'],
  },
  {
    id: 'dp_03',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    imageDescription: '',
    difficulty: 'medium',
    tags: ['airport', 'travel', 'people'],
  },
  {
    id: 'dp_04',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
    imageDescription: '',
    difficulty: 'medium',
    tags: ['education', 'students', 'people'],
  },
  {
    id: 'dp_05',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    imageDescription: '',
    difficulty: 'hard',
    tags: ['hospital', 'healthcare', 'people'],
  },
  {
    id: 'dp_06',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    imageDescription: '',
    difficulty: 'medium',
    tags: ['restaurant', 'dining', 'people'],
  },
  {
    id: 'dp_07',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80',
    imageDescription: '',
    difficulty: 'easy',
    tags: ['park', 'outdoor', 'people'],
  },
  {
    id: 'dp_08',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    imageDescription: '',
    difficulty: 'hard',
    tags: ['construction', 'work', 'people'],
  },
  {
    id: 'dp_09',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageUrl: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&w=800&q=80',
    imageDescription: '',
    difficulty: 'easy',
    tags: ['shopping', 'indoor', 'people'],
  },
  {
    id: 'dp_10',
    type: 'describe_picture',
    prepTime: 30,
    answerTime: 45,
    prompt: 'Describe the picture in as much detail as possible.',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    imageDescription: '',
    difficulty: 'medium',
    tags: ['business', 'meeting', 'people'],
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
