'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ChickenIcon } from '@/components/icons/chicken-icon';
import { Crown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = () => {
    if (email === 'sonickuwal@gmail.com' && password === 'kuwal@123456') {
      // In a real app, you'd set a token in cookies or local storage
      router.push('/admin');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password.',
        variant: 'destructive',
      });
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: 'Password Reset',
      description: 'A password reset link has been sent to sonickuwal@gmail.com.',
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 bg-grid-white/[0.05]">
      <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm border-primary/20 animate-content-show">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
             <ChickenIcon className="h-20 w-20" />
          </div>
          <CardTitle className="text-2xl font-bold text-accent">Admin Login</CardTitle>
          <CardDescription>Welcome to the Chicken Multiplier Admin Panel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button
                variant="link"
                className="h-auto px-0 text-xs"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleLogin} className="w-full">
            Sign In
          </Button>
          <Separator className="my-4" />
          <Button variant="outline" className="w-full" onClick={() => router.push('/owner/login')}>
            <Crown className="mr-2 h-4 w-4" />
            Owner Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
