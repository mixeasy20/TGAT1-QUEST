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
    gradient: 'from-slate-900/90 via-indigo-950/40 to-slate-900/90',
    borderGlow: 'border-indigo-500/30 group-hover:border-indigo-400/60 shadow-indigo-950/50',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    iconBg: 'bg-indigo-500/20 text-indigo-400',
  },
  {
    id: 'conversation',
    title: 'Conversation Exam & Story Mode',
    description: 'ฝึกทำข้อสอบและเรียนภาษาอังกฤษผ่านเรื่องราว',
    badge: 'Popular Quest',
    icon: MessageSquareText,
    gradient: 'from-slate-900/95 via-purple-950/50 to-slate-900/95',
    borderGlow: 'border-purple-500/40 group-hover:border-purple-400/80 shadow-purple-950/60 ring-1 ring-purple-500/20',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    iconBg: 'bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-lg shadow-purple-500/25',
  },
  {
    id: 'mistake',
    title: 'Mistake Notebook',
    description: 'บันทึกข้อผิดพลาดและติดตามจุดที่ต้องพัฒนา',
    badge: 'Analytics',
    icon: LineChart,
    gradient: 'from-slate-900/90 via-cyan-950/40 to-slate-900/90',
    borderGlow: 'border-cyan-500/30 group-hover:border-cyan-400/60 shadow-cyan-950/50',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    iconBg: 'bg-cyan-500/20 text-cyan-400',
  },
];

export const StackedFeatureCards: React.FC = () => {
  return (
    <div className="relative w-full py-4 select-none">
      {/* Ambient background glow behind cards */}
      <div className="absolute inset-0 -top-6 -bottom-6 bg-gradient-to-r from-indigo-500/10 via-purple-500/15 to-cyan-500/10 blur-2xl rounded-3xl pointer-events-none" />

      {/* Desktop & Tablet Overlapping Stack Layout (>= sm) */}
      <div className="hidden sm:block relative h-56 md:h-64 w-full">
        {/* Card 1: Left / Background (Spaced Repetition) */}
        <div
          className="group absolute top-1 left-2 w-[85%] rounded-2xl p-4 bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-indigo-950/60 border border-indigo-500/30 backdrop-blur-md shadow-xl transition-all duration-300 ease-out origin-bottom-left -rotate-2 hover:rotate-0 hover:scale-105 hover:z-30 hover:shadow-indigo-500/20 animate-float-left cursor-default z-10"
          style={{ animationDelay: '0s' }}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
              <Brain className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300">
              SM-2 Algorithm
            </span>
          </div>
          <h4 className="font-bold text-white text-xs sm:text-sm tracking-wide">
            Spaced Repetition (SM-2)
          </h4>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            ระบบทบทวนคำศัพท์อัจฉริยะ ช่วยจดจำได้นานขึ้น
          </p>
        </div>

        {/* Card 3: Right / Background (Mistake Notebook) */}
        <div
          className="group absolute top-7 right-2 w-[85%] rounded-2xl p-4 bg-gradient-to-bl from-slate-900/90 via-slate-900/95 to-cyan-950/60 border border-cyan-500/30 backdrop-blur-md shadow-xl transition-all duration-300 ease-out origin-bottom-right rotate-2 hover:rotate-0 hover:scale-105 hover:z-30 hover:shadow-cyan-500/20 animate-float-right cursor-default z-10"
          style={{ animationDelay: '1.2s' }}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <LineChart className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/25 text-cyan-300">
              Self-Growth
            </span>
          </div>
          <h4 className="font-bold text-white text-xs sm:text-sm tracking-wide">
            Mistake Notebook
          </h4>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            บันทึกข้อผิดพลาดและติดตามจุดที่ต้องพัฒนา
          </p>
        </div>

        {/* Card 2: Center / Foreground Highlight (Conversation Exam & Story Mode) */}
        <div
          className="group absolute top-14 left-4 right-4 rounded-2xl p-4 bg-gradient-to-r from-slate-900/95 via-purple-950/80 to-slate-900/95 border border-purple-500/50 backdrop-blur-lg shadow-2xl shadow-purple-950/70 ring-1 ring-purple-500/30 transition-all duration-300 ease-out hover:scale-[1.03] hover:border-purple-400 hover:shadow-purple-500/30 animate-float-center cursor-default z-20"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/30">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-200 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-purple-300" />
              Featured Quest
            </span>
          </div>
          <h4 className="font-black text-white text-sm tracking-wide flex items-center gap-1.5">
            Conversation Exam & Story Mode
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            ฝึกทำข้อสอบและเรียนภาษาอังกฤษผ่านเรื่องราว
          </p>
        </div>
      </div>

      {/* Mobile Stack Fallback (< sm) for Clean Touch & Visibility */}
      <div className="sm:hidden space-y-3">
        {FEATURE_CARDS.map((card, idx) => {
          const Icon = card.icon;
          const isHighlight = card.id === 'conversation';
          return (
            <div
              key={card.id}
              className={`p-3.5 rounded-2xl bg-gradient-to-r ${card.gradient} border ${
                isHighlight ? 'border-purple-500/40 shadow-lg shadow-purple-950/40' : 'border-slate-800/80'
              } transition-transform active:scale-[0.98]`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${card.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-white text-xs">{card.title}</h4>
                </div>
                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 pl-9 leading-relaxed">
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

