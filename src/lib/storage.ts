import {
  UserProfile,
  VocabItem,
  SRSItem,
  ConversationItem,
  StoryScenario,
  ExpressionItem,
  MistakeRecord,
  PracticeSessionRecord,
  SkillCategory,
  DailyQuest,
} from '@/types';
import { SEED_VOCABULARY } from '@/data/seedVocab';
import { SEED_CONVERSATIONS } from '@/data/seedConversations';
import { SEED_STORIES } from '@/data/seedStories';
import { SEED_EXPRESSIONS } from '@/data/seedExpressions';
import {
  createInitialSRSItem,
  calculateSRS,
  isItemDue,
} from '@/lib/srs';
import {
  INITIAL_DAILY_QUESTS,
  INITIAL_ACHIEVEMENTS,
  computeLevelProgress,
  getRankTitle,
  refreshDailyQuestsIfNeeded,
  getTodayDateString,
} from '@/lib/gamification';

const STORAGE_KEYS = {
  USER_PROFILE: 'tgat1_user_profile_v1',
  VOCAB_LIST: 'tgat1_vocab_list_v1',
  SRS_ITEMS: 'tgat1_srs_items_v1',
  EXPRESSIONS: 'tgat1_expressions_v1',
  MISTAKES: 'tgat1_mistakes_v1',
  PRACTICE_SESSIONS: 'tgat1_practice_sessions_v1',
  COMPLETED_STORIES: 'tgat1_completed_stories_v1',
};

function isClient(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function getItem<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
}

// ----------------- USER PROFILE -----------------

export function getUserProfile(): UserProfile {
  const initialProfile: UserProfile = {
    name: 'TGAT Hero',
    level: 1,
    xp: 0,
    coins: 50,
    streak: 1,
    lastActiveDate: getTodayDateString(),
    rankTitle: getRankTitle(1),
    claimedQuestsDate: getTodayDateString(),
    achievements: INITIAL_ACHIEVEMENTS,
    dailyQuests: INITIAL_DAILY_QUESTS,
  };

  const stored = getItem<UserProfile>(STORAGE_KEYS.USER_PROFILE, initialProfile);
  const refreshed = refreshDailyQuestsIfNeeded(stored);
  if (refreshed !== stored) {
    saveUserProfile(refreshed);
  }
  return refreshed;
}

export function saveUserProfile(profile: UserProfile): void {
  setItem(STORAGE_KEYS.USER_PROFILE, profile);
}

export function awardReward(
  xpGained: number,
  coinsGained: number
): { profile: UserProfile; leveledUp: boolean; newLevel: number } {
  const current = getUserProfile();
  const oldLevel = current.level;
  const newXp = current.xp + xpGained;
  const newCoins = current.coins + coinsGained;

  const levelInfo = computeLevelProgress(newXp);
  const leveledUp = levelInfo.currentLevel > oldLevel;

  const updated: UserProfile = {
    ...current,
    xp: newXp,
    coins: newCoins,
    level: levelInfo.currentLevel,
    rankTitle: getRankTitle(levelInfo.currentLevel),
    lastActiveDate: getTodayDateString(),
  };

  saveUserProfile(updated);
  return {
    profile: updated,
    leveledUp,
    newLevel: levelInfo.currentLevel,
  };
}

// ----------------- VOCABULARY & SRS -----------------

export function getVocabList(): VocabItem[] {
  const stored = getItem<VocabItem[] | null>(STORAGE_KEYS.VOCAB_LIST, null);
  if (!stored || stored.length === 0) {
    setItem(STORAGE_KEYS.VOCAB_LIST, SEED_VOCABULARY);
    initializeSRSForVocab(SEED_VOCABULARY);
    return SEED_VOCABULARY;
  }
  return stored;
}

export function saveVocabList(list: VocabItem[]): void {
  setItem(STORAGE_KEYS.VOCAB_LIST, list);
}

export function addCustomVocab(item: Omit<VocabItem, 'id' | 'createdAt' | 'source' | 'isCustom'>): VocabItem {
  const list = getVocabList();
  const newItem: VocabItem = {
    ...item,
    id: `custom_vocab_${Date.now()}`,
    source: 'My Collection',
    isCustom: true,
    createdAt: new Date().toISOString(),
  };

  const updatedList = [newItem, ...list];
  saveVocabList(updatedList);

  // Initialize SRS item for this word
  const srsItems = getSRSList();
  const newSrs = createInitialSRSItem(newItem.id);
  saveSRSList([newSrs, ...srsItems]);

  return newItem;
}

