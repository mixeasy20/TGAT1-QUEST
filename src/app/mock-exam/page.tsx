'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Flame,
  Volume2,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';
import { GuestRestrictionNotice } from '@/components/GuestRestrictionNotice';
import { generateFullMockExam, MockExamItem } from '@/data/mockExamSimulator';
import { recordPracticeSession, recordMistake } from '@/lib/storage';
import { speakEnglish } from '@/lib/audio';
import { soundEffects } from '@/lib/soundEffects';
import { triggerRewardConfetti } from '@/lib/confetti';

const TOTAL_EXAM_SECONDS = 60 * 60; // 60 minutes

export default function MockExamPage() {
  const { user } = useAuth();
  const isGuest = Boolean(user?.isAnonymous);
  const { awardXpAndCoins, refreshUserData } = useUser();

  const [examStarted, setExamStarted] = useState(false);
  const [questions, setQuestions] = useState<MockExamItem[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(TOTAL_EXAM_SECONDS);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Exam
  const handleStartExam = () => {
    const generated = generateFullMockExam();
    setQuestions(generated);
    setUserAnswers({});
    setCurrentIdx(0);
    setSecondsRemaining(TOTAL_EXAM_SECONDS);
    setIsSubmitted(false);
    setExamStarted(true);
    soundEffects.playVictory();
  };

  // Timer countdown
  useEffect(() => {
    if (examStarted && !isSubmitted && secondsRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && examStarted && !isSubmitted) {
      handleSubmitExam();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [examStarted, isSubmitted, secondsRemaining]);

  const handleSelectOption = (questionNum: number, opt: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionNum]: opt,
    }));
    soundEffects.playFlip();
  };

  const handleSubmitExam = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setConfirmSubmitOpen(false);

    let calculatedScore = 0;
    const categoryBreakdown: Record<string, { total: number; correct: number }> = {};

    questions.forEach((q) => {
      const cat = q.skillCategory;
      if (!categoryBreakdown[cat]) {
        categoryBreakdown[cat] = { total: 0, correct: 0 };
      }
      categoryBreakdown[cat].total += 1;

      const ans = userAnswers[q.questionNumber];
      if (ans === q.correctOption) {
        calculatedScore += 1;
        if (categoryBreakdown[cat]) {
          categoryBreakdown[cat].correct += 1;
        }
      } else {
        recordMistake({
          questionId: q.id,
          questionText: q.questionText,
          contextSnippet: q.part,
          userAnswer: ans ? `${ans}: ${q.options[ans]}` : 'ไม่ได้ตอบ',
          correctAnswer: `${q.correctOption}: ${q.options[q.correctOption]}`,
          skillCategory: q.skillCategory,
          explanation: q.explanation,
        });
      }
    });

    setScore(calculatedScore);
    setIsSubmitted(true);

    const xpReward = calculatedScore * 10 + 150;
    const coinReward = Math.round(calculatedScore * 1.5) + 50;
    awardXpAndCoins(xpReward, coinReward);

    const timeSpent = TOTAL_EXAM_SECONDS - secondsRemaining;
    recordPracticeSession({
      mode: 'exam_long',
      title: 'TGAT1 Full Mock Exam (60 Questions)',
      score: calculatedScore,
      totalQuestions: questions.length,
      timeSpentSeconds: timeSpent,
      xpEarned: xpReward,
      coinsEarned: coinReward,
      categoryBreakdown: categoryBreakdown as any,
    });

    soundEffects.playVictory();
    triggerRewardConfetti();
    refreshUserData();
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIdx] || null;
  const answeredCount = Object.keys(userAnswers).length;

  if (isGuest) {
    return (
      <GuestRestrictionNotice
        featureName="TGAT1 Full Mock Exam Simulator"
        description="การจำลองสอบเสมือนจริง 60 ข้อ 60 นาที สงวนสิทธิ์สำหรับสมาชิกเพื่อบันทึกประวัติคะแนนและวิเคราะห์จุดอ่อน"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      {!examStarted ? (
        <div className="p-8 rounded-3xl bg-white border border-indigo-200 text-center max-w-2xl mx-auto shadow-md space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-200 shadow-sm">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 border border-indigo-200">
              Official Simulation Mode
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-3">
              TGAT1 Mock Exam Simulator
            </h1>
            <p className="text-sm font-medium text-slate-700 mt-2 leading-relaxed">
              จำลองสนามสอบจริง 60 ข้อ จับเวลา 60 นาที ครอบคลุมทั้งบทสนทนาสั้น บทสนทนายาว และคลังคำศัพท์ออกสอบบ่อยตามโครงสร้างข้อสอบ ทปอ.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left p-4 rounded-3xl bg-slate-50 border border-slate-200 text-xs">
            <div className="border-r border-slate-200 pr-2">
              <div className="text-slate-500 font-medium">จำนวนข้อ</div>
              <div className="text-lg font-black text-slate-900 mt-0.5">60 ข้อ</div>
            </div>
            <div className="border-r border-slate-200 pr-2">
              <div className="text-slate-500 font-medium">เวลาทดสอบ</div>
              <div className="text-lg font-black text-slate-900 mt-0.5">60 นาที</div>
            </div>
            <div>
              <div className="text-slate-500 font-medium">เป้าหมายคะแนน</div>
              <div className="text-lg font-black text-emerald-600 mt-0.5">80+ / 100</div>
            </div>
          </div>

          <button
            onClick={handleStartExam}
            className="btn-flourish shine-sweep w-full py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base shadow-lg shadow-indigo-500/25 transition-all active:scale-[0.98] cursor-pointer"
          >
            เริ่มทำข้อสอบเสมือนจริง (Start Simulation)
          </button>
        </div>
      ) : (
        /* ACTIVE EXAM INTERFACE */
        <div className="space-y-6">
          {/* Top Control Bar */}
          <div className="sticky top-16 z-20 p-4 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-slate-900">
                ข้อ {currentIdx + 1} / {questions.length}
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {currentQ?.part}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Countdown Timer */}
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl font-mono font-bold text-sm border ${
                  secondsRemaining < 300
                    ? 'bg-rose-50 text-rose-600 border-rose-300 animate-pulse'
                    : 'bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>

              {!isSubmitted ? (
                <button
                  onClick={() => setConfirmSubmitOpen(true)}
                  className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  ส่งข้อสอบ ({answeredCount}/60)
                </button>
              ) : (
                <button
                  onClick={handleStartExam}
                  className="px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>เริ่มชุดใหม่</span>
                </button>
              )}
            </div>
          </div>

          {/* Question Grid Navigator */}
          <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
              <span>กระดานข้อสอบ (ตอบแล้ว {answeredCount} จาก 60)</span>
              <span className="text-slate-500 font-medium text-[11px]">คลิกเลขข้อเพื่อกระโดดไปยังข้อนั้น</span>
            </div>
            <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 gap-1.5 max-h-32 overflow-y-auto p-1">
              {questions.map((q, idx) => {
                const isAnswered = Boolean(userAnswers[q.questionNumber]);
                const isCurrent = currentIdx === idx;
                const isCorrect = isSubmitted && userAnswers[q.questionNumber] === q.correctOption;
                const isWrong = isSubmitted && isAnswered && !isCorrect;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-7 rounded-lg text-[11px] font-bold flex items-center justify-center border transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-indigo-600 ring-2 ring-indigo-400 font-black'
                        : 'border-slate-200'
                    } ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : isWrong
                          ? 'bg-rose-500 text-white border-rose-600'
                          : 'bg-slate-100 text-slate-500'
                        : isAnswered
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {q.questionNumber}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Question View */}
          {currentQ && (
            <div className="p-6 md:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 border border-indigo-200 text-indigo-700">
                    ข้อที่ {currentQ.questionNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 border border-slate-200 text-slate-700">
                    {currentQ.skillCategory}
                  </span>
                </div>
                <button
                  onClick={() => speakEnglish(currentQ.questionText)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                  title="ฟังเสียงอ่านโจทย์"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Dialogue / Context Snippet */}
              {currentQ.dialogueSnippet && currentQ.dialogueSnippet.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    สถานการณ์ / บทสนทนา
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-800">
                    {currentQ.dialogueSnippet.map((d, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="font-bold text-indigo-600 shrink-0">{d.speaker}:</span>
                        <span className="italic">{d.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Question Text */}
              <div className="text-base font-bold text-slate-900 leading-relaxed">
                {currentQ.questionText}
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 gap-2.5">
                {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                  const isSelected = userAnswers[currentQ.questionNumber] === optKey;
                  const isCorrectChoice = isSubmitted && currentQ.correctOption === optKey;
                  const isWrongChoice = isSubmitted && isSelected && !isCorrectChoice;

                  return (
                    <button
                      key={optKey}
                      onClick={() => handleSelectOption(currentQ.questionNumber, optKey)}
                      disabled={isSubmitted}
                      className={`w-full p-4 rounded-2xl border text-left text-xs font-medium flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        isSubmitted
                          ? isCorrectChoice
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                            : isWrongChoice
                            ? 'bg-rose-50 border-rose-500 text-rose-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 opacity-60'
                          : isSelected
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {optKey}
                        </span>
                        <span>{currentQ.options[optKey]}</span>
                      </div>
                      {isSubmitted && isCorrectChoice && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon submission */}
              {isSubmitted && (
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-slate-800 space-y-1 animate-in fade-in">
                  <div className="font-bold text-indigo-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>คำอธิบายเฉลย (Answer Explanation)</span>
                  </div>
                  <p className="leading-relaxed mt-1">{currentQ.explanation}</p>
                </div>
              )}

              {/* Prev / Next Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>ข้อย้อนหลัง</span>
                </button>
                <button
                  onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentIdx === questions.length - 1}
                  className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>ข้อถัดไป</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal before Submit */}
      {confirmSubmitOpen && (
        <div className="fixed inset-0 z-50 bg-white backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 text-slate-900 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">ยืนยันการส่งข้อสอบ?</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              คุณได้ตอบไปแล้ว <strong>{answeredCount}</strong> จากทั้งหมด <strong>60 ข้อ</strong>
              {answeredCount < 60 && (
                <span className="block text-rose-600 font-bold mt-1">
                  (ยังมีข้อที่ยังไม่ได้ตอบอีก {60 - answeredCount} ข้อ)
                </span>
              )}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmSubmitOpen(false)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                ทำต่อ
              </button>
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                ยืนยันส่งข้อสอบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
