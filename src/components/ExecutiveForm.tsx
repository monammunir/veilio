import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, X, Lock } from 'lucide-react';
import { soundEngine } from '../engine/soundEngine';
import { translations } from '../data/translations';

interface ExecutiveFormProps {
  lang: 'fr' | 'en';
}

export const ExecutiveForm: React.FC<ExecutiveFormProps> = ({ lang }) => {
  const t = translations[lang].briefing;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'rssi',
    company: '',
    volume: '100k-1m',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playCryptoEncrypt();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center z-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mb-10 space-y-3">
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

      {/* Form Card */}
      <div className="reveal-card delay-100 w-full glass-card border-beam-card p-8 sm:p-12 border border-white/15 bg-black/60 shadow-2xl relative transition-all duration-300">
        <div className="spotlight-overlay" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-mono tracking-wider text-white/70 uppercase">
                {t.nameLabel}
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Sarah Martin"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#00f2fe] focus:ring-2 focus:ring-[#00f2fe]/20 text-white font-sans text-sm outline-none transition-all"
              />
            </div>

            {/* Work Email */}
            <div className="space-y-2">
              <label className="text-xs font-mono tracking-wider text-white/70 uppercase">
                {t.emailLabel}
              </label>
              <input
                type="email"
                required
                placeholder="sarah.martin@entreprise.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#00f2fe] focus:ring-2 focus:ring-[#00f2fe]/20 text-white font-sans text-sm outline-none transition-all"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-xs font-mono tracking-wider text-white/70 uppercase">
                {t.roleLabel}
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#0e131f] border border-white/15 focus:border-[#00f2fe] text-white font-sans text-sm outline-none transition-all"
              >
                <option value="rssi">RSSI / CISO / Responsable Cybersécurité</option>
                <option value="dpo">DPO / Délégué à la Protection des Données</option>
                <option value="cto">CTO / VP Engineering / Tech Lead</option>
                <option value="legal">Direction Juridique & Conformité</option>
                <option value="audit">Auditeur Externe / Commissaire</option>
              </select>
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label className="text-xs font-mono tracking-wider text-white/70 uppercase">
                {t.orgLabel}
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Société Générale, Doctolib..."
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-[#00f2fe] focus:ring-2 focus:ring-[#00f2fe]/20 text-white font-sans text-sm outline-none transition-all"
              />
            </div>

          </div>

          {/* Volume Selection */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-mono tracking-wider text-white/70 uppercase">
              {t.volumeLabel}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: '< 100K lignes', val: '<100k' },
                { label: '100K - 1M lignes', val: '100k-1m' },
                { label: '1M - 10M lignes', val: '1m-10m' },
                { label: '10M+ lignes', val: '10m+' },
              ].map((vol) => (
                <button
                  key={vol.val}
                  type="button"
                  onClick={() => {
                    soundEngine.playSelect();
                    setFormData({ ...formData, volume: vol.val });
                  }}
                  className={`p-3 rounded-xl border text-xs font-mono transition-all text-center ${
                    formData.volume === vol.val
                      ? 'border-[#00f2fe] bg-[#00f2fe]/10 text-[#00f2fe] font-bold shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                      : 'border-white/10 text-white/60 hover:border-white/30'
                  }`}
                >
                  {vol.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onMouseEnter={() => soundEngine.playHover()}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-white via-[#a5f3fc] to-[#38bdf8] text-black font-display font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(0,242,254,0.6)] hover:scale-[1.01] mt-6"
          >
            <Lock className="w-4 h-4 text-black" />
            <span>{t.submitBtn}</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          <div className="text-center text-[11px] font-mono text-white/40 pt-2">
            Garantie sans engagement • Chiffrement de bout en bout • Hébergement Souverain UE
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="glass-card max-w-md w-full p-8 border border-[#00f2fe]/40 text-center space-y-4 shadow-[0_0_50px_rgba(0,242,254,0.3)]">
            <div className="w-14 h-14 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 flex items-center justify-center mx-auto text-[#10b981]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-display text-2xl font-bold text-white">
              {t.modalTitle}
            </h3>

            <p className="text-white/70 text-sm leading-relaxed">
              {t.modalDesc}
            </p>

            <button
              onClick={() => {
                soundEngine.playSelect();
                setSubmitted(false);
              }}
              className="px-6 py-2.5 rounded-full bg-white text-black font-display font-semibold text-xs tracking-wider uppercase hover:bg-[#a5f3fc] transition-all mt-4"
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
