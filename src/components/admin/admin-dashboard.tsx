'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Home,
  Users,
  CreditCard,
  Settings,
  Bell,
  User,
  LogOut,
  Wallet,
  Landmark,
  Hourglass,
  MessageSquare,
  Crown,
  ArrowUpCircle,
  ArrowDownCircle,
  History,
} from 'lucide-react';
import { UserPaymentTable } from './user-payment-table';
import { UserTable } from './user-table';
import { useRouter } from 'next/navigation';
import { PaymentDialog } from '../dialogs/payment-dialog';
import { WithdrawalRequestTable } from './withdrawal-request-table';
import { useChatStore } from '@/lib/chat-store';
import { initialUsers as staticUsers } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { ChatDialog } from '../dialogs/chat-dialog';
import { useWalletStore } from '@/lib/wallet-store';
import { DepositRequestTable } from './deposit-request-table';
import { useUserStore } from '@/lib/user-store';

export function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isWithdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [isOwnerChatOpen, setIsOwnerChatOpen] = useState(false);
  
  const { adminWalletBalance, ownerWalletBalance, setAdminWalletBalance, setOwnerWalletBalance } = useWalletStore();
  const { users } = useUserStore();

  const { unreadMessages, listenForUnread, clearUnread } = useChatStore();
  const { toast } = useToast();

  useEffect(() => {
    const userIds = staticUsers.map(user => user.name);
    const unsubscribes = userIds.map(userId => listenForUnread(userId, (userName) => {
        toast({
            title: "New Message",
            description: `You have a new message from ${userName}.`
        })
    }));
    
    return () => {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    };
  }, [listenForUnread, toast]);

  const handleLogout = () => {
    // In a real app, clear authentication token
    router.push('/admin/login');
  };

  const handleAdminWithdraw = (amount: number) => {
    const fee = amount * 0.02;
    setAdminWalletBalance(adminWalletBalance - amount);
    setOwnerWalletBalance(ownerWalletBalance + fee);
  };
  
  const ownerAvatarUrl = "https://placehold.co/40x40?text=O";

  return (
    <>
      <div className="flex min-h-screen w-full bg-muted/40">
        <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
          <div className="flex h-16 items-center border-b px-6">
            <h1 className="text-lg font-bold text-accent">Admin Panel</h1>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            <Button
              variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
              className="justify-start gap-2"
              onClick={() => setActiveTab('dashboard')}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'users' ? 'secondary' : 'ghost'}
              className="justify-start gap-2 relative"
              onClick={() => setActiveTab('users')}
            >
              <Users className="h-4 w-4" />
              Users
              {Object.values(unreadMessages).some(count => count > 0) && (
                 <span className="absolute right-3 top-1/2 -translate-y-1/2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
              )}
            </Button>
            <Button
              variant={activeTab === 'deposit-requests' ? 'secondary' : 'ghost'}
              className="justify-start gap-2"
              onClick={() => setActiveTab('deposit-requests')}
            >
              <ArrowUpCircle className="h-4 w-4" />
              Deposit Requests
            </Button>
             <Button
              variant={activeTab === 'withdrawal-requests' ? 'secondary' : 'ghost'}
              className="justify-start gap-2"
              onClick={() => setActiveTab('withdrawal-requests')}
            >
              <ArrowDownCircle className="h-4 w-4" />
              Withdrawal Requests
            </Button>
            <Button
              variant={activeTab === 'payments' ? 'secondary' : 'ghost'}
              className="justify-start gap-2"
              onClick={() => setActiveTab('payments')}
            >
              <History className="h-4 w-4" />
              All Transactions
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
              className="justify-start gap-2"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>
          <div className="mt-auto p-4">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b bg-background px-6 sm:justify-end">
            <div className="flex items-center gap-4">
               <Button variant="outline" size="sm" onClick={() => setIsOwnerChatOpen(true)}>
                  <Crown className="mr-2 h-4 w-4 text-accent" />
                   Chat with Owner
               </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <User className="h-6 w-6 rounded-full" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Sonic Kuwal</span>
                  <span className="text-xs text-muted-foreground">
                    sonickuwal@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 animate-content-show">
            <Tabs
              defaultValue="dashboard"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-4 flex-wrap h-auto">
                <TabsTrigger value="dashboard">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="users" className="relative">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                   {Object.values(unreadMessages).some(count => count > 0) && (
                    <span className="absolute right-1 top-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                  )}
                </TabsTrigger>
                 <TabsTrigger value="deposit-requests">
                  <ArrowUpCircle className="mr-2 h-4 w-4" />
                  Deposit Requests
                </TabsTrigger>
                 <TabsTrigger value="withdrawal-requests">
                  <ArrowDownCircle className="mr-2 h-4 w-4" />
                  Withdrawal Requests
                </TabsTrigger>
                <TabsTrigger value="payments">
                  <History className="mr-2 h-4 w-4" />
                  All Transactions
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="dashboard">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-accent">
                        <Wallet className="h-6 w-6" /> Admin Wallet
                      </CardTitle>
                      <CardDescription>
                        Total fees collected. A 2% fee is sent to the owner on withdrawal.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">₹{adminWalletBalance.toFixed(2)}</p>
                      <Button
                        className="mt-4 w-full"
                        onClick={() => setWithdrawDialogOpen(true)}
                      >
                        <Landmark className="mr-2 h-4 w-4" /> Withdraw Funds
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6" /> Total Users
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{users.length}</p>
                    </CardContent>
                  </Card>
                   <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-6 w-6" /> Total Transactions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">6</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
               <TabsContent value="deposit-requests">
                <Card>
                  <CardHeader>
                    <CardTitle>Deposit Requests</CardTitle>
                    <CardDescription>Approve or reject pending deposit requests from users.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DepositRequestTable />
                  </CardContent>
                </Card>
              </TabsContent>
               <TabsContent value="withdrawal-requests">
                <Card>
                  <CardHeader>
                    <CardTitle>Withdrawal Requests</CardTitle>
                    <CardDescription>Approve or reject pending withdrawal requests from users.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WithdrawalRequestTable />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UserTable unreadMessages={unreadMessages} onUserSelect={clearUnread}/>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle>All Transactions</CardTitle>
                    <CardDescription>A log of all approved deposits and withdrawals.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserPaymentTable />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                 <Card>
                  <CardHeader>
                    <CardTitle>Admin Settings</CardTitle>
                    <CardDescription>Manage your admin panel settings here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Settings page is under construction.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
      <PaymentDialog
        type="withdraw"
        open={isWithdrawDialogOpen}
        onOpenChange={setWithdrawDialogOpen}
        isAdminWithdraw={true}
        onAdminWithdraw={handleAdminWithdraw}
      />
       <ChatDialog
        open={isOwnerChatOpen}
        onOpenChange={setIsOwnerChatOpen}
        userName={"Owner"}
        userAvatar={ownerAvatarUrl}
        isUserView={false}
        chatWith="owner"
      />
    </>
  );
}
