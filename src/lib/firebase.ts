import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey.startsWith('AIza') &&
  firebaseConfig.projectId &&
  !firebaseConfig.projectId.includes('your_project')
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (typeof window !== 'undefined') {
  if (isFirebaseConfigured) {
    try {
      app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
    } catch (error) {
      console.warn('Firebase initialization warning:', error);
    }
  } else {
    // Helpful reminder for developer in browser console
    console.info(
      'ℹ️ TGAT1 Quest: Firebase config is not fully set in .env.local. Operating in Offline/LocalStorage fallback mode.'
    );
  }
}

export function formatFirebaseError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes('auth/api-key-not-valid')) {
    return 'API Key ในไฟล์ .env.local ไม่ถูกต้อง (ยังเป็น your_api_key_here หรือค่าตัวอย่าง) กรุณานำ API Key จริงที่ขึ้นต้นด้วย AIzaSy... จาก Firebase Console มาใส่ครับ';
  }
  if (msg.includes('auth/unauthorized-domain')) {
    return 'โดเมน localhost ยังไม่ได้รับอนุญาตใน Firebase Console (กรุณาไปที่ Authentication > Settings > Authorized domains แล้วเพิ่ม localhost)';
  }
  if (msg.includes('auth/operation-not-allowed')) {
    return 'ยังไม่ได้เปิดใช้งาน Google Sign-In ใน Firebase Console (ไปที่ Authentication > Sign-in method แล้วกดเปิด Google)';
  }
  if (msg.includes('auth/popup-closed-by-user')) {
    return 'หน้าต่าง Google Popup ถูกปิดก่อนล็อกอินสำเร็จ';
  }
  if (msg.includes('auth/popup-blocked')) {
    return 'เบราว์เซอร์บล็อกหน้าต่าง Popup กรุณากดอนุญาตแสดง Popup บน localhost';
  }
  if (msg.includes('auth/email-already-in-use')) {
    return 'อีเมลนี้ถูกใช้งานไปแล้ว กรุณาเข้าสู่ระบบแทน';
  }
  if (msg.includes('auth/invalid-credential') || msg.includes('auth/wrong-password')) {
    return 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
  }
  if (msg.includes('auth/weak-password')) {
    return 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร';
  }
  return msg;
}

export { app, auth, db };

