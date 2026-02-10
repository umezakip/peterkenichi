import React from 'react';

// Simple SVG-based animated lava lamp background
export default function LavaLampBackground() {
  return (
    <svg
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0 }}
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lavaGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00CFFF" />
          <stop offset="100%" stopColor="#0a192f" />
        </linearGradient>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
          <feColorMatrix in="blur" mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
      <g filter="url(#gooey)">
        <AnimatedBlob cx={400} cy={400} r={180} delay={0} />
        <AnimatedBlob cx={900} cy={500} r={140} delay={2} />
        <AnimatedBlob cx={700} cy={200} r={120} delay={4} />
      </g>
    </svg>
  );
}

// AnimatedBlob: morphs a circle's radius and position for a "lava" effect
function AnimatedBlob({ cx, cy, r, delay }) {
  return (
    <circle>
      <animate
        attributeName="r"
        values={`${r};${r * 1.2};${r * 0.8};${r}`}
        dur="8s"
        repeatCount="indefinite"
        begin={`${delay}s`}
      />
      <animate
        attributeName="cx"
        values={`${cx};${cx + 60};${cx - 40};${cx}`}
        dur="10s"
        repeatCount="indefinite"
        begin={`${delay + 1}s`}
      />
      <animate
        attributeName="cy"
        values={`${cy};${cy - 50};${cy + 30};${cy}`}
        dur="12s"
        repeatCount="indefinite"
        begin={`${delay + 2}s`}
      />
      <animate
        attributeName="fill"
        values={`url(#lavaGradient);#00CFFF;#0a192f;url(#lavaGradient)`}
        dur="10s"
        repeatCount="indefinite"
        begin={`${delay + 1}s`}
      />
    </circle>
  );
}
