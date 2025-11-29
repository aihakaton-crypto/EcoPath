"use client";

import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Emil Mədətov',
      role: 'Full-Stack Developer',
      image: 'https://web.whatsapp.com/045553ce-d6ac-43ab-938b-e498810e0cea',
      description: 'AI və backend sistemlər üzrə mütəxəssis'
    },
    {
      name: 'Nurlan Rəhimli',
      role: 'Frontend Developer',
      image: 'https://web.whatsapp.com/7cf4f289-a20c-4607-861c-a595e2d4bbe8',
      description: 'UI/UX dizayn və React inkişafı'
    },
    {
      name: 'Ömər Gədirli',
      role: 'Data Scientist',
      image: 'https://web.whatsapp.com/e5ac2686-06e1-4f9e-9f1c-de66a5307955',
      description: 'Karbon izi hesablamaları və data analitika'
    }
  ];

  const technologies = [
    { icon: '⚛️', name: 'React & Next.js', description: 'Modern web framework' },
    { icon: '📘', name: 'TypeScript', description: 'Type-safe development' },
    { icon: '🤖', name: 'OpenAI API', description: 'AI marşrut generatoru' },
    { icon: '🔥', name: 'Supabase', description: 'Backend və database' },
    { icon: '⚡', name: 'Vite', description: 'Fast build tool' },
    { icon: '🎨', name: 'Tailwind CSS', description: 'Modern styling' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 text-primary">
              ℹ️ Haqqımızda
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              EcoPath — Azərbaycanda yaşıl turizmi inkişaf etdirən, AI texnologiyası ilə 
              davamlı səyahət təcrübəsi təklif edən innovativ platformadır.
            </p>
          </div>

          {/* Mission Card */}
          <Card className="mb-12 shadow-xl bg-gradient-to-r from-green-100 to-blue-100">
            <CardHeader>
              <CardTitle className="text-3xl text-center">🎯 Missiyamız</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg">
                Biz Azərbaycanın təbii gözəlliklərini və zəngin mədəni irsini 
                qoruyaraq, ekoloji cəhətdən məsul turizmi təşviq edirik.
              </p>
              <p className="text-lg">
                Süni intellekt vasitəsilə hər kəsə öz büdcəsinə və maraq sahələrinə 
                uyğun mükəmməl marşrut yaratmağa kömək edirik.
              </p>
            </CardContent>
          </Card>

          {/* Team Section */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-center mb-8">👥 Komandamız</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="text-primary font-semibold">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Technologies Section */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-center mb-8">⚙️ İstifadə Olunan Texnologiyalar</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {technologies.map((tech, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="text-5xl mb-2 text-center">{tech.icon}</div>
                    <CardTitle className="text-xl text-center">{tech.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{tech.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features */}
          <Card className="mb-12 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-center">✨ Nə təklif edirik?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🤖</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI Marşrut Generatoru</h3>
                  <p className="text-muted-foreground">
                    Süni intellekt vasitəsilə sizin üçün ən uyğun marşrutu yaradırıq
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🌱</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Karbon İzi Hesablama</h3>
                  <p className="text-muted-foreground">
                    Səyahətinizin ətraf mühitə təsirini ölçür və daha yaşıl seçimlər təklif edirik
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎭</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Mədəniyyət və Təbiət</h3>
                  <p className="text-muted-foreground">
                    Azərbaycanın tarixi və təbii gözəllikləri haqqında ətraflı məlumat
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🏆</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Puan Sistemi</h3>
                  <p className="text-muted-foreground">
                    Hər səyahətdə puan qazanın və növbəti səfərlərdə endirimdən yararlanın
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="shadow-xl bg-gradient-to-r from-blue-100 to-green-100">
            <CardHeader>
              <CardTitle className="text-3xl text-center">📧 Bizimlə Əlaqə</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg">
                Suallarınız və ya təklifləriniz varsa, bizimlə əlaqə saxlayın:
              </p>
              <a 
                href="mailto:ai.hakaton@gmail.com"
                className="inline-flex items-center gap-2 text-xl font-semibold text-primary hover:underline"
              >
                <Mail className="w-6 h-6" />
                ai.hakaton@gmail.com
              </a>
              <p className="text-muted-foreground">
                Biz 24 saat ərzində cavab veririk
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 EcoPath. Bütün hüquqlar qorunur.</p>
        </div>
      </footer>
    </div>
  );
}