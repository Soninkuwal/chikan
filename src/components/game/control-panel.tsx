'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface ControlPanelProps {
  betAmount: number;
  setBetAmount: (amount: number) => void;
  onPlay: () => void;
  isPlaying: boolean;
  isGateSelected: boolean;
}

export function ControlPanel({ betAmount, setBetAmount, onPlay, isPlaying, isGateSelected }: ControlPanelProps) {
  const betOptions = [100, 500, 1000, 2000, 5000];

  return (
    <div className="sticky bottom-0 w-full bg-background/50 backdrop-blur-lg border-t border-border/50 py-4 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm hidden md:inline">BET:</span>
          <div className="flex items-center gap-2 flex-wrap justify-center">
          {betOptions.map((amount) => (
            <Button
              key={amount}
              variant={betAmount === amount ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setBetAmount(amount)}
              className="font-bold"
              disabled={isPlaying}
            >
              ₹{amount}
            </Button>
          ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Select defaultValue="easy" disabled={isPlaying}>
            <SelectTrigger className="w-[140px] bg-secondary font-bold">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-6 rounded-xl shadow-[0_5px_20px_-5px] shadow-primary/50"
            onClick={onPlay}
            disabled={isPlaying || !isGateSelected}
          >
            {isPlaying ? <Loader2 className="animate-spin" /> : 'PLAY'}
          </Button>
        </div>
      </div>
    </div>
  );
}
