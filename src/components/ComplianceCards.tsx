import React, { useState } from 'react';
import {
  ScrollText,
  Shield,
  Lock,
  Trash2,
  Key,
  FileCheck,
  Copy,
  Check,
  Cpu,
  Globe,
  Database,
  Share2,
  CalendarClock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { soundEngine } from '../engine/soundEngine';
import { complianceData, ComplianceCardItem } from '../data/complianceData';

interface ComplianceCardsProps {
  lang: 'fr' | 'en';
}

export const ComplianceCards: React.FC<ComplianceCardsProps> = ({ lang }) => {
  const categories = complianceData[lang];
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  
  // Track active face per card: 'exigence' or 'solution'
  const [cardModes, setCardModes] = useState<Record<string, 'exigence' | 'solution'>>({});
  const [copiedCardId, setCopiedCardId] = useState<string | null>(null);

  const currentCategory = categories[activeCategoryIndex] || categories[0];

  const getCardIcon = (card: ComplianceCardItem, index: number) => {
    if (card.id.includes('4-5') || card.id.includes('pseudo')) return <Cpu className="w-5 h-5 text-[#00f2fe]" />;
    if (card.id.includes('5-1-c') || card.id.includes('minim')) return <Shield className="w-5 h-5 text-[#38bdf8]" />;
    if (card.id.includes('5-1-e') || card.id.includes('shred') || card.id.includes('retention')) return <Trash2 className="w-5 h-5 text-[#f43f5e]" />;
    if (card.id.includes('5-1-f') || card.id.includes('chiffre') || card.id.includes('aes')) return <Lock className="w-5 h-5 text-[#10b981]" />;
    if (card.id.includes('5-2') || card.id.includes('audit') || card.id.includes('30')) return <FileCheck className="w-5 h-5 text-[#a855f7]" />;
    if (card.id.includes('15') || card.id.includes('acces')) return <Key className="w-5 h-5 text-[#fbbf24]" />;
    if (card.id.includes('17') || card.id.includes('oubli')) return <Trash2 className="w-5 h-5 text-[#f43f5e]" />;
    if (card.id.includes('25') || card.id.includes('design')) return <Sparkles className="w-5 h-5 text-[#00f2fe]" />;
    if (card.id.includes('sov') || card.id.includes('cloud')) return <Globe className="w-5 h-5 text-[#38bdf8]" />;
    if (card.id.includes('sharing')) return <Share2 className="w-5 h-5 text-[#38bdf8]" />;
    if (card.id.includes('calendar') || card.id.includes('dpo-retention')) return <CalendarClock className="w-5 h-5 text-[#00f2fe]" />;
    if (card.id.includes('db') || card.id.includes('apps')) return <Database className="w-5 h-5 text-[#10b981]" />;
    
    const defaultIcons = [
      <ScrollText className="w-5 h-5 text-[#00f2fe]" />,
      <Shield className="w-5 h-5 text-[#38bdf8]" />,
      <Lock className="w-5 h-5 text-[#10b981]" />,
      <FileCheck className="w-5 h-5 text-[#a855f7]" />,
      <Key className="w-5 h-5 text-[#fbbf24]" />
    ];
    return defaultIcons[index % defaultIcons.length];
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--mouse-x', `${e.nativeEvent.offsetX}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.nativeEvent.offsetY}px`);
  };

  const toggleCardMode = (cardId: string, targetMode?: 'exigence' | 'solution') => {
    soundEngine.playSelect();
    setCardModes((prev) => {
      const current = prev[cardId] || 'exigence';
      const next = targetMode ? targetMode : (current === 'exigence' ? 'solution' : 'exigence');
      return { ...prev, [cardId]: next };
    });
  };

  const handleCopySolution = (e: React.MouseEvent, cardId: string, text: string) => {
    e.stopPropagation();
    soundEngine.playCryptoEncrypt();
    navigator.clipboard?.writeText(text);
    setCopiedCardId(cardId);
    setTimeout(() => setCopiedCardId(null), 2200);
  };

  const handleSelectCategory = (index: number) => {
    soundEngine.playSelect();
    setActiveCategoryIndex(index);
    setCardModes({});
  };

  const delays = ['delay-100', 'delay-200', 'delay-300'];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center z-10 px-4 sm:px-6">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mb-8 space-y-4">
        <div className="reveal-fade-up tag-badge mx-auto">
          <span>{currentCategory.badge}</span>
        </div>
        <h2 className="reveal-fade-up delay-100 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          {currentCategory.titleMain} <span className="gradient-text">{currentCategory.titleGradient}</span>
        </h2>
        <p className="reveal-fade-up delay-200 text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          {currentCategory.subtitle}
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="reveal-fade-up delay-200 flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {categories.map((cat, idx) => {
          const isActive = activeCategoryIndex === idx;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(idx)}
              onMouseEnter={() => soundEngine.playHover()}
              className={`px-5 py-2.5 rounded-full font-mono text-xs tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-white text-black font-bold shadow-[0_0_25px_rgba(255,255,255,0.35)] scale-105'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              <span>{cat.tabLabel}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-black/15 text-black' : 'bg-white/10 text-white/60'
              }`}>
                {cat.cards.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Spacious 3-Column Grid for Maximum Readability */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {currentCategory.cards.map((card, idx) => {
          const mode = cardModes[card.id] || 'exigence';
          const isSolution = mode === 'solution';
          const isCopied = copiedCardId === card.id;
          const delayClass = delays[idx % delays.length];

          return (
            <div
              key={card.id}
              onMouseMove={handleCardMouseMove}
              className={`reveal-card ${delayClass} border-beam-card glass-card p-6 sm:p-7 flex flex-col justify-between border transition-all duration-400 min-h-[340px] ${
                isSolution
                  ? 'border-[#00f2fe]/60 bg-gradient-to-b from-[#06152b] via-[#040e1f] to-[#02060d] shadow-[0_0_35px_rgba(0,242,254,0.18)]'
                  : 'border-white/10 hover:border-[#00f2fe]/40 bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-[#04060a]/95'
              }`}
            >
              <div className="spotlight-overlay" />

              {/* Card Header & In-Card Segmented View Switcher */}
              <div className="relative z-10 space-y-4">
                
                {/* Top Row: Article Tag + Segmented Pill Switcher */}
                <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[#38bdf8] shadow-inner">
                      {card.article}
                    </span>
                    <div className="p-1.5 rounded-lg bg-white/[0.04]">
                      {getCardIcon(card, idx)}
                    </div>
                  </div>

                  {/* Interactive Dual-Mode Pill Switcher */}
                  <div className="inline-flex p-1 rounded-full bg-black/60 border border-white/10 font-mono text-[10px]">
                    <button
                      type="button"
                      onClick={() => toggleCardMode(card.id, 'exigence')}
                      className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        !isSolution
                          ? 'bg-[#38bdf8] text-black font-bold shadow-sm'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Exigence
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCardMode(card.id, 'solution')}
                      className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        isSolution
                          ? 'bg-[#00f2fe] text-black font-bold shadow-sm'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Solution
                    </button>
                  </div>
                </div>

                {/* ==================== 100% CLEAN CONDITIONAL FACE RENDERING (ZERO TEXT OVERLAP) ==================== */}
                {!isSolution ? (
                  /* EXIGENCE FACE */
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span className="text-[10.5px] font-mono text-[#38bdf8] uppercase tracking-wider font-semibold">
                        {card.badge || "OBLIGATION LÉGALE"}
                      </span>
                    </div>

                    <p className="text-white/85 text-sm sm:text-[14.5px] leading-relaxed font-sans">
                      {card.requirement}
                    </p>
                  </div>
                ) : (
                  /* VEILIO SOLUTION FACE */
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                      <span className="text-[10.5px] font-mono text-[#10b981] uppercase tracking-wider font-semibold">
                        LA RÉPONSE DE VEILIO (CONFORME)
                      </span>
                    </div>

                    <p className="text-white/95 text-sm sm:text-[14px] leading-relaxed font-sans bg-black/30 p-3.5 rounded-xl border border-white/10">
                      {card.solution}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Action Bar */}
              <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                {!isSolution ? (
                  <button
                    type="button"
                    onClick={() => toggleCardMode(card.id, 'solution')}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-[#00f2fe]/15 border border-white/10 hover:border-[#00f2fe]/40 text-[#00f2fe] transition-all cursor-pointer group/btn"
                  >
                    <span className="font-semibold tracking-wider text-[11px]">
                      VOIR LA RÉPONSE DE VEILIO
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => toggleCardMode(card.id, 'exigence')}
                      onMouseEnter={() => soundEngine.playHover()}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-[11px] font-mono transition-colors cursor-pointer"
                    >
                      ← Revoir l'exigence
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleCopySolution(e, card.id, card.solution)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-mono transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-[#10b981]/20 border-[#10b981] text-[#10b981]'
                          : 'bg-white/5 border-white/15 text-[#38bdf8] hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#10b981]" />
                          <span>Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copier</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
