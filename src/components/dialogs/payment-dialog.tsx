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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Landmark, Loader2, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { cn } from '@/lib/utils';
import { withdrawalRequests, depositRequests } from '@/lib/data';
import Image from 'next/image';

interface PaymentDialogProps {
  type: 'deposit' | 'withdraw';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isAdminWithdraw?: boolean;
  onAdminWithdraw?: (amount: number) => void;
  isOwnerWithdraw?: boolean;
}

export function PaymentDialog({
  type,
  open,
  onOpenChange,
  isAdminWithdraw = false,
  onAdminWithdraw,
  isOwnerWithdraw = false,
}: PaymentDialogProps) {
  const [amount, setAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [activeTab, setActiveTab] = useState('upi');
  const [verificationState, setVerificationState] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const { toast } = useToast();

  const isDeposit = type === 'deposit';
  const isWithdraw = type === 'withdraw';
  const withdrawalFee = isOwnerWithdraw ? 0.02 : isAdminWithdraw ? 0.02 : 0.1; // 2% for Owner & Admin, 10% for User

  const title = isOwnerWithdraw
    ? 'Withdraw Platform Revenue'
    : isAdminWithdraw
    ? 'Withdraw Admin Fees'
    : isWithdraw
    ? 'Withdraw Winnings'
    : 'Deposit Funds';
  
  const description = isOwnerWithdraw
    ? 'Transfer platform revenue to your bank account. A 2% processing fee is applied.'
    : isAdminWithdraw
    ? 'Transfer your collected fees to your bank account. A 2% fee will be sent to the owner as platform revenue.'
    : isWithdraw
    ? 'Withdrawals are subject to admin approval. A 10% processing fee will be applied upon approval. You can only make one withdrawal every 24 hours.'
    : 'Add funds to your account by sending money to the details below, then click "I have sent the payment".';
  
  const buttonText = isDeposit ? 'I have sent the payment' : 'Request Withdrawal';

  const amountNumber = parseFloat(amount);
  const feeAmount =
    isWithdraw && (isAdminWithdraw || isOwnerWithdraw) ? amountNumber * withdrawalFee :
    isWithdraw ? amountNumber * 0.1 : 0;
  const receivedAmount = amountNumber - feeAmount;
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAdminOrOwnerWithdrawal = () => {
    if (verificationState === 'idle') {
      setVerificationState('verifying');
      toast({
        title: 'Verifying UPI ID...',
        description: `Sending a test amount of ₹1 to ${upiId}.`,
      });
      // Simulate API call
      setTimeout(() => {
        // Simulate success or failure
        const success = Math.random() > 0.2; // 80% success rate
        if (success) {
          setVerificationState('verified');
          toast({
            title: 'UPI ID Verified!',
            description: 'Please confirm you have received ₹1. Then you can withdraw the full amount.',
          });
        } else {
          setVerificationState('failed');
           toast({
            title: 'Verification Failed',
            description: 'The UPI ID seems to be invalid. Please check and try again.',
            variant: 'destructive',
          });
        }
      }, 3000);
    } else if (verificationState === 'verified') {
        setIsProcessing(true);
        toast({
            title: 'Processing Withdrawal',
            description: `Sending ₹${amount} to your verified UPI ID. This may take up to 5 minutes.`
        });
        // Simulate transfer
        setTimeout(() => {
            if (onAdminWithdraw) {
              onAdminWithdraw(amountNumber);
            }
            toast({
              title: 'Success!',
              description: `Withdrawal of ₹${amount} initiated successfully.`,
            });
            handleCloseDialog();
        }, 5000);
    }
  }


  const handleAction = () => {
    if (isAdminWithdraw || isOwnerWithdraw) {
      handleAdminOrOwnerWithdrawal();
      return;
    }

    if (isWithdraw) {
      // Check for 24-hour withdrawal limit
      const now = new Date();
      const lastWithdrawal = withdrawalRequests
        .filter(req => req.user === 'Ishaan' && (req.status === 'Approved' || req.status === 'Pending'))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

      if (lastWithdrawal) {
        const lastWithdrawalDate = new Date(lastWithdrawal.date);
        const timeDiff = now.getTime() - lastWithdrawalDate.getTime();
        const hoursDiff = timeDiff / (1000 * 3600);
        
        if (hoursDiff < 24) {
            toast({
            title: 'Withdrawal Limit Reached',
            description: `You can only make one withdrawal every 24 hours. Please try again later.`,
            variant: 'destructive'
          });
          return;
        }
      }
      
        const newRequest = {
            id: `WDR${Math.floor(Math.random() * 9000) + 1000}`,
            userId: 'USR001', // This should be dynamic based on logged in user
            user: 'Ishaan', // This should be dynamic based on logged in user
            amount: amountNumber,
            date: new Date().toISOString().split('T')[0],
            method: activeTab === 'upi' ? 'UPI' : 'Bank',
            details: activeTab === 'upi' ? upiId : `${accountName} - ${accountNumber}`,
            status: 'Pending' as 'Pending'
        };
        withdrawalRequests.push(newRequest);
        
        toast({
          title: 'Request Sent!',
          description: `Your withdrawal request for ₹${amount} has been submitted for approval.`,
        });

    } else { // This is a deposit
        const newDepositRequest = {
            id: `DEP${Math.floor(Math.random() * 9000) + 1000}`,
            userId: 'USR001', // This should be dynamic based on logged in user
            user: 'Ishaan', // This should be dynamic based on logged in user
            amount: amountNumber,
            date: new Date().toISOString().split('T')[0],
            method: activeTab === 'upi' ? 'UPI' : 'Bank',
            status: 'Pending' as 'Pending'
        };
        depositRequests.push(newDepositRequest);
        toast({
          title: 'Deposit Submitted',
          description: `Your deposit of ₹${amount} will be verified by an admin and credited to your account.`,
        });
    }

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
     onOpenChange(false);
    setTimeout(() => {
        setAmount('');
        setUpiId('');
        setAccountName('');
        setAccountNumber('');
        setIfsc('');
        setActiveTab('upi');
        setVerificationState('idle');
        setIsProcessing(false);
    }, 300)
  }
  
  const getAdminButtonState = () => {
    if (!amountNumber || amountNumber <= 0 || (activeTab === 'upi' && !upiId)) {
        return { disabled: true, text: 'Withdraw Now'};
    }
    if (isProcessing) {
        return { disabled: true, text: 'Processing...' };
    }
    switch (verificationState) {
        case 'idle':
            return { disabled: false, text: 'Verify UPI & Withdraw'};
        case 'verifying':
            return { disabled: true, text: 'Verifying...' };
        case 'verified':
            return { disabled: false, text: 'Confirm & Withdraw Full Amount' };
        case 'failed':
            return { disabled: false, text: 'Retry Verification' };
        default:
             return { disabled: true, text: 'Withdraw Now'};
    }
  }

  const isUserWithdrawalButtonDisabled = () => {
    if (!amountNumber || amountNumber <= 0) return true;
    if (activeTab === 'upi' && !upiId) return true;
    if (activeTab === 'bank' && (!accountName || !accountNumber || !ifsc)) return true;
    return false;
  }
  
  const isSuperUserWithdraw = isAdminWithdraw || isOwnerWithdraw;

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[425px] animate-content-show">
        <DialogHeader>
          <DialogTitle className="text-accent">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="upi" className="w-full" onValueChange={setActiveTab}>
           <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upi">
                <CreditCard className="mr-2 h-4 w-4" /> UPI
              </TabsTrigger>
              <TabsTrigger value="bank">
                <Landmark className="mr-2 h-4 w-4" /> Bank
              </TabsTrigger>
            </TabsList>
            
          <div className="space-y-2 py-4">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={(isSuperUserWithdraw && (verificationState === 'verifying' || verificationState === 'verified' || isProcessing))}
            />
          </div>
          {isWithdraw && amountNumber > 0 && (
            <Alert variant="default" className="bg-muted">
              <AlertDescription className="text-sm">
                <div className="flex justify-between">
                  <span>Processing Fee ({withdrawalFee * 100}%):</span>
                  <span className="font-medium text-destructive">
                    - ₹{feeAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-bold mt-1">
                  <span>You will receive:</span>
                  <span className="text-primary">
                    ₹{receivedAmount.toFixed(2)}
                  </span>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <TabsContent value="upi">
            {isDeposit ? (
               <div className="space-y-4 pt-2 text-center">
                   <div className="flex justify-center">
                    <Image src="https://placehold.co/200x200.png?text=Scan+Me" alt="QR Code" width={150} height={150} className="rounded-md" data-ai-hint="QR code"/>
                   </div>
                   <p className="text-sm text-muted-foreground">Scan the QR or use the UPI ID below</p>
                    <div className="flex items-center space-x-2 pt-2">
                      <Input value="chicken.multiplier@fakebank" readOnly className="font-mono text-center"/>
                      <Button type="button" size="icon" onClick={() => handleCopy('chicken.multiplier@fakebank')}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
               </div>
            ) : (
                <div className="space-y-4 pt-2">
                <div className="space-y-2">
                    <Label htmlFor="upi-id">Your UPI ID</Label>
                    <Input 
                        id="upi-id" 
                        placeholder="yourname@bank" 
                        value={upiId} 
                        onChange={(e) => setUpiId(e.target.value)} 
                        disabled={isSuperUserWithdraw && (verificationState === 'verifying' || verificationState === 'verified' || isProcessing)}
                    />
                </div>
                </div>
            )}
          </TabsContent>
          <TabsContent value="bank">
             {isDeposit ? (
                 <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                        <Label>Account Name:</Label>
                        <p className="font-mono p-2 bg-muted rounded-md text-sm">Yaar Tera Badmas</p>
                    </div>
                     <div className="space-y-1">
                        <Label>Account Number:</Label>
                        <p className="font-mono p-2 bg-muted rounded-md text-sm">123456789012</p>
                    </div>
                     <div className="space-y-1">
                        <Label>IFSC Code:</Label>
                        <p className="font-mono p-2 bg-muted rounded-md text-sm">FAKE0001234</p>
                    </div>
                 </div>
             ) : (
                <div className="space-y-4 pt-2">
                <div className="space-y-2">
                    <Label htmlFor="bank-name">Your Account Holder Name</Label>
                    <Input id="bank-name" placeholder="Enter name" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bank-account">Your Account Number</Label>
                    <Input id="bank-account" placeholder="Enter account number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bank-ifsc">Your IFSC Code</Label>
                    <Input id="bank-ifsc" placeholder="Enter IFSC code" value={ifsc} onChange={(e) => setIfsc(e.target.value)} />
                </div>
                </div>
             )}
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button
            type="submit"
            className="w-full"
            size="lg"
            onClick={handleAction}
            disabled={
                isDeposit ? (!amountNumber || amountNumber <= 0) :
                isSuperUserWithdraw ? getAdminButtonState().disabled : 
                isUserWithdrawalButtonDisabled()
            }
          >
             { (isSuperUserWithdraw && (getAdminButtonState().disabled && (verificationState === 'verifying' || isProcessing))) && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
            {isSuperUserWithdraw ? getAdminButtonState().text : buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
