'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookmarkCheck,
  Plus,
  BookOpen,
  Sparkles,
  Search,
  Trash2,
  Edit2,
  Volume2,
  ArrowRight,
  AlertTriangle,
  FolderPlus,
  Layers,
  Download,
  FileSpreadsheet,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';
import { GuestRestrictionNotice } from '@/components/GuestRestrictionNotice';
import {
  getVocabList,
  getExpressions,
  deleteVocab,
  deleteExpression,
} from '@/lib/storage';
import { exportAllDataAsJSON, exportVocabAsCSV } from '@/lib/dataExport';
import { soundEffects } from '@/lib/soundEffects';
import { VocabItem, ExpressionItem } from '@/types';
import { speakEnglish } from '@/lib/audio';

export default function CollectionPage() {
  const { user } = useAuth();
  const isGuest = Boolean(user?.isAnonymous);
  const { refreshUserData } = useUser();
  const [activeTab, setActiveTab] = useState<'vocab' | 'expression'>('vocab');
  const [customVocab, setCustomVocab] = useState<VocabItem[]>([]);
  const [customExpressions, setCustomExpressions] = useState<ExpressionItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{
    id: string;
    type: 'vocab' | 'expression';
  } | null>(null);

  const loadData = () => {
    const vocabs = getVocabList().filter((v) => v.isCustom);
    const expressions = getExpressions().filter((e) => e.isCustom);
    setCustomVocab(vocabs);
    setCustomExpressions(expressions);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === 'vocab') {
      deleteVocab(deleteConfirm.id);
    } else {
      deleteExpression(deleteConfirm.id);
    }
    setDeleteConfirm(null);
    loadData();
    refreshUserData();
  };

  const filteredVocab = customVocab.filter((v) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return v.word.toLowerCase().includes(q) || v.meaningTh.toLowerCase().includes(q);
  });

  const filteredExpressions = customExpressions.filter((e) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.expression.toLowerCase().includes(q) ||
      e.meaningTh.toLowerCase().includes(q) ||
      e.intention.toLowerCase().includes(q)
    );
  });

  if (isGuest) {
    return (
      <GuestRestrictionNotice
        featureName="My Collection (คลังส่วนตัวของฉัน)"
        description="ในโหมดผู้เยี่ยมชม คุณสามารถเข้าใช้งานได้เฉพาะส่วน Flashcard (Vocabulary Arena) เท่านั้น เข้าสู่ระบบเพื่อสร้างคำศัพท์และสำนวนส่วนตัวของคุณ"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <BookmarkCheck className="w-4 h-4" />
            <span>Personal Collection</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
            คลังความรู้ส่วนตัวของฉัน
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            รวบรวมคำศัพท์และสำนวนที่คุณเพิ่มเอง แยกจากชุดฝึกมาตรฐาน และนำเข้าสู่ระบบ Spaced Repetition อัตโนมัติ
          </p>
        </div>

        {/* Action button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Export Buttons */}
          <button
            onClick={() => {
              soundEffects.playSwipe();
              exportVocabAsCSV();
            }}
            className="btn-flourish flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer transition-all shadow-sm"
            title="ดาวน์โหลดคำศัพท์ทั้งหมดเป็นไฟล์ Excel / CSV"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>ส่งออก CSV (Excel)</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playVictory();
              exportAllDataAsJSON();
            }}
            className="btn-flourish flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer transition-all shadow-sm"
            title="สำรองข้อมูลคลังคำศัพท์ สถิติ และข้อผิดพลาดทั้งหมดเป็นไฟล์ JSON"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>สำรองข้อมูล JSON</span>
          </button>

          <Link
            href="/vocab"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>ไปเพิ่มใน Vocabulary Arena</span>
          </Link>
          <Link
            href="/expressions"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25"
          >
            <Sparkles className="w-4 h-4" />
            <span>ไปเพิ่มใน Expression Bank</span>
          </Link>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="p-1 rounded-xl bg-slate-800 flex items-center">
          <button
            onClick={() => setActiveTab('vocab')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'vocab'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            คำศัพท์ส่วนตัว ({customVocab.length})
          </button>
          <button
            onClick={() => setActiveTab('expression')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'expression'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            สำนวนส่วนตัว ({customExpressions.length})
          </button>
        </div>

        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาในคลังส่วนตัว..."
            className="w-full pl-10 pr-4 py-1.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* TAB 1: CUSTOM VOCABULARY */}
      {activeTab === 'vocab' && (
        <div className="space-y-4">
          {filteredVocab.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVocab.map((vocab) => (
                <div
                  key={vocab.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {vocab.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakEnglish(vocab.word)}
                          className="p-1 rounded text-slate-400 hover:text-white"
                          title="ฟังเสียงอ่าน"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ id: vocab.id, type: 'vocab' })}
                          className="p-1 rounded text-slate-400 hover:text-rose-400"
                          title="ลบคำศัพท์"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xl font-bold text-white tracking-tight">{vocab.word}</h3>
                      <span className="text-xs text-slate-400 italic">({vocab.partOfSpeech})</span>
                    </div>
                    <div className="text-sm font-semibold text-emerald-400 mt-1">
                      {vocab.meaningTh}
                    </div>

                    <div className="mt-3 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-[11px] text-slate-300">
                      <div className="italic">&quot;{vocab.exampleEn}&quot;</div>
                      <div className="text-slate-400 text-[10px] mt-0.5">{vocab.exampleTh}</div>
                    </div>

                    {vocab.mnemonic && (
                      <div className="mt-2 text-[10px] text-amber-300">
                        💡 {vocab.mnemonic}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>ระดับ {vocab.difficulty}</span>
                    <span className="text-indigo-400 font-semibold">อยู่ในระบบ SRS แล้ว</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-slate-900/50 border border-slate-800/80 rounded-3xl">
              <FolderPlus className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">ยังไม่มีคำศัพท์ส่วนตัว</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                คุณสามารถเพิ่มคำศัพท์ที่คุณเจอในห้องเรียนหรือโจทย์ภายนอก เพื่อนำมาฝึกในระบบ Flashcards ได้
              </p>
              <Link
                href="/vocab"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow"
              >
                <Plus className="w-4 h-4" />
                <span>เพิ่มคำศัพท์แรกของคุณ</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CUSTOM EXPRESSIONS */}
      {activeTab === 'expression' && (
        <div className="space-y-4">
          {filteredExpressions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExpressions.map((exp) => (
                <div
                  key={exp.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {exp.register}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => speakEnglish(exp.expression)}
                          className="p-1 rounded text-slate-400 hover:text-white"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ id: exp.id, type: 'expression' })}
                          className="p-1 rounded text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight">&quot;{exp.expression}&quot;</h3>
                    <div className="text-sm font-semibold text-emerald-400 mt-1">
                      {exp.meaningTh}
                    </div>

                    <div className="mt-2 text-xs text-indigo-300">
                      <span className="text-slate-400 font-bold">เจตนา: </span>
                      {exp.intention}
                    </div>

                    <div className="mt-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs space-y-1">
                      {exp.exampleDialogue.map((d, i) => (
                        <div key={i} className="text-slate-300">
                          <span className="font-bold text-slate-400">{d.speaker}: </span>
                          {d.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>สร้างเมื่อ: {exp.createdAt.split('T')[0]}</span>
                    <span className="text-amber-400 font-semibold">My Collection</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-slate-900/50 border border-slate-800/80 rounded-3xl">
              <Sparkles className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">ยังไม่มีสำนวนส่วนตัว</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                จดบันทึกสำนวนที่คุณประทับใจหรือข้อที่เคยทำผิด เพื่อกลับมาทบทวนให้จำขึ้นใจ
              </p>
              <Link
                href="/expressions"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow"
              >
                <Plus className="w-4 h-4" />
                <span>เพิ่มสำนวนส่วนตัว</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-white shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-3 border border-rose-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">ยืนยันการลบรายการนี้?</h3>
            <p className="text-xs text-slate-400 mt-1">
              ข้อมูลนี้จะถูกลบออกจากคลังส่วนตัวของคุณอย่างถาวร
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/30"
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

