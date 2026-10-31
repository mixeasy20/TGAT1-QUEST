'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  Star,
  Plus,
  Volume2,
  Trash2,
  ExternalLink,
  BookOpen,
  X,
  MessageSquare,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';
import { GuestRestrictionNotice } from '@/components/GuestRestrictionNotice';
import {
  getExpressions,
  toggleExpressionBookmark,
  addCustomExpression,
  deleteExpression,
} from '@/lib/storage';
import { ExpressionItem } from '@/types';
import { speakEnglish } from '@/lib/audio';

export default function ExpressionsPage() {
  const { user } = useAuth();
  const isGuest = Boolean(user?.isAnonymous);
  const { refreshUserData } = useUser();
  const [expressions, setExpressions] = useState<ExpressionItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegister, setSelectedRegister] = useState<string>('all');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  // Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    expression: '',
    meaningTh: '',
    register: 'Polite' as ExpressionItem['register'],
    intention: '',
    dialogueSpeakerA: 'Person A',
    dialogueTextA: '',
    dialogueSpeakerB: 'Person B',
    dialogueTextB: '',
    note: '',
  });

  const loadData = () => {
    setExpressions(getExpressions());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleBookmark = (id: string) => {
    toggleExpressionBookmark(id);
    loadData();
  };

  const handleDelete = (id: string) => {
    deleteExpression(id);
    loadData();
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.expression.trim() || !formData.meaningTh.trim()) return;

    addCustomExpression({
      expression: formData.expression.trim(),
      meaningTh: formData.meaningTh.trim(),
      register: formData.register,
      intention: formData.intention.trim() || 'สำนวนใช้ในชีวิตประจำวัน',
      exampleDialogue: [
        {
          speaker: formData.dialogueSpeakerA || 'Person A',
          text: formData.dialogueTextA || 'Example question or situation',
        },
        {
          speaker: formData.dialogueSpeakerB || 'Person B',
          text: formData.dialogueTextB || formData.expression,
        },
      ],
      note: formData.note.trim() || undefined,
    });

    setAddModalOpen(false);
    setFormData({
      expression: '',
      meaningTh: '',
      register: 'Polite',
      intention: '',
      dialogueSpeakerA: 'Person A',
      dialogueTextA: '',
      dialogueSpeakerB: 'Person B',
      dialogueTextB: '',
      note: '',
    });
    loadData();
    refreshUserData();
  };

  const filtered = useMemo(() => {
    return expressions.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchExp = item.expression.toLowerCase().includes(q);
        const matchMean = item.meaningTh.toLowerCase().includes(q);
        const matchIntention = item.intention.toLowerCase().includes(q);
        if (!matchExp && !matchMean && !matchIntention) return false;
      }
      if (selectedRegister !== 'all' && item.register !== selectedRegister) {
        return false;
      }
      if (bookmarkedOnly && !item.isBookmarked) {
        return false;
      }
      return true;
    });
  }, [expressions, searchQuery, selectedRegister, bookmarkedOnly]);

  if (isGuest) {
    return (
      <GuestRestrictionNotice
        featureName="Expression Bank (คลังสำนวนออกสอบ)"
        description="ในโหมดผู้เยี่ยมชม คุณสามารถเข้าใช้งานได้เฉพาะส่วน Flashcard (Vocabulary Arena) เท่านั้น เข้าสู่ระบบเพื่อเปิดคลังสำนวนและตัวอย่างบทสนทนาทั้งหมด"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Expression Bank</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-0.5">
            คลังสำนวน & วลีออกสอบบ่อย
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            รวมสำนวนภาษาอังกฤษ เจตนาผู้พูด (Speaker Intention) และระดับความสุภาพที่พบบ่อยใน TGAT1
          </p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md shadow-amber-600/20 transition-transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มสำนวนส่วนตัว</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาสำนวน ความหมาย หรือเจตนาผู้พูด..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
        </div>

        <select
          value={selectedRegister}
          onChange={(e) => setSelectedRegister(e.target.value)}
          className="bg-slate-800/80 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
        >
          <option value="all">ทุกระดับความสุภาพ (All Registers)</option>
          <option value="Polite">Polite (สุภาพทางการศึกษา/บริการ)</option>
          <option value="Formal">Formal (เป็นทางการ)</option>
          <option value="Casual">Casual (เป็นกันเองกับเพื่อน)</option>
          <option value="Idiom">Idiom (สำนวนเปรียบเปรย)</option>
        </select>

        <button
          onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
            bookmarkedOnly
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>เฉพาะที่ติดดาว</span>
        </button>
      </div>

      {/* Expression Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Top: Badges & Bookmark */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.register === 'Formal'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : item.register === 'Polite'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : item.register === 'Idiom'
                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {item.register}
                  </span>
                  {item.isCustom && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      My Expression
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => speakEnglish(item.expression)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                    title="ฟังเสียงอ่าน"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleBookmark(item.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      item.isBookmarked
                        ? 'text-amber-400 bg-amber-500/10'
                        : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
                    }`}
                    title="ติดดาวบันทึก"
                  >
                    <Star className={`w-4 h-4 ${item.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                  {item.isCustom && (
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                      title="ลบสำนวน"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Expression Text & Meaning */}
              <h3 className="text-lg font-bold text-white tracking-tight">&quot;{item.expression}&quot;</h3>
              <div className="text-sm font-semibold text-emerald-400 mt-1">{item.meaningTh}</div>

              {/* Intention Pill */}
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-indigo-300">
                <span className="font-bold text-slate-400">เจตนา:</span>
                <span>{item.intention}</span>
              </div>

              {/* Dialogue snippet */}
              <div className="mt-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1.5 text-xs">
                {item.exampleDialogue.map((d, i) => (
                  <div key={i} className="text-slate-300">
                    <span className="font-bold text-slate-400">{d.speaker}:</span> {d.text}
                  </div>
                ))}
              </div>

              {item.note && (
                <div className="mt-2 text-[11px] text-slate-400 italic">
                  💡 {item.note}
                </div>
              )}
            </div>

            {/* Bottom: Related links */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">แหล่งข้อมูล: {item.source}</span>
              {item.relatedConversationId && (
                <Link
                  href="/conversation"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>ฝึกในบทสนทนา</span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 px-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-3 border border-amber-500/20">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white">ไม่พบสำนวนที่ตรงกับการค้นหา</h3>
          <p className="text-xs text-slate-400 mt-1">
            ลองปรับเปลี่ยนคำค้นหา หรือกดล้างตัวกรอง
          </p>
        </div>
      )}

      {/* ADD CUSTOM EXPRESSION MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">เพิ่มสำนวนส่วนตัว (Custom Expression)</h3>
            <p className="text-xs text-slate-400 mb-5">
              บันทึกสำนวนใหม่พร้อมบริบทและเจตนาผู้พูดเพื่อใช้ทบทวนเตรียมสอบ
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  สำนวน / วลีภาษาอังกฤษ*
                </label>
                <input
                  type="text"
                  required
                  value={formData.expression}
                  onChange={(e) => setFormData({ ...formData, expression: e.target.value })}
                  placeholder="เช่น Could you please elaborate on that?"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  ความหมายภาษาไทย*
                </label>
                <input
                  type="text"
                  required
                  value={formData.meaningTh}
                  onChange={(e) => setFormData({ ...formData, meaningTh: e.target.value })}
                  placeholder="เช่น รบกวนช่วยอธิบายเพิ่มเติมให้หน่อยได้ไหม"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    ระดับความสุภาพ (Register)
                  </label>
                  <select
                    value={formData.register}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        register: e.target.value as ExpressionItem['register'],
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Polite">Polite (สุภาพ)</option>
                    <option value="Formal">Formal (ทางการ)</option>
                    <option value="Casual">Casual (กันเอง)</option>
                    <option value="Idiom">Idiom (สำนวน)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    เจตนาผู้พูด (Speaker Intention)
                  </label>
                  <input
                    type="text"
                    value={formData.intention}
                    onChange={(e) => setFormData({ ...formData, intention: e.target.value })}
                    placeholder="เช่น ขอคำอธิบายเพิ่มเติมอย่างสุภาพ"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
                <div className="text-xs font-semibold text-slate-300">ตัวอย่างบทสนทนา (Mini Dialogue)</div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Speaker A"
                    value={formData.dialogueSpeakerA}
                    onChange={(e) => setFormData({ ...formData, dialogueSpeakerA: e.target.value })}
                    className="px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="ประโยคของ A..."
                    value={formData.dialogueTextA}
                    onChange={(e) => setFormData({ ...formData, dialogueTextA: e.target.value })}
                    className="col-span-2 px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Speaker B"
                    value={formData.dialogueSpeakerB}
                    onChange={(e) => setFormData({ ...formData, dialogueSpeakerB: e.target.value })}
                    className="px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="ประโยคของ B (ใช้สำนวน)..."
                    value={formData.dialogueTextB}
                    onChange={(e) => setFormData({ ...formData, dialogueTextB: e.target.value })}
                    className="col-span-2 px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  หมายเหตุ / เทคนิคการจำ
                </label>
                <input
                  type="text"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="เช่น นิยมใช้ปิดท้ายการเจรจาหรือสอบสัมภาษณ์"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-md shadow-amber-600/30"
                >
                  บันทึกสำนวน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

