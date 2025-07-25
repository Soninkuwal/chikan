'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import { User, withdrawalRequests } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { Banknote, CreditCard, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { ChatDialog } from './chat-dialog';


interface UserDetailsDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserDetailsDialog({ user, open, onOpenChange }: UserDetailsDialogProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const userWithdrawalRequests = withdrawalRequests.filter(req => req.user === user.name);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case 'Approved':
        case 'Success':
            return 'bg-green-500/80 text-primary-foreground';
        case 'Pending':
            return 'bg-yellow-500/80';
        case 'Rejected':
            return 'bg-red-500/80';
        default:
            return '';
    }
  }

  const userAvatarUrl = `https://placehold.co/40x40?text=${user.name[0]}`;

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-accent flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src={userAvatarUrl} data-ai-hint="avatar user"/>
                <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
                {user.name}
                <DialogDescription>{user.email}</DialogDescription>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            <Card>
                <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className="text-2xl font-bold">₹{user.balance.toFixed(2)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={user.status === 'Active' ? 'default' : 'destructive'} className={cn(user.status === 'Active' ? 'bg-green-500/80' : '', 'text-lg')}>
                        {user.status}
                    </Badge>
                </CardContent>
            </Card>
             <Card>
                <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">KYC</p>
                    <Badge variant={user.kyc === 'Verified' ? 'default' : 'secondary'} className={cn(user.kyc === 'Verified' ? 'bg-primary/80' : 'bg-yellow-500/80', 'text-lg')}>
                        {user.kyc}
                    </Badge>
                </CardContent>
            </Card>
        </div>


        <h3 className="font-bold text-lg text-foreground mb-2">Withdrawal History</h3>
        <ScrollArea className="h-60 w-full border rounded-md">
          {userWithdrawalRequests.length > 0 ? (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Request ID</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Details</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {userWithdrawalRequests.map((request) => (
                    <TableRow key={request.id}>
                        <TableCell className="font-mono text-xs">{request.id}</TableCell>
                        <TableCell className="font-medium">₹{request.amount.toFixed(2)}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                               {request.method === 'UPI' ? <CreditCard className="h-5 w-5 text-muted-foreground"/> : <Banknote className="h-5 w-5 text-muted-foreground"/>}
                               <div>
                                    <p className="font-bold">{request.method}</p>
                                    <p className="text-xs text-muted-foreground">{request.details}</p>
                               </div>
                            </div>
                        </TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>
                            <Badge variant='default' className={cn(getStatusBadgeClass(request.status))}>
                                {request.status}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            ) : (
                <p className="text-center text-muted-foreground p-8">No withdrawal requests found for this user.</p>
            )}
        </ScrollArea>
        <DialogFooter>
            <Button variant="outline" onClick={() => setIsChatOpen(true)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with User
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <ChatDialog 
        open={isChatOpen}
        onOpenChange={setIsChatOpen}
        userName={user.name}
        userAvatar={userAvatarUrl}
        isUserView={false}
    />
    </>
  );
}
