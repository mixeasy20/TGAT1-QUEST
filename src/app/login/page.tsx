'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sword,
  Mail,
  Lock,
  User as UserIcon,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Brain,
  MessageSquareText,
  LineChart,
  Cloud,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/context/UserContext';
import StackedFeatureCards from '@/components/StackedFeatureCards';

// Official Google Multi-color Icon
function GoogleIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const {
    user,
    isConfigured,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    loginAsGuest,
    logout,
  } = useAuth();
  const { refreshUserData } = useUser();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setLoading(true);
    const res = await loginWithGoogle();
    if (!res.success) {
      setErrorMessage(res.error || 'เข้าสู่ระบบด้วย Google ไม่สำเร็จ');
      setLoading(false);
    } else {
      refreshUserData();
      router.push('/');
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (mode === 'login') {
      const res = await loginWithEmail(email, password);
      if (!res.success) {
        setErrorMessage(res.error || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
        setLoading(false);
      } else {
        refreshUserData();
        router.push('/');
      }
    } else {
      if (!displayName.trim()) {
        setErrorMessage('กรุณากรอกชื่อผู้เรียน');
        setLoading(false);
        return;
      }
      const res = await registerWithEmail(email, password, displayName.trim());
      if (!res.success) {
        setErrorMessage(res.error || 'สมัครสมาชิกไม่สำเร็จ');
        setLoading(false);
      } else {
        refreshUserData();
        router.push('/');
      }
    }
  };

  const handleGuestSignIn = async () => {
    setErrorMessage('');
    setLoading(true);
    const res = await loginAsGuest();
    if (!res.success) {
      setErrorMessage(res.error || 'เข้าสู่ระบบแบบผู้เยี่ยมชมไม่สำเร็จ');
      setLoading(false);
    } else {
      refreshUserData();
      router.push('/');
    }
  };

  const handleLogout = async () => {
    await logout();
    refreshUserData();
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
        {/* Left Side: Brand & Feature Showcase */}
        <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform bg-indigo-900/40 border border-indigo-500/30">
                <img src="/app-logo.jpg" alt="TGAT1 Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5">
                  <span>TGAT1 Quest</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    AUTH
                  </span>
                </div>
                <div className="text-xs text-slate-400">English Learning & Exam Prep</div>
              </div>
            </Link>

            <div className="mt-8 space-y-3">
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                เข้าสู่ระบบเพื่อซิงก์ข้อมูลบน Cloud
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                เข้าถึงคำศัพท์ในคลัง SRS, สถิติความแม่นยำ 5 ทักษะ, และความคืบหน้า Daily Quests ได้ทุกที่ทุกเวลาบนทุกอุปกรณ์
              </p>
            </div>

            {/* Stacked Floating Feature Showcase */}
            <div className="mt-4">
              <StackedFeatureCards />
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Powered by Firebase & Next.js</span>
            <button
              type="button"
              onClick={handleGuestSignIn}
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              ทดลองใช้แบบผู้เยี่ยมชม →
            </button>
          </div>
        </div>

        {/* Right Side: Auth Forms & Google Button */}
        <div className="p-8 flex flex-col justify-center bg-slate-900">
          {/* USER ALREADY LOGGED IN */}
          {user ? (
            <div className="space-y-6 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">คุณเข้าสู่ระบบอยู่แล้ว</h3>
                <p className="text-xs text-slate-400 mt-1">
                  กำลังใช้งานในชื่อ:{' '}
                  <strong className="text-emerald-400">
                    {user.displayName || user.email || `Guest (${user.uid.slice(0, 8)}...)`}
                  </strong>
                </p>
                {user.email && <div className="text-xs text-slate-500 mt-0.5">{user.email}</div>}
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 flex items-center justify-center gap-2">
                <Cloud className="w-4 h-4 text-emerald-400" />
                <span>สถานะ: ข้อมูลเชื่อมต่อกับ Cloud Firestore เรียบร้อยแล้ว</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => router.push('/')}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <span>ไปที่ Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600/15 hover:bg-rose-600/25 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            </div>
          ) : (
            /* USER NOT LOGGED IN: SIGN IN OR REGISTER */
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {mode === 'login' ? 'ยินดีต้อนรับกลับมา!' : 'สร้างบัญชีผู้เรียนใหม่'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {mode === 'login'
                    ? 'เข้าสู่ระบบเพื่อฝึกทำข้อสอบและสะสมคะแนน XP'
                    : 'เริ่มต้นเตรียมสอบ TGAT1 แบบครบวงจรได้ฟรี'}
                </p>
              </div>

              {/* Notice if Firebase is not yet configured in env */}
              {!isConfigured && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>แจ้งเตือน: ยังไม่ได้ตั้งค่า Firebase Keys ใน .env.local</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    คุณยังสามารถทดลองใช้งานในโหมด LocalStorage ได้โดยตรง หรือเพิ่ม Firebase Config ในไฟล์ .env.local
                  </p>
                </div>
              )}

              {/* GOOGLE SIGN IN BUTTON */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading || !isConfigured}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 disabled:opacity-50 text-slate-800 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-3 active:scale-98 cursor-pointer"
              >
                <GoogleIcon className="w-5 h-5 shrink-0" />
                <span>เข้าสู่ระบบด้วย Google (Google Sign-In)</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-800 w-full" />
                <span className="bg-slate-900 px-3 text-[11px] text-slate-400 absolute uppercase font-semibold">
                  หรือใช้อีเมล
                </span>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="p-1 rounded-xl bg-slate-800 flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage('');
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    mode === 'login' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  เข้าสู่ระบบ
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMessage('');
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    mode === 'register' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  สมัครสมาชิก
                </button>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      ชื่อผู้เรียน (Display Name)
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="เช่น มณี มีใจ"
                        className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    อีเมล (Email)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-300">
                      รหัสผ่าน (Password)
                    </label>
                    {mode === 'login' && (
                      <Link
                        href="/forgot-password"
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                      >
                        ลืมรหัสผ่าน?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="อย่างน้อย 6 ตัวอักษร"
                      className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isConfigured}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all active:scale-98"
                >
                  {loading
                    ? 'กำลังดำเนินการ...'
                    : mode === 'login'
                    ? 'เข้าสู่ระบบด้วยอีเมล'
                    : 'สมัครสมาชิกและสร้างบัญชี'}
                </button>
              </form>

              {/* Guest Login Fallback */}
              <button
                type="button"
                onClick={handleGuestSignIn}
                disabled={loading || !isConfigured}
                className="w-full py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 disabled:opacity-50 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors"
              >
                เข้าใช้งานแบบผู้เยี่ยมชม (Guest Anonymous)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

