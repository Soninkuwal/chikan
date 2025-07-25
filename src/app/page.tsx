'use client';

import React, { useState } from 'react';
import { GameHeader } from '@/components/game/game-header';
import { PlayerInfo } from '@/components/game/player-info';
import { GameArena } from '@/components/game/game-arena';
import { ControlPanel } from '@/components/game/control-panel';
import { useToast } from '@/hooks/use-toast';
import { SidebarMenu } from '@/components/game/sidebar-menu';
import { useAudio } from '@/hooks/use-audio';
import { ReactionAnimation } from '@/components/game/reaction-animation';

const winEmojis = ['🎉', '✨', '🥳', '🙌', '🤩', '🔥', '💯'];
const lossEmojis = ['😢', '😭', '👎', '💔', '🤯', '🤦‍♂️', '😩'];

export default function Home() {
  const [balance, setBalance] = useState(500.00);
  const [betAmount, setBetAmount] = useState<number>(100);
  const [selectedGate, setSelectedGate] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameResult, setGameResult] = useState<{ status: 'win' | 'loss', amount: number } | null>(null);
  const [gameCount, setGameCount] = useState(0);
  const [reactionEmoji, setReactionEmoji] = useState<string | null>(null);

  const {
    musicEnabled,
    setMusicEnabled,
    soundEnabled,
    setSoundEnabled,
    playClick,
    playWin,
    playLose
  } = useAudio();

  const { toast } = useToast();

  const handlePlay = () => {
    if (!selectedGate) {
        toast({
            title: "Select a Gate",
            description: "You must select a multiplier gate to place a bet.",
            variant: "destructive",
        });
        return;
    }

    if (balance < betAmount) {
        toast({
            title: "Insufficient Balance",
            description: "You don't have enough balance to place this bet.",
            variant: "destructive",
        });
        return;
    }
    
    playClick();
    setIsPlaying(true);
    setReactionEmoji(null);
    setBalance(prev => prev - betAmount);
    
    // Simulate game logic
    setTimeout(() => {
        const gameIndexInSequence = gameCount % 5;
        const win = gameIndexInSequence < 2; // First 2 games are wins (0, 1), next 3 are losses (2, 3, 4)
        const multiplier = parseFloat(selectedGate);
        const winnings = betAmount * multiplier;

        if (win) {
            setGameResult({ status: 'win', amount: winnings });
            setBalance(prev => prev + winnings);
            setReactionEmoji(winEmojis[Math.floor(Math.random() * winEmojis.length)]);
            playWin();
             toast({
                title: "You Won!",
                description: `Congratulations! You won ₹${winnings.toFixed(2)}.`,
            });
        } else {
            setGameResult({ status: 'loss', amount: betAmount });
            setReactionEmoji(lossEmojis[Math.floor(Math.random() * lossEmojis.length)]);
            playLose();
             toast({
                title: "You Lost",
                description: `Better luck next time! You lost ₹${betAmount.toFixed(2)}.`,
                variant: 'destructive'
            });
        }

        setIsPlaying(false);
        setSelectedGate(null); // Reset gate selection
        setGameCount(prev => prev + 1); // Increment game count for the sequence
    }, 2000); // Simulate 2 second game
  };


  return (
    <div className="flex flex-col min-h-screen bg-transparent bg-grid-white/[0.05] overflow-hidden">
        <SidebarMenu 
            musicEnabled={musicEnabled} 
            setMusicEnabled={setMusicEnabled} 
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
        />
      <GameHeader balance={balance} />
      <main className="flex-1 container mx-auto p-4 flex flex-col lg:flex-row gap-8 items-center justify-center relative animate-content-show">
        <div className="w-full lg:w-1/4 xl:w-1/5">
          <PlayerInfo balance={balance} />
        </div>
        <div className="w-full lg:w-3/4 xl:w-4/5 flex-1 flex flex-col justify-between relative">
          <GameArena 
            selectedGate={selectedGate}
            onGateSelect={(gate) => {
                setSelectedGate(gate);
                playClick();
            }}
            isPlaying={isPlaying}
          />
          <ReactionAnimation emoji={reactionEmoji} />
        </div>
      </main>
      <ControlPanel
        betAmount={betAmount}
        setBetAmount={(amount) => {
            setBetAmount(amount)
            playClick();
        }}
        onPlay={handlePlay}
        isPlaying={isPlaying}
        isGateSelected={!!selectedGate}
      />
    </div>
  );
}

    