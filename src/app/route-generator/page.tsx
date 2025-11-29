"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function RouteGeneratorPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [budget, setBudget] = useState([500]);
  const [days, setDays] = useState("3");
  const [routeType, setRouteType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [transport, setTransport] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

  // Redirect to login only after loading is complete
  if (!user) {
    router.push('/login');
    return null;
  }

  const handleGenerate = async () => {
    if (!routeType || !difficulty || !transport) {
      alert('Zəhmət olmasa bütün sahələri doldurun');
      return;
    }

    setIsGenerating(true);
    
    // Simulate route generation
    setTimeout(() => {
      const params = new URLSearchParams({
        budget: budget[0].toString(),
        days,
        routeType,
        difficulty,
        transport,
      });
      router.push(`/route-result?${params.toString()}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">
          🧭 Marşrut Yaradın
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Marşrut Parametrləri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Budget Slider */}
              <div className="space-y-3">
                <Label className="text-base">Büdcə: {budget[0]}₼</Label>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  min={100}
                  max={3000}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>100₼</span>
                  <span>3000₼</span>
                </div>
              </div>

              {/* Days */}
              <div className="space-y-2">
                <Label className="text-base">Gün sayı</Label>
                <Select value={days} onValueChange={setDays}>
                  <SelectTrigger>
                    <SelectValue placeholder="Günləri seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day} gün
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Route Type */}
              <div className="space-y-2">
                <Label className="text-base">Marşrut növü</Label>
                <Select value={routeType} onValueChange={setRouteType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Növü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ekoloji">🌱 Ekoloji</SelectItem>
                    <SelectItem value="medeni">🎭 Mədəni</SelectItem>
                    <SelectItem value="qarisiq">🔀 Qarışıq</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <Label className="text-base">Çətinlik dərəcəsi</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Çətinliyi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asan">😊 Asan</SelectItem>
                    <SelectItem value="orta">💪 Orta</SelectItem>
                    <SelectItem value="cetin">🔥 Çətin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Transport */}
              <div className="space-y-2">
                <Label className="text-base">Nəqliyyat növü</Label>
                <Select value={transport} onValueChange={setTransport}>
                  <SelectTrigger>
                    <SelectValue placeholder="Nəqliyyatı seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="piyada">🚶 Piyada</SelectItem>
                    <SelectItem value="velosiped">🚴 Velosiped</SelectItem>
                    <SelectItem value="avto">🚗 Avto</SelectItem>
                    <SelectItem value="avtobus">🚌 Avtobus</SelectItem>
                    <SelectItem value="gemi">⛴️ Gəmi</SelectItem>
                    <SelectItem value="teyyare">✈️ Təyyarə</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerate} 
                className="w-full text-lg py-6" 
                disabled={isGenerating}
              >
                {isGenerating ? 'Yaradılır...' : '🎯 Marşrut Yarat'}
              </Button>
            </CardContent>
          </Card>

          {/* Map Preview */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">🗺️ Xəritə</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800')] bg-cover bg-center opacity-30" />
                <div className="relative z-10 text-center p-8">
                  <div className="text-6xl mb-4">🇦🇿</div>
                  <p className="text-xl font-semibold text-primary">Azərbaycan</p>
                  <p className="text-muted-foreground mt-2">Parametrləri seçin və marşrutunuzu yaradın</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}