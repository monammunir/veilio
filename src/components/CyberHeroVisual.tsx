import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ShieldCheck, Cpu, Lock, Move3d, Sparkles } from 'lucide-react';
import { soundEngine } from '../engine/soundEngine';

export const CyberHeroVisual: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFortified, setIsFortified] = useState(false);

  const triggerFortify = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 650;
    const height = container.clientHeight || 650;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. High-End Studio Cyber Lighting
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    scene.add(ambientLight);

    // Primary High-Intensity Key Light (Crisp chrome shackle reflections)
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(5, 7, 7);
    scene.add(keyLight);

    // Electric Cyan Rim Light
    const cyanRimLight = new THREE.DirectionalLight(0x00f2fe, 5.0);
    cyanRimLight.position.set(-7, 2, 4);
    scene.add(cyanRimLight);

    // Emerald Fill Light
    const emeraldRimLight = new THREE.DirectionalLight(0x10b981, 2.8);
    emeraldRimLight.position.set(5, -6, 4);
    scene.add(emeraldRimLight);

    // Core Keyhole Point Light
    const coreLight = new THREE.PointLight(0x00f2fe, 4.5, 6);
    coreLight.position.set(0, -0.1, 1.4);
    scene.add(coreLight);

    // 3. Master Visual Group
    const masterAssembly = new THREE.Group();
    scene.add(masterAssembly);

    // ==================== BACKGROUND HOLOGRAPHIC CYBER SHIELD ====================
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 1.75);
    shieldShape.lineTo(1.4, 1.2);
    shieldShape.lineTo(1.45, -0.3);
    shieldShape.lineTo(0.8, -1.4);
    shieldShape.lineTo(0, -1.95);
    shieldShape.lineTo(-0.8, -1.4);
    shieldShape.lineTo(-1.45, -0.3);
    shieldShape.lineTo(-1.4, 1.2);
    shieldShape.closePath();

    const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    shieldGeo.center();

    const shieldMat = new THREE.MeshPhysicalMaterial({
      color: 0x051329,
      emissive: 0x002844,
      emissiveIntensity: 0.5,
      metalness: 0.4,
      roughness: 0.15,
      transmission: 0.82,
      thickness: 0.6,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.position.set(0, 0, -0.45);
    masterAssembly.add(shieldMesh);

    // Neon Edge around shield
    const shieldEdges = new THREE.EdgesGeometry(shieldGeo, 20);
    const shieldEdgeMat = new THREE.LineBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.85,
    });
    const shieldBorder = new THREE.LineSegments(shieldEdges, shieldEdgeMat);
    shieldMesh.add(shieldBorder);

    // Hexagonal Matrix Wireframe inside shield
    const hexWireGeo = new THREE.PlaneGeometry(2.4, 3.2, 6, 8);
    const hexWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const hexWire = new THREE.Mesh(hexWireGeo, hexWireMat);
    hexWire.position.z = 0.08;
    shieldMesh.add(hexWire);

    // ==================== 3D PADLOCK GLTF MODEL ====================
    let padlockMesh: THREE.Group | null = null;
    const accentMaterials: THREE.MeshStandardMaterial[] = [];

    const loader = new GLTFLoader();
    loader.load(
      '/models/lock/padlock.glb',
      (gltf) => {
        const model = gltf.scene;

        // Auto center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.scale.set(1.5, 1.5, 1.5);

        // Customize materials for ultra-premium PBR chrome & titanium
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            if (m.material instanceof THREE.MeshStandardMaterial) {
              const mat = m.material;
              if (mat.name.includes('Shackle') || mat.name.includes('Steel')) {
                mat.metalness = 0.99;
                mat.roughness = 0.04;
                mat.color.setHex(0xf8fafc);
              } else if (mat.name.includes('Body') || mat.name.includes('Titanium')) {
                mat.metalness = 0.94;
                mat.roughness = 0.18;
                mat.color.setHex(0x101928);
              } else if (mat.name.includes('Accent') || mat.name.includes('Cyber') || mat.emissive.getHex() > 0) {
                mat.emissive.setHex(0x00f2fe);
                mat.emissiveIntensity = 1.5;
                accentMaterials.push(mat);
              }
            }
          }
        });

        padlockMesh = model;
        masterAssembly.add(model);
        setIsLoaded(true);
      },
      undefined,
      (err) => {
        console.warn('Padlock model load error:', err);
      }
    );

    // ==================== EXPANDING SHOCKWAVE ====================
    const shockwaveGeo = new THREE.RingGeometry(0.6, 0.68, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const shockwave = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwave.position.z = 0.3;
    masterAssembly.add(shockwave);

    // ==================== INTERACTION & ROTATION ====================
    let isDragging = false;
    let previousPointer = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    const mouseParallax = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointer = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseParallax.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseParallax.targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (isDragging) {
        const dx = e.clientX - previousPointer.x;
        const dy = e.clientY - previousPointer.y;

        velocity.y = dx * 0.008;
        velocity.x = dy * 0.008;

        masterAssembly.rotation.y += velocity.y;
        masterAssembly.rotation.x += velocity.x;

        previousPointer = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Fortify pulse trigger
    let pulseProgress = 1.0;
    triggerFortify.current = () => {
      soundEngine.playCryptoEncrypt();
      pulseProgress = 0.0;
      setIsFortified(true);
      setTimeout(() => setIsFortified(false), 1200);
    };

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 650;
      const h = container.clientHeight || 650;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Mouse Parallax Lerp
      mouseParallax.x += (mouseParallax.targetX - mouseParallax.x) * 0.05;
      mouseParallax.y += (mouseParallax.targetY - mouseParallax.y) * 0.05;

      // Inertia & Idle Float
      if (!isDragging) {
        velocity.x *= 0.94;
        velocity.y *= 0.94;
        masterAssembly.rotation.x += velocity.x;
        masterAssembly.rotation.y += velocity.y;

        // Majestic floating idle rotation + mouse tilt
        masterAssembly.rotation.y += 0.004;
        masterAssembly.position.y = Math.sin(elapsed * 1.6) * 0.07 + mouseParallax.y * 0.12;
        masterAssembly.position.x = mouseParallax.x * 0.12;
      }

      // Pulse Animation
      if (pulseProgress < 1.0) {
        pulseProgress += 0.035;
        const scale = 0.6 + pulseProgress * 3.8;
        shockwave.scale.set(scale, scale, 1);
        shockwaveMat.opacity = Math.max(0, (1 - pulseProgress) * 0.9);

        coreLight.intensity = 4.5 + Math.sin(pulseProgress * Math.PI) * 7.0;
        accentMaterials.forEach((m) => {
          m.emissiveIntensity = 1.5 + Math.sin(pulseProgress * Math.PI) * 4.0;
        });
      } else {
        shockwaveMat.opacity = 0;
        coreLight.intensity = 4.5 + Math.sin(elapsed * 2.2) * 1.0;
        accentMaterials.forEach((m) => {
          m.emissiveIntensity = 1.5 + Math.sin(elapsed * 2.2) * 0.5;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleClick = () => {
    if (triggerFortify.current) {
      triggerFortify.current();
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => soundEngine.playHover()}
      className="relative w-full max-w-[660px] lg:max-w-[720px] aspect-square mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing select-none group"
    >
      {/* Deep Atmospheric Cyber Corona Glow (Nioma-style) */}
      <div className={`absolute w-[110%] h-[110%] rounded-full bg-[radial-gradient(circle,rgba(0,242,254,0.30)_0%,rgba(56,189,248,0.14)_45%,transparent_72%)] blur-3xl pointer-events-none transition-all duration-700 ${isFortified ? 'scale-125 opacity-100' : 'group-hover:scale-105 opacity-80'}`} />
      <div className="absolute w-[90%] h-[90%] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.18)_0%,transparent_60%)] blur-3xl pointer-events-none" />

      {/* ==================== PRECISION SVG CONCENTRIC ORBIT SYSTEM (NIOMA) ==================== */}
      <svg className="planet-precision-svg" viewBox="0 0 800 800" preserveAspectRatio="none">
        <defs>
          <filter id="cyberAtmosphereNeon" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur2" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="orbitGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Concentric Orbit Ring 1 (Inner Cyan Dashed) */}
        <ellipse
          cx="400"
          cy="400"
          rx="320"
          ry="150"
          fill="none"
          className="orbit-path orbit-concentric-1"
          filter="url(#orbitGlowFilter)"
        />

        {/* Concentric Orbit Ring 2 (Outer Blue Dashed) */}
        <ellipse
          cx="400"
          cy="400"
          rx="370"
          ry="175"
          fill="none"
          className="orbit-path orbit-concentric-2"
          filter="url(#orbitGlowFilter)"
        />

        {/* Precision Laser Pointer Callout Lines */}
        {/* Line 1: Top-Left pointing to Chrome Shackle (Apex) */}
        <line x1="140" y1="160" x2="350" y2="280" stroke="rgba(56, 189, 248, 0.85)" strokeWidth="1.5" filter="url(#orbitGlowFilter)" />
        <circle cx="350" cy="280" r="4.5" fill="#00f2fe" filter="url(#orbitGlowFilter)" />
        <circle cx="350" cy="280" r="2" fill="#ffffff" />

        {/* Line 2: Center-Right pointing to Lock Keyway Core */}
        <line x1="680" y1="420" x2="440" y2="420" stroke="rgba(0, 242, 254, 0.85)" strokeWidth="1.5" filter="url(#orbitGlowFilter)" />
        <circle cx="440" cy="420" r="4.5" fill="#00f2fe" filter="url(#orbitGlowFilter)" />
        <circle cx="440" cy="420" r="2" fill="#ffffff" />

        {/* Line 3: Bottom-Left pointing to Titanium Shield Perimeter */}
        <line x1="160" y1="620" x2="330" y2="530" stroke="rgba(16, 185, 129, 0.85)" strokeWidth="1.5" filter="url(#orbitGlowFilter)" />
        <circle cx="330" cy="530" r="4.5" fill="#10b981" filter="url(#orbitGlowFilter)" />
        <circle cx="330" cy="530" r="2" fill="#ffffff" />
      </svg>

      {/* ==================== SPECULAR SUNBURST HIGHLIGHT FLARE (NIOMA) ==================== */}
      <div className="planet-sunburst-flare" style={{ left: '50%', top: '32%' }}>
        <div className="flare-core" />
        <div className="flare-streak" />
        <div className="flare-glow" />
      </div>

      {/* ==================== ORBITING SATELLITES ON TRACKS (NIOMA) ==================== */}
      <div className="orbit-satellite sat-concentric-1">
        <div className="sat-wing sat-wing-left" />
        <div className="sat-body" />
        <div className="sat-wing sat-wing-right" />
        <div className="sat-beacon" />
      </div>

      <div className="orbit-satellite sat-concentric-2">
        <div className="sat-wing sat-wing-left" />
        <div className="sat-body" />
        <div className="sat-wing sat-wing-right" />
        <div className="sat-beacon" />
      </div>

      {/* ==================== 3D WEBGL MODEL CANVAS ==================== */}
      <div
        ref={mountRef}
        className="relative w-full h-full z-10 flex items-center justify-center pointer-events-auto"
      />

      {/* ==================== SCI-FI TECH CALLOUT BADGES (NIOMA) ==================== */}
      {/* Callout 1: Chrome Shackle */}
      <div className="tech-callout" style={{ left: '4%', top: '16%' }}>
        <div className="callout-content">
          <span className="callout-icon">
            <Lock className="w-3 h-3 text-[#38bdf8]" />
          </span>
          <span className="callout-text">CHIFFREMENT AES-256</span>
        </div>
      </div>

      {/* Callout 2: Enclave Core */}
      <div className="tech-callout" style={{ right: '4%', top: '50%' }}>
        <div className="callout-content">
          <span className="callout-icon">
            <Cpu className="w-3 h-3 text-[#00f2fe]" />
          </span>
          <span className="callout-text">ENCLAVE MATÉRIELLE HSM</span>
        </div>
      </div>

      {/* Callout 3: Sovereignty */}
      <div className="tech-callout" style={{ left: '6%', bottom: '18%' }}>
        <div className="callout-content">
          <span className="callout-icon">
            <ShieldCheck className="w-3 h-3 text-[#10b981]" />
          </span>
          <span className="callout-text">CONFORME CNIL & NIS2</span>
        </div>
      </div>

      {/* Center Bottom 3D Interactive Drag Hint */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-[10px] font-mono text-white/60 tracking-widest uppercase transition-colors group-hover:text-[#00f2fe] group-hover:border-[#00f2fe]/40 shadow-lg">
        <Move3d className="w-3.5 h-3.5 animate-pulse text-[#00f2fe]" />
        <span>3D INTERACTIF // GLISSER POUR PIVOTER</span>
      </div>
    </div>
  );
};
