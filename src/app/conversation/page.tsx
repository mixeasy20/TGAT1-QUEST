'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  MessageSquareText,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Trophy,
  Compass,
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  Languages,
  BookOpenCheck,
  GraduationCap,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';
import { GuestRestrictionNotice } from '@/components/GuestRestrictionNotice';
import {
  getConversations,
  getStories,
  recordPracticeSession,
  recordMistake,
} from '@/lib/storage';
import {
  ConversationItem,
  ExamQuestion,
  StoryScenario,
  StoryChoice,
  SkillCategory,
} from '@/types';
import { speakEnglish } from '@/lib/audio';
import { soundEffects } from '@/lib/soundEffects';
import { triggerRewardConfetti } from '@/lib/confetti';

export default function ConversationPage() {
  const { user } = useAuth();
  const isGuest = Boolean(user?.isAnonymous);
  const { awardXpAndCoins, refreshUserData } = useUser();
  const [activeTab, setActiveTab] = useState<'exam' | 'story'>('exam');

  // ---------------- EXAM MODE STATE ----------------
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [examTypeFilter, setExamTypeFilter] = useState<'all' | 'short' | 'long'>('all');
  const [selectedConv, setSelectedConv] = useState<ConversationItem | null>(null);

  // Exam Run State
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 minutes per set
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  // Translation & Key Vocab Controls
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [revealedLines, setRevealedLines] = useState<Record<number, boolean>>({});
  const [showKeyVocab, setShowKeyVocab] = useState<boolean>(true);

  // ---------------- STORY MODE STATE ----------------
  const [stories, setStories] = useState<StoryScenario[]>([]);
  const [selectedStory, setSelectedStory] = useState<StoryScenario | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [storyHistory, setStoryHistory] = useState<
    Array<{
      speaker: string;
      role: string;
      textEn: string;
      textTh?: string;
      chosenOption?: StoryChoice;
    }>
  >([]);
  const [storyCompleted, setStoryCompleted] = useState(false);
  const [totalStoryXp, setTotalStoryXp] = useState(0);
  const [showStoryTranslations, setShowStoryTranslations] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setConversations(getConversations());
    setStories(getStories());
  }, []);

  // Filtered Conversations
  const filteredConversations = useMemo(() => {
    if (examTypeFilter === 'all') return conversations;
    return conversations.filter((c) => c.type === examTypeFilter);
  }, [conversations, examTypeFilter]);

  // Exam Countdown Timer
  useEffect(() => {
    if (timerRunning && timerEnabled && secondsLeft > 0) {
      timerRef.current = setTimeout(() => {
        setSecondsLeft((s) => s - 1);
        setTimeSpent((t) => t + 1);
      }, 1000);
    } else if (secondsLeft === 0 && timerRunning) {
      handleSubmitExam();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timerRunning, timerEnabled, secondsLeft]);

  // Start Exam Set
  const startExam = (conv: ConversationItem) => {
    setSelectedConv(conv);
    setUserAnswers({});
    setExamSubmitted(false);
    setTimeSpent(0);
    setSecondsLeft(conv.type === 'long' ? 300 : 120);
    setTimerRunning(true);
    setRevealedLines({});
  };

  const toggleLineTranslation = (idx: number) => {
    setRevealedLines((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSelectOption = (questionId: string, option: 'A' | 'B' | 'C' | 'D') => {
    if (examSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitExam = () => {
    if (!selectedConv || examSubmitted) return;
    setTimerRunning(false);
    setExamSubmitted(true);

    let score = 0;
    const categoryStats: Record<SkillCategory, { correct: number; total: number }> = {
      'Appropriate Response': { correct: 0, total: 0 },
      'Speaker Intention': { correct: 0, total: 0 },
      'Context Understanding': { correct: 0, total: 0 },
      Expression: { correct: 0, total: 0 },
      Vocabulary: { correct: 0, total: 0 },
    };

    selectedConv.questions.forEach((q) => {
      const cat = q.skillCategory;
      categoryStats[cat].total += 1;
      const ans = userAnswers[q.id];
      const isCorrect = ans === q.correctOption;

      if (isCorrect) {
        score += 1;
        categoryStats[cat].correct += 1;
      } else {
        // Record real mistake in Mistake Notebook
        recordMistake({
          questionId: q.id,
          questionText: q.question,
          contextSnippet: selectedConv.title,
          userAnswer: ans ? `${ans}: ${q.options[ans]}` : 'ไม่ได้ตอบ',
          correctAnswer: `${q.correctOption}: ${q.options[q.correctOption]}`,
          skillCategory: q.skillCategory,
          explanation: q.explanation,
        });
      }
    });

    const xpEarned = score * 30 + (score === selectedConv.questions.length ? 50 : 10);
    const coinsEarned = score * 10;

    recordPracticeSession({
      mode: selectedConv.type === 'long' ? 'exam_long' : 'exam_short',
      title: selectedConv.title,
      score,
      totalQuestions: selectedConv.questions.length,
      timeSpentSeconds: timeSpent,
      xpEarned,
      coinsEarned,
      categoryBreakdown: categoryStats,
    });

    awardXpAndCoins(xpEarned, coinsEarned);
    refreshUserData();
  };

  // ---------------- STORY MODE HANDLERS ----------------
  const startStory = (scenario: StoryScenario) => {
    setSelectedStory(scenario);
    setCurrentNodeId(scenario.initialNodeId);
    setStoryCompleted(false);
    setTotalStoryXp(0);

    const firstNode = scenario.nodes[scenario.initialNodeId];
    setStoryHistory([
      {
        speaker: firstNode.speaker,
        role: firstNode.speakerRole,
        textEn: firstNode.textEn,
        textTh: firstNode.textTh,
      },
    ]);
  };

  const handleStoryChoice = (choice: StoryChoice) => {
    if (!selectedStory || !currentNodeId) return;

    soundEffects.playMessagePop();
    const accumulatedXp = totalStoryXp + choice.xpReward;
    setTotalStoryXp(accumulatedXp);

    // Update history with the choice
    const updatedHistory = [...storyHistory];
    updatedHistory[updatedHistory.length - 1].chosenOption = choice;

    if (choice.nextNodeId && selectedStory.nodes[choice.nextNodeId]) {
      const nextNode = selectedStory.nodes[choice.nextNodeId];
      updatedHistory.push({
        speaker: nextNode.speaker,
        role: nextNode.speakerRole,
        textEn: nextNode.textEn,
        textTh: nextNode.textTh,
      });
      setStoryHistory(updatedHistory);
      setCurrentNodeId(choice.nextNodeId);
    } else {
      // Completed Story
      soundEffects.playVictory();
      setStoryHistory(updatedHistory);
      setStoryCompleted(true);
      setCurrentNodeId(null);

      // Award completion XP & Coins
      const finalXp = accumulatedXp + 50; // Completion bonus
      const finalCoins = 30;
      awardXpAndCoins(finalXp, finalCoins);

      recordPracticeSession({
        mode: 'story',
        title: selectedStory.title,
        score: 1,
        totalQuestions: 1,
        timeSpentSeconds: 120,
        xpEarned: finalXp,
        coinsEarned: finalCoins,
        categoryBreakdown: {
          'Appropriate Response': { correct: 1, total: 1 },
          'Speaker Intention': { correct: 1, total: 1 },
          'Context Understanding': { correct: 1, total: 1 },
          Expression: { correct: 1, total: 1 },
          Vocabulary: { correct: 1, total: 1 },
        },
      });

      triggerRewardConfetti();
      refreshUserData();
    }
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isGuest) {
    return (
      <GuestRestrictionNotice
        featureName="Conversation Quest (ข้อสอบ & Story Mode)"
        description="ในโหมดผู้เยี่ยมชม คุณสามารถเข้าใช้งานได้เฉพาะส่วน Flashcard (Vocabulary Arena) เท่านั้น เข้าสู่ระบบหรือสมัครสมาชิกเพื่อทำข้อสอบเสมือนจริงและสัมผัส Story Quest"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title & Main Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <MessageSquareText className="w-4 h-4" />
            <span>Conversation Quest</span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">
            ศูนย์ฝึกทักษะการสนทนาภาษาอังกฤษ
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            ฝึกทั้งข้อสอบจริง TGAT1 (Short & Long) และสถานการณ์จำลองเชิงโต้ตอบ (Story Mode)
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="p-1 rounded-3xl bg-white border border-slate-200/70 flex items-center">
          <button
            onClick={() => {
              setActiveTab('exam');
              setSelectedStory(null);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
              activeTab === 'exam'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Exam Mode (เสมือนสอบจริง)
          </button>
          <button
            onClick={() => {
              setActiveTab('story');
              setSelectedConv(null);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
              activeTab === 'story'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-600/25'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Story Mode (สถานการณ์จำลอง)
          </button>
        </div>
      </div>

      {/* ===================== TAB 1: EXAM MODE ===================== */}
      {activeTab === 'exam' && (
        <div className="space-y-6">
          {!selectedConv ? (
            /* Set Selection View */
            <div className="space-y-4">
              {/* Filter Row */}
              <div className="flex items-center justify-between gap-3 p-4 rounded-3xl bg-white border border-slate-200/70">
                <div className="text-xs font-semibold text-slate-600">
                  เลือกประเภทชุดข้อสอบ:
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExamTypeFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      examTypeFilter === 'all'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-100 text-slate-400 hover:text-slate-800'
                    }`}
                  >
                    ทั้งหมด ({conversations.length})
                  </button>
                  <button
                    onClick={() => setExamTypeFilter('short')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      examTypeFilter === 'short'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-100 text-slate-400 hover:text-slate-800'
                    }`}
                  >
                    Short Conversation
                  </button>
                  <button
                    onClick={() => setExamTypeFilter('long')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      examTypeFilter === 'long'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-100 text-slate-400 hover:text-slate-800'
                    }`}
                  >
                    Long Conversation
                  </button>
                </div>
              </div>

              {/* Conversation Set Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="p-5 rounded-3xl bg-white border border-slate-200/70 hover:border-indigo-500/50 card-hover-lift transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            conv.type === 'long'
                              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}
                        >
                          {conv.type === 'long' ? 'Long Conversation (ชุดยาว)' : 'Short Conversation'}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                          <span>ระดับ {conv.difficulty}</span>
                          <span>•</span>
                          <span>{conv.questions.length} คำถาม</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-slate-800 tracking-tight">{conv.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{conv.situation}</p>

                      {/* Exam Reference Citation */}
                      {conv.examReference && (
                        <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
                          <GraduationCap className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
                          <span className="line-clamp-1">{conv.examReference}</span>
                        </div>
                      )}

                      <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 italic line-clamp-2">
                        &quot;{conv.dialogue[0]?.speaker}: {conv.dialogue[0]?.text}&quot;
                      </div>

                      {/* Key Vocab pills preview */}
                      {conv.keyVocab && conv.keyVocab.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          <span className="text-[10px] text-slate-400 font-medium self-center">
                            คำศัพท์น่ารู้ ({conv.keyVocab.length}):
                          </span>
                          {conv.keyVocab.slice(0, 3).map((kv, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200"
                            >
                              {kv.word} ({kv.meaningTh.split('/')[0].trim()})
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">แหล่งที่มา: {conv.source}</span>
                      <button
                        onClick={() => startExam(conv)}
                        className="btn-flourish shine-sweep px-4 py-2 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5 active:scale-95 transition-all"
                      >
                        <span>เริ่มทำชุดนี้</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Active Exam Test View */
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Exam Header & Timer Control */}
              <div className="p-4 rounded-3xl bg-white border border-slate-200/70 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedConv(null)}
                  className="btn-flourish text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5"
                >
                  <span>← กลับไปเลือกชุดข้อสอบ</span>
                </button>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {/* Global Translation Toggle Button */}
                  <button
                    onClick={() => setShowTranslations(!showTranslations)}
                    className={`btn-flourish flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold border transition-all ${
                      showTranslations
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-800'
                    }`}
                    title="สลับโหมดเปิด/ปิดคำแปลภาษาไทยทั้งหมด"
                  >
                    {showTranslations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{showTranslations ? 'คำแปล: เปิดอยู่' : 'คำแปล: ซ่อน (เสมือนสอบจริง)'}</span>
                  </button>

                  {/* Timer Toggle */}
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span>ตัวจับเวลา:</span>
                    <button
                      onClick={() => setTimerEnabled(!timerEnabled)}
                      className={`btn-flourish px-2.5 py-1 rounded-lg font-semibold text-[11px] border transition-colors ${
                        timerEnabled
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                          : 'bg-slate-100 text-slate-400 border-slate-200'
                      }`}
                    >
                      {timerEnabled ? 'เปิดใช้งาน' : 'ปิด'}
                    </button>
                  </div>

                  {/* Countdown Display */}
                  {timerEnabled && (
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-2xl text-xs font-mono font-bold border ${
                        secondsLeft < 30
                          ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse'
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatTimer(secondsLeft)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dialogue Script Box */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/70 space-y-4 shadow-xl">
                {/* Header of Dialogue Box */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/70">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                        สถานการณ์ (Context)
                      </span>
                      {selectedConv.examReference && (
                        <span className="text-[10px] font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <GraduationCap className="w-3 h-3 text-emerald-400" />
                          <span>{selectedConv.examReference}</span>
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 mt-1">{selectedConv.title}</h2>
                    <p className="text-xs text-slate-600 mt-0.5">{selectedConv.situation}</p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    {/* Toggle Key Vocab Drawer Button */}
                    {selectedConv.keyVocab && selectedConv.keyVocab.length > 0 && (
                      <button
                        onClick={() => setShowKeyVocab(!showKeyVocab)}
                        className={`btn-flourish text-xs font-semibold px-3 py-1.5 rounded-2xl border flex items-center gap-1.5 transition-all ${
                          showKeyVocab
                            ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                            : 'bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-700'
                        }`}
                      >
                        <BookOpenCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>คำศัพท์สำคัญ ({selectedConv.keyVocab.length})</span>
                      </button>
                    )}

                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600">
                      {selectedConv.questions.length} ข้อ
                    </span>
                  </div>
                </div>

                {/* Key Vocabulary Drawer (Collapsible) */}
                {showKeyVocab && selectedConv.keyVocab && selectedConv.keyVocab.length > 0 && (
                  <div className="p-4 rounded-3xl bg-amber-500/5 border border-amber-500/20 space-y-2.5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>คลังคำศัพท์และสำนวนสำคัญประจำบทสนทนา (อิงข้อสอบ TGAT & ระดับภาษา)</span>
                      </div>
                      <span className="text-[10px] text-slate-400">คลิกลำโพงเพื่อฟังการออกเสียง</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {selectedConv.keyVocab.map((kv, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-2xl bg-white border border-slate-200/70 hover:border-amber-500/40 card-hover-lift transition-all flex items-start justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-slate-800">{kv.word}</span>
                              {kv.pos && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-indigo-300 border border-slate-200">
                                  {kv.pos}
                                </span>
                              )}
                              {kv.cefrLevel && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                  {kv.cefrLevel}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-emerald-400 font-medium mt-1">
                              {kv.meaningTh}
                            </div>
                            {kv.examRef && (
                              <div className="text-[9px] text-slate-400 mt-1 flex items-center gap-1">
                                <span className="text-indigo-400">🎯</span>
                                <span>{kv.examRef}</span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => speakEnglish(kv.word)}
                            className="btn-flourish p-1.5 rounded-lg bg-slate-100 hover:bg-slate-700 text-slate-400 hover:text-amber-300 transition-colors shrink-0"
                            title="ฟังเสียงอ่านคำศัพท์"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dialogue Turn by Turn */}
                <div className="space-y-3 pt-2">
                  {selectedConv.dialogue.map((line, idx) => {
                    const isLineRevealed = showTranslations || revealedLines[idx];
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col gap-1 transition-all hover:bg-slate-50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-indigo-300">
                            {line.speaker}:
                          </span>
                          <div className="flex items-center gap-1.5">
                            {!showTranslations && line.translationTh && (
                              <button
                                onClick={() => toggleLineTranslation(idx)}
                                className="btn-flourish px-2 py-0.5 rounded text-[10px] font-medium bg-slate-700/80 hover:bg-slate-700 text-slate-600 hover:text-slate-800 flex items-center gap-1 transition-colors"
                                title="สลับแสดง/ซ่อนคำแปลเฉพาะประโยคนี้"
                              >
                                {isLineRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                <span>{isLineRevealed ? 'ซ่อนคำแปล' : 'ดูคำแปล'}</span>
                              </button>
                            )}
                            <button
                              onClick={() => speakEnglish(line.text)}
                              className="btn-flourish p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-700"
                              title="ฟังเสียงสนทนา"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-sm text-slate-100 font-medium">{line.text}</div>

                        {/* Thai Translation conditional rendering */}
                        {line.translationTh && isLineRevealed && (
                          <div className="text-[11px] text-slate-400 border-t border-slate-200/40 pt-1.5 mt-1 animate-in fade-in duration-150">
                            {line.translationTh}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Questions Section */}
              <div className="space-y-6">
                {selectedConv.questions.map((q, qIndex) => {
                  const selectedOpt = userAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className="p-6 rounded-3xl bg-white border border-slate-200/70 space-y-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                            {qIndex + 1}
                          </span>
                          <h3 className="font-bold text-sm text-slate-800">{q.question}</h3>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-indigo-300 border border-slate-200">
                          {q.skillCategory}
                        </span>
                      </div>

                      {/* Options A, B, C, D */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                          const isPicked = selectedOpt === opt;
                          const isCorrect = q.correctOption === opt;

                          let btnStyle =
                            'bg-slate-50 border-slate-200/80 text-slate-700 hover:border-indigo-500/60';

                          if (examSubmitted) {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                            } else if (isPicked && !isCorrect) {
                              btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 line-through';
                            } else {
                              btnStyle = 'bg-slate-50 border-slate-200/70 text-slate-400 opacity-60';
                            }
                          } else if (isPicked) {
                            btnStyle = 'bg-indigo-500/30 border-indigo-500 text-slate-800 font-semibold ring-2 ring-indigo-500/30';
                          }

                          return (
                            <button
                              key={opt}
                              disabled={examSubmitted}
                              onClick={() => handleSelectOption(q.id, opt)}
                              className={`btn-flourish p-3.5 rounded-3xl border text-left text-xs transition-all flex items-start gap-3 ${btnStyle}`}
                            >
                              <span className="font-mono font-bold text-xs uppercase px-2 py-0.5 rounded bg-slate-700/80 shrink-0">
                                {opt}
                              </span>
                              <span className="flex-1">{q.options[opt]}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Reveal (After Submit) */}
                      {examSubmitted && (
                        <div className="mt-4 p-4 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-300">
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>เฉลยคำตอบที่ถูกต้อง: ข้อ {q.correctOption}</span>
                          </div>

                          <div className="text-xs text-slate-700 font-medium">
                            {q.explanation}
                          </div>

                          <div className="pt-2 border-t border-slate-100 space-y-1.5">
                            <div className="text-[11px] font-bold text-slate-600">
                              คำอธิบายรายตัวเลือก:
                            </div>
                            {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                              <div key={opt} className="text-[11px] text-slate-400 flex items-start gap-2">
                                <span className="font-mono font-bold text-slate-600">[{opt}]</span>
                                <span>{q.optionExplanations[opt]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Action Bar */}
              <div className="p-4 rounded-3xl bg-white border border-slate-200/70 flex items-center justify-between">
                <div>
                  {!examSubmitted ? (
                    <span className="text-xs text-slate-400">
                      ตอบแล้ว {Object.keys(userAnswers).length} จาก {selectedConv.questions.length} ข้อ
                    </span>
                  ) : (
                    <span className="text-xs text-emerald-400 font-bold">
                      ตรวจคำตอบและบันทึกคะแนนลงระบบแล้ว ✓
                    </span>
                  )}
                </div>

                {!examSubmitted ? (
                  <button
                    onClick={handleSubmitExam}
                    disabled={Object.keys(userAnswers).length === 0}
                    className="btn-flourish shine-sweep px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-slate-800 font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
                  >
                    ส่งคำตอบและดูเฉลยละเอียด
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startExam(selectedConv)}
                      className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-700 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>ทำซ้ำอีกครั้ง</span>
                    </button>
                    <button
                      onClick={() => setSelectedConv(null)}
                      className="px-4 py-2 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold"
                    >
                      เลือกชุดอื่น
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================== TAB 2: STORY MODE ===================== */}
      {activeTab === 'story' && (
        <div className="space-y-6">
          {!selectedStory ? (
            /* Story Scenarios Selection */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/70 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {story.category}
                      </span>
                      <span className="text-xs text-slate-400">~{story.estimatedMinutes} นาที</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">{story.title}</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {story.descriptionTh}
                    </p>

                    <div className="mt-4 p-3 rounded-3xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="text-[11px] font-semibold text-indigo-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>เป้าหมายการเรียนรู้:</span>
                      </div>
                      <div className="text-[10px] text-slate-600 line-clamp-2">
                        {story.learningTakeaways.expressions.join(' • ')}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-200/70 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span>{story.badgeReward}</span>
                    </span>
                    <button
                      onClick={() => startStory(story)}
                      className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-slate-800 font-semibold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 active:scale-95 transition-all"
                    >
                      <span>เริ่มเล่น</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Interactive Story Flow */
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
              {/* Story Top Bar with Translation Toggle */}
              <div className="p-4 rounded-3xl bg-white border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                <div>
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="text-xs text-slate-400 hover:text-slate-800 inline-flex items-center gap-1 transition-colors"
                  >
                    ← ออกจาก Story Mode
                  </button>
                  <h2 className="text-base font-bold text-slate-800 mt-0.5">{selectedStory.title}</h2>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {/* Story Translation Toggle */}
                  <button
                    onClick={() => setShowStoryTranslations(!showStoryTranslations)}
                    className={`btn-flourish flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold border transition-all ${
                      showStoryTranslations
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-sm'
                        : 'bg-slate-100 text-slate-400 border-slate-200 hover:text-slate-800'
                    }`}
                    title="สลับโหมดเปิด/ปิดคำแปลไทยในบทสนทนา"
                  >
                    {showStoryTranslations ? <Eye className="w-3.5 h-3.5 text-indigo-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{showStoryTranslations ? 'คำแปลไทย: เปิด' : 'คำแปลไทย: ปิด'}</span>
                  </button>

                  <div className="text-right pl-2 border-l border-slate-200/70">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">XP ในด่าน</div>
                    <div className="text-sm font-black text-amber-400">+{totalStoryXp} XP</div>
                  </div>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="space-y-4">
                {storyHistory.map((item, index) => {
                  return (
                    <div key={index} className="space-y-3">
                      {/* NPC Message */}
                      <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <div className="w-9 h-9 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-slate-800 flex items-center justify-center font-bold text-xs shrink-0 shadow-md shadow-indigo-600/25">
                          {item.speaker[0]}
                        </div>
                        <div className="flex-1 bg-white border border-slate-200/70 rounded-3xl p-4 space-y-1 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-indigo-300">
                              {item.speaker}{' '}
                              <span className="text-[10px] text-slate-400 font-normal">
                                ({item.role})
                              </span>
                            </span>
                            <button
                              onClick={() => speakEnglish(item.textEn)}
                              className="text-slate-400 hover:text-indigo-300 transition-colors p-1"
                              title="ฟังเสียงพูด"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-sm text-slate-100 font-medium leading-relaxed">{item.textEn}</p>
                          {showStoryTranslations && item.textTh && (
                            <p className="text-xs text-slate-400 pt-1.5 border-t border-slate-100 leading-relaxed">
                              {item.textTh}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* User's Chosen Option (if already answered this step) */}
                      {item.chosenOption && (
                        <div className="flex items-start justify-end gap-3 pl-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
                          <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/40 rounded-3xl p-4 text-right space-y-2 max-w-lg shadow-md shadow-indigo-950/40">
                            <div className="text-xs font-semibold text-indigo-200 leading-relaxed">
                              {item.chosenOption.textEn}
                            </div>
                            {showStoryTranslations && (
                              <div className="text-[11px] text-slate-600">
                                {item.chosenOption.textTh}
                              </div>
                            )}
                            <div className="p-2.5 rounded-2xl bg-white border border-slate-200/70 text-left text-[11px] text-slate-600 shadow-inner">
                              <span className="font-bold text-emerald-400">คำแนะนำสถานการณ์: </span>
                              {item.chosenOption.feedbackTh}
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-slate-800 flex items-center justify-center font-bold text-xs shrink-0 shadow-md shadow-indigo-600/30">
                            You
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Current Active Choices */}
              {!storyCompleted && currentNodeId && (
                <div className="p-5 rounded-3xl bg-white border border-slate-200/70 space-y-3 shadow-xl">
                  <div className="text-xs font-bold text-slate-600 flex items-center justify-between">
                    <span>เลือกคำตอบเพื่อดำเนินบทสนทนาต่อไป:</span>
                    <span className="text-[10px] text-indigo-400 font-normal">คลิกเพื่อตอบ</span>
                  </div>

                  <div className="space-y-2.5">
                    {selectedStory.nodes[currentNodeId]?.choices.map((choice) => (
                      <button
                        key={choice.id}
                        onClick={() => handleStoryChoice(choice)}
                        className="btn-flourish w-full p-4 rounded-3xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 hover:border-indigo-500/60 text-left transition-all active:scale-98 flex flex-col gap-1 group shadow-sm hover:shadow-indigo-950/50 cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-300 transition-colors">
                            {choice.textEn}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700/80 text-slate-600 shrink-0 font-medium">
                            {choice.tone}
                          </span>
                        </div>
                        {showStoryTranslations && (
                          <span className="text-[11px] text-slate-400">{choice.textTh}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Story Completion Summary */}
              {storyCompleted && (
                <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950/60 border border-emerald-500/30 text-center space-y-4 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800">ภารกิจสำเร็จลุล่วง!</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      คุณได้รับเหรียญตราเกียรติยศ: <strong>{selectedStory.badgeReward}</strong>
                    </p>
                  </div>

                  <div className="p-4 rounded-3xl bg-white border border-slate-200/70 text-left space-y-2">
                    <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>สรุปสำนวนและคำศัพท์ที่ได้เรียนรู้:</span>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                      {selectedStory.learningTakeaways.expressions.map((exp, i) => (
                        <li key={i}>{exp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => startStory(selectedStory)}
                      className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-700 text-slate-700 text-xs font-semibold"
                    >
                      เล่นอีกครั้ง
                    </button>
                    <button
                      onClick={() => setSelectedStory(null)}
                      className="px-5 py-2 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/30"
                    >
                      เลือกสถานการณ์อื่น
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

