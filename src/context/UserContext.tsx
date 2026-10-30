'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { UserProfile, DailyQuest } from '@/types';
import {
  getUserProfile,
  saveUserProfile,
  awardReward,
  getDueVocabItems,
  claimDailyQuestReward,
  incrementDailyQuestProgress,
} from '@/lib/storage';
import { computeLevelProgress } from '@/lib/gamification';
import { triggerLevelUpConfetti, triggerRewardConfetti } from '@/lib/confetti';
import { useAuth } from '@/context/AuthContext';
import {
  fetchCloudUserProfile,
  saveCloudUserProfile,
} from '@/lib/firebaseRepository';

interface UserContextType {
  profile: UserProfile | null;
  dueCount: number;
  levelInfo: ReturnType<typeof computeLevelProgress> | null;
  refreshUserData: () => void;
  awardXpAndCoins: (xp: number, coins: number, activityName?: string) => void;
  claimQuest: (questId: string) => boolean;
  notifyQuestProgress: (type: DailyQuest['type'], amount?: number) => void;
  isCloudSynced: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [dueCount, setDueCount] = useState<number>(0);
  const [isCloudSynced, setIsCloudSynced] = useState(false);

  const refreshUserData = useCallback(() => {
    if (typeof window === 'undefined') return;
    const p = getUserProfile();
    setProfile(p);
    const due = getDueVocabItems();
    setDueCount(due.length);
  }, []);

  // Initial load from LocalStorage
  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  // Sync with Firestore when user logs in
  useEffect(() => {
    if (!user) {
      setIsCloudSynced(false);
      return;
    }

    let isMounted = true;

    async function syncCloudProfile() {
      try {
        const cloudProfile = await fetchCloudUserProfile(user!.uid);
        if (cloudProfile && isMounted) {
          // Cloud profile exists -> update local storage with cloud data
          saveUserProfile(cloudProfile);
          setProfile(cloudProfile);
          setIsCloudSynced(true);
        } else if (isMounted) {
          // New cloud user -> upload local profile to cloud
          const localProfile = getUserProfile();
          if (user?.displayName && localProfile.name === 'TGAT Hero') {
            localProfile.name = user.displayName;
          }
          await saveCloudUserProfile(user!.uid, localProfile);
          saveUserProfile(localProfile);
          setProfile(localProfile);
          setIsCloudSynced(true);
        }
      } catch (err) {
        console.warn('Cloud profile sync note:', err);
      }
    }

    syncCloudProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const awardXpAndCoins = (xp: number, coins: number) => {
    const res = awardReward(xp, coins);
    setProfile(res.profile);

    // Also sync to cloud asynchronously if logged in
    if (user) {
      saveCloudUserProfile(user.uid, res.profile).catch((err) =>
        console.warn('Background cloud save note:', err)
      );
    }

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

      if (user) {
        const updated = getUserProfile();
        saveCloudUserProfile(user.uid, updated).catch((err) =>
          console.warn('Background quest cloud save note:', err)
        );
      }
      return true;
    }
    return false;
  };

  const notifyQuestProgress = (type: DailyQuest['type'], amount: number = 1) => {
    incrementDailyQuestProgress(type, amount);
    refreshUserData();

    if (user) {
      const updated = getUserProfile();
      saveCloudUserProfile(user.uid, updated).catch((err) =>
        console.warn('Background progress cloud save note:', err)
      );
    }
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
        isCloudSynced,
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

