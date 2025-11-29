import { db } from '@/db';
import { trips } from '@/db/schema';

async function main() {
    const now = new Date();
    
    const sampleTrips = [
        {
            userId: 1,
            destination: 'Quba',
            budget: 150,
            days: 3,
            routeType: 'mountain',
            difficulty: 'medium',
            transport: 'car',
            distance: '168 km',
            co2: '25 kg',
            pointsEarned: 45,
            createdAt: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            userId: 2,
            destination: 'Şəki',
            budget: 200,
            days: 4,
            routeType: 'cultural',
            difficulty: 'easy',
            transport: 'bus',
            distance: '340 km',
            co2: '30 kg',
            pointsEarned: 60,
            createdAt: new Date(now.getTime() - 38 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            userId: 1,
            destination: 'Qəbələ',
            budget: 180,
            days: 3,
            routeType: 'adventure',
            difficulty: 'medium',
            transport: 'car',
            distance: '225 km',
            co2: '28 kg',
            pointsEarned: 50,
            createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            userId: 3,
            destination: 'Xəzər sahili',
            budget: 120,
            days: 2,
            routeType: 'beach',
            difficulty: 'easy',
            transport: 'car',
            distance: '25 km',
            co2: '8 kg',
            pointsEarned: 30,
            createdAt: new Date(now.getTime() - 22 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            userId: 2,
            destination: 'Naxçıvan',
            budget: 350,
            days: 5,
            routeType: 'historical',
            difficulty: 'medium',
            transport: 'plane',
            distance: '450 km',
            co2: '85 kg',
            pointsEarned: 80,
            createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            userId: 3,
            destination: 'Lənkəran',
            budget: 220,
            days: 4,
            routeType: 'nature',
            difficulty: 'easy',
            transport: 'car',
            distance: '268 km',
            co2: '35 kg',
            pointsEarned: 55,
            createdAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        },
    ];

    await db.insert(trips).values(sampleTrips);
    
    console.log('✅ Trips seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});