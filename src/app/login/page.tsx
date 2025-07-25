'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ChickenIcon } from '@/components/icons/chicken-icon';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle authentication here
    toast({
      title: 'Login Successful',
      description: 'Welcome back!',
    });
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 bg-grid-white/[0.05]">
      <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm border-primary/20 animate-content-show">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
             <ChickenIcon className="h-20 w-20" />
          </div>
          <CardTitle className="text-2xl font-bold text-accent">User Login</CardTitle>
          <CardDescription>Enter your credentials to play</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                 <Link
                  href="/forgot-password"
                  className="text-xs text-accent underline-offset-4 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
           <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="underline text-accent">
                Sign up
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
