export type SkillCategory =
  | 'Vocabulary'
  | 'Expression'
  | 'Context Understanding'
  | 'Speaker Intention'
  | 'Appropriate Response';

export type CEFRLevel = 'A2' | 'B1' | 'B2';

export interface VocabItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase' | 'idiom';
  meaningTh: string;
  exampleEn: string;
  exampleTh: string;
  category: 'Academic' | 'Daily Life' | 'Business' | 'Travel' | 'Social' | 'Emotions';
  difficulty: CEFRLevel;
  mnemonic?: string;
  source: 'Official TGAT Sample' | 'Practice Bank' | 'My Collection';
  isCustom?: boolean;
  createdAt: string;
}

export type SRSStatus = 'new' | 'learning' | 'mastered';

export interface SRSItem {
  id: string;
  vocabId: string;
  interval: number; // in days
  repetition: number;
  easeFactor: number; // default 2.5
  dueDate: string; // ISO string
  lastReviewed: string; // ISO string
  status: SRSStatus;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  optionExplanations: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  skillCategory: SkillCategory;
}

export interface ConversationItem {
  id: string;
  type: 'short' | 'long';
  title: string;
  situation: string;
  difficulty: CEFRLevel;
  source: 'Official Mock' | 'Practice Bank';
  dialogue: Array<{
    speaker: string;
    text: string;
    translationTh?: string;
  }>;
  questions: ExamQuestion[];
}

export interface StoryChoice {
  id: string;
  textEn: string;
  textTh: string;
  nextNodeId: string | null;
  feedbackTh: string;
  tone: 'Polite & Formal' | 'Casual & Friendly' | 'Too Direct / Blunt' | 'Grammatically Incorrect';
  isOptimal: boolean;
  xpReward: number;
}

export interface StoryNode {
  id: string;
  speaker: string;
  speakerRole: string;
  avatarSeed: string;
  textEn: string;
  textTh?: string;
  contextTh?: string;
  choices: StoryChoice[];
}

export interface StoryScenario {
  id: string;
  title: string;
  category: 'School' | 'Restaurant' | 'Airport' | 'Shopping' | 'Job Interview' | 'Travel';
  descriptionTh: string;
  difficulty: CEFRLevel;
  estimatedMinutes: number;
  initialNodeId: string;
  nodes: Record<string, StoryNode>;
  learningTakeaways: {
    expressions: string[];
    vocabulary: string[];
  };
  badgeReward: string;
}

export interface ExpressionItem {
  id: string;
  expression: string;
  meaningTh: string;
  register: 'Formal' | 'Casual' | 'Polite' | 'Idiom';
  intention: string;
  exampleDialogue: Array<{
    speaker: string;
    text: string;
  }>;
  note?: string;
  source: 'Official Mock' | 'Practice Bank' | 'My Collection';
  isCustom?: boolean;
  isBookmarked?: boolean;
  relatedVocabIds?: string[];
  relatedConversationId?: string;
  createdAt: string;
}

export interface MistakeRecord {
  id: string;
  questionId: string;
  questionText: string;
  contextSnippet: string;
  userAnswer: string;
  correctAnswer: string;
  skillCategory: SkillCategory;
  explanation: string;
  date: string;
  resolved: boolean;
  resolvedAt?: string;
}

export interface PracticeSessionRecord {
  id: string;
  date: string;
  mode: 'exam_short' | 'exam_long' | 'story' | 'flashcard' | 'expression';
  title: string;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  xpEarned: number;
  coinsEarned: number;
  categoryBreakdown: Record<SkillCategory, { correct: number; total: number }>;
}

export interface DailyQuest {
  id: string;
  titleTh: string;
  descriptionTh: string;
  current: number;
  target: number;
  rewardXp: number;
  rewardCoins: number;
  completed: boolean;
  claimed: boolean;
  type: 'vocab_review' | 'conversation_exam' | 'story_complete' | 'mistake_resolve';
}

export interface Achievement {
  id: string;
  titleTh: string;
  descriptionTh: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface UserProfile {
  name: string;
  level: number;
  xp: number;
  coins: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  rankTitle: string;
  claimedQuestsDate: string; // YYYY-MM-DD
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
}

