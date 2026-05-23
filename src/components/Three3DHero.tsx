'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Three3DHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin on client-side
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const viewport = canvas.parentElement;
    if (!viewport) return;

    // 1. Initial dimensions of the sticky viewport container
    let width = viewport.clientWidth;
    let height = viewport.clientHeight;

    // 2. Three.js Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030404); // Aarambh Brand Black

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(5, 5, 12);
    scene.add(dirLight);

    // Glowing rim / accent light in brand colors: Electric Blue (#0D21DD), Hot Pink (#FF188C), Orange (#FF9A00)
    const blueLight = new THREE.PointLight(0x0d21dd, 6, 25);
    blueLight.position.set(-6, -4, 5);
    scene.add(blueLight);

    const pinkLight = new THREE.PointLight(0xff188c, 6, 25);
    pinkLight.position.set(6, 4, 5);
    scene.add(pinkLight);

    const orangeLight = new THREE.PointLight(0xff9a00, 4, 25);
    orangeLight.position.set(0, -6, 4);
    scene.add(orangeLight);

    // 3. Textures
    const createFallbackTexture = () => {
      const fbCanvas = document.createElement('canvas');
      fbCanvas.width = 512;
      fbCanvas.height = 512;
      const ctx = fbCanvas.getContext('2d');
      if (ctx) {
        // Vibrant radial gradient in brand colors
        const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 256);
        grad.addColorStop(0, '#FF188C'); // brand pink
        grad.addColorStop(0.4, '#0D21DD'); // brand blue
        grad.addColorStop(0.7, '#FF9A00'); // brand orange
        grad.addColorStop(1, '#030404'); // brand black
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // Tech grid overlay
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        for (let i = 0; i <= 512; i += 32) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
        }
      }
      const tex = new THREE.CanvasTexture(fbCanvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const fallbackTexture = createFallbackTexture();

    // Load Unsplash concert image
    const textureLoader = new THREE.TextureLoader();
    const concertImageUrl = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80';

    // Create material configuration with brand emissive colors
    const sideMatBlue = new THREE.MeshStandardMaterial({
      color: 0x030404,
      emissive: 0x0d21dd,
      emissiveIntensity: 6.0,
      roughness: 0.15,
      metalness: 0.85,
    });

    const sideMatPink = new THREE.MeshStandardMaterial({
      color: 0x030404,
      emissive: 0xff188c,
      emissiveIntensity: 6.0,
      roughness: 0.15,
      metalness: 0.85,
    });

    const sideMatOrange = new THREE.MeshStandardMaterial({
      color: 0x030404,
      emissive: 0xff9a00,
      emissiveIntensity: 6.0,
      roughness: 0.15,
      metalness: 0.85,
    });

    const frontMat = new THREE.MeshStandardMaterial({
      color: 0x030404, // brand black
      roughness: 0.45,
      metalness: 0.7,
    });

    const backMat = new THREE.MeshStandardMaterial({
      map: fallbackTexture,
      roughness: 0.25,
      metalness: 0.25,
    });

    // Try loading actual concert imagery
    textureLoader.load(
      concertImageUrl,
      (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        backMat.map = loadedTexture;
        backMat.needsUpdate = true;
      },
      undefined,
      (err) => {
        console.warn('Concert image failed to load. Using robust fallback gradient.', err);
      }
    );


    // 4. Grid Construction
    const cols = 12;
    const rows = 8;
    const gridWidth = 16;
    const gridHeight = 10;
    const cellW = gridWidth / cols;
    const cellH = gridHeight / rows;
    const gap = 0.04;

    const group = new THREE.Group();
    scene.add(group);

    interface GridCell {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      col: number;
      row: number;
      maxExtrude: number;
    }

    const cells: GridCell[] = [];
    const animStates: { flip: number; separate: number; extrude: number }[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Custom box geometry per cell to adjust UV coords for seamless image mapping
        const geom = new THREE.BoxGeometry(cellW - gap, cellH - gap, 0.1);

        // Adjust UV coordinates of back face (index 5, vertices 20-23)
        // Flip UV coordinates horizontally (1 - originalU) to counter the 180-deg Y-rotation flip
        const uMin = c / cols;
        const uMax = (c + 1) / cols;
        const vMin = 1 - (r + 1) / rows;
        const vMax = 1 - r / rows;

        const uvAttr = geom.attributes.uv;
        const startIndex = 20 * 2; // Face index 5 starts at vertex 20
        for (let i = 0; i < 4; i++) {
          const uIdx = startIndex + i * 2;
          const vIdx = uIdx + 1;
          const originalU = uvAttr.array[uIdx];
          const originalV = uvAttr.array[vIdx];

          uvAttr.array[uIdx] = uMin + (1 - originalU) * (uMax - uMin);
          uvAttr.array[vIdx] = vMin + originalV * (vMax - vMin);
        }
        uvAttr.needsUpdate = true;

        // Choose brand emissive side material based on seeded random to create dynamic pattern
        const seed = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
        const randomVal = seed - Math.floor(seed);

        let chosenSideMat = sideMatBlue;
        if (randomVal > 0.66) {
          chosenSideMat = sideMatPink;
        } else if (randomVal > 0.33) {
          chosenSideMat = sideMatOrange;
        }

        const cellMaterials = [
          chosenSideMat, // px
          chosenSideMat, // nx
          chosenSideMat, // py
          chosenSideMat, // ny
          frontMat,      // pz
          backMat,       // nz
        ];

        const mesh = new THREE.Mesh(geom, cellMaterials);

        // Center the grid in the group
        const posX = -gridWidth / 2 + (c + 0.5) * cellW;
        const posY = gridHeight / 2 - (r + 0.5) * cellH;
        mesh.position.set(posX, posY, 0);
        group.add(mesh);

        // Custom maximum extrusion height based on distance from center for wave look
        const distFromCenter = Math.hypot(c - (cols - 1) / 2, r - (rows - 1) / 2);
        const maxExtrude = 25 + Math.sin(distFromCenter * 0.8) * 15;

        cells.push({
          mesh,
          baseX: posX,
          baseY: posY,
          col: c,
          row: r,
          maxExtrude,
        });

        animStates.push({
          flip: 0,
          separate: 0,
          extrude: 0,
        });
      }
    }

    // 5. Fitting grid to camera view
    let defaultCameraZ = 12;
    const fitGridToCamera = () => {
      if (!viewport) return;
      width = viewport.clientWidth;
      height = viewport.clientHeight;
      const screenAspect = width / height;
      const gridAspect = gridWidth / gridHeight;

      const vFOV = (camera.fov * Math.PI) / 180;

      if (screenAspect > gridAspect) {
        // Height constrained
        defaultCameraZ = (gridHeight + 1.5) / (2 * Math.tan(vFOV / 2));
      } else {
        // Width constrained
        defaultCameraZ = (gridWidth + 1.5) / (2 * Math.tan(vFOV / 2) * screenAspect);
      }

      camera.position.set(0, 0, defaultCameraZ);
      camera.aspect = screenAspect;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    fitGridToCamera();
    window.addEventListener('resize', fitGridToCamera);

    // 6. GSAP Timeline and ScrollTrigger Setup
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=250%',
        scrub: 1.0,
        pin: true,
        pinSpacing: true,
      },
    });

    // Animate states for each cell
    cells.forEach((cell, idx) => {
      const state = animStates[idx];

      // Radial stagger factor
      const centerCol = (cols - 1) / 2;
      const centerRow = (rows - 1) / 2;
      const dist = Math.hypot(cell.col - centerCol, cell.row - centerRow);

      // Phase 1: Flip & Separate (starts at scroll 0.0)
      const flipStart = dist * 0.08;

      // Animate flip (flip parameter: 0 is dark front face, 1 is back textured face)
      tl.to(
        state,
        {
          flip: 1,
          separate: 1,
          duration: 1.0,
          ease: 'power3.out',
        },
        flipStart
      );

      // Separate goes back to 0 (snaps tiles back together)
      tl.to(
        state,
        {
          separate: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        flipStart + 0.9
      );

      // Phase 2: Extrusion & Flip back to dark (starts at scroll 1.8)
      const extrudeStart = 1.8 + dist * 0.08;
      tl.to(
        state,
        {
          flip: 0,
          extrude: 1,
          duration: 1.2,
          ease: 'power4.out',
        },
        extrudeStart
      );
    });

    // Camera animations (Phase 3)
    const cameraState = {
      z: defaultCameraZ,
      y: 0,
      rotX: 0,
      rotY: 0,
    };

    // Make sure cameraState starts at calculated default
    tl.set(cameraState, { z: defaultCameraZ }, 0);

    // Camera zoom & pan animation (runs from scroll progress 3.0 to 4.5)
    tl.to(
      cameraState,
      {
        z: 1.8,
        y: -7.5,
        rotX: -Math.PI / 3.0,
        rotY: -0.15,
        duration: 1.8,
        ease: 'power3.inOut',
      },
      3.0
    );

    // Fade WebGL canvas opacity to 0
    tl.to(
      canvas,
      {
        opacity: 0,
        duration: 1.0,
        ease: 'none',
      },
      3.5
    );

    // Fade in DOM Typography overlay and transition background to Aarambh Brand Cream (#F5F1E5)
    tl.to(
      overlayRef.current,
      {
        opacity: 1,
        backgroundColor: '#F5F1E5',
        duration: 1.2,
        ease: 'none',
      },
      3.2
    );

    // Stagger text elements entering
    tl.fromTo(
      titleRef.current,
      {
        y: 120,
        scaleY: 1.6,
        opacity: 0,
      },
      {
        y: 0,
        scaleY: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
      },
      3.4
    );

    tl.fromTo(
      subtitleRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out',
      },
      3.7
    );

    // 7. Render Loop
    let animationFrameId: number;

    const render = () => {
      // Apply animated states to camera
      camera.position.z = cameraState.z;
      camera.position.y = cameraState.y;
      camera.rotation.x = cameraState.rotX;
      camera.rotation.y = cameraState.rotY;

      // Apply animated states to each cell mesh
      cells.forEach((cell, idx) => {
        const state = animStates[idx];

        // Rotation: flip around Y axis
        cell.mesh.rotation.y = state.flip * Math.PI;

        // Separation: push outwards from center
        const centerCol = (cols - 1) / 2;
        const centerRow = (rows - 1) / 2;
        const shiftX = (cell.col - centerCol) * 0.45;
        const shiftY = (cell.row - centerRow) * -0.45;

        cell.mesh.position.x = cell.baseX + state.separate * shiftX;
        cell.mesh.position.y = cell.baseY + state.separate * shiftY;

        // Extrusion: scale Z-depth and offset Z-position to anchor the back face
        const targetScaleZ = 1 + state.extrude * (cell.maxExtrude - 1);
        cell.mesh.scale.z = targetScaleZ;
        cell.mesh.position.z = (0.1 * targetScaleZ - 0.1) / 2;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', fitGridToCamera);

      // Clean up geometries and materials to prevent WebGL memory leaks
      cells.forEach((cell) => {
        cell.mesh.geometry.dispose();
      });

      sideMatBlue.dispose();
      sideMatPink.dispose();
      sideMatOrange.dispose();
      frontMat.dispose();
      backMat.dispose();

      fallbackTexture.dispose();
      renderer.dispose();

      // Kill ScrollTrigger instances created for this component
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#030404]"
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ transition: 'opacity 0.2s ease' }}
      />

      {/* High-contrast Typographic Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 select-none z-10"
      >
        <div className="text-center px-6 max-w-4xl space-y-6">
          <h1
            ref={titleRef}
            className="font-bebas text-[11vw] md:text-[9vw] leading-none text-[#030404] tracking-tighter uppercase font-black"
            style={{ transformOrigin: 'center' }}
          >
            REVEL RISE RUSH
          </h1>
          <p
            ref={subtitleRef}
            className="font-sans text-lg md:text-2xl font-black uppercase tracking-widest text-[#FF188C]"
          >
            Four days. Infinite energy.
          </p>
        </div>
      </div>
    </div>
  );
};
