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
    name: 'บัตรคำ',
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
    name: 'คลัง',
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
    <nav className="lg:hidden fixed bottom-2 left-2 right-2 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.12)] rounded-full px-1.5 py-1 flex items-center justify-between max-w-sm w-full">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const isRestrictedForGuest = isGuest && item.href !== '/vocab';
          const Icon = item.icon;

          if (isRestrictedForGuest) {
            return (
              <div
                key={item.href}
                className="flex-1 flex flex-col items-center justify-center py-1 rounded-full text-slate-300 opacity-40 select-none cursor-not-allowed"
              >
                <div className="relative">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <Lock className="w-2 h-2 text-slate-400 absolute -top-1 -right-1" />
                </div>
                <span className="text-[9px] mt-0.5 leading-none font-medium">{item.name}</span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-full transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'scale-110 text-indigo-600 stroke-[2.5]' : 'text-slate-500'
                  }`}
                />
                {item.showBadgeDue && dueCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1 py-0 text-[8px] font-bold rounded-full bg-amber-400 text-slate-900 shadow-xs animate-pulse leading-tight">
                    {dueCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] mt-0.5 leading-none tracking-tight truncate ${
                  isActive ? 'text-indigo-700 font-black' : 'text-slate-600'
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
