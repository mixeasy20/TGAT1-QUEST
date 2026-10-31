'use client';

import React, { useState } from 'react';
import { Plus, X, BookOpen } from 'lucide-react';
import { addCustomVocab } from '@/lib/storage';
import { VocabItem, CEFRLevel } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useUser } from '@/context/UserContext';
import { soundEffects } from '@/lib/soundEffects';

export function MobileAddWordFAB() {
  const { user } = useAuth();
  const { refreshUserData } = useUser();
  const isGuest = Boolean(user?.isAnonymous);
  const [modalOpen, setModalOpen] = useState(false);

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

  if (isGuest) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.word.trim() || !formData.meaningTh.trim()) return;

    addCustomVocab({
      word: formData.word.trim(),
      phonetic: formData.phonetic.trim() || `/${formData.word.toLowerCase()}/`,
      partOfSpeech: formData.partOfSpeech,
      meaningTh: formData.meaningTh.trim(),
      exampleEn: formData.exampleEn.trim() || `Use ${formData.word} in a sentence.`,
      exampleTh: formData.exampleTh.trim() || `ตัวอย่างการใช้คำว่า ${formData.word}`,
      category: formData.category,
      difficulty: formData.difficulty,
      mnemonic: formData.mnemonic.trim() || undefined,
    });

    soundEffects.playVictory();
    setModalOpen(false);
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
    refreshUserData();
  };

  return (
    <>
      {/* Floating Action Button (FAB) on Mobile Only */}
      <div className="lg:hidden fixed bottom-20 right-4 z-40">
        <button
          onClick={() => {
            soundEffects.playSwipe();
            setModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-[0_8px_25px_rgba(79,70,229,0.45)] border border-indigo-400 active:scale-95 transition-all cursor-pointer"
          aria-label="เพิ่มคำศัพท์ใหม่"
        >
          <Plus className="w-5 h-5" />
          <span className="font-extrabold tracking-tight">เพิ่มคำศัพท์</span>
        </button>
      </div>

      {/* Add Vocab Modal for Mobile */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl relative max-h-[88vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">เพิ่มคำศัพท์ใหม่ (Personal Vocab)</h3>
                  <p className="text-[11px] text-slate-500 font-medium">บันทึกเข้าสู่คลังส่วนตัวและฝึกในระบบ SRS ได้ทันที</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  คำศัพท์ภาษาอังกฤษ (English Word)*
                </label>
                <input
                  type="text"
                  required
                  value={formData.word}
                  onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                  placeholder="เช่น versatile, negotiate"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ความหมายภาษาไทย (Meaning in Thai)*
                </label>
                <input
                  type="text"
                  required
                  value={formData.meaningTh}
                  onChange={(e) => setFormData({ ...formData, meaningTh: e.target.value })}
                  placeholder="เช่น สารพัดประโยชน์, เจรจาต่อรอง"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ชนิดของคำ (POS)</label>
                  <select
                    value={formData.partOfSpeech}
                    onChange={(e) =>
                      setFormData({ ...formData, partOfSpeech: e.target.value as VocabItem['partOfSpeech'] })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
                  >
                    <option value="verb">Verb (กริยา)</option>
                    <option value="noun">Noun (คำนาม)</option>
                    <option value="adjective">Adjective (คุณศัพท์)</option>
                    <option value="adverb">Adverb (กริยาวิเศษณ์)</option>
                    <option value="phrase">Phrase (วลี)</option>
                    <option value="idiom">Idiom (สำนวน)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">หมวดหมู่</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as VocabItem['category'] })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
                  >
                    <option value="Daily Life">Daily Life (ชีวิตประจำวัน)</option>
                    <option value="Academic">Academic (วิชาการ/สอบ)</option>
                    <option value="Business">Business (ธุรกิจ/ทำงาน)</option>
                    <option value="Travel">Travel (ท่องเที่ยว)</option>
                    <option value="Social">Social (สังคม)</option>
                    <option value="Emotions">Emotions (ความรู้สึก)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ตัวอย่างประโยค (Example Sentence)
                </label>
                <input
                  type="text"
                  value={formData.exampleEn}
                  onChange={(e) => setFormData({ ...formData, exampleEn: e.target.value })}
                  placeholder="เช่น She is a versatile actress."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  เทคนิคช่วยจำ (Mnemonic)
                </label>
                <input
                  type="text"
                  value={formData.mnemonic}
                  onChange={(e) => setFormData({ ...formData, mnemonic: e.target.value })}
                  placeholder="เช่น Versa (หมุน/เปลี่ยน) -> เปลี่ยนแปลงใช้งานได้หลายอย่าง"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-transform active:scale-95 cursor-pointer"
                >
                  บันทึกคำศัพท์
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
