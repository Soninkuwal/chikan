'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Trophy, Users } from 'lucide-react';

interface PlayerInfoProps {
  balance: number;
}

export function PlayerInfo({ balance }: PlayerInfoProps) {
    const [onlinePlayers, setOnlinePlayers] = useState(18385);

    useEffect(() => {
        const interval = setInterval(() => {
        setOnlinePlayers(prev => {
            const change = Math.floor(Math.random() * 21) - 10; // Random change between -10 and 10
            const newCount = prev + change;
            return newCount > 15000 ? newCount : 15000 + Math.floor(Math.random() * 100); // Ensure it stays above a base and feels random
        });
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10 animate-content-show">
      <CardHeader>
        <CardTitle className="text-accent font-headline text-center text-2xl">
          Player Zone
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-accent" />
          <div>
            <p className="text-xs text-muted-foreground">Player</p>
            <p className="text-md font-bold text-foreground">Ishaan</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Trophy className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Balance</p>
            <p className="text-md font-bold text-primary">₹{balance.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-accent" />
          <div>
            <p className="text-xs text-muted-foreground">Players Online</p>
            <p className="text-md font-bold text-foreground">{onlinePlayers.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
