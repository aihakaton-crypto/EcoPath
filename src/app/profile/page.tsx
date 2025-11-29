"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, User, Award, MapPin, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, refreshUser } = useAuth();
  const [trips, setTrips] = useState<any[]>([]);
  const [isLoadingTrips, setIsLoadingTrips] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    
    if (!user) {
      router.push('/login');
      return;
    }

    // Refresh user data from localStorage to get updated points
    refreshUser();

    // Load user trips
    setTimeout(() => {
      setTrips([
        {
          id: 1,
          destination: 'Qəbələ',
          budget: 180,
          days: 3,
          routeType: 'qarışıq',
          difficulty: 'orta',
          transport: 'avto',
          pointsEarned: 50,
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          destination: 'Şəki',
          budget: 200,
          days: 4,
          routeType: 'mədəni',
          difficulty: 'asan',
          transport: 'avtobus',
          pointsEarned: 60,
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]);
      setIsLoadingTrips(false);
    }, 500);
  }, [user, isLoading, router, refreshUser]);

  // Wait for auth to load
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl text-muted-foreground">Yüklənir...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const nextDiscountThreshold = 500;
  const discountPercentage = Math.min(Math.floor((user.points / nextDiscountThreshold) * 20), 20);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            👤 Profil
          </h1>

          {/* User Info Card */}
          <Card className="mb-8 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <CardTitle className="text-3xl mb-2">{user.username}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <Award className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                  <p className="text-3xl font-bold">{user.points}</p>
                  <p className="text-sm text-muted-foreground">Toplam Puan</p>
                </div>
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="text-3xl font-bold">{trips.length}</p>
                  <p className="text-sm text-muted-foreground">Səyahət</p>
                </div>
                <div className="text-center p-4 bg-accent/50 rounded-lg">
                  <span className="text-4xl mx-auto mb-2 block">🎁</span>
                  <p className="text-3xl font-bold">{discountPercentage}%</p>
                  <p className="text-sm text-muted-foreground">Endirim</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Points & Discount System */}
          <Card className="mb-8 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-500">
            <CardHeader>
              <CardTitle className="text-2xl">🏆 Puan Sistemi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Növbəti endirimə qədər:</span>
                  <span className="font-bold">{Math.max(0, nextDiscountThreshold - user.points)} puan</span>
                </div>
                <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all duration-500"
                    style={{ width: `${Math.min((user.points / nextDiscountThreshold) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <p className="font-semibold mb-2">💡 Puan qazanın:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Hər səyahətdə büdcənin 10%-i qədər puan</li>
                  <li>• Hər səyahət günü üçün 10 bonus puan</li>
                  <li>• 500 puan = %20 endirim!</li>
                </ul>
              </div>
              {discountPercentage > 0 && (
                <div className="bg-green-100 border-2 border-green-500 p-4 rounded-lg text-center">
                  <p className="text-xl font-bold text-green-700">
                    🎉 Təbriklər! Növbəti səyahətdə {discountPercentage}% endirimi var!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Trip History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">📍 Səyahət Tarixçəsi</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingTrips ? (
                <p className="text-center text-muted-foreground py-8">Yüklənir...</p>
              ) : trips.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-2xl mb-4">🌍</p>
                  <p className="text-muted-foreground">Hələ səyahətiniz yoxdur</p>
                  <p className="text-muted-foreground">İlk marşrutunuzu yaradın!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {trips.map((trip) => (
                    <div key={trip.id} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-primary">{trip.destination}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(trip.createdAt).toLocaleDateString('az-AZ', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-lg">
                          +{trip.pointsEarned} 🏆
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Büdcə:</span>
                          <span className="font-semibold ml-1">{trip.budget}₼</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Günlər:</span>
                          <span className="font-semibold ml-1">{trip.days}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Nəqliyyat:</span>
                          <span className="font-semibold ml-1 capitalize">{trip.transport}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Çətinlik:</span>
                          <span className="font-semibold ml-1 capitalize">{trip.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}