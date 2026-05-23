import React from 'react';

export const ContourBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-10">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full h-full min-w-[1200px]"
      >
        <g stroke="#000000" strokeWidth="1" fill="none" opacity="0.6">
          {/* Topography wavy contours */}
          <path d="M -100,200 Q 150,150 300,300 T 700,250 T 1100,400 T 1500,200" />
          <path d="M -100,300 Q 180,220 350,380 T 800,320 T 1200,500 T 1600,280" />
          <path d="M -100,400 Q 220,300 400,480 T 900,400 T 1300,600 T 1700,380" />
          <path d="M -100,500 Q 260,380 450,580 T 1000,480 T 1400,700 T 1800,480" />
          <path d="M -100,600 Q 300,460 500,680 T 1100,560 T 1500,800 T 1900,580" />
          
          <path d="M -100,800 Q 200,700 450,850 T 950,800 T 1450,950 T 1950,750" />
          <path d="M -100,900 Q 250,780 500,950 T 1050,880 T 1550,1050 T 2050,850" />
          
          {/* Centered concentric rings (brutalist accent rings) */}
          <circle cx="85%" cy="30%" r="50" strokeDasharray="5,5" />
          <circle cx="85%" cy="30%" r="90" />
          <circle cx="85%" cy="30%" r="140" />
          <circle cx="85%" cy="30%" r="200" />
          <circle cx="85%" cy="30%" r="280" strokeDasharray="10,5" />

          <circle cx="15%" cy="75%" r="60" />
          <circle cx="15%" cy="75%" r="110" strokeDasharray="3,3" />
          <circle cx="15%" cy="75%" r="170" />
          <circle cx="15%" cy="75%" r="240" />
        </g>
      </svg>
    </div>
  );
};
