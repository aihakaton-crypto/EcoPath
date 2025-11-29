"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Download, MapPin, DollarSign, Cloud, Mountain } from 'lucide-react';

// Azerbaijan destinations based on transport type
const destinations = {
  gemi: ['Xəzər sahili', 'Bakı Körfəzi', 'Abşeron sahili'],
  teyyare: {
    short: ['Naxçıvan', 'Gəncə'],
    long: ['İstanbul', 'Dubai', 'Moskva', 'Paris', 'London', 'Berlin']
  },
  default: ['Quba', 'Şəki', 'Qəbələ', 'Şamaxı', 'İsmayıllı', 'Lənkəran', 'Qax', 'Şuşa', 'Göygöl', 'Xınalıq']
};

export default function RouteResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const budget = searchParams.get('budget') || '500';
  const days = parseInt(searchParams.get('days') || '3');
  const routeType = searchParams.get('routeType') || 'qarışıq';
  const difficulty = searchParams.get('difficulty') || 'orta';
  const transport = searchParams.get('transport') || 'avto';

  // Generate destination based on transport
  const getDestination = () => {
    if (transport === 'gemi') {
      return destinations.gemi[Math.floor(Math.random() * destinations.gemi.length)];
    } else if (transport === 'teyyare') {
      // Təyyarə seçimi günə görə
      if (days <= 3) {
        // Qısa səyahət - Naxçıvan və Gəncə
        return destinations.teyyare.short[Math.floor(Math.random() * destinations.teyyare.short.length)];
      } else {
        // Uzun səyahət - Xarici ölkələr
        return destinations.teyyare.long[Math.floor(Math.random() * destinations.teyyare.long.length)];
      }
    } else {
      return destinations.default[Math.floor(Math.random() * destinations.default.length)];
    }
  };

  const destination = getDestination();

  // Calculate stats with variation
  const distance = transport === 'teyyare' ? `${Math.floor(Math.random() * 200 + 400)}km` :
                   transport === 'gemi' ? `${Math.floor(Math.random() * 50 + 20)}km` :
                   `${Math.floor(Math.random() * 300 + 100)}km`;
  
  const co2 = transport === 'teyyare' ? `${Math.floor(Math.random() * 30 + 80)}kg` :
              transport === 'gemi' ? `${Math.floor(Math.random() * 15 + 10)}kg` :
              transport === 'avtobus' ? `${Math.floor(Math.random() * 20 + 25)}kg` :
              `${Math.floor(Math.random() * 25 + 20)}kg`;
  
  const points = Math.floor(parseInt(budget) / 10) + (days * 10);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Update user points in localStorage
    const updatedUser = {
      ...user,
      points: user.points + points
    };
    localStorage.setItem('ecopath_user', JSON.stringify(updatedUser));

    // Load sample comments
    setTimeout(() => {
      setComments([
        {
          id: 1,
          username: 'Nurlan',
          comment: 'Bu marşrut əladır! Təbiət çox gözəl idi və hava təmiz. Tövsiyə edirəm.',
          rating: 5,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          username: 'Ömər Gədirli',
          comment: 'Ailə ilə getdik, hamımız çox xoşhal qaldıq. Təşəkkür edirik!',
          rating: 5,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]);
      setIsLoadingComments(false);
    }, 500);
  }, [user, router, points]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      username: user?.username || 'Anonim',
      comment: newComment,
      rating,
      createdAt: new Date().toISOString()
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const downloadPDF = () => {
    alert('PDF yüklənir... (Demo funksiya)');
  };

  const dayActivities = [
    {
      day: 1,
      title: `${destination} - Giriş və ilk tanışlıq`,
      description: `Yerli mehmanxanaya yerləşmə və ətraflı gəzinti. Tarixi mərkəzi ziyarət edək və milli yeməkləri dadsınaq.`,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800'
    },
    {
      day: 2,
      title: 'Təbiət və mədəniyyət',
      description: 'Dağ gözəlliklərini kəşf edək, yerli muzeyləri ziyarət edək və xalq sənətkarları ilə tanış olaq.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    },
    {
      day: 3,
      title: 'Ekskursiyalar və alış-veriş',
      description: 'Yerli bazarlarda alış-veriş edək, milli suvenirler alaq və gözəl xatirələrlə qayıdaq.',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            🎯 Marşrutunuz Hazırdır!
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{distance}</p>
                <p className="text-sm text-muted-foreground">Məsafə</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-secondary" />
                <p className="text-2xl font-bold">{budget}₼</p>
                <p className="text-sm text-muted-foreground">Büdcə</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Cloud className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">{co2}</p>
                <p className="text-sm text-muted-foreground">CO₂ İzi</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Mountain className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold capitalize">{difficulty}</p>
                <p className="text-sm text-muted-foreground">Çətinlik</p>
              </CardContent>
            </Card>
          </div>

          {/* Points Earned */}
          <Card className="mb-8 bg-gradient-to-r from-green-100 to-blue-100 border-2 border-primary">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold mb-2">🏆 +{points} Puan Qazandınız!</p>
              <p className="text-muted-foreground">Növbəti səyahətdə endirimdən yararlanın</p>
            </CardContent>
          </Card>

          {/* Google Maps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">🗺️ Marşrut Xəritəsi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=Bakı,Azerbaijan&destination=${encodeURIComponent(destination)}&mode=${transport === 'piyada' ? 'walking' : transport === 'velosiped' ? 'bicycling' : 'driving'}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-4 flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold">Başlanğıc</p>
                    <p className="text-sm text-muted-foreground">Bakı</p>
                  </div>
                </div>
                <div className="text-2xl">→</div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="font-semibold">Son nöqtə</p>
                    <p className="text-sm text-muted-foreground">{destination}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day by Day Itinerary */}
          <h2 className="text-3xl font-bold mb-6">📅 Gün-gün Proqram</h2>
          <div className="space-y-6 mb-8">
            {dayActivities.slice(0, days).map((activity) => (
              <Card key={activity.day} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={activity.image} 
                      alt={activity.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-2xl font-bold mb-2">
                      Gün {activity.day}: {activity.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Budget Recommendations */}
          <Card className="mb-8 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl">💰 Büdcəyə Uyğun Tövsiyələr</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>✅ Mehmanxana: {Math.floor(parseInt(budget) * 0.4)}₼ / gecə</p>
              <p>✅ Yemək: {Math.floor(parseInt(budget) * 0.3)}₼ / gün</p>
              <p>✅ Gəzinti və əyləncə: {Math.floor(parseInt(budget) * 0.2)}₼</p>
              <p>✅ Nəqliyyat: {Math.floor(parseInt(budget) * 0.1)}₼</p>
            </CardContent>
          </Card>

          {/* Download PDF */}
          <div className="text-center mb-8">
            <Button onClick={downloadPDF} size="lg" className="text-lg px-8">
              <Download className="w-5 h-5 mr-2" />
              📄 PDF kimi yüklə
            </Button>
          </div>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">💬 Rəylər və Təkliflər</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Comment */}
              <div className="space-y-4 p-4 bg-accent/50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium mb-2">Rəyinizi yazın</label>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Səyahətiniz haqqında fikirlərinizi paylaşın..."
                    rows={3}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Qiymət: {rating} ⭐</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      className="w-32"
                    />
                  </div>
                  <Button onClick={handleAddComment} className="ml-auto">
                    Rəy əlavə et
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              {isLoadingComments ? (
                <p className="text-center text-muted-foreground">Yüklənir...</p>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{comment.username}</span>
                        <span className="text-yellow-500">{'⭐'.repeat(comment.rating)}</span>
                      </div>
                      <p className="text-muted-foreground mb-2">{comment.comment}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString('az-AZ')}
                      </p>
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