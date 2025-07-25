'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { cn } from '@/lib/utils';

interface HistoryDialogProps {
  type: 'transaction' | 'bet';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const transactionData = [
  { id: 'TXN728', type: 'Deposit', amount: 500, status: 'Success', date: '2023-10-26' },
  { id: 'TXN729', type: 'Withdrawal', amount: 200, status: 'Pending', date: '2023-10-25' },
  { id: 'TXN730', type: 'Deposit', amount: 1000, status: 'Failed', date: '2023-10-24' },
  { id: 'TXN731', type: 'Deposit', amount: 100, status: 'Success', date: '2023-10-23' },
  { id: 'TXN732', type: 'Withdrawal', amount: 500, status: 'Rejected', date: '2023-10-22' },
];

const betData = [
    { id: 'BET451', bet: 100, multiplier: '2.5x', result: 250, status: 'Win', date: '2023-10-26' },
    { id: 'BET452', bet: 50, multiplier: '0x', result: 0, status: 'Loss', date: '2023-10-25' },
    { id: 'BET453', bet: 200, multiplier: '1.5x', result: 300, status: 'Win', date: '2023-10-24' },
    { id: 'BET454', bet: 1000, multiplier: '5.0x', result: 5000, status: 'Win', date: '2023-10-23' },
];

export function HistoryDialog({ type, open, onOpenChange }: HistoryDialogProps) {
  const isTransaction = type === 'transaction';
  const title = isTransaction ? 'Transaction History' : 'Bet History';
  const description = isTransaction
    ? 'A record of all your deposits and withdrawals.'
    : 'A record of all your past bets.';
  const data = isTransaction ? transactionData : betData;

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'Success':
                return 'default';
            case 'Pending':
                return 'secondary';
            case 'Failed':
            case 'Rejected':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getStatusBadgeClass = (status: string) => {
         switch (status) {
            case 'Success':
                return 'bg-green-500/80 text-primary-foreground';
            case 'Pending':
                return 'bg-yellow-500/80';
            case 'Failed':
            case 'Rejected':
                return 'bg-red-500/80';
            default:
                return '';
        }
    }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-accent">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72 w-full">
          <Table>
            <TableHeader>
              {isTransaction ? (
                 <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
              ) : (
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Bet</TableHead>
                    <TableHead>Multiplier</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
              )}
            </TableHeader>
            <TableBody>
              {isTransaction ? transactionData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>₹{item.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(item.status)} className={cn(getStatusBadgeClass(item.status))}>
                        {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              )) : betData.map((item) => (
                 <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>₹{item.bet.toFixed(2)}</TableCell>
                    <TableCell>{item.multiplier}</TableCell>
                    <TableCell>₹{item.result.toFixed(2)}</TableCell>
                    <TableCell>
                        <Badge variant={item.status === 'Win' ? 'default' : 'destructive'} className={item.status === 'Win' ? 'bg-primary/80 text-primary-foreground' : ''}>
                           {item.status}
                        </Badge>
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
