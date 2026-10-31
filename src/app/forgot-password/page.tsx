'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Send,
  HelpCircle,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPasswordPage() {
  const { resetPassword, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Email format validation (standard RFC 5322 regex approximation)
  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage('กรุณากรอกอีเมลของคุณ');
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setErrorMessage('รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง (เช่น student@example.com)');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await resetPassword(trimmedEmail);

      // Note on Privacy Preservation & Enumeration Prevention:
      // In modern Firebase Auth and security best practices, we always display a uniform confirmation message
      // even if the email does not exist (or Firebase returns user-not-found) to avoid email enumeration attacks.
      if (result.success || result.error?.includes('ไม่พบบัญชี') || result.error?.includes('user-not-found')) {
        setSubmittedEmail(trimmedEmail);
        setIsSubmitted(true);
      } else {
        setErrorMessage(result.error || 'เกิดข้อผิดพลาดในการส่งคำขอ กรุณาลองใหม่อีกครั้ง');
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-kanit">
      {/* Ambient Cyber / Aurora Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-indigo-600/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-600/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 animate-in fade-in duration-300">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/login" className="inline-flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/25 border border-indigo-500/30 group-hover:scale-105 transition-transform">
              <Image
                src="/app-logo.jpg"
                alt="TGAT1 Quest Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-left">
              <span className="font-black text-xl tracking-tight text-white block">
                TGAT1 <span className="text-indigo-400">QUEST</span>
              </span>
              <span className="text-[11px] text-slate-400 block -mt-1">
                Password Recovery Service
              </span>
            </div>
          </Link>
        </div>

        {/* Card Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-indigo-950/40">
          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>รีเซ็ตรหัสผ่าน</span>
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </h1>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  ระบุอีเมลที่คุณใช้สมัครสมาชิก เราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปยังกล่องจดหมายของคุณ
                </p>
              </div>

              {!isConfigured && (
                <div className="mb-5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                  <div className="space-y-1">
                    <p className="font-bold">คำเตือน: ยังไม่ได้ตั้งค่า Firebase Keys ใน .env.local</p>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      ฟังก์ชันรีเซ็ตรหัสผ่านต้องใช้ Firebase Auth โปรดตรวจสอบไฟล์ .env.local เพื่อส่งอีเมลจริง
                    </p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div
                  role="alert"
                  className="mb-5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="reset-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    อีเมลบัญชีผู้เรียน (Email Address)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="reset-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="student@example.com"
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-60 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 disabled:opacity-50 transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>กำลังส่งลิงก์...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>ส่งลิงก์รีเซ็ตรหัสผ่าน</span>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State (Privacy-preserving confirmation) */
            <div className="text-center py-2 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                ส่งคำขอเรียบร้อยแล้ว
              </h2>
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed px-2">
                หากอีเมล <span className="font-semibold text-indigo-300">{submittedEmail}</span> มีอยู่ในระบบของเรา ระบบได้ส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปแล้ว โปรดตรวจสอบในกล่องข้อความหรือกล่องจดหมายขยะ (Spam)
              </p>

              <div className="mt-5 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-400 text-left space-y-1">
                <div className="font-semibold text-slate-300">💡 คำแนะนำเพิ่มเติม:</div>
                <p>• ลิงก์ในอีเมลมีอายุจำกัดเพื่อความปลอดภัย</p>
                <p>• หากไม่ได้รับอีเมลภายใน 5 นาที โปรดตรวจสอบการสะกดอีเมลแล้วลองใหม่อีกครั้ง</p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  ส่งอีกครั้ง
                </button>
                <Link
                  href="/login"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors inline-flex items-center justify-center"
                >
                  กลับไปหน้าเข้าสู่ระบบ
                </Link>
              </div>
            </div>
          )}

          {/* Account Types Note / Helper */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-400">
            <div className="flex items-start gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-300">ผู้ใช้งานบัญชี Google: </span>
                หากคุณสมัครใช้งานด้วย Google Sign-In คุณไม่จำเป็นต้องรีเซ็ตรหัสผ่าน สามารถกดปุ่มเข้าสู่ระบบด้วย Google ได้ทันที
              </div>
            </div>
            <div className="flex items-start gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-300">ผู้ใช้งานแบบผู้เยี่ยมชม (Guest): </span>
                บัญชีชั่วคราวไม่มีรหัสผ่าน หากต้องการเก็บประวัติการเรียนถาวร โปรดสมัครสมาชิกด้วยอีเมลหรือ Google ในหน้า Login
              </div>
            </div>
          </div>
        </div>

        {/* Back to Login Link */}
        <div className="text-center mt-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ย้อนกลับไปหน้าเข้าสู่ระบบ (Back to Login)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
