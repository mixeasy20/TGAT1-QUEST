'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, DailyQuest } from '@/types';
import {
  getUserProfile,
  awardReward,
  getDueVocabItems,
  claimDailyQuestReward,
  incrementDailyQuestProgress,
} from '@/lib/storage';
import { computeLevelProgress } from '@/lib/gamification';
import { triggerLevelUpConfetti, triggerRewardConfetti } from '@/lib/confetti';

interface UserContextType {
  profile: UserProfile | null;
  dueCount: number;
  levelInfo: ReturnType<typeof computeLevelProgress> | null;
  refreshUserData: () => void;
  awardXpAndCoins: (xp: number, coins: number, activityName?: string) => void;
  claimQuest: (questId: string) => boolean;
  notifyQuestProgress: (type: DailyQuest['type'], amount?: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [dueCount, setDueCount] = useState<number>(0);

  const refreshUserData = () => {
    if (typeof window === 'undefined') return;
    const p = getUserProfile();
    setProfile(p);
    const due = getDueVocabItems();
    setDueCount(due.length);
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  const awardXpAndCoins = (xp: number, coins: number) => {
    const res = awardReward(xp, coins);
    setProfile(res.profile);
    if (res.leveledUp) {
      triggerLevelUpConfetti();
    } else if (xp > 0) {
      triggerRewardConfetti();
    }
  };

  const claimQuest = (questId: string): boolean => {
    const res = claimDailyQuestReward(questId);
    if (res.success) {
      triggerRewardConfetti();
      refreshUserData();
      return true;
    }
    return false;
  };

  const notifyQuestProgress = (type: DailyQuest['type'], amount: number = 1) => {
    incrementDailyQuestProgress(type, amount);
    refreshUserData();
  };

  const levelInfo = profile ? computeLevelProgress(profile.xp) : null;

  return (
    <UserContext.Provider
      value={{
        profile,
        dueCount,
        levelInfo,
        refreshUserData,
        awardXpAndCoins,
        claimQuest,
        notifyQuestProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

