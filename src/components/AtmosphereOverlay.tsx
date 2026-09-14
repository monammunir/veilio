import React from 'react';

interface AtmosphereOverlayProps {
  progress: number;
}

export const AtmosphereOverlay: React.FC<AtmosphereOverlayProps> = ({ progress }) => {
  // Gentle fade as user scrolls deeper past the hero section
  const opacity = Math.max(0, 1 - progress * 4.0);

  if (opacity <= 0.01) return null;

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none transition-opacity duration-300 select-none"
      style={{ opacity }}
    >
      {/* High-Tech Framing Reticles & Coordinate Markers */}
      <svg className="w-full h-full absolute inset-0" viewBox="0 0 1920 1080" preserveAspectRatio="none">
        {/* Subtle Framing Corner Crosshairs */}
        <path d="M 40,80 L 40,40 L 80,40" fill="none" stroke="rgba(0, 242, 254, 0.35)" strokeWidth="1.5" />
        <path d="M 1880,80 L 1880,40 L 1840,40" fill="none" stroke="rgba(0, 242, 254, 0.35)" strokeWidth="1.5" />
        <path d="M 40,1000 L 40,1040 L 80,1040" fill="none" stroke="rgba(0, 242, 254, 0.35)" strokeWidth="1.5" />
        <path d="M 1880,1000 L 1880,1040 L 1840,1040" fill="none" stroke="rgba(0, 242, 254, 0.35)" strokeWidth="1.5" />

        {/* Subtle Side Measurement Ticks */}
        <line x1="40" y1="520" x2="52" y2="520" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="1.5" />
        <line x1="40" y1="540" x2="60" y2="540" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="1.5" />
        <line x1="40" y1="560" x2="52" y2="560" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="1.5" />

        <line x1="1880" y1="520" x2="1868" y2="520" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="1.5" />
        <line x1="1880" y1="540" x2="1860" y2="540" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="1.5" />
        <line x1="1880" y1="560" x2="1868" y2="560" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="1.5" />
      </svg>

      {/* Discrete Corner Telemetry Text (Non-Intrusive) */}
      <div className="absolute top-12 left-12 font-mono text-[9px] tracking-[0.25em] text-[#00f2fe]/40 hidden md:block">
        SYS_VERIFIED // ZERO_PLAINTEXT_STORAGE
      </div>

      <div className="absolute top-12 right-12 font-mono text-[9px] tracking-[0.25em] text-[#00f2fe]/40 hidden md:block">
        ENCLAVE_GEO: EU_WEST_3 (PARIS)
      </div>

      <div className="absolute bottom-6 left-12 font-mono text-[9px] tracking-[0.2em] text-white/30 hidden md:block">
        CHIP_LEVEL_AES256_GCM // HSM_ISOLATION
      </div>

      <div className="absolute bottom-6 right-12 font-mono text-[9px] tracking-[0.2em] text-white/30 hidden md:block">
        RGPD_ART_32 // ANSSI_CSPN_READY
      </div>
    </div>
  );
};
