'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Menu,
  Music,
  Volume2,
  Wallet,
  History,
  UserPlus,
  ShieldCheck,
  Gavel,
  BookOpen,
  LifeBuoy,
  LogOut,
  Landmark,
  LogIn,
  MessageSquare,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PaymentDialog } from '../dialogs/payment-dialog';
import { HistoryDialog } from '../dialogs/history-dialog';
import { ReferralDialog } from '../dialogs/referral-dialog';
import { KycDialog } from '../dialogs/kyc-dialog';
import { InfoDialog } from '../dialogs/info-dialog';
import { useRouter } from 'next/navigation';
import { ChatDialog } from '../dialogs/chat-dialog';

type DialogType =
  | 'deposit'
  | 'withdraw'
  | 'transaction'
  | 'bet'
  | 'refer'
  | 'kyc'
  | 'rules'
  | 'how-to-play'
  | 'support'
  | 'chat'
  | null;

interface SidebarMenuProps {
  musicEnabled: boolean;
  setMusicEnabled: (enabled: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}


export function SidebarMenu({ musicEnabled, setMusicEnabled, soundEnabled, setSoundEnabled }: SidebarMenuProps) {
  const [openDialog, setOpenDialog] = useState<DialogType>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const router = useRouter();
  const userAvatarUrl = "https://placehold.co/100x100?text=I"
  const userName = "Ishaan";

  const handleAdminLogin = () => {
    setIsSheetOpen(false);
    router.push('/admin/login');
  };

  const handleLogout = () => {
    setIsSheetOpen(false);
    // In a real app, this would also clear any authentication tokens.
    router.push('/login');
  }
  
  const menuItems = [
    {
      label: 'Deposit (UPI & Bank)',
      icon: Wallet,
      action: () => setOpenDialog('deposit'),
    },
    {
      label: 'Withdraw (UPI & Bank)',
      icon: Landmark,
      action: () => setOpenDialog('withdraw'),
    },
    {
      label: 'Transaction History',
      icon: History,
      action: () => setOpenDialog('transaction'),
    },
    {
      label: 'Bet History',
      icon: History,
      action: () => setOpenDialog('bet'),
    },
    {
      label: 'Refer Code',
      icon: UserPlus,
      action: () => setOpenDialog('refer'),
    },
    { label: 'KYC', icon: ShieldCheck, action: () => setOpenDialog('kyc') },
  ];

  const infoItems = [
     {
      label: 'Chat with Admin',
      icon: MessageSquare,
      action: () => setOpenDialog('chat'),
    },
    {
      label: 'Game Rules',
      icon: Gavel,
      action: () => setOpenDialog('rules'),
    },
    {
      label: 'How to Play',
      icon: BookOpen,
      action: () => setOpenDialog('how-to-play'),
    },
    { label: 'Support', icon: LifeBuoy, action: () => setOpenDialog('support') },
  ];
  
  const adminItems = [
    {
      label: 'Admin Panel Login',
      icon: LogIn,
      action: handleAdminLogin,
    }
  ];

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6 text-foreground" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[320px] sm:w-[400px] bg-background/80 backdrop-blur-md border-border/50 flex flex-col p-0">
          <SheetHeader className="p-6 pb-2">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={userAvatarUrl} alt={userName} data-ai-hint="avatar user" />
                <AvatarFallback>{userName[0]}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground">{userName}</h2>
                <p className="text-sm text-muted-foreground">
                  sonickuwal@gmail.com
                </p>
                <Button variant="link" className="text-sm h-auto p-0 text-accent">
                  Change Avatar
                </Button>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 px-6">
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="music-switch" className="flex items-center gap-3">
                    <Music className="h-5 w-5" />
                    <span>Music</span>
                  </Label>
                  <Switch id="music-switch" checked={musicEnabled} onCheckedChange={setMusicEnabled} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-switch" className="flex items-center gap-3">
                    <Volume2 className="h-5 w-5" />
                    <span>Sound</span>
                  </Label>
                  <Switch id="sound-switch" checked={soundEnabled} onCheckedChange={setSoundEnabled}/>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start gap-3 text-base"
                    onClick={() => {
                      item.action();
                      setIsSheetOpen(false);
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                {infoItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start gap-3 text-base"
                    onClick={() => {
                      item.action();
                      setIsSheetOpen(false);
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                {adminItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start gap-3 text-base"
                    onClick={item.action}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          </ScrollArea>

          <div className="p-6 pt-2 mt-auto">
            <Button variant="destructive" className="w-full text-base" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Powered by <span className="text-accent font-bold">yaar tera badmas hai jaanu</span>
            </p>
          </div>
        </SheetContent>
      </Sheet>

      <PaymentDialog
        type="deposit"
        open={openDialog === 'deposit'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
      />
      <PaymentDialog
        type="withdraw"
        open={openDialog === 'withdraw'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
      />
      <HistoryDialog
        type="transaction"
        open={openDialog === 'transaction'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
      />
      <HistoryDialog
        type="bet"
        open={openDialog === 'bet'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
      />
      <ReferralDialog
        open={openDialog === 'refer'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
      />
      <KycDialog
        open={openDialog === 'kyc'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
      />
      <InfoDialog
        title="Game Rules"
        open={openDialog === 'rules'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
      >
        <p>1. Place your bet before the round starts.</p>
        <p>2. The chicken will walk through gates with multipliers.</p>
        <p>3. Your winnings are your bet amount multiplied by the final gate's multiplier.</p>
        <p>4. Higher difficulty means higher potential multipliers but also higher risk.</p>
      </InfoDialog>
       <InfoDialog
        title="How to Play"
        open={openDialog === 'how-to-play'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
      >
        <p>Select your bet amount from the options. Choose a difficulty level. Press 'Play' to start the game. Watch the chicken and win big!</p>
      </InfoDialog>
       <InfoDialog
        title="Support"
        open={openDialog === 'support'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
      >
        <p>For any issues or inquiries, please contact our support team at support@chickenmultiplier.com or call us at +91-1234567890.</p>
      </InfoDialog>
      <ChatDialog
        open={openDialog === 'chat'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
        userName={userName}
        userAvatar={userAvatarUrl}
        isUserView={true}
       />
    </>
  );
}
