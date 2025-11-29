"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogOut, BarChart3 } from 'lucide-react';

export default function Navigation() {
  const { user, logout, refreshUser } = useAuth();

  // Refresh user data when navigation mounts to show updated points
  useEffect(() => {
    if (user) {
      refreshUser();
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🌍</span>
            <span className="text-2xl font-bold text-primary">EcoPath</span>
          </Link>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link href="/route-generator">
                  <Button variant="ghost" className="text-base">
                    🧭 Marşrut Yarat
                  </Button>
                </Link>
                <Link href="/statistics">
                  <Button variant="ghost" className="text-base">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Statistika
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="ghost" className="text-base">
                    ℹ️ Haqqımızda
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="gap-2">
                    <User className="w-4 h-4" />
                    {user.username}
                    <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                      {user.points} 🏆
                    </span>
                  </Button>
                </Link>
                <Button onClick={logout} variant="ghost" size="icon">
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/about">
                  <Button variant="ghost" className="text-base">
                    ℹ️ Haqqımızda
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline">Daxil ol</Button>
                </Link>
                <Link href="/signup">
                  <Button>Qeydiyyat</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}