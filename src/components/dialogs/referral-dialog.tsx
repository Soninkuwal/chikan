'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check } from 'lucide-react';

interface ReferralDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReferralDialog({ open, onOpenChange }: ReferralDialogProps) {
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      // Generate a random referral code
      const code = `CHICKEN${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setReferralCode(code);
    }
  }, [open]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "Your referral code has been copied.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-accent">Refer & Earn</DialogTitle>
          <DialogDescription>
            Share your referral code with friends. They get a bonus on signup, and you get a bonus when they play!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 pt-4">
          <Input value={referralCode} readOnly className="font-mono text-lg" />
          <Button type="button" size="icon" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
