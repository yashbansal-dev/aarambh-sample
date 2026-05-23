'use client';

import React, { useEffect, useRef } from 'react';

interface Block {
  c: number; // column index
  r: number; // row index
  seed: number;
  maxDepth: number;
  color: string;
  sideColor: string;
  isAccent: boolean;
}

export const BlocksBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current.target = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Grid configuration
    const cols = 14;
    const rows = 8;
    const gap = 3;

    // Seeded random for block properties to keep them consistent
    const blocks: Block[] = [];
    const colorChoices = ['#0D21DD', '#FF9A00', '#FF188C']; // Purple, Green, Pink

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const seed = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
        const randomVal = seed - Math.floor(seed);
        
        // Decide side color
        let sideColor = colorChoices[0]; // default purple
        let isAccent = false;
        if (randomVal > 0.85) {
          sideColor = colorChoices[1]; // green accent
          isAccent = true;
        } else if (randomVal > 0.7) {
          sideColor = colorChoices[2]; // pink accent
          isAccent = true;
        }

        blocks.push({
          c,
          r,
          seed: randomVal,
          maxDepth: 30 + randomVal * 90, // Max extrusion depth from 30px to 120px
          color: '#1a1a1a', // Front face color (dark gray)
          sideColor,
          isAccent,
        });
      }
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      // Handle high DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Redraw on fonts loaded to ensure Bebas Neue renders correctly
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        resizeCanvas();
      });
    }

    const render = () => {
      // Smooth lerp scroll position for kinetic motion
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.085;
      
      // Calculate scroll progress (0 to 1 over 450px)
      const maxScroll = 450;
      const progress = Math.min(scrollRef.current.current / maxScroll, 1);

      // Clear canvas with the page background color
      ctx.fillStyle = '#F5F1E5';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw watermark text in the background
      ctx.save();
      const fontName = typeof window !== 'undefined'
        ? (getComputedStyle(document.documentElement).getPropertyValue('--font-bebas-neue') ||
           getComputedStyle(document.documentElement).getPropertyValue('--font-bebas') ||
           '"Bebas Neue", sans-serif')
        : '"Bebas Neue", sans-serif';
      ctx.font = `400 13vw ${fontName}`;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw RISE (left), RUSH (center), REVEL (right)
      ctx.fillText('RISE', width * 0.22, height * 0.35);
      ctx.fillText('RUSH', width * 0.5, height * 0.65);
      ctx.fillText('REVEL', width * 0.78, height * 0.35);
      ctx.restore();

      // Grid details
      const cellW = width / cols;
      const cellH = height / rows;

      // Projection center (vanishing point)
      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 800;

      // Draw blocks sorted by distance from the center of projection
      // (This ensures correct overlap/depth sorting when they expand outwards)
      const sortedBlocks = [...blocks].sort((a, b) => {
        const ax = a.c * cellW + cellW / 2;
        const ay = a.r * cellH + cellH / 2;
        const bx = b.c * cellW + cellW / 2;
        const by = b.r * cellH + cellH / 2;
        const distA = Math.hypot(ax - cx, ay - cy);
        const distB = Math.hypot(bx - cx, by - cy);
        return distA - distB; // Draw center blocks first or edge blocks first?
        // Since they part outwards, center blocks are behind edge blocks in shift direction,
        // so drawing center blocks first allows edge blocks to overlap them if they touch.
      });

      sortedBlocks.forEach((block) => {
        const { c, r, maxDepth, color, sideColor, seed } = block;

        // Base cell position
        const bx = c * cellW + gap / 2;
        const by = r * cellH + gap / 2;
        const bw = cellW - gap;
        const bh = cellH - gap;

        // Calculate horizontal parting offset based on column position relative to center
        const centerCol = (cols - 1) / 2;
        const colOffset = c - centerCol;
        const colShiftFactor = colOffset / centerCol; // -1 to 1

        const centerRow = (rows - 1) / 2;
        const rowOffset = r - centerRow;
        const rowShiftFactor = rowOffset / centerRow; // -1 to 1

        // Horizontal and vertical shift (parting to reveal background)
        const shiftX = colShiftFactor * progress * (cellW * 1.5);
        const shiftY = rowShiftFactor * progress * (cellH * 1.0);

        // Extrusion depth based on scroll progress and seeded random delay
        const delay = seed * 0.3; // up to 30% scroll offset delay
        const blockProgress = Math.max(0, (progress - delay) / (1 - delay));
        const depth = blockProgress * maxDepth;

        // 3D Perspective Scale factor
        const scale = focalLength / (focalLength - depth);

        // Coordinates of the back face (stationary on screen plane z=0)
        const x0 = bx + shiftX;
        const y0 = by + shiftY;
        const x1 = bx + bw + shiftX;
        const y1 = by + shiftY;
        const x2 = bx + bw + shiftX;
        const y2 = by + bh + shiftY;
        const x3 = bx + shiftX;
        const y3 = by + bh + shiftY;

        // Projected coordinates of the front face (nearer to viewer z=depth)
        const px0 = cx + (x0 - cx) * scale;
        const py0 = cy + (y0 - cy) * scale;
        const px1 = cx + (x1 - cx) * scale;
        const py1 = cy + (y1 - cy) * scale;
        const px2 = cx + (x2 - cx) * scale;
        const py2 = cy + (y2 - cy) * scale;
        const px3 = cx + (x3 - cx) * scale;
        const py3 = cy + (y3 - cy) * scale;

        // Draw side faces if extruded (depth > 0)
        if (depth > 0.1) {
          // Shading multipliers based on side angle (simple directional light from top-left)
          // Draw Top Side
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.lineTo(px1, py1);
          ctx.lineTo(px0, py0);
          ctx.closePath();
          ctx.fillStyle = adjustBrightness(sideColor, 20); // Lighter top face
          ctx.fill();

          // Draw Bottom Side
          ctx.beginPath();
          ctx.moveTo(x3, y3);
          ctx.lineTo(x2, y2);
          ctx.lineTo(px2, py2);
          ctx.lineTo(px3, py3);
          ctx.closePath();
          ctx.fillStyle = adjustBrightness(sideColor, -25); // Darker bottom face
          ctx.fill();

          // Draw Left Side
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x3, y3);
          ctx.lineTo(px3, py3);
          ctx.lineTo(px0, py0);
          ctx.closePath();
          ctx.fillStyle = adjustBrightness(sideColor, -5); // Medium left face
          ctx.fill();

          // Draw Right Side
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineTo(px2, py2);
          ctx.lineTo(px1, py1);
          ctx.closePath();
          ctx.fillStyle = adjustBrightness(sideColor, -15); // Medium-dark right face
          ctx.fill();
        }

        // Draw Front Face (Black block top)
        ctx.beginPath();
        ctx.moveTo(px0, py0);
        ctx.lineTo(px1, py1);
        ctx.lineTo(px2, py2);
        ctx.lineTo(px3, py3);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        // Subtle borders on front face for high fidelity look
        ctx.strokeStyle = '#2d2d2d';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Helper function to shade colors for realistic 3D appearance
  function adjustBrightness(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 0 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ display: 'block' }}
    />
  );
};
