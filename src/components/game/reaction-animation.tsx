'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ReactionAnimationProps {
  emoji: string | null;
}

export function ReactionAnimation({ emoji }: ReactionAnimationProps) {
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (emoji) {
      setVisible(true);
      setKey(prev => prev + 1); // Reset animation
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000); // Animation duration + fade out
      return () => clearTimeout(timer);
    }
  }, [emoji]);

  if (!emoji || !visible) {
    return null;
  }

  return (
    <div
      key={key}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
    >
      <div className="text-8xl animate-reaction">{emoji}</div>
      <style jsx>{`
        @keyframes reaction-animation {
          0% {
            transform: scale(0.5) translateY(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) translateY(-50px);
            opacity: 1;
          }
          100% {
            transform: scale(1.2) translateY(-70px);
            opacity: 0;
          }
        }
        .animate-reaction {
          animation: reaction-animation 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
