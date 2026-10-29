'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Coins,
  Flame,
  Award,
  Menu,
  X,
  Target,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  MessageSquareText,
  Sparkles,
  BookmarkCheck,
  LineChart,
  LayoutDashboard,
  Sword,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

export function Header() {
  const { profile, levelInfo, claimQuest, dueCount } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [questModalOpen, setQuestModalOpen] = useState(false);
  const pathname = usePathname();

  const completedUnclaimedCount =
    profile?.dailyQuests.filter((q) => q.completed && !q.claimed).length || 0;

  const mobileNavItems = [
    { name: 'หน้าหลัก', href: '/', icon: LayoutDashboard },
    { name: 'Vocabulary Arena', href: '/vocab', icon: BookOpen, badge: dueCount },
    { name: 'Conversation Quest', href: '/conversation', icon: MessageSquareText },
    { name: 'Expression Bank', href: '/expressions', icon: Sparkles },
    { name: 'My Collection', href: '/collection', icon: BookmarkCheck },
    { name: 'วิเคราะห์ผล & จุดอ่อน', href: '/progress', icon: LineChart },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Left Side: Mobile Menu Button & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sword className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-tight">TGAT1 Quest</span>
          </div>

          <div className="hidden lg:block">
            <div className="text-xs text-slate-400">เป้าหมายคะแนน TGAT1: 80+</div>
            <div className="text-sm font-semibold text-slate-200">
              {profile?.rankTitle || 'กำลังโหลด...'}
            </div>
          </div>
        </div>

        {/* Right Side: Level, XP Bar, Coins, Daily Quests Button */}
        {profile && levelInfo && (
          <div className="flex items-center gap-3 md:gap-5">
            {/* Level & XP Mini Bar */}
            <div className="flex items-center gap-2.5 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-extrabold text-xs shadow-inner">
                {profile.level}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center justify-between text-[11px] gap-2 mb-1">
                  <span className="font-semibold text-slate-200">Level {profile.level}</span>
                  <span className="text-slate-400">
                    {levelInfo.currentLevelXp}/{levelInfo.xpNeededForNext} XP
                  </span>
                </div>
                <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 px-2.5 py-1.5 rounded-xl text-xs font-bold">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{profile.coins}</span>
            </div>

            {/* Streak */}
            <div className="hidden md:flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 px-2.5 py-1.5 rounded-xl text-xs font-bold">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>{profile.streak} วัน</span>
            </div>

            {/* Daily Quests Trigger Button */}
            <button
              onClick={() => setQuestModalOpen(true)}
              className="relative flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-transform active:scale-95"
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Daily Quests</span>
              {completedUnclaimedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 text-slate-950 rounded-full text-[10px] font-extrabold flex items-center justify-center animate-bounce">
                  {completedUnclaimedCount}
                </span>
              )}
            </button>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden flex">
          <div className="w-72 bg-slate-900 h-full p-4 flex flex-col justify-between border-r border-slate-800">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <Sword className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-white">TGAT1 Quest</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-1">
                {mobileNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {typeof item.badge === 'number' && item.badge > 0 && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500 text-slate-950 font-bold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 text-center">
              Level {profile?.level} • {profile?.rankTitle}
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Daily Quests Modal */}
      {questModalOpen && profile && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setQuestModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">ภารกิจประจำวัน (Daily Quests)</h3>
                <p className="text-xs text-slate-400">
                  ทำภารกิจเพื่อรับ XP และเหรียญ (รีเซ็ตทุกเที่ยงคืน)
                </p>
              </div>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {profile.dailyQuests.map((quest) => {
                const percent = Math.min(100, Math.floor((quest.current / quest.target) * 100));
                return (
                  <div
                    key={quest.id}
                    className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-xs text-slate-100 flex items-center gap-1.5">
                          {quest.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                          <span>{quest.titleTh}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {quest.descriptionTh}
                        </div>
                      </div>

                      {/* Reward button or Status */}
                      <div>
                        {quest.claimed ? (
                          <span className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 bg-slate-700/60 rounded-lg">
                            รับแล้ว ✓
                          </span>
                        ) : quest.completed ? (
                          <button
                            onClick={() => claimQuest(quest.id)}
                            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg shadow-md shadow-emerald-500/20 transition-all active:scale-95 animate-pulse"
                          >
                            รับรางวัล (+{quest.rewardXp} XP)
                          </button>
                        ) : (
                          <span className="text-xs font-medium text-slate-400">
                            {quest.current}/{quest.target}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          quest.completed ? 'bg-emerald-400' : 'bg-indigo-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 text-indigo-300">
                        <Award className="w-3 h-3 text-indigo-400" /> +{quest.rewardXp} XP
                      </span>
                      <span className="flex items-center gap-1 text-amber-300">
                        <Coins className="w-3 h-3 text-amber-400" /> +{quest.rewardCoins} Coins
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setQuestModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

