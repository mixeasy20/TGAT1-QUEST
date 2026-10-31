'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

interface GuestRestrictionNoticeProps {
  featureName: string;
  description?: string;
}

export function GuestRestrictionNotice({
  featureName,
  description = 'โหมดผู้เยี่ยมชม (Guest Mode) เปิดให้ทดลองใช้งานเฉพาะส่วน Flashcard (Vocabulary Arena) เท่านั้น',
}: GuestRestrictionNoticeProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-xl shadow-2xl shadow-indigo-950/40 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-indigo-500/15 blur-3xl pointer-events-none" />

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
          <Lock className="w-8 h-8" />
        </div>

        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 mb-2">
          Guest Mode Restriction
        </span>

        <h3 className="text-xl font-black text-white tracking-tight">
          ปลดล็อก {featureName}
        </h3>

        <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
          {description}
        </p>

        <div className="mt-5 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-300 text-left space-y-1.5">
          <div className="font-semibold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> สิทธิประโยชน์เมื่อเข้าสู่ระบบ:
          </div>
          <p>• ทำข้อสอบ Conversation Exam & Story Quest ครบทุกด่าน</p>
          <p>• ใช้งาน Expression Bank & My Collection คลังส่วนตัว</p>
          <p>• วิเคราะห์จุดอ่อนใน Mistake Notebook & ซิงก์ข้อมูลคลาวด์</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <Link
            href="/vocab"
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>ไปที่ Flashcard</span>
          </Link>
          <Link
            href="/login"
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 inline-flex items-center justify-center gap-1.5"
          >
            <span>เข้าสู่ระบบ / สมัคร</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
