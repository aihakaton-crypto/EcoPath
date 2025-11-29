"use client";

import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StatisticsPage() {
  const topEcoRoutes = [
    { destination: 'Qəbələ', co2: '18kg', ecoScore: 95, trips: 234 },
    { destination: 'Şəki', co2: '28kg', ecoScore: 92, trips: 189 },
    { destination: 'Quba', co2: '22kg', ecoScore: 90, trips: 156 },
    { destination: 'İsmayıllı', co2: '25kg', ecoScore: 88, trips: 143 },
    { destination: 'Lənkəran', co2: '32kg', ecoScore: 85, trips: 128 }
  ];

  const co2Data = [
    { transport: 'Piyada', co2: 0, percentage: 100 },
    { transport: 'Velosiped', co2: 5, percentage: 95 },
    { transport: 'Avtobus', co2: 28, percentage: 70 },
    { transport: 'Avto', co2: 35, percentage: 60 },
    { transport: 'Gəmi', co2: 45, percentage: 50 },
    { transport: 'Təyyarə', co2: 95, percentage: 20 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-primary">
            📊 Statistika və Eko Reytinqlər
          </h1>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-2">🌍</div>
                <p className="text-3xl font-bold">850+</p>
                <p className="text-sm text-muted-foreground">Toplam Səyahət</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-2">🌱</div>
                <p className="text-3xl font-bold">24.5t</p>
                <p className="text-sm text-muted-foreground">CO₂ Azaldılıb</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-2">👥</div>
                <p className="text-3xl font-bold">1,240</p>
                <p className="text-sm text-muted-foreground">Aktiv İstifadəçi</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl mb-2">⭐</div>
                <p className="text-3xl font-bold">4.8</p>
                <p className="text-sm text-muted-foreground">Orta Reytinq</p>
              </CardContent>
            </Card>
          </div>

          {/* CO2 Emissions Chart */}
          <Card className="mb-12 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl">🌫️ Nəqliyyat Növləri üzrə CO₂ Emissiyası</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {co2Data.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-lg">{item.transport}</span>
                      <span className="text-muted-foreground">{item.co2}kg CO₂</span>
                    </div>
                    <div className="relative w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                      <div 
                        className={`h-full flex items-center justify-end pr-3 text-white font-semibold transition-all duration-500 ${
                          item.co2 === 0 ? 'bg-green-500' :
                          item.co2 < 30 ? 'bg-green-400' :
                          item.co2 < 50 ? 'bg-yellow-400' :
                          item.co2 < 80 ? 'bg-orange-400' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${(item.co2 / 100) * 100}%` }}
                      >
                        {item.co2 > 0 && `${item.co2}kg`}
                      </div>
                      {item.co2 === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-green-700 font-semibold">
                          0kg - 🌿 Ən yaşıl seçim!
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Eco Score Comparison */}
          <Card className="mb-12 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl">🏆 Eko-Reytinq Cədvəli</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {co2Data.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-32 font-semibold">{item.transport}</div>
                    <div className="flex-1">
                      <div className="relative w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            item.percentage >= 90 ? 'bg-green-500' :
                            item.percentage >= 70 ? 'bg-green-400' :
                            item.percentage >= 50 ? 'bg-yellow-400' :
                            item.percentage >= 30 ? 'bg-orange-400' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-20 text-right font-bold">
                      {item.percentage}/100
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Eco Routes */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl">🌟 Azərbaycanda Ən Populyar Eko-Marşrutlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topEcoRoutes.map((route, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl font-bold text-primary w-12">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{route.destination}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>🌫️ {route.co2}</span>
                        <span>👥 {route.trips} səyahət</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{route.ecoScore}</div>
                      <div className="text-xs text-muted-foreground">Eko-bal</div>
                    </div>
                    <div className="w-24">
                      <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-500"
                          style={{ width: `${route.ecoScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Environmental Impact */}
          <Card className="mt-12 shadow-xl bg-gradient-to-r from-green-100 to-blue-100">
            <CardHeader>
              <CardTitle className="text-3xl text-center">🌱 Ətraf Mühitə Təsirimiz</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg">
                EcoPath istifadəçiləri bu il <span className="font-bold text-green-700">24.5 ton CO₂</span> emissiyasını azaldıblar
              </p>
              <p className="text-lg">
                Bu təxminən <span className="font-bold text-green-700">1,200 ağacın</span> illik CO₂ udma qabiliyyətinə bərabərdir
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-white rounded-lg">
                  <div className="text-4xl mb-2">🌳</div>
                  <p className="text-2xl font-bold">1,200</p>
                  <p className="text-sm text-muted-foreground">Ekvivalent Ağac</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <div className="text-4xl mb-2">🚗</div>
                  <p className="text-2xl font-bold">5,400km</p>
                  <p className="text-sm text-muted-foreground">Azaldılmış Avtomobil Yolu</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <div className="text-4xl mb-2">💡</div>
                  <p className="text-2xl font-bold">3,200kWh</p>
                  <p className="text-sm text-muted-foreground">Qənaət Edilmiş Enerji</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}