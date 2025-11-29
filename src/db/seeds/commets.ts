import { db } from '@/db';
import { comments } from '@/db/schema';

async function main() {
    const now = new Date();
    
    const sampleComments = [
        {
            userId: 2,
            tripId: 1,
            username: 'Nurlan',
            comment: 'Quba əla yer idi! Dağlar çox gözəl, hava təmiz. Hər kəsə tövsiyə edirəm.',
            rating: 5,
            createdAt: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            userId: 3,
            tripId: 2,
            username: 'Ömər Gədirli',
            comment: 'Şəki sarayı möhtəşəm idi! Tarixi yerləri görmək çox maraqlı oldu.',
            rating: 5,
            createdAt: new Date(now.getTime() - 35 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            userId: 1,
            tripId: 5,
            username: 'Emil Mədətov',
            comment: 'Naxçıvanda çox gözəl vaxt keçirdik. Aşurbəyov evi və Möminə xatun türbəsi görməyə dəyər!',
            rating: 4,
            createdAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            userId: 2,
            tripId: 3,
            username: 'Nurlan',
            comment: 'Qəbələdə Tufandağ şəlalələri və teleferik çox gözəl təcrübə idi. Ailə ilə getmək üçün ideal.',
            rating: 5,
            createdAt: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            userId: 1,
            tripId: 6,
            username: 'Emil Mədətov',
            comment: 'Lənkəranın çayları və təbiəti heyrətamizdir. Talış dağları çox gözəl mənzərə yaradır.',
            rating: 4,
            createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
    ];

    await db.insert(comments).values(sampleComments);
    
    console.log('✅ Comments seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});