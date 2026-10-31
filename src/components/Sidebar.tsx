'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  MessageSquareText,
  Sparkles,
  BookmarkCheck,
  LineChart,
  Flame,
  Award,
  ChevronRight,
  UserCheck,
  Lock,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
  {
    name: 'แดชบอร์ดหลัก',
    subtitle: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Vocabulary Arena',
    subtitle: 'ฝึกบัตรคำ SRS',
    href: '/vocab',
    icon: BookOpen,
    showBadgeDue: true,
  },
  {
    name: 'Conversation Quest',
    subtitle: 'ข้อสอบ & Story Mode',
    href: '/conversation',
    icon: MessageSquareText,
  },
  {
    name: 'Mock Exam Simulator',
    subtitle: 'จำลองสอบจริง 60 ข้อ',
    href: '/mock-exam',
    icon: Award,
  },
  {
    name: 'Expression Bank',
    subtitle: 'คลังสำนวนออกสอบ',
    href: '/expressions',
    icon: Sparkles,
  },
  {
    name: 'My Collection',
    subtitle: 'คลังส่วนตัวของฉัน',
    href: '/collection',
    icon: BookmarkCheck,
  },
  {
    name: 'วิเคราะห์ผล & จุดอ่อน',
    subtitle: 'Mistakes & Progress',
    href: '/progress',
    icon: LineChart,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { dueCount, profile } = useUser();
  const { user } = useAuth();
  const isGuest = Boolean(user?.isAnonymous);

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-slate-200 text-slate-700 select-none shrink-0 h-screen sticky top-0 shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
      {/* Brand Logo */}
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl overflow-hidden flex items-center justify-center shadow-sm shadow-indigo-500/10 group-hover:scale-105 transition-transform bg-indigo-50 border border-indigo-100">
            <img src="/app-logo.jpg" alt="TGAT1 Quest Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
              <span>TGAT1 Quest</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                PRO
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">English Exam Prep</div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          ภารกิจการเรียนรู้
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const isRestrictedForGuest = isGuest && item.href !== '/vocab';
          const Icon = item.icon;

          if (isRestrictedForGuest) {
            return (
              <div
                key={item.href}
                title="โหมดผู้เยี่ยมชม: เข้าถึงได้เฉพาะ Vocabulary Flashcard"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-medium text-xs text-slate-300 opacity-60 cursor-not-allowed select-none bg-slate-50/50"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="leading-tight font-semibold text-slate-400">{item.name}</div>
                    <div className="text-[10px] text-slate-400">{item.subtitle}</div>
                  </div>
                </div>
                <Lock className="w-3.5 h-3.5 text-slate-400" />
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-medium text-xs transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <div>
                  <div className="leading-tight font-semibold">{item.name}</div>
                  <div className={`text-[10px] ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {item.subtitle}
                  </div>
                </div>
              </div>

              {item.showBadgeDue && dueCount > 0 && (
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                  isActive ? 'bg-amber-300 text-slate-900' : 'bg-amber-100 text-amber-800'
                } animate-pulse`}>
                  {dueCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Gamification Mini Widget */}
      {profile && (
        <div className="p-3.5 mx-3 mb-2 rounded-2xl bg-slate-50/80 border border-slate-200 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" /> สตรีคต่อเนื่อง
            </span>
            <span className="font-bold text-amber-600">{profile.streak} วัน</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-500" /> ฉายาปัจจุบัน
            </span>
          </div>
          <div className="text-[11px] font-semibold text-indigo-600 truncate mt-0.5">
            {profile.rankTitle}
          </div>
        </div>
      )}

      {/* User Account / Cloud Sync Link */}
      <div className="px-3 pb-3">
        <Link
          href="/login"
          className={`w-full p-2.5 rounded-2xl border flex items-center justify-between text-xs transition-all ${
            user
              ? 'bg-emerald-50/70 border-emerald-200/60 text-emerald-800 hover:bg-emerald-100/70'
              : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center text-white shrink-0 shadow-xs">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <div className="truncate text-left">
              <div className="font-bold text-[11px] text-slate-900 truncate">
                {user ? (user.displayName || user.email || 'ผู้ใช้งาน') : 'เข้าสู่ระบบ Cloud'}
              </div>
              <div className="text-[10px] text-slate-400">
                {user ? 'Firebase Synced' : 'Google / Email'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        </Link>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-200 text-[11px] text-slate-400 text-center font-medium">
        เตรียมสอบ TGAT1 การสื่อสารภาษาอังกฤษ
      </div>
    </aside>
  );
}
