'use client';

import React, { useState } from 'react';
import {
  Coins,
  Flame,
  Award,
  Target,
  CheckCircle2,
  Cloud,
  X,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/AuthModal';

export function Header() {
  const { profile, levelInfo, claimQuest, isCloudSynced } = useUser();
  const { user } = useAuth();
  const [questModalOpen, setQuestModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const completedUnclaimedCount =
    profile?.dailyQuests.filter((q) => q.completed && !q.claimed).length || 0;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 text-slate-900 px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Left Side: Brand Logo for mobile & Subtitle for Desktop */}
        <div className="flex items-center gap-3">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center bg-indigo-50 border border-indigo-100 shadow-xs">
              <img src="/app-logo.jpg" alt="TGAT1 Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-slate-900">TGAT1 Quest</span>
          </div>

          <div className="hidden lg:block">
            <div className="text-[11px] text-slate-400 font-medium">เป้าหมายคะแนน TGAT1: 80+</div>
            <div className="text-sm font-bold text-slate-700">
              {profile?.rankTitle || 'กำลังโหลด...'}
            </div>
          </div>
        </div>

        {/* Right Side: Level, XP Bar, Coins, Daily Quests & Firebase Cloud Button */}
        {profile && levelInfo && (
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Level & XP Mini Bar */}
            <div className="flex items-center gap-2 bg-slate-100/70 px-2.5 py-1.5 rounded-full border border-slate-200/50">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-extrabold text-[11px] shadow-xs">
                {profile.level}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center justify-between text-[10px] gap-2 mb-0.5">
                  <span className="font-bold text-slate-700">Lv.{profile.level}</span>
                  <span className="text-slate-400 font-medium">
                    {levelInfo.currentLevelXp}/{levelInfo.xpNeededForNext} XP
                  </span>
                </div>
                <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Coins */}
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/60 text-amber-800 px-2.5 py-1.5 rounded-full text-xs font-bold">
              <Coins className="w-3.5 h-3.5 text-amber-500" />
              <span>{profile.coins}</span>
            </div>

            {/* Streak */}
            <div className="hidden md:flex items-center gap-1.5 bg-rose-50 border border-rose-200/60 text-rose-700 px-2.5 py-1.5 rounded-full text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>{profile.streak} วัน</span>
            </div>

            {/* Daily Quests Trigger Button */}
            <button
              onClick={() => setQuestModalOpen(true)}
              className="relative flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm shadow-indigo-500/20 transition-transform active:scale-95 cursor-pointer"
            >
              <Target className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ภารกิจ</span>
              {completedUnclaimedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center animate-bounce shadow-xs">
                  {completedUnclaimedCount}
                </span>
              )}
            </button>

            {/* Firebase Cloud Sync Button */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border transition-all active:scale-95 cursor-pointer ${
                user
                  ? 'bg-emerald-50 border-emerald-200/80 text-emerald-700 hover:bg-emerald-100/70'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
              title={
                user
                  ? `Firebase: ${user.email || 'Guest'} (${isCloudSynced ? 'ซิงค์ Firestore แล้ว' : 'กำลังซิงค์...'})`
                  : 'เชื่อมต่อ Firebase Cloud'
              }
            >
              <Cloud className={`w-3.5 h-3.5 ${isCloudSynced ? 'text-emerald-500' : 'text-amber-500'}`} />
              <span className="hidden sm:inline">
                {user ? (user.displayName || 'Online') : 'Firebase'}
              </span>
              {user && (
                <span
                  className={`w-2 h-2 rounded-full ${
                    isCloudSynced ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                  }`}
                  title={isCloudSynced ? 'ซิงค์บนคลาวด์แล้ว' : 'กำลังซิงค์'}
                />
              )}
            </button>
          </div>
        )}
      </header>

      {/* Daily Quests Modal */}
      {questModalOpen && profile && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setQuestModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">ภารกิจประจำวัน (Daily Quests)</h3>
                <p className="text-xs text-slate-500 font-medium">
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
                    className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-xs text-slate-900 flex items-center gap-1.5">
                          {quest.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                          <span>{quest.titleTh}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {quest.descriptionTh}
                        </div>
                      </div>

                      {/* Reward button or Status */}
                      <div>
                        {quest.claimed ? (
                          <span className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 bg-slate-100 rounded-full">
                            รับแล้ว ✓
                          </span>
                        ) : quest.completed ? (
                          <button
                            onClick={() => claimQuest(quest.id)}
                            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-full shadow-xs active:scale-95 transition-all animate-pulse cursor-pointer"
                          >
                            รับรางวัล (+{quest.rewardXp} XP)
                          </button>
                        ) : (
                          <span className="text-xs font-medium text-slate-500">
                            {quest.current}/{quest.target}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          quest.completed ? 'bg-emerald-400' : 'bg-indigo-400'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1 text-indigo-600">
                        <Award className="w-3 h-3 text-indigo-500" /> +{quest.rewardXp} XP
                      </span>
                      <span className="flex items-center gap-1 text-amber-600">
                        <Coins className="w-3 h-3 text-amber-500" /> +{quest.rewardCoins} Coins
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setQuestModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-full cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Firebase Cloud Sync Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
