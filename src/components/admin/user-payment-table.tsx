'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { transactions } from '@/lib/data';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UserPaymentTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction ID</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.id}</TableCell>
            <TableCell>{transaction.user}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {transaction.type === 'Deposit' ? 
                  <ArrowUpCircle className="h-4 w-4 text-green-500" /> : 
                  <ArrowDownCircle className="h-4 w-4 text-red-500" />
                }
                {transaction.type}
              </div>
            </TableCell>
            <TableCell>₹{transaction.amount.toFixed(2)}</TableCell>
            <TableCell>
              <Badge variant={transaction.status === 'Success' ? 'default' : 'destructive'} className={cn(transaction.status === 'Success' ? 'bg-primary/80' : '')}>
                {transaction.status}
              </Badge>
            </TableCell>
            <TableCell>{transaction.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
