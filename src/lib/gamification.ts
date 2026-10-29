import type { DailyQuest, Achievement, UserProfile } from '@/types';

export const LEVEL_TITLES: { [level: number]: string } = {
  1: 'TGAT Beginner (ผู้เริ่มต้นท่องศัพท์)',
  2: 'Curious Learner (ผู้ใฝ่รู้สำนวน)',
  3: 'Dialogue Apprentice (นักฝึกบทสนทนา)',
  4: 'Sentence Strategist (จอมวางแผนประโยค)',
  5: 'Context Explorer (นักเจาะบริบท)',
  6: 'Grammar Scout (ผู้เชี่ยวชาญโครงสร้าง)',
  7: 'Conversation Challenger (ผู้ท้าชิง TGAT1)',
  8: 'Fluency Knight (อัศวินสื่อสารคล่องแคล่ว)',
  9: 'Master Communicator (ปรมาจารย์ภาษาอังกฤษ)',
  10: 'TGAT1 Legend (ยอดฝีมือคะแนนเต็ม 100)',
};

export function getRankTitle(level: number): string {
  if (level >= 10) return LEVEL_TITLES[10];
  return LEVEL_TITLES[level] || `TGAT Adventurer Lv.${level}`;
}

/**
 * Calculates XP required to advance from current level to next level
 * Exponential progression: Level 1 -> 2: 100 XP, Level 2 -> 3: 220 XP, etc.
 */
export function getXpRequiredForLevel(level: number): number {
  return Math.round(100 * Math.pow(1.2, level - 1));
}

export interface LevelProgress {
  currentLevel: number;
  currentLevelXp: number;
  xpNeededForNext: number;
  progressPercent: number;
  leveledUp: boolean;
  newLevel?: number;
}

export function computeLevelProgress(totalXp: number): LevelProgress {
  let level = 1;
  let remainingXp = totalXp;

  while (true) {
    const needed = getXpRequiredForLevel(level);
    if (remainingXp < needed) {
      return {
        currentLevel: level,
        currentLevelXp: remainingXp,
        xpNeededForNext: needed,
        progressPercent: Math.min(100, Math.floor((remainingXp / needed) * 100)),
        leveledUp: false,
      };
    }
    remainingXp -= needed;
    level += 1;
    if (level >= 50) {
      return {
        currentLevel: 50,
        currentLevelXp: needed,
        xpNeededForNext: needed,
        progressPercent: 100,
        leveledUp: false,
      };
    }
  }
}

export const INITIAL_DAILY_QUESTS: DailyQuest[] = [
  {
    id: 'quest_vocab_10',
    titleTh: 'ทบทวนคำศัพท์ 10 คำ',
    descriptionTh: 'ฝึกการ์ดคำศัพท์ใน Vocabulary Arena ให้ครบ 10 คำ',
    current: 0,
    target: 10,
    rewardXp: 50,
    rewardCoins: 20,
    completed: false,
    claimed: false,
    type: 'vocab_review',
  },
  {
    id: 'quest_exam_1',
    titleTh: 'ทำข้อสอบ Conversation 1 ชุด',
    descriptionTh: 'ฝึกทำข้อสอบบทสนทนา Short หรือ Long ในโหมด Exam Mode ให้เสร็จสิ้น',
    current: 0,
    target: 1,
    rewardXp: 80,
    rewardCoins: 35,
    completed: false,
    claimed: false,
    type: 'conversation_exam',
  },
  {
    id: 'quest_story_1',
    titleTh: 'ฝึกสถานการณ์จำลอง Story 1 ด่าน',
    descriptionTh: 'ตอบบทสนทนาสถานการณ์จำลองจนจบภารกิจ 1 สถานการณ์',
    current: 0,
    target: 1,
    rewardXp: 70,
    rewardCoins: 25,
    completed: false,
    claimed: false,
    type: 'story_complete',
  },
  {
    id: 'quest_mistake_3',
    titleTh: 'พิชิตข้อผิดพลาด 3 ข้อ',
    descriptionTh: 'ทบทวนและกดแก้ไขข้อที่เคยทำผิดในหน้า Mistake Analysis',
    current: 0,
    target: 3,
    rewardXp: 60,
    rewardCoins: 30,
    completed: false,
    claimed: false,
    type: 'mistake_resolve',
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_first_steps',
    titleTh: 'ก้าวแรกสู่อนาคต',
    descriptionTh: 'ฝึกคำศัพท์ครั้งแรกผ่านระบบ SRS',
    iconName: 'Compass',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'ach_vocab_master_50',
    titleTh: 'คลังคำศัพท์เดินได้',
    descriptionTh: 'ฝึกคำศัพท์ครบ 50 คำในระบบ',
    iconName: 'BookOpen',
    unlocked: false,
    progress: 0,
    maxProgress: 50,
  },
  {
    id: 'ach_exam_perfection',
    titleTh: 'นักสื่อสารไร้ที่ติ',
    descriptionTh: 'ทำแบบทดสอบได้คะแนนเต็ม 100% ในชุดข้อสอบใดก็ได้',
    iconName: 'Award',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'ach_streak_3',
    titleTh: 'ความสม่ำเสมอคือกุญแจ',
    descriptionTh: 'เข้าฝึกติดต่อกัน 3 วัน',
    iconName: 'Flame',
    unlocked: false,
    progress: 1,
    maxProgress: 3,
  },
  {
    id: 'ach_story_hero',
    titleTh: 'นักเจรจาสากล',
    descriptionTh: 'พิชิต Story Mode ครบทุกสถานการณ์',
    iconName: 'MessageSquare',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
  },
];

export function getTodayDateString(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

export function refreshDailyQuestsIfNeeded(profile: UserProfile): UserProfile {
  const today = getTodayDateString();
  if (profile.claimedQuestsDate !== today) {
    return {
      ...profile,
      claimedQuestsDate: today,
      dailyQuests: INITIAL_DAILY_QUESTS.map((q) => ({
        ...q,
        current: 0,
        completed: false,
        claimed: false,
      })),
    };
  }
  return profile;
}
