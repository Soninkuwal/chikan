import React from 'react';

export const ChickenIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    data-ai-hint="chicken character"
  >
    <g>
      <circle cx="64" cy="64" r="64" fill="#FFD700" />
      <circle cx="64" cy="64" r="60" fill="white" stroke="#222" strokeWidth="2" />
      <path
        d="M64 12c-1.6 0-3 1.8-3 4s1.4 3.8 3 4c3.4 0 6.2-2.8 6.2-6.2S67.4 12 64 12z"
        fill="#FF4B4B"
      />
      <circle cx="48" cy="50" r="6" fill="#222" />
      <circle cx="80" cy="50" r="6" fill="#222" />
      <path
        d="M64 68c-8 0-8-8-16-8s-8 8-16 8h48c-8 0-8-8-16-8z"
        fill="none"
        stroke="#222"
        strokeWidth="2"
        strokeLinecap="round"
        className="hidden"
      />
      <path
        d="M72 62.5c0 4.4-3.6 8-8 8s-8-3.6-8-8"
        fill="#FF8C00"
        stroke="#222"
        strokeWidth="2"
      />
      <path
        d="M28 92c-4-4-4-12 0-16s12-4 16 0"
        fill="#FFD700"
        stroke="#222"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M100 92c4-4 4-12 0-16s-12-4-16 0"
        fill="#FFD700"
        stroke="#222"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  </svg>
);
