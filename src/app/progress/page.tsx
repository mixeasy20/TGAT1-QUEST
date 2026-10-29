'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  LineChart,
  AlertCircle,
  CheckCircle2,
  Trophy,
  TrendingUp,
  RotateCcw,
  BookOpen,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Brain,
  History,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import {
  getPracticeSessions,
  getMistakes,
  resolveMistake,
} from '@/lib/storage';
import {
  PracticeSessionRecord,
  MistakeRecord,
  SkillCategory,
} from '@/types';

const SKILL_CATEGORIES: SkillCategory[] = [
  'Appropriate Response',
  'Speaker Intention',
  'Context Understanding',
  'Expression',
  'Vocabulary',
];

export default function ProgressPage() {
  const { refreshUserData } = useUser();
  const [sessions, setSessions] = useState<PracticeSessionRecord[]>([]);
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);
  const [mistakeFilter, setMistakeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unresolved' | 'resolved'>('unresolved');

  const loadData = () => {
    setSessions(getPracticeSessions());
    setMistakes(getMistakes());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleResolve = (id: string) => {
    resolveMistake(id);
    loadData();
    refreshUserData();
  };

  // Overall Stats Calculation
  const stats = useMemo(() => {
    let totalQuestions = 0;
    let totalCorrect = 0;

    const categoryMap: Record<SkillCategory, { correct: number; total: number }> = {
      'Appropriate Response': { correct: 0, total: 0 },
      'Speaker Intention': { correct: 0, total: 0 },
      'Context Understanding': { correct: 0, total: 0 },
      Expression: { correct: 0, total: 0 },
      Vocabulary: { correct: 0, total: 0 },
    };

    sessions.forEach((s) => {
      totalQuestions += s.totalQuestions;
      totalCorrect += s.score;

      if (s.categoryBreakdown) {
        SKILL_CATEGORIES.forEach((cat) => {
          if (s.categoryBreakdown[cat]) {
            categoryMap[cat].correct += s.categoryBreakdown[cat].correct;
            categoryMap[cat].total += s.categoryBreakdown[cat].total;
          }
        });
      }
    });

    const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    // Find weakest skill
    let weakestSkill: SkillCategory = 'Appropriate Response';
    let lowestRate = 101;

    SKILL_CATEGORIES.forEach((cat) => {
      const catData = categoryMap[cat];
      if (catData.total > 0) {
        const rate = (catData.correct / catData.total) * 100;
        if (rate < lowestRate) {
          lowestRate = rate;
          weakestSkill = cat;
        }
      }
    });

    return {
      totalQuestions,
      totalCorrect,
      totalWrong: totalQuestions - totalCorrect,
      accuracy,
      categoryMap,
      weakestSkill: lowestRate <= 100 ? weakestSkill : null,
      lowestRate: lowestRate <= 100 ? Math.round(lowestRate) : null,
    };
  }, [sessions]);

  // Filtered Mistakes
  const filteredMistakes = useMemo(() => {
    return mistakes.filter((m) => {
      if (mistakeFilter !== 'all' && m.skillCategory !== mistakeFilter) {
        return false;
      }
      if (statusFilter === 'unresolved' && m.resolved) {
        return false;
      }
      if (statusFilter === 'resolved' && !m.resolved) {
        return false;
      }
      return true;
    });
  }, [mistakes, mistakeFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <LineChart className="w-4 h-4" />
          <span>Progress & Mistake Analysis</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
          วิเคราะห์พัฒนาการ & สมุดบันทึกข้อผิดพลาด
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          ติดตามผลคะแนนจริงจากทุกแบบฝึกหัด จำแนก 5 ทักษะสำคัญของข้อสอบ TGAT1 และกลับมาพิชิตข้อที่เคยตอบผิด
        </p>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">จำนวนข้อที่ฝึกไปแล้ว</div>
          <div className="text-2xl font-extrabold text-white mt-1">
            {stats.totalQuestions} <span className="text-xs text-slate-400">ข้อ</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">รวมทุกโหมดฝึก</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">ความแม่นยำรวม (Accuracy)</div>
          <div className="text-2xl font-extrabold text-indigo-400 mt-1">
            {stats.totalQuestions > 0 ? `${stats.accuracy}%` : '—'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            ตอบถูก {stats.totalCorrect} / ตอบผิด {stats.totalWrong}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">ข้อผิดพลาดที่ค้างอยู่</div>
          <div className="text-2xl font-extrabold text-rose-400 mt-1">
            {mistakes.filter((m) => !m.resolved).length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">รอการกลับไปทบทวน</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-xs text-slate-400">ข้อผิดพลาดที่พิชิตแล้ว</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">
            {mistakes.filter((m) => m.resolved).length}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">ทำความเข้าใจเรียบร้อย</div>
        </div>
      </div>

      {/* 5 TGAT1 Competencies Breakdown & Study Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 5 Competency Bars */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <span>ความแม่นยำแยกตาม 5 ทักษะหลัก (TGAT1 Competencies)</span>
            </h2>
            <span className="text-xs text-slate-400">คำนวณจากประวัติจริง</span>
          </div>

          <div className="space-y-4 pt-2">
            {SKILL_CATEGORIES.map((skill) => {
              const data = stats.categoryMap[skill];
              const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;

              return (
                <div key={skill} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-200">{skill}</span>
                    <span className="text-slate-400">
                      {data.total > 0 ? (
                        <>
                          <strong className="text-white">{pct}%</strong> ({data.correct}/{data.total} ข้อ)
                        </>
                      ) : (
                        'ยังไม่มีประวัติ'
                      )}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        data.total === 0
                          ? 'bg-slate-700'
                          : pct >= 80
                          ? 'bg-emerald-400'
                          : pct >= 50
                          ? 'bg-indigo-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${data.total === 0 ? 0 : pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Smart Study Recommendation */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 mb-3">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">คำแนะนำการฝึกเฉพาะตัว</h3>
            <p className="text-xs text-slate-300 mt-1">
              ระบบประเมินจากจุดที่คะแนนน้อยที่สุดเพื่ออุดรอยรั่วก่อนลงสนามจริง
            </p>

            <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
              {stats.weakestSkill ? (
                <>
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>ทักษะที่ควรเน้น: {stats.weakestSkill}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    ความแม่นยำปัจจุบันอยู่ที่ <strong>{stats.lowestRate}%</strong> แนะนำให้ฝึกทำข้อสอบ Conversation Quest โดยเน้นสังเกตบริบทและระดับความสุภาพของผู้พูด
                  </p>
                </>
              ) : (
                <p className="text-slate-300">
                  เริ่มฝึกทำข้อสอบ Conversation หรือ Story Mode อย่างน้อย 1 ชุด เพื่อให้ระบบวิเคราะห์จุดที่ต้องพัฒนาได้อย่างแม่นยำ
                </p>
              )}
            </div>
          </div>

          <Link
            href="/conversation"
            className="mt-6 w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs text-center shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>ไปฝึก Conversation Quest</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Mistake Notebook Section */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400" />
              <span>สมุดบันทึกข้อผิดพลาด (Mistake Notebook)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              รวมทุกข้อที่คุณเคยตอบผิด พร้อมเฉลยละเอียดและปุ่มบันทึกเมื่อเข้าใจแล้ว
            </p>
          </div>

          {/* Filter options */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={mistakeFilter}
              onChange={(e) => setMistakeFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none"
            >
              <option value="all">ทุกทักษะ</option>
              {SKILL_CATEGORIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <div className="p-1 rounded-xl bg-slate-800 flex items-center text-xs">
              <button
                onClick={() => setStatusFilter('unresolved')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  statusFilter === 'unresolved' ? 'bg-rose-600 text-white' : 'text-slate-400'
                }`}
              >
                ค้างทบทวน
              </button>
              <button
                onClick={() => setStatusFilter('resolved')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  statusFilter === 'resolved' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                }`}
              >
                พิชิตแล้ว
              </button>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  statusFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                ทั้งหมด
              </button>
            </div>
          </div>
        </div>

        {/* Mistakes List */}
        {filteredMistakes.length > 0 ? (
          <div className="space-y-4">
            {filteredMistakes.map((m) => (
              <div
                key={m.id}
                className={`p-5 rounded-2xl border transition-all ${
                  m.resolved
                    ? 'bg-slate-900/60 border-slate-800/80 opacity-75'
                    : 'bg-rose-500/5 border-rose-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-indigo-300 border border-slate-700">
                        {m.skillCategory}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        จาก: {m.contextSnippet}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white pt-1">{m.questionText}</h3>
                  </div>

                  {!m.resolved ? (
                    <button
                      onClick={() => handleResolve(m.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 shrink-0 active:scale-95 transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>เข้าใจแล้ว (+15 XP)</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>เข้าใจแล้ว</span>
                    </span>
                  )}
                </div>

                {/* Answers Comparison */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300">
                    <span className="font-bold text-rose-400">คำตอบที่คุณเลือก: </span>
                    <span>{m.userAnswer}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
                    <span className="font-bold text-emerald-400">คำตอบที่ถูกต้อง: </span>
                    <span>{m.correctAnswer}</span>
                  </div>
                </div>

                {/* Explanation */}
                <div className="mt-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-indigo-300">คำอธิบายเหตุผล: </span>
                  {m.explanation}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-white">ไม่มีข้อผิดพลาดในตัวกรองนี้</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              ยอดเยี่ยมมาก! ไม่มีข้อผิดพลาดที่ค้างอยู่ หรือไม่มีข้อมูลตามเงื่อนไขที่เลือก
            </p>
          </div>
        )}
      </div>

      {/* Practice Session History Log */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <span>ประวัติการฝึกซ้อมทั้งหมด (Practice History)</span>
          </h2>
          <span className="text-xs text-slate-400">{sessions.length} ครั้ง</span>
        </div>

        {sessions.length > 0 ? (
          <div className="space-y-2.5">
            {sessions.map((sess) => {
              const pct =
                sess.totalQuestions > 0 ? Math.round((sess.score / sess.totalQuestions) * 100) : 0;

              return (
                <div
                  key={sess.id}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{sess.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 uppercase">
                        {sess.mode}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      วันที่: {sess.date.split('T')[0]} • เวลาที่ใช้: {sess.timeSpentSeconds} วินาที
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right">
                      <div className="font-extrabold text-sm text-indigo-300">
                        {sess.score} / {sess.totalQuestions} ({pct}%)
                      </div>
                      <div className="text-[10px] text-emerald-400">+{sess.xpEarned} XP</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-xs text-slate-400">
            ยังไม่มีประวัติการฝึกซ้อม ทำข้อสอบเพื่อเริ่มบันทึกสถิติ
          </div>
        )}
      </div>
    </div>
  );
}

