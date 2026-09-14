import React, { useEffect, useRef, useState } from 'react';
import { initThreeEngine, ThreeEngineInstance } from './engine/threeEngine';
import { soundEngine } from './engine/soundEngine';
import { Navigation } from './components/Navigation';
import { AtmosphereOverlay } from './components/AtmosphereOverlay';
import { ComplianceCards } from './components/ComplianceCards';
import { LiveTokenizer } from './components/LiveTokenizer';
import { LifecycleSection } from './components/LifecycleSection';
import { EcosystemPanels } from './components/EcosystemPanels';
import { ExecutiveForm } from './components/ExecutiveForm';
import { translations } from './data/translations';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { ArrowRight, ShieldCheck, Lock, ChevronDown } from 'lucide-react';

export const App: React.FC = () => {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [currentScene, setCurrentScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const canvasRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ThreeEngineInstance | null>(null);

  const t = translations[lang];

  // Initialize Scroll & 3D Tilt Animations
  useScrollAnimations();

  // Initialize Three.js WebGL Engine
  useEffect(() => {
    if (canvasRef.current) {
      engineRef.current = initThreeEngine(canvasRef.current);
    }
    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, []);

  // Vertical Scroll Event Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);

      if (engineRef.current) {
        engineRef.current.updateProgress(progress);
      }

      // Determine active section based on scroll offset
      const sectionIds = ['hero', 'gdpr', 'threats', 'lifecycle', 'ecosystem', 'briefing'];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollPos >= el.offsetTop) {
          setCurrentScene((prev) => {
            if (prev !== i) {
              soundEngine.playSceneTransition();
            }
            return i;
          });
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectScene = (index: number) => {
    const sectionIds = ['hero', 'gdpr', 'threats', 'lifecycle', 'ecosystem', 'briefing'];
    const el = document.getElementById(sectionIds[index]);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleThreatModeChange = (isProtected: boolean) => {
    if (engineRef.current) {
      engineRef.current.setThreatMode(isProtected);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#040507] text-[#F5F5F2] selection:bg-[#00f2fe] selection:text-black">
      
      {/* 1. Ambient Fog & High-Tech Grid */}
      <div className="ambient-glow bg-glow-1" />
      <div className="ambient-glow bg-glow-2" />
      <div className="grid-overlay" />

      {/* 2. 3D WebGL Canvas (Persistent Cyber Security Scene) */}
      <div id="canvas-container" ref={canvasRef} />

      {/* 3. Precision Cyber HUD & Telemetry Reticles */}
      <AtmosphereOverlay progress={scrollProgress} />

      {/* 4. Top Navigation Bar & Floating Control Arrows */}
      <Navigation
        currentScene={currentScene}
        progress={scrollProgress}
        lang={lang}
        onSelectScene={handleSelectScene}
        onToggleLang={() => setLang(lang === 'fr' ? 'en' : 'fr')}
        onRequestBriefing={() => handleSelectScene(5)}
      />

      {/* 5. Main Vertical Flow Layout */}
      <main className="relative z-10">
        
        {/* ==================== SCENE 0: HERO SECTION ==================== */}
        <section id="hero" className="vertical-section pt-32 lg:pt-40 pb-20 overflow-hidden">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-8 z-20">
            
            {/* Technical Eyebrow */}
            <div className="reveal-fade-up inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md shadow-[0_0_20px_rgba(0,242,254,0.12)]">
              <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.24em] text-[#38bdf8] uppercase font-bold">
                {t.hero.tagline}
              </span>
            </div>

            {/* Headline */}
            <h1 className="reveal-fade-up delay-100 font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              {t.hero.titleMain} <br />
              <span className="gradient-text">{t.hero.titleGradient}</span>
            </h1>

            {/* Subtitle */}
            <p className="reveal-fade-up delay-200 text-white/75 text-base sm:text-xl leading-relaxed max-w-2xl font-normal">
              {t.hero.subtitle}
            </p>

            {/* Actions */}
            <div className="reveal-fade-up delay-300 flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => handleSelectScene(1)}
                onMouseEnter={() => soundEngine.playHover()}
                className="relative overflow-hidden group px-9 py-4 rounded-full bg-white text-black font-display font-bold text-xs tracking-wider uppercase flex items-center gap-2.5 hover:bg-[#a5f3fc] transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(0,242,254,0.6)] cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out pointer-events-none" />
                <span className="relative z-10">{t.hero.exploreBtn}</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleSelectScene(5)}
                onMouseEnter={() => soundEngine.playHover()}
                className="relative overflow-hidden group px-9 py-4 rounded-full border border-white/25 bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/40 text-white font-display font-semibold text-xs tracking-wider uppercase backdrop-blur-md transition-all cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-in-out pointer-events-none" />
                <span className="relative z-10">{t.hero.demoBtn}</span>
              </button>
            </div>

            {/* Metrics Row */}
            <div className="reveal-fade-up delay-400 pt-10 border-t border-white/[0.1] grid grid-cols-3 gap-8 sm:gap-16 max-w-xl w-full">
              <div className="group/metric transition-all duration-300 hover:-translate-y-1.5 cursor-default">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/45 group-hover/metric:text-white/70 transition-colors">
                  {t.hero.stats.latency.label}
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1 group-hover/metric:text-[#00f2fe] group-hover/metric:drop-shadow-[0_0_15px_rgba(0,242,254,0.6)] transition-all">
                  {t.hero.stats.latency.value}
                </div>
              </div>
              <div className="group/metric transition-all duration-300 hover:-translate-y-1.5 cursor-default">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/45 group-hover/metric:text-[#00f2fe]/70 transition-colors">
                  {t.hero.stats.storage.label}
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#00f2fe] mt-1 group-hover/metric:text-white group-hover/metric:drop-shadow-[0_0_15px_rgba(0,242,254,0.8)] transition-all">
                  {t.hero.stats.storage.value}
                </div>
              </div>
              <div className="group/metric transition-all duration-300 hover:-translate-y-1.5 cursor-default">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/45 group-hover/metric:text-[#10b981]/70 transition-colors">
                  {t.hero.stats.compliance.label}
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#10b981] mt-1 group-hover/metric:drop-shadow-[0_0_15px_rgba(16,185,129,0.8)] transition-all">
                  {t.hero.stats.compliance.value}
                </div>
              </div>
            </div>

          </div>

          {/* Scroll Down Indicator */}
          <div
            onClick={() => handleSelectScene(1)}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-mono text-white/50 cursor-pointer hover:text-white transition-colors"
          >
            <div className="scroll-mouse-pill">
              <div className="scroll-dot" />
            </div>
            <span className="tracking-widest uppercase text-[10px]">{t.hero.scrollHint}</span>
          </div>
        </section>

        {/* ==================== SCENE 1: GDPR COMPLIANCE MATRIX ==================== */}
        <section id="gdpr" className="vertical-section">
          <ComplianceCards lang={lang} />
        </section>

        {/* ==================== SCENE 2: THREAT SANDBOX & LIVE TOKENIZER ==================== */}
        <section id="threats" className="vertical-section">
          <LiveTokenizer lang={lang} onModeChange={handleThreatModeChange} />
        </section>

        {/* ==================== SCENE 3: 7-STAGE CRYPTOGRAPHIC LIFECYCLE ==================== */}
        <section id="lifecycle" className="vertical-section">
          <LifecycleSection lang={lang} />
        </section>

        {/* ==================== SCENE 4: DPO VS RSSI ECOSYSTEM ==================== */}
        <section id="ecosystem" className="vertical-section">
          <EcosystemPanels lang={lang} onRequestBriefing={() => handleSelectScene(5)} />
        </section>

        {/* ==================== SCENE 5: EXECUTIVE BRIEFING & REGISTRATION ==================== */}
        <section id="briefing" className="vertical-section">
          <ExecutiveForm lang={lang} />
        </section>

      </main>

      {/* ==================== EXECUTIVE FOOTER ==================== */}
      <footer className="relative z-20 border-t border-white/[0.08] bg-[#030406]/90 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/15 flex items-center justify-center font-display font-bold text-sm text-white">
              V
            </div>
            <span className="font-display font-semibold text-sm text-white">Veilio</span>
            <span className="text-white/40 text-xs font-mono">| Protection de Données & Tokenisation</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-white/50">
            <a href="#hero" className="hover:text-white transition-colors">Haut de Page</a>
            <a href="#gdpr" className="hover:text-white transition-colors">Conformité RGPD</a>
            <a href="https://veilio.xyz/contact" target="_blank" rel="noreferrer" className="hover:text-[#00f2fe] transition-colors">
              veilio.xyz ↗
            </a>
          </div>

          <div className="text-[11px] font-mono text-white/40">
            © {new Date().getFullYear()} Veilio. Tous droits réservés.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
