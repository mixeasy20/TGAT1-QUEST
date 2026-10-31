import { ExamQuestion, SkillCategory } from '@/types';
import { SEED_CONVERSATIONS } from './seedConversations';
import { SEED_VOCABULARY } from './seedVocab';

export interface MockExamItem {
  id: string;
  questionNumber: number;
  part: 'Part 1: Short Conversations' | 'Part 2: Long Conversations' | 'Part 3: Question-Response & Vocabulary';
  contextSituation?: string;
  dialogueSnippet?: Array<{ speaker: string; text: string }>;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  skillCategory: SkillCategory;
}

export function generateFullMockExam(): MockExamItem[] {
  const examItems: MockExamItem[] = [];
  let qNum = 1;

  // 1. Extract questions from Short Conversations (Approx 20 questions)
  const shortConvs = SEED_CONVERSATIONS.filter((c) => c.type === 'short');
  for (const conv of shortConvs) {
    for (const q of conv.questions) {
      examItems.push({
        id: `mock_${qNum}`,
        questionNumber: qNum,
        part: 'Part 1: Short Conversations',
        contextSituation: conv.situation,
        dialogueSnippet: conv.dialogue,
        questionText: q.question,
        options: q.options,
        correctOption: q.correctOption,
        explanation: q.explanation,
        skillCategory: q.skillCategory,
      });
      qNum++;
      if (qNum > 25) break;
    }
    if (qNum > 25) break;
  }

  // 2. Extract questions from Long Conversations (Approx 20 questions)
  const longConvs = SEED_CONVERSATIONS.filter((c) => c.type === 'long');
  for (const conv of longConvs) {
    for (const q of conv.questions) {
      examItems.push({
        id: `mock_${qNum}`,
        questionNumber: qNum,
        part: 'Part 2: Long Conversations',
        contextSituation: conv.situation,
        dialogueSnippet: conv.dialogue,
        questionText: q.question,
        options: q.options,
        correctOption: q.correctOption,
        explanation: q.explanation,
        skillCategory: q.skillCategory,
      });
      qNum++;
      if (qNum > 45) break;
    }
    if (qNum > 45) break;
  }

  // 3. Question-Response & High-Yield Vocab in Conversation Context (to complete 60 questions)
  const vocabItems = [...SEED_VOCABULARY];
  while (examItems.length < 60 && vocabItems.length > 0) {
    const v = vocabItems.shift();
    if (!v) break;

    examItems.push({
      id: `mock_${qNum}`,
      questionNumber: qNum,
      part: 'Part 3: Question-Response & Vocabulary',
      contextSituation: `Choose the best vocabulary or appropriate response that completes the sentence:`,
      questionText: `Which word best fits the sentence: "${v.exampleEn.replace(new RegExp(v.word, 'gi'), '__________')}"?`,
      options: {
        A: v.word,
        B: 'hesitate',
        C: 'postpone',
        D: 'contradict',
      },
      correctOption: 'A',
      explanation: `คำตอบที่ถูกต้องคือ "${v.word}" ซึ่งมีความหมายว่า "${v.meaningTh}" ตรงตามบริบทประโยคตัวอย่าง`,
      skillCategory: 'Vocabulary',
    });
    qNum++;
  }

  return examItems;
}
