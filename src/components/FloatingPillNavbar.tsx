'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  MessageSquareText,
  Award,
  BookmarkCheck,
  LineChart,
  Lock,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
  {
    name: 'หน้าหลัก',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'บัตรคำ SRS',
    href: '/vocab',
    icon: BookOpen,
    showBadgeDue: true,
  },
  {
    name: 'สนทนา',
    href: '/conversation',
    icon: MessageSquareText,
  },
  {
    name: 'จำลองสอบ',
    href: '/mock-exam',
    icon: Award,
  },
  {
    name: 'คลังของฉัน',
    href: '/collection',
    icon: BookmarkCheck,
  },
  {
    name: 'จุดอ่อน',
    href: '/progress',
    icon: LineChart,
  },
];

export function FloatingPillNavbar() {
  const pathname = usePathname();
  const { dueCount } = useUser();
  const { user } = useAuth();
  const isGuest = Boolean(user?.isAnonymous);

  return (
    <nav className="lg:hidden fixed bottom-4 left-3 right-3 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-white/90 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-2 py-2 flex items-center justify-around gap-1 max-w-md w-full">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const isRestrictedForGuest = isGuest && item.href !== '/vocab';
          const Icon = item.icon;

          if (isRestrictedForGuest) {
            return (
              <div
                key={item.href}
                title="ผู้เยี่ยมชมใช้งานได้เฉพาะบัตรคำ"
                className="flex flex-col items-center justify-center py-1.5 px-2 rounded-full text-slate-300 opacity-40 select-none cursor-not-allowed"
              >
                <div className="relative">
                  <Icon className="w-5 h-5 text-slate-400" />
                  <Lock className="w-2.5 h-2.5 text-slate-400 absolute -top-1 -right-1" />
                </div>
                <span className="text-[10px] mt-0.5 font-medium">{item.name}</span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2.5 rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600 font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-indigo-600' : 'text-slate-500'
                  }`}
                />
                {item.showBadgeDue && dueCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-amber-400 text-slate-900 shadow-xs animate-pulse">
                    {dueCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

