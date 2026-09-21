const openingLines = {
  Professional: 'A practical perspective worth bringing into the conversation:',
  Educational: 'One lesson I keep returning to is this:',
  'Thought Leadership': 'The shift I believe more teams should pay attention to is this:',
  Conversational: 'Here is something I have been thinking about lately:',
  Inspirational: 'Progress often starts with a small decision to keep going:',
}

const audienceLines = {
  Recruiters: 'For recruiters, this is a useful signal of how I approach learning and delivery.',
  'Hiring Managers': 'For hiring managers, the important part is the way this translates into thoughtful execution.',
  Developers: 'For other developers, the practical takeaway is to keep the feedback loop short and visible.',
  'AI Professionals': 'For AI professionals, the opportunity is to pair technical fluency with clear human judgment.',
  'Technology Leaders': 'For technology leaders, this is a reminder that adoption depends on trust as much as capability.',
  'General LinkedIn Audience': 'For anyone navigating change, the idea is simple enough to put into practice today.',
}

function getKeyPoints(keyPoints) {
  return keyPoints.split('\n').map((point) => point.trim()).filter(Boolean)
}

function generateMockPost({ topic, tone, audience, keyPoints, desiredLength }, profile, generationNumber) {
  const role = profile.role || profile.headline || 'a curious career builder'
  const points = getKeyPoints(keyPoints)
  const pointText = points.length ? points.map((point) => `- ${point}`).join('\n') : '- Start with a clear problem\n- Share what changed your thinking\n- End with one useful next step'
  const lengthNote = desiredLength === 'Short' ? 'Keep the idea focused.' : desiredLength === 'Long' ? 'Give the idea enough room for nuance.' : 'Make the lesson easy to scan and remember.'
  const variation = generationNumber % 2 === 0 ? 'The best work is rarely a single breakthrough. It is a sequence of useful decisions.' : 'The strongest signal is often the learning process behind the result, not just the result itself.'

  return `${topic}\n\n${openingLines[tone]}\n\n${variation}\n\n${pointText}\n\n${audienceLines[audience]} ${lengthNote}\n\nI am exploring this through my work as ${role}, and I would be curious to hear what has worked for you.\n\n#${topic.replace(/[^a-z0-9]/gi, '')} #CareerGrowth #LearningInPublic`
}

export { generateMockPost }