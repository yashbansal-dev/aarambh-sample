'use strict';

'use client';

import React, { useState, useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [trail, setTrail] = useState({ x: -200, y: -200 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseRef = useRef({ x: -200, y: -200 });
  const trailRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    // Disable custom cursor on mobile touchscreens
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.style.cursor === 'pointer' ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    let animId: number;
    const animate = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      // Linear interpolation (lerp) to create a smooth trailing effect
      trailRef.current.x += (targetX - trailRef.current.x) * 0.15;
      trailRef.current.y += (targetY - trailRef.current.y) * 0.15;

      setPosition({ x: targetX, y: targetY });
      setTrail({ x: trailRef.current.x, y: trailRef.current.y });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Sharp Purple Arrowhead Pointer (zero delay) */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-[4px] -translate-y-[4px] select-none"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.5 3L19.5 12L4.5 21V3Z"
            fill="#0D21DD"
            stroke="black"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 2. Circular Text Marquee Follower (lerp trailing delay) */}
      <div
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 select-none transition-transform duration-300"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: `translate3d(-50%, -50%, 0) scale(${isHovering ? 1.35 : 1})`,
        }}
      >
        <svg className="w-24 h-24 animate-spin-slow" viewBox="0 0 100 100" style={{ animationDuration: '10s' }}>
          <path
            id="cursorPath"
            d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
            fill="none"
            stroke="none"
          />
          <text fill="black" className="font-bebas text-[9px] tracking-[4px] uppercase font-black">
            <textPath href="#cursorPath" startOffset="0%">
              ★ RISE ★ RUSH ★ REVEL ★ RISE ★ RUSH ★ REVEL
            </textPath>
          </text>
        </svg>
      </div>
    </>
  );
};