export function updateCustomVocab(id: string, updates: Partial<VocabItem>): VocabItem | null {
  const list = getVocabList();
  const index = list.findIndex((v) => v.id === id);
  if (index === -1) return null;

  list[index] = { ...list[index], ...updates };
  saveVocabList(list);
  return list[index];
}

export function deleteVocab(id: string): boolean {
  const list = getVocabList();
  const filtered = list.filter((v) => v.id !== id);
  if (filtered.length === list.length) return false;

  saveVocabList(filtered);

  // Also remove from SRS
  const srsItems = getSRSList();
  saveSRSList(srsItems.filter((s) => s.vocabId !== id));
  return true;
}

// ----------------- SRS LAYER -----------------

export function getSRSList(): SRSItem[] {
  const stored = getItem<SRSItem[] | null>(STORAGE_KEYS.SRS_ITEMS, null);
  if (!stored) {
    const vocabs = getVocabList();
    return initializeSRSForVocab(vocabs);
  }
  return stored;
}

export function saveSRSList(items: SRSItem[]): void {
  setItem(STORAGE_KEYS.SRS_ITEMS, items);
}

function initializeSRSForVocab(vocabs: VocabItem[]): SRSItem[] {
  const items = vocabs.map((v) => createInitialSRSItem(v.id));
  saveSRSList(items);
  return items;
}

export function getDueVocabItems(): Array<{ vocab: VocabItem; srs: SRSItem }> {
  const vocabs = getVocabList();
  const srsList = getSRSList();
  const vocabMap = new Map(vocabs.map((v) => [v.id, v]));

  const due: Array<{ vocab: VocabItem; srs: SRSItem }> = [];

  for (const srs of srsList) {
    const vocab = vocabMap.get(srs.vocabId);
    if (vocab && isItemDue(srs.dueDate)) {
      due.push({ vocab, srs });
    }
  }

  return due;
}

export function recordSRSReview(
  vocabId: string,
  quality: 1 | 3 | 5
): { srsItem: SRSItem; reward: { xp: number; coins: number } } {
  const srsList = getSRSList();
  const existing = srsList.find((s) => s.vocabId === vocabId) || createInitialSRSItem(vocabId);

  const updatedCalc = calculateSRS(existing, quality);
  const updatedItem: SRSItem = {
    ...existing,
    ...updatedCalc,
  };

  const newSrsList = srsList.map((s) => (s.vocabId === vocabId ? updatedItem : s));
  if (!srsList.some((s) => s.vocabId === vocabId)) {
    newSrsList.push(updatedItem);
  }
  saveSRSList(newSrsList);

  // Rewards: 1 = 5 XP, 3 = 15 XP, 5 = 25 XP
  const xpMap = { 1: 5, 3: 15, 5: 25 };
  const coinsMap = { 1: 1, 3: 3, 5: 5 };
  const xp = xpMap[quality];
  const coins = coinsMap[quality];

  awardReward(xp, coins);
  incrementDailyQuestProgress('vocab_review', 1);

  return { srsItem: updatedItem, reward: { xp, coins } };
}

// ----------------- EXPRESSIONS -----------------

export function getExpressions(): ExpressionItem[] {
  const stored = getItem<ExpressionItem[] | null>(STORAGE_KEYS.EXPRESSIONS, null);
  if (!stored || stored.length === 0) {
    setItem(STORAGE_KEYS.EXPRESSIONS, SEED_EXPRESSIONS);
    return SEED_EXPRESSIONS;
  }
  return stored;
}

export function saveExpressions(list: ExpressionItem[]): void {
  setItem(STORAGE_KEYS.EXPRESSIONS, list);
}

export function toggleExpressionBookmark(id: string): boolean {
  const list = getExpressions();
  const item = list.find((e) => e.id === id);
  if (!item) return false;

  item.isBookmarked = !item.isBookmarked;
  saveExpressions(list);
  return !!item.isBookmarked;
}

export function addCustomExpression(
  item: Omit<ExpressionItem, 'id' | 'createdAt' | 'source' | 'isCustom'>
): ExpressionItem {
  const list = getExpressions();
  const newItem: ExpressionItem = {
    ...item,
    id: `custom_exp_${Date.now()}`,
    source: 'My Collection',
    isCustom: true,
    createdAt: new Date().toISOString(),
  };

  const updatedList = [newItem, ...list];
  saveExpressions(updatedList);
  return newItem;
}

