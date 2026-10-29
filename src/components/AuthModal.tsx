'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  Cloud,
  RotateCw,
  LogOut,
  Mail,
  Lock,
  User as UserIcon,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/context/UserContext';

function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
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

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const {
    user,
    isConfigured,
    isSyncing,
    lastSyncTime,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    loginAsGuest,
    logout,
    syncData,
  } = useAuth();
  const { refreshUserData } = useUser();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setErrorMessage('');
    setSubmitting(true);
    const res = await loginWithGoogle();
    if (!res.success) {
      setErrorMessage(res.error || 'เข้าสู่ระบบด้วย Google ไม่สำเร็จ');
    } else {
      refreshUserData();
      onClose();
    }
    setSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    if (mode === 'login') {
      const res = await loginWithEmail(email, password);
      if (!res.success) {
        setErrorMessage(res.error || 'เข้าสู่ระบบไม่สำเร็จ');
      } else {
        refreshUserData();
        onClose();
      }
    } else {
      if (!displayName.trim()) {
        setErrorMessage('กรุณาระบุชื่อผู้เรียน');
        setSubmitting(false);
        return;
      }
      const res = await registerWithEmail(email, password, displayName);
      if (!res.success) {
        setErrorMessage(res.error || 'สมัครสมาชิกไม่สำเร็จ');
      } else {
        refreshUserData();
        onClose();
      }
    }
    setSubmitting(false);
  };

  const handleGuestLogin = async () => {
    setErrorMessage('');
    setSubmitting(true);
    const res = await loginAsGuest();
    if (!res.success) {
      setErrorMessage(res.error || 'เข้าสู่ระบบแบบผู้เยี่ยมชมไม่สำเร็จ');
    } else {
      refreshUserData();
      onClose();
    }
    setSubmitting(false);
  };

  const handleLogout = async () => {
    await logout();
    refreshUserData();
    onClose();
  };

  const handleManualSync = async () => {
    await syncData();
    refreshUserData();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {user ? 'สถานะบัญชีและการซิงก์ข้อมูล' : 'เข้าสู่ระบบ Firebase'}
            </h3>
            <p className="text-xs text-slate-400">
              {user
                ? 'ซิงก์ประวัติการฝึก คำศัพท์ และ XP ข้ามอุปกรณ์'
                : 'บันทึกความคืบหน้าขึ้น Cloud Firestore'}
            </p>
          </div>
        </div>

        {/* Firebase Config Notice if missing env vars */}
        {!isConfigured && (
          <div className="mb-4 p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs space-y-1.5">
            <div className="font-bold text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>โหมดออฟไลน์ (Local Mode ทำงานสมบูรณ์ 100%)</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              ระบบกำลังทำงานผ่าน LocalStorage หากต้องการเปิดใช้ Cloud ให้ตั้งค่าในไฟล์ <code className="text-indigo-300">.env.local</code>
            </p>
          </div>
        )}

        {/* USER LOGGED IN STATE */}
        {user ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">ผู้ใช้งานปัจจุบัน:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {user.isAnonymous ? 'ผู้เยี่ยมชม (Guest)' : 'ยืนยันตัวตนแล้ว'}
                </span>
              </div>
              <div className="text-sm font-bold text-white">
                {user.displayName || user.email || `Guest UID: ${user.uid.slice(0, 8)}...`}
              </div>
              {user.email && (
                <div className="text-xs text-slate-400">{user.email}</div>
              )}
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-slate-200">ซิงก์ Cloud ล่าสุด:</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {lastSyncTime ? lastSyncTime.toLocaleTimeString('th-TH') : 'ซิงก์เมื่อเริ่มแอป'}
                </div>
              </div>
              <button
                onClick={handleManualSync}
                disabled={isSyncing}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1.5 shadow"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'กำลังซิงก์...' : 'ซิงก์ทันที'}</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/login"
                onClick={onClose}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
              >
                <span>เปิดหน้า Login เต็ม</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>ออกจากระบบ</span>
              </button>
            </div>
          </div>
        ) : (
          /* USER NOT LOGGED IN: GOOGLE + EMAIL FORM */
          <div className="space-y-4">
            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={submitting || !isConfigured}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-50 text-slate-800 font-bold text-xs shadow transition-all flex items-center justify-center gap-2.5 active:scale-98"
            >
              <GoogleIcon className="w-4 h-4 shrink-0" />
              <span>เข้าสู่ระบบด้วย Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-900 px-3 text-[10px] text-slate-400 absolute uppercase font-semibold">
                หรือใช้อีเมล
              </span>
            </div>

            {/* Mode Tabs */}
            <div className="p-1 rounded-xl bg-slate-800 flex items-center">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'login' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400'
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
                  mode === 'register' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400'
                }`}
              >
                สมัครสมาชิก
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
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
                      placeholder="เช่น สมชาย ใจดี"
                      className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
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
                    className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  รหัสผ่าน (Password)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="อย่างน้อย 6 ตัวอักษร"
                    className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !isConfigured}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all active:scale-98"
              >
                {submitting
                  ? 'กำลังดำเนินการ...'
                  : mode === 'login'
                  ? 'เข้าสู่ระบบด้วยอีเมล'
                  : 'สร้างบัญชีผู้ใช้ใหม่'}
              </button>
            </form>

            <div className="pt-2 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleGuestLogin}
                disabled={submitting || !isConfigured}
                className="text-slate-400 hover:text-slate-200"
              >
                ใช้งานแบบผู้เยี่ยมชม (Guest)
              </button>
              <Link
                href="/login"
                onClick={onClose}
                className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                <span>เปิดหน้า Login เต็ม</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
