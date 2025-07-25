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

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    
    toast({
      title: 'Password Reset Link Sent',
      description: `If an account with ${email} exists, a password reset link has been sent.`,
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
          <CardTitle className="text-2xl font-bold text-accent">Forgot Password</CardTitle>
          <CardDescription>Enter your email to reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="user@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </form>
           <div className="mt-4 text-center text-sm">
              Remember your password?{' '}
              <Link href="/login" className="underline text-accent">
                Sign in
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
