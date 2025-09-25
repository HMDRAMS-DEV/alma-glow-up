import { QuizQuestion, PersonalityType } from '@/types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'goal',
    question: "What's your primary goal right now?",
    answers: [
      { id: 'build-muscle', text: 'Build muscle', weight: 1 },
      { id: 'lose-fat', text: 'Lose fat', weight: 2 },
      { id: 'improve-energy', text: 'Improve energy & focus', weight: 3 },
      { id: 'have-hyrox-pr', text: 'Have a Hyrox PR', weight: 4 }
    ]
  },
  {
    id: 'activity',
    question: 'How active are you in a typical week?',
    answers: [
      { id: 'very-active', text: 'Very active (5+ workouts)', weight: 1 },
      { id: 'moderately-active', text: 'Moderately active (2–4 workouts)', weight: 3 },
      { id: 'lightly-active', text: 'Lightly active (1–2 workouts)', weight: 4 },
      { id: 'mostly-sedentary', text: 'Mostly sedentary', weight: 2 }
    ]
  },
  {
    id: 'protein',
    question: 'When it comes to protein…',
    answers: [
      { id: 'non-negotiable', text: "It's non-negotiable in every meal", weight: 1 },
      { id: 'try-to-get-some', text: "I try to get some, but don't overthink it", weight: 4 },
      { id: 'rarely-think', text: 'I rarely think about protein', weight: 3 }
    ]
  },
  {
    id: 'eating-style',
    question: 'Which best describes your eating style?',
    answers: [
      { id: 'structured', text: 'Structured (meal prep, consistent)', weight: 1 },
      { id: 'flexible', text: 'Flexible (variety, depends on the day)', weight: 4 },
      { id: 'on-the-go', text: 'On-the-go (snacking, quick meals)', weight: 2 }
    ]
  },
  {
    id: 'food-priority',
    question: 'If you had to choose, what matters most in food?',
    answers: [
      { id: 'performance', text: 'Performance (fueling workouts/recovery)', weight: 1 },
      { id: 'body-composition', text: 'Body composition (weight or fat loss)', weight: 2 },
      { id: 'health-longevity', text: 'Health and longevity', weight: 3 },
      { id: 'enjoyment-balance', text: 'Enjoyment and balance', weight: 4 }
    ]
  }
];

export const personalityTypes: PersonalityType[] = [
  {
    id: 'builder',
    name: 'The Builder',
    title: 'The Builder',
    description: 'Structured, goal-driven, performance-oriented.',
    macroSplit: { protein: 40, carbs: 30, fat: 30 },
    message: 'You need 1.2-1.6g protein per pound of body weight. Your structured approach means you can hit this consistently - most people can\'t. Pre and post-workout nutrition is your secret weapon for maximizing muscle protein synthesis.'
  },
  {
    id: 'lean-seeker',
    name: 'The Lean Seeker',
    title: 'The Lean Seeker',
    description: 'Disciplined, focused on body composition.',
    macroSplit: { protein: 35, carbs: 25, fat: 40 },
    message: 'Higher fat keeps you satisfied longer and prevents the 3pm snack attack that derails most diets. Save carbs for around workouts when your body uses them efficiently. Your disciplined nature can handle daily weight fluctuations most people can\'t.'
  },
  {
    id: 'energizer',
    name: 'The Energizer',
    title: 'The Energizer',
    description: 'Balanced, cares about energy and mental clarity.',
    macroSplit: { protein: 30, carbs: 40, fat: 30 },
    message: 'You actually need those carbs for brain function and energy. Eat carbs with your first meal and around workouts to maintain steady blood sugar and prevent energy crashes. If you\'re hitting protein and feeling energized, you\'re winning.'
  },
  {
    id: 'harmonizer',
    name: 'The Harmonizer',
    title: 'The Harmonizer',
    description: 'Flexible, wellness-oriented, enjoys variety.',
    macroSplit: { protein: 30, carbs: 35, fat: 35 },
    message: 'This balanced split means no food is off-limits. You can have pizza Friday and hit your macros - most rigid dieters can\'t. Use the 80/20 rule: hit your targets 80% of the time and don\'t stress the other 20%. Your balanced approach makes this sustainable long-term.'
  }
];

export function calculatePersonalityType(answers: Record<string, string>): PersonalityType {
  const scores: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };

  Object.entries(answers).forEach(([questionId, answerId]) => {
    const question = quizQuestions.find(q => q.id === questionId);
    const answer = question?.answers.find(a => a.id === answerId);
    if (answer && answer.weight in scores) {
      scores[answer.weight]++;
    }
  });

  // Find the weight with the highest score
  let maxWeight = 1;
  let maxScore = scores[1];

  for (const [weight, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxWeight = parseInt(weight);
    }
  }

  // Map weights to personality types
  const typeMap: Record<number, string> = {
    1: 'builder',
    2: 'lean-seeker',
    3: 'energizer',
    4: 'harmonizer'
  };

  const personalityId = typeMap[maxWeight];
  return personalityTypes.find(type => type.id === personalityId) || personalityTypes[0];
}