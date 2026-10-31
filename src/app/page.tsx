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
  ExternalLink,
  MessageCircleHeart,
  Code2,
  Sliders,
  Check,
  Flame,
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

  // Target Score Customizer
  const [targetScore, setTargetScore] = useState<number>(80);
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [tempScore, setTempScore] = useState<number>(80);

  useEffect(() => {
    // Load stored target score or default 80
    const stored = localStorage.getItem('tgat1_target_score');
    if (stored) {
      const val = parseInt(stored, 10);
      if (!isNaN(val)) {
        setTargetScore(val);
        setTempScore(val);
      }
    }

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

  const handleSaveTarget = () => {
    setTargetScore(tempScore);
    localStorage.setItem('tgat1_target_score', tempScore.toString());
    setIsEditingTarget(false);
  };

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
      {/* Hero Welcome Banner with Target Score Setter */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-50/90 via-purple-50/60 to-white border border-indigo-100 p-6 md:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5 text-indigo-600" />
              <span>TGAT1 Quest • ศูนย์บัญชาการการเรียนรู้</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              สวัสดี, <span className="text-indigo-600">{profile?.name || 'TGAT Challenger'}</span>!
            </h1>
            
            <p className="text-sm font-medium text-slate-700 max-w-xl">
              ภารกิจวันนี้: ทบทวนคำศัพท์ที่ถึงกำหนด และฝึกข้อสอบ Conversation เพื่อพิชิตเป้าหมายคะแนนของคุณ
            </p>

            {/* Target Score Customizer Pill */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white border border-indigo-200 shadow-xs text-xs">
                <Target className="w-4 h-4 text-rose-500" />
                <span className="font-semibold text-slate-700">เป้าหมายคะแนน TGAT1 ของคุณ:</span>
                
                {isEditingTarget ? (
                  <div className="flex items-center gap-1.5 ml-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={tempScore}
                      onChange={(e) => setTempScore(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                      className="w-14 px-1.5 py-0.5 border border-indigo-400 rounded-lg text-center font-bold text-slate-900 text-xs focus:outline-none"
                    />
                    <span className="text-slate-600 font-bold">/ 100</span>
                    <button
                      onClick={handleSaveTarget}
                      className="p-1 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors cursor-pointer"
                      title="บันทึกเป้าหมาย"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 ml-1">
                    <span className="font-black text-sm text-indigo-600">{targetScore} / 100 คะแนน</span>
                    <button
                      onClick={() => setIsEditingTarget(true)}
                      className="text-[11px] text-slate-500 hover:text-indigo-600 underline font-semibold cursor-pointer"
                    >
                      ปรับเปลี่ยน
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action in Hero */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/vocab"
              className="btn-flourish shine-sweep inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Brain className="w-4 h-4" />
              <span>ทบทวนคำศัพท์ ({dueCount})</span>
            </Link>
            <Link
              href="/conversation"
              className="btn-flourish inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs transition-all hover:scale-105 active:scale-95 shadow-xs"
            >
              <MessageSquareText className="w-4 h-4 text-emerald-600" />
              <span>ทำข้อสอบ Exam</span>
            </Link>
          </div>
        </div>

        {/* Ambient background blur */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Due Review */}
        <div className="card-hover-lift p-4 rounded-3xl bg-white border border-amber-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-600 font-bold">คำศัพท์ต้องทบทวนวันนี้</div>
            <div className="text-2xl font-black text-amber-600 mt-1">{dueCount}</div>
            <div className="text-[11px] text-slate-500 mt-0.5 font-medium">ระบบคำนวณจาก SRS</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center border border-amber-200">
            <Brain className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Mastered Words */}
        <div className="card-hover-lift p-4 rounded-3xl bg-white border border-emerald-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-600 font-bold">คำศัพท์ที่จำได้แม่นยำ</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">
              {masteredCount} <span className="text-xs text-slate-500 font-normal">/ {totalVocabCount}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 font-medium">สถานะ Mastered</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Overall Accuracy */}
        <div className="card-hover-lift p-4 rounded-3xl bg-white border border-indigo-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-600 font-bold">ความแม่นยำรวม</div>
            <div className="text-2xl font-black text-indigo-600 mt-1">
              {totalAnswered > 0 ? `${overallAccuracy}%` : 'ยังไม่มีข้อมูล'}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 font-medium">ตอบไปแล้ว {totalAnswered} ข้อ</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center border border-indigo-200">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Mistakes to review */}
        <div className="card-hover-lift p-4 rounded-3xl bg-white border border-rose-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-600 font-bold">จุดผิดพลาดค้างทบทวน</div>
            <div className="text-2xl font-black text-rose-600 mt-1">
              {unresolvedMistakes.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 font-medium">ใน Mistake Notebook</div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-rose-100/70 text-rose-600 flex items-center justify-center border border-rose-200">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Quests & SRS due cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1 & 2: Daily Quests & SRS Spotlight */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Quests Section */}
          <div className="p-5 md:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-slate-900">ภารกิจประจำวัน (Daily Quests)</h2>
              </div>
              <span className="text-xs font-bold text-slate-600">
                สำเร็จแล้ว {completedQuests} / {totalQuests}
              </span>
            </div>

            <div className="space-y-3">
              {profile?.dailyQuests.map((quest) => {
                const percent = Math.min(100, Math.floor((quest.current / quest.target) * 100));
                return (
                  <div
                    key={quest.id}
                    className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                  >
                    <div className="flex-1 w-full">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span className="flex items-center gap-2">
                          {quest.completed && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          <span>{quest.titleTh}</span>
                        </span>
                        <span className="text-slate-600 text-[11px] font-semibold">
                          {quest.current} / {quest.target}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-1 font-medium">
                        {quest.descriptionTh}
                      </div>

                      <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            quest.completed ? 'bg-emerald-500' : 'bg-indigo-600'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="shrink-0 self-end md:self-center">
                      {quest.claimed ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold text-slate-500 bg-slate-200/70">
                          รับรางวัลแล้ว ✓
                        </span>
                      ) : quest.completed ? (
                        <button
                          onClick={() => claimQuest(quest.id)}
                          className="px-3.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs active:scale-95 transition-all animate-pulse cursor-pointer"
                        >
                          รับ +{quest.rewardXp} XP
                        </button>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-700 bg-slate-200/60 px-2.5 py-1 rounded-full">
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
              className="group p-4 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-2xl bg-indigo-100/70 text-indigo-600 flex items-center justify-center border border-indigo-200 mb-3 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Vocabulary Arena
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  บัตรคำศัพท์ 3 มิติ ระบบจำระยะยาว Spaced Repetition
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs text-indigo-600 font-bold gap-1 group-hover:translate-x-1 transition-transform">
                <span>เข้าสู่ Arena</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/conversation"
              className="group p-4 rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center border border-emerald-200 mb-3 group-hover:scale-105 transition-transform">
                  <MessageSquareText className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Conversation Quest
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Exam Mode (Short & Long) และ Story Mode สถานการณ์จริง
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs text-emerald-600 font-bold gap-1 group-hover:translate-x-1 transition-transform">
                <span>เริ่มทำโจทย์</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/expressions"
              className="group p-4 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center border border-amber-200 mb-3 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                  Expression Bank
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  คลังสำนวน วลีพูด และเจตนาผู้พูดที่ออกสอบบ่อย
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs text-amber-600 font-bold gap-1 group-hover:translate-x-1 transition-transform">
                <span>เปิดคลังสำนวน</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>

        {/* Column 3: SRS Due Spotlight & Mistakes Summary */}
        <div className="space-y-6">
          {/* Due Review Spotlight */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-amber-600" />
                  <span>คำศัพท์ถึงกำหนดทบทวน</span>
                </h3>
                <span className="text-xs font-black text-amber-600">{dueCount} คำ</span>
              </div>

              {dueCards.length > 0 ? (
                <div className="space-y-2 mt-3">
                  {dueCards.map((vocab) => (
                    <div
                      key={vocab.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          <span>{vocab.word}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                            {vocab.partOfSpeech}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5 font-medium">{vocab.meaningTh}</div>
                      </div>
                      <button
                        onClick={() => speakEnglish(vocab.word)}
                        className="p-2 rounded-full bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                        title="ฟังเสียงอ่าน"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500 text-xs font-medium">
                  🎉 ยอดเยี่ยม! ไม่มีคำศัพท์ค้างทบทวนในเวลานี้
                </div>
              )}
            </div>

            <Link
              href="/vocab"
              className="mt-4 w-full py-2.5 px-3 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold text-center transition-colors block"
            >
              เปิดโหมดฝึก Flashcards ({dueCount})
            </Link>
          </div>

          {/* Unresolved Mistakes Widget */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>ข้อผิดพลาดรอทบทวน</span>
              </h3>
              <span className="text-xs font-black text-rose-600">
                {unresolvedMistakes.length} ข้อ
              </span>
            </div>

            {unresolvedMistakes.length > 0 ? (
              <div className="space-y-2 mt-3">
                {unresolvedMistakes.slice(0, 3).map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs"
                  >
                    <div className="font-bold text-slate-900 line-clamp-1">{m.questionText}</div>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-slate-600">
                      <span className="px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-medium">
                        {m.skillCategory}
                      </span>
                      <span className="text-rose-700 font-bold">ตอบผิด: {m.userAnswer}</span>
                    </div>
                  </div>
                ))}
                <Link
                  href="/progress"
                  className="mt-3 block text-center text-xs font-bold text-rose-600 hover:text-rose-700 py-1.5"
                >
                  ดูสมุดบันทึกข้อผิดพลาดทั้งหมด →
                </Link>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-500 text-xs font-medium">
                ยังไม่มีข้อผิดพลาดที่ค้างอยู่ เริ่มทำข้อสอบเพื่อเก็บสถิติ!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info & User Feedback / Developer Tools Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Box 1: User Feedback Survey Link */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50/90 via-indigo-50/60 to-white border border-purple-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center border border-purple-200">
                <MessageCircleHeart className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">แบบประเมิน & ส่งข้อเสนอแนะ (User Feedback)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium mt-2">
              ความคิดเห็นของคุณมีค่ามากในการพัฒนาเว็บแอป TGAT1 Quest ให้ดียิ่งขึ้น ร่วมส่งข้อเสนอแนะ ติชม หรือแจ้งข้อผิดพลาดได้ผ่านแบบฟอร์มด้านล่างนี้
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-medium">Google Forms Survey</span>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf0_L-S-ZjdSsuP1utLvE9dA6LRhCxPFxktGI5T50fv1SS6yA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
            >
              <span>เปิดฟอร์มประเมิน</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Box 2: Developer Info & Tech Stack */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">เครื่องมือและเทคโนโลยีที่ใช้พัฒนา (Tech Stack)</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <span className="text-slate-500 text-[10px] block font-semibold uppercase">Framework</span>
                <span className="font-bold text-slate-800">Next.js 16 (App Router)</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <span className="text-slate-500 text-[10px] block font-semibold uppercase">Language</span>
                <span className="font-bold text-slate-800">TypeScript & React 19</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <span className="text-slate-500 text-[10px] block font-semibold uppercase">Database & Auth</span>
                <span className="font-bold text-slate-800">Firebase Firestore & Auth</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <span className="text-slate-500 text-[10px] block font-semibold uppercase">Styling & UI</span>
                <span className="font-bold text-slate-800">Tailwind CSS & Lucide Icons</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Client-side PWA & SRS SM-2 Engine</span>
            <span className="text-indigo-600 font-semibold">TGAT1 Quest v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
