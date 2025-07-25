'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface KycDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KycDialog({ open, onOpenChange }: KycDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-accent">KYC Verification</DialogTitle>
          <DialogDescription>
            Please complete your KYC to enable all features, including withdrawals.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name (as per ID)</Label>
            <Input id="full-name" placeholder="Enter your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pan-card">PAN Card Number</Label>
            <Input id="pan-card" placeholder="Enter your PAN number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="id-proof">Upload ID Proof (Aadhaar/Passport)</Label>
            <Input id="id-proof" type="file" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">
            Submit for Verification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
