'use client';
import React, { useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { Admin, initialAdmins } from '@/lib/data';

interface AddAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdminAdded: (newAdmin: Admin) => void;
}

export function AddAdminDialog({ open, onOpenChange, onAdminAdded }: AddAdminDialogProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
             toast({
                title: "Missing Fields",
                description: "Please fill out all fields.",
                variant: 'destructive',
            });
            return;
        }

        const newAdmin: Admin = {
            id: `ADM${Math.floor(Math.random() * 900) + 100}`,
            name,
            email,
            walletBalance: 0,
            status: 'Active',
            joined: new Date().toISOString().split('T')[0],
            permissions: ['Manage Users', 'Manage Payments']
        };

        onAdminAdded(newAdmin);
        toast({
            title: "Admin Added",
            description: `${name} has been added as a new administrator.`,
        });
        onOpenChange(false);
        setName('');
        setEmail('');
        setPassword('');
    };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-accent">Add New Administrator</DialogTitle>
          <DialogDescription>
            Create a new admin account with specified permissions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="Enter admin's full name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="admin@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a strong password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            </div>
            <DialogFooter>
            <Button type="submit" className="w-full">
                Create Admin
            </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
