"use client";

import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-green-50" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600')] bg-cover bg-center opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
            🌍 EcoPath — Azərbaycanda<br />Yaşıl Turizmin Yeni Üzü
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/80 max-w-3xl mx-auto">
            AI ilə marşrut yaradın + Karbon izini hesablayın + Mədəniyyət və təbiət haqqında məlumat əldə edin
          </p>
          <Link href={user ? "/route-generator" : "/signup"}>
            <Button size="lg" className="text-xl px-12 py-6 h-auto">
              🧭 Marşrut Yarat
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Xüsusiyyətlərimiz</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">🤖</div>
                <CardTitle className="text-2xl">AI Marşrut Generatoru</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Süni intellekt vasitəsilə büdcənizə, maraq sahələrinizə və müddətinizə uyğun mükəmməl marşrut yaradın
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">🌱</div>
                <CardTitle className="text-2xl">Karbon İzi Kalkulyatoru</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Səyahətinizin ətraf mühitə təsirini ölçün və daha yaşıl seçimlər edin
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="text-5xl mb-4">🎭</div>
                <CardTitle className="text-2xl">Mədəniyyət + Təbiət</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Azərbaycanın zəngin mədəniyyəti və təbiət gözəllikləri haqqında ətraflı məlumat əldə edin
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
              Haqqımızda
            </Link>
            <Link href="/statistics" className="text-muted-foreground hover:text-primary transition-colors">
              Statistika
            </Link>
            <a href="mailto:ai.hakaton@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              Əlaqə
            </a>
          </div>
          <div className="text-center text-muted-foreground">
            © 2025 EcoPath. Bütün hüquqlar qorunur.
          </div>
        </div>
      </footer>
    </div>
  );
}