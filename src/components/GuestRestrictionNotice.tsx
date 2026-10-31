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
      <div className="max-w-md w-full bg-white/90 border border-slate-200/80 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-xl shadow-xl shadow-slate-200/50 relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-indigo-500/10 blur-3xl pointer-events-none" />

        {/* Icon */}
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 text-indigo-500 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Lock className="w-8 h-8" />
        </div>

        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 mb-2">
          Guest Mode Restriction
        </span>

        <h3 className="text-xl font-black text-slate-800 tracking-tight">
          ปลดล็อก {featureName}
        </h3>

        <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
          {description}
        </p>

        <div className="mt-5 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 text-[11px] text-slate-600 text-left space-y-1.5">
          <div className="font-semibold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> สิทธิประโยชน์เมื่อเข้าสู่ระบบ:
          </div>
          <p>• ทำข้อสอบ Conversation Exam & Story Quest ครบทุกด่าน</p>
          <p>• ใช้งาน Expression Bank & My Collection คลังส่วนตัว</p>
          <p>• วิเคราะห์จุดอ่อนใน Mistake Notebook & ซิงก์ข้อมูลคลาวด์</p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <Link
            href="/vocab"
            className="flex-1 py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>ไปที่ Flashcard</span>
          </Link>
          <Link
            href="/login"
            className="flex-1 py-2.5 px-4 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-sm shadow-indigo-500/30 inline-flex items-center justify-center gap-1.5"
          >
            <span>เข้าสู่ระบบ / สมัคร</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
