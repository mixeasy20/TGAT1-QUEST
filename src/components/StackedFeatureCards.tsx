import React from 'react';
import { Brain, MessageSquareText, LineChart, Sparkles } from 'lucide-react';

interface FeatureCardData {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: React.ElementType;
  gradient: string;
  borderGlow: string;
  badgeColor: string;
  iconBg: string;
}

const FEATURE_CARDS: FeatureCardData[] = [
  {
    id: 'srs',
    title: 'Spaced Repetition (SM-2)',
    description: 'ระบบทบทวนคำศัพท์อัจฉริยะ ช่วยจดจำได้นานขึ้น',
    badge: 'Smart SRS',
    icon: Brain,
    gradient: 'from-indigo-50/90 to-white',
    borderGlow: 'border-indigo-100',
    badgeColor: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    iconBg: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: 'conversation',
    title: 'Conversation & Story',
    description: 'ฝึกทำข้อสอบและเรียนภาษาอังกฤษผ่านเรื่องราว',
    badge: 'Popular Quest',
    icon: MessageSquareText,
    gradient: 'from-purple-50/90 to-white',
    borderGlow: 'border-purple-200 shadow-sm shadow-purple-500/10',
    badgeColor: 'bg-purple-50 text-purple-600 border-purple-200',
    iconBg: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'mistake',
    title: 'Mistake Notebook',
    description: 'บันทึกข้อผิดพลาดและติดตามจุดที่ต้องพัฒนา',
    badge: 'Analytics',
    icon: LineChart,
    gradient: 'from-sky-50/90 to-white',
    borderGlow: 'border-sky-100',
    badgeColor: 'bg-sky-50 text-sky-600 border-sky-100',
    iconBg: 'bg-sky-100 text-sky-600',
  },
];

export const StackedFeatureCards: React.FC = () => {
  return (
    <div className="relative w-full py-2 select-none">
      {/* Desktop & Tablet Stack Layout (>= sm) */}
      <div className="hidden sm:block relative h-56 md:h-60 w-full">
        {/* Card 1: Left (Spaced Repetition) */}
        <div
          className="group absolute top-2 left-2 w-[85%] rounded-3xl p-4 bg-white/90 border border-indigo-100/80 shadow-md shadow-indigo-100/40 backdrop-blur-md transition-all duration-300 ease-out origin-bottom-left -rotate-2 hover:rotate-0 hover:scale-105 hover:z-30 animate-float-left cursor-default z-10"
          style={{ animationDelay: '0s' }}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Brain className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600">
              SM-2 Algorithm
            </span>
          </div>
          <h4 className="font-bold text-slate-800 text-xs sm:text-sm tracking-wide">
            Spaced Repetition (SM-2)
          </h4>
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            ระบบทบทวนคำศัพท์อัจฉริยะ ช่วยจดจำได้นานขึ้น
          </p>
        </div>

        {/* Card 3: Right (Mistake Notebook) */}
        <div
          className="group absolute top-7 right-2 w-[85%] rounded-3xl p-4 bg-white/90 border border-sky-100/80 shadow-md shadow-sky-100/40 backdrop-blur-md transition-all duration-300 ease-out origin-bottom-right rotate-2 hover:rotate-0 hover:scale-105 hover:z-30 animate-float-right cursor-default z-10"
          style={{ animationDelay: '1.2s' }}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shrink-0">
              <LineChart className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 border border-sky-100 text-sky-600">
              Self-Growth
            </span>
          </div>
          <h4 className="font-bold text-slate-800 text-xs sm:text-sm tracking-wide">
            Mistake Notebook
          </h4>
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            บันทึกข้อผิดพลาดและติดตามจุดที่ต้องพัฒนา
          </p>
        </div>

        {/* Card 2: Center Highlight (Conversation) */}
        <div
          className="group absolute top-14 left-4 right-4 rounded-3xl p-4 bg-white border border-purple-200/80 shadow-lg shadow-purple-500/10 backdrop-blur-lg transition-all duration-300 ease-out hover:scale-[1.03] animate-float-center cursor-default z-20"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-purple-500/20">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 shadow-2xs">
              <Sparkles className="w-2.5 h-2.5 text-purple-500" />
              Featured Quest
            </span>
          </div>
          <h4 className="font-bold text-slate-800 text-sm tracking-wide flex items-center gap-1.5">
            Conversation Exam & Story Mode
          </h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            ฝึกทำข้อสอบและเรียนภาษาอังกฤษผ่านเรื่องราว
          </p>
        </div>
      </div>

      {/* Mobile Stack Fallback (< sm) */}
      <div className="sm:hidden space-y-2.5">
        {FEATURE_CARDS.map((card) => {
          const Icon = card.icon;
          const isHighlight = card.id === 'conversation';
          return (
            <div
              key={card.id}
              className={`p-3.5 rounded-2xl bg-white border ${
                isHighlight ? 'border-purple-200 shadow-sm shadow-purple-500/10' : 'border-slate-200/70 shadow-2xs'
              } transition-transform active:scale-[0.98]`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${card.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs">{card.title}</h4>
                </div>
                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 pl-9 leading-relaxed">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StackedFeatureCards;