export function deleteExpression(id: string): boolean {
  const list = getExpressions();
  const filtered = list.filter((e) => e.id !== id);
  if (filtered.length === list.length) return false;
  saveExpressions(filtered);
  return true;
}

// ----------------- CONVERSATIONS & STORIES -----------------

export function getConversations(): ConversationItem[] {
  return SEED_CONVERSATIONS;
}

export function getStories(): StoryScenario[] {
  return SEED_STORIES;
}

// ----------------- MISTAKES -----------------

export function getMistakes(): MistakeRecord[] {
  return getItem<MistakeRecord[]>(STORAGE_KEYS.MISTAKES, []);
}

export function saveMistakes(mistakes: MistakeRecord[]): void {
  setItem(STORAGE_KEYS.MISTAKES, mistakes);
}

export function recordMistake(mistake: Omit<MistakeRecord, 'id' | 'date' | 'resolved'>): MistakeRecord {
  const mistakes = getMistakes();
  // Check if same question already has unresolved mistake
  const existing = mistakes.find((m) => m.questionId === mistake.questionId && !m.resolved);
  if (existing) {
    existing.userAnswer = mistake.userAnswer;
    saveMistakes(mistakes);
    return existing;
  }

  const newMistake: MistakeRecord = {
    ...mistake,
    id: `mistake_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    date: new Date().toISOString(),
    resolved: false,
  };

  saveMistakes([newMistake, ...mistakes]);
  return newMistake;
}

export function resolveMistake(id: string): boolean {
  const mistakes = getMistakes();
  const target = mistakes.find((m) => m.id === id);
  if (!target) return false;

  target.resolved = true;
  target.resolvedAt = new Date().toISOString();
  saveMistakes(mistakes);

  incrementDailyQuestProgress('mistake_resolve', 1);
  awardReward(15, 5);
  return true;
}

// ----------------- PRACTICE SESSIONS -----------------

export function getPracticeSessions(): PracticeSessionRecord[] {
  return getItem<PracticeSessionRecord[]>(STORAGE_KEYS.PRACTICE_SESSIONS, []);
}

export function recordPracticeSession(
  session: Omit<PracticeSessionRecord, 'id' | 'date'>
): PracticeSessionRecord {
  const sessions = getPracticeSessions();
  const newSession: PracticeSessionRecord = {
    ...session,
    id: `sess_${Date.now()}`,
    date: new Date().toISOString(),
  };

  savePracticeSessions([newSession, ...sessions]);

  // Update quests based on mode
  if (session.mode === 'exam_short' || session.mode === 'exam_long') {
    incrementDailyQuestProgress('conversation_exam', 1);
  } else if (session.mode === 'story') {
    incrementDailyQuestProgress('story_complete', 1);
  }

  return newSession;
}

export function savePracticeSessions(sessions: PracticeSessionRecord[]): void {
  setItem(STORAGE_KEYS.PRACTICE_SESSIONS, sessions);
}

// ----------------- DAILY QUESTS & REWARDS -----------------

export function incrementDailyQuestProgress(type: DailyQuest['type'], amount: number = 1): void {
  const profile = getUserProfile();
  let updated = false;

  const newQuests = profile.dailyQuests.map((quest) => {
    if (quest.type === type && !quest.completed) {
      const newCurr = Math.min(quest.target, quest.current + amount);
      const isNowCompleted = newCurr >= quest.target;
      updated = true;
      return {
        ...quest,
        current: newCurr,
        completed: isNowCompleted,
      };
    }
    return quest;
  });

  if (updated) {
    saveUserProfile({
      ...profile,
      dailyQuests: newQuests,
    });
  }
}

export function claimDailyQuestReward(questId: string): { success: boolean; xp: number; coins: number } {
  const profile = getUserProfile();
  const quest = profile.dailyQuests.find((q) => q.id === questId);

  if (!quest || !quest.completed || quest.claimed) {
    return { success: false, xp: 0, coins: 0 };
  }

  quest.claimed = true;
  awardReward(quest.rewardXp, quest.rewardCoins);
  saveUserProfile(profile);

  return {
    success: true,
    xp: quest.rewardXp,
    coins: quest.rewardCoins,
  };
}

