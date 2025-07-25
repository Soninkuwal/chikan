'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface InfoDialogProps {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function InfoDialog({ title, open, onOpenChange, children }: InfoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-accent">{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-2 text-sm text-muted-foreground">
            {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
