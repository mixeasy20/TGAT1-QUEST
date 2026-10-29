import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  UserProfile,
  VocabItem,
  SRSItem,
  ExpressionItem,
  MistakeRecord,
  PracticeSessionRecord,
} from '@/types';

// Helper to check DB
function checkDb() {
  if (!db) {
    throw new Error('Firestore is not initialized. Please configure .env.local');
  }
  return db;
}

// ----------------- USER PROFILE -----------------

export async function fetchCloudUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const firestore = checkDb();
    const docRef = doc(firestore, 'users', uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching profile from Firestore:', error);
    return null;
  }
}

export async function saveCloudUserProfile(uid: string, profile: UserProfile): Promise<void> {
  try {
    const firestore = checkDb();
    const docRef = doc(firestore, 'users', uid);
    await setDoc(docRef, profile, { merge: true });
  } catch (error) {
    console.error('Error saving profile to Firestore:', error);
  }
}

// ----------------- VOCABULARY & SRS -----------------

export async function fetchCloudVocab(uid: string): Promise<VocabItem[] | null> {
  try {
    const firestore = checkDb();
    const colRef = collection(firestore, 'users', uid, 'vocab');
    const snap = await getDocs(colRef);
    if (snap.empty) return null;
    return snap.docs.map((d) => d.data() as VocabItem);
  } catch (error) {
    console.error('Error fetching vocab from Firestore:', error);
    return null;
  }
}

export async function saveCloudVocabList(uid: string, items: VocabItem[]): Promise<void> {
  try {
    const firestore = checkDb();
    const batch = writeBatch(firestore);
    items.forEach((item) => {
      const docRef = doc(firestore, 'users', uid, 'vocab', item.id);
      batch.set(docRef, item, { merge: true });
    });
    await batch.commit();
  } catch (error) {
    console.error('Error saving vocab to Firestore:', error);
  }
}

export async function fetchCloudSRS(uid: string): Promise<SRSItem[] | null> {
  try {
    const firestore = checkDb();
    const colRef = collection(firestore, 'users', uid, 'srs');
    const snap = await getDocs(colRef);
    if (snap.empty) return null;
    return snap.docs.map((d) => d.data() as SRSItem);
  } catch (error) {
    console.error('Error fetching SRS from Firestore:', error);
    return null;
  }
}

export async function saveCloudSRSList(uid: string, items: SRSItem[]): Promise<void> {
  try {
    const firestore = checkDb();
    const batch = writeBatch(firestore);
    items.forEach((item) => {
      const docRef = doc(firestore, 'users', uid, 'srs', item.id);
      batch.set(docRef, item, { merge: true });
    });
    await batch.commit();
  } catch (error) {
    console.error('Error saving SRS to Firestore:', error);
  }
}

// ----------------- EXPRESSIONS -----------------

export async function fetchCloudExpressions(uid: string): Promise<ExpressionItem[] | null> {
  try {
    const firestore = checkDb();
    const colRef = collection(firestore, 'users', uid, 'expressions');
    const snap = await getDocs(colRef);
    if (snap.empty) return null;
    return snap.docs.map((d) => d.data() as ExpressionItem);
  } catch (error) {
    console.error('Error fetching expressions from Firestore:', error);
    return null;
  }
}

export async function saveCloudExpressions(uid: string, items: ExpressionItem[]): Promise<void> {
  try {
    const firestore = checkDb();
    const batch = writeBatch(firestore);
    items.forEach((item) => {
      const docRef = doc(firestore, 'users', uid, 'expressions', item.id);
      batch.set(docRef, item, { merge: true });
    });
    await batch.commit();
  } catch (error) {
    console.error('Error saving expressions to Firestore:', error);
  }
}

// ----------------- MISTAKES -----------------

export async function fetchCloudMistakes(uid: string): Promise<MistakeRecord[] | null> {
  try {
    const firestore = checkDb();
    const colRef = collection(firestore, 'users', uid, 'mistakes');
    const snap = await getDocs(colRef);
    if (snap.empty) return null;
    return snap.docs.map((d) => d.data() as MistakeRecord);
  } catch (error) {
    console.error('Error fetching mistakes from Firestore:', error);
    return null;
  }
}

export async function saveCloudMistakes(uid: string, items: MistakeRecord[]): Promise<void> {
  try {
    const firestore = checkDb();
    const batch = writeBatch(firestore);
    items.forEach((item) => {
      const docRef = doc(firestore, 'users', uid, 'mistakes', item.id);
      batch.set(docRef, item, { merge: true });
    });
    await batch.commit();
  } catch (error) {
    console.error('Error saving mistakes to Firestore:', error);
  }
}

// ----------------- PRACTICE SESSIONS -----------------

export async function fetchCloudPracticeSessions(uid: string): Promise<PracticeSessionRecord[] | null> {
  try {
    const firestore = checkDb();
    const colRef = collection(firestore, 'users', uid, 'practice_sessions');
    const snap = await getDocs(colRef);
    if (snap.empty) return null;
    return snap.docs.map((d) => d.data() as PracticeSessionRecord);
  } catch (error) {
    console.error('Error fetching practice sessions from Firestore:', error);
    return null;
  }
}

export async function saveCloudPracticeSessions(
  uid: string,
  items: PracticeSessionRecord[]
): Promise<void> {
  try {
    const firestore = checkDb();
    const batch = writeBatch(firestore);
    items.forEach((item) => {
      const docRef = doc(firestore, 'users', uid, 'practice_sessions', item.id);
      batch.set(docRef, item, { merge: true });
    });
    await batch.commit();
  } catch (error) {
    console.error('Error saving practice sessions to Firestore:', error);
  }
}

