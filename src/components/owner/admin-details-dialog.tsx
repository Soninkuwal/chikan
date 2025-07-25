'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '../ui/badge';
import { Admin } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { Shield, Calendar, CheckCircle, Wallet } from 'lucide-react';
import { Button } from '../ui/button';

interface AdminDetailsDialogProps {
  admin: Admin;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminDetailsDialog({ admin, open, onOpenChange }: AdminDetailsDialogProps) {
  const adminAvatarUrl = `https://placehold.co/40x40?text=${admin.name[0]}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-accent flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src={adminAvatarUrl} data-ai-hint="avatar admin"/>
                <AvatarFallback>{admin.name[0]}</AvatarFallback>
            </Avatar>
            <div>
                {admin.name}
                <DialogDescription>{admin.email}</DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
             <Card>
                <CardContent className="pt-6 flex items-center gap-4">
                    <Wallet className="h-8 w-8 text-muted-foreground" />
                    <div>
                        <p className="text-sm text-muted-foreground">Wallet Balance</p>
                        <p className="text-lg font-bold">₹{admin.walletBalance.toFixed(2)}</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="pt-6 flex items-center gap-4">
                    <CheckCircle className="h-8 w-8 text-muted-foreground" />
                    <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <Badge variant={admin.status === 'Active' ? 'default' : 'destructive'} className={cn(admin.status === 'Active' ? 'bg-green-500/80' : '', 'text-md')}>
                            {admin.status}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardContent className="pt-6 flex items-center gap-4">
                     <Calendar className="h-8 w-8 text-muted-foreground" />
                    <div>
                        <p className="text-sm text-muted-foreground">Joined Date</p>
                        <p className="text-lg font-bold">{admin.joined}</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <h3 className="font-bold text-lg text-foreground mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5" /> Permissions
        </h3>
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                    {admin.permissions.map(permission => (
                        <Badge key={permission} variant="secondary" className="text-sm py-1 px-3">
                            {permission}
                        </Badge>
                    ))}
                </div>
                 {admin.permissions.length === 0 && (
                    <p className="text-sm text-muted-foreground">This admin has no permissions assigned.</p>
                )}
            </CardContent>
        </Card>

        <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
