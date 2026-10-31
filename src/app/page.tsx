'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  MessageSquareText,
  Sparkles,
  Target,
  ArrowRight,
  TrendingUp,
  Brain,
  AlertCircle,
  CheckCircle2,
  Trophy,
  Volume2,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';
import { GuestRestrictionNotice } from '@/components/GuestRestrictionNotice';
import {
  getVocabList,
  getSRSList,
  getMistakes,
  getPracticeSessions,
  getDueVocabItems,
} from '@/lib/storage';
import { VocabItem, MistakeRecord } from '@/types';
import { speakEnglish } from '@/lib/audio';

export default function DashboardPage() {
  const { user } = useAuth();
  const { profile, dueCount, claimQuest } = useUser();
  const isGuest = Boolean(user?.isAnonymous);
  const [totalVocabCount, setTotalVocabCount] = useState(0);
  const [masteredCount, setMasteredCount] = useState(0);
  const [unresolvedMistakes, setUnresolvedMistakes] = useState<MistakeRecord[]>([]);
  const [dueCards, setDueCards] = useState<VocabItem[]>([]);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [overallAccuracy, setOverallAccuracy] = useState(0);

  useEffect(() => {
    const vocabs = getVocabList();
    const srs = getSRSList();
    const mistakes = getMistakes();
    const sessions = getPracticeSessions();
    const due = getDueVocabItems();

    setTotalVocabCount(vocabs.length);
    setMasteredCount(srs.filter((s) => s.status === 'mastered').length);
    setUnresolvedMistakes(mistakes.filter((m) => !m.resolved));
    setDueCards(due.slice(0, 3).map((d) => d.vocab));

    let answered = 0;
    let correct = 0;
    sessions.forEach((s) => {
      answered += s.totalQuestions;
      correct += s.score;
    });

    setTotalAnswered(answered);
    setOverallAccuracy(answered > 0 ? Math.round((correct / answered) * 100) : 0);
  }, [profile]);

  const completedQuests = profile?.dailyQuests.filter((q) => q.completed).length || 0;
  const totalQuests = profile?.dailyQuests.length || 4;

  if (isGuest) {
    return (
      <GuestRestrictionNotice
        featureName="แดชบอร์ดหลัก (Dashboard)"
        description="ในโหมดผู้เยี่ยมชม คุณสามารถเข้าใช้งานได้เฉพาะส่วน Flashcard (Vocabulary Arena) เพื่อทดลองท่องคำศัพท์เท่านั้น สมัครสมาชิกหรือเข้าสู่ระบบเพื่อใช้งานแดชบอร์ดและฟังก์ชันเต็มรูปแบบ"
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-50/70 via-purple-50/40 to-white border border-slate-200/70 p-6 md:p-8 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-3">
              <Trophy className="w-3.5 h-3.5 text-indigo-500" />
              <span>TGAT1 Quest • ศูนย์บัญชาการการเรียนรู้</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              สวัสดี, <span className="text-indigo-600">{profile?.name || 'TGAT Challenger'}</span>!
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              ภารกิจวันนี้: ทบทวนคำศัพท์ที่ถึงกำหนด และฝึกข้อสอบ Conversation เพื่อพิชิตเป้าหมาย TGAT1 80+ คะแนน
            </p>
          </div>

          {/* Quick Action in Hero */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/vocab"
              className="btn-flourish shine-sweep inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs shadow-sm shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Brain className="w-4 h-4" />
              <span>ทบทวนคำศัพท์ ({dueCount})</span>
            </Link>
            <Link
              href="/conversation"
              className="btn-flourish inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 font-semibold text-xs transition-all hover:scale-105 active:scale-95 shadow-2xs"
            >
              <MessageSquareText className="w-4 h-4 text-emerald-500" />
              <span>ทำข้อสอบ Exam</span>
            </Link>
          </div>
        </div>

        {/* Ambient background blur */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Due Review */}
        <div className="card-hover-lift p-4 rounded-3xl bg-white border border-amber-100/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">คำศัพท์ที่ต้องทบทวนวันนี้</div>
            <div className="text-2xl font-extrabold text-amber-500 mt-1">{dueCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">ระบบคำนวณจาก SRS</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100">
            <Brain className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Mastered Words */}
        <div className="card-hover-lift p-4 rounded-3xl bg-white border border-emerald-100/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">คำศัพท์ที่จำได้แม่นยำ</div>
            <div className="text-2xl font-extrabold text-emerald-500 mt-1">
              {masteredCount} <span className="text-xs text-slate-400 font-normal">/ {totalVocabCount}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">สถานะ Mastered</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Overall Accuracy */}
        <div className="card-hover-lift p-4 rounded-3xl bg-white border border-indigo-100/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">ความแม่นยำรวม</div>
            <div className="text-2xl font-extrabold text-indigo-500 mt-1">
              {totalAnswered > 0 ? `${overallAccuracy}%` : 'ยังไม่มีข้อมูล'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">ตอบไปแล้ว {totalAnswered} ข้อ</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center border border-indigo-100">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Mistakes to review */}
        <div className="card-hover-lift p-4 rounded-3xl bg-white border border-rose-100/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">จุดผิดพลาดค้างทบทวน</div>
            <div className="text-2xl font-extrabold text-rose-500 mt-1">
              {unresolvedMistakes.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">ใน Mistake Notebook</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Quests & SRS due cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1 & 2: Daily Quests & SRS Spotlight */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Quests Section */}
          <div className="p-5 md:p-6 rounded-3xl bg-white border border-slate-200/70 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-500" />
                <h2 className="text-base font-bold text-slate-800">ภารกิจประจำวัน (Daily Quests)</h2>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                สำเร็จแล้ว {completedQuests} / {totalQuests}
              </span>
            </div>

            <div className="space-y-3">
              {profile?.dailyQuests.map((quest) => {
                const percent = Math.min(100, Math.floor((quest.current / quest.target) * 100));
                return (
                  <div
                    key={quest.id}
                    className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                  >
                    <div className="flex-1 w-full">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span className="flex items-center gap-2">
                          {quest.completed && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                          <span>{quest.titleTh}</span>
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          {quest.current} / {quest.target}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {quest.descriptionTh}
                      </div>

                      <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            quest.completed ? 'bg-emerald-400' : 'bg-indigo-400'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="shrink-0 self-end md:self-center">
                      {quest.claimed ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-slate-400 bg-slate-100">
                          รับรางวัลแล้ว ✓
                        </span>
                      ) : quest.completed ? (
                        <button
                          onClick={() => claimQuest(quest.id)}
                          className="px-3.5 py-1 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-all animate-pulse cursor-pointer"
                        >
                          รับ +{quest.rewardXp} XP
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                          +{quest.rewardXp} XP • +{quest.rewardCoins} C
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Shortcuts to Core Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/vocab"
              className="group p-4 rounded-3xl bg-white border border-slate-200/70 hover:border-indigo-200 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center border border-indigo-100 mb-3 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors">
                  Vocabulary Arena
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  บัตรคำศัพท์ 3 มิติ ระบบจำระยะยาว Spaced Repetition
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs text-indigo-500 font-semibold gap-1 group-hover:translate-x-1 transition-transform">
                <span>เข้าสู่ Arena</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/conversation"
              className="group p-4 rounded-3xl bg-white border border-slate-200/70 hover:border-emerald-200 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 mb-3 group-hover:scale-105 transition-transform">
                  <MessageSquareText className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-emerald-600 transition-colors">
                  Conversation Quest
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Exam Mode (Short & Long) และ Story Mode สถานการณ์จริง
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs text-emerald-500 font-semibold gap-1 group-hover:translate-x-1 transition-transform">
                <span>เริ่มทำโจทย์</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/expressions"
              className="group p-4 rounded-3xl bg-white border border-slate-200/70 hover:border-amber-200 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100 mb-3 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-amber-600 transition-colors">
                  Expression Bank
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  คลังสำนวน วลีพูด และเจตนาผู้พูดที่ออกสอบบ่อย
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs text-amber-500 font-semibold gap-1 group-hover:translate-x-1 transition-transform">
                <span>เปิดคลังสำนวน</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Column 3: SRS Due Spotlight & Mistakes Summary */}
        <div className="space-y-6">
          {/* Due Review Spotlight */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/70 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-amber-500" />
                  <span>คำศัพท์ถึงกำหนดทบทวน</span>
                </h3>
                <span className="text-xs font-bold text-amber-600">{dueCount} คำ</span>
              </div>

              {dueCards.length > 0 ? (
                <div className="space-y-2 mt-3">
                  {dueCards.map((vocab) => (
                    <div
                      key={vocab.id}
                      className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                          <span>{vocab.word}</span>
                          <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                            {vocab.partOfSpeech}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{vocab.meaningTh}</div>
                      </div>
                      <button
                        onClick={() => speakEnglish(vocab.word)}
                        className="p-2 rounded-full bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200/60 transition-colors cursor-pointer"
                        title="ฟังเสียงอ่าน"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs">
                  🎉 ยอดเยี่ยม! ไม่มีคำศัพท์ค้างทบทวนในเวลานี้
                </div>
              )}
            </div>

            <Link
              href="/vocab"
              className="mt-4 w-full py-2.5 px-3 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/60 text-xs font-semibold text-center transition-colors block"
            >
              เปิดโหมดฝึก Flashcards ({dueCount})
            </Link>
          </div>

          {/* Unresolved Mistakes Widget */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200/70 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>ข้อผิดพลาดรอทบทวน</span>
              </h3>
              <span className="text-xs font-bold text-rose-500">
                {unresolvedMistakes.length} ข้อ
              </span>
            </div>

            {unresolvedMistakes.length > 0 ? (
              <div className="space-y-2 mt-3">
                {unresolvedMistakes.slice(0, 3).map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs"
                  >
                    <div className="font-semibold text-slate-800 line-clamp-1">{m.questionText}</div>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                      <span className="px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200/60">
                        {m.skillCategory}
                      </span>
                      <span className="text-rose-600 font-medium">ตอบผิด: {m.userAnswer}</span>
                    </div>
                  </div>
                ))}
                <Link
                  href="/progress"
                  className="mt-3 block text-center text-xs font-semibold text-rose-500 hover:text-rose-600 py-1.5"
                >
                  ดูสมุดบันทึกข้อผิดพลาดทั้งหมด →
                </Link>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                ยังไม่มีข้อผิดพลาดที่ค้างอยู่ เริ่มทำข้อสอบเพื่อเก็บสถิติ!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
