import React, { useState } from 'react';
import { Network, Cpu, Lock, Database, UserCheck, Flame, FileText, ChevronRight } from 'lucide-react';
import { soundEngine } from '../engine/soundEngine';
import { translations } from '../data/translations';

interface LifecycleSectionProps {
  lang: 'fr' | 'en';
}

export const LifecycleSection: React.FC<LifecycleSectionProps> = ({ lang }) => {
  const t = translations[lang].lifecycle;
  const [activeStage, setActiveStage] = useState(0);

  const stageIcons = [
    <Network className="w-5 h-5 text-[#00f2fe]" />,
    <Cpu className="w-5 h-5 text-[#38bdf8]" />,
    <Lock className="w-5 h-5 text-[#10b981]" />,
    <Database className="w-5 h-5 text-[#a855f7]" />,
    <UserCheck className="w-5 h-5 text-[#00f2fe]" />,
    <Flame className="w-5 h-5 text-[#f43f5e]" />,
    <FileText className="w-5 h-5 text-[#f59e0b]" />,
  ];

  const handleSelectStage = (idx: number) => {
    soundEngine.playSelect();
    setActiveStage(idx);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mb-12 space-y-3">
        <div className="reveal-fade-up tag-badge mx-auto">
          <span>{t.badge}</span>
        </div>
        <h2 className="reveal-fade-up delay-100 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          {t.titleMain} <span className="gradient-text">{t.titleGradient}</span>
        </h2>
        <p className="reveal-fade-up delay-200 text-white/60 text-sm sm:text-base leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Horizontal Pipeline Steps */}
      <div className="reveal-fade-up delay-200 w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        {t.stages.map((stg, i) => {
          const isActive = activeStage === i;
          return (
            <button
              key={i}
              onClick={() => handleSelectStage(i)}
              onMouseEnter={() => soundEngine.playHover()}
              className={`glass-card p-4 text-left transition-all duration-300 relative border group ${
                isActive
                  ? 'border-[#00f2fe] bg-[#00f2fe]/10 shadow-[0_0_25px_rgba(0,242,254,0.3)] -translate-y-1.5'
                  : 'border-white/10 hover:border-white/30 hover:-translate-y-1'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`font-mono text-xs font-bold transition-colors ${isActive ? 'text-[#00f2fe]' : 'text-white/40 group-hover:text-[#38bdf8]'}`}>
                  {stg.step}
                </span>
                <div className={`p-1.5 rounded-lg transition-transform duration-300 group-hover:scale-110 ${isActive ? 'bg-[#00f2fe]/20' : 'bg-white/[0.04]'}`}>
                  {stageIcons[i]}
                </div>
              </div>
              <div className={`font-display text-xs font-semibold leading-tight line-clamp-2 transition-colors ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                {stg.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Architecture Card */}
      <div className="reveal-card delay-300 w-full glass-card border-beam-card p-8 sm:p-10 border border-white/15 relative overflow-hidden bg-gradient-to-r from-white/[0.06] via-white/[0.02] to-transparent transition-all duration-300">
        <div className="spotlight-overlay" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm px-3 py-1 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-[#00f2fe] font-bold">
                ÉTAPE {t.stages[activeStage].step} SUR 07
              </span>
              <span className="text-xs font-mono text-white/50 tracking-wider">
                {t.stages[activeStage].tech}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {t.stages[activeStage].title}
            </h3>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
              {t.stages[activeStage].desc}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4">
            {/* Interactive Cryptographic Vault Status Console */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#0a182e] via-[#040c1a] to-[#02050b] p-5 shadow-2xl group">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-[11px] font-mono">
                <span className="text-[#00f2fe] font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  SÉQUESTRE ISOLÉ VEILIO
                </span>
                <span className="px-2 py-0.5 rounded bg-black/60 border border-[#00f2fe]/30 text-[#00f2fe]">
                  0 OCTET PLAINTEXT
                </span>
              </div>

              {/* Holographic Pipeline Arc Indicator */}
              <div className="flex items-center justify-between gap-1 py-2">
                {t.stages.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectStage(i)}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeStage
                        ? 'bg-gradient-to-r from-[#00f2fe] to-[#10b981] shadow-[0_0_12px_rgba(0,242,254,0.8)] scale-y-125'
                        : i < activeStage
                        ? 'bg-[#00f2fe]/40'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  />
                ))}
              </div>

              {/* Active Pipeline Stage Readout */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px]">
                <div className="text-white/60">
                  ÉTAPE : <span className="text-white font-bold">0{activeStage + 1} / 07</span>
                </div>
                <div className="text-[#10b981] font-semibold">
                  {t.stages[activeStage].tech}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-white/70 space-y-1.5 w-full">
              <div className="text-[#00f2fe] font-bold flex items-center gap-1.5 text-xs">
                <ChevronRight className="w-3.5 h-3.5" />
                CONFORMITÉ ARCHITECTURALE
              </div>
              <div>• Stockage : Air-Gap & Clés Dédiées FIPS 140-2</div>
              <div>• Algorithmes : AES-256-GCM / HMAC-SHA256</div>
              <div>• Audit : Preuve immuable exportable CNIL</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
