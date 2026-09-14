import { useEffect } from 'react';

/**
 * useScrollAnimations
 * Automatically applies:
 * 1. IntersectionObserver scroll reveals for all .reveal-fade-up, .reveal-card, and .reveal-text
 * 2. 3D Mouse perspective tilt and cursor spotlight tracking on all .glass-card / .tilt-card
 * 3. Dynamic ambient glow color shifting as user scrolls through the 6 scenes
 */
export function useScrollAnimations() {
  useEffect(() => {
    // ==================== 1. SCROLL REVEAL OBSERVER ====================
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const revealElements = document.querySelectorAll(
      '.reveal-fade-up, .reveal-card, .reveal-scale, .reveal-stagger'
    );
    revealElements.forEach((el) => revealObserver.observe(el));

    // ==================== 2. SPOTLIGHT & 3D TILT DYNAMICS (Optimized: No Layout Thrashing) ====================
    const glassCards = document.querySelectorAll<HTMLElement>('.glass-card');
    const tiltCards = document.querySelectorAll<HTMLElement>('.tilt-card');

    const cleanupFns: Array<() => void> = [];

    // Track cursor coordinates on all glass cards for the spotlight glow without forced reflow
    glassCards.forEach((card) => {
      const moveHandler = (e: MouseEvent) => {
        card.style.setProperty('--mouse-x', `${e.offsetX}px`);
        card.style.setProperty('--mouse-y', `${e.offsetY}px`);
      };

      card.addEventListener('mousemove', moveHandler, { passive: true });
      cleanupFns.push(() => card.removeEventListener('mousemove', moveHandler));
    });

    // Apply 3D perspective tilt only to dedicated tilt cards (cache rect on enter)
    tiltCards.forEach((card) => {
      let rect: DOMRect | null = null;

      const handleMouseEnter = () => {
        rect = card.getBoundingClientRect();
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!rect) rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotX = -((y - centerY) / centerY) * 4;
        const rotY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) translateY(-2px)`;
      };

      const handleMouseLeave = () => {
        rect = null;
        card.style.transform = '';
      };

      card.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      card.addEventListener('mousemove', handleMouseMove, { passive: true });
      card.addEventListener('mouseleave', handleMouseLeave, { passive: true });

      cleanupFns.push(() => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    // ==================== 3. AMBIENT GLOW DYNAMIC COLOR SHIFT (RAF Throttled) ====================
    const glow1 = document.querySelector<HTMLElement>('.bg-glow-1');
    const glow2 = document.querySelector<HTMLElement>('.bg-glow-2');

    const sceneGlows = [
      { g1: 'rgba(0, 242, 254, 0.20)', g2: 'rgba(56, 189, 248, 0.08)' },   // Hero: Cyan & Blue
      { g1: 'rgba(16, 185, 129, 0.20)', g2: 'rgba(0, 242, 254, 0.10)' },   // GDPR: Emerald & Cyan
      { g1: 'rgba(239, 68, 68, 0.18)', g2: 'rgba(0, 242, 254, 0.10)' },    // Threats: Red & Cyan
      { g1: 'rgba(56, 189, 248, 0.18)', g2: 'rgba(168, 85, 247, 0.12)' },  // Lifecycle: Blue & Purple
      { g1: 'rgba(168, 85, 247, 0.18)', g2: 'rgba(0, 242, 254, 0.12)' },  // Ecosystem: Purple & Cyan
      { g1: 'rgba(245, 158, 11, 0.18)', g2: 'rgba(0, 242, 254, 0.10)' },   // Briefing: Gold & Cyan
    ];

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
          const idx = Math.min(Math.floor(progress * sceneGlows.length), sceneGlows.length - 1);
          const colors = sceneGlows[idx];

          if (glow1 && glow2 && colors) {
            glow1.style.background = `radial-gradient(circle, ${colors.g1} 0%, transparent 68%)`;
            glow2.style.background = `radial-gradient(circle, ${colors.g2} 0%, transparent 68%)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      cleanupFns.forEach((fn) => fn());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
