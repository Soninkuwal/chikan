import React from 'react';
import { ChickenIcon } from '../icons/chicken-icon';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const MultiplierGate = ({
  multiplier,
  isSelected,
  onClick,
  isPlaying,
}: {
  multiplier: string;
  isSelected: boolean;
  onClick: () => void;
  isPlaying: boolean;
}) => (
  <button
    className="relative flex flex-col items-center group disabled:cursor-not-allowed"
    onClick={onClick}
    disabled={isPlaying}
  >
    <div className="w-1 h-16 bg-primary/50" />
    <div
      className={cn(
        'relative bg-background border-2 border-primary rounded-full h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center text-primary font-bold text-lg sm:text-xl shadow-[0_0_15px_5px] shadow-primary/40 transition-all duration-300',
        isSelected
          ? 'bg-primary/20 scale-110 shadow-[0_0_25px_10px] shadow-primary/50'
          : 'group-hover:scale-105',
        isPlaying && !isSelected && 'opacity-50'
      )}
    >
      {multiplier}
    </div>
  </button>
);

interface GameArenaProps {
  selectedGate: string | null;
  onGateSelect: (gate: string) => void;
  isPlaying: boolean;
}

export function GameArena({
  selectedGate,
  onGateSelect,
  isPlaying,
}: GameArenaProps) {
  const gates = [
    '1.03x',
    '1.07x',
    '1.12x',
    '1.5x',
    '1.75x',
    '2.0x',
    '2.25x',
    '2.5x',
    '3.0x',
    '3.5x',
    '4.0x',
    '4.5x',
    '5.0x',
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 w-full h-full animate-content-show">
      <div className="w-full flex items-center justify-around relative mb-8">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/20 -translate-y-1/2" />
        <div className="z-10">
          <ChickenIcon
            className={cn(
              'h-20 w-20 sm:h-24 sm:w-24 transition-transform duration-500',
              isPlaying && 'animate-pulse scale-110'
            )}
          />
        </div>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-2xl"
      >
        <CarouselContent className="-ml-1">
          {gates.map((gate, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/3 lg:basis-1/5"
            >
              <MultiplierGate
                multiplier={gate}
                isSelected={selectedGate === gate.replace('x','')}
                onClick={() => onGateSelect(gate.replace('x',''))}
                isPlaying={isPlaying}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="mt-8 text-center text-muted-foreground text-lg font-medium">
        {isPlaying
          ? 'The chicken is on the run!'
          : selectedGate
          ? `Selected gate ${selectedGate}x. Press PLAY!`
          : 'Select a multiplier gate to start.'}
      </p>
    </div>
  );
}