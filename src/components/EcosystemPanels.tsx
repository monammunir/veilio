import React from 'react';
import { Cpu, ShieldCheck, Zap, FileSpreadsheet, Lock, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../engine/soundEngine';
import { translations } from '../data/translations';

interface EcosystemPanelsProps {
  lang: 'fr' | 'en';
  onRequestBriefing: () => void;
}

export const EcosystemPanels: React.FC<EcosystemPanelsProps> = ({ lang, onRequestBriefing }) => {
  const t = translations[lang].ecosystem;

  const rssiIcons = [
    <Zap className="w-5 h-5 text-[#00f2fe]" />,
    <Lock className="w-5 h-5 text-[#38bdf8]" />,
    <Cpu className="w-5 h-5 text-[#00f2fe]" />,
  ];

  const dpoIcons = [
    <ShieldCheck className="w-5 h-5 text-[#10b981]" />,
    <Lock className="w-5 h-5 text-[#34d399]" />,
    <FileSpreadsheet className="w-5 h-5 text-[#10b981]" />,
  ];

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mb-12 space-y-3">
        <div className="reveal-fade-up tag-badge mx-auto">
          <span>{t.badge}</span>
        </div>
        <h2 className="reveal-fade-up delay-100 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          L'Alliance Parfaite : <span className="gradient-text">RSSI & DPO</span>
        </h2>
        <p className="reveal-fade-up delay-200 text-white/60 text-sm sm:text-base leading-relaxed">
          Veilio réconcilie l'exigence de vitesse des équipes techniques avec les impératifs légaux et réglementaires.
        </p>
      </div>

      {/* Dual Massive Panels (Nioma Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        
        {/* Panel 1: RSSI / Tech Leaders */}
        <div
          onMouseMove={handleCardMouseMove}
          onMouseEnter={() => soundEngine.playHover()}
          className="reveal-card delay-100 glass-card tilt-card border-beam-card p-8 sm:p-10 flex flex-col justify-between border border-white/10 hover:border-[#00f2fe]/50 transition-all duration-300 group"
        >
          <div className="spotlight-overlay" />

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f2fe]/10 border border-[#00f2fe]/30 font-mono text-xs text-[#00f2fe] font-semibold mb-4 group-hover:border-[#00f2fe]/60 transition-colors">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              POUR LE RSSI & TECH
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              {t.rssiTitle} — <span className="gradient-text">{t.rssiGradient}</span>
            </h3>

            <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-8">
              {t.rssiDesc}
            </p>

            <div className="space-y-5 mb-8">
              {t.rssiFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-4 group/item">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 shrink-0 mt-0.5 group-hover/item:scale-110 group-hover/item:bg-[#00f2fe]/15 group-hover/item:border-[#00f2fe]/40 transition-all duration-300">
                    {rssiIcons[i]}
                  </div>
                  <div className="group-hover/item:translate-x-1 transition-transform duration-200">
                    <h4 className="font-display text-sm font-semibold text-white group-hover/item:text-[#00f2fe] transition-colors">{feat.title}</h4>
                    <p className="text-white/60 text-xs sm:text-sm mt-0.5 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playSelect();
              onRequestBriefing();
            }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00f2fe]/20 to-[#38bdf8]/10 hover:from-[#00f2fe]/30 hover:to-[#38bdf8]/20 border border-[#00f2fe]/30 text-[#00f2fe] hover:text-white font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,242,254,0.15)] group-hover:border-[#00f2fe]/60 group-hover:shadow-[0_0_30px_rgba(0,242,254,0.3)]"
          >
            <span>{t.rssiCta}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Panel 2: DPO / Legal Teams */}
        <div
          onMouseMove={handleCardMouseMove}
          onMouseEnter={() => soundEngine.playHover()}
          className="reveal-card delay-200 glass-card tilt-card border-beam-card p-8 sm:p-10 flex flex-col justify-between border border-white/10 hover:border-[#10b981]/50 transition-all duration-300 group"
        >
          <div className="spotlight-overlay" />

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 font-mono text-xs text-[#10b981] font-semibold mb-4 group-hover:border-[#10b981]/60 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
              POUR LE DPO & JURIDIQUE
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              {t.dpoTitle} — <span className="gradient-text-emerald">{t.dpoGradient}</span>
            </h3>

            <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-8">
              {t.dpoDesc}
            </p>

            <div className="space-y-5 mb-8">
              {t.dpoFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 shrink-0 mt-0.5">
                    {dpoIcons[i]}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">{feat.title}</h4>
                    <p className="text-white/60 text-xs sm:text-sm mt-0.5 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playSelect();
              onRequestBriefing();
            }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#10b981]/20 to-[#34d399]/10 hover:from-[#10b981]/30 hover:to-[#34d399]/20 border border-[#10b981]/30 text-[#10b981] hover:text-white font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          >
            <span>{t.dpoCta}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
