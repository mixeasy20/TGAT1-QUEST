
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  MessageSquareText,
  Sparkles,
  BookmarkCheck,
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
  const { profile, levelInfo, dueCount, claimQuest } = useUser();
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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/20 p-6 md:p-8">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>TGAT1 Quest • ศูนย์บัญชาการการเรียนรู้</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              สวัสดี, <span className="text-indigo-400">{profile?.name || 'TGAT Challenger'}</span>!
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              ภารกิจวันนี้: ทบทวนคำศัพท์ที่ถึงกำหนด และฝึกข้อสอบ Conversation เพื่อพิชิตเป้าหมาย TGAT1 80+ คะแนน
            </p>
          </div>

          {/* Quick Action in Hero */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/vocab"
              className="btn-flourish shine-sweep inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Brain className="w-4 h-4" />
              <span>ทบทวนคำศัพท์ทันที ({dueCount})</span>
            </Link>
            <Link
              href="/conversation"
              className="btn-flourish inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all hover:scale-105 active:scale-95"
            >
              <MessageSquareText className="w-4 h-4 text-emerald-400" />
              <span>ทำข้อสอบ Exam Mode</span>
            </Link>
          </div>
        </div>

        {/* Ambient background blur */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Due Review */}
        <div className="card-hover-lift p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">คำศัพท์ที่ต้องทบทวนวันนี้</div>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">{dueCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">ระบบคำนวณจาก SRS</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <Brain className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Mastered Words */}
        <div className="card-hover-lift p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">คำศัพท์ที่จำได้แม่นยำ</div>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">
              {masteredCount} <span className="text-xs text-slate-400">/ {totalVocabCount}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">สถานะ Mastered</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Overall Accuracy */}
        <div className="card-hover-lift p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">ความแม่นยำรวม</div>
            <div className="text-2xl font-extrabold text-indigo-400 mt-1">
              {totalAnswered > 0 ? `${overallAccuracy}%` : 'ยังไม่มีข้อมูล'}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">ตอบไปแล้ว {totalAnswered} ข้อ</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Mistakes to review */}
        <div className="card-hover-lift p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">จุดผิดพลาดค้างทบทวน</div>
            <div className="text-2xl font-extrabold text-rose-400 mt-1">
              {unresolvedMistakes.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">ใน Mistake Notebook</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Quests & SRS due cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1 & 2: Daily Quests & SRS Spotlight */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Quests Section */}
          <div className="p-5 md:p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-bold text-white">ภารกิจประจำวัน (Daily Quests)</h2>
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
                    className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                  >
                    <div className="flex-1 w-full">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                        <span className="flex items-center gap-2">
                          {quest.completed && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
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

                      <div className="w-full h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            quest.completed ? 'bg-emerald-400' : 'bg-indigo-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="shrink-0 self-end md:self-center">
                      {quest.claimed ? (
                        <span className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 bg-slate-800 border border-slate-700">
                          รับรางวัลแล้ว ✓
                        </span>
                      ) : quest.completed ? (
                        <button
                          onClick={() => claimQuest(quest.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-95 transition-all animate-pulse"
                        >
                          รับ +{quest.rewardXp} XP
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
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
              className="group p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                  Vocabulary Arena
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  บัตรคำศัพท์ 3 มิติ ระบบจำระยะยาว Spaced Repetition
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs text-indigo-400 font-semibold gap-1 group-hover:translate-x-1 transition-transform">
                <span>เข้าสู่ Arena</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/conversation"
              className="group p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 mb-3 group-hover:scale-110 transition-transform">
                  <MessageSquareText className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                  Conversation Quest
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Exam Mode (Short & Long) และ Story Mode สถานการณ์จริง
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs text-emerald-400 font-semibold gap-1 group-hover:translate-x-1 transition-transform">
                <span>เริ่มทำโจทย์</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/expressions"
              className="group p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 mb-3 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                  Expression Bank
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  คลังสำนวน วลีพูด และเจตนาผู้พูดที่ออกสอบบ่อย
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs text-amber-400 font-semibold gap-1 group-hover:translate-x-1 transition-transform">
                <span>เปิดคลังสำนวน</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Column 3: SRS Due Spotlight & Mistakes Summary */}
        <div className="space-y-6">
          {/* Due Review Spotlight */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Brain className="w-4 h-4 text-amber-400" />
                  <span>คำศัพท์ถึงกำหนดทบทวน</span>
                </h3>
                <span className="text-xs font-bold text-amber-400">{dueCount} คำ</span>
              </div>

              {dueCards.length > 0 ? (
                <div className="space-y-2 mt-3">
                  {dueCards.map((vocab) => (
                    <div
                      key={vocab.id}
                      className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-sm text-slate-100 flex items-center gap-2">
                          <span>{vocab.word}</span>
                          <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                            {vocab.partOfSpeech}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{vocab.meaningTh}</div>
                      </div>
                      <button
                        onClick={() => speakEnglish(vocab.word)}
                        className="p-1.5 rounded-lg bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600 transition-colors"
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
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold text-center transition-colors block"
            >
              เปิดโหมดฝึก Flashcards ({dueCount})
            </Link>
          </div>

          {/* Unresolved Mistakes Widget */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>ข้อผิดพลาดรอทบทวน</span>
              </h3>
              <span className="text-xs font-bold text-rose-400">
                {unresolvedMistakes.length} ข้อ
              </span>
            </div>

            {unresolvedMistakes.length > 0 ? (
              <div className="space-y-2 mt-3">
                {unresolvedMistakes.slice(0, 3).map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs"
                  >
                    <div className="font-semibold text-rose-200 line-clamp-1">{m.questionText}</div>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {m.skillCategory}
                      </span>
                      <span className="text-rose-400">ตอบผิด: {m.userAnswer}</span>
                    </div>
                  </div>
                ))}
                <Link
                  href="/progress"
                  className="mt-3 block text-center text-xs font-semibold text-rose-400 hover:text-rose-300 py-1.5"
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
