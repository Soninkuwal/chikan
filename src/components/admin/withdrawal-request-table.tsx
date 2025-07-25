'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { withdrawalRequests as initialRequestsData, transactions } from '@/lib/data';
import { useUserStore } from '@/lib/user-store';


export function WithdrawalRequestTable() {
    const [requests, setRequests] = useState(initialRequestsData.filter(r => r.status === 'Pending'));
    const { toast } = useToast();
    const { debitUser } = useUserStore();

    const handleRequest = (id: string, status: 'Approved' | 'Rejected') => {
        const requestToUpdate = requests.find(r => r.id === id);
        if (!requestToUpdate) return;
        
        if (status === 'Approved') {
            debitUser(requestToUpdate.userId, requestToUpdate.amount);
            transactions.push({
                id: `TXN${Math.floor(Math.random() * 9000) + 1000}`,
                userId: requestToUpdate.userId,
                user: requestToUpdate.user,
                type: 'Withdrawal',
                amount: requestToUpdate.amount,
                date: new Date().toISOString().split('T')[0],
                status: 'Success'
            });
        }
        
        // This is a mock update. In a real app, this would be an API call.
        const originalRequest = initialRequestsData.find(r => r.id === id);
        if(originalRequest) {
            originalRequest.status = status;
        }

        setRequests(requests.filter(req => req.id !== id));

        toast({
            title: `Request ${status}`,
            description: `Withdrawal request ${id} has been ${status}.`,
            variant: status === 'Rejected' ? 'destructive' : 'default',
        });
    };

    if (requests.length === 0) {
        return <p className="text-center text-muted-foreground p-8">No pending withdrawal requests.</p>
    }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Request ID</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>{request.id}</TableCell>
            <TableCell>{request.user}</TableCell>
            <TableCell>₹{request.amount.toFixed(2)}</TableCell>
            <TableCell>
                 <Badge variant="secondary">{request.method}</Badge>
            </TableCell>
            <TableCell>{request.details}</TableCell>
            <TableCell>{request.date}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-600" onClick={() => handleRequest(request.id, 'Approved')}>
                <Check className="h-4 w-4" />
              </Button>
               <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleRequest(request.id, 'Rejected')}>
                <X className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
