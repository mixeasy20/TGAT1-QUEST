'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, isFirebaseConfigured, formatFirebaseError } from '@/lib/firebase';
import {
  fetchCloudUserProfile,
  saveCloudUserProfile,
  fetchCloudVocab,
  saveCloudVocabList,
  fetchCloudSRS,
  saveCloudSRSList,
  fetchCloudExpressions,
  saveCloudExpressions,
  fetchCloudMistakes,
  saveCloudMistakes,
  fetchCloudPracticeSessions,
  saveCloudPracticeSessions,
} from '@/lib/firebaseRepository';
import {
  getUserProfile,
  saveUserProfile,
  getVocabList,
  saveVocabList,
  getSRSList,
  saveSRSList,
  getExpressions,
  saveExpressions,
  getMistakes,
  saveMistakes,
  getPracticeSessions,
  savePracticeSessions,
} from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  isSyncing: boolean;
  lastSyncTime: Date | null;
  loginWithEmail: (e: string, p: string) => Promise<{ success: boolean; error?: string }>;
  registerWithEmail: (e: string, p: string, name: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: () => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  syncData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  useEffect(() => {
    // Check if there is a local guest session
    if (typeof window !== 'undefined') {
      const storedGuest = sessionStorage.getItem('tgat1_guest_session');
      if (storedGuest) {
        try {
          setUser(JSON.parse(storedGuest));
          setLoading(false);
          return;
        } catch (e) {
          console.error(e);
        }
      }
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('tgat1_guest_session');
        }
        setUser(currentUser);
        setLoading(false);
        await syncUserData(currentUser.uid);
      } else {
        if (typeof window !== 'undefined' && sessionStorage.getItem('tgat1_guest_session')) {
          // Keep active guest session
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const syncUserData = async (uid: string) => {
    setIsSyncing(true);
    try {
      // 1. Profile sync
      const cloudProfile = await fetchCloudUserProfile(uid);
      const localProfile = getUserProfile();

      if (cloudProfile && cloudProfile.xp >= localProfile.xp) {
        saveUserProfile(cloudProfile);
      } else {
        await saveCloudUserProfile(uid, localProfile);
      }

      // 2. Vocab sync
      const cloudVocab = await fetchCloudVocab(uid);
      if (cloudVocab && cloudVocab.length > 0) {
        saveVocabList(cloudVocab);
      } else {
        const localVocab = getVocabList();
        await saveCloudVocabList(uid, localVocab);
      }

      // 3. SRS sync
      const cloudSRS = await fetchCloudSRS(uid);
      if (cloudSRS && cloudSRS.length > 0) {
        saveSRSList(cloudSRS);
      } else {
        const localSRS = getSRSList();
        await saveCloudSRSList(uid, localSRS);
      }

      // 4. Expressions sync
      const cloudExp = await fetchCloudExpressions(uid);
      if (cloudExp && cloudExp.length > 0) {
        saveExpressions(cloudExp);
      } else {
        const localExp = getExpressions();
        await saveCloudExpressions(uid, localExp);
      }

      // 5. Mistakes sync
      const cloudMistakes = await fetchCloudMistakes(uid);
      if (cloudMistakes && cloudMistakes.length > 0) {
        saveMistakes(cloudMistakes);
      } else {
        const localMistakes = getMistakes();
        await saveCloudMistakes(uid, localMistakes);
      }

      // 6. Practice sessions sync
      const cloudSessions = await fetchCloudPracticeSessions(uid);
      if (cloudSessions && cloudSessions.length > 0) {
        savePracticeSessions(cloudSessions);
      } else {
        const localSessions = getPracticeSessions();
        await saveCloudPracticeSessions(uid, localSessions);
      }

      setLastSyncTime(new Date());
    } catch (err) {
      console.warn('Sync warning:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    if (!auth) {
      return { success: false, error: 'Firebase is not configured in .env.local' };
    }
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: formatFirebaseError(err) };
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string) => {
    if (!auth) {
      return { success: false, error: 'Firebase is not configured in .env.local' };
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      if (res.user) {
        await updateProfile(res.user, { displayName: name });
        // Initialize cloud profile
        const initial = getUserProfile();
        initial.name = name;
        saveUserProfile(initial);
        await saveCloudUserProfile(res.user.uid, initial);
      }
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: formatFirebaseError(err) };
    }
  };

  const loginWithGoogle = async () => {
    if (!auth) {
      return { success: false, error: 'Firebase ยังไม่ได้กำหนดค่าใน .env.local' };
    }
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const res = await signInWithPopup(auth, provider);
      if (res.user) {
        const initial = getUserProfile();
        if (res.user.displayName) {
          initial.name = res.user.displayName;
          saveUserProfile(initial);
        }
        await saveCloudUserProfile(res.user.uid, initial);
      }
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: formatFirebaseError(err) };
    }
  };

  const loginAsGuest = async () => {
    try {
      if (auth) {
        await signInAnonymously(auth);
        return { success: true };
      }
    } catch (err: unknown) {
      console.warn('Firebase anonymous sign in note:', err);
    }

    // Local guest session fallback
    const guestUser = {
      uid: 'guest_' + Date.now(),
      isAnonymous: true,
      displayName: 'ผู้เรียนทดลอง (Guest)',
      email: null,
    } as unknown as User;

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tgat1_guest_session', JSON.stringify(guestUser));
    }
    setUser(guestUser);
    return { success: true };
  };

  const resetPassword = async (emailToReset: string) => {
    if (!auth) {
      return { success: false, error: 'Firebase ยังไม่ได้กำหนดค่าใน .env.local' };
    }
    try {
      await sendPasswordResetEmail(auth, emailToReset.trim());
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: formatFirebaseError(err) };
    }
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('tgat1_guest_session');
    }
    if (auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.warn(e);
      }
    }
    setUser(null);
  };

  const syncData = async () => {
    if (user) {
      await syncUserData(user.uid);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: isFirebaseConfigured,
        isSyncing,
        lastSyncTime,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        loginAsGuest,
        resetPassword,
        logout,
        syncData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

