'use client';
import React, { useState } from 'react';
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
  Shield,
  Users,
  CreditCard,
  Settings,
  Bell,
  LogOut,
  Wallet,
  Crown,
  UserPlus,
  Landmark,
  MessageSquare,
} from 'lucide-react';
import { UserPaymentTable } from '../admin/user-payment-table';
import { UserTable } from '../admin/user-table';
import { useRouter } from 'next/navigation';
import { AdminTable } from './admin-table';
import { initialUsers, initialAdmins, Admin } from '@/lib/data';
import { AddAdminDialog } from './add-admin-dialog';
import { PaymentDialog } from '../dialogs/payment-dialog';
import { ChatDialog } from '../dialogs/chat-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useWalletStore } from '@/lib/wallet-store';

export function OwnerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [admins, setAdmins] = useState(initialAdmins);
  const [isAddAdminDialogOpen, setAddAdminDialogOpen] = useState(false);
  const [isWithdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [chattingWithAdmin, setChattingWithAdmin] = useState<Admin | null>(null);
  
  const { ownerWalletBalance, setOwnerWalletBalance } = useWalletStore();


  const handleLogout = () => {
    router.push('/owner/login');
  };

  const handleAdminAdded = (newAdmin: Admin) => {
    setAdmins(prev => [...prev, newAdmin]);
  };
  
  const handleOwnerWithdraw = (amount: number) => {
    // A 2% fee is applied to owner withdrawals, which is deducted from the balance
    const fee = amount * 0.02;
    setOwnerWalletBalance(ownerWalletBalance - (amount + fee));
  };


  return (
    <>
      <div className="flex min-h-screen w-full bg-muted/40">
        <aside className="hidden w-64 flex-col border-r bg-background sm:flex">
          <div className="flex h-16 items-center border-b px-6 gap-2">
             <Crown className="h-6 w-6 text-accent" />
            <h1 className="text-lg font-bold text-accent">Owner Panel</h1>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            <Button
              variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
              className="justify-start gap-2"
              onClick={() => setActiveTab('dashboard')}
            >
              <Crown className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'admins' ? 'secondary' : 'ghost'}
              className="justify-start gap-2"
              onClick={() => setActiveTab('admins')}
            >
              <Shield className="h-4 w-4" />
              Administrators
            </Button>
            <Button
              variant={activeTab === 'users' ? 'secondary' : 'ghost'}
              className="justify-start gap-2 relative"
              onClick={() => setActiveTab('users')}
            >
              <Users className="h-4 w-4" />
              All Users
            </Button>
            <Button
              variant={activeTab === 'payments' ? 'secondary' : 'ghost'}
              className="justify-start gap-2"
              onClick={() => setActiveTab('payments')}
            >
              <CreditCard className="h-4 w-4" />
              All Payments
            </Button>
             <Button
              variant={activeTab === 'chat' ? 'secondary' : 'ghost'}
              className="justify-start gap-2"
              onClick={() => setActiveTab('chat')}
            >
              <MessageSquare className="h-4 w-4" />
              Chat
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
              className="justify-start gap-2"
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-4 w-4" />
              Global Settings
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
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Crown className="h-6 w-6 rounded-full text-accent" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Owner</span>
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
                  <Crown className="mr-2 h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="admins">
                  <Shield className="mr-2 h-4 w-4" />
                  Administrators
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="mr-2 h-4 w-4" />
                  All Users
                </TabsTrigger>
                <TabsTrigger value="payments">
                  <CreditCard className="mr-2 h-4 w-4" />
                  All Payments
                </TabsTrigger>
                 <TabsTrigger value="chat">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Global Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="dashboard">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                   <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-accent">
                        <Wallet className="h-6 w-6" /> Owner Wallet
                      </CardTitle>
                      <CardDescription>
                        Total lifetime revenue of the platform.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">₹{ownerWalletBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
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
                        <Shield className="h-6 w-6" /> Total Admins
                      </CardTitle>
                       <CardDescription>
                        Number of active administrators.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{admins.length}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6" /> Total Users
                      </CardTitle>
                       <CardDescription>
                        Total registered users on the platform.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{initialUsers.length}</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
               <TabsContent value="admins">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Administrator Management</CardTitle>
                        <CardDescription>Add, remove, or manage administrators.</CardDescription>
                    </div>
                     <Button onClick={() => setAddAdminDialogOpen(true)}>
                        <UserPlus className="mr-2 h-4 w-4" /> Add Admin
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <AdminTable admins={admins} setAdmins={setAdmins} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>All User Management</CardTitle>
                     <CardDescription>View and manage all registered users.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserTable unreadMessages={{}} onUserSelect={() => {}}/>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle>All Payment Transactions</CardTitle>
                     <CardDescription>View all transactions across the platform.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserPaymentTable />
                  </CardContent>
                </Card>
              </TabsContent>
                <TabsContent value="chat">
                 <Card>
                  <CardHeader>
                    <CardTitle>Chat with Administrators</CardTitle>
                    <CardDescription>Select an admin from the list below to start a conversation.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      {admins.map(admin => (
                          <Button 
                            key={admin.id} 
                            variant="outline" 
                            className="w-full justify-start gap-4 p-4 h-auto" 
                            onClick={() => setChattingWithAdmin(admin)}
                          >
                              <Avatar>
                                <AvatarImage src={`https://placehold.co/40x40?text=${admin.name[0]}`} data-ai-hint="avatar admin"/>
                                <AvatarFallback>{admin.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                  <p className="font-bold">{admin.name}</p>
                                  <p className="text-sm text-muted-foreground">{admin.email}</p>
                              </div>
                          </Button>
                      ))}
                      {admins.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-8">No administrators found. Add one from the 'Administrators' tab.</p>
                      )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                 <Card>
                  <CardHeader>
                    <CardTitle>Global Settings</CardTitle>
                    <CardDescription>Manage global application settings.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Global settings page is under construction.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
      <AddAdminDialog
        open={isAddAdminDialogOpen}
        onOpenChange={setAddAdminDialogOpen}
        onAdminAdded={handleAdminAdded}
      />
      <PaymentDialog
        type="withdraw"
        open={isWithdrawDialogOpen}
        onOpenChange={setWithdrawDialogOpen}
        onAdminWithdraw={handleOwnerWithdraw}
        isOwnerWithdraw={true}
      />
      {chattingWithAdmin && (
        <ChatDialog
          open={!!chattingWithAdmin}
          onOpenChange={(isOpen) => !isOpen && setChattingWithAdmin(null)}
          userName={chattingWithAdmin.name}
          userAvatar={`https://placehold.co/40x40?text=${chattingWithAdmin.name[0]}`}
          isUserView={false}
          chatWith="user"
        />
      )}
    </>
  );
}
