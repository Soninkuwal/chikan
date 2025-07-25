'use client';
import React, { useState } from 'react';
import { SidebarMenu } from './sidebar-menu';
import { Wallet, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaymentDialog } from '../dialogs/payment-dialog';

interface GameHeaderProps {
  balance: number;
}

export function GameHeader({ balance }: GameHeaderProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'deposit' | 'withdraw'>('deposit');

  const handleDeposit = () => {
    setDialogType('deposit');
    setDialogOpen(true);
  };

  const handleWithdraw = () => {
    setDialogType('withdraw');
    setDialogOpen(true);
  };
  return (
    <>
      <header className="container mx-auto p-4 flex items-center justify-between bg-transparent">
        <h1 className="text-2xl lg:text-3xl font-bold text-accent font-headline tracking-wider">
          Chicken Multiplier
        </h1>
        <div className="flex items-center gap-4">
          <div className="items-center gap-2 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 hidden sm:flex">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-foreground">
              ₹{balance.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleDeposit} size="sm">
              Deposit
            </Button>
            <Button onClick={handleWithdraw} size="sm" variant="outline">
              Withdraw
            </Button>
          </div>
          {/* This is a placeholder, the actual SidebarMenu is rendered in page.tsx to control audio */}
          <div className="md:hidden">
             <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-foreground" />
            </Button>
          </div>
        </div>
      </header>
      <PaymentDialog
        type={dialogType}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
