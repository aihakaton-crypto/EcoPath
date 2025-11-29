"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signup(email, username, password);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Qeydiyyat uğursuz oldu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600')] bg-cover bg-center" />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="text-6xl">🌱</div>
          </div>
          <CardTitle className="text-3xl font-bold">EcoPath – Qeydiyyat</CardTitle>
          <CardDescription className="text-base">
            Yaşıl turizm səyahətinizə başlayın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">İstifadəçi adı</Label>
              <Input
                id="username"
                type="text"
                placeholder="Adınız"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifrə</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">Minimum 6 simvol</p>
            </div>

            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
              {isLoading ? 'Gözləyin...' : 'Qeydiyyatdan keç'}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Artıq hesabınız var?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Daxil olun
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}