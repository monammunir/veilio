import React from 'react';
import { Volume2, VolumeX, Globe, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import { soundEngine } from '../engine/soundEngine';
import { translations } from '../data/translations';

interface NavigationProps {
  currentScene: number;
  progress: number;
  lang: 'fr' | 'en';
  onSelectScene: (index: number) => void;
  onToggleLang: () => void;
  onRequestBriefing: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScene,
  progress,
  lang,
  onSelectScene,
  onToggleLang,
  onRequestBriefing,
}) => {
  const t = translations[lang].nav;
  const [isMuted, setIsMuted] = React.useState(soundEngine.isMuted);

  const navItems = [
    { label: t.architecture, index: 0, id: 'hero' },
    { label: t.gdpr, index: 1, id: 'gdpr' },
    { label: t.threats, index: 2, id: 'threats' },
    { label: t.lifecycle, index: 3, id: 'lifecycle' },
    { label: t.ecosystem, index: 4, id: 'ecosystem' },
    { label: t.briefing, index: 5, id: 'briefing' },
  ];

  const handleSoundToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) soundEngine.playSelect();
  };

  const handleNavClick = (idx: number) => {
    soundEngine.playSelect();
    onSelectScene(idx);
  };

  return (
    <>
      {/* Top Thin Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-white/[0.06] z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#00f2fe] via-[#38bdf8] to-[#10b981] transition-all duration-150"
          style={{ width: `${Math.max(2, progress * 100)}%` }}
        />
      </div>

      {/* Main Floating Glass Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#040507]/80 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Enclave Badge */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(0);
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/20 flex items-center justify-center font-display font-bold text-base text-white group-hover:border-[#00f2fe] group-hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-[#00f2fe] transition-colors">
                Veilio
              </span>
              <span className="text-[9px] font-mono tracking-[0.22em] text-white/50 uppercase -mt-0.5">
                CYBER ENCLAVE
              </span>
            </div>
          </a>

          {/* Desktop Nav Links with Active Underline */}
          <nav className="hidden lg:flex items-center gap-8 text-[13.5px] font-sans font-medium">
            {navItems.map((item) => {
              const isActive = currentScene === item.index;
              return (
                <button
                  key={item.index}
                  onClick={() => handleNavClick(item.index)}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`relative py-1.5 transition-colors cursor-pointer ${
                    isActive ? 'text-white font-semibold' : 'text-white/65 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Sound, Lang Switcher & Demo CTA */}
          <div className="flex items-center gap-3">
            
            {/* Sound Haptics Toggle */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Activer le son haptique' : 'Désactiver le son'}
              className="p-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white transition-all"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-[#00f2fe]" />}
            </button>

            {/* FR / EN Language Toggle */}
            <button
              onClick={() => {
                soundEngine.playSelect();
                onToggleLang();
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono font-semibold tracking-wider text-white/80 hover:text-white transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                soundEngine.playSelect();
                onRequestBriefing();
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-display font-semibold text-xs tracking-wider uppercase hover:bg-[#a5f3fc] transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,242,254,0.5)]"
            >
              <span>{t.requestDemo}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>
      </header>

      {/* Floating Vertical Navigation Arrows (Up & Down) */}
      <div className="fixed right-6 bottom-8 z-40 flex flex-col gap-2.5">
        <button
          onClick={() => {
            if (currentScene > 0) handleNavClick(currentScene - 1);
          }}
          onMouseEnter={() => soundEngine.playHover()}
          disabled={currentScene === 0}
          aria-label="Section Précédente"
          className={`w-11 h-11 rounded-full border border-white/15 bg-[#060709]/85 backdrop-blur-lg flex items-center justify-center text-white transition-all duration-300 shadow-xl ${
            currentScene === 0
              ? 'opacity-20 cursor-not-allowed'
              : 'hover:border-[#00f2fe] hover:scale-110 hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] cursor-pointer'
          }`}
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            if (currentScene < 5) handleNavClick(currentScene + 1);
          }}
          onMouseEnter={() => soundEngine.playHover()}
          disabled={currentScene === 5}
          aria-label="Section Suivante"
          className={`w-11 h-11 rounded-full border border-white/15 bg-[#060709]/85 backdrop-blur-lg flex items-center justify-center text-white transition-all duration-300 shadow-xl ${
            currentScene === 5
              ? 'opacity-20 cursor-not-allowed'
              : 'hover:border-[#00f2fe] hover:scale-110 hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] cursor-pointer'
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};
