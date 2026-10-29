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
  Sword,
  Flame,
  Award,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

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

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-slate-900 border-r border-slate-800 text-slate-200 select-none shrink-0 h-screen sticky top-0">
      {/* Brand Logo */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Sword className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              <span>TGAT1 Quest</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                PRO
              </span>
            </div>
            <div className="text-[11px] text-slate-400">English Exam Prep</div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-300">
          ภารกิจการเรียนรู้
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <div>
                  <div className="leading-tight font-semibold">{item.name}</div>
                  <div className={`text-[10px] ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {item.subtitle}
                  </div>
                </div>
              </div>

              {item.showBadgeDue && dueCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-slate-950 animate-pulse">
                  {dueCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Gamification Mini Widget */}
      {profile && (
        <div className="p-3 mx-3 mb-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" /> สตรีคต่อเนื่อง
            </span>
            <span className="font-bold text-amber-400">{profile.streak} วัน</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-emerald-400" /> ฉายาปัจจุบัน
            </span>
          </div>
          <div className="text-[10px] font-medium text-indigo-300 truncate mt-0.5">
            {profile.rankTitle}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
        เตรียมสอบ TGAT1 การสื่อสารภาษาอังกฤษ
      </div>
    </aside>
  );
}

