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

  const handleSelectOption = (qNum: number, opt: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    soundEffects.playSwipe();
    setUserAnswers((prev) => ({
      ...prev,
      [qNum]: opt,
    }));
  };

  const handleSubmitExam = () => {
    if (isSubmitted) return;
    setConfirmSubmitOpen(false);

    let calculatedScore = 0;
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {
      'Appropriate Response': { correct: 0, total: 0 },
      'Speaker Intention': { correct: 0, total: 0 },
      'Context Understanding': { correct: 0, total: 0 },
      Expression: { correct: 0, total: 0 },
      Vocabulary: { correct: 0, total: 0 },
    };

    questions.forEach((q) => {
      const cat = q.skillCategory;
      if (categoryBreakdown[cat]) {
        categoryBreakdown[cat].total += 1;
      }
      const ans = userAnswers[q.questionNumber];
      if (ans === q.correctOption) {
        calculatedScore += 1;
        if (categoryBreakdown[cat]) {
          categoryBreakdown[cat].correct += 1;
        }
      } else {
        // Record mistake
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

    // Scaled XP & Coins
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
        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 border border-indigo-500/30 text-center max-w-2xl mx-auto shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30 shadow-lg">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Official Simulation Mode
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-3">
              TGAT1 Mock Exam Simulator
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              จำลองสนามสอบจริง 60 ข้อ จับเวลา 60 นาที ครอบคลุมทั้งบทสนทนาสั้น บทสนทนายาว และคลังคำศัพท์ออกสอบบ่อยตามโครงสร้างข้อสอบ ทปอ.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-left p-4 rounded-3xl bg-white border border-slate-200 text-xs">
            <div className="border-r border-slate-200 pr-2">
              <div className="text-slate-400">จำนวนข้อ</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5">60 ข้อ</div>
            </div>
            <div className="border-r border-slate-200 pr-2">
              <div className="text-slate-400">เวลาทดสอบ</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5">60 นาที</div>
            </div>
            <div>
              <div className="text-slate-400">เป้าหมายคะแนน</div>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">80+ / 100</div>
            </div>
          </div>

          <button
            onClick={handleStartExam}
            className="btn-flourish shine-sweep w-full py-4 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-slate-900 font-black text-base shadow-xl shadow-indigo-600/30 transition-all active:scale-[0.98] cursor-pointer"
          >
            เริ่มทำข้อสอบเสมือนจริง (Start Simulation)
          </button>
        </div>
      ) : (
        /* ACTIVE EXAM INTERFACE */
        <div className="space-y-6">
          {/* Top Control Bar */}
          <div className="sticky top-16 z-20 p-4 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200 flex items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-900">
                ข้อ {currentIdx + 1} / {questions.length}
              </span>
              <span className="hidden sm:inline-block text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-indigo-300 border border-slate-200">
                {currentQ?.part}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Countdown Timer */}
              <div
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl font-mono font-bold text-sm border ${
                  secondsRemaining < 300
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                    : 'bg-slate-100 text-slate-100 border-slate-200'
                }`}
              >
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>

              {!isSubmitted ? (
                <button
                  onClick={() => setConfirmSubmitOpen(true)}
                  className="px-4 py-1.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-slate-900 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  ส่งข้อสอบ ({answeredCount}/60)
                </button>
              ) : (
                <button
                  onClick={handleStartExam}
                  className="px-4 py-1.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>เริ่มชุดใหม่</span>
                </button>
              )}
            </div>
          </div>

          {/* Exam Result Header if Submitted */}
          {isSubmitted && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/40 text-center space-y-2 animate-in zoom-in-95 duration-200">
              <div className="text-sm text-emerald-300 font-bold uppercase tracking-wider">
                ผลการทดสอบเสมือนจริง (Exam Completed)
              </div>
              <div className="text-4xl font-black text-slate-900">
                {score} <span className="text-lg text-slate-400 font-normal">/ 60 คะแนน</span>
              </div>
              <p className="text-xs text-slate-600">
                คิดเป็นคะแนนเทียบเท่า:{' '}
                <strong className="text-indigo-300">{Math.round((score / 60) * 100)}%</strong> • บันทึกข้อผิดพลาดลงใน Mistake Notebook แล้ว
              </p>
            </div>
          )}

          {/* Question Grid Navigator */}
          <div className="p-3 rounded-3xl bg-white border border-slate-200 flex items-center gap-1.5 overflow-x-auto">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.questionNumber] !== undefined;
              const isCurrent = idx === currentIdx;
              const isCorrect = isSubmitted && userAnswers[q.questionNumber] === q.correctOption;
              const isWrong = isSubmitted && userAnswers[q.questionNumber] !== q.correctOption;

              let btnColor = 'bg-slate-100 text-slate-400 hover:bg-slate-700';
              if (isSubmitted) {
                btnColor = isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-600 text-slate-900';
              } else if (isCurrent) {
                btnColor = 'bg-indigo-500 text-white ring-2 ring-indigo-400';
              } else if (isAnswered) {
                btnColor = 'bg-indigo-950 text-indigo-300 border border-indigo-500/40';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-8 h-8 rounded-lg shrink-0 text-xs font-bold transition-all ${btnColor}`}
                >
                  {q.questionNumber}
                </button>
              );
            })}
          </div>

          {/* Question Box */}
          {currentQ && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-5 shadow-xl">
              {/* Context Situation */}
              {currentQ.contextSituation && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <span className="font-bold text-indigo-400">บริบทสถานการณ์: </span>
                  {currentQ.contextSituation}
                </div>
              )}

              {/* Dialogue Script Snippet */}
              {currentQ.dialogueSnippet && currentQ.dialogueSnippet.length > 0 && (
                <div className="space-y-2 p-4 rounded-3xl bg-slate-50 border border-slate-200 text-xs">
                  {currentQ.dialogueSnippet.map((line, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-bold text-indigo-300 shrink-0">{line.speaker}:</span>
                      <span className="text-slate-100">{line.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Question Text */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold text-slate-900 leading-relaxed">
                  ข้อ {currentQ.questionNumber}. {currentQ.questionText}
                </h3>
                <button
                  onClick={() => speakEnglish(currentQ.questionText)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-700 text-slate-400 hover:text-slate-900 shrink-0"
                  title="ฟังคำถาม"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                  const isSelected = userAnswers[currentQ.questionNumber] === opt;
                  const isAnswerCorrect = isSubmitted && currentQ.correctOption === opt;
                  const isAnswerWrong = isSubmitted && isSelected && currentQ.correctOption !== opt;

                  let optClass =
                    'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700';
                  if (isSubmitted) {
                    if (isAnswerCorrect) {
                      optClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-200';
                    } else if (isAnswerWrong) {
                      optClass = 'bg-rose-500/20 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    optClass = 'bg-indigo-500/30 border-indigo-500 text-slate-900 shadow-md';
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(currentQ.questionNumber, opt)}
                      disabled={isSubmitted}
                      className={`w-full p-4 rounded-3xl border text-left transition-all flex items-center justify-between cursor-pointer ${optClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-indigo-300 font-mono font-bold flex items-center justify-center text-xs shrink-0">
                          {opt}
                        </span>
                        <span className="text-sm">{currentQ.options[opt]}</span>
                      </div>
                      {isSubmitted && isAnswerCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation if submitted */}
              {isSubmitted && (
                <div className="p-4 rounded-3xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-1.5 animate-in fade-in">
                  <div className="font-bold text-emerald-400">คำเฉลยและอธิบาย:</div>
                  <div className="text-slate-700 leading-relaxed">{currentQ.explanation}</div>
                </div>
              )}

              {/* Prev / Next controls */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <button
                  onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                  disabled={currentIdx === 0}
                  className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-600 flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>ข้อก่อนหน้า</span>
                </button>

                <button
                  onClick={() => setCurrentIdx((p) => Math.min(questions.length - 1, p + 1))}
                  disabled={currentIdx === questions.length - 1}
                  className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-600 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>ข้อถัดไป</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Confirm Submit Modal */}
          {confirmSubmitOpen && (
            <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">ยืนยันการส่งกระดาษคำตอบ?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  คุณตอบไปแล้ว <strong className="text-indigo-400">{answeredCount}</strong> จากทั้งหมด{' '}
                  <strong className="text-slate-900">60 ข้อ</strong>{' '}
                  {answeredCount < 60 && `(ยังมีข้อที่ยังไม่ได้ตอบอีก ${60 - answeredCount} ข้อ)`}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setConfirmSubmitOpen(false)}
                    className="flex-1 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-700 text-slate-600 text-xs font-semibold"
                  >
                    กลับไปทำต่อ
                  </button>
                  <button
                    onClick={handleSubmitExam}
                    className="flex-1 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-slate-900 text-xs font-bold shadow-md shadow-emerald-600/30"
                  >
                    ยืนยันส่งข้อสอบ
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
