'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Volume2,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  Search,
  CheckCircle2,
  Sparkles,
  BookOpen,
  X,
  AlertTriangle,
  Lightbulb,
  GraduationCap,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';
import {
  getVocabList,
  getSRSList,
  recordSRSReview,
  addCustomVocab,
  updateCustomVocab,
  deleteVocab,
} from '@/lib/storage';
import { VocabItem, SRSItem, CEFRLevel } from '@/types';
import { speakEnglish } from '@/lib/audio';
import { soundEffects } from '@/lib/soundEffects';
import { isItemDue } from '@/lib/srs';

export default function VocabPage() {
  const { refreshUserData } = useUser();
  const { user } = useAuth();
  const isGuest = Boolean(user?.isAnonymous);
  const [viewMode, setViewMode] = useState<'flashcard' | 'list'>('flashcard');
  const [vocabList, setVocabList] = useState<VocabItem[]>([]);
  const [srsMap, setSrsMap] = useState<Map<string, SRSItem>>(new Map());

  // Flashcard State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Touch Swipe coordinates
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [filterDueOnly, setFilterDueOnly] = useState(false);

  // Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalItem, setEditModalItem] = useState<VocabItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    word: '',
    phonetic: '',
    partOfSpeech: 'noun' as VocabItem['partOfSpeech'],
    meaningTh: '',
    exampleEn: '',
    exampleTh: '',
    category: 'Daily Life' as VocabItem['category'],
    difficulty: 'B1' as CEFRLevel,
    mnemonic: '',
  });

  const loadData = useCallback(() => {
    const vocabs = getVocabList();
    const srsList = getSRSList();
    const map = new Map<string, SRSItem>();
    srsList.forEach((item) => map.set(item.vocabId, item));

    setVocabList(vocabs);
    setSrsMap(map);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filtered List
  const filteredVocabs = useMemo(() => {
    return vocabList.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesWord = item.word.toLowerCase().includes(q);
        const matchesMeaning = item.meaningTh.toLowerCase().includes(q);
        if (!matchesWord && !matchesMeaning) return false;
      }
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedDifficulty !== 'all' && item.difficulty !== selectedDifficulty) {
        return false;
      }
      if (filterDueOnly) {
        const srs = srsMap.get(item.id);
        if (!srs || !isItemDue(srs.dueDate)) {
          return false;
        }
      }
      return true;
    });
  }, [vocabList, srsMap, searchQuery, selectedCategory, selectedDifficulty, filterDueOnly]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [filteredVocabs.length, selectedCategory, selectedDifficulty, filterDueOnly]);

  const currentCard = filteredVocabs[currentIndex] || null;
  const currentSRS = currentCard ? srsMap.get(currentCard.id) : null;

  // Handle Flashcard Flip & Next/Prev
  const handleFlip = () => {
    soundEffects.playFlip();
    setIsFlipped((prev) => !prev);
  };

  const handleNext = () => {
    if (currentIndex < filteredVocabs.length - 1) {
      soundEffects.playSwipe();
      setSwipeDirection('left');
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsFlipped(false);
        setSwipeDirection(null);
      }, 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      soundEffects.playSwipe();
      setSwipeDirection('right');
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setIsFlipped(false);
        setSwipeDirection(null);
      }, 150);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Go Next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Go Prev
      handlePrev();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  // SRS Rating Action
  const handleRating = (rating: 1 | 3 | 5) => {
    if (!currentCard) return;
    if (rating === 5) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playSwipe();
    }
    recordSRSReview(currentCard.id, rating);
    refreshUserData();
    loadData();

    // Move to next card
    if (currentIndex < filteredVocabs.length - 1) {
      setSwipeDirection('left');
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsFlipped(false);
        setSwipeDirection(null);
      }, 150);
    } else {
      setIsFlipped(false);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    if (viewMode !== 'flashcard') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (isFlipped) {
        if (e.key === '1') handleRating(1);
        if (e.key === '2' || e.key === '3') handleRating(3);
        if (e.key === '4' || e.key === '5') handleRating(5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, isFlipped, currentIndex, filteredVocabs.length]);

  // Modal Submit Handlers
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.word.trim() || !formData.meaningTh.trim()) return;

    addCustomVocab({
      word: formData.word.trim(),
      phonetic: formData.phonetic.trim() || `/${formData.word.toLowerCase()}/`,
      partOfSpeech: formData.partOfSpeech,
      meaningTh: formData.meaningTh.trim(),
      exampleEn: formData.exampleEn.trim() || `Use ${formData.word} in an English sentence.`,
      exampleTh: formData.exampleTh.trim() || `ตัวอย่างการใช้คำว่า ${formData.word}`,
      category: formData.category,
      difficulty: formData.difficulty,
      mnemonic: formData.mnemonic.trim() || undefined,
    });

    setAddModalOpen(false);
    setFormData({
      word: '',
      phonetic: '',
      partOfSpeech: 'noun',
      meaningTh: '',
      exampleEn: '',
      exampleTh: '',
      category: 'Daily Life',
      difficulty: 'B1',
      mnemonic: '',
    });
    loadData();
    refreshUserData();
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalItem) return;

    updateCustomVocab(editModalItem.id, {
      word: formData.word.trim(),
      phonetic: formData.phonetic.trim(),
      partOfSpeech: formData.partOfSpeech,
      meaningTh: formData.meaningTh.trim(),
      exampleEn: formData.exampleEn.trim(),
      exampleTh: formData.exampleTh.trim(),
      category: formData.category,
      difficulty: formData.difficulty,
      mnemonic: formData.mnemonic.trim() || undefined,
    });

    setEditModalItem(null);
    loadData();
  };

  const handleDelete = (id: string) => {
    deleteVocab(id);
    setDeleteConfirmId(null);
    loadData();
    refreshUserData();
  };

  const openEditModal = (item: VocabItem) => {
    setEditModalItem(item);
    setFormData({
      word: item.word,
      phonetic: item.phonetic,
      partOfSpeech: item.partOfSpeech,
      meaningTh: item.meaningTh,
      exampleEn: item.exampleEn,
      exampleTh: item.exampleTh,
      category: item.category,
      difficulty: item.difficulty,
      mnemonic: item.mnemonic || '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Vocabulary Arena & Flashcards</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            คลังคำศัพท์ & บัตรคำช่วยจำ (SRS)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            ฝึกท่องคำศัพท์ตามหลักวิทยาศาสตร์ความจำ SuperMemo-2 (SM-2) ทบทวนก่อนลืม
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {!isGuest && (
            <button
              onClick={() => setAddModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่มคำศัพท์ใหม่</span>
            </button>
          )}

          {/* View Mode Toggle */}
          <div className="p-1 rounded-2xl bg-white border border-slate-200 flex items-center">
            <button
              onClick={() => setViewMode('flashcard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'flashcard'
                  ? 'bg-indigo-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              โหมด Flashcards
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-indigo-500 text-white shadow'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              รายชื่อคำศัพท์ ({vocabList.length})
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาคำศัพท์ หรือความหมายภาษาไทย..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Select */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-2xl px-3 py-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">ทุกหมวดหมู่ (All Categories)</option>
          <option value="Academic">Academic (วิชาการ)</option>
          <option value="Daily Life">Daily Life (ชีวิตประจำวัน)</option>
          <option value="Business">Business (ธุรกิจ/ทำงาน)</option>
          <option value="Travel">Travel (ท่องเที่ยว)</option>
          <option value="Social">Social (สังคม/สนทนา)</option>
          <option value="Emotions">Emotions (ความรู้สึก)</option>
        </select>

        {/* Difficulty Select */}
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-2xl px-3 py-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">ทุกระดับ (All CEFR)</option>
          <option value="A2">A2 (พื้นฐาน)</option>
          <option value="B1">B1 (ปานกลาง - TGAT)</option>
          <option value="B2">B2 (ขั้นสูง - TGAT 80+)</option>
        </select>

        {/* Filter Due Only Toggle */}
        <button
          onClick={() => setFilterDueOnly(!filterDueOnly)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-semibold border transition-all ${
            filterDueOnly
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
              : 'bg-slate-100 text-slate-400 border-slate-200 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>เฉพาะที่ถึงกำหนดทบทวน</span>
        </button>
      </div>

      {/* FLASHCARD MODE VIEW */}
      {viewMode === 'flashcard' && (
        <div className="flex flex-col items-center">
          {currentCard ? (
            <div className="w-full max-w-xl flex flex-col items-center">
              {/* Progress counter */}
              <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
                <span>
                  การ์ดที่ <strong className="text-slate-900">{currentIndex + 1}</strong> จากทั้งหมด{' '}
                  <strong className="text-slate-900">{filteredVocabs.length}</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  สถานะ SRS: {currentSRS?.status || 'new'}
                </span>
              </div>

              {/* 3D Flip Card Container with Swipe Gestures */}
              <div
                onClick={handleFlip}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`w-full h-88 cursor-pointer select-none perspective-1000 group transition-transform duration-150 ${
                  swipeDirection === 'left'
                    ? '-translate-x-12 opacity-80 rotate-[-2deg]'
                    : swipeDirection === 'right'
                    ? 'translate-x-12 opacity-80 rotate-[2deg]'
                    : 'translate-x-0 opacity-100'
                }`}
              >
                <div
                  className={`relative w-full h-full rounded-3xl flashcard-inner transform-style-3d shadow-2xl ${
                    isFlipped ? 'rotate-y-180 flashcard-glow-back' : 'flashcard-glow-front'
                  }`}
                >
                  {/* FRONT SIDE (English) */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/30 border-2 border-slate-200 group-hover:border-indigo-500/50 p-7 flex flex-col justify-between backface-hidden">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {currentCard.category}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-400 border border-slate-200">
                            {currentCard.difficulty}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakEnglish(currentCard.word);
                          }}
                          className="btn-flourish p-2.5 rounded-2xl bg-slate-100 hover:bg-indigo-600 text-indigo-400 hover:text-slate-900 transition-colors shadow"
                          title="ฟังการออกเสียง"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Official Exam Reference Badge */}
                      {currentCard.examReference && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-medium">
                          <GraduationCap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="line-clamp-1">{currentCard.examReference}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-center my-auto py-2">
                      <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight drop-shadow-md">
                        {currentCard.word}
                      </h2>
                      <p className="text-sm text-slate-400 font-mono mt-2 tracking-wide">
                        {currentCard.phonetic}
                      </p>
                      <span className="inline-block mt-3 px-3.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-indigo-300 border border-slate-200 italic">
                        {currentCard.partOfSpeech}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200 pt-3">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                        <span>กด Spacebar หรือคลิกการ์ดเพื่อดูความหมาย</span>
                      </span>
                      <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 text-slate-400 group-hover:text-indigo-400" />
                    </div>
                  </div>

                  {/* BACK SIDE (Thai Meaning & Details) */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/30 border border-emerald-200 shadow-md shadow-emerald-100/30 p-7 flex flex-col justify-between backface-hidden rotate-y-180">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-indigo-400">
                          {currentCard.word}
                        </span>
                        <span className="text-[10px] text-slate-400">({currentCard.partOfSpeech})</span>
                      </div>
                      {currentCard.examReference ? (
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {currentCard.examReference.split('•')[0].trim()}
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400">
                          {currentCard.source}
                        </span>
                      )}
                    </div>

                    <div className="space-y-3 my-auto py-1">
                      <div>
                        <div className="text-[11px] text-slate-400 font-medium">ความหมายภาษาไทย:</div>
                        <div className="text-2xl md:text-3xl font-black text-emerald-400 mt-0.5 tracking-tight">
                          {currentCard.meaningTh}
                        </div>
                      </div>

                      <div className="p-3 rounded-3xl bg-slate-50 border border-slate-200 text-xs">
                        <div className="text-slate-100 font-medium italic">
                          &quot;{currentCard.exampleEn}&quot;
                        </div>
                        <div className="text-slate-400 text-[11px] mt-1">
                          {currentCard.exampleTh}
                        </div>
                      </div>

                      {currentCard.mnemonic && (
                        <div className="flex items-start gap-2 p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                          <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                          <div>
                            <span className="font-bold">เทคนิคการจำ: </span>
                            <span>{currentCard.mnemonic}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-center text-[11px] text-slate-400 border-t border-slate-200 pt-2 flex items-center justify-center gap-1.5">
                      <span>เลือกระดับความจำด้านล่างเพื่อบันทึกลงระบบ SRS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation & SRS Evaluation Buttons */}
              <div className="w-full mt-6 space-y-4">
                {isFlipped ? (
                  /* SRS Feedback Buttons */
                  <div className="grid grid-cols-3 gap-3 animate-in fade-in duration-200">
                    <button
                      onClick={() => handleRating(1)}
                      className="btn-flourish flex flex-col items-center justify-center py-3 px-2 rounded-3xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 transition-all hover:scale-102 active:scale-98 shadow-sm"
                    >
                      <span className="text-xs font-bold">จำไม่ได้ (Hard)</span>
                      <span className="text-[10px] text-rose-400 mt-0.5">ทบทวนพรุ่งนี้ (+5 XP)</span>
                      <span className="text-[9px] text-slate-400 mt-1">กด 1</span>
                    </button>

                    <button
                      onClick={() => handleRating(3)}
                      className="btn-flourish flex flex-col items-center justify-center py-3 px-2 rounded-3xl bg-indigo-500/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 transition-all hover:scale-102 active:scale-98 shadow-sm"
                    >
                      <span className="text-xs font-bold">จำได้ (Good)</span>
                      <span className="text-[10px] text-indigo-400 mt-0.5">เว้นระยะตามรอบ (+15 XP)</span>
                      <span className="text-[9px] text-slate-400 mt-1">กด 3</span>
                    </button>

                    <button
                      onClick={() => handleRating(5)}
                      className="btn-flourish flex flex-col items-center justify-center py-3 px-2 rounded-3xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 transition-all hover:scale-102 active:scale-98 shadow-sm"
                    >
                      <span className="text-xs font-bold">จำได้แม่น (Easy)</span>
                      <span className="text-[10px] text-emerald-400 mt-0.5">เว้นระยะยาวขึ้น (+25 XP)</span>
                      <span className="text-[9px] text-slate-400 mt-1">กด 5</span>
                    </button>
                  </div>
                ) : (
                  /* Navigation between cards */
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                      className="btn-flourish flex-1 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>เลื่อนซ้าย / ก่อนหน้า (←)</span>
                    </button>

                    <button
                      onClick={handleFlip}
                      className="btn-flourish shine-sweep flex-1 py-3 px-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                    >
                      <RotateCw className="w-4 h-4" />
                      <span>พลิกการ์ด (Space)</span>
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={currentIndex === filteredVocabs.length - 1}
                      className="btn-flourish flex-1 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-all cursor-pointer"
                    >
                      <span>เลื่อนขวา / ถัดไป (→)</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 px-4 max-w-md">
              <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">ไม่พบคำศัพท์ตามเงื่อนไข</h3>
              <p className="text-xs text-slate-400 mt-2">
                คุณอาจทบทวนคำศัพท์ที่ถึงกำหนดหมดแล้ว หรือไม่มีคำศัพท์ที่ตรงกับการค้นหา
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                  setFilterDueOnly(false);
                }}
                className="mt-4 px-4 py-2 rounded-2xl bg-indigo-500 text-white text-xs font-semibold hover:bg-indigo-600 transition-colors"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          )}
        </div>
      )}

      {/* LIST & MANAGEMENT MODE VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            แสดง {filteredVocabs.length} จากทั้งหมด {vocabList.length} รายการ
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVocabs.map((vocab) => {
              const srs = srsMap.get(vocab.id);
              const due = srs ? isItemDue(srs.dueDate) : false;

              return (
                <div
                  key={vocab.id}
                  className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-slate-200 card-hover-lift transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Category & Badges */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-indigo-400 border border-slate-200">
                          {vocab.category}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-400 border border-slate-200">
                          {vocab.difficulty}
                        </span>
                        {vocab.isCustom && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Custom
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakEnglish(vocab.word)}
                          className="btn-flourish p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                          title="ฟังเสียงอ่าน"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        {vocab.isCustom && (
                          <>
                            <button
                              onClick={() => openEditModal(vocab)}
                              className="btn-flourish p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-100"
                              title="แก้ไขคำศัพท์"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(vocab.id)}
                              className="btn-flourish p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-100"
                              title="ลบคำศัพท์"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Word & Meaning */}
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">{vocab.word}</h3>
                      <span className="text-xs text-slate-400 italic">({vocab.partOfSpeech})</span>
                    </div>
                    <div className="text-sm font-semibold text-emerald-400 mt-1">
                      {vocab.meaningTh}
                    </div>

                    {/* Exam Reference */}
                    {vocab.examReference && (
                      <div className="mt-2 text-[10px] text-indigo-300 flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span className="line-clamp-1">{vocab.examReference}</span>
                      </div>
                    )}

                    {/* Example */}
                    <div className="mt-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                      <div className="italic">&quot;{vocab.exampleEn}&quot;</div>
                      <div className="text-slate-400 text-[10px] mt-0.5">{vocab.exampleTh}</div>
                    </div>
                  </div>

                  {/* SRS Meta */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      สถานะ:{' '}
                      <strong
                        className={`capitalize ${
                          srs?.status === 'mastered'
                            ? 'text-emerald-400'
                            : srs?.status === 'learning'
                            ? 'text-indigo-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {srs?.status || 'new'}
                      </strong>
                    </span>
                    {due ? (
                      <span className="text-amber-400 font-bold animate-pulse">
                        ถึงกำหนดทบทวนแล้ว
                      </span>
                    ) : (
                      <span>รอบถัดไป: {srs ? `${srs.interval} วัน` : 'ยังไม่เคย'}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {(addModalOpen || editModalItem) && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setAddModalOpen(false);
                setEditModalItem(null);
              }}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {editModalItem ? 'แก้ไขคำศัพท์ส่วนตัว' : 'เพิ่มคำศัพท์ส่วนตัว (Personal Word)'}
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              คำศัพท์ที่เพิ่มจะถูกเก็บไว้ใน My Collection และนำไปฝึกในระบบ SRS ได้ทันที
            </p>

            <form onSubmit={editModalItem ? handleEditSubmit : handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    คำศัพท์ (English Word)*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.word}
                    onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                    placeholder="เช่น anticipate"
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    คำอ่าน (Phonetic)
                  </label>
                  <input
                    type="text"
                    value={formData.phonetic}
                    onChange={(e) => setFormData({ ...formData, phonetic: e.target.value })}
                    placeholder="/ænˈtɪs.ə.peɪt/"
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    ชนิดของคำ (POS)
                  </label>
                  <select
                    value={formData.partOfSpeech}
                    onChange={(e) =>
                      setFormData({ ...formData, partOfSpeech: e.target.value as VocabItem['partOfSpeech'] })
                    }
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="verb">Verb (v.)</option>
                    <option value="noun">Noun (n.)</option>
                    <option value="adjective">Adjective (adj.)</option>
                    <option value="adverb">Adverb (adv.)</option>
                    <option value="phrase">Phrase</option>
                    <option value="idiom">Idiom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">หมวดหมู่</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as VocabItem['category'] })
                    }
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Daily Life">Daily Life</option>
                    <option value="Business">Business</option>
                    <option value="Travel">Travel</option>
                    <option value="Social">Social</option>
                    <option value="Emotions">Emotions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">ระดับ CEFR</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({ ...formData, difficulty: e.target.value as CEFRLevel })
                    }
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  ความหมายภาษาไทย*
                </label>
                <input
                  type="text"
                  required
                  value={formData.meaningTh}
                  onChange={(e) => setFormData({ ...formData, meaningTh: e.target.value })}
                  placeholder="เช่น คาดหมาย, คาดเดาล่วงหน้า"
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  ตัวอย่างประโยคภาษาอังกฤษ
                </label>
                <textarea
                  rows={2}
                  value={formData.exampleEn}
                  onChange={(e) => setFormData({ ...formData, exampleEn: e.target.value })}
                  placeholder="เช่น We anticipate a large turnout for the seminar."
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  คำแปลตัวอย่างภาษาไทย
                </label>
                <textarea
                  rows={2}
                  value={formData.exampleTh}
                  onChange={(e) => setFormData({ ...formData, exampleTh: e.target.value })}
                  placeholder="เช่น พวกเราคาดว่าจะมีผู้เข้าร่วมสัมมนาเป็นจำนวนมาก"
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  เทคนิคการจำ / คำช่วยจำ (Mnemonic)
                </label>
                <input
                  type="text"
                  value={formData.mnemonic}
                  onChange={(e) => setFormData({ ...formData, mnemonic: e.target.value })}
                  placeholder="เช่น Anti (ก่อน) + pate -> คิดล่วงหน้า"
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setAddModalOpen(false);
                    setEditModalItem(null);
                  }}
                  className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-700 text-slate-600 text-xs font-semibold"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/30"
                >
                  {editModalItem ? 'บันทึกการแก้ไข' : 'เพิ่มคำศัพท์'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 text-slate-900 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-3 border border-rose-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">ยืนยันการลบคำศัพท์?</h3>
            <p className="text-xs text-slate-400 mt-1">
              คำศัพท์นี้และประวัติการทบทวน SRS ทั้งหมดจะถูกลบออกจากระบบอย่างถาวร
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-700 text-slate-600 text-xs font-semibold"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-md shadow-rose-600/30"
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

