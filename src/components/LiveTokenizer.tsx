import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Terminal, Cpu, ArrowRight, Sparkles } from 'lucide-react';
import { soundEngine } from '../engine/soundEngine';
import { translations } from '../data/translations';

interface LiveTokenizerProps {
  lang: 'fr' | 'en';
  onModeChange?: (isProtected: boolean) => void;
}

export const LiveTokenizer: React.FC<LiveTokenizerProps> = ({ lang, onModeChange }) => {
  const t = translations[lang].threats;
  const [isProtected, setIsProtected] = useState(true);
  const [inputText, setInputText] = useState('contact@aerospace-corp.fr');
  const [scrambledToken, setScrambledToken] = useState('tk_live_9f4a8b2c6e1d7390');
  const [isScrambling, setIsScrambling] = useState(false);

  const presets = [
    { label: 'Email', value: 'ciso.direct@banque-paris.fr' },
    { label: 'Carte Bancaire', value: '4532 8921 7840 9182' },
    { label: 'Numéro Sécurité Sociale', value: '1 89 04 75 112 345 67' },
    { label: 'Clé API Privée', value: 'sk_live_9837fbc29a81e3' },
  ];

  const generateToken = (raw: string) => {
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `tk_live_${hex}${raw.length.toString(16)}b7e9a2`;
  };

  const runScrambleAnimation = (finalToken: string) => {
    setIsScrambling(true);
    soundEngine.playCryptoEncrypt();
    const glyphs = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*';
    let iterations = 0;

    const interval = setInterval(() => {
      setScrambledToken(
        finalToken
          .split('')
          .map((char, index) => {
            if (index < iterations) return char;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('')
      );

      if (iterations >= finalToken.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      iterations += 2;
    }, 25);
  };

  const handleInputChange = (val: string) => {
    setInputText(val);
    const token = generateToken(val);
    runScrambleAnimation(token);
  };

  const handleSelectPreset = (val: string) => {
    soundEngine.playSelect();
    setInputText(val);
    const token = generateToken(val);
    runScrambleAnimation(token);
  };

  const handleToggleMode = (mode: boolean) => {
    soundEngine.playSelect();
    setIsProtected(mode);
    if (onModeChange) onModeChange(mode);
  };

  useEffect(() => {
    runScrambleAnimation(generateToken(inputText));
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col items-center z-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mb-10 space-y-3">
        <div className="reveal-fade-up tag-badge mx-auto">
          <span>{t.badge}</span>
        </div>
        <h2 className="reveal-fade-up delay-100 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
          {t.titleMain} <span className={isProtected ? 'gradient-text-emerald' : 'text-[#f43f5e]'}>
            {isProtected ? t.titleGradient : 'Données Exposées en Clair'}
          </span>
        </h2>
        <p className="reveal-fade-up delay-200 text-white/60 text-sm sm:text-base leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Mode Switcher Pill */}
      <div className="reveal-fade-up delay-300 flex items-center gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-8 backdrop-blur-xl">
        <button
          onClick={() => handleToggleMode(false)}
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-mono text-xs font-semibold tracking-wider transition-all ${
            !isProtected
              ? 'bg-[#ef4444] text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
              : 'text-white/50 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{t.modeVulnerable}</span>
        </button>

        <button
          onClick={() => handleToggleMode(true)}
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-mono text-xs font-semibold tracking-wider transition-all ${
            isProtected
              ? 'bg-[#10b981] text-black shadow-[0_0_20px_rgba(16,185,129,0.5)] font-bold'
              : 'text-white/50 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{t.modeProtected}</span>
        </button>
      </div>

      {/* Interactive Sandbox Dashboard (Dual Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        
        {/* Left: Interactive Input & Realtime Tokenizer */}
        <div className="reveal-card delay-100 lg:col-span-6 glass-card tilt-card border-beam-card p-6 sm:p-8 flex flex-col justify-between border border-white/10 transition-all duration-300">
          <div className="spotlight-overlay" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-[#00f2fe] uppercase tracking-widest flex items-center gap-2 font-semibold">
                <Cpu className="w-4 h-4 text-[#00f2fe] animate-pulse" />
                MOTEUR DE TOKENISATION EN DIRECT
              </span>
              <span className="font-mono text-[11px] text-white/60 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">&lt; 1.2ms LATENCE</span>
            </div>

            {/* Hardware Security Module (HSM) Live Architecture Visualizer */}
            <div className="relative w-full rounded-2xl overflow-hidden mb-5 border border-white/15 bg-gradient-to-br from-[#081528] via-[#040a14] to-[#020509] p-4 shadow-lg group hover:border-[#00f2fe]/40 transition-colors">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="font-mono text-xs font-bold text-white tracking-wider">
                    MODULE CRYPTOGRAPHIQUE MATÉRIEL (HSM)
                  </span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/60 border border-[#00f2fe]/40 text-[#00f2fe]">
                  FIPS 140-2 NIVEAU 3
                </span>
              </div>

              {/* 4 Cryptographic Hardware Registers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px]">
                <div className="p-2 rounded-xl bg-black/60 border border-white/10 hover:border-[#00f2fe]/50 space-y-0.5 transition-colors">
                  <div className="text-white/40 text-[8.5px] uppercase">REG_01 // CLÉ</div>
                  <div className="text-[#00f2fe] font-bold truncate">K_ROOT_9F4A</div>
                </div>
                <div className="p-2 rounded-xl bg-black/60 border border-white/10 hover:border-[#38bdf8]/50 space-y-0.5 transition-colors">
                  <div className="text-white/40 text-[8.5px] uppercase">REG_02 // IV</div>
                  <div className="text-[#38bdf8] font-bold truncate">IV_GCM_7B21</div>
                </div>
                <div className="p-2 rounded-xl bg-black/60 border border-white/10 hover:border-[#fbbf24]/50 space-y-0.5 transition-colors">
                  <div className="text-white/40 text-[8.5px] uppercase">REG_03 // TAG</div>
                  <div className="text-[#fbbf24] font-bold truncate">AUTH_E8C0</div>
                </div>
                <div className="p-2 rounded-xl bg-black/60 border border-[#10b981]/30 hover:border-[#10b981]/70 space-y-0.5 transition-colors">
                  <div className="text-[#10b981] text-[8.5px] uppercase">REG_04 // ISOLATION</div>
                  <div className="text-[#10b981] font-bold truncate">100% AIR-GAP</div>
                </div>
              </div>

              {/* Data Bus Connection Indicator */}
              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-white/50">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-ping" />
                  <span>BUS MATÉRIEL mTLS 1.3 STRICT</span>
                </div>
                <span className="text-[#38bdf8]">DÉBIT &gt; 100,000 OPS/SEC</span>
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 mb-4">
              {presets.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectPreset(preset.value)}
                  className="px-3 py-1 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#00f2fe]/50 font-mono text-xs text-white/70 hover:text-white transition-all transform hover:-translate-y-0.5"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Live Input Field */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-mono text-white/60">DONNÉE ENTRÉE (CLIENT-SIDE) :</label>
              <div className="relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={t.samplePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 focus:border-[#00f2fe] focus:ring-2 focus:ring-[#00f2fe]/20 text-white font-mono text-sm outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Live Tokenizer Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-white/60 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00f2fe] animate-spin" style={{ animationDuration: '6s' }} />
                  JETON OPAQUE GÉNÉRÉ (EN BDD & MICROSERVICES) :
                </label>
                <span className="text-[10px] font-mono text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/30">
                  AES-256-GCM
                </span>
              </div>
              
              <div className="p-4 rounded-xl bg-[#060b14] border border-[#00f2fe]/40 font-mono text-sm text-[#00f2fe] flex items-center justify-between shadow-[0_0_20px_rgba(0,242,254,0.18)] hover:shadow-[0_0_30px_rgba(0,242,254,0.35)] transition-all">
                <span className="tracking-wider break-all font-semibold">{scrambledToken}</span>
                <span className="text-xs text-white/40 ml-2 shrink-0">Opaque</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/50 mt-6 pt-4 border-t border-white/[0.08] leading-relaxed">
            Même si un attaquant accède à vos sauvegardes ou réalise un dump SQL, ce jeton est mathématiquement irréversible sans accès direct à l'enclave matérielle Veilio.
          </p>
        </div>

        {/* Right: Simulated Breach Terminal */}
        <div className="reveal-card delay-200 lg:col-span-6 glass-card tilt-card border-beam-card p-6 sm:p-8 flex flex-col justify-between border border-white/10 bg-black/60 transition-all duration-300">
          <div className="spotlight-overlay" />

          <div>
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 font-mono text-xs text-white/50">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#38bdf8]" />
                <span>EXFILTRATION_LOG • SQL_INJECTION_SIM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Terminal Output */}
            <div className="font-mono text-xs space-y-2.5 p-4 rounded-xl bg-[#030406] border border-white/10 h-48 overflow-y-auto">
              <div className="text-white/40">&gt; SELECT * FROM users WHERE org_id = &apos;corp_eu&apos;;</div>
              <div className="text-white/40">&gt; Query executed: 1,420 rows dumped.</div>
              
              {isProtected ? (
                <>
                  <div className="text-[#10b981] font-semibold">
                    [VEILIO ENCLAVE ACTIVE] : Interception de flux réussie.
                  </div>
                  <div className="text-white/70">
                    Row 001: id=&apos;u_9182&apos; | email=&apos;{scrambledToken}&apos;
                  </div>
                  <div className="text-white/70">
                    Row 002: id=&apos;u_9183&apos; | email=&apos;tk_live_7c4f1e0998a1&apos;
                  </div>
                  <div className="text-[#00f2fe]">
                    [STATUT ATTAC]: 0 octet en clair obtenu. Base inutilisable pour les pirates.
                  </div>
                </>
              ) : (
                <>
                  <div className="text-[#ef4444] font-semibold">
                    [ALERTE BRÈCHE CRITIQUE] : Base sans protection Veilio.
                  </div>
                  <div className="text-red-300">
                    Row 001: id=&apos;u_9182&apos; | email=&apos;{inputText}&apos;
                  </div>
                  <div className="text-red-300">
                    Row 002: id=&apos;u_9183&apos; | cc=&apos;4532-8871-0021-9921&apos;
                  </div>
                  <div className="text-[#ef4444]">
                    [EXFILTRATION RÉUSSIE] : 100% des données PII clientes en fuite sur le Darknet.
                  </div>
                </>
              )}
            </div>

            {/* Verdict Box */}
            <div
              className={`mt-4 p-4 rounded-xl border text-xs font-sans leading-relaxed transition-all ${
                isProtected
                  ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#6ee7b7]'
                  : 'bg-[#ef4444]/10 border-[#ef4444]/30 text-[#fca5a5]'
              }`}
            >
              {isProtected ? t.breachResultProtected : t.breachResultVulnerable}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08] mt-4">
            <div>
              <span className="font-mono text-[10px] text-white/50 uppercase">{t.leakRateLabel}</span>
              <div className={`font-mono text-xl font-bold mt-0.5 ${isProtected ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                {isProtected ? '0 Donnée' : '100% Exposé'}
              </div>
            </div>
            <div>
              <span className="font-mono text-[10px] text-white/50 uppercase">{t.cryptoShieldLabel}</span>
              <div className={`font-mono text-xl font-bold mt-0.5 ${isProtected ? 'text-[#00f2fe]' : 'text-[#ef4444]'}`}>
                {isProtected ? 'Actif • Impénétrable' : 'Désactivé'}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
