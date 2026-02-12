import dotenv from 'dotenv';
import dbConnect from '../connections/dbConnect.js';
import SqlHelper from '../helper/SqlHelper.js';

dotenv.config();

const TOPICS = {
  wwii: [
    'What event directly triggered the start of World War II in Europe?',
    'Why was the Battle of Stalingrad considered a turning point?',
    'How did radar change air defense strategy during WWII?',
    'What was the significance of the D-Day landings?',
    'Why did Operation Barbarossa fail to achieve quick victory?',
    'How did codebreaking at Bletchley Park influence the war?',
    'What role did aircraft carriers play in the Pacific theater?',
    'Why was Midway such a decisive naval battle?',
    'How did wartime propaganda shape public opinion?',
    'What was the impact of Lend-Lease on Allied success?',
    'Why did logistics matter so much on the Eastern Front?',
    'How did strategic bombing affect Germanys war production?',
    'What were the goals and outcomes of the Yalta Conference?'
  ],
  food: [
    'Why does resting dough improve bread texture?',
    'How do acids affect flavor balance in soups?',
    'What is the best way to build a rich vegetable stock?',
    'Why does searing meat improve taste but not seal juices?',
    'How can I make fluffy rice without it sticking together?',
    'What is the difference between baking powder and baking soda?',
    'How do emulsions work in sauces like mayonnaise?',
    'Why does marinating time matter for different proteins?',
    'How can I reduce bitterness in leafy green dishes?',
    'What are practical ways to layer spice in stews?',
    'How do I keep pasta al dente consistently?',
    'What is the science behind caramelization vs Maillard browning?',
    'How can I meal prep safely for a whole week?'
  ],
  culture: [
    'How do festivals help preserve cultural identity?',
    'Why do languages borrow words from each other?',
    'How has migration influenced modern city culture?',
    'What makes oral storytelling important in traditional societies?',
    'How do clothing styles reflect social values across cultures?',
    'Why are rites of passage common in many communities?',
    'How does music shape shared cultural memory?',
    'What role do proverbs play in transmitting values?',
    'How has digital media changed cultural preservation?',
    'Why is food often central to cultural diplomacy?',
    'How do museums balance preservation and accessibility?',
    'What are respectful ways to engage with cultures not your own?'
  ],
  entertainment: [
    'What makes a movie sequel feel fresh instead of repetitive?',
    'How do streaming platforms change storytelling formats?',
    'Why do some TV pilots fail to represent the full series quality?',
    'What makes a comedy age well over time?',
    'How does game soundtrack design influence player immersion?',
    'Why are cliffhangers effective in episodic content?',
    'How do fan communities affect entertainment franchises?',
    'What separates a cult classic from a mainstream hit?',
    'How has short-form video changed audience attention patterns?',
    'Why are character arcs so important in long-running shows?',
    'How do award shows influence viewing trends?',
    'What are signs that a remake adds value to the original?'
  ]
};

const answerForTopic = {
  wwii: 'A useful way to study WWII is by linking each battle to strategy, logistics, and industrial capacity, not just dates.',
  food: 'Focus on core principles like heat control, seasoning, and timing; once those are right, most recipes become repeatable.',
  culture: 'Culture is best understood through context: history, language, rituals, and daily practices all shape meaning.',
  entertainment: 'Strong entertainment usually combines clear character motivation, pacing, and emotional payoff for the audience.'
};

const buildQuestions = () => [
  ...TOPICS.wwii.map(questionTitle => ({
    questionTitle,
    questionDescription: 'Looking for clear historical context and practical examples to understand this WWII topic better.',
    topic: 'wwii'
  })),
  ...TOPICS.food.map(questionTitle => ({
    questionTitle,
    questionDescription: 'Looking for practical cooking guidance and the underlying food science behind this kitchen question.',
    topic: 'food'
  })),
  ...TOPICS.culture.map(questionTitle => ({
    questionTitle,
    questionDescription: 'Looking for balanced perspectives and real-world examples that explain this cultural question clearly.',
    topic: 'culture'
  })),
  ...TOPICS.entertainment.map(questionTitle => ({
    questionTitle,
    questionDescription: 'Looking for thoughtful analysis and examples from film, TV, games, or digital media.',
    topic: 'entertainment'
  }))
];

const ensureSeedUser = async () => {
  const seedEmail = process.env.SEED_USER_EMAIL || 'seed.bot@stacklite.dev';
  const existing = await dbConnect.query(SqlHelper.checkEmail(seedEmail));
  if (existing.rows.length > 0) {
    return existing.rows[0];
  }

  const created = await dbConnect.query(
    SqlHelper.createUser(
      'Seed',
      'Bot',
      seedEmail,
      process.env.SEED_USER_PASSWORD || 'seed-password',
      'Content Curator',
      'StackOverFlow-Lite',
      'seed-image-url'
    )
  );
  return created.rows[0];
};

const seed = async () => {
  const user = await ensureSeedUser();
  const userId = user.id;
  const questions = buildQuestions();

  if (questions.length !== 50) {
    throw new Error(`Expected 50 questions, got ${questions.length}`);
  }

  for (const question of questions) {
    const createdQuestion = await dbConnect.query(
      SqlHelper.createQuestion(question.questionTitle, question.questionDescription, userId)
    );
    const questionId = createdQuestion.rows[0].id;
    await dbConnect.query(SqlHelper.createAnswer(answerForTopic[question.topic], userId, questionId));
  }

  // eslint-disable-next-line no-console
  console.log(`Seed complete: created ${questions.length} questions with one answer each.`);
};

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error('Seed failed:', error.message);
    process.exit(1);
  });
