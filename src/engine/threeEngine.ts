import * as THREE from 'three';

/* ==========================================================================
   VEILIO 3D CYBER AMBIENT ENGINE — PERSPECTIVE GRID, NODE MATRIX & DEFENSE BARRIER
   ========================================================================== */

export interface ThreeEngineInstance {
  updateProgress: (progress: number) => void;
  setThreatMode: (isProtected: boolean) => void;
  destroy: () => void;
}

export function initThreeEngine(container: HTMLElement): ThreeEngineInstance {
  let animationFrameId: number;

  // 1. Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x040507, 0.015);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.2, 9);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  // Master Root Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.0);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0x00f2fe, 2.0);
  keyLight.position.set(5, 10, 8);
  scene.add(keyLight);

  const threatRimLight = new THREE.PointLight(0x00f2fe, 2.5, 30);
  threatRimLight.position.set(0, -2, 4);
  scene.add(threatRimLight);

  // ==================== 1. PERSPECTIVE CYBER GRID (GROUND & CEILING) ====================
  // Generates high-tech infinite grid lines receding into darkness
  const gridHelper = new THREE.GridHelper(120, 60, 0x00f2fe, 0x0c2744);
  gridHelper.position.y = -3.8;
  const gridMaterial = gridHelper.material as THREE.LineBasicMaterial;
  gridMaterial.transparent = true;
  gridMaterial.opacity = 0.22;
  masterGroup.add(gridHelper);

  // Subtle top ceiling grid
  const ceilGrid = new THREE.GridHelper(120, 60, 0x1e3a8a, 0x071526);
  ceilGrid.position.y = 8.5;
  const ceilMaterial = ceilGrid.material as THREE.LineBasicMaterial;
  ceilMaterial.transparent = true;
  ceilMaterial.opacity = 0.12;
  masterGroup.add(ceilGrid);

  // ==================== 2. DEEP DATA CONSTELLATION (STARS / CRYPTO NODES) ====================
  const starCount = 1800;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    // Keep stars spaced in the deep background and side periphery
    starPos[i * 3] = (Math.random() - 0.5) * 140;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 10;

    const isCyan = Math.random() > 0.45;
    const isEmerald = !isCyan && Math.random() > 0.5;

    if (isCyan) {
      starColors[i * 3] = 0.0;
      starColors[i * 3 + 1] = 0.95;
      starColors[i * 3 + 2] = 1.0;
    } else if (isEmerald) {
      starColors[i * 3] = 0.06;
      starColors[i * 3 + 1] = 0.72;
      starColors[i * 3 + 2] = 0.5;
    } else {
      starColors[i * 3] = 0.22;
      starColors[i * 3 + 1] = 0.74;
      starColors[i * 3 + 2] = 0.97;
    }
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 0.14,
    vertexColors: true,
    transparent: true,
    opacity: 0.65,
    sizeAttenuation: true,
  });
  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  // ==================== 3. FLOATING CRYPTO NETWORK RING & PARTICLES (PERIPHERY) ====================
  // Clean decorative holographic torus ring floating deep in the background
  const ringGeo = new THREE.TorusGeometry(5.5, 0.02, 16, 120);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x00f2fe,
    transparent: true,
    opacity: 0.15,
  });
  const backgroundHoloRing = new THREE.Mesh(ringGeo, ringMat);
  backgroundHoloRing.position.set(3.5, 0, -4);
  backgroundHoloRing.rotation.x = Math.PI * 0.35;
  masterGroup.add(backgroundHoloRing);

  const ringGeo2 = new THREE.TorusGeometry(7.2, 0.015, 16, 140);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.1,
  });
  const backgroundHoloRing2 = new THREE.Mesh(ringGeo2, ringMat2);
  backgroundHoloRing2.position.set(3.5, 0, -5);
  backgroundHoloRing2.rotation.x = -Math.PI * 0.25;
  masterGroup.add(backgroundHoloRing2);

  // ==================== 4. THREAT DEFLECTION SANDBOX (SAFE ZONE Z < -1) ====================
  // Visualizes packet flow safely without ever touching foreground typography
  const packetCount = 200;
  const packetGeo = new THREE.BufferGeometry();
  const packetPos = new Float32Array(packetCount * 3);
  const packetCol = new Float32Array(packetCount * 3);
  const packetSpeeds: number[] = [];

  for (let i = 0; i < packetCount; i++) {
    // Restricted strictly to right side periphery [x: 1.5 to 8.0]
    packetPos[i * 3] = 1.5 + Math.random() * 6.5;
    packetPos[i * 3 + 1] = (Math.random() - 0.5) * 6;
    packetPos[i * 3 + 2] = -2 - Math.random() * 6;

    packetCol[i * 3] = 0.0;
    packetCol[i * 3 + 1] = 0.95;
    packetCol[i * 3 + 2] = 1.0;
    packetSpeeds.push(0.015 + Math.random() * 0.025);
  }

  packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPos, 3));
  packetGeo.setAttribute('color', new THREE.BufferAttribute(packetCol, 3));

  const packetMat = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  });
  const packetField = new THREE.Points(packetGeo, packetMat);
  masterGroup.add(packetField);

  let isShieldFortified = true;

  // ==================== MOUSE INTERACTION & VERTICAL SCROLL ====================
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let targetProgress = 0;
  let currentProgress = 0;

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  const handleMouseMove = (e: MouseEvent) => {
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
  };

  window.addEventListener('resize', handleResize);
  window.addEventListener('mousemove', handleMouseMove);

  // ==================== ANIMATION RENDER LOOP ====================
  const clock = new THREE.Clock();

  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Mouse Lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    // Scroll Progress Lerp
    currentProgress += (targetProgress - currentProgress) * 0.05;

    // Camera movement based on vertical scroll
    // Seamless vertical journey through cyberspace
    camera.position.y = 1.2 - currentProgress * 4.0 + mouse.y * 0.4;
    camera.position.x = mouse.x * 0.5;
    camera.rotation.x = -mouse.y * 0.05 - currentProgress * 0.15;
    camera.rotation.y = -mouse.x * 0.05;

    // Perspective grid subtle forward pulse
    gridHelper.position.z = (elapsedTime * 1.5) % 2 - 1;
    ceilGrid.position.z = (elapsedTime * 0.8) % 2 - 1;

    // Starfield gentle rotation
    starField.rotation.y = elapsedTime * 0.015;
    starField.rotation.x = Math.sin(elapsedTime * 0.01) * 0.05;

    // Rings slow majestic rotation
    backgroundHoloRing.rotation.z = elapsedTime * 0.05;
    backgroundHoloRing2.rotation.z = -elapsedTime * 0.03;

    // Animate peripheral data packets safely on the right
    const pArr = packetGeo.attributes.position.array as Float32Array;
    const cArr = packetGeo.attributes.color.array as Float32Array;

    for (let i = 0; i < packetCount; i++) {
      pArr[i * 3 + 1] += packetSpeeds[i];
      if (pArr[i * 3 + 1] > 3.5) {
        pArr[i * 3 + 1] = -3.5;
        pArr[i * 3] = 1.5 + Math.random() * 6.5;

        if (isShieldFortified) {
          cArr[i * 3] = 0.0;
          cArr[i * 3 + 1] = 0.95;
          cArr[i * 3 + 2] = 1.0;
        } else {
          cArr[i * 3] = 0.95;
          cArr[i * 3 + 1] = 0.2;
          cArr[i * 3 + 2] = 0.25;
        }
      }
    }
    packetGeo.attributes.position.needsUpdate = true;
    packetGeo.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
  };

  animate();

  return {
    updateProgress: (progress: number) => {
      targetProgress = Math.max(0, Math.min(1, progress));
    },
    setThreatMode: (isProtected: boolean) => {
      isShieldFortified = isProtected;
      threatRimLight.color.setHex(isProtected ? 0x00f2fe : 0xef4444);
      gridMaterial.color.setHex(isProtected ? 0x00f2fe : 0xef4444);
      ringMat.color.setHex(isProtected ? 0x00f2fe : 0xef4444);
    },
    destroy: () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    },
  };
}
