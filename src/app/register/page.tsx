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

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle registration here
    toast({
      title: 'Registration Successful',
      description: 'You can now log in with your new account.',
    });
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 bg-grid-white/[0.05]">
      <Card className="w-full max-w-sm bg-card/80 backdrop-blur-sm border-primary/20 animate-content-show">
        <CardHeader className="text-center">
           <div className="mx-auto mb-4">
             <ChickenIcon className="h-20 w-20" />
          </div>
          <CardTitle className="text-2xl font-bold text-accent">Create an Account</CardTitle>
          <CardDescription>Join the fun and start playing</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Your Name" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" type="tel" placeholder="Your Mobile Number" required />
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
           <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline text-accent">
                Sign in
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
